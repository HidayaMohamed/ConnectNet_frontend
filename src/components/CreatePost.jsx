import React, { useState } from "react";

const CreatePost = ({ onPostCreated }) => {
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const handleSubmit = () => {
    if (!caption.trim() && !mediaUrl.trim()) return;

    // create a new post object
    const newPost = {
      id: Date.now(), 
      caption: caption.trim(),
      media_url: mediaUrl.trim() || null,
      media_type: mediaUrl.trim() ? "image" : null,
      likes_count: 0,
      liked_by_user: false,
    };

    onPostCreated(newPost);

    // reset fields
    setCaption("");
    setMediaUrl("");
  };

  return (
    <div
      className="bg-white p-4 rounded-md shadow-md mb-4 ml-auto mr-auto"
      style={{ width: "500px", height: "200px" }}
    >
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border p-2 rounded mb-2 resize-none"
        rows={3}
        style={{ width: "100%", height: "80px" }}
      />

      <input
        type="text"
        placeholder="Media URL (optional)"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        className="w-full border p-2 rounded mb-2"
        style={{ width: "100%", height: "30px" }}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-sky-500 text-white px-4 py-2 rounded"
          disabled={!caption.trim() && !mediaUrl.trim()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
