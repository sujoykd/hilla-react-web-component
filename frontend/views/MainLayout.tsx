import Placeholder from "Frontend/components/placeholder/Placeholder";
import React, { Suspense, lazy, useMemo, useState } from "react";

const AboutView = lazy(async () => import("Frontend/views/about/AboutView.js"));
const HelloWorldView = lazy(
  async () => import("Frontend/views/helloworld/HelloWorldView.js")
);
const DialogView = lazy(
  async () => import("Frontend/views/dialogview/DialogView.js")
);

const childComponents: Map<
  string,
  React.LazyExoticComponent<() => JSX.Element>
> = new Map([
  ["helloWorld", HelloWorldView],
  ["about", AboutView],
  ["dialog", DialogView],
]);

export default function MainLayout() {
  const [componentName, setComponentName] = useState("");

  const createChildComponent = (name: string) => {
    const component = childComponents.get(name);

    const componentProps = {};
    if (component) {
      return React.createElement(component, componentProps);
    }
    return null;
  };

  const childComponent = useMemo(() => {
    return createChildComponent(componentName);
  }, [componentName]);

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
              <a onClick={() => setComponentName("helloWorld")}>Hello World</a>
            </li>
            <li>
              <a onClick={() => setComponentName("about")}>About</a>
            </li>
            <li>
              <a onClick={() => setComponentName("dialog")}>Dialog</a>
            </li>
          </ul>
        </nav>
      </header>
      <div part="content">
        <Suspense fallback={<Placeholder />}>{childComponent}</Suspense>
      </div>
    </>
  );
}
