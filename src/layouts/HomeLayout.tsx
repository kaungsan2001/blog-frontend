import Header from "@/components/Header";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="pb-30">
      <Header />
      <main className="w-full max-w-5xl mx-auto px-5 py-3">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
