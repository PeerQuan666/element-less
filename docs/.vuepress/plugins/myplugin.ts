import { getDirname, path } from "@vuepress/utils";
import type { PluginFunction } from "@vuepress/core";
export const myplugin =
  (options: any = {}): PluginFunction =>
  (app) => {
    return {
      name: 'myplugin',
      clientConfigFile: path.resolve(__dirname, "./myconfig.ts"),
    };
  };