import { Link, useParams } from "react-router";
import { useGetBlogById } from "../hooks/useBlog";
import GoBackButton from "@/components/GoBackButton";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogById(id!);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full max-w-5xl mx-auto p-3">
      <div className="flex justify-between items-center">
        <GoBackButton />
        <Link
          to={`/blog/edit/${id}`}
          className={buttonVariants({
            variant: "default",
          })}
        >
          <Edit />
          Edit
        </Link>
      </div>

      <h1 className="text-5xl font-bold mb-10 mt-5">{data?.data.title}</h1>
      <p
        dangerouslySetInnerHTML={{ __html: data?.data.content || "" }}
        className="wrap-break-word prose w-full max-w-full"
      />
    </div>
  );
};

export default BlogDetailPage;
