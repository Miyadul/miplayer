// src/components/Home.jsx
"use client"; // Ensure this is a client-side component

import React, { useState, useEffect } from "react";
import { db } from "../firebsae/index"; // Corrected Firebase import
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link"; // Import Link from Next.js for routing

const New = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-center text-white">Loading movies...</p>;

  return (
    <div className="mhome">
      {/* Movie List Section */}
      <div className="home mt-8 px-4">
        <h2 className="text-2xl font-bold text-white mb-6">All Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <div className="movie-item block text-center cursor-pointer">
                <img
                  src={movie.poster}
                  alt={`${movie.name} poster`}
                  className="movie-poster w-full h-auto rounded-lg shadow-lg"
                />
                <h3 className="mt-2 text-lg text-white">{movie.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default New;
