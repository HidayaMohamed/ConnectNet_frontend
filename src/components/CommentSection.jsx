import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api/api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const fetchComments = async () => {
    const data = await apiGet(`/comments/post/${postId}`);
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleComment = async () => {
    const newComment = await apiPost("/comments/", {
      user_id: 1,
      post_id: postId,
      content,
    });

    setComments([...comments, newComment]);
    setContent("");
  };

  return (
    <div className="mt-3 p-2 border-t">
      <h3 className="font-semibold mb-2">Comments</h3>

      {comments.map((c) => (
        <p key={c.id} className="mb-1">
          <span className="font-bold">User {c.user_id}:</span> {c.content}
        </p>
      ))}

      <div className="mt-2 flex gap-2">
        <input
          className="border p-1 rounded flex-1"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleComment}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
