"use client";

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

interface ScrollCanvasProps {
  frameCount: number;
  baseUrl: string;
}

export interface ScrollCanvasHandle {
  drawFrame: (index: number) => void;
  isLoading: boolean;
}

const ScrollCanvas = forwardRef<ScrollCanvasHandle, ScrollCanvasProps>(({ frameCount, baseUrl }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentIndex = useRef(0);
  const bgColorCache = useRef<Map<number, string>>(new Map());
  
  const [isMobile, setIsMobile] = useState(false);
  const stableHeight = useRef(0);
  const stableWidth = useRef(0);

  const IMAGE_SCALE = 1.0; 

  const sampleBgColor = (img: HTMLImageElement, index: number) => {
    if (bgColorCache.current.has(index)) return bgColorCache.current.get(index)!;
    
    // Safety check for SSR
    if (typeof document === 'undefined') return "#020617";

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
    if (!tempCtx) return "#020617"; 
    
    tempCanvas.width = 1;
    tempCanvas.height = 1;
    tempCtx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
    const data = tempCtx.getImageData(0, 0, 1, 1).data;
    const color = `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
    
    bgColorCache.current.set(index, color);
    return color;
  };

  const drawFrame = (index: number, currentFrames: HTMLImageElement[] = frames) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: false });
    
    // Safety check for frames array
    if (!currentFrames || currentFrames.length === 0) return;

    // Map full index to half index if on mobile
    const frameToDraw = isMobile ? Math.floor(index / 3) : index;
    const img = currentFrames[frameToDraw];

    if (!ctx || !img) return;

    // Safety check for window
    if (typeof window === 'undefined') return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = stableWidth.current || window.innerWidth;
    const ch = stableHeight.current || window.innerHeight;

    const targetWidth = cw * dpr;
    const targetHeight = ch * dpr;
    
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.scale(dpr, dpr);
    }

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.fillStyle = sampleBgColor(img, frameToDraw);
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    currentIndex.current = index;
  };

  useImperativeHandle(ref, () => ({
    drawFrame: (index) => {
      const storageIdx = isMobile ? Math.floor(index / 3) : index;
      if (frames && frames.length > 0 && frames[storageIdx]) {
        drawFrame(index, frames);
      }
    },
    isLoading
  }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    stableWidth.current = window.innerWidth;
    stableHeight.current = window.innerHeight;
  }, []);

  useEffect(() => {
    let active = true;
    const loadImages = async () => {
      if (!frameCount || !baseUrl) return;

      const step = isMobile ? 3 : 1;
      const actualFrameCount = Math.ceil(frameCount / step);
      const loadedImages: HTMLImageElement[] = new Array(actualFrameCount);
      let loadedCount = 0;

      const loadSingle = (originalIdx: number, storageIdx: number) => new Promise<void>((resolve) => {
        if (typeof Image === 'undefined') {
          resolve();
          return;
        }
        const img = new Image();
        img.src = `${baseUrl}/frame_${originalIdx.toString().padStart(4, "0")}.jpg`;
        img.onload = () => {
          if (active) {
            loadedImages[storageIdx] = img;
            loadedCount++;
            // Use actualFrameCount as base for progress
            setLoadProgress(Math.floor((loadedCount / actualFrameCount) * 100));
            if (originalIdx === 0 && canvasRef.current) drawFrame(0, loadedImages);
          }
          resolve();
        };
        img.onerror = () => resolve();
      });

      // Phase 1: Keyframes first (every 10th frame)
      const keyframes = [];
      for (let i = 0; i < frameCount; i += 10 * step) {
        keyframes.push(loadSingle(i, Math.floor(i / step)));
      }
      await Promise.all(keyframes);
      if (!active) return;

      // REVEAL SITE EARLY: Once keyframes are ready, we show the site
      // The rest of the frames will pop in as they load
      setIsLoading(false);
      setFrames([...loadedImages]); // Trigger a render with available frames

      // Phase 2: Rest in small batches
      const remainingIndices = [];
      for (let i = 0; i < frameCount; i += step) {
        const storageIdx = Math.floor(i / step);
        if (!loadedImages[storageIdx]) remainingIndices.push({ original: i, storage: storageIdx });
      }

      const batchSize = isMobile ? 8 : 15;
      for (let i = 0; i < remainingIndices.length; i += batchSize) {
        if (!active) break;
        const batch = remainingIndices.slice(i, i + batchSize).map(idx => loadSingle(idx.original, idx.storage));
        await Promise.all(batch);
        // Refresh frames state after each batch to show intermediate progress
        if (active) setFrames([...loadedImages]);
      }
    };

    if (stableHeight.current) {
      loadImages();
    }
    return () => { active = false; };
  }, [frameCount, baseUrl, isMobile]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (Math.abs(window.innerWidth - stableWidth.current) > 50 || Math.abs(window.innerHeight - stableHeight.current) > 100) {
          stableWidth.current = window.innerWidth;
          stableHeight.current = window.innerHeight;
          if (frames && frames.length > 0) {
            drawFrame(currentIndex.current, frames);
          }
        }
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [frames]);

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ backgroundColor: '#020617' }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full relative block"
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-os-bg z-50">
          <div className="w-48 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${Math.min(loadProgress, 100)}%` }}
            />
          </div>
          <div className="mt-4 text-white font-bold text-[10px] tracking-[0.2em] uppercase">
            OsDigital Experience
          </div>
        </div>
      )}
    </div>
  );
});

ScrollCanvas.displayName = "ScrollCanvas";

export default ScrollCanvas;
