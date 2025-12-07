import React, { useState } from "react";
import { followUser, unfollowUser } from "../api/api";

// Button to follow/unfollow a user
const FollowButton = ({ user, targetUserId }) => {
  const [following, setFollowing] = useState(false);

  const handleFollow = async () => {
    if (!user) return;
    if (following) {
      await unfollowUser(user.id, targetUserId);
    } else {
      await followUser(user.id, targetUserId);
    }
    setFollowing(!following);
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-3 py-1 rounded text-white ${
        following ? "bg-sky-700" : "bg-sky-500"
      }`}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
