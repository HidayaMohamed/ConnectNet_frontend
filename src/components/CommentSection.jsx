import React, { useEffect, useState } from "react";
import { getCommentsByPost, addComment } from "../api/api";

const CommentSection = ({ post, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!post || !post.id) {
        setComments(post?.comments || []);
        return;
      }
      try {
        const data = await getCommentsByPost(post.id);
        if (mounted && Array.isArray(data)) setComments(data);
      } catch (err) {
        console.error("Failed to load comments:", err);
        if (mounted) setComments(post?.comments || []);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [post]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) {
      alert("Please log in and enter a comment.");
      return;
    }

    setPosting(true);
    try {
      const commentData = {
        post_id: post.id,
        user_id: user.id,
        content: newComment.trim(),
      };

      const commentResponse = await addComment(commentData);

      const newCommentWithUser = {
        ...commentResponse,
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        },
      };

      setComments((prev) => [...prev, newCommentWithUser]);
      setNewComment("");
    } catch (error) {
      console.error("Add comment failed:", error);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mt-4 border-t pt-3">
      <h4 className="text-sm font-semibold mb-2 text-gray-700">
        {comments.length} Comments
      </h4>
      <div className="max-h-32 overflow-y-auto mb-3 pr-2">
        {comments.map((c) => (
          <div
            key={c.id ?? `${c.user_id}-${c.content}-${Math.random()}`}
            className="flex space-x-2 mb-1 text-sm"
          >
            <img
              src={c.user?.avatar || "https://via.placeholder.com/30"}
              alt={c.user?.username || "User"}
              className="w-5 h-5 rounded-full object-cover mt-1"
            />
            <span className="font-bold text-gray-800">
              {c.user?.username || "Unknown"}
            </span>
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddComment();
              }
            }}
            disabled={posting}
          />
          <button
            onClick={handleAddComment}
            className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-sky-600 transition disabled:opacity-50"
            disabled={posting}
          >
            {posting ? "Posting..." : "Post"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
