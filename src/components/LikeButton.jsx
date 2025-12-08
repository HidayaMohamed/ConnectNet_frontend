import React, { useState } from "react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 ${
        liked ? "text-red-500" : "text-gray-700"
      }`}
    >
      <span className="text-xl">{liked ? "❤️" : "🤍"}</span>
      <span>{count}</span>
    </button>
  );
};

export default LikeButton;
