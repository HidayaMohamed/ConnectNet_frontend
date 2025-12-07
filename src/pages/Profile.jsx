import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api/api";
import FollowButton from "../components/FollowButton";
import PostCard from "../components/PostCard";

const Profile = ({ user: currentUser }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUser(id);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  // Ensure posts are rendered safely, even if the list is empty
  const profilePosts = profile.posts || [];

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div className="flex items-center space-x-4 mb-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={
            profile.avatar ||
            "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
          }
          alt={profile.username}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold">{profile.username}</h2>
          <p className="text-gray-600 mb-2">{profile.bio}</p>
          {currentUser && currentUser.id !== profile.id && (
            <FollowButton user={currentUser} targetUserId={profile.id} />
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Posts</h3>
      <div>
        {profilePosts.length > 0 ? (
          profilePosts.map((post) => (
            // Pass the current user for Like/Comment/Follow context
            <PostCard key={post.id} post={post} user={currentUser} />
          ))
        ) : (
          <p className="text-center text-gray-500">This user has no posts.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
