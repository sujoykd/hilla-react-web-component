import Placeholder from "Frontend/components/placeholder/Placeholder";
import React, { Suspense, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import HelloWorldView from "./helloworld/HelloWorldView";
import AboutView from "./about/AboutView";
import DialogView from "./dialogview/DialogView";

const childComponents: Map<string, () => JSX.Element> = new Map([
  ["helloWorld", HelloWorldView],
  ["about", AboutView],
  ["dialog", DialogView],
]);

const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${
    isActive ? "bg-primary-10 text-primary" : "text-body"
  }`;
};

export default function MainLayout({ routeEnabled = false }) {
  const [componentName, setComponentName] = useState("helloWorld");

  const createChildComponent = (name: string) => {
    const component = childComponents.get(name);

    const componentProps = {};
    if (component) {
      return React.createElement(component, componentProps);
    }
    return null;
  };

  let childComponent = createChildComponent(componentName);
  useEffect(() => {
    childComponent = createChildComponent(componentName);
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
            {routeEnabled ? (
              <>
                <NavLink className={navLinkClasses} to="/">
                  Hello World
                </NavLink>
                <NavLink className={navLinkClasses} to="/dialog">
                  Dialogs
                </NavLink>
                <NavLink className={navLinkClasses} to="/about">
                  About
                </NavLink>
              </>
            ) : (
              <>
                <li>
                  <a onClick={() => setComponentName("helloWorld")}>
                    Hello World
                  </a>
                </li>
                <li>
                  <a onClick={() => setComponentName("about")}>About</a>
                </li>
                <li>
                  <a onClick={() => setComponentName("dialog")}>Dialog</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div part="content">
        <Suspense fallback={<Placeholder />}>
          {routeEnabled ? <Outlet /> : childComponent}
        </Suspense>
      </div>
    </>
  );
}
