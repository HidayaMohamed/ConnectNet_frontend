import { useState } from "react";
import { apiPost, apiDelete } from "../api/api";

export default function FollowButton({ userId, targetUserId }) {
  const [following, setFollowing] = useState(false);

  const toggleFollow = async () => {
    if (following) {
      await apiDelete("/follows/", {
        follower_user_id: userId,
        following_user_id: targetUserId,
      });
    } else {
      await apiPost("/follows/", {
        follower_user_id: userId,
        following_user_id: targetUserId,
      });
    }
    setFollowing(!following);
  };

  return (
    <button
      onClick={toggleFollow}
      className={`px-3 py-1 rounded ${
        following ? "bg-gray-300" : "bg-blue-600 text-white"
      }`}
    >
      {following ? "Unfollow" : "Follow"}
    </button>
  );
}
