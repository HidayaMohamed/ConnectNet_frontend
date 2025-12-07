import React, { useEffect, useState } from "react";
import { getCommentsByPost, addComment } from "../api/api";

const CommentSection = ({ post, user }) => {
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) {
      alert("Please log in and enter a comment.");
      return;
    }

    try {
      const commentData = {
        post_id: post.id,
        user_id: user.id,
        content: newComment,
      };

      const commentResponse = await addComment(commentData);

      // Manually add the user data back to the response for display (since backend returns limited data)
      const newCommentWithUser = {
        ...commentResponse,
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        },
      };

      setComments([...comments, newCommentWithUser]);
      setNewComment("");
    } catch (error) {
      console.error("Add comment failed:", error);
    }
  };

  return (
    <div className="mt-4 border-t pt-3">
      <h4 className="text-sm font-semibold mb-2 text-gray-700">
        {comments.length} Comments
      </h4>
      <div className="max-h-32 overflow-y-auto mb-3 pr-2">
        {comments.map((c) => (
          <div key={c.id} className="flex space-x-2 mb-1 text-sm">
            <img
              src={c.user?.avatar || "https://via.placeholder.com/30"}
              alt={c.user?.username || "User"}
              className="w-5 h-5 rounded-full object-cover mt-1"
            />
            <span className="font-bold text-gray-800">{c.user?.username}</span>
            <p className="text-gray-600 flex-1">{c.content}</p>
          </div>
        ))}
      </div>

      {user && (
        <div className="flex mt-2 space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-sky-500 focus:border-sky-500"
          />
          <button
            onClick={handleAddComment}
            className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-sky-600 transition"
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
