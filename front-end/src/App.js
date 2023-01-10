import "./App.css";
import { React } from "react";

function App() {
  fetch("http://localhost:8080/api/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: "admin",
      password: "password",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  return (
    <div className="App">
      <h1> Hello World </h1>
    </div>
  );
}

export default App;
