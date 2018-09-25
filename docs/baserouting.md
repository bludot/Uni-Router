---
id: baserouting
title: Base Routing
sidebar_label: Base Routing
---

The basic of this without browser DOM is just pure routing. If you want something to happen on a route, just set an empty node for `component` in the route like so:

```javascript
import { RouteHistory as history } from 'univ-router';
const routes = [
  {
    path: "/somepath",
    component: () => {
      return document.createDocuemntFragment();
    },
    middleware: (req, res) => {
      // if /somepath?redirectRoute=%2Ftestme
      // (/somepath?redirectRoute=/testme)
      if(req.query.redirectRoute) {
        history.push(redirectRoute); // redirects to /testme
      }
    }
  }
];
```
