import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  deleteAccountSchema,
  type DeleteAccountSchema,
} from "../types/userTypes";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(deleteAccountSchema),
  });
  const handleDelete = async (data: DeleteAccountSchema) => {
    await authClient.deleteUser(
      {
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Account deleted successfully");
          reset();
          navigate("/");
        },
        onError: () => {
          toast.error("Failed to delete account");
        },
      },
    );
  };
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-red-400">Danger Zone</h1>

      <Card className="border border-red-400">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all of your content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" onSubmit={handleSubmit(handleDelete)}>
            <Field>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
            <div className="flex justify-end mt-3">
              <Button variant="destructive" type="submit">
                Delete Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteAccount;
