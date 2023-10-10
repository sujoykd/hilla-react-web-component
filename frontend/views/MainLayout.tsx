import { lazy } from "react";

const AboutView = lazy(async () => import("Frontend/views/about/AboutView.js"));
const HelloWorldView = lazy(
  async () => import("Frontend/views/helloworld/HelloWorldView.js")
);

export default function MainLayout() {
  const currentTitle = "My App";
  return (
    <>
      <header className="flex flex-col gap-m">
        <h1 className="text-l m-0" part="heading">
          {currentTitle}
        </h1>
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
      <div part="content">
        <HelloWorldView />
      </div>
    </>
  );
}
