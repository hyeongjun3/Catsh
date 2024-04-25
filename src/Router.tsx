import ChoosePage from "@Pages/choose/Choose.page";
import LandingPage from "@Pages/landing/Landing.page";
import PreparePage from "@Pages/prepare/Prepare.page";
import ShootingPage from "@Pages/shooting/Shooting.page";
import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useOutlet,
} from "react-router-dom";

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
  const { pathname } = useLocation();
  const outlet = useOutlet();

  return (
    <div className="w-screen bg-white h-dvh flex justify-center">
      <section
        id="mobile-layout"
        className="w-[500px] relative h-full bg-[#1A1A1A] overflow-auto"
      >
        <AnimatePresence initial={false}>
          {outlet && cloneElement(outlet, { key: pathname })}
        </AnimatePresence>
      </section>
    </div>
  );
}
