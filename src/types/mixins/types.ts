import { Component } from "../components";

export type Mixin = Component;

export type MixinsConfig = string[];

export type Mixins = {
    [mixin: string]: Mixin;
};