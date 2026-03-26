import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchUsers } from "@/features/user/hooks/useUser";
import UserCard from "../components/UserCard";
import GoBackButton from "@/components/GoBackButton";
import Loading from "@/components/Loading";
import NotFound from "@/components/NotFound";
import CustomPagination from "@/components/CustomPagination";

const UserSearchPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error } = useSearchUsers(debouncedQuery, page);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <GoBackButton />
      <div className="w-full max-w-2xl mx-auto my-4">
        <Input
          placeholder="Search Authors..."
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* no users found */}
      {query.length > 0 && !isLoading && data?.data.length === 0 && (
        <NotFound message="No users found" />
      )}

      {/* users list */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!isLoading &&
          data?.data.map((user) => <UserCard key={user.id} user={user} />)}
      </div>

      <CustomPagination
        totalPages={data?.meta.totalPages || 0}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default UserSearchPage;
