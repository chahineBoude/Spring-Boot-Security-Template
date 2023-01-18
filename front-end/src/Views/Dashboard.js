import { fetch } from "http-client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocalState } from "../utils/useLocalStorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        setAssignments(data);
      });
  }, []);

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
        if (response.status === 200) return response;
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <div className="App" style={{ margin: "30px" }}>
        {assignments ? (
          assignments.map((assignment) => (
            <div>
              <ul>
                <li>
                  <Link to={`/assignments/${assignment.id}`}>
                    Assignment ID: {assignment.id}{" "}
                  </Link>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <></>
        )}
        <button onClick={() => createAssignment()}>
          Submit new assignment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
