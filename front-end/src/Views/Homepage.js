import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Fragment>
      <div>
        <h1>Homepage</h1>
      </div>
      <div style={{ margin: "20px" }}>
        <Link to="/dashboard">
          <Button className="btn btn-danger">Hello</Button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Homepage;
