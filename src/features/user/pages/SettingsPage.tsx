import UpdateProfileform from "../components/UpdateProfileform";
import ChangePasswordForm from "../components/ChangePasswordForm";
import DeleteAccount from "../components/DeleteAccount";
import { Separator } from "@/components/ui/separator";
import GoBackButton from "@/components/GoBackButton";

const SettingsPage = () => {
  return (
    <div className="p-3 w-full  max-w-4xl mx-auto">
      <div className="my-2">
        <GoBackButton />
      </div>
      <UpdateProfileform />
      <Separator className="my-10" />
      <ChangePasswordForm />
      <Separator className="my-10" />
      <DeleteAccount />
    </div>
  );
};

export default SettingsPage;
