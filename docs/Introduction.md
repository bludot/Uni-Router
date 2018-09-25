---
id: introduction
title: Introduction
sidebar_label: Introduction
---

This project is a basic router for the browser.

## Installation

Install using npm:

```bash
npm install univ-router
```

## Getting Started

### Basic browser

Create routes. The browser version expects a DOM Node.

```javascript
import { createConfig } from "univ-router/es/index.browser";

const staticRoutes = [
  {
    path: "/",
    component: () => {
      return document
        .createElement("h1")
        .appendChild(document.createTextNode("root path"));
    }
  },
  {
    path: "/path",
    component: () => {
      return document
        .createElement("h1")
        .appendChild(document.createTextNode("sub path"));
    }
  }
];

const routes = createConfig(staticRoutes);
export default routes;

```

Create a new `Router` and append to the root node

```javascript
import { BrowserRouter as Router } from "univ-router/es/index.browser";
import routes from "./routes";

const router = new Router(routes, document.getElementById("app"));
router.render();
```

__Preview__:

<iframe src="https://codesandbox.io/embed/o566knq115" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;box-shadow:  0 2px 10px 0 rgba(0,0,0,.16),  0 2px 5px 0 rgba(0,0,0,.26);" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
