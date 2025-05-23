import React from "react";

const NavBar = ({ children }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 z-10 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Logo />
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
          {children}
        </div>
      </div>
    </nav>
  );
};

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl">🍿</span>
      <p className="text-xl font-semibold">usePopcorn</p>
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <div className="w-full sm:w-auto">
      <input
        type="search"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-64 p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export function NumResult({ movies }) {
  return (
    <div className="text-sm sm:text-base text-gray-300">
      Found {movies.length} results
    </div>
  );
}

export default NavBar;
