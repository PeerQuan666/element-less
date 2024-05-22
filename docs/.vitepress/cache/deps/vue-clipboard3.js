import {
  require_clipboard
} from "./chunk-EWZIRXNT.js";
import {
  __toESM
} from "./chunk-TIUEEL27.js";

// node_modules/vue-clipboard3/dist/esm/index.js
var import_clipboard = __toESM(require_clipboard());
var esm_default = (opts) => {
  const appendToBody = (opts === null || opts === void 0 ? void 0 : opts.appendToBody) === void 0 ? true : opts.appendToBody;
  return {
    toClipboard(text, container) {
      return new Promise((resolve, reject) => {
        const fakeEl = document.createElement("button");
        const clipboard = new import_clipboard.default(fakeEl, {
          text: () => text,
          action: () => "copy",
          container: container !== void 0 ? container : document.body
        });
        clipboard.on("success", (e) => {
          clipboard.destroy();
          resolve(e);
        });
        clipboard.on("error", (e) => {
          clipboard.destroy();
          reject(e);
        });
        if (appendToBody)
          document.body.appendChild(fakeEl);
        fakeEl.click();
        if (appendToBody)
          document.body.removeChild(fakeEl);
      });
    }
  };
};
export {
  esm_default as default
};
//# sourceMappingURL=vue-clipboard3.js.map
