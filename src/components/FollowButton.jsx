import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function FollowButton({ userId }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Optionally fetch initial follow state from API
    // Example: api.isFollowing(userId).then(setIsFollowing)
  }, [userId]);

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await api.unfollowUser(userId);
      } else {
        await api.followUser(userId);
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={toggleFollow}
      className={`px-3 py-1 rounded ${
        isFollowing ? "bg-gray-300 text-black" : "bg-blue-600 text-white"
      } hover:opacity-80 transition`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
