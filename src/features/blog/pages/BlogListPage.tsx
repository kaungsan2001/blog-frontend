import { useGetBlogs } from "../hooks/useBlog";
import BlogCard from "../components/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const BlogListPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, error } = useGetBlogs(page, debouncedQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const totalPages = data?.meta?.totalPages || 0;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Blogs</h1>
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleSearch}
          className="w-full max-w-md"
          autoFocus
        />
      </div>
      <div className="w-full max-w-5xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
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
    </div>
  );
};

export default BlogListPage;
