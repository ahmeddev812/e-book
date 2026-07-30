"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import Link from "next/link";

export default function TermsPage() {
  useEffect(() => { document.title = "Terms of Service — BookHaven"; }, []);

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link><span>/</span>
          <span className="text-gray-900 font-medium">Terms of Service</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: July 30, 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using BookHaven, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Account Registration</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must be at least 13 years old to create an account.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Purchases & Refunds</h2>
            <p>All purchases are final unless otherwise stated. Digital books may be refunded within 14 days if not downloaded. Physical books may be returned within 30 days in original condition.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Intellectual Property</h2>
            <p>All content on BookHaven, including book covers, descriptions, and platform design, is protected by copyright and other intellectual property laws. Users may not reproduce, distribute, or create derivative works without permission.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>BookHaven is provided &quot;as is&quot; without warranties of any kind. We are not liable for damages arising from your use of the platform, to the maximum extent permitted by law.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Users will be notified of material changes via email or platform notice.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:legal@bookhaven.com" className="text-blue-600 hover:underline">legal@bookhaven.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
