import React from "react";
import WatchedBox from "./WatchedBox";
import ListBox from "./ListBox";

const Main = ({ movies, watchedMovies }) => {
  return (
    <div className="main" style={{ display: "flex" }}>
      <ListBox movies={movies} />
      <WatchedBox watchedMovies={watchedMovies} />
    </div>
  );
};

export default Main;
