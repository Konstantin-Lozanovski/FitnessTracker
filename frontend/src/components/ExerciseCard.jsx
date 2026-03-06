import SetRow from "./SetRow.jsx";

const ExerciseCard = ({ exercise, eIdx, workoutId, handleSetChange, handleAddSet, handleDeleteExercise }) => {
  return (
    <div className="exercise-card mt-4">
      <div className="exercise-header">
        <h5 className="m-0 fw-bold">{exercise.exerciseId.name}</h5>

        <div className="dropdown">
          <span className="dots-menu" data-bs-toggle="dropdown">
            &#8942;
          </span>

          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <button className="dropdown-item text-danger" onClick={() => handleDeleteExercise(exercise._id)}>
                Delete Exercise
              </button>
            </li>
          </ul>
        </div>
      </div>

      {exercise.sets.map((set, sIdx) => (
        <SetRow key={set._id} set={set} eIdx={eIdx} sIdx={sIdx} handleSetChange={handleSetChange} />
      ))}

      <button className="add-set-btn mt-3" onClick={() => handleAddSet(eIdx)}>
        + Add Set
      </button>
    </div>
  );
};

export default ExerciseCard;
