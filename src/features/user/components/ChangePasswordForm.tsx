import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  type ChangePasswordType,
} from "../types/userTypes";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";
const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });
  const onSubmit = async (data: ChangePasswordType) => {
    await authClient.changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      },
      {
        onSuccess: () => {
          toast.success("Password changed successfully");
          navigate(-1);
          reset();
        },
        onError: () => {
          toast.error("Failed to change password");
        },
      },
    );
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Field>
            <FieldLabel>Current Password</FieldLabel>
            <Input type="password" {...register("currentPassword")} />
            {errors.currentPassword && (
              <FieldError>{errors.currentPassword.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>New Password</FieldLabel>
            <Input type="password" {...register("newPassword")} />
            {errors.newPassword && (
              <FieldError>{errors.newPassword.message}</FieldError>
            )}
          </Field>
        </div>
        <div className="flex justify-end mt-3">
          <Button type="submit">Change Password</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
