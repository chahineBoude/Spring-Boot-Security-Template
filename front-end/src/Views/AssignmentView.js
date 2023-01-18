import React from "react";

const AssignmentView = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];

  return <h1>Assignment {assignmentId}</h1>;
};

export default AssignmentView;
