import React from "react";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

const PostCard = ({ post, user }) => {
  // Use optional chaining for safety
  const postUser = post.user || {};

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-3">
        <img
          // Use optional chaining for safety
          src={postUser.avatar || "https://via.placeholder.com/40"}
          alt={postUser.username || "User"}
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* Use optional chaining for safety */}
        <span className="font-bold text-gray-800">{postUser.username}</span>
      </div>

      <p className="mb-3 text-gray-700">{post.caption}</p>

      {post.media_url && post.media_type === "image" && (
        <img
          src={post.media_url}
          alt="post media"
          className="rounded-lg mb-3 w-full h-auto"
        />
      )}

      {/* Pass the complete post object */}
      {user && <LikeButton post={post} user={user} />}

      {/* Pass the complete post object */}
      <CommentSection post={post} user={user} />
    </div>
  );
};

export default PostCard;
