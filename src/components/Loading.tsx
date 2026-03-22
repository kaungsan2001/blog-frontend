import { Loader } from "lucide-react";
const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Loader className="animate-spin" size={40} />
    </div>
  );
};

export default Loading;
