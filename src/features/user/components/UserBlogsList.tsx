import { useUserBlogs } from "../hooks/useUser";
import BlogCard from "@/features/blog/components/BlogCard";
import { useState } from "react";
import Loading from "@/components/Loading";
import CustomPagination from "@/components/CustomPagination";

const UserBlogsList = ({ userId }: { userId: string }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useUserBlogs(userId, page);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
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
