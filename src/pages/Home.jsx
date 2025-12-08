import React, { useEffect, useState } from "react";
import { getPosts } from "../api/api"; 
import PostCard from "../components/PostCard";
import CreatePost  from "../components/CreatePost";

const Home = ({currentUser}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (!posts.length) return <p>No posts found.</p>;

   const handleNewPost = (post) => {
     setPosts([post, ...posts]); 
   };

  return (
    <div>
      <h1 className="font-bold text-xl underline">Welcome to ConnectNet</h1>
      <CreatePost onPostCreated={handleNewPost}/>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={currentUser} />
      ))}
    </div>
  );
};

export default Home;
