import { match, compile, pathToRegexp } from "path-to-regexp";
import {
  createStore,
  combine,
  createEvent,
  sample,
  split,
  guard,
  forward,
} from "effector";

type Route = {
  name: string;
  path: string;
};

type RouteEntry = {
  name: string;
  path: string;
  test: Function;
  match: Function;
  compile: Function;
};

const goTo = createEvent<{ name: string; params: {} }>();
const setRoutes = createEvent<Route[]>();
const recheck = createEvent();

const $name = createStore<string>(null);
const $params = createStore<{}>({});
const $routes = createStore<Route[]>([]);
const $routesEntries = $routes.map((routes) =>
  routes.map(({ name, path }) => ({
    name,
    path,
    test: (p) => pathToRegexp(path).test(p),
    match: match(path, { encode: encodeURI, decode: decodeURIComponent }),
    compile: compile(path),
  }))
);
const $currentRouteEntry = combine(
  $name,
  $routesEntries,
  (name, routes) => routes.find((route) => route.name === name) || null
);
const $currentPath = combine(
  $params,
  $currentRouteEntry,
  (params, route) => (route && route.compile(params)) || null
);
const $currentRoute = combine({
  name: $name,
  params: $params,
  path: $currentPath,
});
const $save = createStore(true);

const { found: routeFound, __: routeNotFound } = split(
  sample({
    source: $routesEntries,
    clock: goTo,
    fn: (entries, route) => ({ entries, route }),
  }),
  {
    found: ({ route, entries }) =>
      entries.some((entry) => entry.name === route.name),
  }
);

const redirect = ({ from, to, condition }) => {
  guard({
    source: $currentRoute,
    filter: combine(condition, $currentRoute, (condition, route) => {
      if (route.name !== from.name) {
        return false;
      }
      if (condition !== null) {
        return !!condition;
      }
      return true;
    }),
    target: goTo.prepend(() => to),
  });
};

$name.on(routeFound, (state, { route }) => route.name);
$params.on(routeFound, (state, { route }) => route.params);
$routes.on(setRoutes, (state, routes) => routes);
$save.on(goTo, (state, { save }) => (save === false ? false : true));

combine({ params: $params, path: $currentPath, save: $save }).updates.watch(
  ({ params, path, save }) => {
    if (save) {
      history.pushState(params, null, path);
    }
  }
);

guard({
  source: sample({
    source: { params: $params, entries: $routesEntries },
    clock: recheck,
    fn: ({ params, entries }) => {
      for (const route of entries) {
        const res = route.match(`${location.pathname}?${location.search}`);
        if (res) {
          return { name: route.name, params: res.params, save: false };
        }
      }
      return null;
    },
  }),
  filter: (data) => !!data,
  target: goTo,
});

window.onpopstate = (evt) => {
  recheck();
};

forward({
  from: setRoutes,
  to: recheck,
});

export {
  goTo,
  $routes,
  $currentPath,
  $currentRoute,
  $name as $currentRouteName,
  $params as $currentRouteParams,
  $currentRouteEntry,
  redirect,
  setRoutes,
  routeFound,
  routeNotFound,
};
