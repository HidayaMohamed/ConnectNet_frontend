import React, { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import api from "../api/api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Load all posts
  const loadPosts = async () => {
    try {
      const response = await api.get("/posts/");
      setPosts(response.data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  };

  // Only runs once on mount
  useEffect(() => {
    loadPosts();
  }, []);

  // Called after creating a post
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Like handler — safe because it's called inside an event
  const handleLike = async (postId, like) => {
    try {
      if (like) {
        await api.post("/likes/", { user_id: 1, post_id: postId });
      } else {
        await api.delete("/likes/", {
          data: { user_id: 1, post_id: postId },
        });
      }

      // Reload posts AFTER event is done
      await loadPosts();
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <CreatePost userId={1} onPostCreated={handlePostCreated} />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike} // SAFE — only runs when user clicks the like button
        />
      ))}
    </div>
  );
}
