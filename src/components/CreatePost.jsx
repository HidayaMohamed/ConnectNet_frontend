import React, { useState } from "react";
import { createPost } from "../api/api";

// Component to create a new post
const CreatePost = ({ user, onPostCreated }) => {
  const [caption, setCaption] = useState("");

  const handleSubmit = async () => {
    if (!caption || !user) return;
    const post = await createPost({
      user_id: user.id,
      caption,
      media_url: null,
      media_type: null,
    });
    onPostCreated(post);
    setCaption(""); // clear input
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-sky-500 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
