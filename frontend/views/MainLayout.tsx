import { AppLayout } from "@hilla/react-components/AppLayout.js";
import { DrawerToggle } from "@hilla/react-components/DrawerToggle.js";
import Placeholder from "Frontend/components/placeholder/Placeholder";
import { Suspense, lazy } from "react";

const AboutView = lazy(async () => import("Frontend/views/about/AboutView.js"));
const HelloWorldView = lazy(
  async () => import("Frontend/views/helloworld/HelloWorldView.js")
);

export default function MainLayout() {
  const currentTitle = "My App";
  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <h1 className="text-l m-0">My App</h1>
          <nav>
            <ul>
              <li>
                <a href="#">Hello World</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h2>

      <Suspense fallback={<Placeholder />}>
        <HelloWorldView />
      </Suspense>
    </AppLayout>
  );
}
