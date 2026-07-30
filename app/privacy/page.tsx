"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import Link from "next/link";

export default function PrivacyPage() {
  useEffect(() => { document.title = "Privacy Policy — BookHaven"; }, []);

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link><span>/</span>
          <span className="text-gray-900 font-medium">Privacy Policy</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: July 30, 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including your name, email address, and payment information when you create an account or make a purchase. We also automatically collect certain information about your device and browsing behavior to improve our services.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>Your information is used to process transactions, personalize your reading experience, send recommendations, and improve our platform. We never sell your personal data to third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Data Security</h2>
            <p>We implement industry-standard encryption and security measures to protect your personal and payment information. All transactions are processed through secure, PCI-compliant payment gateways.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <p>We use trusted third-party services for payment processing (Stripe), authentication (Clerk), and analytics. These providers have their own privacy policies governing the use of your information.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. You can manage your preferences in your account settings or contact us for assistance.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Contact</h2>
            <p>If you have questions about this policy, please contact us at <a href="mailto:privacy@bookhaven.com" className="text-blue-600 hover:underline">privacy@bookhaven.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
