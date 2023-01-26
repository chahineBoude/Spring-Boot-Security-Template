import React, { Fragment, useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalState } from "../utils/useLocalStorage";
import ajax from "./../utils/fetchService";
import Logout from "../components/Logout";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({});

  const urlRef = useRef(null);
  const branchRef = useRef(null);

  function updateAssignment(prop, value) {
    assignment[prop] = value;
    console.log(assignment);
  }

  function saveUpdates() {
    ajax(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      jwt,
      "PUT",
      assignment
    ).then((assignmentData) => {
      setAssignment(assignmentData);
      urlRef.current.value = "";
      branchRef.current.value = "";
      alert("Assignment updated successfully");
    });
  }

  useEffect(() => {
    ajax(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      jwt,
      "GET"
    ).then((assignmentData) => {
      setAssignment(assignmentData);
    });
  }, []);

  return (
    <div style={{ margin: "30px" }}>
      <Fragment>
        <div>
          <h1>Assignment {assignmentId}</h1>
          <>
            <h2>Status: {assignment.status}</h2>
            <h3>
              Github URL: {assignment.githubUrl}
              <br />
              <input
                type="url"
                ref={urlRef}
                id="githubUrl"
                style={{ marginTop: "5px", marginLeft: "158px" }}
                placeholder={assignment.githubUrl}
                size="30"
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              />
            </h3>
            <h3>
              Branch: {assignment.branch}
              <br />
              <input
                style={{ marginTop: "5px", marginLeft: "100px" }}
                type="text"
                ref={branchRef}
                id="branch"
                placeholder={assignment.branch}
                onChange={(e) => updateAssignment("branch", e.target.value)}
              />
            </h3>
            <Button
              className="btw btn-success"
              style={{ marginTop: "5px" }}
              onClick={() => saveUpdates()}
            >
              Submit Assignment
            </Button>
          </>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Link to="/dashboard" style={{ marginRight: "27px" }}>
            <Button className="btn btn-danger">Return</Button>
          </Link>
          <Logout />
        </div>
      </Fragment>
    </div>
  );
};

export default AssignmentView;
