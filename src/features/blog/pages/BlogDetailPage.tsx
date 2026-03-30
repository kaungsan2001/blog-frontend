import { Link, useParams } from "react-router";
import { useGetBlogById } from "../hooks/useBlog";
import GoBackButton from "@/components/GoBackButton";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { useAuth } from "@/features/auth/useAuth";
import { format } from "date-fns";
import Loading from "@/components/Loading";
import { AdvancedImage } from "@cloudinary/react";
import { myCld } from "@/lib/cloudinary";
import DOMPurify from "dompurify";

const BlogDetailPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogById(id!);

  const img = myCld.image(data?.data.image);
  if (isLoading || authLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full max-w-5xl mx-auto mt-3 p-3">
      <div>
        <div className="flex justify-between items-center mb-5">
          <GoBackButton />
          {user?.id === data?.data.authorId && (
            <Link
              to={`/blogs/edit/${id}`}
              className={buttonVariants({
                variant: "default",
              })}
            >
              <Edit />
              Edit
            </Link>
          )}
        </div>
        {data?.data.image && <AdvancedImage cldImg={img} />}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 mt-5">
          {data?.data.title}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.data.content || ""),
          }}
          className="text-black dark:text-white wrap-break-word prose w-full max-w-full"
        />

        <div className="mt-5 text-right flex flex-col gap-2">
          <small>Written by {data?.data.author.name}</small>
          <small>{format(data?.data.createdAt || "", "dd/MM/yyyy")}</small>
        </div>
      </div>
      {/* comment section */}
      <section className="mt-10 mb-10">
        <CommentForm blogId={id!} />
        <CommentList blogId={id!} />
      </section>
    </div>
  );
};

export default BlogDetailPage;
