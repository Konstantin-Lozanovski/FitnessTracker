import { useState, useEffect } from "react";
import { deleteExercise, deleteSet, deleteWorkout, fetchWorkoutById, updateWorkout, updateWorkoutExercise } from "../services/api.js";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import ExerciseCard from "../components/ExerciseCard.jsx";
import AddExerciseModal from "../components/AddExerciseModal.jsx";

const Workout = ({ user }) => {
  const [workout, setWorkout] = useState(null);
  const { workoutId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getWorkoutById = async () => {
      try {
        const data = await fetchWorkoutById(workoutId);
        setWorkout(data);
      } catch (error) {
        console.error("Error fetching workout:", error);
      } finally {
        setLoading(false);
      }
    };

    getWorkoutById();
  }, [workoutId]);

  const handleWorkoutChange = async (field, value) => {
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [field]: value,
    }));

    try {
      await updateWorkout(workout._id, { [field]: value });
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  const handleFinishWorkout = async () => {
    try {
      const now = new Date();
      const time = now.toTimeString().slice(0, 5);

      await updateWorkout(workout._id, { endTime: time });
      navigate("/");
    } catch (error) {
      console.error("Error finishing workout:", error);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteWorkout(workoutId);
      navigate("/");
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleSetChange = async (exerciseIndex, setIndex, field, value) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex, eIdx) =>
        eIdx === exerciseIndex
          ? {
              ...ex,
              sets: ex.sets.map((set, sIdx) => (sIdx === setIndex ? { ...set, [field]: value } : set)),
            }
          : ex,
      ),
    }));

    const exercise = workout.exercises[exerciseIndex];
    const setId = exercise.sets[setIndex]._id;

    try {
      await updateWorkoutExercise(workout._id, exercise._id, {
        setId,
        [field]: value,
      });
    } catch (error) {
      console.error("Error updating set:", error);
    }
  };

  const handleAddSet = async (exerciseIndex) => {
    const exerciseId = workout.exercises[exerciseIndex]._id;
    const newSet = { weight: 0, reps: 0, notes: "" };

    let createdSet = null;

    try {
      createdSet = await updateWorkoutExercise(workoutId, exerciseId, { set: newSet });
    } catch (error) {
      console.error("Error adding set:", error);
    }

    if (!createdSet) return;

    setWorkout((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.map((ex, idx) =>
          idx === exerciseIndex
            ? {
                ...ex,
                sets: [...ex.sets, { ...newSet, _id: createdSet._id }], // <-- create new sets array
              }
            : ex,
        ),
      };
    });
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      await deleteExercise(workoutId, exerciseId);

      setWorkout((prev) => ({
        ...prev,
        exercises: prev.exercises.filter((ex) => ex._id !== exerciseId),
      }));
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const handleDeleteSet = async (exerciseIndex, setIndex) => {
    const exercise = workout.exercises[exerciseIndex];
    const set = exercise.sets[setIndex];

    try {
      await deleteSet(workout._id, exercise._id, set._id);

      setWorkout((prev) => ({
        ...prev,
        exercises: prev.exercises.map((ex, eIdx) =>
          eIdx === exerciseIndex
            ? {
                ...ex,
                sets: ex.sets.filter((_, sIdx) => sIdx !== setIndex),
              }
            : ex,
        ),
      }));
    } catch (error) {
      console.error("Error deleting set:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!workout) return <p>Workout not found</p>;

  return (
    <div className="container-main">
      {/*// <!-- Top Workout Header -->*/}
      <div className="workout-header">
        <button className="finish-btn" onClick={handleFinishWorkout}>
          Finish
        </button>
        <h5 className="m-0 fw-bold">{workout?.date && format(new Date(workout.date), "EEE dd MMM")}</h5>
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
      </div>
      {/*// <!-- Workout Form -->*/}
      <div className="form-card">
        <div className="mb-3">
          <label>Workout Name</label>
          <input type="text" className="form-control" value={workout.name || ""} onChange={(e) => handleWorkoutChange("name", e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Bodyweight (kg)</label>
          <input
            type="number"
            className="form-control"
            value={workout.bodyWeight || ""}
            onChange={(e) => handleWorkoutChange("bodyWeight", Number(e.target.value))}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              value={workout.date ? new Date(workout.date).toISOString().split("T")[0] : ""}
              onChange={(e) => handleWorkoutChange("date", e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Start Time</label>
            <input
              type="time"
              className="form-control"
              value={workout.startTime || ""}
              onChange={(e) => handleWorkoutChange("startTime", e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>End Time</label>
            <input
              type="time"
              className="form-control"
              id="endTime"
              value={workout.endTime || ""}
              onChange={(e) => handleWorkoutChange("endTime", e.target.value)}
            />
          </div>
        </div>

        {workout.exercises.map((exercise, eIdx) => (
          <ExerciseCard
            key={exercise._id}
            exercise={exercise}
            eIdx={eIdx}
            workoutId={workout._id}
            handleSetChange={handleSetChange}
            handleAddSet={handleAddSet}
            handleDeleteSet={handleDeleteSet}
            handleDeleteExercise={handleDeleteExercise}
          />
        ))}

        <button className="add-exercise-btn" onClick={() => setIsModalOpen(true)}>
          + Add Exercise
        </button>
      </div>
      {isModalOpen && <AddExerciseModal workoutId={workout._id} closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Workout;
