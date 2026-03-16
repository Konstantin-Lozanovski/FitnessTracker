import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "./services/auth.js";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Workout from "./pages/Workout.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      {user && <Header user={user} setUser={setUser} />}
      <main className="flex-grow-1">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workouts/:workoutId"
            element={
              <ProtectedRoute user={user}>
                <Workout user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
