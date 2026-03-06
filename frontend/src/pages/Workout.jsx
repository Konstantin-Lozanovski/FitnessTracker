import { useState, useEffect } from "react";
import { deleteExercise, deleteWorkout, fetchWorkoutById, updateWorkout, updateWorkoutExercise } from "../services/api.js";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const Workout = ({ user }) => {
  const [workout, setWorkout] = useState(null);
  const { workoutId } = useParams();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getWorkoutById = async () => {
      try {
        const data = await fetchWorkoutById(workoutId);
        setWorkout(data);
        console.log("USEEFFECT FIRST");
        console.log(data);
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

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteWorkout(workoutId);
      navigate("/");
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleSetChange = async (exerciseIndex, setIndex, field, value) => {
    console.log("SET CHANGE");
    console.log(value);

    setWorkout((prev) => {
      const newWorkout = { ...prev };
      newWorkout.exercises[exerciseIndex].sets[setIndex][field] = value;
      return newWorkout;
    });

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
    console.log("ADD SET");
    const exerciseId = workout.exercises[exerciseIndex]._id;
    const newSet = { weight: 0, reps: 0, notes: "" };

    let createdSet = null;

    try {
      createdSet = await updateWorkoutExercise(workoutId, exerciseId, { set: newSet });
    } catch (error) {
      console.error("Error adding set:", error);
    }

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

  if (loading) return <p>Loading...</p>;
  if (!workout) return <p>Workout not found</p>;

  return (
    <div className="container-main">
      {/*// <!-- Top Workout Header -->*/}
      <div className="workout-header">
        <button className="finish-btn" onClick="finishWorkout()">
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
          <input
            type="text"
            className="form-control"
            placeholder="Leg Day"
            value={workout.name || ""}
            onChange={(e) => handleWorkoutChange("name", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Bodyweight (kg)</label>
          <input
            type="number"
            className="form-control"
            placeholder="70"
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
          <div key={exercise._id} className="exercise-card mt-4">
            <div className="exercise-header">
              <h5 className="m-0 fw-bold">{exercise.exerciseId.name}</h5>
              <div className="dropdown">
                <span className="dots-menu" data-bs-toggle="dropdown">
                  &#8942;
                </span>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item text-danger" href="#" onClick={() => handleDeleteExercise(exercise._id)}>
                      Delete Exercise
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {exercise.sets.map((set, sIdx) => (
              <div key={set._id} className="set-row mt-3">
                <div className="input-group-custom">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={set.weight || ""}
                    onChange={(e) => handleSetChange(eIdx, sIdx, "weight", Number(e.target.value))}
                  />
                </div>
                <div className="input-group-custom">
                  <label>Reps</label>
                  <input
                    type="number"
                    className="form-control"
                    value={set.reps || ""}
                    onChange={(e) => handleSetChange(eIdx, sIdx, "reps", Number(e.target.value))}
                  />
                </div>
                <div className="input-group-custom">
                  <label>Notes</label>
                  <input
                    type="text"
                    className="form-control"
                    value={set.notes}
                    onChange={(e) => handleSetChange(eIdx, sIdx, "notes", e.target.value)}
                  />
                </div>
                <div className="dropdown align-self-end">
                  <span className="dots-menu" data-bs-toggle="dropdown">
                    &#8942;
                  </span>
                  <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                      <a className="dropdown-item text-danger" href="#">
                        Delete Set
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}

            <button className="add-set-btn mt-3" onClick={() => handleAddSet(eIdx)}>
              + Add Set
            </button>
          </div>
        ))}

        <button className="add-exercise-btn">+ Add Exercise</button>
      </div>
    </div>
  );
};

export default Workout;
