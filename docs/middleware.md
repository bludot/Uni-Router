---
id: middleware
title: Middleware
---

Similar to how express does its middleware. `(req, res, next) => {}`. `req`
holds all the data from the request such as `location` (from `history`),
`query` (url queries), `params` (route params). `res` should hold everything
containing to the result which should allow modification of the component,
throw errors, or do redirects before loading the page (React might work
slightly differently but the same result).

see the below middleware:

```javascript
middleware: (req, res) => {
  if (!req.query.yes) {
    throw new RouterError('unAuthorized', 401);
  }
}
```

The router will run the middleware first and if it throws an error, it will
return the error component. In the above example, an error is thrown when the
query parameter `yes` is falsey.
