import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Survey from "./pages/Survey";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/survey",
    Component: Survey,
  },
]);
