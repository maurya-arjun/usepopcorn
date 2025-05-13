import React, { useState } from "react";

const NavBar = ({ children }) => {
  return (
    <nav>
      <Logo />
      {children}
    </nav>
  );
};

function Logo() {
  return (
    <div>
      <span>🍿</span>
      <p>usePopcorn</p>
    </div>
  );
}

export function Search() {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        type="search"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export function NumResult({ movies }) {
  return <div>Found {movies.length} results</div>;
}

export default NavBar;
