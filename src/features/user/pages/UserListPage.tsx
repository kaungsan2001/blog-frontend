import UserCard from "../components/UserCard";
import { useGetAllUsers } from "../hooks/useUser";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router";
import Loading from "@/components/Loading";

const UserListPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllUsers(page);
  const totalPages = data?.meta.totalPages || 0;
  if (isLoading) return <Loading />;
  return (
    <>
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

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="mt-5">
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationLink
                key={i}
                onClick={() => setPage(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default UserListPage;
