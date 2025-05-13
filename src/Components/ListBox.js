import React, { useState } from "react";

export default function ListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section>
      <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
        {" "}
        {isOpen ? "➖" : "➕"}{" "}
      </button>
      {isOpen && children}
    </section>
  );
}

export function MoviesList({ movies }) {
  return (
    <ul>
      {movies?.map((tempmovie) => (
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
