import React from "react";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

const PostCard = ({ post = {}, user = null }) => {
  const postUser = post.user ?? {};
  const caption = post.caption ?? "";

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-3">
        <img
          src={postUser.avatar || "https://via.placeholder.com/40"}
          alt={postUser.username || "User"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-bold text-gray-800">
          {postUser.username || "Unknown"}
        </span>
      </div>

      <p className="mb-3 text-gray-700 whitespace-pre-wrap">{caption}</p>

      {post.media_url && post.media_type === "image" && (
        <img
          src={post.media_url}
          alt="post media"
          className="rounded-lg mb-3 w-full h-auto object-cover"
        />
      )}

      {post.media_url && post.media_type === "video" && (
        <video controls className="rounded-lg mb-3 w-full">
          <source src={post.media_url} />
          Your browser does not support the video tag.
        </video>
      )}

      {user && <LikeButton post={post} user={user} />}

      <CommentSection post={post} user={user} />
    </div>
  );
};

export default PostCard;