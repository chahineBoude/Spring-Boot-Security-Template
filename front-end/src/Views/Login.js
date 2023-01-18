import React, { Fragment, useState } from "react";
import { useLocalState } from "../utils/useLocalStorage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLogInRequest() {
    if (!jwt) {
      fetch("http://localhost:8080/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else return Promise.reject("Invalid Username or Password");
        })
        .then((data) => {
          const token = data["token"];
          setJwt(token);
          window.location.href = "/dashboard";
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <Fragment>
      <div>
        <h1>Login</h1>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button id="submit" type="button" onClick={() => sendLogInRequest()}>
          Login
        </button>
      </div>
    </Fragment>
  );
};

export default Login;
