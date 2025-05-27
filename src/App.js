import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Main from "./Components/Main";
import ListBox from "./Components/ListBox";
import { Search, NumResult } from "./Components/NavBar";
import { MoviesList } from "./Components/ListBox";
import {
  WatchedSummary,
  WatchedMoviesList,
  MovieDetails,
} from "./Components/WatchedBox";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import { useMovies } from "./useMovies";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query); // used custom hook for non-visual logic
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedMovie = localStorage.getItem("watched");
    return JSON.parse(storedMovie);
  });

  //   useEffect(function () {
  //     fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //       .then((res) => res.json())
  //       .then((data) => setMovies(data.Search));
  //   }, []);

  /*useEffect(function () {
    console.log("A");
  });

  useEffect(function () {
    console.log("C");
  }, []);

  useEffect(
    function () {
      console.log("Query state update");
    },
    [query]
  );

  console.log("B");*/

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovide() {
    setSelectedId(null);
  }

  function handleAddToWatched(movie) {
    setWatched((watchedMovie) => [...watchedMovie, movie]);
  }

  function handleRemoveFromWatched(id) {
    setWatched((watchedMovies) =>
      watchedMovies.filter((watched) => watched.imdbId !== id)
    );
  }

  // Store watchlist movie into local storage
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* here we are using Components composition to avoid the props drilling */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <Main>
        <ListBox>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovide}
              onAddWatched={handleAddToWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveFromWatched={handleRemoveFromWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </div>
  );
}

export default App;
