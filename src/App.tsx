import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "@Pages/landing/Landing.page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MobileLayout />,
      children: [{ path: "/", element: <LandingPage /> }],
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

export default App;
