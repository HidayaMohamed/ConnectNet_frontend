import React, { useState } from "react";
import { toggleLike } from "../api/api";

const LikeButton = ({ post, user }) => {
  // 1. Calculate initial count from the 'likes' array provided by the backend
  const initialLikesCount = post.likes ? post.likes.length : 0;
  const [likes, setLikes] = useState(initialLikesCount);

  // 2. Determine initial liked status by checking the likes array
  const initialLikedStatus = user
    ? post.likes.some((like) => like.user.id === user.id)
    : false;
  const [liked, setLiked] = useState(initialLikedStatus);

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like a post.");
      return;
    }

    try {
      // The toggleLike function handles POST/DELETE based on the 'liked' state
      await toggleLike(post.id, user.id, liked);

      // Update local state immediately for a smooth UX
      setLikes(liked ? likes - 1 : likes + 1);
      setLiked(!liked);
    } catch (error) {
      console.error("Like/Unlike failed:", error);
    }
  };

  return (
    <div className="flex items-center space-x-3 mb-2">
      <button
        onClick={handleLike}
        className={`px-4 py-1 rounded-full text-sm font-semibold transition duration-200 ${
          liked
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
      <span className="text-gray-600 text-sm">{likes} likes</span>
    </div>
  );
};

export default LikeButton;
