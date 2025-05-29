import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setProfile(res.data);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-orange-50">
      <h2 className="text-2xl font-bold text-orange-700 mb-4">Profile</h2>

      {profile ? (
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Username:</strong> {profile.username}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
