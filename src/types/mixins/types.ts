import { Component } from "../components";

export type Mixin = Omit<Component, 'template'>;

export type MixinsConfig = string[];

export type Mixins = {
    [mixin: string]: Mixin;
};