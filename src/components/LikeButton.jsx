import React, { useEffect, useState } from "react";
import { likePost, unlikePost, getLikes } from "../api/api";

// Button to like or unlike a post
const LikeButton = ({ post, user }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  // Load likes count
  useEffect(() => {
    const fetchLikes = async () => {
      const count = await getLikes(post.id);
      setLikes(count);
    };
    fetchLikes();
  }, [post.id]);

  // Handle like/unlike
  const handleLike = async () => {
    if (!user) return;
    if (liked) {
      await unlikePost(user.id, post.id);
      setLikes(likes - 1);
    } else {
      await likePost(user.id, post.id);
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <button
        onClick={handleLike}
        className={`px-2 py-1 rounded ${
          liked ? "bg-sky-700 text-white" : "bg-sky-300 text-white"
        }`}
      >
        {liked ? "Liked" : "Like"}
      </button>
      <span>{likes} likes</span>
    </div>
  );
};

export default LikeButton;
