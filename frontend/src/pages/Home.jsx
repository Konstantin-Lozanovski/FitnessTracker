import { useState, useEffect, useRef } from "react";
import { createWorkout, deleteWorkout, fetchWorkouts } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import WeightChart from "../components/WeightChart.jsx";

const Home = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleCards = 3;
  const trackRef = useRef(null);

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

  const moveCarousel = (direction) => {
    const cards = trackRef.current.children;
    const cardWidth = cards[0].offsetWidth + 16; // 16px = 1rem gap

    const maxIndex = cards.length - visibleCards;

    setCarouselIndex((prev) => {
      let next = prev + direction;

      if (next < 0) next = 0;
      if (next > maxIndex) next = maxIndex;

      trackRef.current.style.transform = `translateX(-${next * cardWidth}px)`;

      return next;
    });
  };

  return (
    <div className="container container-main text-center">
      <h2 className="fw-bold text-white mb-4">Welcome Back, {user.username}!</h2>

      <div className="carousel-container position-relative mb-4">
        <button className="carousel-btn left" onClick={() => moveCarousel(-1)}>
          &#10094;
        </button>
        <button className="carousel-btn right" onClick={() => moveCarousel(1)}>
          &#10095;
        </button>

        <div className="carousel-wrapper">
          <div className="carousel-track" ref={trackRef}>
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
              <WeightChart workouts={workouts} />
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
            <li
              key={workout._id}
              className="workout-item"
              onClick={(e) => {
                if (e.target.closest(".dropdown")) return;
                navigate(`/workouts/${workout._id}`);
              }}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/workouts/${workout._id}`)}
            >
              <span>
                {workout.name} - {format(new Date(workout.date), "EEE dd MMM")}
              </span>
              <div className="dropdown">
                <span className="dots-menu" data-bs-toggle="dropdown">
                  &#8942;
                </span>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={(e) => {
                        e.stopPropagation(); // prevents li click
                        handleDeleteWorkout(workout._id);
                      }}
                    >
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
