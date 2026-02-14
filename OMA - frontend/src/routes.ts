import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/home",
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
