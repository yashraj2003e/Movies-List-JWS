import { useState } from "react";
export default function Movie({ movie, setMovies, isMyList }) {
  const [isAddedToList, setIsAddedToList] = useState(movie.list);

  function addToList(title) {
    setMovies((movies) =>
      movies.map((movie) =>
        movie.title === title ? { ...movie, list: !movie.list } : movie
      )
    );
    setIsAddedToList((val) => !val);
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginLeft: "2.5rem",
        marginTop: "2rem",
        marginRight: "2rem",
        fontSize: "1.2rem",
        color: "white",
      }}
      className="movie"
    >
      <img src={movie.image} width={300} height={300} alt={`${movie.image}`} />
      <h2>{movie.title}</h2>
      {!isMyList && (
        <button onClick={() => addToList(movie.title)}>
          {!isAddedToList ? "Add to Watch List" : "✅ Added To Watch List"}
        </button>
      )}
    </div>
  );
}
