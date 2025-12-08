import React from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

const PostCard = ({ post = {}, user = null }) => {
  const postUser = post.user || {
    username: "Unknown",
    avatar: "https://via.placeholder.com/40",
  };
  const caption = post.caption || "";

  return (
    <div className="flex justify-center my-4">
      <div
        className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden w-full max-w-md"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <div className="flex items-center space-x-3 p-3 border-b border-gray-100">
          <img
            src={postUser.avatar}
            alt={postUser.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-gray-800">
            {postUser.username}
          </span>
        </div>

        {/* Media */}
        {post.media_url && (
          <div className="flex justify-center items-center bg-gray-100">
            {post.media_type === "image" && (
              <img
                src={post.media_url}
                alt="post"
                className="object-cover w-full max-h-96"
              />
            )}
            {post.media_type === "video" && (
              <video
                src={post.media_url}
                controls
                className="object-cover w-full max-h-96"
              />
            )}
          </div>
        )}

        {/* Likes + Caption */}
        <div className="p-3 border-t border-gray-100 flex flex-col space-y-2">
          {/* Like button */}
          <div className="flex items-center justify-start">
            <LikeButton post={post} user={user} />
          </div>
          {/* Caption */}
          {caption && <p className="text-gray-700 text-sm">{caption}</p>}
        </div>

        {/* Comments */}
        <div className="px-3 pb-3">
          <CommentSection post={post} user={user} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
