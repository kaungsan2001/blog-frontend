import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} variant={"outline"}>
      <ArrowLeft />
      Back
    </Button>
  );
};

export default GoBackButton;
