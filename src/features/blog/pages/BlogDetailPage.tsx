import { Link, useParams } from "react-router";
import { useGetBlogById } from "../hooks/useBlog";
import GoBackButton from "@/components/GoBackButton";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogById(id!);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full max-w-5xl mx-auto p-3">
      <div>
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
          className="quill-content wrap-break-word prose w-full max-w-full"
        />

        <div className="mt-5 text-right flex flex-col gap-2">
          <small>Written by {data?.data.author.name}</small>
          <small>{data?.data.createdAt}</small>
        </div>
      </div>
      {/* comment section */}
      <section className="mt-10 mb-20">
        <CommentForm blogId={id!} />
        <CommentList blogId={id!} />
      </section>
    </div>
  );
};

export default BlogDetailPage;
