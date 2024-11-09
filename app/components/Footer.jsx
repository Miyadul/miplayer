"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-4">Mi Player</h2>
          <p className="text-gray-400">
            Enjoy streaming your favorite movies and shows on Mi Player.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:items-center">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col md:items-end">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank" className="hover:text-gray-400">
              <FaFacebook className="text-2xl" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-gray-400">
              <FaTwitter className="text-2xl" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-gray-400">
              <FaInstagram className="text-2xl" />
            </Link>
            <Link href="https://youtube.com" target="_blank" className="hover:text-gray-400">
              <FaYoutube className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 mt-8">
        © {new Date().getFullYear()} Mi Player. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
