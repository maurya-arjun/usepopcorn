import React, { useState } from "react";

const WatchedBox = ({ watchedMovies }) => {
  const [movieWatchedIsOpen, setMovieWatchedIsOpen] = useState(true);
  const [watched, setWatched] = useState(watchedMovies);

  return (
    <section className="right">
      <div>
        <button
          onClick={() =>
            setMovieWatchedIsOpen((movieWatchedIsOpen) => !movieWatchedIsOpen)
          }
        >
          {" "}
          {movieWatchedIsOpen ? "➖" : "➕"}
        </button>

        {movieWatchedIsOpen && (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} />
          </>
        )}
      </div>
      <div></div>
    </section>
  );
};

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movies) => movies.imdbrating));
  const avgUserRating = average(watched.map((movies) => movies.userrating));
  const avgRunTime = average(watched.map((movies) => movies.runtime));

  return (
    <div>
      <h3>MOVIES YOU WATCHED</h3>
      <span>＃ {watched.length} movies</span>
      <span>⭐️ {avgImdbRating}</span>
      <span>🌟 {avgUserRating}</span>
      <span>⌛️ {Math.round(avgRunTime)} mintus</span>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul>
      {watched.map((watchedMovie) => (
        <WatchedMovie watchedMovie={watchedMovie} key={watchedMovie.imdbId} />
      ))}
    </ul>
  );
}

function WatchedMovie({ watchedMovie }) {
  return (
    <li>
      <img
        src={watchedMovie.poster}
        alt={watchedMovie.title}
        height={200}
        width={100}
      />
      <p> {watchedMovie.title} </p>
      <div>
        <span>⭐️ {watchedMovie.imdbrating}</span>
        <span>🌟 {watchedMovie.userrating}</span>
        <span>⌛️ {Math.round(watchedMovie.runtime)} mintus</span>
      </div>
    </li>
  );
}

// Corrected average function
const average = (arr) => {
  if (arr.length === 0) return 0; // Handle empty array case
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
};

export default WatchedBox;
