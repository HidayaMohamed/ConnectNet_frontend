import React, { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();

        let postsArray = [];
        if (Array.isArray(data)) {
          postsArray = data;
        } else if (data && Array.isArray(data.posts)) {
          postsArray = data.posts;
        } else {
          postsArray = [];
        }

        console.log("--- FINAL POSTS CHECK ---");
        console.log("Is data an Array?", Array.isArray(postsArray));
        console.log("Number of posts received:", postsArray.length);
        console.log("First Post Data:", postsArray[0]);

        setPosts(postsArray.slice().reverse());
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      {user && <CreatePost user={user} onPostCreated={handlePostCreated} />}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
      {posts.length === 0 && (
        <p className="text-center text-gray-500">
          No posts yet. Be the first to post!
        </p>
      )}
    </div>
  );
};

export default Home;