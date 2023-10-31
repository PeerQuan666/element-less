import {
  flowRendererV2,
  flowStyles
} from "./chunk-BEJAARWG.js";
import {
  flowDb,
  parser$1
} from "./chunk-MRXKO5ES.js";
import "./chunk-LNHLKJXX.js";
import "./chunk-45N366CS.js";
import "./chunk-754FKX6T.js";
import "./chunk-BUWR7HCE.js";
import "./chunk-SC7OAGVB.js";
import "./chunk-NXT3NDW6.js";
import {
  require_dist,
  setConfig
} from "./chunk-7KUSUQLH.js";
import {
  require_dayjs_min
} from "./chunk-NXNFSYLV.js";
import {
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/mermaid/dist/flowDiagram-v2-e4ef3cbe.js
var import_dayjs = __toESM(require_dayjs_min(), 1);
var import_sanitize_url = __toESM(require_dist(), 1);
var diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-e4ef3cbe-XV4XIPGJ.js.map
