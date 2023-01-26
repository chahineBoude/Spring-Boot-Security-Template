import { fetch } from "http-client";
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import { useLocalState } from "../utils/useLocalStorage";
import ajax from "./../utils/fetchService";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    /* fetch("http://localhost:8080/api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      }) */
    ajax("http://localhost:8080/api/assignments", jwt, "GET").then((data) => {
      setAssignments(data);
    });
  }, []);

  useEffect(() => {
    /* fetch("http://localhost:8080/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      }) */
    ajax("http://localhost:8080/api/user", jwt, "GET").then((data) => {
      setUsername(data);
    });
  }, []);

  function createAssignment() {
    ajax("http://localhost:8080/api/assignments", jwt, "POST").then((data) => {
      console.log(data);
      alert("Assigned successfully added for user " + username);
    });
  }

  return (
    <div>
      <div className="App" style={{ marginLeft: "30px", marginTop: "10px" }}>
        <h2 style={{ color: "#3DC095" }}>
          List of assignments for user {username}:
        </h2>
        <ul>
          {assignments ? (
            assignments.map((assignment) => (
              <div key={assignment.id}>
                <li>
                  <Link to={`/assignments/${assignment.id}`}>
                    Assignment ID: {assignment.id}
                  </Link>
                  &nbsp;{assignment.status}
                </li>
              </div>
            ))
          ) : (
            <></>
          )}
        </ul>
        <Button className="btn btn-success" onClick={() => createAssignment()}>
          Submit new assignment
        </Button>
        <br />
        <Logout />
        <br />
      </div>
    </div>
  );
};

export default Dashboard;
