import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Main from "./Components/Main";
import ListBox from "./Components/ListBox";
import { Search, NumResult } from "./Components/NavBar";
import { MoviesList } from "./Components/ListBox";
import { WatchedSummary, WatchedMoviesList } from "./Components/WatchedBox";

const KEY = "c5b8b4d8";
// const query = "interstellar";
const tempQuery = "interstellar";

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("inception");

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

  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(data.Error);
          }
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovie();
    },
    [query]
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
          {!isLoading && !error && <MoviesList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </ListBox>
      </Main>
    </div>
  );
}

function Loader() {
  return <p className="text-center text-white text-xl">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="text-red-500 text-center text-xl">
      {" "}
      <span>☹️</span> {message}{" "}
    </p>
  );
}

export default App;

const tempMoviesData = [
  {
    imdbId: "tt0111161",
    title: "The Shawshank Redemption",
    year: 1994,
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
  },
  {
    imdbId: "tt0068646",
    title: "The Godfather",
    year: 1972,
    poster:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  },
  {
    imdbId: "tt0468569",
    title: "The Dark Knight",
    year: 2008,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
  },
  {
    imdbId: "tt0137523",
    title: "Fight Club",
    year: 1999,
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
  },
  {
    imdbId: "tt1375666",
    title: "Inception",
    year: 2010,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
  },
];

const tempWatchedData = [
  {
    imdbId: "tt0111161",
    title: "The Shawshank Redemption",
    year: 1994,
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    runtime: 142,
    imdbrating: 9.3,
    userrating: 8.5,
  },
  {
    imdbId: "tt0068646",
    title: "The Godfather",
    year: 1972,
    poster:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    runtime: 175,
    imdbrating: 9.2,
    userrating: 9.0,
  },
  {
    imdbId: "tt0468569",
    title: "The Dark Knight",
    year: 2008,
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    runtime: 152,
    imdbrating: 9.0,
    userrating: 8.8,
  },
  {
    imdbId: "tt0133093",
    title: "The Matrix",
    year: 1999,
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    runtime: 136,
    imdbrating: 8.7,
    userrating: 7.5,
  },
  {
    imdbId: "tt0816692",
    title: "Interstellar",
    year: 2014,
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGYyLWFmMjktY2FiMmMxNDEyOWVhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    runtime: 169,
    imdbrating: 8.6,
    userrating: 8.0,
  },
];
