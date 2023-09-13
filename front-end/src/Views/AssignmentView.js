import React, { Fragment, useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalState } from "../utils/useLocalStorage";
import ajax from "./../utils/fetchService";
import Logout from "../components/Logout";
import {
  Badge,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignment] = useState({});
  const [assignmentEnum, setAssignmentEnum] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const urlRef = useRef(null);
  const branchRef = useRef(null);
  let affich;

  function updateAssignment(prop, value) {
    assignment[prop] = value;
    assignment["status"] = `${prop} of assignment has been updated`;
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
    ).then((assignmentResponse) => {
      let assignmentData = assignmentResponse.assignment;
      console.log(assignmentData);
      setAssignment(assignmentData);
      setAssignmentEnum(assignmentResponse.assignmentEnums);
    });
  }, []);

  return (
    <Fragment>
      <Container>
        <Row className="d-flex align-items-center">
          <Col className="col-4">
            <h1>Assignment {assignmentId}</h1>
          </Col>
          <Col>
            <h3>
              <Badge
                pill
                bg={`${
                  assignment.githubUrl !== null ? "success" : "secondary"
                }`}
              >
                Status: {assignment.status}
              </Badge>
            </h3>
          </Col>
        </Row>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column xs="3" sm="2">
            Go To Assignment:
          </Form.Label>
          <Col xs="9" sm="10" className="mb-3">
            <ButtonGroup>
              <DropdownButton
                as={ButtonGroup}
                id="assignment"
                variant={"success"}
                title={
                  selectedAssignment
                    ? `Assignment ${selectedAssignment}`
                    : "Select an assignment"
                }
                onSelect={(e) => {
                  e === "deselect"
                    ? setSelectedAssignment(null)
                    : setSelectedAssignment(e);
                }}
                onChange={(e) => {
                  window.location = `/assignments/${selectedAssignment}`;
                }}
              >
                {assignmentEnum.map((enums, i) => (
                  <Dropdown.Item
                    className="dditem"
                    eventKey={
                      enums.length === 12
                        ? (affich = enums[11])
                        : (affich = enums[11] + enums[12])
                    }
                    key={i}
                  >
                    Assignment &nbsp;
                    {enums.length === 12
                      ? (affich = enums[11])
                      : (affich = enums[11] + enums[12])}
                  </Dropdown.Item>
                ))}
                <Dropdown.Item className="dditem-cancel" eventKey={"deselect"}>
                  Cancel
                </Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Col>
          <Form.Label column xs="3" sm="2">
            Github URL:
          </Form.Label>
          <Col xs="9" sm="10">
            <Form.Control
              type="url"
              placeholder={assignment.githubUrl}
              onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              ref={urlRef}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column xs="3" sm="2">
            Branch
          </Form.Label>
          <Col xs="9" sm="10">
            <Form.Control
              type="text"
              placeholder={assignment.branch}
              onChange={(e) => updateAssignment("branch", e.target.value)}
              ref={branchRef}
            />
          </Col>
        </Form.Group>
        <Button
          className="btw btn-success"
          style={{ marginTop: "5px" }}
          onClick={() => saveUpdates()}
        >
          Submit Assignment
        </Button>
      </Container>
      <Container className="mt-2 d-flex ">
        <Row>
          <ButtonGroup>
            <Col xs="7">
              <Link to="/dashboard">
                <Button className="btn btn-danger">Return</Button>
              </Link>
            </Col>
            <Col xs="2">
              <Logout />
            </Col>
          </ButtonGroup>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AssignmentView;
