import { useState } from "react";

export default function Login({ setIsLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function checkUser(e) {
    e.preventDefault();

    const result = await fetch("http://localhost:8082/checkuser", {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await result.json();
    console.log(data);
    if (data == "1") {
      window.alert(`Welcome ${username}`);
      setIsLogin((val) => !val);
    } else {
      window.alert("Incorrect Username/Password !");
    }
  }

  return (
    <div className="login">
      <form method="" onSubmit={(e) => checkUser(e)}>
        <table>
          <tbody>
            <tr>
              <td>
                <label style={{ marginRight: "2rem" }}>Enter username</label>
              </td>
              <td>
                <input onChange={(e) => setUsername(e.target.value)}></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Enter password</label>
              </td>
              <td>
                <input onChange={(e) => setPassword(e.target.value)}></input>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          style={{ marginLeft: "18vw", marginTop: "2rem" }}
          className="nav-btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
