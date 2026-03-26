import Loading from "@/components/Loading";
import BlogCard from "../components/BlogCard";
import { useGetSavedBlogs } from "../hooks/useBlog";
import { useState } from "react";
import CustomPagination from "@/components/CustomPagination";
const SavedBlogsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetSavedBlogs(page);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Saved Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {data?.data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      <CustomPagination
        totalPages={data?.meta.totalPages || 0}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default SavedBlogsPage;
