import React, { useEffect, useState } from "react";
import { getCommentsByPost, addComment } from "../api/api";

// Section to display and add comments for a post
const CommentSection = ({ post, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Load comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      const data = await getCommentsByPost(post.id);
      setComments(data);
    };
    fetchComments();
  }, [post.id]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment || !user) return;
    const comment = await addComment({
      user_id: user.id,
      post_id: post.id,
      content: newComment,
    });
    setComments([...comments, comment]);
    setNewComment(""); // Clear input
  };

  return (
    <div className="mt-2">
      {/* List of comments */}
      {comments.map((c) => (
        <div key={c.id} className="flex items-center space-x-2 mb-1">
          <img
            src={c.user.avatar || "https://via.placeholder.com/30"}
            alt={c.user.username}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-bold">{c.user.username}</span>
          <span>{c.content}</span>
        </div>
      ))}

      {/* Input to add a comment */}
      {user && (
        <div className="flex mt-2 space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded p-1"
          />
          <button
            onClick={handleAddComment}
            className="bg-sky-500 text-white px-2 rounded"
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
