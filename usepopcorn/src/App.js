import { useRef, useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const KEY = "ea53e501";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(undefined);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? undefined : id));
  }

  function handleCloseSelectedMovie() {
    setSelectedId(undefined);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {error ? (
            <ErrorMessage message={error} />
          ) : isLoading ? (
            <Loader />
          ) : (
            <MovieList movies={movies} onSelectedId={handleSelectedMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDelteMovie={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function ErrorMessage({ message }) {
  return <p className="error">❗{message}</p>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectedId={onSelectedId} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedId }) {
  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const countRef = useRef(0);

  useEffect(
    function () {
      if (rating) countRef.current++;
    },
    [rating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.rating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      rating,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ").at(0)),
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);

  // we don't need try catch because id always exist, previous fetch gives us a warrenty for that
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!movie) return;
      document.title = movie.Title;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [movie]
  );

  if (!movie) return;
  return (
    <div className="details" key={selectedId}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieHeaderDetails movie={movie} onCloseMovie={onCloseMovie} />
          <MovieAdditionalDetails
            movie={movie}
            setRating={setRating}
            rating={rating}
            onAdd={handleAdd}
            isWatched={isWatched}
            watchedUserRating={watchedUserRating}
          />
        </>
      )}
    </div>
  );
}

function MovieHeaderDetails({ movie, onCloseMovie }) {
  return (
    <header>
      <button className="btn-back" onClick={onCloseMovie}>
        x
      </button>
      <img src={movie.Poster} alt="poster" />
      <div className="details-overview">
        <h2>{movie.Title}</h2>
        <p>
          {movie.Released} &middot; {movie.Runtime}
        </p>
        <p>{movie.Genre}</p>
        <p>⭐ {movie.imdbRating} IMDB rating</p>
      </div>
    </header>
  );
}

function MovieAdditionalDetails({
  movie,
  setRating,
  onAdd,
  rating,
  isWatched,
  watchedUserRating,
}) {
  return (
    <section>
      <div className="rating">
        {!isWatched ? (
          <>
            <StarRating
              maxRating={10}
              size={24}
              onSetRating={setRating}
            ></StarRating>
            {rating > 0 && (
              <button className="btn-add" onClick={onAdd}>
                + Add to list
              </button>
            )}
          </>
        ) : (
          <p>
            <em>
              You rated this movie {watchedUserRating} <span>⭐</span>
            </em>
          </p>
        )}
      </div>
      <p>
        <em>{movie.Plot}</em>
      </p>
      <p>Staring {movie.Actors}</p>
      <p>Directed by {movie.Director}</p>
    </section>
  );
}

function WatchedMovieList({ watched, onDelteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDelteMovie={onDelteMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDelteMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.rating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDelteMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.rating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
