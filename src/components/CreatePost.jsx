import React, { useState } from "react";

export default function CreatePost({ userId, onPostCreated }) {
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, caption, media_url: mediaUrl }),
    });
    const data = await res.json();
    onPostCreated(data);
    setCaption("");
    setMediaUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 border rounded bg-white shadow"
    >
      <textarea
        className="w-full border p-2 mb-2 rounded"
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        className="w-full border p-2 mb-2 rounded"
        placeholder="Media URL (optional)"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Post
      </button>
    </form>
  );
}
