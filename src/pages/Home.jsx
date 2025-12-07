import React, { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { api } from "../api/api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  // Load posts ONCE when component mounts
  useEffect(() => {
    async function loadPosts() {
      const data = await api.fetchPosts();
      setPosts(data || []);
    }
    loadPosts();
  }, []);

   const handlePostCreated = (newPost) => {
     setPosts([newPost, ...posts]);
   };
  
  const handleLike = async (postId, liked) => {
    if (liked) {
      await api.likePost(postId);
    } else {
      await api.unlikePost(postId);
    }
  };


  const handleAddComment = async (postId, content) => {
    try {
      await api.addComment(postId, content);
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <CreatePost onPostCreated={handlePostCreated} />
      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLikeToggle={handleLike}
            onAddComment={handleAddComment}
          />
        ))}
      </div>
    </div>
  );
}
