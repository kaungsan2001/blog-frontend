import { useGetBlogs } from "../hooks/useBlog";
import BlogCard from "../components/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";
import { useState } from "react";

const BlogListPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetBlogs(page);

  const totalPages = data?.data.metaData.totalPages;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Blog List</h1>
      <div className="w-full max-w-5xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {data?.data.blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages! }, (_, i) => (
            <PaginationLink
              key={i}
              onClick={() => setPage(i + 1)}
              isActive={page === i + 1}
            >
              {i + 1}
            </PaginationLink>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BlogListPage;
