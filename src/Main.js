import Movie from "./Movie";

export default function Main({ movies, setMovies }) {
  return (
    <div>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          width: "auto",
          flexWrap: "wrap",
        }}
        className="main"
      >
        {movies.map((movie) => (
          <Movie movie={movie} key={movie.title} setMovies={setMovies} />
        ))}
      </div>
    </div>
  );
}
