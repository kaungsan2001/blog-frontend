import { useGetBlogs } from "../hooks/useBlog";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";
import Loading from "@/components/Loading";
import { useGetAllCategories } from "../hooks/useCategory";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/CustomPagination";

const BlogListPage = () => {
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const { data, isLoading, error } = useGetBlogs(page, categoryId);
  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategories("");

  if (isLoading || categoriesLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-3">
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

      <div className="flex gap-4 my-5 flex-wrap">
        <Button
          onClick={() => {
            if (page !== 1) {
              setPage(1);
            }
            setCategoryId(null);
          }}
          className="cursor-pointer"
          variant={"outline"}
        >
          All
        </Button>
        {categories?.data.map((category) => (
          <Button
            key={category.id}
            onClick={() => {
              if (page !== 1) {
                setPage(1);
              }
              setCategoryId(category.id);
            }}
            className="cursor-pointer"
            variant={"outline"}
          >
            {category.name} ({category._count.blogs})
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
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

export default BlogListPage;
