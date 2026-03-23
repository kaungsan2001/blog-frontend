import { Input } from "@/components/ui/input";
import GoBackButton from "@/components/GoBackButton";
import { useState } from "react";
import { useSearchBlogs } from "../hooks/useBlog";
import { useDebounce } from "@/hooks/useDebounce";
import BlogCard from "../components/BlogCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import NotFound from "@/components/NotFound";
import Loading from "@/components/Loading";

const BlogSearchPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error } = useSearchBlogs(debouncedQuery, page);
  const totalPages = data?.meta?.totalPages || 0;

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <GoBackButton />
      <div className="w-full max-w-2xl mx-auto my-4">
        <Input
          placeholder="Search Blogs..."
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* no blogs found */}
      {query.length > 0 && !isLoading && data?.data.length === 0 && (
        <NotFound message="No blogs found" />
      )}

      {/* blogs list */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isLoading &&
          data?.data.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>

      {/* pagination */}
      <div className="mt-5">
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
      </div>
    </>
  );
};

export default BlogSearchPage;
