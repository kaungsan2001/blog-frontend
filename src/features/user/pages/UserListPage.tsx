import UserCard from "../components/UserCard";
import { useGetAllUsers } from "../hooks/useUser";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";

const UserListPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading } = useGetAllUsers(debouncedQuery, page);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };
  const totalPages = data?.meta.totalPages || 0;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold mb-4">Authors</h1>
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleSearch}
          className="w-full max-w-md"
        />
      </div>
      <div className="mt-5   w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </div>
  );
};

export default UserListPage;
