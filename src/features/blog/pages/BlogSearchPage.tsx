import { Input } from "@/components/ui/input";
import GoBackButton from "@/components/GoBackButton";
import { useState } from "react";
import { useSearchBlogs } from "../hooks/useBlog";
import { useDebounce } from "@/hooks/useDebounce";
import BlogCard from "../components/BlogCard";
import NotFound from "@/components/NotFound";
import Loading from "@/components/Loading";
import CustomPagination from "@/components/CustomPagination";

const BlogSearchPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error } = useSearchBlogs(debouncedQuery, page);

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
      <CustomPagination
        totalPages={data?.meta.totalPages || 0}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default BlogSearchPage;
