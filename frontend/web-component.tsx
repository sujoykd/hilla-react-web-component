import { Root, createRoot } from "react-dom/client";
import { CSSResult } from "lit";

import MainLayout from "./views/MainLayout";
import * as all from "@vaadin/vaadin-lumo-styles/all-imports";

class MyElement extends HTMLElement {
  #root: Root;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    div.setAttribute("part", "container");
    shadow.append(div);
    this.#root = createRoot(div);

    this.shadowRoot!.adoptedStyleSheets = this._adoptedStyleSheets();
  }

  _adoptedStyleSheets(): CSSStyleSheet[] {
    const stylesheets = (Object.values(all) as CSSResult[])
      .filter((css) => !!css && !!css.styleSheet)
      .map((css) => css.styleSheet as CSSStyleSheet);

    const overlayStyles = all.menuOverlay.map(
      (css) => css.styleSheet as CSSStyleSheet
    );

    return [...stylesheets, ...overlayStyles];
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
