import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition"
            >
              <p className="font-semibold">{post.title}</p>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-gray-500 text-sm">By {post.user.username}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
