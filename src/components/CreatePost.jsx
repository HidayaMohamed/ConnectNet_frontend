import React, { useState } from "react";
import { createPost } from "../api/api";

const CreatePost = ({ user = null, onPostCreated = () => {} }) => {
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [posting, setPosting] = useState(false);

  const handleSubmit = async () => {
    const text = caption.trim();
    const media = mediaUrl.trim();

    // Prevent submitting empty post
    if (!text && !media) return;

    setPosting(true);

    // Construct payload
    const payload = {
      caption: text || undefined,
      media_url: media || undefined,
      media_type: media ? "image" : undefined, // assume image for simplicity
    };

    if (user?.id) payload.user_id = user.id; // include only if user exists

    try {
      const post = await createPost(payload);
      onPostCreated(post);
      setCaption("");
      setMediaUrl("");
    } catch (err) {
      console.error("Create post failed:", err);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div
      className="bg-white p-3 rounded-md shadow-md mb-4 ml-auto mr-auto flex flex-col justify-between"
      style={{ width: "500px", height: "200px" }}
    >
      <textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border p-2 rounded resize-none"
        style={{ width: "100%", height: "80px" }}
        disabled={posting}
        onKeyDown={(e) => {
          // Submit on Enter without Shift, allow newline with Shift+Enter
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        aria-label="Post caption"
      />

      <input
        type="text"
        placeholder="Media URL (optional)"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        className="w-full border p-2 rounded mt-2"
        style={{ width: "100%", height: "30px" }}
        disabled={posting}
      />

      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          className="bg-sky-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={posting || (!caption.trim() && !mediaUrl.trim())}
        >
          {posting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
