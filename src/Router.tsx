import MobileLayout from "@Components/layout/MobileLayout";
import ChoosePage from "@Pages/choose/Choose.page";
import ConfirmPage from "@Pages/confirm/Confirm.page";
import HomePage from "@Pages/home/home.page";
import { NamePage } from "@Pages/name/name.page";
import PreparePage from "@Pages/prepare/Prepare.page";
import ShootingPage from "@Pages/shooting/Shooting.page";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MobileLayout />,
      children: [
        // HJ TODO: 변수화
        { path: "/", element: <HomePage /> },
        { path: "/name", element: <NamePage /> },

        { path: "/choose", element: <ChoosePage /> },
        { path: "/prepare/:templateId", element: <PreparePage /> },
        { path: "/shooting/:templateId", element: <ShootingPage /> },
        { path: "/confirm/:templateId", element: <ConfirmPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
