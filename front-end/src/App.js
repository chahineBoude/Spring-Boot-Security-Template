import "./App.css";
import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Views/Dashboard";
import Homepage from "./Views/Homepage";
import Login from "./Views/Login";
import PrivateRoute from "./Views/PrivateRoute";
import AssignmentView from "./Views/AssignmentView";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
