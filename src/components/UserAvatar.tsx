import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserAvatar = ({
  name,
  className = "",
  size = "default",
  textClassName = "",
}: {
  name: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  textClassName?: string;
}) => {
  return (
    <Avatar className={className} size={size}>
      <AvatarFallback className={textClassName}>
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
