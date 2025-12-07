import FollowButton from "./FollowButton";
import Likes from "./Likes";
import CommentSection from "./CommentSection";

export default function PostCard({ post }) {
  return (
    <div className="p-4 border rounded shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">{post.user.username}</div>
        <FollowButton userId={post.user.id} />
      </div>
      <p className="mb-2">{post.content}</p>
      <Likes postId={post.id} initialLikes={post.likes_count} />
      <CommentSection postId={post.id} />
    </div>
  );
}
