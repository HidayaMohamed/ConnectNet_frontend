import React, { useState, useEffect } from "react";
import { toggleLike } from "../api/api";

const LikeButton = ({ post = {}, user }) => {
  const safeLikesArray = Array.isArray(post.likes) ? post.likes : [];
  const [likes, setLikes] = useState(safeLikesArray.length);

  const determineLiked = (p, u) => {
    if (!u || !Array.isArray(p?.likes)) return false;
    return p.likes.some((like) => {
      if (!like) return false;
      return (like.user?.id ?? like.user_id ?? like.userId) === u.id;
    });
  };

  const [liked, setLiked] = useState(() => determineLiked(post, user));

  useEffect(() => {
    setLikes(Array.isArray(post?.likes) ? post.likes.length : 0);
    setLiked(determineLiked(post, user));
  }, [post, user]);

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like a post.");
      return;
    }

    const currentLiked = liked;
    const newLiked = !currentLiked;
    setLiked(newLiked);
    setLikes((prev) => (newLiked ? prev + 1 : Math.max(0, prev - 1)));

    try {
      await toggleLike(user.id, post.id, currentLiked);
    } catch (error) {
      console.error("Like/Unlike failed:", error);
      setLiked(currentLiked);
      setLikes((prev) => (currentLiked ? prev + 1 : Math.max(0, prev - 1)));
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
        aria-pressed={liked}
        aria-label={liked ? "Unlike" : "Like"}
      >
        {liked ? "❤️ Liked" : "🤍 Like"}
      </button>
      <span className="text-gray-600 text-sm">{likes} likes</span>
    </div>
  );
};

export default LikeButton;