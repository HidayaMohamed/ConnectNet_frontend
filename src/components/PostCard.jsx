import React from "react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import FollowButton from "./FollowButton";

export default function PostCard({ post, onLikeToggle, onAddComment }) {
  return (
    <div className="border p-4 rounded mb-4 bg-white shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">{post.user.username}</h3>
        <FollowButton
          userId={post.user.id}
          initialFollowing={post.user.following}
        />
      </div>
      <p className="mb-2">{post.content}</p>
      <LikeButton
        postId={post.id}
        initialLiked={post.liked}
        likesCount={post.likes_count}
        onToggle={(liked) => onLikeToggle(post.id, liked)}
      />
      <CommentSection
        postId={post.id}
        comments={post.comments}
        onAddComment={(content) => onAddComment(post.id, content)}
      />
    </div>
  );
}
