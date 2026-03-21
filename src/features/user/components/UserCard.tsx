import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { UserProfile } from "../types/userTypes";
import { Link } from "react-router";

const UserCard = ({ user }: { user: UserProfile }) => {
  return (
    <Link to={`/user/profile/${user.id}`}>
      <Card className="cursor-pointer">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-30 h-30">
            <AvatarFallback className="text-2xl">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
          <CardDescription>{user._count.blogs} blogs</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default UserCard;
