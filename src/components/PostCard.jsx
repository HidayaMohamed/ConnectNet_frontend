import { useState, useEffect } from "react";
import { apiPost, apiDelete } from "../api/api";

export default function PostCard({ post, onCommentAdded }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) {
      await apiDelete("/likes/", { user_id: 1, post_id: post.id });
      setLikes(likes - 1);
    } else {
      await apiPost("/likes/", { user_id: 1, post_id: post.id });
      setLikes(likes + 1);
    }

    setLiked(!liked);
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <p className="font-bold mb-2">User #{post.user_id}</p>

      <p className="mb-2">{post.caption}</p>

      {post.media_url && (
        <img src={post.media_url} alt="media" className="rounded mb-2" />
      )}

      <div className="flex gap-3 items-center">
        <button className="text-xl" onClick={handleLike}>
          {liked ? "❤️" : "🤍"}
        </button>
        <span>{likes} likes</span>
      </div>
    </div>
  );
}
