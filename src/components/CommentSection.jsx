import React, { useState } from "react";

export default function CommentSection({ postId, comments, onAddComment }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="mt-2">
      {comments &&
        comments.map((c) => (
          <p key={c.id} className="text-sm mb-1">
            <span className="font-bold">{c.user.username}: </span>
            {c.content}
          </p>
        ))}
      <form onSubmit={handleSubmit} className="flex mt-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded p-1"
        />
        <button
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
          type="submit"
        >
          Comment
        </button>
      </form>
    </div>
  );
}
