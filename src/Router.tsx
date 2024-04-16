import ChoosePage from "@Pages/choose/Choose.page";
import LandingPage from "@Pages/landing/Landing.page";
import PreparePage from "@Pages/prepare/Prepare.page";
import ShootingPage from "@Pages/shooting/Shooting.page";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MobileLayout />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/choose", element: <ChoosePage /> },
        { path: "/prepare/:templateId", element: <PreparePage /> },
        { path: "/shooting/:templateId", element: <ShootingPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

function MobileLayout() {
  return (
    <div className="w-screen bg-white h-screen flex justify-center">
      <section className="w-[500px] h-full bg-[#1A1A1A] overflow-auto">
        <Outlet />
      </section>
    </div>
  );
}
