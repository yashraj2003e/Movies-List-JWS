export default function NavBar({ title, button, isMyList, setIsMyList }) {
  return (
    <div className="nav-bar">
      <h1>{title}</h1>
      <button onClick={() => setIsMyList((val) => !val)} className="nav-btn">
        {button}
      </button>
    </div>
  );
}
