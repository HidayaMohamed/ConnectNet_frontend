import React, { useState } from "react";

export default function PostCard({ post, onLike }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(post.id, !liked);
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <p className="font-bold">User ID: {post.user_id}</p>
      <p>{post.caption}</p>
      {post.media_url && (
        <img src={post.media_url} alt="media" className="mt-2 rounded" />
      )}
      <div className="flex mt-2">
        <button
          className={`mr-2 ${liked ? "text-red-500" : "text-gray-500"}`}
          onClick={handleLike}
        >
          {liked ? "❤️" : "🤍"} Like
        </button>
      </div>
    </div>
  );
}
