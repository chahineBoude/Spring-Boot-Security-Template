import "./App.css";
import { React, useEffect } from "react";
import { useLocalState } from "./utils/useLocalStorage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import Homepage from "./Views/Homepage";
import Login from "./Views/Login";
import PrivateRoute from "./Views/PrivateRoute";
import AssignmentView from "./Views/AssignmentView";

function App() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/assignments/:id"
        element={
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
