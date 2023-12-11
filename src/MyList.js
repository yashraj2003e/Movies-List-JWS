import Movie from "./Movie";
import { useState } from "react";

export default function MyList({ movies }) {
  const [movieList, setMovieList] = useState(
    movies.filter((movie) => (movie.list === true ? movie : null))
  );

  function clearList() {
    if (movieList.length === 0) {
      window.alert("Nothing to Clear !");
      return;
    }
    setMovieList([]);
    movies.map((movie) => (movie.list = false));
    window.alert("Watch List Cleared Successfully !");
  }

  async function saveList() {
    if (movieList.length === 0) {
      window.alert("Nothing to Save !");
      return;
    }

    let stringName = movieList
      .filter((movie) => movie.list === true)
      .map((movie) => movie.title)
      .join(";");

    const result = await fetch("http://localhost:8081/saveList", {
      method: "POST",
      body: JSON.stringify({ movies: stringName }),
      headers: {
        "Content-type": "Application/json",
      },
    });

    const data = await result.json();
    console.log(data);
    if (data == "1") {
      window.alert("List saved Successfully !");
    } else {
      window.alert("Some Error Occurred !");
    }
  }

  return (
    <div className="myList">
      <div>
        <button
          className="nav-btn"
          onClick={() => clearList()}
          style={{ marginRight: "1rem" }}
        >
          Clear List
        </button>
        <button className="nav-btn" onClick={() => saveList()}>
          Save List
        </button>
      </div>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          width: "auto",
          flexWrap: "wrap",
        }}
        className="main"
      >
        {movieList.map((movie) => (
          <Movie movie={movie} isMyList={true} />
        ))}
      </div>
    </div>
  );
}
