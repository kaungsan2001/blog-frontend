import { useGetFollowing } from "../hooks/useUser";
import Loading from "@/components/Loading";
import UserCard from "../components/UserCard";
import { useState } from "react";
import CustomPagination from "@/components/CustomPagination";
import GoBackButton from "@/components/GoBackButton";
import NotFound from "@/components/NotFound";

const FollowingListPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetFollowing(page);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <GoBackButton />
        <h1 className="text-2xl font-bold">Following</h1>
      </div>
      {!data?.data.length && <NotFound message="No Following" />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <CustomPagination
        totalPages={data?.meta.totalPages || 0}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default FollowingListPage;
