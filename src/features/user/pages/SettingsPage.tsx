import UpdateProfileform from "../components/UpdateProfileform";
import ChangePasswordForm from "../components/ChangePasswordForm";
import DeleteAccount from "../components/DeleteAccount";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  return (
    <>
      <UpdateProfileform />
      <Separator className="my-10" />
      <ChangePasswordForm />
      <Separator className="my-10" />
      <DeleteAccount />
    </>
  );
};

export default SettingsPage;
