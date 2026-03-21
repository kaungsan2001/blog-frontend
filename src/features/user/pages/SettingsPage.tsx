import UpdateProfileform from "../components/UpdateProfileform";
import ChangePasswordForm from "../components/ChangePasswordForm";
import DeleteAccount from "../components/DeleteAccount";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-5">
      <UpdateProfileform />
      <Separator className="my-10" />
      <ChangePasswordForm />
      <Separator className="my-10" />
      <DeleteAccount />
    </div>
  );
};

export default SettingsPage;
