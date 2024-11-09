// src/components/Hero.jsx
"use client"; // Add this line at the very top

import React, { useState, useEffect } from "react";
import { db } from "../firebsae/index"; // Ensure your Firebase setup is correctly imported
import { collection, getDocs } from "firebase/firestore";

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return <p className="text-center text-white">Loading...</p>;

  const currentMovie = movies[currentIndex];

  return (
    <div
      className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${currentMovie.poster})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{currentMovie.name}</h1>
          <button className="mt-4 px-6 py-3 bg-red-600 rounded-md text-lg font-semibold hover:bg-red-700 transition">
            ▶ Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
