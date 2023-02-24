import { Component } from "../components";

export type Route = {
  path: string;
  component: Component;
};

export type History = {
  listen: (callback: (pathname: string) => void) => void;
  push: (pathname: string) => void;
  replace: (pathname: string) => void;
}

export type RouterConfig = {
  routes: Route[];
};
