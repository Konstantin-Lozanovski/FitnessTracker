import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import LoginForm from "../components/LoginForm.jsx";

const Login = ({ user, setUser }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (data) => {
    try {
      const res = await login(data);
      setUser(res.user);
      navigate("/");
    } catch (error) {
      setError(error);
      console.error("Login error: ", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "85vh" }}
    >
      <div className="login-card col-11 col-md-6 col-lg-4">
        <h2 className="text-center mb-4 fw-bold ">Welcome Back</h2>
        <p className="text-center text-muted mb-4">
          Track your workouts and progress every day
        </p>
        <LoginForm handleLogin={handleLogin} />
        {error && <p className="text-danger text-center mt-3 ">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
