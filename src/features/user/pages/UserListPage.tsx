import UserCard from "../components/UserCard";
import { useGetAllUsers } from "../hooks/useUser";

const UserListPage = () => {
  const { data, isLoading } = useGetAllUsers();
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold mb-4">Authors</h1>
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
