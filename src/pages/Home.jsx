import React, { useState, useEffect } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch("http://127.0.0.1:8000/posts/");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = async (postId, like) => {
    await fetch("http://127.0.0.1:8000/likes/", {
      method: like ? "POST" : "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: 1, post_id: postId }),
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <CreatePost userId={1} onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} />
      ))}
    </div>
  );
}
