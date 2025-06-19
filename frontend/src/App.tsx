import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Documents from "./pages/Documents";
import DocumentReview from "./pages/DocumentReview";
import SearchPage from "./pages/Search";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicOnlyRoute from "./routes/PublicOnlyRoutes";
import { useAuth } from "./auth/AuthContext";
import Loader from "./components/Loader";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/document" element={<Documents />} />
            <Route path="/document/:id/review" element={<DocumentReview />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>

          <Route
            path="/signup"
            element={
              <PublicOnlyRoute>
                <Signup />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicOnlyRoute>
                <ForgotPassword />
              </PublicOnlyRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
