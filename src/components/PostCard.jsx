import React from "react";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

// Card to display a single post
const PostCard = ({ post, user }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      {/* Post user info */}
      <div className="flex items-center space-x-2 mb-2">
        <img
          src={post.user.avatar || "https://via.placeholder.com/40"}
          alt={post.user.username}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-bold">{post.user.username}</span>
      </div>

      {/* Post caption */}
      <p className="mb-2">{post.caption}</p>

      {/* Post media if exists */}
      {post.media_url && post.media_type === "image" && (
        <img src={post.media_url} alt="post" className="rounded-md mb-2" />
      )}

      {/* Likes */}
      <LikeButton post={post} user={user} />

      {/* Comments */}
      <CommentSection post={post} user={user} />
    </div>
  );
};

export default PostCard;
