import "./App.css";
import { React, useEffect } from "react";
import { useLocalState } from "./utils/useLocalStorage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    console.log(`JWT IS: ${jwt}`);
  }, []);

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
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
