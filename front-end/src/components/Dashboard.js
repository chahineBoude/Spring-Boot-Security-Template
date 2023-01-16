import { fetch } from "http-client";
import React from "react";
import { useLocalState } from "../utils/useLocalStorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  console.log(jwt);
  function createAssignment() {
    fetch("http://localhost:8080/api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        console.log(response.json());
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <div className="App" style={{ margin: "30px" }}>
        <button onClick={() => createAssignment()}>
          Submit new assignment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
