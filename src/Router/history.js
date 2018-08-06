import createBrowserHistory from 'history/createBrowserHistory';

const history = (function () {
  const history_ = createBrowserHistory();
  const locationQuery = (location) => {
    location.query = location.search
      .slice(1)
      .split('&')
      .reduce((acc, curr) => {
        if (curr.indexOf('=') === -1) {
          acc[curr] = true;
        } else {
          acc[curr.split('=')[0]] = curr.split('=')[1];
        }
        return acc;
      }, {});
  };
  locationQuery(history_.location);
  history_.init = function (updater) {
    history_.listen(function (location) {
      // location is an object like window.location
      locationQuery(location);
      updater(location);
    });
  };
  return history_;
}());

export default history;
