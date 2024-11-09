"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebsae/index";
import { doc, getDoc } from "firebase/firestore";
import { FaPlay } from "react-icons/fa";
import { FiFilm } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import Head from "next/head";

export default function MovieDetail({ params }) {
  const { id } = React.use(params);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieRef = doc(db, "movies", id);
        const movieSnap = await getDoc(movieRef);

        if (movieSnap.exists()) {
          setMovie(movieSnap.data());
        } else {
          console.log("No such movie!");
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  const playVideoFullScreen = () => {
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.play();
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  if (loading) return <p className="text-center text-lg">Loading movie details...</p>;
  if (!movie) return <p className="text-center text-lg">Movie not found</p>;

  return (
    <>
      <Head>
        <title>{movie.name} - Watch Online | Mi player</title>
        <meta
          name="description"
          content={`${movie.name} directed by ${movie.producer}. ${movie.description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${movie.name} - Watch Online | Mi player`} />
        <meta
          property="og:description"
          content={`${movie.name} directed by ${movie.producer}. ${movie.description}`}
        />
        <meta property="og:image" content={movie.poster || "/default-image.jpg"} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={`https://www.movieapp.com/movie/${id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${movie.name} - Watch Online | MovieApp`} />
        <meta
          name="twitter:description"
          content={`${movie.name} directed by ${movie.producer}. ${movie.description}`}
        />
        <meta name="twitter:image" content={movie.poster || "/default-image.jpg"} />
        <link rel="canonical" href={`https://www.movieapp.com/movie/${id}`} />

        {/* Structured Data for SEO (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            name: movie.name,
            image: movie.poster,
            description: movie.description,
            director: {
              "@type": "Person",
              name: movie.producer,
            },
            datePublished: movie.year,
            genre: movie.category,
            duration: movie.duration,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.5",
              reviewCount: "200",
            },
            url: `https://www.movieapp.com/movie/${id}`,
            potentialAction: {
              "@type": "WatchAction",
              target: `https://www.movieapp.com/movie/${id}`,
            },
          })}
        </script>
      </Head>

      <div
        className="relative flex items-center justify-center bg-cover bg-center min-h-screen text-white p-10"
        style={{ backgroundImage: `url(${movie.poster})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative flex flex-col md:flex-row items-start max-w-5xl w-full z-10 p-5 md:p-10 bg-opacity-70 bg-neutral-800 rounded-lg shadow-lg">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img
              src={movie.poster}
              alt={`${movie.name} poster`}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="flex-1 md:ml-10">
            <h1 className="text-4xl font-bold mb-4">{movie.name}</h1>
            <p className="text-lg text-gray-300 mb-4">Directed by {movie.producer}</p>
            <div className="flex items-center text-sm text-gray-400 mb-4 space-x-4">
              <span>{movie.year}</span>
              <div className="flex items-center space-x-1">
                <BsClock className="text-lg" /> <span>{movie.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiFilm className="text-lg" /> <span>{movie.category}</span>
              </div>
            </div>
            <p className="mb-4">
              <strong>Status:</strong> {movie.status}
            </p>
            <p className="text-gray-300 mb-6">{movie.description}</p>

            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
              onClick={playVideoFullScreen}
            >
              <FaPlay className="text-xl" /> Watch Free
            </button>

            {showVideo && (
              <div className="video-container mt-6 relative">
                <video
                  ref={videoRef}
                  src={movie.video}
                  className="rounded-lg shadow-lg w-full h-auto max-h-[70vh] object-contain"
                  controls
                ></video>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
 