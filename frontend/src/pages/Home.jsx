import { useState, useEffect } from "react";
import { createWorkout, deleteWorkout, fetchWorkouts } from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Home = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    getWorkouts();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleCreateWorkout = async () => {
    try {
      const newWorkout = await createWorkout();
      navigate(`/workouts/${newWorkout._id}`);
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteWorkout(workoutId);
      setWorkouts((prev) => prev.filter((workout) => workout._id !== workoutId));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="container container-main text-center">
      <h2 className="fw-bold text-white mb-4">Welcome Back, {user.username}!</h2>

      <div className="carousel-container position-relative mb-4">
        {/*<button className="carousel-btn left" onClick="moveCarousel(-1)">*/}
        {/*  &#10094;*/}
        {/*</button>*/}
        {/*<button className="carousel-btn right" onClick="moveCarousel(1)">*/}
        {/*  &#10095;*/}
        {/*</button>*/}

        <div className="carousel-wrapper">
          <div className="carousel-track">
            <div className="stats-card">
              <h5>Total Workouts</h5>
              <p className="fs-4 fw-bold">{workouts.length}</p>
            </div>
            <div className="stats-card">
              <h5>Weekly Workouts</h5>
              <p className="fs-4 fw-bold">3</p>
            </div>
            <div className="stats-card">
              <h5>Weight Progress</h5>
              <canvas id="weightChart" height="120"></canvas>
            </div>
            <div className="stats-card">
              <h5>Bench Press</h5>
              <canvas id="benchChart" height="120"></canvas>
            </div>
            <div className="stats-card">
              <h5>Squat</h5>
              <canvas id="squatChart" height="120"></canvas>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-create mb-4" onClick={handleCreateWorkout}>
        + Create Workout
      </button>

      <h4 className="text-white mb-3">Previous Workouts</h4>
      <ul className="workout-list">
        {workouts.map((workout) => {
          return (
            <li key={workout._id} className="workout-item">
              <Link to={`/workouts/${workout._id}`} className="workout-link">
                <span>
                  {workout.name} - {format(new Date(workout.date), "EEE dd MMM")}
                </span>
              </Link>
              <div className="dropdown">
                <span className="dots-menu" data-bs-toggle="dropdown">
                  &#8942;
                </span>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <button className="dropdown-item text-danger" onClick={() => handleDeleteWorkout(workout._id)}>
                      Delete Workout
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
