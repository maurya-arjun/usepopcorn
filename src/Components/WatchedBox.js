export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movies) => movies.imdbrating));
  const avgUserRating = average(watched.map((movies) => movies.userrating));
  const avgRunTime = average(watched.map((movies) => movies.runtime));

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
      <h3 className="text-white text-xl font-bold mb-4">MOVIES YOU WATCHED</h3>
      <div className="flex flex-wrap gap-4 text-gray-300">
        <span>＃ {watched.length} movies</span>
        <span>⭐️ {avgImdbRating}</span>
        <span>🌟 {avgUserRating}</span>
        <span>⌛️ {Math.round(avgRunTime)} mintus</span>
      </div>
    </div>
  );
}

export function WatchedMoviesList({ watched }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {watched?.map((watchedMovie) => (
        <WatchedMovie watchedMovie={watchedMovie} key={watchedMovie.imdbId} />
      ))}
    </ul>
  );
}

function WatchedMovie({ watchedMovie }) {
  return (
    <li className="bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <img
        src={watchedMovie.poster}
        alt={watchedMovie.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-white font-semibold text-lg truncate">
          {" "}
          {watchedMovie.title}{" "}
        </p>
        <div className="flex flex-wrap gap-4 text-gray-300 text-sm">
          <span>⭐️ {watchedMovie.imdbrating}</span>
          <span>🌟 {watchedMovie.userrating}</span>
          <span>⌛️ {Math.round(watchedMovie.runtime)} mintus</span>
        </div>
      </div>
    </li>
  );
}

const average = (arr) => {
  if (arr.length === 0) return 0; // Handle empty array case
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
};
