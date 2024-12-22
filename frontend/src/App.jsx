import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import { ripples } from "ldrs";

function App() {
  const { user, CheckAuth, isCheckingAuth } = useAuthStore();

  // Register the ldrs ripple effect
  ripples.register();

  // Check user authentication status on mount
  useEffect(() => {
    CheckAuth();
  }, [CheckAuth]);

  // Render a loader while checking authentication
  if (isCheckingAuth && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <l-ripples size="60" speed="2" color="black" />
      </div>
    );
  }

  // Main App layout
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={!user ?  <SignupPage /> :  <Navigate to="/" />} />
        <Route path="/signin" element={!user ? <SigninPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;
