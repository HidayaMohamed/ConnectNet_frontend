
import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    api.fetchComments(postId).then(setComments).catch(console.error);
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;
    try {
      const comment = await api.addComment(postId, newComment);
      setComments([...comments, comment]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-2">
      <ul className="space-y-1">
        {comments.map((c) => (
          <li key={c.id} className="text-gray-700 text-sm">
            <span className="font-semibold">{c.user.username}: </span>
            {c.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-2 flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-1 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}
