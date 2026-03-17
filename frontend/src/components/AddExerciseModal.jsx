import { useState, useEffect } from "react";
import { addExerciseToWorkout, fetchAllExercises } from "../services/api.js";

const AddExerciseModal = ({ workoutId, closeModal }) => {
  const [step, setStep] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exercises, setExercises] = useState([]);

  const categories = [...new Set(exercises.map((ex) => ex.category))];
  const filteredExercises = exercises.filter((ex) => ex.category === selectedCategory);

  useEffect(() => {
    const getExercises = async () => {
      const data = await fetchAllExercises();
      setExercises(data);
    };

    getExercises();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setStep("exercises");
  };

  const handleAddExercise = async (exerciseId) => {
    try {
      await addExerciseToWorkout(workoutId, { exerciseId, exerciseModel: "Exercise" });
      closeModal();
      window.location.reload(); // quick refresh for now
    } catch (err) {
      console.error("Error adding exercise:", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          ✕
        </button>

        {step === "categories" && (
          <>
            <h3 className="modal-title">Select Category</h3>

            {categories.map((cat) => (
              <button key={cat} className="category-btn" onClick={() => handleCategoryClick(cat)}>
                {cat}
              </button>
            ))}
          </>
        )}

        {step === "exercises" && (
          <>
            <button className="category-btn" onClick={() => setStep("categories")}>
              ← Back
            </button>

            <h3 className="modal-title">{selectedCategory}</h3>

            {filteredExercises.map((ex) => (
              <button key={ex._id} className="category-btn" onClick={() => handleAddExercise(ex._id)}>
                {ex.name}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AddExerciseModal;
