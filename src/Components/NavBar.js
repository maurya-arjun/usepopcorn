import React, { useState } from "react";

const NavBar = ({ movies }) => {
  return (
    <nav>
      <Logo />
      <Search />
      <NumResult movies={movies} />
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

function Search() {
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

function NumResult({ movies }) {
  return <div>Found {movies.length} results</div>;
}

export default NavBar;
