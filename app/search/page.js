"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { db } from "../firebase"; // Correct import path
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image"; // Optional, for image optimization

const SearchPage = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!queryParam) return; // Early return if no query

      try {
        const moviesCollection = collection(db, "movies");

        // Query Firestore for movies matching the search query
        const q = query(
          moviesCollection,
          where("name", ">=", queryParam),
          where("name", "<=", queryParam + "\uf8ff")
        );
        const movieSnapshot = await getDocs(q);
        const movieList = movieSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMovies(movieList);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [queryParam]);

  if (loading) return <p className="text-center text-lg py-10">Searching for movies...</p>;

  if (movies.length === 0)
    return <p className="text-center text-lg py-10">No movies found for "{queryParam}".</p>;

  return (
    <div className="search-page p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Search Results for: "{queryParam}"</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="movie-item cursor-pointer transition-transform transform hover:scale-105">
              {/* Using Next.js Image Component for optimized loading */}
              <Image
                src={movie.poster || "/default-image.jpg"} // Fallback image in case poster is missing
                alt={`${movie.name} poster`}
                width={300} // Specify width for Next.js Image
                height={400} // Specify height for Next.js Image
                className="movie-poster w-full h-60 sm:h-72 md:h-80 object-cover rounded-lg shadow-lg"
              />
              <h3 className="text-lg font-medium mt-2 text-center text-gray-800 dark:text-gray-200">
                {movie.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
