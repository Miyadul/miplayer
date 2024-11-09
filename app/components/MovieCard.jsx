import React from "react";
import Link from "next/link";

const MovieCard = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="movie-card cursor-pointer bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition-transform">
        <img
          src={movie.poster}
          alt={`${movie.name} poster`}
          className="w-full h-60 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white">{movie.name}</h3>
          <p className="text-sm text-gray-400">{movie.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
