import { useUserBlogs } from "../hooks/useUser";
import BlogCard from "@/features/blog/components/BlogCard";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationContent,
} from "@/components/ui/pagination";
import { useState } from "react";
import Loading from "@/components/Loading";

const UserBlogsList = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useUserBlogs(id, page);

  const totalPages = data?.meta.totalPages;
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <div className="w-full max-w-5xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {data?.data.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPages! }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink onClick={() => setPage(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UserBlogsList;
