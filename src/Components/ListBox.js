import React, { useState } from "react";

export default function ListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="bg-gray-800 rounded-lg shadow-md p-4 w-full">
      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className="w-full flex justify-end text-xl text-gray-300"
      >
        {" "}
        {isOpen ? "➖" : "➕"}{" "}
      </button>
      {isOpen && children}
    </section>
  );
}

export function MoviesList({ movies }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies?.map((tempmovie) => (
        <Movie movie={tempmovie} key={tempmovie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li className="bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-white font-semibold text-lg truncate">
          {movie.Title}
        </p>
        <p className="text-gray-400 text-sm"> {movie.Year} </p>
      </div>
    </li>
  );
}
