import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/auth";
import RegisterForm from "../components/RegisterForm.jsx";

function Register({ user, setUser }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSignup = async (formData) => {
    try {
      const res = await signUp(formData);
      setUser(res.user);
      navigate("/");
    } catch (error) {
      setError(error);
      console.error("Signup error: ", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "85vh" }}
    >
      <div className="register-card col-11 col-md-6 col-lg-4">
        <h2 className="text-center mb-4 fw-bold ">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Join us and start tracking your workouts
        </p>
        <RegisterForm handleSignup={handleSignup} />
        {error && <p className="text-danger text-center mt-3 ">{error}</p>}
      </div>
    </div>
  );
}

export default Register;
