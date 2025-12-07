import React, { useState } from "react";

export default function LikeButton({
  postId,
  initialLiked,
  likesCount,
  onToggle,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(likesCount);

  const handleClick = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    onToggle(!liked);
  };

  return (
    <button
      onClick={handleClick}
      className={`mr-2 px-3 py-1 rounded ${
        liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      ❤️ {count}
    </button>
  );
}
