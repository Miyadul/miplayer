"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "../firebase/index";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch movies from Firestore
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesCollection = collection(db, "movies");
        const movieSnapshot = await getDocs(moviesCollection);
        const movieList = movieSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(movieList);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  // Auto-slide through movies in the hero section
  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      }, 4000); // Change slide every 4 seconds
      return () => clearInterval(interval);
    }
  }, [movies]);

  if (loading) return <p className="text-center text-lg">Loading movies...</p>;

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative">
      <Head>
        <title>Mi Player - Discover Popular Movies and TV Shows</title>
        <meta
          name="description"
          content="Explore a vast collection of movies and TV shows on Mi Player. Discover trending titles, watch trailers, and enjoy your favorite genres."
        />
        <meta name="robots" content="index, follow" />
        {currentMovie && (
          <>
            <meta property="og:title" content={currentMovie.name} />
            <meta
              property="og:description"
              content={`Watch ${currentMovie.name} and explore more trending movies on Mi Player.`}
            />
            <meta
              property="og:image"
              content={currentMovie.poster || "/default-image.jpg"}
            />
            <meta property="og:url" content="https://www.movieapp.com/" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={currentMovie.name} />
            <meta
              name="twitter:description"
              content={`Watch ${currentMovie.name} on Mi Player.`}
            />
            <meta
              name="twitter:image"
              content={currentMovie.poster || "/default-image.jpg"}
            />
          </>
        )}
        <link rel="canonical" href="https://www.movieapp.com/" />
      </Head>

      {/* Hero Section */}
      {currentMovie && (
        <div
          className="hero h-[80vh] bg-cover bg-center flex items-center justify-center text-white relative z-10"
          style={{
            backgroundImage: `url(${currentMovie.poster || "/default-image.jpg"})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <h1 className="text-3xl md:text-5xl font-bold relative z-20">
            {currentMovie.name}
          </h1>
        </div>
      )}

      {/* Movie List Section */}
      <div className="home p-4">
        <h2 className="text-2xl font-semibold mb-4">All Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="movie-item cursor-pointer hover:scale-105 transition-transform">
                <Image
                  src={movie.poster || "/default-image.jpg"}
                  alt={`${movie.name} poster`}
                  width={300}
                  height={400}
                  className="movie-poster w-full h-60 object-cover rounded-lg shadow-lg"
                  placeholder="blur"
                  blurDataURL="/default-image.jpg"
                />
                <h3 className="text-lg font-medium mt-2 text-center">{movie.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
