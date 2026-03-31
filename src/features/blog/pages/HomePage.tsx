import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useGetBlogs } from "../hooks/useBlog";
import Loading from "@/components/Loading";
import BlogCard from "../components/BlogCard";
export default function HomePage() {
  const { data, isLoading } = useGetBlogs(1);

  const blogs = data?.data.slice(0, 6) || [];
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="flex min-h-[500px] flex-col items-center gap-7 pt-10 px-4 text-center">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            Publish Your Ideas to the World
          </span>
        </div>

        <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">
          Publish Your Ideas to the World
          <br />
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-(--foreground)/70">
          A simple, powerful platform to write, share, and grow your audience.
        </p>

        <div className="flex gap-4">
          <Button size="lg" className="gap-2">
            <Link to="/blogs/list">Start Reading</Link>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            <Link to="/blogs/create">Start Writing</Link>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4 text-center">Latest Blogs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 md:px-10 lg:px-20">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <Button variant={"outline"} className="mx-auto">
            <Link to="/blogs/list">View All Blogs</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
