import React, { useState, useEffect } from "react";
import { followUser, unfollowUser } from "../api/api";

const FollowButton = ({ user, targetUserId, initialFollowing }) => {
  const [following, setFollowing] = useState(Boolean(initialFollowing));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialFollowing !== undefined) {
      setFollowing(Boolean(initialFollowing));
      return;
    }
    if (!user) {
      setFollowing(false);
      return;
    }
    // Support several possible shapes for user.following:
    // - array of ids: [2,3]
    // - array of objects: [{ follower_id: 1, following_id: 2 }, ...]
    const list = user.following || [];
    if (Array.isArray(list)) {
      const isFollowing = list.some((item) => {
        if (item == null) return false;
        if (typeof item === "number") return item === targetUserId;
        if (typeof item === "object") {
          return (
            item.following_id === targetUserId ||
            item.id === targetUserId ||
            item.user_id === targetUserId
          );
        }
        return false;
      });
      setFollowing(Boolean(isFollowing));
    } else {
      setFollowing(false);
    }
  }, [user, targetUserId, initialFollowing]);

  const handleFollow = async () => {
    if (!user || user.id === targetUserId || loading) return;
    setLoading(true);
    try {
      if (following) {
        await unfollowUser(user.id, targetUserId);
        setFollowing(false);
      } else {
        await followUser(user.id, targetUserId);
        setFollowing(true);
      }
    } catch (err) {
      console.error("Follow action failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={!user || user.id === targetUserId || loading}
      className={`px-3 py-1 rounded text-white ${
        following ? "bg-sky-700" : "bg-sky-500"
      } ${loading ? "opacity-60 cursor-wait" : ""}`}
      aria-pressed={following}
    >
      {loading ? "..." : following ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;