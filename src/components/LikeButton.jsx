import React, { useState } from "react";
import { toggleLike } from "../api/api";

const LikeButton = ({ post, user }) => {
  const [liked, setLiked] = useState(post.liked_by_user || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [loading, setLoading] = useState(false);

  const handleToggleLike = async () => {
    if (!user) return; // cannot like if not logged in
    const previousLiked = liked;

    // Optimistic update
    setLiked(!previousLiked);
    setLikesCount((prev) => prev + (previousLiked ? -1 : 1));
    setLoading(true);

    try {
      await toggleLike(user.id, post.id, previousLiked);
    } catch (err) {
      console.error("Error toggling like:", err);
      // revert UI if API fails
      setLiked(previousLiked);
      setLikesCount((prev) => prev + (previousLiked ? 1 : -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading || !user}
      className={`flex items-center space-x-2 text-gray-700 hover:text-red-500 transition ${
        liked ? "text-red-500" : ""
      }`}
    >
      <span className="text-xl">{liked ? "❤️" : "🤍"}</span>
      <span className="text-sm">{likesCount}</span>
    </button>
  );
};

export default LikeButton;
