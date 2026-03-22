import { useGetBlogs } from "../hooks/useBlog";
import BlogCard from "../components/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Link } from "react-router";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";
import Loading from "@/components/Loading";

const BlogListPage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetBlogs(page);

  const totalPages = data?.meta?.totalPages || 0;

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center my-4">Blogs</h1>
        <Link
          to="/blogs/search"
          className={buttonVariants({ variant: "outline" })}
        >
          <Search />
          Search
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {data?.data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      {totalPages > 0 && (
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => setPage(i + 1)}
                  isActive={page === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default BlogListPage;
