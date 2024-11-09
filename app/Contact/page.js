"use client";

import React, { useState } from "react";
import { db } from "../firebsae/index";
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    // Validate form data
    if (!name || !email || !message) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      // Reference to the "contacts" collection
      const contactsCollection = collection(db, "contacts");

      // Add a new document with form data
      await addDoc(contactsCollection, {
        name,
        email,
        message,
        timestamp: new Date(),
      });

      // Reset form fields and show success message
      setName("");
      setEmail("");
      setMessage("");
      setSuccess(true);
    } catch (error) {
      console.error("Error saving contact data:", error);
      setError("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page px-4 py-8 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-center text-lg mb-8">
        We'd love to hear from you! Please fill out the form below to get in touch.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        {success && (
          <p className="text-green-600 text-center mb-4">Message sent successfully!</p>
        )}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Your Email"
            required
          />
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg"
            rows="5"
            placeholder="Your Message"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
