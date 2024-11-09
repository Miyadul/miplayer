import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

const MovieCard = ({ movie }) => {
  // Fallback image if movie.poster is unavailable
  const fallbackImage = "/default-poster.jpg"; // Path to a default image

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="movie-card cursor-pointer bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
        <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
          <Image
            src={movie.poster || fallbackImage} // Use fallback if poster is missing
            alt={`${movie.name} poster`}
            layout="fill" // Make the image cover the div
            objectFit="cover" // Ensure the image covers the space without distortion
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{movie.name}</h3>
          <p className="text-sm text-gray-400">{movie.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
