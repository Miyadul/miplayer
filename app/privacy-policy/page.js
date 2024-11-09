"use client";

import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | Mi Player</title>
        <meta name="description" content="Learn about the privacy practices of Mi Player. We respect your privacy and are committed to protecting your personal data." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="privacy-policy-page px-4 py-8 text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At Mi Player, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our website and services.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect the following types of information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Personal information (e.g., name, email address) that you provide when registering or contacting us.</li>
          <li>Usage data (e.g., pages visited, time spent on the site) collected through cookies and analytics tools.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use your information for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide and improve our services.</li>
          <li>To communicate with you about updates and promotions.</li>
          <li>To analyze user behavior and enhance user experience.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not share your personal information with third parties, except:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To comply with legal obligations or protect our rights.</li>
          <li>With service providers who assist us in operating our services (e.g., analytics providers).</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
        <p className="mb-4">
          You have the right to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Access the personal data we hold about you.</li>
          <li>Request corrections to any inaccurate information.</li>
          <li>Request deletion of your data, subject to certain exceptions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>

        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at: 
          <a href="mailto:support@miplayer.com" className="text-blue-600 hover:underline"> support@miplayer.com</a>.
        </p>
        
      </div>
    </>
  );
};

export default PrivacyPolicy;
