import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api/api";
import FollowButton from "../components/FollowButton";
import PostCard from "../components/PostCard";

const Profile = ({ user: currentUser = null }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getUser(id);
        if (!mounted) return;

        // Normalize posts array from possible shapes
        const rawPosts = Array.isArray(data?.posts)
          ? data.posts
          : Array.isArray(data?.user?.posts)
          ? data.user.posts
          : [];

        const normalizedPosts = rawPosts.map((post) => {
          const p = { ...post };
          if (!p.user) {
            p.user = {
              id: data.id ?? data.user?.id,
              username: data.username ?? data.user?.username,
              name: data.name ?? data.user?.name,
              avatar: data.avatar ?? data.user?.avatar,
            };
          }
          return p;
        });

        const normalizedProfile = {
          id: data.id ?? data.user?.id,
          username: data.username ?? data.user?.username,
          name: data.name ?? data.user?.name,
          bio: data.bio ?? data.user?.bio,
          avatar: data.avatar ?? data.user?.avatar,
          posts: normalizedPosts,
          following: data.following ?? data.user?.following ?? [],
          followers: data.followers ?? data.user?.followers ?? [],
        };

        setProfile(normalizedProfile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (mounted) setError("Failed to load profile.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!profile) return <p className="text-center mt-10">Profile not found.</p>;

  const profilePosts = Array.isArray(profile.posts) ? profile.posts : [];

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
            <FollowButton
              user={currentUser}
              targetUserId={profile.id}
              initialFollowing={profile.following?.some?.(
                (f) => (f.following_id ?? f) === profile.id
              )}
            />
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 border-b pb-2">Posts</h3>
      <div>
        {profilePosts.length > 0 ? (
          profilePosts.map((post) => (
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