
import { useParams } from "react-router-dom";
import FollowButton from "../components/FollowButton";

export default function Profile() {
  const { id } = useParams(); // user id from URL

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">User Profile #{id}</h1>

      <FollowButton userId={1} targetUserId={id} />

      
    </div>
  );
}
