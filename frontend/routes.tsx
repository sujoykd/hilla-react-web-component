import HelloWorldView from "Frontend/views/helloworld/HelloWorldView.js";
import MainLayout from "Frontend/views/MainLayout.js";
import { lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import DialogView from "./views/dialogview/DialogView";

const AboutView = lazy(async () => import("Frontend/views/about/AboutView.js"));

export const routes: RouteObject[] = [
  {
    element: <MainLayout routeEnabled={true} />,
    handle: { title: "Main" },
    children: [
      {
        path: "/",
        element: <HelloWorldView />,
        handle: { title: "Hello World" },
      },
      { path: "/about", element: <AboutView />, handle: { title: "About" } },
      {
        path: "/dialog",
        element: <DialogView />,
        handle: { title: "Dialogs" },
      },
    ],
  },
];

export default createBrowserRouter(routes);
