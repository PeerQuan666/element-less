import {
  flowRendererV2,
  flowStyles
} from "./chunk-Q6GSAXEW.js";
import "./chunk-YZMBUAQC.js";
import {
  flowDb,
  parser$1
} from "./chunk-HD3TL3AI.js";
import "./chunk-Q6NWJATQ.js";
import "./chunk-2H6NRLDC.js";
import "./chunk-6OXHS5WA.js";
import "./chunk-SYFW26K3.js";
import {
  require_dist,
  setConfig
} from "./chunk-PW6STI5N.js";
import "./chunk-WG4S5SVQ.js";
import {
  require_dayjs_min
} from "./chunk-SQHKXW3N.js";
import {
  __toESM
} from "./chunk-2LSFTFF7.js";

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
//# sourceMappingURL=flowDiagram-v2-e4ef3cbe-M4NIAACW.js.map
