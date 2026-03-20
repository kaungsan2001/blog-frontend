import { useUserBlogs } from "../hooks/useUser";
import BlogCard from "@/features/blog/components/BlogCard";

const UserBlogsList = ({ id }: { id: string }) => {
  const { data, isLoading } = useUserBlogs(id);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full max-w-5xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
      {data?.data.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default UserBlogsList;
