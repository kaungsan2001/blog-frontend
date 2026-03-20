import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "react-router";
import { useGetUserById } from "../hooks/useUser";
import UserBlogsList from "../components/UserBlogsList";

const ProfilePage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserById(id!);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex justify-center mt-5">
        <Avatar className="w-35 h-35">
          <AvatarFallback className="text-3xl">
            {data?.data.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">{data?.data.name}</h1>
        <p className="text-muted-foreground">{data?.data.email}</p>
        <small>Total Blogs: {data?.data._count.blogs}</small>
      </div>

      <UserBlogsList id={id!} />
    </div>
  );
};

export default ProfilePage;
