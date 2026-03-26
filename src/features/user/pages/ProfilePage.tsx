import { Link, useParams } from "react-router";
import {
  useGetUserById,
  useFollowUser,
  useUnfollowUser,
} from "../hooks/useUser";
import { useAuth } from "@/features/auth/useAuth";

import Loading from "@/components/Loading";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Calendar, MapPin, MoreHorizontal, UserPlus } from "lucide-react";
import UserBlogsList from "../components/UserBlogsList";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const { data, isLoading, error } = useGetUserById(id!);

  const { mutate: follow, isPending: followPending } = useFollowUser();
  const { mutate: unfollow, isPending: unfollowPending } = useUnfollowUser();

  const isOwnProfile = authUser?.id === id;

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="">
      {/* Cover Image with Gradient Animation */}
      <div
        className="relative h-48 md:h-64 w-full overflow-hidden rounded-b-2xl"
        role="img"
        aria-label="Profile cover background"
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#667eea] to-[#764ba2]" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 pb-6">
        {/* Profile Header */}
        <div className="relative -mt-8 sm:-mt-8 mb-6 sm:mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4 sm:gap-6">
            <div className="relative">
              <div className="h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-background bg-background shadow-xl">
                <Avatar className="h-full w-full">
                  <AvatarFallback className="text-2xl sm:text-4xl">
                    {data?.data.name?.substring(0, 2).toUpperCase() || "MS"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="mb-1 sm:mb-2 space-y-0.5 sm:space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {data?.data.name}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {data?.data.email}
              </p>
            </div>
          </div>

          <div className="flex w-full gap-2 sm:gap-3 md:w-auto md:mb-2">
            {!isOwnProfile && (
              <>
                {data?.data.isFollowing ? (
                  <Button
                    onClick={() => unfollow(id!)}
                    disabled={unfollowPending}
                  >
                    <UserPlus className="h-4 w-4" />
                    Unfollow
                  </Button>
                ) : (
                  <Button onClick={() => follow(id!)} disabled={followPending}>
                    <UserPlus className="h-4 w-4" />
                    Follow
                  </Button>
                )}
              </>
            )}

            {authUser?.id === id && (
              <Button
                variant="ghost"
                size="icon"
                className="border border-border/40"
                aria-label="More profile options"
                onClick={() => navigate(`/users/settings`)}
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        {/* Bio & Stats */}
        <section
          aria-label="User bio and statistics"
          className="grid gap-8 md:grid-cols-[2fr,1fr]"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                {data?.data.bio || ""}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                  <span>{data?.data.address || ""}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                  <span>Joined {data?.data.createdAt}</span>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6 pt-2 text-sm sm:text-base">
                <div className="flex items-center gap-1.5">
                  <Link to={`/users/following`}>
                    <span className="font-bold text-foreground">
                      {data?.data._count?.following ?? 0}
                    </span>
                    <span className="text-muted-foreground">Following</span>
                  </Link>
                </div>
                <div className="flex items-center gap-1.5">
                  <Link to={`/users/followers`}>
                    <span className="font-bold text-foreground">
                      {data?.data._count?.followers ?? 0}
                    </span>
                    <span className="text-muted-foreground">Followers</span>
                  </Link>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground">
                    {data?.data._count?.blogs ?? 0}
                  </span>
                  <span className="text-muted-foreground">Posts</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <UserBlogsList userId={id!} />
    </div>
  );
};

export default ProfilePage;
