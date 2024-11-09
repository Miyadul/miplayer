"use client";

import React from "react";
import Head from "next/head"; // Import Head for SEO

const page = () => {
  return (
    <div className="about-page px-4 py-8 text-gray-800">
      <Head>
        <title>About Mi Player - Discover Free Movies and TV Shows</title>
        <meta
          name="description"
          content="Learn more about Mi Player, your one-stop destination for exploring movies and TV shows across different genres."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About Mi Player - Discover New Free Movies and TV Shows" />
        <meta
          property="og:description"
          content="Learn more about Mi Player, your one-stop destination for exploring movies and TV shows across different genres."
        />
        <meta property="og:image" content="/path-to-your-image.jpg" />
        <meta property="og:url" content="https://www.movieapp.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Mi Player - Discover Movies and TV Shows" />
        <meta
          name="twitter:description"
          content="Learn more about Mi Player, your one-stop destination for exploring movies and TV shows across different genres."
        />
        <meta name="twitter:image" content="/path-to-your-image.jpg" />
      </Head>

      {/* Hero Section */}
      <div className="hero bg-gray-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About Mi Player</h1>
        <p className="text-lg md:text-xl mt-4">
          Discover the ultimate new collection of free movies and TV shows, right at your fingertips.
        </p>
      </div>

      {/* About Section */}
      <section className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed text-center max-w-2xl mx-auto">
          Mi Player is your one-stop destination for exploring a diverse range of free movies and TV shows. Our platform is designed to provide you with the latest and most popular titles, all in one place. Whether you love action, drama, comedy, or thrillers, we have something for everyone.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="feature-card p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-2">Extensive Collection</h3>
            <p className="text-gray-700">
              Explore an extensive library of movies and TV shows from different genres and languages.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-2">Easy Navigation</h3>
            <p className="text-gray-700">
              Our user-friendly interface makes it easy for you to find your favorite movies and discover new ones.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-2">Regular Updates</h3>
            <p className="text-gray-700">
              Stay updated with the latest releases and trending titles. We bring new content regularly for you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold text-center mb-6">Get in Touch</h2>
        <p className="text-lg text-center mb-4">
          Have any questions or feedback? We&apos;d love to hear from you.
        </p>
        <div className="text-center">
          <a
            href="mailto:support@movieapp.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default page;
