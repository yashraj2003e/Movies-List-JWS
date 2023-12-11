import { useState } from "react";
import Main from "./Main";
import NavBar from "./NavBar";
import MyList from "./MyList";
import Login from "./Login";

export default function App() {
  const [isMyList, setIsMyList] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [movies, setMovies] = useState([
    {
      list: false,
      image: "https://media.timeout.com/images/105455969/1024/768/image.webp",
      title: "2001: A Space Odyssey",
    },
    {
      list: false,
      image: "https://media.timeout.com/images/105455970/1024/768/image.webp",
      title: "The Godfather",
    },
    {
      list: false,
      image: "https://media.timeout.com/images/105455971/1024/768/image.webp",
      title: "Citizen Kane",
    },
    {
      list: false,
      image: "https://media.timeout.com/images/105455972/1024/768/image.webp",
      title: "Jeanne Dielman",
    },
    {
      list: false,
      image: "https://media.timeout.com/images/105455973/1024/768/image.webp",
      title: "Raiders of the Lost Ark",
    },
    {
      list: false,
      image: "https://media.timeout.com/images/105455978/1024/768/image.webp",
      title: "There will be Blood",
    },
    {
      list: false,
      image: "https://media.timeout.com/images/105455980/1024/768/image.webp",
      title: "Singing in the Rain",
    },
    {
      list: false,
      image: "https://media.timeout.com/images/103262825/1024/768/image.webp",
      title: "Bicycle Theives",
    },
  ]);

  return (
    <div>
      {isLogin && <Login setIsLogin={setIsLogin} />}
      {!isLogin && (
        <>
          <NavBar
            title={"Movies List 🍿"}
            button={!isMyList ? "My List" : "Home"}
            setIsMyList={setIsMyList}
            isMyList={isMyList}
          ></NavBar>
          {!isMyList && <Main movies={movies} setMovies={setMovies} />}
          {isMyList && <MyList movies={movies} />}
        </>
      )}
    </div>
  );
}
