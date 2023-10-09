import { Root, createRoot } from "react-dom/client";
import MainLayout from "./views/MainLayout";

class MyElement extends HTMLElement {
  #root: Root;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    shadow.append(div);
    this.#root = createRoot(div);
  }

  get state(): Object {
    return {};
  }

  set state(value: Object) {}

  connectedCallback() {
    this.#root.render(<MainLayout />);
  }

  disconnectedCallback() {
    this.#root.unmount();
  }
}

customElements.define("my-app", MyElement);
export { MyElement };
