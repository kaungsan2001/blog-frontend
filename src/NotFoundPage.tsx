import { Button } from "./components/ui/button";
import { Link } from "react-router";
import GoBackButton from "./components/GoBackButton";

const NotFoundPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center mt-5">
      <div className="text-center space-y-2 border px-30 py-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Page not found!</p>
        <div className="flex items-center gap-5 mt-3">
          <GoBackButton />
          <Button>
            <Link to="/">Go to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
