"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "../firebsae/index";
import { collection, query, where, getDocs } from "firebase/firestore";
import MovieCard from "../components/MovieCard";

const CategoryPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("name") || "Action"; // Default category if not provided
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      setLoading(true);
      setError("");

      try {
        const moviesCollection = collection(db, "movies");
        const q = query(moviesCollection, where("category", "==", category));
        const querySnapshot = await getDocs(q);
        const movieList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(movieList);
      } catch (err) {
        console.error("Error fetching movies by category:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByCategory();
  }, [category]);

  if (loading) return <p className="text-center text-lg">Loading movies...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="category-page px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">{category} Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center col-span-full">No movies found in the {category} category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
