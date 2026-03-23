import { useParams } from "react-router";
import { useGetUserById } from "../hooks/useUser";
import UserBlogsList from "../components/UserBlogsList";
import UserAvatar from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/Loading";

const ProfilePage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetUserById(id!);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div className="flex justify-center mt-5">
        <UserAvatar
          name={data?.data.name || ""}
          className="w-30 h-30"
          textClassName="text-2xl"
        />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">{data?.data.name}</h1>
        <p className="text-muted-foreground">{data?.data.email}</p>
        <small>Total Blogs: {data?.data._count.blogs}</small>
      </div>

      <Separator className="my-4 border w-1/2 mx-auto" />

      <UserBlogsList id={id!} />
    </>
  );
};

export default ProfilePage;
