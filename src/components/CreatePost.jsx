import React, { useState } from "react";
import { createPost } from "../api/api";

const CreatePost = ({ user, onPostCreated = () => {} }) => {
  const [caption, setCaption] = useState("");
  const [posting, setPosting] = useState(false);

  const handleSubmit = async () => {
    const text = (caption || "").trim();
    if (!text || !user || posting) return;

    setPosting(true);
    try {
      const post = await createPost({
        user_id: user.id,
        caption: text,
        media_url: null,
        media_type: null,
      });
      onPostCreated(post);
      setCaption("");
    } catch (err) {
      console.error("Create post failed:", err);
      // Optionally surface error to UI
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <textarea
        placeholder={user ? "What's on your mind?" : "Log in to post..."}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border p-2 rounded mb-2 resize-none"
        rows={3}
        disabled={!user || posting}
        onKeyDown={(e) => {
          if (
            (e.key === "Enter" && (e.ctrlKey || e.metaKey)) ||
            (e.key === "Enter" &&
              e.shiftKey === false &&
              e.altKey === false &&
              e.ctrlKey)
          ) {
            // Ctrl+Enter or Enter (with no shift) submits — adjust as your UX prefers
            e.preventDefault();
            handleSubmit();
          }
        }}
        aria-label="Post caption"
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-sky-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!user || posting || !caption.trim()}
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};
export default CreatePost;