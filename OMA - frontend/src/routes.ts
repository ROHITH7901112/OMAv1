import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/survey",
    Component: Survey,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);
