"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import Link from "next/link";

export default function CookiesPage() {
  useEffect(() => { document.title = "Cookie Policy — BookHaven"; }, []);

  return (
    <main className="pt-28 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link><span>/</span>
          <span className="text-gray-900 font-medium">Cookie Policy</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last updated: July 30, 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, improve site performance, and provide a personalized experience.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. How We Use Cookies</h2>
            <p>We use cookies for essential functions (authentication, shopping cart), analytics (page views, usage patterns), and personalization (remembering your preferences and recommendations).</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. Types of Cookies We Use</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Essential:</strong> Required for basic site functionality, including login and cart operations.</li>
              <li><strong>Analytics:</strong> Help us understand how visitors interact with our site.</li>
              <li><strong>Preference:</strong> Remember your settings and preferences across visits.</li>
              <li><strong>Marketing:</strong> Used to deliver relevant content and advertisements (with your consent).</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Managing Cookies</h2>
            <p>You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect site functionality. Most browsers allow you to block or delete cookies through their settings menus.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Third-Party Cookies</h2>
            <p>We use services like Stripe (payment processing) and Clerk (authentication) that may set their own cookies. These are governed by their respective privacy policies.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Contact</h2>
            <p>For questions about our cookie policy, contact us at <a href="mailto:privacy@bookhaven.com" className="text-blue-600 hover:underline">privacy@bookhaven.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
