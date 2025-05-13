import React, { useState } from "react";

export default function ListBox({ movies }) {
  const [movieIsOpen, setMovieIsOpen] = useState(true);

  return (
    <section className="left">
      <button onClick={() => setMovieIsOpen((movieIsOpen) => !movieIsOpen)}>
        {" "}
        {movieIsOpen ? "➖" : "➕"}{" "}
      </button>
      {movieIsOpen && <MoviesList movies={movies} />}
    </section>
  );
}

function MoviesList({ movies }) {
  return (
    <ul>
      {movies.map((tempmovie) => (
        <Movie movie={tempmovie} key={tempmovie.imdbId} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.poster} alt={movie.title} width={100} height={200} />
      <p>{movie.title}</p>
      <p> {movie.year} </p>
    </li>
  );
}
