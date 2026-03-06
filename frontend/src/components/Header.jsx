import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Fitness Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/workouts">
                Workouts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/graphs">
                Graphs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                My Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/login"} onClick={logout}>
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
