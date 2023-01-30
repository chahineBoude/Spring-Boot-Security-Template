import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../utils/useLocalStorage";
import ajax from "./../utils/fetchService";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isValid, setIsValid] = useState(true);
  useEffect(() => {
    ajax("http://localhost:8080/api/auth/validate/", jwt, "GET").then(
      (data) => {
        console.log(isValid);
        setIsValid(data);
      }
    );
  }, []);

  if (jwt) {
    if (isValid) {
      return children;
    } else {
      alert("Your session has expired");
      setJwt("");
      return <Navigate to="/login" />;
    }
  } else return <Navigate to="/login" />;
};

export default PrivateRoute;
