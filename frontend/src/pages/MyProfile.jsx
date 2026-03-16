import { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/api.js"; // make sure these API functions exist
import { useNavigate } from "react-router-dom";

const MyProfile = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchUserProfile(); // returns { username, email, goalWeight, ... }
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      alert("Profile updated!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (!profile) return <p className="text-white">Profile not found</p>;

  return (
    <div className="container container-main">
      <h2 className="fw-bold text-white mb-4">My Profile</h2>

      {/* Personal Info */}
      <div className="form-card mb-4">
        <h5 className="fw-bold mb-3">Personal Information</h5>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" value={profile.username || ""} disabled />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={profile.email || ""} disabled />
        </div>
      </div>

      {/* Bodyweight Goal */}
      <div className="form-card mb-4">
        <h5 className="fw-bold mb-3">Fitness Goals</h5>
        <div className="mb-3">
          <label>Bodyweight Goal (kg)</label>
          <input
            type="number"
            className="form-control"
            value={profile.goalWeight || ""}
            onChange={(e) => handleChange("goalWeight", Number(e.target.value))}
          />
        </div>

        {/* You can add more goals later, e.g., exercise targets */}
      </div>

      <button className="btn btn-create mt-3" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default MyProfile;
