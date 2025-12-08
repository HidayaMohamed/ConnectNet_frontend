import React, { useEffect, useState } from "react";
import { getPosts } from "../api/api"; // make sure the path is correct

const Home = () => {
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

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            {post.user?.avatar && (
              <img
                src={post.user.avatar}
                alt={post.user.username}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
            )}
            <strong>{post.user?.username || "Unknown"}</strong>
          </div>
          <p>{post.caption}</p>
          {post.media_url && (
            <img
              src={post.media_url}
              alt="Post media"
              style={{ maxWidth: "100%" }}
            />
          )}
          <p>Likes: {post.like_count}</p>
          {post.comments.length > 0 && (
            <div style={{ marginTop: "10px" }}>
              <strong>Comments:</strong>
              {post.comments.map((comment) => (
                <div key={comment.id} style={{ marginLeft: "10px" }}>
                  <span>
                    <strong>{comment.user?.username || "Unknown"}:</strong>{" "}
                    {comment.content}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
