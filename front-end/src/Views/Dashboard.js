import { fetch } from "http-client";
import React, { useState, useEffect, Fragment } from "react";
import { Button, Card, CardGroup, Col, Row } from "react-bootstrap";
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
      window.location.reload(false);
    });
  }

  function deleteAssignment(id) {
    const fetchData = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "DELETE",
    };
    fetch(`http://localhost:8080/api/assignments/delete/${id}`, fetchData)
      .then((response) => {
        if (response.status === 200) return response;
      })
      .then(() => {
        alert("Assignment deleted");
        window.location.reload(false);
      });

    /* ajax(
      `http://localhost:8080/api/assignments/delete/${id}`,
      jwt,
      "DELETE"
    ).then((data) => {
      alert("Assignment deleted");
      window.location.reload(false);
    }); */
  }

  return (
    <div className="App" style={{ marginLeft: "30px", marginTop: "10px" }}>
      <h2 className="mt-2" style={{ color: "#3DC095" }}>
        List of assignments for user {username}:
      </h2>
      <div>
        <Row className=" mb-2 gap-3 row-">
          {assignments ? (
            assignments.map((assignment) => (
              <Card
                className="mb-2"
                style={{ width: "22rem" }}
                key={assignment.id}
              >
                <Card.Body>
                  <Card.Title>Assignment #{assignment.id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {assignment.status}
                  </Card.Subtitle>
                  <Card.Text>
                    {assignment.githubUrl}
                    <br />
                    {assignment.branch}
                  </Card.Text>
                  <Link
                    style={{ marginRight: "7px" }}
                    to={`/assignments/${assignment.id}`}
                  >
                    Go to assignment {assignment.id}
                  </Link>
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      deleteAssignment(assignment.id);
                    }}
                  >
                    Delete assignment
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <></>
          )}
        </Row>
      </div>
      <div className="d-flex flex-row justify-content-start">
        <div>
          <Button
            className="btn btn-success"
            onClick={() => createAssignment()}
          >
            Submit new assignment
          </Button>
        </div>
        <div>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
