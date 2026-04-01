import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUpdateProfile } from "../hooks/useUser";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  updateProfileSchema,
  type UpdateProfileSchema,
} from "../types/userTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/components/Loading";
import { useGetUserById } from "../hooks/useUser";

const UpdateProfileform = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useGetUserById(user?.id || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      name: data?.data.name || "",
      bio: data?.data.bio || "",
      address: data?.data.address || "",
    },
    resolver: zodResolver(updateProfileSchema),
  });
  const { mutate, isPending } = useUpdateProfile();

  const onSubmit = (data: UpdateProfileSchema) => {
    mutate(data);
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input type="text" {...register("name")} />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel>Bio</FieldLabel>
          <Input type="text" {...register("bio")} />
          {errors.bio && <FieldError>{errors.bio.message}</FieldError>}
        </Field>
        <Field>
          <FieldLabel>Address</FieldLabel>
          <Input type="text" {...register("address")} />
          {errors.address && <FieldError>{errors.address.message}</FieldError>}
        </Field>
        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={isPending}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileform;
