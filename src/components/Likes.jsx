import { useState } from "react";
import { api } from "../api/api";

export default function Likes({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    try {
      if (liked) {
        await api.unlikePost(postId);
        setLikes(likes - 1);
      } else {
        await api.likePost(postId);
        setLikes(likes + 1);
      }
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={toggleLike} className="text-red-500 hover:text-red-700">
        ❤️
      </button>
      <span>{likes}</span>
    </div>
  );
}
