import { useUserBlogs } from "@/features/blog/hooks/useBlog";
import BlogCard from "@/features/blog/components/BlogCard";
import { useState } from "react";
import Loading from "@/components/Loading";
import CustomPagination from "@/components/CustomPagination";
import { useAuth } from "@/features/auth/hooks/useAuth";

const UserBlogsList = ({ userId }: { userId: string }) => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [isPublished, setIsPublished] = useState(true);
  const { data, isLoading, error } = useUserBlogs(userId, page, isPublished);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div className="flex justify-end">
        {user?.id === userId && (
          <button
            onClick={() => setIsPublished(!isPublished)}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            {isPublished ? "Published" : "Draft"}
          </button>
        )}
      </div>
      <div className="w-full max-w-5xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {data?.data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <CustomPagination
        totalPages={data?.meta.totalPages || 0}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default UserBlogsList;
