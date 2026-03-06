import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ handleLogin }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control rounded-pill"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="rememberMe" />
        <label className="form-check-label" htmlFor="rememberMe">
          Remember me
        </label>
      </div>
      <button type="submit" className="btn btn-primary w-100 btn-lg shadow-sm">
        Login
      </button>
      <p className="text-center mt-3">
        Don't have an account?
        <Link className="" to="/register">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
