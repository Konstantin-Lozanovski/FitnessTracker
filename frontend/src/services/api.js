import axiosInstance from "./axiosInstance";

export const fetchWorkouts = async () => {
  try {
    const response = await axiosInstance.get("/api/workouts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createWorkout = async () => {
  try {
    const response = await axiosInstance.post("/api/workouts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWorkoutById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/workouts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateWorkout = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/api/workouts/${id}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWorkout = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/workouts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateWorkoutExercise = async (workoutId, exerciseId, data) => {
  try {
    const response = await axiosInstance.patch(`/api/workouts/${workoutId}/exercises/${exerciseId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteExercise = async (workoutId, exerciseId) => {
  try {
    const response = await axiosInstance.delete(`/api/workouts/${workoutId}/exercises/${exerciseId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSet = async (workoutId, exerciseId, setId) => {
  try {
    const response = await axiosInstance.delete(`/api/workouts/${workoutId}/exercises/${exerciseId}/sets/${setId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
