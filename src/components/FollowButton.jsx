import React, { useState } from "react";
import { api } from "../api/api";

export default function FollowButton({ userId, initialFollowing }) {
  const [following, setFollowing] = useState(initialFollowing);

  const handleFollow = async () => {
    try {
      if (following) {
        await api.unfollowUser(userId);
        setFollowing(false);
      } else {
        await api.followUser(userId);
        setFollowing(true);
      }
    } catch (err) {
      console.error("Error following/unfollowing user:", err);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-3 py-1 rounded ${
        following ? "bg-gray-300 text-black" : "bg-blue-500 text-white"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
