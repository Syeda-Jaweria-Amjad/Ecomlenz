import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./pages/Login/LoginPage";
import Signup from "./pages/SignUp/SignUp";
import LandingPage from "./pages/LandingPage/LandingPage";
import SendEmail from "./pages/SendEmail/SendEmail";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/auth/load-current-user",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);

        if (data.user) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadCurrentUser();
  }, []);
  console.log(isAuthenticated);
  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <Dashboard /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
