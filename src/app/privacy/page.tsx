"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <main className="bg-os-bg min-h-screen text-white font-sans selection:bg-white/20">
      <Navbar />
      
      <div className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to Home</span>
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-heading mb-12">
            Privacy <span className="text-white/20 italic font-serif tracking-normal">Policy</span>
          </h1>

          <div className="space-y-12 text-white/70 leading-relaxed text-lg">
            <section>
              <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6">Introduction</h2>
              <p>
                At OsDigital, we respect your privacy and are committed to protecting the personal data you share with us. This policy outlines how we collect, use, and safeguard your information when you engage with our AI-powered creative services.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6">Data Collection</h2>
              <p>
                We collect information necessary to provide our services, including:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Contact details (Name, Email, Phone) provided via our project inquiry forms.</li>
                <li>Product or service details required for ad generation (Images, Descriptions, Brand Guidelines).</li>
                <li>Usage data and cookies to improve your experience on our platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6">How We Use Your Data</h2>
              <p>
                Your data is used solely to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Produce and deliver your AI-generated video ads.</li>
                <li>Communicate regarding project status, revisions, and invoicing.</li>
                <li>Analyze and improve our service performance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6">AI Processing & Third Parties</h2>
              <p>
                To deliver high-quality content, we utilize advanced AI processing tools. While your product details are processed through these systems, we do not sell your data to third parties for marketing purposes. All third-party tools used adhere to strict data security standards.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6">Content Ownership</h2>
              <p>
                Upon final payment, you retain the rights to the delivered video content for use in your advertising campaigns. OsDigital may retain archival copies for internal quality control unless otherwise requested.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-6">Your Rights</h2>
              <p>
                You have the right to access, correct, or request the deletion of your personal data at any time. For such requests, please contact us at <a href="mailto:contact@osdigital.net" className="text-white hover:underline">contact@osdigital.net</a>.
              </p>
            </section>

            <div className="pt-12 border-t border-white/10 text-white/30 text-xs">
              Last Updated: April 30, 2026
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
