import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movies) => movies.imdbRating));
  const avgUserRating = average(watched.map((movies) => movies.userRating));
  const avgRunTime = average(watched.map((movies) => movies.runtime));

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <h3 className="text-white text-xl font-bold mb-4">MOVIES YOU WATCHED</h3>
      <div className="flex flex-wrap gap-4 text-gray-300">
        <span>＃ {watched.length} movies</span>
        <span>⭐️ {avgImdbRating.toFixed(2)}</span>
        <span>🌟 {avgUserRating.toFixed(2)}</span>
        <span>⌛️ {Math.round(avgRunTime)} mintus</span>
      </div>
    </div>
  );
}

export function WatchedMoviesList({ watched, onRemoveFromWatched }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {watched?.map((watchedMovie) => (
        <WatchedMovie
          watchedMovie={watchedMovie}
          key={watchedMovie.imdbId}
          onRemoveFromWatched={onRemoveFromWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ watchedMovie, onRemoveFromWatched }) {
  return (
    <li className="bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow relative">
      <div className="relative group hover:opacity-50">
        <img
          src={watchedMovie.poster}
          alt={watchedMovie.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onRemoveFromWatched(watchedMovie.imdbId)}
          className="absolute top-2 left-1/2 transform -translate-x-1/2 h-10 w-10 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          ❌
        </button>
      </div>
      <div className="p-4">
        <p className="text-white font-semibold text-lg truncate">
          {" "}
          {watchedMovie.title}{" "}
        </p>
        <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
          <span>⭐️ {watchedMovie.imdbRating}</span>
          <span>🌟 {watchedMovie.userRating}</span>
          <span>⌛️ {Math.round(watchedMovie.runtime)} mintus</span>
        </div>
      </div>
    </li>
  );
}

export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState("");
  const KEY = "c5b8b4d8";

  const isMovieWatched = watched
    .map((movie) => movie.imdbId)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const {
    Actors: actors,
    Title: title,
    Released: released,
    Genre: genre,
    Director: director,
    Language: language,
    Plot: plot,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok) {
            throw new Error(
              "Something went wrong with fetching the movie details!"
            );
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(data.error);
          }

          setMovie(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovie();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;

      return function () {
        document.title = "Movies";
        //console.log(`clean up the previous movie title ${title}`); // here we able to print the movie title just because of clousre concept in JS.
      };
    },
    [title]
  );

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6">
      <div className="container mx-auto max-w-4xl">
        {isLoading && <Loader />}
        {!isLoading && !error && (
          <>
            <header className="relative mb-6">
              <button
                onClick={onCloseMovie}
                className="absolute top-4 left-4 bg-white text-gray-900 rounded-full h-10 w-10 flex items-center justify-center text-2xl font-semibold transition-colors z-10"
                aria-label="Go back to movie list"
              >
                &larr;
              </button>
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={poster}
                  alt={`Poster of ${title} movie`}
                  className="w-full sm:w-1/3 h-96 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    {" "}
                    {title}{" "}
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base mb-2">
                    {" "}
                    {released} &bull; {runtime}{" "}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base mb-2">
                    {" "}
                    {genre}{" "}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base mb-2">
                    {" "}
                    {language}{" "}
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {" "}
                    <span>⭐️</span> {imdbRating} IMDb rating{" "}
                  </p>
                </div>
              </div>
            </header>
            <section className="mt-6">
              <div className="mb-5 bg-gray-950 p-5 rounded-lg text-center">
                {!isMovieWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      className="text-center justify-center"
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button
                        className="mt-5 bg-gray-900 py-5 px-10 rounded-xl text-xl"
                        onClick={handleAdd}
                      >
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-green-600">
                    {" "}
                    You have already reated this movie to {
                      watchedUserRating
                    }{" "}
                    <span>🌟</span>
                  </p>
                )}
              </div>
              <p className="text-gray-200 italic text-sm sm:text-base mb-4">
                {" "}
                <em> {plot} </em>{" "}
              </p>
              <p className="text-gray-300 text-sm sm:text-base mb-2">
                Starring {actors}
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                Directed By {director}{" "}
              </p>
            </section>
          </>
        )}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}

const average = (arr) => {
  if (arr.length === 0) return 0; // Handle empty array case
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
};
