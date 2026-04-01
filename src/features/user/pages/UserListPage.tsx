import UserCard from "../components/UserCard";
import { useGetAllUsers } from "../hooks/useUser";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router";
import Loading from "@/components/Loading";
import CustomPagination from "@/components/CustomPagination";

const UserListPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetAllUsers(page);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Authors</h1>

        <Link
          to="/users/search"
          className={buttonVariants({ variant: "outline" })}
        >
          <Search />
          Search
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
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

export default UserListPage;
