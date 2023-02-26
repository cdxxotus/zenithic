import { CompiledComponent } from "../components";

export type Mixin = Omit<CompiledComponent, 'template'>;

export type MixinsConfig = string[];

export type Mixins = {
    [mixin: string]: Mixin;
};