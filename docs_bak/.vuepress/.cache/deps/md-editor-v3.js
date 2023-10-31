import {
  markdown
} from "./chunk-EG6LEUNR.js";
import "./chunk-6QGOLTZK.js";
import "./chunk-PMSQVEGA.js";
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from "./chunk-W2PCNWFM.js";
import "./chunk-2X25GDE4.js";
import {
  Annotation,
  ChangeDesc,
  ChangeSet,
  CharCategory,
  Compartment,
  Decoration,
  Direction,
  EditorSelection,
  EditorState,
  EditorView,
  Facet,
  GutterMarker,
  HighlightStyle,
  IndentContext,
  LanguageDescription,
  LanguageSupport,
  NodeProp,
  Prec,
  RangeSet,
  RangeSetBuilder,
  StateEffect,
  StateField,
  StreamLanguage,
  Text,
  Transaction,
  ViewPlugin,
  WidgetType,
  bracketMatching,
  codePointAt,
  codePointSize,
  combineConfig,
  countColumn,
  crosshairCursor,
  defaultHighlightStyle,
  drawSelection,
  dropCursor,
  findClusterBreak,
  foldGutter,
  foldKeymap,
  fromCodePoint,
  getIndentUnit,
  getIndentation,
  getPanel,
  gutter,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  hoverTooltip,
  indentOnInput,
  indentString,
  indentUnit,
  keymap,
  lineNumbers,
  logException,
  matchBrackets,
  placeholder,
  rectangularSelection,
  runScopeHandlers,
  showPanel,
  showTooltip,
  syntaxHighlighting,
  syntaxTree,
  tags
} from "./chunk-EDMTS3HY.js";
import {
  Fragment,
  cloneVNode,
  computed2 as computed,
  createVNode,
  defineComponent,
  h,
  init_vue_runtime_esm_bundler,
  inject,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  shallowRef,
  toRef,
  watch
} from "./chunk-3XCZATPT.js";
import "./chunk-ATDA5F66.js";
import {
  __commonJS,
  __esm,
  __export,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  __publicField,
  __toCommonJS,
  __toESM
} from "./chunk-7REXU52E.js";

// node_modules/toggle-selection/index.js
var require_toggle_selection = __commonJS({
  "node_modules/toggle-selection/index.js"(exports, module) {
    module.exports = function() {
      var selection = document.getSelection();
      if (!selection.rangeCount) {
        return function() {
        };
      }
      var active = document.activeElement;
      var ranges = [];
      for (var i4 = 0; i4 < selection.rangeCount; i4++) {
        ranges.push(selection.getRangeAt(i4));
      }
      switch (active.tagName.toUpperCase()) {
        case "INPUT":
        case "TEXTAREA":
          active.blur();
          break;
        default:
          active = null;
          break;
      }
      selection.removeAllRanges();
      return function() {
        selection.type === "Caret" && selection.removeAllRanges();
        if (!selection.rangeCount) {
          ranges.forEach(function(range) {
            selection.addRange(range);
          });
        }
        active && active.focus();
      };
    };
  }
});

// node_modules/copy-to-clipboard/index.js
var require_copy_to_clipboard = __commonJS({
  "node_modules/copy-to-clipboard/index.js"(exports, module) {
    "use strict";
    var deselectCurrent = require_toggle_selection();
    var clipboardToIE11Formatting = {
      "text/plain": "Text",
      "text/html": "Url",
      "default": "Text"
    };
    var defaultMessage = "Copy to clipboard: #{key}, Enter";
    function format(message) {
      var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
      return message.replace(/#{\s*key\s*}/g, copyKey);
    }
    function copy(text, options) {
      var debug, message, reselectPrevious, range, selection, mark, success = false;
      if (!options) {
        options = {};
      }
      debug = options.debug || false;
      try {
        reselectPrevious = deselectCurrent();
        range = document.createRange();
        selection = document.getSelection();
        mark = document.createElement("span");
        mark.textContent = text;
        mark.ariaHidden = "true";
        mark.style.all = "unset";
        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0, 0, 0, 0)";
        mark.style.whiteSpace = "pre";
        mark.style.webkitUserSelect = "text";
        mark.style.MozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";
        mark.addEventListener("copy", function(e4) {
          e4.stopPropagation();
          if (options.format) {
            e4.preventDefault();
            if (typeof e4.clipboardData === "undefined") {
              debug && console.warn("unable to use e.clipboardData");
              debug && console.warn("trying IE specific stuff");
              window.clipboardData.clearData();
              var format2 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
              window.clipboardData.setData(format2, text);
            } else {
              e4.clipboardData.clearData();
              e4.clipboardData.setData(options.format, text);
            }
          }
          if (options.onCopy) {
            e4.preventDefault();
            options.onCopy(e4.clipboardData);
          }
        });
        document.body.appendChild(mark);
        range.selectNodeContents(mark);
        selection.addRange(range);
        var successful = document.execCommand("copy");
        if (!successful) {
          throw new Error("copy command was unsuccessful");
        }
        success = true;
      } catch (err) {
        debug && console.error("unable to copy using execCommand: ", err);
        debug && console.warn("trying IE specific stuff");
        try {
          window.clipboardData.setData(options.format || "text", text);
          options.onCopy && options.onCopy(window.clipboardData);
          success = true;
        } catch (err2) {
          debug && console.error("unable to copy using clipboardData: ", err2);
          debug && console.error("falling back to prompt");
          message = format("message" in options ? options.message : defaultMessage);
          window.prompt(message, text);
        }
      } finally {
        if (selection) {
          if (typeof selection.removeRange == "function") {
            selection.removeRange(range);
          } else {
            selection.removeAllRanges();
          }
        }
        if (mark) {
          document.body.removeChild(mark);
        }
        reselectPrevious();
      }
      return success;
    }
    module.exports = copy;
  }
});

// node_modules/entities/lib/maps/entities.json
var require_entities = __commonJS({
  "node_modules/entities/lib/maps/entities.json"(exports, module) {
    module.exports = { Aacute: "Á", aacute: "á", Abreve: "Ă", abreve: "ă", ac: "∾", acd: "∿", acE: "∾̳", Acirc: "Â", acirc: "â", acute: "´", Acy: "А", acy: "а", AElig: "Æ", aelig: "æ", af: "⁡", Afr: "𝔄", afr: "𝔞", Agrave: "À", agrave: "à", alefsym: "ℵ", aleph: "ℵ", Alpha: "Α", alpha: "α", Amacr: "Ā", amacr: "ā", amalg: "⨿", amp: "&", AMP: "&", andand: "⩕", And: "⩓", and: "∧", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angmsd: "∡", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", Aogon: "Ą", aogon: "ą", Aopf: "𝔸", aopf: "𝕒", apacir: "⩯", ap: "≈", apE: "⩰", ape: "≊", apid: "≋", apos: "'", ApplyFunction: "⁡", approx: "≈", approxeq: "≊", Aring: "Å", aring: "å", Ascr: "𝒜", ascr: "𝒶", Assign: "≔", ast: "*", asymp: "≈", asympeq: "≍", Atilde: "Ã", atilde: "ã", Auml: "Ä", auml: "ä", awconint: "∳", awint: "⨑", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", Backslash: "∖", Barv: "⫧", barvee: "⊽", barwed: "⌅", Barwed: "⌆", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", Bcy: "Б", bcy: "б", bdquo: "„", becaus: "∵", because: "∵", Because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", Bernoullis: "ℬ", Beta: "Β", beta: "β", beth: "ℶ", between: "≬", Bfr: "𝔅", bfr: "𝔟", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bNot: "⫭", bnot: "⌐", Bopf: "𝔹", bopf: "𝕓", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxbox: "⧉", boxdl: "┐", boxdL: "╕", boxDl: "╖", boxDL: "╗", boxdr: "┌", boxdR: "╒", boxDr: "╓", boxDR: "╔", boxh: "─", boxH: "═", boxhd: "┬", boxHd: "╤", boxhD: "╥", boxHD: "╦", boxhu: "┴", boxHu: "╧", boxhU: "╨", boxHU: "╩", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxul: "┘", boxuL: "╛", boxUl: "╜", boxUL: "╝", boxur: "└", boxuR: "╘", boxUr: "╙", boxUR: "╚", boxv: "│", boxV: "║", boxvh: "┼", boxvH: "╪", boxVh: "╫", boxVH: "╬", boxvl: "┤", boxvL: "╡", boxVl: "╢", boxVL: "╣", boxvr: "├", boxvR: "╞", boxVr: "╟", boxVR: "╠", bprime: "‵", breve: "˘", Breve: "˘", brvbar: "¦", bscr: "𝒷", Bscr: "ℬ", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsolb: "⧅", bsol: "\\", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpE: "⪮", bumpe: "≏", Bumpeq: "≎", bumpeq: "≏", Cacute: "Ć", cacute: "ć", capand: "⩄", capbrcup: "⩉", capcap: "⩋", cap: "∩", Cap: "⋒", capcup: "⩇", capdot: "⩀", CapitalDifferentialD: "ⅅ", caps: "∩︀", caret: "⁁", caron: "ˇ", Cayleys: "ℭ", ccaps: "⩍", Ccaron: "Č", ccaron: "č", Ccedil: "Ç", ccedil: "ç", Ccirc: "Ĉ", ccirc: "ĉ", Cconint: "∰", ccups: "⩌", ccupssm: "⩐", Cdot: "Ċ", cdot: "ċ", cedil: "¸", Cedilla: "¸", cemptyv: "⦲", cent: "¢", centerdot: "·", CenterDot: "·", cfr: "𝔠", Cfr: "ℭ", CHcy: "Ч", chcy: "ч", check: "✓", checkmark: "✓", Chi: "Χ", chi: "χ", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", CircleDot: "⊙", circledR: "®", circledS: "Ⓢ", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", cir: "○", cirE: "⧃", cire: "≗", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", clubs: "♣", clubsuit: "♣", colon: ":", Colon: "∷", Colone: "⩴", colone: "≔", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", Congruent: "≡", conint: "∮", Conint: "∯", ContourIntegral: "∮", copf: "𝕔", Copf: "ℂ", coprod: "∐", Coproduct: "∐", copy: "©", COPY: "©", copysr: "℗", CounterClockwiseContourIntegral: "∳", crarr: "↵", cross: "✗", Cross: "⨯", Cscr: "𝒞", cscr: "𝒸", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", cupbrcap: "⩈", cupcap: "⩆", CupCap: "≍", cup: "∪", Cup: "⋓", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", dagger: "†", Dagger: "‡", daleth: "ℸ", darr: "↓", Darr: "↡", dArr: "⇓", dash: "‐", Dashv: "⫤", dashv: "⊣", dbkarow: "⤏", dblac: "˝", Dcaron: "Ď", dcaron: "ď", Dcy: "Д", dcy: "д", ddagger: "‡", ddarr: "⇊", DD: "ⅅ", dd: "ⅆ", DDotrahd: "⤑", ddotseq: "⩷", deg: "°", Del: "∇", Delta: "Δ", delta: "δ", demptyv: "⦱", dfisht: "⥿", Dfr: "𝔇", dfr: "𝔡", dHar: "⥥", dharl: "⇃", dharr: "⇂", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", diam: "⋄", diamond: "⋄", Diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", DifferentialD: "ⅆ", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", DJcy: "Ђ", djcy: "ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", Dopf: "𝔻", dopf: "𝕕", Dot: "¨", dot: "˙", DotDot: "⃜", doteq: "≐", doteqdot: "≑", DotEqual: "≐", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", DownArrowBar: "⤓", downarrow: "↓", DownArrow: "↓", Downarrow: "⇓", DownArrowUpArrow: "⇵", DownBreve: "̑", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVectorBar: "⥖", DownLeftVector: "↽", DownRightTeeVector: "⥟", DownRightVectorBar: "⥗", DownRightVector: "⇁", DownTeeArrow: "↧", DownTee: "⊤", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", Dscr: "𝒟", dscr: "𝒹", DScy: "Ѕ", dscy: "ѕ", dsol: "⧶", Dstrok: "Đ", dstrok: "đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", DZcy: "Џ", dzcy: "џ", dzigrarr: "⟿", Eacute: "É", eacute: "é", easter: "⩮", Ecaron: "Ě", ecaron: "ě", Ecirc: "Ê", ecirc: "ê", ecir: "≖", ecolon: "≕", Ecy: "Э", ecy: "э", eDDot: "⩷", Edot: "Ė", edot: "ė", eDot: "≑", ee: "ⅇ", efDot: "≒", Efr: "𝔈", efr: "𝔢", eg: "⪚", Egrave: "È", egrave: "è", egs: "⪖", egsdot: "⪘", el: "⪙", Element: "∈", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", Emacr: "Ē", emacr: "ē", empty: "∅", emptyset: "∅", EmptySmallSquare: "◻", emptyv: "∅", EmptyVerySmallSquare: "▫", emsp13: " ", emsp14: " ", emsp: " ", ENG: "Ŋ", eng: "ŋ", ensp: " ", Eogon: "Ę", eogon: "ę", Eopf: "𝔼", eopf: "𝕖", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", Epsilon: "Ε", epsilon: "ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", Equal: "⩵", equals: "=", EqualTilde: "≂", equest: "≟", Equilibrium: "⇌", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erarr: "⥱", erDot: "≓", escr: "ℯ", Escr: "ℰ", esdot: "≐", Esim: "⩳", esim: "≂", Eta: "Η", eta: "η", ETH: "Ð", eth: "ð", Euml: "Ë", euml: "ë", euro: "€", excl: "!", exist: "∃", Exists: "∃", expectation: "ℰ", exponentiale: "ⅇ", ExponentialE: "ⅇ", fallingdotseq: "≒", Fcy: "Ф", fcy: "ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", Ffr: "𝔉", ffr: "𝔣", filig: "ﬁ", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", Fopf: "𝔽", fopf: "𝕗", forall: "∀", ForAll: "∀", fork: "⋔", forkv: "⫙", Fouriertrf: "ℱ", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", fscr: "𝒻", Fscr: "ℱ", gacute: "ǵ", Gamma: "Γ", gamma: "γ", Gammad: "Ϝ", gammad: "ϝ", gap: "⪆", Gbreve: "Ğ", gbreve: "ğ", Gcedil: "Ģ", Gcirc: "Ĝ", gcirc: "ĝ", Gcy: "Г", gcy: "г", Gdot: "Ġ", gdot: "ġ", ge: "≥", gE: "≧", gEl: "⪌", gel: "⋛", geq: "≥", geqq: "≧", geqslant: "⩾", gescc: "⪩", ges: "⩾", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", Gfr: "𝔊", gfr: "𝔤", gg: "≫", Gg: "⋙", ggg: "⋙", gimel: "ℷ", GJcy: "Ѓ", gjcy: "ѓ", gla: "⪥", gl: "≷", glE: "⪒", glj: "⪤", gnap: "⪊", gnapprox: "⪊", gne: "⪈", gnE: "≩", gneq: "⪈", gneqq: "≩", gnsim: "⋧", Gopf: "𝔾", gopf: "𝕘", grave: "`", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", Gscr: "𝒢", gscr: "ℊ", gsim: "≳", gsime: "⪎", gsiml: "⪐", gtcc: "⪧", gtcir: "⩺", gt: ">", GT: ">", Gt: "≫", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", Hacek: "ˇ", hairsp: " ", half: "½", hamilt: "ℋ", HARDcy: "Ъ", hardcy: "ъ", harrcir: "⥈", harr: "↔", hArr: "⇔", harrw: "↭", Hat: "^", hbar: "ℏ", Hcirc: "Ĥ", hcirc: "ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", hfr: "𝔥", Hfr: "ℌ", HilbertSpace: "ℋ", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", hopf: "𝕙", Hopf: "ℍ", horbar: "―", HorizontalLine: "─", hscr: "𝒽", Hscr: "ℋ", hslash: "ℏ", Hstrok: "Ħ", hstrok: "ħ", HumpDownHump: "≎", HumpEqual: "≏", hybull: "⁃", hyphen: "‐", Iacute: "Í", iacute: "í", ic: "⁣", Icirc: "Î", icirc: "î", Icy: "И", icy: "и", Idot: "İ", IEcy: "Е", iecy: "е", iexcl: "¡", iff: "⇔", ifr: "𝔦", Ifr: "ℑ", Igrave: "Ì", igrave: "ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", IJlig: "Ĳ", ijlig: "ĳ", Imacr: "Ī", imacr: "ī", image: "ℑ", ImaginaryI: "ⅈ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", Im: "ℑ", imof: "⊷", imped: "Ƶ", Implies: "⇒", incare: "℅", in: "∈", infin: "∞", infintie: "⧝", inodot: "ı", intcal: "⊺", int: "∫", Int: "∬", integers: "ℤ", Integral: "∫", intercal: "⊺", Intersection: "⋂", intlarhk: "⨗", intprod: "⨼", InvisibleComma: "⁣", InvisibleTimes: "⁢", IOcy: "Ё", iocy: "ё", Iogon: "Į", iogon: "į", Iopf: "𝕀", iopf: "𝕚", Iota: "Ι", iota: "ι", iprod: "⨼", iquest: "¿", iscr: "𝒾", Iscr: "ℐ", isin: "∈", isindot: "⋵", isinE: "⋹", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", Itilde: "Ĩ", itilde: "ĩ", Iukcy: "І", iukcy: "і", Iuml: "Ï", iuml: "ï", Jcirc: "Ĵ", jcirc: "ĵ", Jcy: "Й", jcy: "й", Jfr: "𝔍", jfr: "𝔧", jmath: "ȷ", Jopf: "𝕁", jopf: "𝕛", Jscr: "𝒥", jscr: "𝒿", Jsercy: "Ј", jsercy: "ј", Jukcy: "Є", jukcy: "є", Kappa: "Κ", kappa: "κ", kappav: "ϰ", Kcedil: "Ķ", kcedil: "ķ", Kcy: "К", kcy: "к", Kfr: "𝔎", kfr: "𝔨", kgreen: "ĸ", KHcy: "Х", khcy: "х", KJcy: "Ќ", kjcy: "ќ", Kopf: "𝕂", kopf: "𝕜", Kscr: "𝒦", kscr: "𝓀", lAarr: "⇚", Lacute: "Ĺ", lacute: "ĺ", laemptyv: "⦴", lagran: "ℒ", Lambda: "Λ", lambda: "λ", lang: "⟨", Lang: "⟪", langd: "⦑", langle: "⟨", lap: "⪅", Laplacetrf: "ℒ", laquo: "«", larrb: "⇤", larrbfs: "⤟", larr: "←", Larr: "↞", lArr: "⇐", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", latail: "⤙", lAtail: "⤛", lat: "⪫", late: "⪭", lates: "⪭︀", lbarr: "⤌", lBarr: "⤎", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", Lcaron: "Ľ", lcaron: "ľ", Lcedil: "Ļ", lcedil: "ļ", lceil: "⌈", lcub: "{", Lcy: "Л", lcy: "л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", le: "≤", lE: "≦", LeftAngleBracket: "⟨", LeftArrowBar: "⇤", leftarrow: "←", LeftArrow: "←", Leftarrow: "⇐", LeftArrowRightArrow: "⇆", leftarrowtail: "↢", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVectorBar: "⥙", LeftDownVector: "⇃", LeftFloor: "⌊", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", leftrightarrow: "↔", LeftRightArrow: "↔", Leftrightarrow: "⇔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", LeftRightVector: "⥎", LeftTeeArrow: "↤", LeftTee: "⊣", LeftTeeVector: "⥚", leftthreetimes: "⋋", LeftTriangleBar: "⧏", LeftTriangle: "⊲", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVectorBar: "⥘", LeftUpVector: "↿", LeftVectorBar: "⥒", LeftVector: "↼", lEg: "⪋", leg: "⋚", leq: "≤", leqq: "≦", leqslant: "⩽", lescc: "⪨", les: "⩽", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", lessgtr: "≶", LessLess: "⪡", lesssim: "≲", LessSlantEqual: "⩽", LessTilde: "≲", lfisht: "⥼", lfloor: "⌊", Lfr: "𝔏", lfr: "𝔩", lg: "≶", lgE: "⪑", lHar: "⥢", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", LJcy: "Љ", ljcy: "љ", llarr: "⇇", ll: "≪", Ll: "⋘", llcorner: "⌞", Lleftarrow: "⇚", llhard: "⥫", lltri: "◺", Lmidot: "Ŀ", lmidot: "ŀ", lmoustache: "⎰", lmoust: "⎰", lnap: "⪉", lnapprox: "⪉", lne: "⪇", lnE: "≨", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", longleftarrow: "⟵", LongLeftArrow: "⟵", Longleftarrow: "⟸", longleftrightarrow: "⟷", LongLeftRightArrow: "⟷", Longleftrightarrow: "⟺", longmapsto: "⟼", longrightarrow: "⟶", LongRightArrow: "⟶", Longrightarrow: "⟹", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", Lopf: "𝕃", lopf: "𝕝", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", LowerLeftArrow: "↙", LowerRightArrow: "↘", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", lscr: "𝓁", Lscr: "ℒ", lsh: "↰", Lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", Lstrok: "Ł", lstrok: "ł", ltcc: "⪦", ltcir: "⩹", lt: "<", LT: "<", Lt: "≪", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltri: "◃", ltrie: "⊴", ltrif: "◂", ltrPar: "⦖", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", macr: "¯", male: "♂", malt: "✠", maltese: "✠", Map: "⤅", map: "↦", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", Mcy: "М", mcy: "м", mdash: "—", mDDot: "∺", measuredangle: "∡", MediumSpace: " ", Mellintrf: "ℳ", Mfr: "𝔐", mfr: "𝔪", mho: "℧", micro: "µ", midast: "*", midcir: "⫰", mid: "∣", middot: "·", minusb: "⊟", minus: "−", minusd: "∸", minusdu: "⨪", MinusPlus: "∓", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", Mopf: "𝕄", mopf: "𝕞", mp: "∓", mscr: "𝓂", Mscr: "ℳ", mstpos: "∾", Mu: "Μ", mu: "μ", multimap: "⊸", mumap: "⊸", nabla: "∇", Nacute: "Ń", nacute: "ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natural: "♮", naturals: "ℕ", natur: "♮", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", Ncaron: "Ň", ncaron: "ň", Ncedil: "Ņ", ncedil: "ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", Ncy: "Н", ncy: "н", ndash: "–", nearhk: "⤤", nearr: "↗", neArr: "⇗", nearrow: "↗", ne: "≠", nedot: "≐̸", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", nequiv: "≢", nesear: "⤨", nesim: "≂̸", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: "\n", nexist: "∄", nexists: "∄", Nfr: "𝔑", nfr: "𝔫", ngE: "≧̸", nge: "≱", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", nGg: "⋙̸", ngsim: "≵", nGt: "≫⃒", ngt: "≯", ngtr: "≯", nGtv: "≫̸", nharr: "↮", nhArr: "⇎", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", NJcy: "Њ", njcy: "њ", nlarr: "↚", nlArr: "⇍", nldr: "‥", nlE: "≦̸", nle: "≰", nleftarrow: "↚", nLeftarrow: "⇍", nleftrightarrow: "↮", nLeftrightarrow: "⇎", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nLl: "⋘̸", nlsim: "≴", nLt: "≪⃒", nlt: "≮", nltri: "⋪", nltrie: "⋬", nLtv: "≪̸", nmid: "∤", NoBreak: "⁠", NonBreakingSpace: " ", nopf: "𝕟", Nopf: "ℕ", Not: "⫬", not: "¬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", notin: "∉", notindot: "⋵̸", notinE: "⋹̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", NotLeftTriangleBar: "⧏̸", NotLeftTriangle: "⋪", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangleBar: "⧐̸", NotRightTriangle: "⋫", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", nparallel: "∦", npar: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", nprec: "⊀", npreceq: "⪯̸", npre: "⪯̸", nrarrc: "⤳̸", nrarr: "↛", nrArr: "⇏", nrarrw: "↝̸", nrightarrow: "↛", nRightarrow: "⇏", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", Nscr: "𝒩", nscr: "𝓃", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsubE: "⫅̸", nsube: "⊈", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupE: "⫆̸", nsupe: "⊉", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", Ntilde: "Ñ", ntilde: "ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", Nu: "Ν", nu: "ν", num: "#", numero: "№", numsp: " ", nvap: "≍⃒", nvdash: "⊬", nvDash: "⊭", nVdash: "⊮", nVDash: "⊯", nvge: "≥⃒", nvgt: ">⃒", nvHarr: "⤄", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwarhk: "⤣", nwarr: "↖", nwArr: "⇖", nwarrow: "↖", nwnear: "⤧", Oacute: "Ó", oacute: "ó", oast: "⊛", Ocirc: "Ô", ocirc: "ô", ocir: "⊚", Ocy: "О", ocy: "о", odash: "⊝", Odblac: "Ő", odblac: "ő", odiv: "⨸", odot: "⊙", odsold: "⦼", OElig: "Œ", oelig: "œ", ofcir: "⦿", Ofr: "𝔒", ofr: "𝔬", ogon: "˛", Ograve: "Ò", ograve: "ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", Omacr: "Ō", omacr: "ō", Omega: "Ω", omega: "ω", Omicron: "Ο", omicron: "ο", omid: "⦶", ominus: "⊖", Oopf: "𝕆", oopf: "𝕠", opar: "⦷", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", operp: "⦹", oplus: "⊕", orarr: "↻", Or: "⩔", or: "∨", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oS: "Ⓢ", Oscr: "𝒪", oscr: "ℴ", Oslash: "Ø", oslash: "ø", osol: "⊘", Otilde: "Õ", otilde: "õ", otimesas: "⨶", Otimes: "⨷", otimes: "⊗", Ouml: "Ö", ouml: "ö", ovbar: "⌽", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", para: "¶", parallel: "∥", par: "∥", parsim: "⫳", parsl: "⫽", part: "∂", PartialD: "∂", Pcy: "П", pcy: "п", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", Pfr: "𝔓", pfr: "𝔭", Phi: "Φ", phi: "φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", Pi: "Π", pi: "π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plus: "+", plusdo: "∔", plusdu: "⨥", pluse: "⩲", PlusMinus: "±", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", Poincareplane: "ℌ", pointint: "⨕", popf: "𝕡", Popf: "ℙ", pound: "£", prap: "⪷", Pr: "⪻", pr: "≺", prcue: "≼", precapprox: "⪷", prec: "≺", preccurlyeq: "≼", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", pre: "⪯", prE: "⪳", precsim: "≾", prime: "′", Prime: "″", primes: "ℙ", prnap: "⪹", prnE: "⪵", prnsim: "⋨", prod: "∏", Product: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", Proportional: "∝", Proportion: "∷", propto: "∝", prsim: "≾", prurel: "⊰", Pscr: "𝒫", pscr: "𝓅", Psi: "Ψ", psi: "ψ", puncsp: " ", Qfr: "𝔔", qfr: "𝔮", qint: "⨌", qopf: "𝕢", Qopf: "ℚ", qprime: "⁗", Qscr: "𝒬", qscr: "𝓆", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", quot: '"', QUOT: '"', rAarr: "⇛", race: "∽̱", Racute: "Ŕ", racute: "ŕ", radic: "√", raemptyv: "⦳", rang: "⟩", Rang: "⟫", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarr: "→", Rarr: "↠", rArr: "⇒", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", Rarrtl: "⤖", rarrtl: "↣", rarrw: "↝", ratail: "⤚", rAtail: "⤜", ratio: "∶", rationals: "ℚ", rbarr: "⤍", rBarr: "⤏", RBarr: "⤐", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", Rcaron: "Ř", rcaron: "ř", Rcedil: "Ŗ", rcedil: "ŗ", rceil: "⌉", rcub: "}", Rcy: "Р", rcy: "р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", Re: "ℜ", rect: "▭", reg: "®", REG: "®", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", rfisht: "⥽", rfloor: "⌋", rfr: "𝔯", Rfr: "ℜ", rHar: "⥤", rhard: "⇁", rharu: "⇀", rharul: "⥬", Rho: "Ρ", rho: "ρ", rhov: "ϱ", RightAngleBracket: "⟩", RightArrowBar: "⇥", rightarrow: "→", RightArrow: "→", Rightarrow: "⇒", RightArrowLeftArrow: "⇄", rightarrowtail: "↣", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVectorBar: "⥕", RightDownVector: "⇂", RightFloor: "⌋", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", RightTeeArrow: "↦", RightTee: "⊢", RightTeeVector: "⥛", rightthreetimes: "⋌", RightTriangleBar: "⧐", RightTriangle: "⊳", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVectorBar: "⥔", RightUpVector: "↾", RightVectorBar: "⥓", RightVector: "⇀", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoustache: "⎱", rmoust: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", ropf: "𝕣", Ropf: "ℝ", roplus: "⨮", rotimes: "⨵", RoundImplies: "⥰", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", Rrightarrow: "⇛", rsaquo: "›", rscr: "𝓇", Rscr: "ℛ", rsh: "↱", Rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", RuleDelayed: "⧴", ruluhar: "⥨", rx: "℞", Sacute: "Ś", sacute: "ś", sbquo: "‚", scap: "⪸", Scaron: "Š", scaron: "š", Sc: "⪼", sc: "≻", sccue: "≽", sce: "⪰", scE: "⪴", Scedil: "Ş", scedil: "ş", Scirc: "Ŝ", scirc: "ŝ", scnap: "⪺", scnE: "⪶", scnsim: "⋩", scpolint: "⨓", scsim: "≿", Scy: "С", scy: "с", sdotb: "⊡", sdot: "⋅", sdote: "⩦", searhk: "⤥", searr: "↘", seArr: "⇘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", Sfr: "𝔖", sfr: "𝔰", sfrown: "⌢", sharp: "♯", SHCHcy: "Щ", shchcy: "щ", SHcy: "Ш", shcy: "ш", ShortDownArrow: "↓", ShortLeftArrow: "←", shortmid: "∣", shortparallel: "∥", ShortRightArrow: "→", ShortUpArrow: "↑", shy: "­", Sigma: "Σ", sigma: "σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", SmallCircle: "∘", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", SOFTcy: "Ь", softcy: "ь", solbar: "⌿", solb: "⧄", sol: "/", Sopf: "𝕊", sopf: "𝕤", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", Sqrt: "√", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", square: "□", Square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", squarf: "▪", squ: "□", squf: "▪", srarr: "→", Sscr: "𝒮", sscr: "𝓈", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", Star: "⋆", star: "☆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", sub: "⊂", Sub: "⋐", subdot: "⪽", subE: "⫅", sube: "⊆", subedot: "⫃", submult: "⫁", subnE: "⫋", subne: "⊊", subplus: "⪿", subrarr: "⥹", subset: "⊂", Subset: "⋐", subseteq: "⊆", subseteqq: "⫅", SubsetEqual: "⊆", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succapprox: "⪸", succ: "≻", succcurlyeq: "≽", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", SuchThat: "∋", sum: "∑", Sum: "∑", sung: "♪", sup1: "¹", sup2: "²", sup3: "³", sup: "⊃", Sup: "⋑", supdot: "⪾", supdsub: "⫘", supE: "⫆", supe: "⊇", supedot: "⫄", Superset: "⊃", SupersetEqual: "⊇", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supnE: "⫌", supne: "⊋", supplus: "⫀", supset: "⊃", Supset: "⋑", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swarhk: "⤦", swarr: "↙", swArr: "⇙", swarrow: "↙", swnwar: "⤪", szlig: "ß", Tab: "	", target: "⌖", Tau: "Τ", tau: "τ", tbrk: "⎴", Tcaron: "Ť", tcaron: "ť", Tcedil: "Ţ", tcedil: "ţ", Tcy: "Т", tcy: "т", tdot: "⃛", telrec: "⌕", Tfr: "𝔗", tfr: "𝔱", there4: "∴", therefore: "∴", Therefore: "∴", Theta: "Θ", theta: "θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", ThickSpace: "  ", ThinSpace: " ", thinsp: " ", thkap: "≈", thksim: "∼", THORN: "Þ", thorn: "þ", tilde: "˜", Tilde: "∼", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", timesbar: "⨱", timesb: "⊠", times: "×", timesd: "⨰", tint: "∭", toea: "⤨", topbot: "⌶", topcir: "⫱", top: "⊤", Topf: "𝕋", topf: "𝕥", topfork: "⫚", tosa: "⤩", tprime: "‴", trade: "™", TRADE: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", TripleDot: "⃛", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", Tscr: "𝒯", tscr: "𝓉", TScy: "Ц", tscy: "ц", TSHcy: "Ћ", tshcy: "ћ", Tstrok: "Ŧ", tstrok: "ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", Uacute: "Ú", uacute: "ú", uarr: "↑", Uarr: "↟", uArr: "⇑", Uarrocir: "⥉", Ubrcy: "Ў", ubrcy: "ў", Ubreve: "Ŭ", ubreve: "ŭ", Ucirc: "Û", ucirc: "û", Ucy: "У", ucy: "у", udarr: "⇅", Udblac: "Ű", udblac: "ű", udhar: "⥮", ufisht: "⥾", Ufr: "𝔘", ufr: "𝔲", Ugrave: "Ù", ugrave: "ù", uHar: "⥣", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", Umacr: "Ū", umacr: "ū", uml: "¨", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", Uogon: "Ų", uogon: "ų", Uopf: "𝕌", uopf: "𝕦", UpArrowBar: "⤒", uparrow: "↑", UpArrow: "↑", Uparrow: "⇑", UpArrowDownArrow: "⇅", updownarrow: "↕", UpDownArrow: "↕", Updownarrow: "⇕", UpEquilibrium: "⥮", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", UpperLeftArrow: "↖", UpperRightArrow: "↗", upsi: "υ", Upsi: "ϒ", upsih: "ϒ", Upsilon: "Υ", upsilon: "υ", UpTeeArrow: "↥", UpTee: "⊥", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", Uring: "Ů", uring: "ů", urtri: "◹", Uscr: "𝒰", uscr: "𝓊", utdot: "⋰", Utilde: "Ũ", utilde: "ũ", utri: "▵", utrif: "▴", uuarr: "⇈", Uuml: "Ü", uuml: "ü", uwangle: "⦧", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", varr: "↕", vArr: "⇕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", vBar: "⫨", Vbar: "⫫", vBarv: "⫩", Vcy: "В", vcy: "в", vdash: "⊢", vDash: "⊨", Vdash: "⊩", VDash: "⊫", Vdashl: "⫦", veebar: "⊻", vee: "∨", Vee: "⋁", veeeq: "≚", vellip: "⋮", verbar: "|", Verbar: "‖", vert: "|", Vert: "‖", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", Vfr: "𝔙", vfr: "𝔳", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", Vopf: "𝕍", vopf: "𝕧", vprop: "∝", vrtri: "⊳", Vscr: "𝒱", vscr: "𝓋", vsubnE: "⫋︀", vsubne: "⊊︀", vsupnE: "⫌︀", vsupne: "⊋︀", Vvdash: "⊪", vzigzag: "⦚", Wcirc: "Ŵ", wcirc: "ŵ", wedbar: "⩟", wedge: "∧", Wedge: "⋀", wedgeq: "≙", weierp: "℘", Wfr: "𝔚", wfr: "𝔴", Wopf: "𝕎", wopf: "𝕨", wp: "℘", wr: "≀", wreath: "≀", Wscr: "𝒲", wscr: "𝓌", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", Xfr: "𝔛", xfr: "𝔵", xharr: "⟷", xhArr: "⟺", Xi: "Ξ", xi: "ξ", xlarr: "⟵", xlArr: "⟸", xmap: "⟼", xnis: "⋻", xodot: "⨀", Xopf: "𝕏", xopf: "𝕩", xoplus: "⨁", xotime: "⨂", xrarr: "⟶", xrArr: "⟹", Xscr: "𝒳", xscr: "𝓍", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", Yacute: "Ý", yacute: "ý", YAcy: "Я", yacy: "я", Ycirc: "Ŷ", ycirc: "ŷ", Ycy: "Ы", ycy: "ы", yen: "¥", Yfr: "𝔜", yfr: "𝔶", YIcy: "Ї", yicy: "ї", Yopf: "𝕐", yopf: "𝕪", Yscr: "𝒴", yscr: "𝓎", YUcy: "Ю", yucy: "ю", yuml: "ÿ", Yuml: "Ÿ", Zacute: "Ź", zacute: "ź", Zcaron: "Ž", zcaron: "ž", Zcy: "З", zcy: "з", Zdot: "Ż", zdot: "ż", zeetrf: "ℨ", ZeroWidthSpace: "​", Zeta: "Ζ", zeta: "ζ", zfr: "𝔷", Zfr: "ℨ", ZHcy: "Ж", zhcy: "ж", zigrarr: "⇝", zopf: "𝕫", Zopf: "ℤ", Zscr: "𝒵", zscr: "𝓏", zwj: "‍", zwnj: "‌" };
  }
});

// node_modules/markdown-it/lib/common/entities.js
var require_entities2 = __commonJS({
  "node_modules/markdown-it/lib/common/entities.js"(exports, module) {
    "use strict";
    module.exports = require_entities();
  }
});

// node_modules/uc.micro/categories/P/regex.js
var require_regex = __commonJS({
  "node_modules/uc.micro/categories/P/regex.js"(exports, module) {
    module.exports = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;
  }
});

// node_modules/mdurl/encode.js
var require_encode = __commonJS({
  "node_modules/mdurl/encode.js"(exports, module) {
    "use strict";
    var encodeCache = {};
    function getEncodeCache(exclude) {
      var i4, ch, cache = encodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = encodeCache[exclude] = [];
      for (i4 = 0; i4 < 128; i4++) {
        ch = String.fromCharCode(i4);
        if (/^[0-9a-z]$/i.test(ch)) {
          cache.push(ch);
        } else {
          cache.push("%" + ("0" + i4.toString(16).toUpperCase()).slice(-2));
        }
      }
      for (i4 = 0; i4 < exclude.length; i4++) {
        cache[exclude.charCodeAt(i4)] = exclude[i4];
      }
      return cache;
    }
    function encode2(string, exclude, keepEscaped) {
      var i4, l2, code, nextCode, cache, result = "";
      if (typeof exclude !== "string") {
        keepEscaped = exclude;
        exclude = encode2.defaultChars;
      }
      if (typeof keepEscaped === "undefined") {
        keepEscaped = true;
      }
      cache = getEncodeCache(exclude);
      for (i4 = 0, l2 = string.length; i4 < l2; i4++) {
        code = string.charCodeAt(i4);
        if (keepEscaped && code === 37 && i4 + 2 < l2) {
          if (/^[0-9a-f]{2}$/i.test(string.slice(i4 + 1, i4 + 3))) {
            result += string.slice(i4, i4 + 3);
            i4 += 2;
            continue;
          }
        }
        if (code < 128) {
          result += cache[code];
          continue;
        }
        if (code >= 55296 && code <= 57343) {
          if (code >= 55296 && code <= 56319 && i4 + 1 < l2) {
            nextCode = string.charCodeAt(i4 + 1);
            if (nextCode >= 56320 && nextCode <= 57343) {
              result += encodeURIComponent(string[i4] + string[i4 + 1]);
              i4++;
              continue;
            }
          }
          result += "%EF%BF%BD";
          continue;
        }
        result += encodeURIComponent(string[i4]);
      }
      return result;
    }
    encode2.defaultChars = ";/?:@&=+$,-_.!~*'()#";
    encode2.componentChars = "-_.!~*'()";
    module.exports = encode2;
  }
});

// node_modules/mdurl/decode.js
var require_decode = __commonJS({
  "node_modules/mdurl/decode.js"(exports, module) {
    "use strict";
    var decodeCache = {};
    function getDecodeCache(exclude) {
      var i4, ch, cache = decodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = decodeCache[exclude] = [];
      for (i4 = 0; i4 < 128; i4++) {
        ch = String.fromCharCode(i4);
        cache.push(ch);
      }
      for (i4 = 0; i4 < exclude.length; i4++) {
        ch = exclude.charCodeAt(i4);
        cache[ch] = "%" + ("0" + ch.toString(16).toUpperCase()).slice(-2);
      }
      return cache;
    }
    function decode2(string, exclude) {
      var cache;
      if (typeof exclude !== "string") {
        exclude = decode2.defaultChars;
      }
      cache = getDecodeCache(exclude);
      return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
        var i4, l2, b1, b22, b32, b4, chr, result = "";
        for (i4 = 0, l2 = seq.length; i4 < l2; i4 += 3) {
          b1 = parseInt(seq.slice(i4 + 1, i4 + 3), 16);
          if (b1 < 128) {
            result += cache[b1];
            continue;
          }
          if ((b1 & 224) === 192 && i4 + 3 < l2) {
            b22 = parseInt(seq.slice(i4 + 4, i4 + 6), 16);
            if ((b22 & 192) === 128) {
              chr = b1 << 6 & 1984 | b22 & 63;
              if (chr < 128) {
                result += "��";
              } else {
                result += String.fromCharCode(chr);
              }
              i4 += 3;
              continue;
            }
          }
          if ((b1 & 240) === 224 && i4 + 6 < l2) {
            b22 = parseInt(seq.slice(i4 + 4, i4 + 6), 16);
            b32 = parseInt(seq.slice(i4 + 7, i4 + 9), 16);
            if ((b22 & 192) === 128 && (b32 & 192) === 128) {
              chr = b1 << 12 & 61440 | b22 << 6 & 4032 | b32 & 63;
              if (chr < 2048 || chr >= 55296 && chr <= 57343) {
                result += "���";
              } else {
                result += String.fromCharCode(chr);
              }
              i4 += 6;
              continue;
            }
          }
          if ((b1 & 248) === 240 && i4 + 9 < l2) {
            b22 = parseInt(seq.slice(i4 + 4, i4 + 6), 16);
            b32 = parseInt(seq.slice(i4 + 7, i4 + 9), 16);
            b4 = parseInt(seq.slice(i4 + 10, i4 + 12), 16);
            if ((b22 & 192) === 128 && (b32 & 192) === 128 && (b4 & 192) === 128) {
              chr = b1 << 18 & 1835008 | b22 << 12 & 258048 | b32 << 6 & 4032 | b4 & 63;
              if (chr < 65536 || chr > 1114111) {
                result += "����";
              } else {
                chr -= 65536;
                result += String.fromCharCode(55296 + (chr >> 10), 56320 + (chr & 1023));
              }
              i4 += 9;
              continue;
            }
          }
          result += "�";
        }
        return result;
      });
    }
    decode2.defaultChars = ";/?:@&=+$,#";
    decode2.componentChars = "";
    module.exports = decode2;
  }
});

// node_modules/mdurl/format.js
var require_format = __commonJS({
  "node_modules/mdurl/format.js"(exports, module) {
    "use strict";
    module.exports = function format(url) {
      var result = "";
      result += url.protocol || "";
      result += url.slashes ? "//" : "";
      result += url.auth ? url.auth + "@" : "";
      if (url.hostname && url.hostname.indexOf(":") !== -1) {
        result += "[" + url.hostname + "]";
      } else {
        result += url.hostname || "";
      }
      result += url.port ? ":" + url.port : "";
      result += url.pathname || "";
      result += url.search || "";
      result += url.hash || "";
      return result;
    };
  }
});

// node_modules/mdurl/parse.js
var require_parse = __commonJS({
  "node_modules/mdurl/parse.js"(exports, module) {
    "use strict";
    function Url() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.pathname = null;
    }
    var protocolPattern = /^([a-z0-9.+-]+:)/i;
    var portPattern = /:[0-9]*$/;
    var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
    var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
    var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
    var autoEscape = ["'"].concat(unwise);
    var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
    var hostEndingChars = ["/", "?", "#"];
    var hostnameMaxLen = 255;
    var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
    var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
    var hostlessProtocol = {
      "javascript": true,
      "javascript:": true
    };
    var slashedProtocol = {
      "http": true,
      "https": true,
      "ftp": true,
      "gopher": true,
      "file": true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true
    };
    function urlParse(url, slashesDenoteHost) {
      if (url && url instanceof Url) {
        return url;
      }
      var u2 = new Url();
      u2.parse(url, slashesDenoteHost);
      return u2;
    }
    Url.prototype.parse = function(url, slashesDenoteHost) {
      var i4, l2, lowerProto, hec, slashes, rest = url;
      rest = rest.trim();
      if (!slashesDenoteHost && url.split("#").length === 1) {
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
          }
          return this;
        }
      }
      var proto = protocolPattern.exec(rest);
      if (proto) {
        proto = proto[0];
        lowerProto = proto.toLowerCase();
        this.protocol = proto;
        rest = rest.substr(proto.length);
      }
      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        slashes = rest.substr(0, 2) === "//";
        if (slashes && !(proto && hostlessProtocol[proto])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }
      if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
        var hostEnd = -1;
        for (i4 = 0; i4 < hostEndingChars.length; i4++) {
          hec = rest.indexOf(hostEndingChars[i4]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        var auth, atSign;
        if (hostEnd === -1) {
          atSign = rest.lastIndexOf("@");
        } else {
          atSign = rest.lastIndexOf("@", hostEnd);
        }
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = auth;
        }
        hostEnd = -1;
        for (i4 = 0; i4 < nonHostChars.length; i4++) {
          hec = rest.indexOf(nonHostChars[i4]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
            hostEnd = hec;
          }
        }
        if (hostEnd === -1) {
          hostEnd = rest.length;
        }
        if (rest[hostEnd - 1] === ":") {
          hostEnd--;
        }
        var host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);
        this.parseHost(host);
        this.hostname = this.hostname || "";
        var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!ipv6Hostname) {
          var hostparts = this.hostname.split(/\./);
          for (i4 = 0, l2 = hostparts.length; i4 < l2; i4++) {
            var part = hostparts[i4];
            if (!part) {
              continue;
            }
            if (!part.match(hostnamePartPattern)) {
              var newpart = "";
              for (var j2 = 0, k3 = part.length; j2 < k3; j2++) {
                if (part.charCodeAt(j2) > 127) {
                  newpart += "x";
                } else {
                  newpart += part[j2];
                }
              }
              if (!newpart.match(hostnamePartPattern)) {
                var validParts = hostparts.slice(0, i4);
                var notHost = hostparts.slice(i4 + 1);
                var bit = part.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = notHost.join(".") + rest;
                }
                this.hostname = validParts.join(".");
                break;
              }
            }
          }
        }
        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = "";
        }
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        }
      }
      var hash = rest.indexOf("#");
      if (hash !== -1) {
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
      }
      var qm = rest.indexOf("?");
      if (qm !== -1) {
        this.search = rest.substr(qm);
        rest = rest.slice(0, qm);
      }
      if (rest) {
        this.pathname = rest;
      }
      if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
        this.pathname = "";
      }
      return this;
    };
    Url.prototype.parseHost = function(host) {
      var port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ":") {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host) {
        this.hostname = host;
      }
    };
    module.exports = urlParse;
  }
});

// node_modules/mdurl/index.js
var require_mdurl = __commonJS({
  "node_modules/mdurl/index.js"(exports, module) {
    "use strict";
    module.exports.encode = require_encode();
    module.exports.decode = require_decode();
    module.exports.format = require_format();
    module.exports.parse = require_parse();
  }
});

// node_modules/uc.micro/properties/Any/regex.js
var require_regex2 = __commonJS({
  "node_modules/uc.micro/properties/Any/regex.js"(exports, module) {
    module.exports = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  }
});

// node_modules/uc.micro/categories/Cc/regex.js
var require_regex3 = __commonJS({
  "node_modules/uc.micro/categories/Cc/regex.js"(exports, module) {
    module.exports = /[\0-\x1F\x7F-\x9F]/;
  }
});

// node_modules/uc.micro/categories/Cf/regex.js
var require_regex4 = __commonJS({
  "node_modules/uc.micro/categories/Cf/regex.js"(exports, module) {
    module.exports = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;
  }
});

// node_modules/uc.micro/categories/Z/regex.js
var require_regex5 = __commonJS({
  "node_modules/uc.micro/categories/Z/regex.js"(exports, module) {
    module.exports = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
  }
});

// node_modules/uc.micro/index.js
var require_uc = __commonJS({
  "node_modules/uc.micro/index.js"(exports) {
    "use strict";
    exports.Any = require_regex2();
    exports.Cc = require_regex3();
    exports.Cf = require_regex4();
    exports.P = require_regex();
    exports.Z = require_regex5();
  }
});

// node_modules/markdown-it/lib/common/utils.js
var require_utils = __commonJS({
  "node_modules/markdown-it/lib/common/utils.js"(exports) {
    "use strict";
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isString(obj) {
      return _class(obj) === "[object String]";
    }
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function has(object, key) {
      return _hasOwnProperty.call(object, key);
    }
    function assign(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function(source) {
        if (!source) {
          return;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be object");
        }
        Object.keys(source).forEach(function(key) {
          obj[key] = source[key];
        });
      });
      return obj;
    }
    function arrayReplaceAt(src, pos, newElements) {
      return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
    }
    function isValidEntityCode(c2) {
      if (c2 >= 55296 && c2 <= 57343) {
        return false;
      }
      if (c2 >= 64976 && c2 <= 65007) {
        return false;
      }
      if ((c2 & 65535) === 65535 || (c2 & 65535) === 65534) {
        return false;
      }
      if (c2 >= 0 && c2 <= 8) {
        return false;
      }
      if (c2 === 11) {
        return false;
      }
      if (c2 >= 14 && c2 <= 31) {
        return false;
      }
      if (c2 >= 127 && c2 <= 159) {
        return false;
      }
      if (c2 > 1114111) {
        return false;
      }
      return true;
    }
    function fromCodePoint2(c2) {
      if (c2 > 65535) {
        c2 -= 65536;
        var surrogate1 = 55296 + (c2 >> 10), surrogate2 = 56320 + (c2 & 1023);
        return String.fromCharCode(surrogate1, surrogate2);
      }
      return String.fromCharCode(c2);
    }
    var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
    var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
    var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + "|" + ENTITY_RE.source, "gi");
    var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
    var entities = require_entities2();
    function replaceEntityPattern(match, name) {
      var code = 0;
      if (has(entities, name)) {
        return entities[name];
      }
      if (name.charCodeAt(0) === 35 && DIGITAL_ENTITY_TEST_RE.test(name)) {
        code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
        if (isValidEntityCode(code)) {
          return fromCodePoint2(code);
        }
      }
      return match;
    }
    function unescapeMd(str) {
      if (str.indexOf("\\") < 0) {
        return str;
      }
      return str.replace(UNESCAPE_MD_RE, "$1");
    }
    function unescapeAll(str) {
      if (str.indexOf("\\") < 0 && str.indexOf("&") < 0) {
        return str;
      }
      return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity) {
        if (escaped) {
          return escaped;
        }
        return replaceEntityPattern(match, entity);
      });
    }
    var HTML_ESCAPE_TEST_RE = /[&<>"]/;
    var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
    var HTML_REPLACEMENTS = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    function replaceUnsafeChar(ch) {
      return HTML_REPLACEMENTS[ch];
    }
    function escapeHtml(str) {
      if (HTML_ESCAPE_TEST_RE.test(str)) {
        return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
      }
      return str;
    }
    var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
    function escapeRE(str) {
      return str.replace(REGEXP_ESCAPE_RE, "\\$&");
    }
    function isSpace(code) {
      switch (code) {
        case 9:
        case 32:
          return true;
      }
      return false;
    }
    function isWhiteSpace(code) {
      if (code >= 8192 && code <= 8202) {
        return true;
      }
      switch (code) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 32:
        case 160:
        case 5760:
        case 8239:
        case 8287:
        case 12288:
          return true;
      }
      return false;
    }
    var UNICODE_PUNCT_RE = require_regex();
    function isPunctChar(ch) {
      return UNICODE_PUNCT_RE.test(ch);
    }
    function isMdAsciiPunct(ch) {
      switch (ch) {
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 124:
        case 125:
        case 126:
          return true;
        default:
          return false;
      }
    }
    function normalizeReference(str) {
      str = str.trim().replace(/\s+/g, " ");
      if ("ẞ".toLowerCase() === "Ṿ") {
        str = str.replace(/ẞ/g, "ß");
      }
      return str.toLowerCase().toUpperCase();
    }
    exports.lib = {};
    exports.lib.mdurl = require_mdurl();
    exports.lib.ucmicro = require_uc();
    exports.assign = assign;
    exports.isString = isString;
    exports.has = has;
    exports.unescapeMd = unescapeMd;
    exports.unescapeAll = unescapeAll;
    exports.isValidEntityCode = isValidEntityCode;
    exports.fromCodePoint = fromCodePoint2;
    exports.escapeHtml = escapeHtml;
    exports.arrayReplaceAt = arrayReplaceAt;
    exports.isSpace = isSpace;
    exports.isWhiteSpace = isWhiteSpace;
    exports.isMdAsciiPunct = isMdAsciiPunct;
    exports.isPunctChar = isPunctChar;
    exports.escapeRE = escapeRE;
    exports.normalizeReference = normalizeReference;
  }
});

// node_modules/markdown-it/lib/helpers/parse_link_label.js
var require_parse_link_label = __commonJS({
  "node_modules/markdown-it/lib/helpers/parse_link_label.js"(exports, module) {
    "use strict";
    module.exports = function parseLinkLabel(state, start, disableNested) {
      var level, found, marker, prevPos, labelEnd = -1, max = state.posMax, oldPos = state.pos;
      state.pos = start + 1;
      level = 1;
      while (state.pos < max) {
        marker = state.src.charCodeAt(state.pos);
        if (marker === 93) {
          level--;
          if (level === 0) {
            found = true;
            break;
          }
        }
        prevPos = state.pos;
        state.md.inline.skipToken(state);
        if (marker === 91) {
          if (prevPos === state.pos - 1) {
            level++;
          } else if (disableNested) {
            state.pos = oldPos;
            return -1;
          }
        }
      }
      if (found) {
        labelEnd = state.pos;
      }
      state.pos = oldPos;
      return labelEnd;
    };
  }
});

// node_modules/markdown-it/lib/helpers/parse_link_destination.js
var require_parse_link_destination = __commonJS({
  "node_modules/markdown-it/lib/helpers/parse_link_destination.js"(exports, module) {
    "use strict";
    var unescapeAll = require_utils().unescapeAll;
    module.exports = function parseLinkDestination(str, pos, max) {
      var code, level, lines = 0, start = pos, result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ""
      };
      if (str.charCodeAt(pos) === 60) {
        pos++;
        while (pos < max) {
          code = str.charCodeAt(pos);
          if (code === 10) {
            return result;
          }
          if (code === 60) {
            return result;
          }
          if (code === 62) {
            result.pos = pos + 1;
            result.str = unescapeAll(str.slice(start + 1, pos));
            result.ok = true;
            return result;
          }
          if (code === 92 && pos + 1 < max) {
            pos += 2;
            continue;
          }
          pos++;
        }
        return result;
      }
      level = 0;
      while (pos < max) {
        code = str.charCodeAt(pos);
        if (code === 32) {
          break;
        }
        if (code < 32 || code === 127) {
          break;
        }
        if (code === 92 && pos + 1 < max) {
          if (str.charCodeAt(pos + 1) === 32) {
            break;
          }
          pos += 2;
          continue;
        }
        if (code === 40) {
          level++;
          if (level > 32) {
            return result;
          }
        }
        if (code === 41) {
          if (level === 0) {
            break;
          }
          level--;
        }
        pos++;
      }
      if (start === pos) {
        return result;
      }
      if (level !== 0) {
        return result;
      }
      result.str = unescapeAll(str.slice(start, pos));
      result.lines = lines;
      result.pos = pos;
      result.ok = true;
      return result;
    };
  }
});

// node_modules/markdown-it/lib/helpers/parse_link_title.js
var require_parse_link_title = __commonJS({
  "node_modules/markdown-it/lib/helpers/parse_link_title.js"(exports, module) {
    "use strict";
    var unescapeAll = require_utils().unescapeAll;
    module.exports = function parseLinkTitle(str, pos, max) {
      var code, marker, lines = 0, start = pos, result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ""
      };
      if (pos >= max) {
        return result;
      }
      marker = str.charCodeAt(pos);
      if (marker !== 34 && marker !== 39 && marker !== 40) {
        return result;
      }
      pos++;
      if (marker === 40) {
        marker = 41;
      }
      while (pos < max) {
        code = str.charCodeAt(pos);
        if (code === marker) {
          result.pos = pos + 1;
          result.lines = lines;
          result.str = unescapeAll(str.slice(start + 1, pos));
          result.ok = true;
          return result;
        } else if (code === 40 && marker === 41) {
          return result;
        } else if (code === 10) {
          lines++;
        } else if (code === 92 && pos + 1 < max) {
          pos++;
          if (str.charCodeAt(pos) === 10) {
            lines++;
          }
        }
        pos++;
      }
      return result;
    };
  }
});

// node_modules/markdown-it/lib/helpers/index.js
var require_helpers = __commonJS({
  "node_modules/markdown-it/lib/helpers/index.js"(exports) {
    "use strict";
    exports.parseLinkLabel = require_parse_link_label();
    exports.parseLinkDestination = require_parse_link_destination();
    exports.parseLinkTitle = require_parse_link_title();
  }
});

// node_modules/markdown-it/lib/renderer.js
var require_renderer = __commonJS({
  "node_modules/markdown-it/lib/renderer.js"(exports, module) {
    "use strict";
    var assign = require_utils().assign;
    var unescapeAll = require_utils().unescapeAll;
    var escapeHtml = require_utils().escapeHtml;
    var default_rules = {};
    default_rules.code_inline = function(tokens, idx, options, env, slf) {
      var token = tokens[idx];
      return "<code" + slf.renderAttrs(token) + ">" + escapeHtml(tokens[idx].content) + "</code>";
    };
    default_rules.code_block = function(tokens, idx, options, env, slf) {
      var token = tokens[idx];
      return "<pre" + slf.renderAttrs(token) + "><code>" + escapeHtml(tokens[idx].content) + "</code></pre>\n";
    };
    default_rules.fence = function(tokens, idx, options, env, slf) {
      var token = tokens[idx], info = token.info ? unescapeAll(token.info).trim() : "", langName = "", langAttrs = "", highlighted, i4, arr, tmpAttrs, tmpToken;
      if (info) {
        arr = info.split(/(\s+)/g);
        langName = arr[0];
        langAttrs = arr.slice(2).join("");
      }
      if (options.highlight) {
        highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
      } else {
        highlighted = escapeHtml(token.content);
      }
      if (highlighted.indexOf("<pre") === 0) {
        return highlighted + "\n";
      }
      if (info) {
        i4 = token.attrIndex("class");
        tmpAttrs = token.attrs ? token.attrs.slice() : [];
        if (i4 < 0) {
          tmpAttrs.push(["class", options.langPrefix + langName]);
        } else {
          tmpAttrs[i4] = tmpAttrs[i4].slice();
          tmpAttrs[i4][1] += " " + options.langPrefix + langName;
        }
        tmpToken = {
          attrs: tmpAttrs
        };
        return "<pre><code" + slf.renderAttrs(tmpToken) + ">" + highlighted + "</code></pre>\n";
      }
      return "<pre><code" + slf.renderAttrs(token) + ">" + highlighted + "</code></pre>\n";
    };
    default_rules.image = function(tokens, idx, options, env, slf) {
      var token = tokens[idx];
      token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(token.children, options, env);
      return slf.renderToken(tokens, idx, options);
    };
    default_rules.hardbreak = function(tokens, idx, options) {
      return options.xhtmlOut ? "<br />\n" : "<br>\n";
    };
    default_rules.softbreak = function(tokens, idx, options) {
      return options.breaks ? options.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
    };
    default_rules.text = function(tokens, idx) {
      return escapeHtml(tokens[idx].content);
    };
    default_rules.html_block = function(tokens, idx) {
      return tokens[idx].content;
    };
    default_rules.html_inline = function(tokens, idx) {
      return tokens[idx].content;
    };
    function Renderer() {
      this.rules = assign({}, default_rules);
    }
    Renderer.prototype.renderAttrs = function renderAttrs(token) {
      var i4, l2, result;
      if (!token.attrs) {
        return "";
      }
      result = "";
      for (i4 = 0, l2 = token.attrs.length; i4 < l2; i4++) {
        result += " " + escapeHtml(token.attrs[i4][0]) + '="' + escapeHtml(token.attrs[i4][1]) + '"';
      }
      return result;
    };
    Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
      var nextToken, result = "", needLf = false, token = tokens[idx];
      if (token.hidden) {
        return "";
      }
      if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
        result += "\n";
      }
      result += (token.nesting === -1 ? "</" : "<") + token.tag;
      result += this.renderAttrs(token);
      if (token.nesting === 0 && options.xhtmlOut) {
        result += " /";
      }
      if (token.block) {
        needLf = true;
        if (token.nesting === 1) {
          if (idx + 1 < tokens.length) {
            nextToken = tokens[idx + 1];
            if (nextToken.type === "inline" || nextToken.hidden) {
              needLf = false;
            } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
              needLf = false;
            }
          }
        }
      }
      result += needLf ? ">\n" : ">";
      return result;
    };
    Renderer.prototype.renderInline = function(tokens, options, env) {
      var type, result = "", rules = this.rules;
      for (var i4 = 0, len = tokens.length; i4 < len; i4++) {
        type = tokens[i4].type;
        if (typeof rules[type] !== "undefined") {
          result += rules[type](tokens, i4, options, env, this);
        } else {
          result += this.renderToken(tokens, i4, options);
        }
      }
      return result;
    };
    Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
      var result = "";
      for (var i4 = 0, len = tokens.length; i4 < len; i4++) {
        if (tokens[i4].type === "text") {
          result += tokens[i4].content;
        } else if (tokens[i4].type === "image") {
          result += this.renderInlineAsText(tokens[i4].children, options, env);
        } else if (tokens[i4].type === "softbreak") {
          result += "\n";
        }
      }
      return result;
    };
    Renderer.prototype.render = function(tokens, options, env) {
      var i4, len, type, result = "", rules = this.rules;
      for (i4 = 0, len = tokens.length; i4 < len; i4++) {
        type = tokens[i4].type;
        if (type === "inline") {
          result += this.renderInline(tokens[i4].children, options, env);
        } else if (typeof rules[type] !== "undefined") {
          result += rules[tokens[i4].type](tokens, i4, options, env, this);
        } else {
          result += this.renderToken(tokens, i4, options, env);
        }
      }
      return result;
    };
    module.exports = Renderer;
  }
});

// node_modules/markdown-it/lib/ruler.js
var require_ruler = __commonJS({
  "node_modules/markdown-it/lib/ruler.js"(exports, module) {
    "use strict";
    function Ruler() {
      this.__rules__ = [];
      this.__cache__ = null;
    }
    Ruler.prototype.__find__ = function(name) {
      for (var i4 = 0; i4 < this.__rules__.length; i4++) {
        if (this.__rules__[i4].name === name) {
          return i4;
        }
      }
      return -1;
    };
    Ruler.prototype.__compile__ = function() {
      var self = this;
      var chains = [""];
      self.__rules__.forEach(function(rule) {
        if (!rule.enabled) {
          return;
        }
        rule.alt.forEach(function(altName) {
          if (chains.indexOf(altName) < 0) {
            chains.push(altName);
          }
        });
      });
      self.__cache__ = {};
      chains.forEach(function(chain) {
        self.__cache__[chain] = [];
        self.__rules__.forEach(function(rule) {
          if (!rule.enabled) {
            return;
          }
          if (chain && rule.alt.indexOf(chain) < 0) {
            return;
          }
          self.__cache__[chain].push(rule.fn);
        });
      });
    };
    Ruler.prototype.at = function(name, fn, options) {
      var index = this.__find__(name);
      var opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + name);
      }
      this.__rules__[index].fn = fn;
      this.__rules__[index].alt = opt.alt || [];
      this.__cache__ = null;
    };
    Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
      var index = this.__find__(beforeName);
      var opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + beforeName);
      }
      this.__rules__.splice(index, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.after = function(afterName, ruleName, fn, options) {
      var index = this.__find__(afterName);
      var opt = options || {};
      if (index === -1) {
        throw new Error("Parser rule not found: " + afterName);
      }
      this.__rules__.splice(index + 1, 0, {
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.push = function(ruleName, fn, options) {
      var opt = options || {};
      this.__rules__.push({
        name: ruleName,
        enabled: true,
        fn,
        alt: opt.alt || []
      });
      this.__cache__ = null;
    };
    Ruler.prototype.enable = function(list, ignoreInvalid) {
      if (!Array.isArray(list)) {
        list = [list];
      }
      var result = [];
      list.forEach(function(name) {
        var idx = this.__find__(name);
        if (idx < 0) {
          if (ignoreInvalid) {
            return;
          }
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = true;
        result.push(name);
      }, this);
      this.__cache__ = null;
      return result;
    };
    Ruler.prototype.enableOnly = function(list, ignoreInvalid) {
      if (!Array.isArray(list)) {
        list = [list];
      }
      this.__rules__.forEach(function(rule) {
        rule.enabled = false;
      });
      this.enable(list, ignoreInvalid);
    };
    Ruler.prototype.disable = function(list, ignoreInvalid) {
      if (!Array.isArray(list)) {
        list = [list];
      }
      var result = [];
      list.forEach(function(name) {
        var idx = this.__find__(name);
        if (idx < 0) {
          if (ignoreInvalid) {
            return;
          }
          throw new Error("Rules manager: invalid rule name " + name);
        }
        this.__rules__[idx].enabled = false;
        result.push(name);
      }, this);
      this.__cache__ = null;
      return result;
    };
    Ruler.prototype.getRules = function(chainName) {
      if (this.__cache__ === null) {
        this.__compile__();
      }
      return this.__cache__[chainName] || [];
    };
    module.exports = Ruler;
  }
});

// node_modules/markdown-it/lib/rules_core/normalize.js
var require_normalize = __commonJS({
  "node_modules/markdown-it/lib/rules_core/normalize.js"(exports, module) {
    "use strict";
    var NEWLINES_RE = /\r\n?|\n/g;
    var NULL_RE = /\0/g;
    module.exports = function normalize(state) {
      var str;
      str = state.src.replace(NEWLINES_RE, "\n");
      str = str.replace(NULL_RE, "�");
      state.src = str;
    };
  }
});

// node_modules/markdown-it/lib/rules_core/block.js
var require_block = __commonJS({
  "node_modules/markdown-it/lib/rules_core/block.js"(exports, module) {
    "use strict";
    module.exports = function block(state) {
      var token;
      if (state.inlineMode) {
        token = new state.Token("inline", "", 0);
        token.content = state.src;
        token.map = [0, 1];
        token.children = [];
        state.tokens.push(token);
      } else {
        state.md.block.parse(state.src, state.md, state.env, state.tokens);
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_core/inline.js
var require_inline = __commonJS({
  "node_modules/markdown-it/lib/rules_core/inline.js"(exports, module) {
    "use strict";
    module.exports = function inline(state) {
      var tokens = state.tokens, tok, i4, l2;
      for (i4 = 0, l2 = tokens.length; i4 < l2; i4++) {
        tok = tokens[i4];
        if (tok.type === "inline") {
          state.md.inline.parse(tok.content, state.md, state.env, tok.children);
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_core/linkify.js
var require_linkify = __commonJS({
  "node_modules/markdown-it/lib/rules_core/linkify.js"(exports, module) {
    "use strict";
    var arrayReplaceAt = require_utils().arrayReplaceAt;
    function isLinkOpen(str) {
      return /^<a[>\s]/i.test(str);
    }
    function isLinkClose(str) {
      return /^<\/a\s*>/i.test(str);
    }
    module.exports = function linkify(state) {
      var i4, j2, l2, tokens, token, currentToken, nodes, ln, text, pos, lastPos, level, htmlLinkLevel, url, fullUrl, urlText, blockTokens = state.tokens, links;
      if (!state.md.options.linkify) {
        return;
      }
      for (j2 = 0, l2 = blockTokens.length; j2 < l2; j2++) {
        if (blockTokens[j2].type !== "inline" || !state.md.linkify.pretest(blockTokens[j2].content)) {
          continue;
        }
        tokens = blockTokens[j2].children;
        htmlLinkLevel = 0;
        for (i4 = tokens.length - 1; i4 >= 0; i4--) {
          currentToken = tokens[i4];
          if (currentToken.type === "link_close") {
            i4--;
            while (tokens[i4].level !== currentToken.level && tokens[i4].type !== "link_open") {
              i4--;
            }
            continue;
          }
          if (currentToken.type === "html_inline") {
            if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
              htmlLinkLevel--;
            }
            if (isLinkClose(currentToken.content)) {
              htmlLinkLevel++;
            }
          }
          if (htmlLinkLevel > 0) {
            continue;
          }
          if (currentToken.type === "text" && state.md.linkify.test(currentToken.content)) {
            text = currentToken.content;
            links = state.md.linkify.match(text);
            nodes = [];
            level = currentToken.level;
            lastPos = 0;
            if (links.length > 0 && links[0].index === 0 && i4 > 0 && tokens[i4 - 1].type === "text_special") {
              links = links.slice(1);
            }
            for (ln = 0; ln < links.length; ln++) {
              url = links[ln].url;
              fullUrl = state.md.normalizeLink(url);
              if (!state.md.validateLink(fullUrl)) {
                continue;
              }
              urlText = links[ln].text;
              if (!links[ln].schema) {
                urlText = state.md.normalizeLinkText("http://" + urlText).replace(/^http:\/\//, "");
              } else if (links[ln].schema === "mailto:" && !/^mailto:/i.test(urlText)) {
                urlText = state.md.normalizeLinkText("mailto:" + urlText).replace(/^mailto:/, "");
              } else {
                urlText = state.md.normalizeLinkText(urlText);
              }
              pos = links[ln].index;
              if (pos > lastPos) {
                token = new state.Token("text", "", 0);
                token.content = text.slice(lastPos, pos);
                token.level = level;
                nodes.push(token);
              }
              token = new state.Token("link_open", "a", 1);
              token.attrs = [["href", fullUrl]];
              token.level = level++;
              token.markup = "linkify";
              token.info = "auto";
              nodes.push(token);
              token = new state.Token("text", "", 0);
              token.content = urlText;
              token.level = level;
              nodes.push(token);
              token = new state.Token("link_close", "a", -1);
              token.level = --level;
              token.markup = "linkify";
              token.info = "auto";
              nodes.push(token);
              lastPos = links[ln].lastIndex;
            }
            if (lastPos < text.length) {
              token = new state.Token("text", "", 0);
              token.content = text.slice(lastPos);
              token.level = level;
              nodes.push(token);
            }
            blockTokens[j2].children = tokens = arrayReplaceAt(tokens, i4, nodes);
          }
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_core/replacements.js
var require_replacements = __commonJS({
  "node_modules/markdown-it/lib/rules_core/replacements.js"(exports, module) {
    "use strict";
    var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
    var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
    var SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
    var SCOPED_ABBR = {
      c: "©",
      r: "®",
      tm: "™"
    };
    function replaceFn(match, name) {
      return SCOPED_ABBR[name.toLowerCase()];
    }
    function replace_scoped(inlineTokens) {
      var i4, token, inside_autolink = 0;
      for (i4 = inlineTokens.length - 1; i4 >= 0; i4--) {
        token = inlineTokens[i4];
        if (token.type === "text" && !inside_autolink) {
          token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
        }
        if (token.type === "link_open" && token.info === "auto") {
          inside_autolink--;
        }
        if (token.type === "link_close" && token.info === "auto") {
          inside_autolink++;
        }
      }
    }
    function replace_rare(inlineTokens) {
      var i4, token, inside_autolink = 0;
      for (i4 = inlineTokens.length - 1; i4 >= 0; i4--) {
        token = inlineTokens[i4];
        if (token.type === "text" && !inside_autolink) {
          if (RARE_RE.test(token.content)) {
            token.content = token.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–");
          }
        }
        if (token.type === "link_open" && token.info === "auto") {
          inside_autolink--;
        }
        if (token.type === "link_close" && token.info === "auto") {
          inside_autolink++;
        }
      }
    }
    module.exports = function replace(state) {
      var blkIdx;
      if (!state.md.options.typographer) {
        return;
      }
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline") {
          continue;
        }
        if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
          replace_scoped(state.tokens[blkIdx].children);
        }
        if (RARE_RE.test(state.tokens[blkIdx].content)) {
          replace_rare(state.tokens[blkIdx].children);
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_core/smartquotes.js
var require_smartquotes = __commonJS({
  "node_modules/markdown-it/lib/rules_core/smartquotes.js"(exports, module) {
    "use strict";
    var isWhiteSpace = require_utils().isWhiteSpace;
    var isPunctChar = require_utils().isPunctChar;
    var isMdAsciiPunct = require_utils().isMdAsciiPunct;
    var QUOTE_TEST_RE = /['"]/;
    var QUOTE_RE = /['"]/g;
    var APOSTROPHE = "’";
    function replaceAt(str, index, ch) {
      return str.slice(0, index) + ch + str.slice(index + 1);
    }
    function process_inlines(tokens, state) {
      var i4, token, text, t2, pos, max, thisLevel, item, lastChar, nextChar, isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace, canOpen, canClose, j2, isSingle, stack, openQuote, closeQuote;
      stack = [];
      for (i4 = 0; i4 < tokens.length; i4++) {
        token = tokens[i4];
        thisLevel = tokens[i4].level;
        for (j2 = stack.length - 1; j2 >= 0; j2--) {
          if (stack[j2].level <= thisLevel) {
            break;
          }
        }
        stack.length = j2 + 1;
        if (token.type !== "text") {
          continue;
        }
        text = token.content;
        pos = 0;
        max = text.length;
        OUTER:
          while (pos < max) {
            QUOTE_RE.lastIndex = pos;
            t2 = QUOTE_RE.exec(text);
            if (!t2) {
              break;
            }
            canOpen = canClose = true;
            pos = t2.index + 1;
            isSingle = t2[0] === "'";
            lastChar = 32;
            if (t2.index - 1 >= 0) {
              lastChar = text.charCodeAt(t2.index - 1);
            } else {
              for (j2 = i4 - 1; j2 >= 0; j2--) {
                if (tokens[j2].type === "softbreak" || tokens[j2].type === "hardbreak")
                  break;
                if (!tokens[j2].content)
                  continue;
                lastChar = tokens[j2].content.charCodeAt(tokens[j2].content.length - 1);
                break;
              }
            }
            nextChar = 32;
            if (pos < max) {
              nextChar = text.charCodeAt(pos);
            } else {
              for (j2 = i4 + 1; j2 < tokens.length; j2++) {
                if (tokens[j2].type === "softbreak" || tokens[j2].type === "hardbreak")
                  break;
                if (!tokens[j2].content)
                  continue;
                nextChar = tokens[j2].content.charCodeAt(0);
                break;
              }
            }
            isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
            isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
            isLastWhiteSpace = isWhiteSpace(lastChar);
            isNextWhiteSpace = isWhiteSpace(nextChar);
            if (isNextWhiteSpace) {
              canOpen = false;
            } else if (isNextPunctChar) {
              if (!(isLastWhiteSpace || isLastPunctChar)) {
                canOpen = false;
              }
            }
            if (isLastWhiteSpace) {
              canClose = false;
            } else if (isLastPunctChar) {
              if (!(isNextWhiteSpace || isNextPunctChar)) {
                canClose = false;
              }
            }
            if (nextChar === 34 && t2[0] === '"') {
              if (lastChar >= 48 && lastChar <= 57) {
                canClose = canOpen = false;
              }
            }
            if (canOpen && canClose) {
              canOpen = isLastPunctChar;
              canClose = isNextPunctChar;
            }
            if (!canOpen && !canClose) {
              if (isSingle) {
                token.content = replaceAt(token.content, t2.index, APOSTROPHE);
              }
              continue;
            }
            if (canClose) {
              for (j2 = stack.length - 1; j2 >= 0; j2--) {
                item = stack[j2];
                if (stack[j2].level < thisLevel) {
                  break;
                }
                if (item.single === isSingle && stack[j2].level === thisLevel) {
                  item = stack[j2];
                  if (isSingle) {
                    openQuote = state.md.options.quotes[2];
                    closeQuote = state.md.options.quotes[3];
                  } else {
                    openQuote = state.md.options.quotes[0];
                    closeQuote = state.md.options.quotes[1];
                  }
                  token.content = replaceAt(token.content, t2.index, closeQuote);
                  tokens[item.token].content = replaceAt(
                    tokens[item.token].content,
                    item.pos,
                    openQuote
                  );
                  pos += closeQuote.length - 1;
                  if (item.token === i4) {
                    pos += openQuote.length - 1;
                  }
                  text = token.content;
                  max = text.length;
                  stack.length = j2;
                  continue OUTER;
                }
              }
            }
            if (canOpen) {
              stack.push({
                token: i4,
                pos: t2.index,
                single: isSingle,
                level: thisLevel
              });
            } else if (canClose && isSingle) {
              token.content = replaceAt(token.content, t2.index, APOSTROPHE);
            }
          }
      }
    }
    module.exports = function smartquotes(state) {
      var blkIdx;
      if (!state.md.options.typographer) {
        return;
      }
      for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
        if (state.tokens[blkIdx].type !== "inline" || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
          continue;
        }
        process_inlines(state.tokens[blkIdx].children, state);
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_core/text_join.js
var require_text_join = __commonJS({
  "node_modules/markdown-it/lib/rules_core/text_join.js"(exports, module) {
    "use strict";
    module.exports = function text_join(state) {
      var j2, l2, tokens, curr, max, last, blockTokens = state.tokens;
      for (j2 = 0, l2 = blockTokens.length; j2 < l2; j2++) {
        if (blockTokens[j2].type !== "inline")
          continue;
        tokens = blockTokens[j2].children;
        max = tokens.length;
        for (curr = 0; curr < max; curr++) {
          if (tokens[curr].type === "text_special") {
            tokens[curr].type = "text";
          }
        }
        for (curr = last = 0; curr < max; curr++) {
          if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
            tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
          } else {
            if (curr !== last) {
              tokens[last] = tokens[curr];
            }
            last++;
          }
        }
        if (curr !== last) {
          tokens.length = last;
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/token.js
var require_token = __commonJS({
  "node_modules/markdown-it/lib/token.js"(exports, module) {
    "use strict";
    function Token(type, tag, nesting) {
      this.type = type;
      this.tag = tag;
      this.attrs = null;
      this.map = null;
      this.nesting = nesting;
      this.level = 0;
      this.children = null;
      this.content = "";
      this.markup = "";
      this.info = "";
      this.meta = null;
      this.block = false;
      this.hidden = false;
    }
    Token.prototype.attrIndex = function attrIndex(name) {
      var attrs, i4, len;
      if (!this.attrs) {
        return -1;
      }
      attrs = this.attrs;
      for (i4 = 0, len = attrs.length; i4 < len; i4++) {
        if (attrs[i4][0] === name) {
          return i4;
        }
      }
      return -1;
    };
    Token.prototype.attrPush = function attrPush(attrData) {
      if (this.attrs) {
        this.attrs.push(attrData);
      } else {
        this.attrs = [attrData];
      }
    };
    Token.prototype.attrSet = function attrSet(name, value) {
      var idx = this.attrIndex(name), attrData = [name, value];
      if (idx < 0) {
        this.attrPush(attrData);
      } else {
        this.attrs[idx] = attrData;
      }
    };
    Token.prototype.attrGet = function attrGet(name) {
      var idx = this.attrIndex(name), value = null;
      if (idx >= 0) {
        value = this.attrs[idx][1];
      }
      return value;
    };
    Token.prototype.attrJoin = function attrJoin(name, value) {
      var idx = this.attrIndex(name);
      if (idx < 0) {
        this.attrPush([name, value]);
      } else {
        this.attrs[idx][1] = this.attrs[idx][1] + " " + value;
      }
    };
    module.exports = Token;
  }
});

// node_modules/markdown-it/lib/rules_core/state_core.js
var require_state_core = __commonJS({
  "node_modules/markdown-it/lib/rules_core/state_core.js"(exports, module) {
    "use strict";
    var Token = require_token();
    function StateCore(src, md, env) {
      this.src = src;
      this.env = env;
      this.tokens = [];
      this.inlineMode = false;
      this.md = md;
    }
    StateCore.prototype.Token = Token;
    module.exports = StateCore;
  }
});

// node_modules/markdown-it/lib/parser_core.js
var require_parser_core = __commonJS({
  "node_modules/markdown-it/lib/parser_core.js"(exports, module) {
    "use strict";
    var Ruler = require_ruler();
    var _rules = [
      ["normalize", require_normalize()],
      ["block", require_block()],
      ["inline", require_inline()],
      ["linkify", require_linkify()],
      ["replacements", require_replacements()],
      ["smartquotes", require_smartquotes()],
      // `text_join` finds `text_special` tokens (for escape sequences)
      // and joins them with the rest of the text
      ["text_join", require_text_join()]
    ];
    function Core() {
      this.ruler = new Ruler();
      for (var i4 = 0; i4 < _rules.length; i4++) {
        this.ruler.push(_rules[i4][0], _rules[i4][1]);
      }
    }
    Core.prototype.process = function(state) {
      var i4, l2, rules;
      rules = this.ruler.getRules("");
      for (i4 = 0, l2 = rules.length; i4 < l2; i4++) {
        rules[i4](state);
      }
    };
    Core.prototype.State = require_state_core();
    module.exports = Core;
  }
});

// node_modules/markdown-it/lib/rules_block/table.js
var require_table = __commonJS({
  "node_modules/markdown-it/lib/rules_block/table.js"(exports, module) {
    "use strict";
    var isSpace = require_utils().isSpace;
    function getLine(state, line) {
      var pos = state.bMarks[line] + state.tShift[line], max = state.eMarks[line];
      return state.src.slice(pos, max);
    }
    function escapedSplit(str) {
      var result = [], pos = 0, max = str.length, ch, isEscaped = false, lastPos = 0, current = "";
      ch = str.charCodeAt(pos);
      while (pos < max) {
        if (ch === 124) {
          if (!isEscaped) {
            result.push(current + str.substring(lastPos, pos));
            current = "";
            lastPos = pos + 1;
          } else {
            current += str.substring(lastPos, pos - 1);
            lastPos = pos;
          }
        }
        isEscaped = ch === 92;
        pos++;
        ch = str.charCodeAt(pos);
      }
      result.push(current + str.substring(lastPos));
      return result;
    }
    module.exports = function table(state, startLine, endLine, silent) {
      var ch, lineText, pos, i4, l2, nextLine, columns, columnCount, token, aligns, t2, tableLines, tbodyLines, oldParentType, terminate, terminatorRules, firstCh, secondCh;
      if (startLine + 2 > endLine) {
        return false;
      }
      nextLine = startLine + 1;
      if (state.sCount[nextLine] < state.blkIndent) {
        return false;
      }
      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        return false;
      }
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      if (pos >= state.eMarks[nextLine]) {
        return false;
      }
      firstCh = state.src.charCodeAt(pos++);
      if (firstCh !== 124 && firstCh !== 45 && firstCh !== 58) {
        return false;
      }
      if (pos >= state.eMarks[nextLine]) {
        return false;
      }
      secondCh = state.src.charCodeAt(pos++);
      if (secondCh !== 124 && secondCh !== 45 && secondCh !== 58 && !isSpace(secondCh)) {
        return false;
      }
      if (firstCh === 45 && isSpace(secondCh)) {
        return false;
      }
      while (pos < state.eMarks[nextLine]) {
        ch = state.src.charCodeAt(pos);
        if (ch !== 124 && ch !== 45 && ch !== 58 && !isSpace(ch)) {
          return false;
        }
        pos++;
      }
      lineText = getLine(state, startLine + 1);
      columns = lineText.split("|");
      aligns = [];
      for (i4 = 0; i4 < columns.length; i4++) {
        t2 = columns[i4].trim();
        if (!t2) {
          if (i4 === 0 || i4 === columns.length - 1) {
            continue;
          } else {
            return false;
          }
        }
        if (!/^:?-+:?$/.test(t2)) {
          return false;
        }
        if (t2.charCodeAt(t2.length - 1) === 58) {
          aligns.push(t2.charCodeAt(0) === 58 ? "center" : "right");
        } else if (t2.charCodeAt(0) === 58) {
          aligns.push("left");
        } else {
          aligns.push("");
        }
      }
      lineText = getLine(state, startLine).trim();
      if (lineText.indexOf("|") === -1) {
        return false;
      }
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      columns = escapedSplit(lineText);
      if (columns.length && columns[0] === "")
        columns.shift();
      if (columns.length && columns[columns.length - 1] === "")
        columns.pop();
      columnCount = columns.length;
      if (columnCount === 0 || columnCount !== aligns.length) {
        return false;
      }
      if (silent) {
        return true;
      }
      oldParentType = state.parentType;
      state.parentType = "table";
      terminatorRules = state.md.block.ruler.getRules("blockquote");
      token = state.push("table_open", "table", 1);
      token.map = tableLines = [startLine, 0];
      token = state.push("thead_open", "thead", 1);
      token.map = [startLine, startLine + 1];
      token = state.push("tr_open", "tr", 1);
      token.map = [startLine, startLine + 1];
      for (i4 = 0; i4 < columns.length; i4++) {
        token = state.push("th_open", "th", 1);
        if (aligns[i4]) {
          token.attrs = [["style", "text-align:" + aligns[i4]]];
        }
        token = state.push("inline", "", 0);
        token.content = columns[i4].trim();
        token.children = [];
        token = state.push("th_close", "th", -1);
      }
      token = state.push("tr_close", "tr", -1);
      token = state.push("thead_close", "thead", -1);
      for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        terminate = false;
        for (i4 = 0, l2 = terminatorRules.length; i4 < l2; i4++) {
          if (terminatorRules[i4](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        lineText = getLine(state, nextLine).trim();
        if (!lineText) {
          break;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          break;
        }
        columns = escapedSplit(lineText);
        if (columns.length && columns[0] === "")
          columns.shift();
        if (columns.length && columns[columns.length - 1] === "")
          columns.pop();
        if (nextLine === startLine + 2) {
          token = state.push("tbody_open", "tbody", 1);
          token.map = tbodyLines = [startLine + 2, 0];
        }
        token = state.push("tr_open", "tr", 1);
        token.map = [nextLine, nextLine + 1];
        for (i4 = 0; i4 < columnCount; i4++) {
          token = state.push("td_open", "td", 1);
          if (aligns[i4]) {
            token.attrs = [["style", "text-align:" + aligns[i4]]];
          }
          token = state.push("inline", "", 0);
          token.content = columns[i4] ? columns[i4].trim() : "";
          token.children = [];
          token = state.push("td_close", "td", -1);
        }
        token = state.push("tr_close", "tr", -1);
      }
      if (tbodyLines) {
        token = state.push("tbody_close", "tbody", -1);
        tbodyLines[1] = nextLine;
      }
      token = state.push("table_close", "table", -1);
      tableLines[1] = nextLine;
      state.parentType = oldParentType;
      state.line = nextLine;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/code.js
var require_code = __commonJS({
  "node_modules/markdown-it/lib/rules_block/code.js"(exports, module) {
    "use strict";
    module.exports = function code(state, startLine, endLine) {
      var nextLine, last, token;
      if (state.sCount[startLine] - state.blkIndent < 4) {
        return false;
      }
      last = nextLine = startLine + 1;
      while (nextLine < endLine) {
        if (state.isEmpty(nextLine)) {
          nextLine++;
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          nextLine++;
          last = nextLine;
          continue;
        }
        break;
      }
      state.line = last;
      token = state.push("code_block", "code", 0);
      token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + "\n";
      token.map = [startLine, state.line];
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/fence.js
var require_fence = __commonJS({
  "node_modules/markdown-it/lib/rules_block/fence.js"(exports, module) {
    "use strict";
    module.exports = function fence(state, startLine, endLine, silent) {
      var marker, len, params, nextLine, mem, token, markup, haveEndMarker = false, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (pos + 3 > max) {
        return false;
      }
      marker = state.src.charCodeAt(pos);
      if (marker !== 126 && marker !== 96) {
        return false;
      }
      mem = pos;
      pos = state.skipChars(pos, marker);
      len = pos - mem;
      if (len < 3) {
        return false;
      }
      markup = state.src.slice(mem, pos);
      params = state.src.slice(pos, max);
      if (marker === 96) {
        if (params.indexOf(String.fromCharCode(marker)) >= 0) {
          return false;
        }
      }
      if (silent) {
        return true;
      }
      nextLine = startLine;
      for (; ; ) {
        nextLine++;
        if (nextLine >= endLine) {
          break;
        }
        pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos < max && state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (state.src.charCodeAt(pos) !== marker) {
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          continue;
        }
        pos = state.skipChars(pos, marker);
        if (pos - mem < len) {
          continue;
        }
        pos = state.skipSpaces(pos);
        if (pos < max) {
          continue;
        }
        haveEndMarker = true;
        break;
      }
      len = state.sCount[startLine];
      state.line = nextLine + (haveEndMarker ? 1 : 0);
      token = state.push("fence", "code", 0);
      token.info = params;
      token.content = state.getLines(startLine + 1, nextLine, len, true);
      token.markup = markup;
      token.map = [startLine, state.line];
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/blockquote.js
var require_blockquote = __commonJS({
  "node_modules/markdown-it/lib/rules_block/blockquote.js"(exports, module) {
    "use strict";
    var isSpace = require_utils().isSpace;
    module.exports = function blockquote(state, startLine, endLine, silent) {
      var adjustTab, ch, i4, initial, l2, lastLineEmpty, lines, nextLine, offset, oldBMarks, oldBSCount, oldIndent, oldParentType, oldSCount, oldTShift, spaceAfterMarker, terminate, terminatorRules, token, isOutdented, oldLineMax = state.lineMax, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.src.charCodeAt(pos++) !== 62) {
        return false;
      }
      if (silent) {
        return true;
      }
      initial = offset = state.sCount[startLine] + 1;
      if (state.src.charCodeAt(pos) === 32) {
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 9) {
        spaceAfterMarker = true;
        if ((state.bsCount[startLine] + offset) % 4 === 3) {
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }
      oldBMarks = [state.bMarks[startLine]];
      state.bMarks[startLine] = pos;
      while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (isSpace(ch)) {
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }
        pos++;
      }
      oldBSCount = [state.bsCount[startLine]];
      state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);
      lastLineEmpty = pos >= max;
      oldSCount = [state.sCount[startLine]];
      state.sCount[startLine] = offset - initial;
      oldTShift = [state.tShift[startLine]];
      state.tShift[startLine] = pos - state.bMarks[startLine];
      terminatorRules = state.md.block.ruler.getRules("blockquote");
      oldParentType = state.parentType;
      state.parentType = "blockquote";
      for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
        isOutdented = state.sCount[nextLine] < state.blkIndent;
        pos = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (pos >= max) {
          break;
        }
        if (state.src.charCodeAt(pos++) === 62 && !isOutdented) {
          initial = offset = state.sCount[nextLine] + 1;
          if (state.src.charCodeAt(pos) === 32) {
            pos++;
            initial++;
            offset++;
            adjustTab = false;
            spaceAfterMarker = true;
          } else if (state.src.charCodeAt(pos) === 9) {
            spaceAfterMarker = true;
            if ((state.bsCount[nextLine] + offset) % 4 === 3) {
              pos++;
              initial++;
              offset++;
              adjustTab = false;
            } else {
              adjustTab = true;
            }
          } else {
            spaceAfterMarker = false;
          }
          oldBMarks.push(state.bMarks[nextLine]);
          state.bMarks[nextLine] = pos;
          while (pos < max) {
            ch = state.src.charCodeAt(pos);
            if (isSpace(ch)) {
              if (ch === 9) {
                offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
              } else {
                offset++;
              }
            } else {
              break;
            }
            pos++;
          }
          lastLineEmpty = pos >= max;
          oldBSCount.push(state.bsCount[nextLine]);
          state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] = offset - initial;
          oldTShift.push(state.tShift[nextLine]);
          state.tShift[nextLine] = pos - state.bMarks[nextLine];
          continue;
        }
        if (lastLineEmpty) {
          break;
        }
        terminate = false;
        for (i4 = 0, l2 = terminatorRules.length; i4 < l2; i4++) {
          if (terminatorRules[i4](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          state.lineMax = nextLine;
          if (state.blkIndent !== 0) {
            oldBMarks.push(state.bMarks[nextLine]);
            oldBSCount.push(state.bsCount[nextLine]);
            oldTShift.push(state.tShift[nextLine]);
            oldSCount.push(state.sCount[nextLine]);
            state.sCount[nextLine] -= state.blkIndent;
          }
          break;
        }
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = -1;
      }
      oldIndent = state.blkIndent;
      state.blkIndent = 0;
      token = state.push("blockquote_open", "blockquote", 1);
      token.markup = ">";
      token.map = lines = [startLine, 0];
      state.md.block.tokenize(state, startLine, nextLine);
      token = state.push("blockquote_close", "blockquote", -1);
      token.markup = ">";
      state.lineMax = oldLineMax;
      state.parentType = oldParentType;
      lines[1] = state.line;
      for (i4 = 0; i4 < oldTShift.length; i4++) {
        state.bMarks[i4 + startLine] = oldBMarks[i4];
        state.tShift[i4 + startLine] = oldTShift[i4];
        state.sCount[i4 + startLine] = oldSCount[i4];
        state.bsCount[i4 + startLine] = oldBSCount[i4];
      }
      state.blkIndent = oldIndent;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/hr.js
var require_hr = __commonJS({
  "node_modules/markdown-it/lib/rules_block/hr.js"(exports, module) {
    "use strict";
    var isSpace = require_utils().isSpace;
    module.exports = function hr(state, startLine, endLine, silent) {
      var marker, cnt, ch, token, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      marker = state.src.charCodeAt(pos++);
      if (marker !== 42 && marker !== 45 && marker !== 95) {
        return false;
      }
      cnt = 1;
      while (pos < max) {
        ch = state.src.charCodeAt(pos++);
        if (ch !== marker && !isSpace(ch)) {
          return false;
        }
        if (ch === marker) {
          cnt++;
        }
      }
      if (cnt < 3) {
        return false;
      }
      if (silent) {
        return true;
      }
      state.line = startLine + 1;
      token = state.push("hr", "hr", 0);
      token.map = [startLine, state.line];
      token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/list.js
var require_list = __commonJS({
  "node_modules/markdown-it/lib/rules_block/list.js"(exports, module) {
    "use strict";
    var isSpace = require_utils().isSpace;
    function skipBulletListMarker(state, startLine) {
      var marker, pos, max, ch;
      pos = state.bMarks[startLine] + state.tShift[startLine];
      max = state.eMarks[startLine];
      marker = state.src.charCodeAt(pos++);
      if (marker !== 42 && marker !== 45 && marker !== 43) {
        return -1;
      }
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          return -1;
        }
      }
      return pos;
    }
    function skipOrderedListMarker(state, startLine) {
      var ch, start = state.bMarks[startLine] + state.tShift[startLine], pos = start, max = state.eMarks[startLine];
      if (pos + 1 >= max) {
        return -1;
      }
      ch = state.src.charCodeAt(pos++);
      if (ch < 48 || ch > 57) {
        return -1;
      }
      for (; ; ) {
        if (pos >= max) {
          return -1;
        }
        ch = state.src.charCodeAt(pos++);
        if (ch >= 48 && ch <= 57) {
          if (pos - start >= 10) {
            return -1;
          }
          continue;
        }
        if (ch === 41 || ch === 46) {
          break;
        }
        return -1;
      }
      if (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          return -1;
        }
      }
      return pos;
    }
    function markTightParagraphs(state, idx) {
      var i4, l2, level = state.level + 2;
      for (i4 = idx + 2, l2 = state.tokens.length - 2; i4 < l2; i4++) {
        if (state.tokens[i4].level === level && state.tokens[i4].type === "paragraph_open") {
          state.tokens[i4 + 2].hidden = true;
          state.tokens[i4].hidden = true;
          i4 += 2;
        }
      }
    }
    module.exports = function list(state, startLine, endLine, silent) {
      var ch, contentStart, i4, indent, indentAfterMarker, initial, isOrdered, itemLines, l2, listLines, listTokIdx, markerCharCode, markerValue, max, nextLine, offset, oldListIndent, oldParentType, oldSCount, oldTShift, oldTight, pos, posAfterMarker, prevEmptyEnd, start, terminate, terminatorRules, token, isTerminatingParagraph = false, tight = true;
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.listIndent >= 0 && state.sCount[startLine] - state.listIndent >= 4 && state.sCount[startLine] < state.blkIndent) {
        return false;
      }
      if (silent && state.parentType === "paragraph") {
        if (state.sCount[startLine] >= state.blkIndent) {
          isTerminatingParagraph = true;
        }
      }
      if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
        isOrdered = true;
        start = state.bMarks[startLine] + state.tShift[startLine];
        markerValue = Number(state.src.slice(start, posAfterMarker - 1));
        if (isTerminatingParagraph && markerValue !== 1)
          return false;
      } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
        isOrdered = false;
      } else {
        return false;
      }
      if (isTerminatingParagraph) {
        if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine])
          return false;
      }
      markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
      if (silent) {
        return true;
      }
      listTokIdx = state.tokens.length;
      if (isOrdered) {
        token = state.push("ordered_list_open", "ol", 1);
        if (markerValue !== 1) {
          token.attrs = [["start", markerValue]];
        }
      } else {
        token = state.push("bullet_list_open", "ul", 1);
      }
      token.map = listLines = [startLine, 0];
      token.markup = String.fromCharCode(markerCharCode);
      nextLine = startLine;
      prevEmptyEnd = false;
      terminatorRules = state.md.block.ruler.getRules("list");
      oldParentType = state.parentType;
      state.parentType = "list";
      while (nextLine < endLine) {
        pos = posAfterMarker;
        max = state.eMarks[nextLine];
        initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);
        while (pos < max) {
          ch = state.src.charCodeAt(pos);
          if (ch === 9) {
            offset += 4 - (offset + state.bsCount[nextLine]) % 4;
          } else if (ch === 32) {
            offset++;
          } else {
            break;
          }
          pos++;
        }
        contentStart = pos;
        if (contentStart >= max) {
          indentAfterMarker = 1;
        } else {
          indentAfterMarker = offset - initial;
        }
        if (indentAfterMarker > 4) {
          indentAfterMarker = 1;
        }
        indent = initial + indentAfterMarker;
        token = state.push("list_item_open", "li", 1);
        token.markup = String.fromCharCode(markerCharCode);
        token.map = itemLines = [startLine, 0];
        if (isOrdered) {
          token.info = state.src.slice(start, posAfterMarker - 1);
        }
        oldTight = state.tight;
        oldTShift = state.tShift[startLine];
        oldSCount = state.sCount[startLine];
        oldListIndent = state.listIndent;
        state.listIndent = state.blkIndent;
        state.blkIndent = indent;
        state.tight = true;
        state.tShift[startLine] = contentStart - state.bMarks[startLine];
        state.sCount[startLine] = offset;
        if (contentStart >= max && state.isEmpty(startLine + 1)) {
          state.line = Math.min(state.line + 2, endLine);
        } else {
          state.md.block.tokenize(state, startLine, endLine, true);
        }
        if (!state.tight || prevEmptyEnd) {
          tight = false;
        }
        prevEmptyEnd = state.line - startLine > 1 && state.isEmpty(state.line - 1);
        state.blkIndent = state.listIndent;
        state.listIndent = oldListIndent;
        state.tShift[startLine] = oldTShift;
        state.sCount[startLine] = oldSCount;
        state.tight = oldTight;
        token = state.push("list_item_close", "li", -1);
        token.markup = String.fromCharCode(markerCharCode);
        nextLine = startLine = state.line;
        itemLines[1] = nextLine;
        contentStart = state.bMarks[startLine];
        if (nextLine >= endLine) {
          break;
        }
        if (state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (state.sCount[startLine] - state.blkIndent >= 4) {
          break;
        }
        terminate = false;
        for (i4 = 0, l2 = terminatorRules.length; i4 < l2; i4++) {
          if (terminatorRules[i4](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
        if (isOrdered) {
          posAfterMarker = skipOrderedListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
          start = state.bMarks[nextLine] + state.tShift[nextLine];
        } else {
          posAfterMarker = skipBulletListMarker(state, nextLine);
          if (posAfterMarker < 0) {
            break;
          }
        }
        if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
          break;
        }
      }
      if (isOrdered) {
        token = state.push("ordered_list_close", "ol", -1);
      } else {
        token = state.push("bullet_list_close", "ul", -1);
      }
      token.markup = String.fromCharCode(markerCharCode);
      listLines[1] = nextLine;
      state.line = nextLine;
      state.parentType = oldParentType;
      if (tight) {
        markTightParagraphs(state, listTokIdx);
      }
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/reference.js
var require_reference = __commonJS({
  "node_modules/markdown-it/lib/rules_block/reference.js"(exports, module) {
    "use strict";
    var normalizeReference = require_utils().normalizeReference;
    var isSpace = require_utils().isSpace;
    module.exports = function reference(state, startLine, _endLine, silent) {
      var ch, destEndPos, destEndLineNo, endLine, href, i4, l2, label, labelEnd, oldParentType, res, start, str, terminate, terminatorRules, title, lines = 0, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine], nextLine = startLine + 1;
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 91) {
        return false;
      }
      while (++pos < max) {
        if (state.src.charCodeAt(pos) === 93 && state.src.charCodeAt(pos - 1) !== 92) {
          if (pos + 1 === max) {
            return false;
          }
          if (state.src.charCodeAt(pos + 1) !== 58) {
            return false;
          }
          break;
        }
      }
      endLine = state.lineMax;
      terminatorRules = state.md.block.ruler.getRules("reference");
      oldParentType = state.parentType;
      state.parentType = "reference";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i4 = 0, l2 = terminatorRules.length; i4 < l2; i4++) {
          if (terminatorRules[i4](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      max = str.length;
      for (pos = 1; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 91) {
          return false;
        } else if (ch === 93) {
          labelEnd = pos;
          break;
        } else if (ch === 10) {
          lines++;
        } else if (ch === 92) {
          pos++;
          if (pos < max && str.charCodeAt(pos) === 10) {
            lines++;
          }
        }
      }
      if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 58) {
        return false;
      }
      for (pos = labelEnd + 2; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 10) {
          lines++;
        } else if (isSpace(ch)) {
        } else {
          break;
        }
      }
      res = state.md.helpers.parseLinkDestination(str, pos, max);
      if (!res.ok) {
        return false;
      }
      href = state.md.normalizeLink(res.str);
      if (!state.md.validateLink(href)) {
        return false;
      }
      pos = res.pos;
      lines += res.lines;
      destEndPos = pos;
      destEndLineNo = lines;
      start = pos;
      for (; pos < max; pos++) {
        ch = str.charCodeAt(pos);
        if (ch === 10) {
          lines++;
        } else if (isSpace(ch)) {
        } else {
          break;
        }
      }
      res = state.md.helpers.parseLinkTitle(str, pos, max);
      if (pos < max && start !== pos && res.ok) {
        title = res.str;
        pos = res.pos;
        lines += res.lines;
      } else {
        title = "";
        pos = destEndPos;
        lines = destEndLineNo;
      }
      while (pos < max) {
        ch = str.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
        pos++;
      }
      if (pos < max && str.charCodeAt(pos) !== 10) {
        if (title) {
          title = "";
          pos = destEndPos;
          lines = destEndLineNo;
          while (pos < max) {
            ch = str.charCodeAt(pos);
            if (!isSpace(ch)) {
              break;
            }
            pos++;
          }
        }
      }
      if (pos < max && str.charCodeAt(pos) !== 10) {
        return false;
      }
      label = normalizeReference(str.slice(1, labelEnd));
      if (!label) {
        return false;
      }
      if (silent) {
        return true;
      }
      if (typeof state.env.references === "undefined") {
        state.env.references = {};
      }
      if (typeof state.env.references[label] === "undefined") {
        state.env.references[label] = { title, href };
      }
      state.parentType = oldParentType;
      state.line = startLine + lines + 1;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/common/html_blocks.js
var require_html_blocks = __commonJS({
  "node_modules/markdown-it/lib/common/html_blocks.js"(exports, module) {
    "use strict";
    module.exports = [
      "address",
      "article",
      "aside",
      "base",
      "basefont",
      "blockquote",
      "body",
      "caption",
      "center",
      "col",
      "colgroup",
      "dd",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "frame",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "iframe",
      "legend",
      "li",
      "link",
      "main",
      "menu",
      "menuitem",
      "nav",
      "noframes",
      "ol",
      "optgroup",
      "option",
      "p",
      "param",
      "section",
      "source",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "title",
      "tr",
      "track",
      "ul"
    ];
  }
});

// node_modules/markdown-it/lib/common/html_re.js
var require_html_re = __commonJS({
  "node_modules/markdown-it/lib/common/html_re.js"(exports, module) {
    "use strict";
    var attr_name = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
    var unquoted = "[^\"'=<>`\\x00-\\x20]+";
    var single_quoted = "'[^']*'";
    var double_quoted = '"[^"]*"';
    var attr_value = "(?:" + unquoted + "|" + single_quoted + "|" + double_quoted + ")";
    var attribute = "(?:\\s+" + attr_name + "(?:\\s*=\\s*" + attr_value + ")?)";
    var open_tag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
    var close_tag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
    var comment = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
    var processing = "<[?][\\s\\S]*?[?]>";
    var declaration = "<![A-Z]+\\s+[^>]*>";
    var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
    var HTML_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")");
    var HTML_OPEN_CLOSE_TAG_RE = new RegExp("^(?:" + open_tag + "|" + close_tag + ")");
    module.exports.HTML_TAG_RE = HTML_TAG_RE;
    module.exports.HTML_OPEN_CLOSE_TAG_RE = HTML_OPEN_CLOSE_TAG_RE;
  }
});

// node_modules/markdown-it/lib/rules_block/html_block.js
var require_html_block = __commonJS({
  "node_modules/markdown-it/lib/rules_block/html_block.js"(exports, module) {
    "use strict";
    var block_names = require_html_blocks();
    var HTML_OPEN_CLOSE_TAG_RE = require_html_re().HTML_OPEN_CLOSE_TAG_RE;
    var HTML_SEQUENCES = [
      [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, true],
      [/^<!--/, /-->/, true],
      [/^<\?/, /\?>/, true],
      [/^<![A-Z]/, />/, true],
      [/^<!\[CDATA\[/, /\]\]>/, true],
      [new RegExp("^</?(" + block_names.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, true],
      [new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + "\\s*$"), /^$/, false]
    ];
    module.exports = function html_block(state, startLine, endLine, silent) {
      var i4, nextLine, token, lineText, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      if (!state.md.options.html) {
        return false;
      }
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      lineText = state.src.slice(pos, max);
      for (i4 = 0; i4 < HTML_SEQUENCES.length; i4++) {
        if (HTML_SEQUENCES[i4][0].test(lineText)) {
          break;
        }
      }
      if (i4 === HTML_SEQUENCES.length) {
        return false;
      }
      if (silent) {
        return HTML_SEQUENCES[i4][2];
      }
      nextLine = startLine + 1;
      if (!HTML_SEQUENCES[i4][1].test(lineText)) {
        for (; nextLine < endLine; nextLine++) {
          if (state.sCount[nextLine] < state.blkIndent) {
            break;
          }
          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          lineText = state.src.slice(pos, max);
          if (HTML_SEQUENCES[i4][1].test(lineText)) {
            if (lineText.length !== 0) {
              nextLine++;
            }
            break;
          }
        }
      }
      state.line = nextLine;
      token = state.push("html_block", "", 0);
      token.map = [startLine, nextLine];
      token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/heading.js
var require_heading = __commonJS({
  "node_modules/markdown-it/lib/rules_block/heading.js"(exports, module) {
    "use strict";
    var isSpace = require_utils().isSpace;
    module.exports = function heading(state, startLine, endLine, silent) {
      var ch, level, tmp, token, pos = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      ch = state.src.charCodeAt(pos);
      if (ch !== 35 || pos >= max) {
        return false;
      }
      level = 1;
      ch = state.src.charCodeAt(++pos);
      while (ch === 35 && pos < max && level <= 6) {
        level++;
        ch = state.src.charCodeAt(++pos);
      }
      if (level > 6 || pos < max && !isSpace(ch)) {
        return false;
      }
      if (silent) {
        return true;
      }
      max = state.skipSpacesBack(max, pos);
      tmp = state.skipCharsBack(max, 35, pos);
      if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
        max = tmp;
      }
      state.line = startLine + 1;
      token = state.push("heading_open", "h" + String(level), 1);
      token.markup = "########".slice(0, level);
      token.map = [startLine, state.line];
      token = state.push("inline", "", 0);
      token.content = state.src.slice(pos, max).trim();
      token.map = [startLine, state.line];
      token.children = [];
      token = state.push("heading_close", "h" + String(level), -1);
      token.markup = "########".slice(0, level);
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/lheading.js
var require_lheading = __commonJS({
  "node_modules/markdown-it/lib/rules_block/lheading.js"(exports, module) {
    "use strict";
    module.exports = function lheading(state, startLine, endLine) {
      var content, terminate, i4, l2, token, pos, max, level, marker, nextLine = startLine + 1, oldParentType, terminatorRules = state.md.block.ruler.getRules("paragraph");
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }
      oldParentType = state.parentType;
      state.parentType = "paragraph";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] >= state.blkIndent) {
          pos = state.bMarks[nextLine] + state.tShift[nextLine];
          max = state.eMarks[nextLine];
          if (pos < max) {
            marker = state.src.charCodeAt(pos);
            if (marker === 45 || marker === 61) {
              pos = state.skipChars(pos, marker);
              pos = state.skipSpaces(pos);
              if (pos >= max) {
                level = marker === 61 ? 1 : 2;
                break;
              }
            }
          }
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i4 = 0, l2 = terminatorRules.length; i4 < l2; i4++) {
          if (terminatorRules[i4](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      if (!level) {
        return false;
      }
      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine + 1;
      token = state.push("heading_open", "h" + String(level), 1);
      token.markup = String.fromCharCode(marker);
      token.map = [startLine, state.line];
      token = state.push("inline", "", 0);
      token.content = content;
      token.map = [startLine, state.line - 1];
      token.children = [];
      token = state.push("heading_close", "h" + String(level), -1);
      token.markup = String.fromCharCode(marker);
      state.parentType = oldParentType;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/paragraph.js
var require_paragraph = __commonJS({
  "node_modules/markdown-it/lib/rules_block/paragraph.js"(exports, module) {
    "use strict";
    module.exports = function paragraph(state, startLine) {
      var content, terminate, i4, l2, token, oldParentType, nextLine = startLine + 1, terminatorRules = state.md.block.ruler.getRules("paragraph"), endLine = state.lineMax;
      oldParentType = state.parentType;
      state.parentType = "paragraph";
      for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
        if (state.sCount[nextLine] - state.blkIndent > 3) {
          continue;
        }
        if (state.sCount[nextLine] < 0) {
          continue;
        }
        terminate = false;
        for (i4 = 0, l2 = terminatorRules.length; i4 < l2; i4++) {
          if (terminatorRules[i4](state, nextLine, endLine, true)) {
            terminate = true;
            break;
          }
        }
        if (terminate) {
          break;
        }
      }
      content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
      state.line = nextLine;
      token = state.push("paragraph_open", "p", 1);
      token.map = [startLine, state.line];
      token = state.push("inline", "", 0);
      token.content = content;
      token.map = [startLine, state.line];
      token.children = [];
      token = state.push("paragraph_close", "p", -1);
      state.parentType = oldParentType;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_block/state_block.js
var require_state_block = __commonJS({
  "node_modules/markdown-it/lib/rules_block/state_block.js"(exports, module) {
    "use strict";
    var Token = require_token();
    var isSpace = require_utils().isSpace;
    function StateBlock(src, md, env, tokens) {
      var ch, s2, start, pos, len, indent, offset, indent_found;
      this.src = src;
      this.md = md;
      this.env = env;
      this.tokens = tokens;
      this.bMarks = [];
      this.eMarks = [];
      this.tShift = [];
      this.sCount = [];
      this.bsCount = [];
      this.blkIndent = 0;
      this.line = 0;
      this.lineMax = 0;
      this.tight = false;
      this.ddIndent = -1;
      this.listIndent = -1;
      this.parentType = "root";
      this.level = 0;
      this.result = "";
      s2 = this.src;
      indent_found = false;
      for (start = pos = indent = offset = 0, len = s2.length; pos < len; pos++) {
        ch = s2.charCodeAt(pos);
        if (!indent_found) {
          if (isSpace(ch)) {
            indent++;
            if (ch === 9) {
              offset += 4 - offset % 4;
            } else {
              offset++;
            }
            continue;
          } else {
            indent_found = true;
          }
        }
        if (ch === 10 || pos === len - 1) {
          if (ch !== 10) {
            pos++;
          }
          this.bMarks.push(start);
          this.eMarks.push(pos);
          this.tShift.push(indent);
          this.sCount.push(offset);
          this.bsCount.push(0);
          indent_found = false;
          indent = 0;
          offset = 0;
          start = pos + 1;
        }
      }
      this.bMarks.push(s2.length);
      this.eMarks.push(s2.length);
      this.tShift.push(0);
      this.sCount.push(0);
      this.bsCount.push(0);
      this.lineMax = this.bMarks.length - 1;
    }
    StateBlock.prototype.push = function(type, tag, nesting) {
      var token = new Token(type, tag, nesting);
      token.block = true;
      if (nesting < 0)
        this.level--;
      token.level = this.level;
      if (nesting > 0)
        this.level++;
      this.tokens.push(token);
      return token;
    };
    StateBlock.prototype.isEmpty = function isEmpty(line) {
      return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
    };
    StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
      for (var max = this.lineMax; from < max; from++) {
        if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
          break;
        }
      }
      return from;
    };
    StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
      var ch;
      for (var max = this.src.length; pos < max; pos++) {
        ch = this.src.charCodeAt(pos);
        if (!isSpace(ch)) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (!isSpace(this.src.charCodeAt(--pos))) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipChars = function skipChars(pos, code) {
      for (var max = this.src.length; pos < max; pos++) {
        if (this.src.charCodeAt(pos) !== code) {
          break;
        }
      }
      return pos;
    };
    StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
      if (pos <= min) {
        return pos;
      }
      while (pos > min) {
        if (code !== this.src.charCodeAt(--pos)) {
          return pos + 1;
        }
      }
      return pos;
    };
    StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
      var i4, lineIndent, ch, first, last, queue, lineStart, line = begin;
      if (begin >= end) {
        return "";
      }
      queue = new Array(end - begin);
      for (i4 = 0; line < end; line++, i4++) {
        lineIndent = 0;
        lineStart = first = this.bMarks[line];
        if (line + 1 < end || keepLastLF) {
          last = this.eMarks[line] + 1;
        } else {
          last = this.eMarks[line];
        }
        while (first < last && lineIndent < indent) {
          ch = this.src.charCodeAt(first);
          if (isSpace(ch)) {
            if (ch === 9) {
              lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
            } else {
              lineIndent++;
            }
          } else if (first - lineStart < this.tShift[line]) {
            lineIndent++;
          } else {
            break;
          }
          first++;
        }
        if (lineIndent > indent) {
          queue[i4] = new Array(lineIndent - indent + 1).join(" ") + this.src.slice(first, last);
        } else {
          queue[i4] = this.src.slice(first, last);
        }
      }
      return queue.join("");
    };
    StateBlock.prototype.Token = Token;
    module.exports = StateBlock;
  }
});

// node_modules/markdown-it/lib/parser_block.js
var require_parser_block = __commonJS({
  "node_modules/markdown-it/lib/parser_block.js"(exports, module) {
    "use strict";
    var Ruler = require_ruler();
    var _rules = [
      // First 2 params - rule name & source. Secondary array - list of rules,
      // which can be terminated by this one.
      ["table", require_table(), ["paragraph", "reference"]],
      ["code", require_code()],
      ["fence", require_fence(), ["paragraph", "reference", "blockquote", "list"]],
      ["blockquote", require_blockquote(), ["paragraph", "reference", "blockquote", "list"]],
      ["hr", require_hr(), ["paragraph", "reference", "blockquote", "list"]],
      ["list", require_list(), ["paragraph", "reference", "blockquote"]],
      ["reference", require_reference()],
      ["html_block", require_html_block(), ["paragraph", "reference", "blockquote"]],
      ["heading", require_heading(), ["paragraph", "reference", "blockquote"]],
      ["lheading", require_lheading()],
      ["paragraph", require_paragraph()]
    ];
    function ParserBlock() {
      this.ruler = new Ruler();
      for (var i4 = 0; i4 < _rules.length; i4++) {
        this.ruler.push(_rules[i4][0], _rules[i4][1], { alt: (_rules[i4][2] || []).slice() });
      }
    }
    ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
      var ok, i4, rules = this.ruler.getRules(""), len = rules.length, line = startLine, hasEmptyLines = false, maxNesting = state.md.options.maxNesting;
      while (line < endLine) {
        state.line = line = state.skipEmptyLines(line);
        if (line >= endLine) {
          break;
        }
        if (state.sCount[line] < state.blkIndent) {
          break;
        }
        if (state.level >= maxNesting) {
          state.line = endLine;
          break;
        }
        for (i4 = 0; i4 < len; i4++) {
          ok = rules[i4](state, line, endLine, false);
          if (ok) {
            break;
          }
        }
        state.tight = !hasEmptyLines;
        if (state.isEmpty(state.line - 1)) {
          hasEmptyLines = true;
        }
        line = state.line;
        if (line < endLine && state.isEmpty(line)) {
          hasEmptyLines = true;
          line++;
          state.line = line;
        }
      }
    };
    ParserBlock.prototype.parse = function(src, md, env, outTokens) {
      var state;
      if (!src) {
        return;
      }
      state = new this.State(src, md, env, outTokens);
      this.tokenize(state, state.line, state.lineMax);
    };
    ParserBlock.prototype.State = require_state_block();
    module.exports = ParserBlock;
  }
});

// node_modules/markdown-it/lib/rules_inline/text.js
var require_text = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/text.js"(exports, module) {
    "use strict";
    function isTerminatorChar(ch) {
      switch (ch) {
        case 10:
        case 33:
        case 35:
        case 36:
        case 37:
        case 38:
        case 42:
        case 43:
        case 45:
        case 58:
        case 60:
        case 61:
        case 62:
        case 64:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
        case 96:
        case 123:
        case 125:
        case 126:
          return true;
        default:
          return false;
      }
    }
    module.exports = function text(state, silent) {
      var pos = state.pos;
      while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
        pos++;
      }
      if (pos === state.pos) {
        return false;
      }
      if (!silent) {
        state.pending += state.src.slice(state.pos, pos);
      }
      state.pos = pos;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/linkify.js
var require_linkify2 = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/linkify.js"(exports, module) {
    "use strict";
    var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
    module.exports = function linkify(state, silent) {
      var pos, max, match, proto, link, url, fullUrl, token;
      if (!state.md.options.linkify)
        return false;
      if (state.linkLevel > 0)
        return false;
      pos = state.pos;
      max = state.posMax;
      if (pos + 3 > max)
        return false;
      if (state.src.charCodeAt(pos) !== 58)
        return false;
      if (state.src.charCodeAt(pos + 1) !== 47)
        return false;
      if (state.src.charCodeAt(pos + 2) !== 47)
        return false;
      match = state.pending.match(SCHEME_RE);
      if (!match)
        return false;
      proto = match[1];
      link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
      if (!link)
        return false;
      url = link.url;
      url = url.replace(/\*+$/, "");
      fullUrl = state.md.normalizeLink(url);
      if (!state.md.validateLink(fullUrl))
        return false;
      if (!silent) {
        state.pending = state.pending.slice(0, -proto.length);
        token = state.push("link_open", "a", 1);
        token.attrs = [["href", fullUrl]];
        token.markup = "linkify";
        token.info = "auto";
        token = state.push("text", "", 0);
        token.content = state.md.normalizeLinkText(url);
        token = state.push("link_close", "a", -1);
        token.markup = "linkify";
        token.info = "auto";
      }
      state.pos += url.length - proto.length;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/newline.js
var require_newline = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/newline.js"(exports, module) {
    "use strict";
    var isSpace = require_utils().isSpace;
    module.exports = function newline(state, silent) {
      var pmax, max, ws, pos = state.pos;
      if (state.src.charCodeAt(pos) !== 10) {
        return false;
      }
      pmax = state.pending.length - 1;
      max = state.posMax;
      if (!silent) {
        if (pmax >= 0 && state.pending.charCodeAt(pmax) === 32) {
          if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 32) {
            ws = pmax - 1;
            while (ws >= 1 && state.pending.charCodeAt(ws - 1) === 32)
              ws--;
            state.pending = state.pending.slice(0, ws);
            state.push("hardbreak", "br", 0);
          } else {
            state.pending = state.pending.slice(0, -1);
            state.push("softbreak", "br", 0);
          }
        } else {
          state.push("softbreak", "br", 0);
        }
      }
      pos++;
      while (pos < max && isSpace(state.src.charCodeAt(pos))) {
        pos++;
      }
      state.pos = pos;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/escape.js
var require_escape = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/escape.js"(exports, module) {
    "use strict";
    var isSpace = require_utils().isSpace;
    var ESCAPED = [];
    for (i4 = 0; i4 < 256; i4++) {
      ESCAPED.push(0);
    }
    var i4;
    "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(ch) {
      ESCAPED[ch.charCodeAt(0)] = 1;
    });
    module.exports = function escape(state, silent) {
      var ch1, ch2, origStr, escapedStr, token, pos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(pos) !== 92)
        return false;
      pos++;
      if (pos >= max)
        return false;
      ch1 = state.src.charCodeAt(pos);
      if (ch1 === 10) {
        if (!silent) {
          state.push("hardbreak", "br", 0);
        }
        pos++;
        while (pos < max) {
          ch1 = state.src.charCodeAt(pos);
          if (!isSpace(ch1))
            break;
          pos++;
        }
        state.pos = pos;
        return true;
      }
      escapedStr = state.src[pos];
      if (ch1 >= 55296 && ch1 <= 56319 && pos + 1 < max) {
        ch2 = state.src.charCodeAt(pos + 1);
        if (ch2 >= 56320 && ch2 <= 57343) {
          escapedStr += state.src[pos + 1];
          pos++;
        }
      }
      origStr = "\\" + escapedStr;
      if (!silent) {
        token = state.push("text_special", "", 0);
        if (ch1 < 256 && ESCAPED[ch1] !== 0) {
          token.content = escapedStr;
        } else {
          token.content = origStr;
        }
        token.markup = origStr;
        token.info = "escape";
      }
      state.pos = pos + 1;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/backticks.js
var require_backticks = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/backticks.js"(exports, module) {
    "use strict";
    module.exports = function backtick(state, silent) {
      var start, max, marker, token, matchStart, matchEnd, openerLength, closerLength, pos = state.pos, ch = state.src.charCodeAt(pos);
      if (ch !== 96) {
        return false;
      }
      start = pos;
      pos++;
      max = state.posMax;
      while (pos < max && state.src.charCodeAt(pos) === 96) {
        pos++;
      }
      marker = state.src.slice(start, pos);
      openerLength = marker.length;
      if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
        if (!silent)
          state.pending += marker;
        state.pos += openerLength;
        return true;
      }
      matchStart = matchEnd = pos;
      while ((matchStart = state.src.indexOf("`", matchEnd)) !== -1) {
        matchEnd = matchStart + 1;
        while (matchEnd < max && state.src.charCodeAt(matchEnd) === 96) {
          matchEnd++;
        }
        closerLength = matchEnd - matchStart;
        if (closerLength === openerLength) {
          if (!silent) {
            token = state.push("code_inline", "code", 0);
            token.markup = marker;
            token.content = state.src.slice(pos, matchStart).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
          }
          state.pos = matchEnd;
          return true;
        }
        state.backticks[closerLength] = matchStart;
      }
      state.backticksScanned = true;
      if (!silent)
        state.pending += marker;
      state.pos += openerLength;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/strikethrough.js
var require_strikethrough = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/strikethrough.js"(exports, module) {
    "use strict";
    module.exports.tokenize = function strikethrough(state, silent) {
      var i4, scanned, token, len, ch, start = state.pos, marker = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker !== 126) {
        return false;
      }
      scanned = state.scanDelims(state.pos, true);
      len = scanned.length;
      ch = String.fromCharCode(marker);
      if (len < 2) {
        return false;
      }
      if (len % 2) {
        token = state.push("text", "", 0);
        token.content = ch;
        len--;
      }
      for (i4 = 0; i4 < len; i4 += 2) {
        token = state.push("text", "", 0);
        token.content = ch + ch;
        state.delimiters.push({
          marker,
          length: 0,
          // disable "rule of 3" length checks meant for emphasis
          token: state.tokens.length - 1,
          end: -1,
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    };
    function postProcess(state, delimiters) {
      var i4, j2, startDelim, endDelim, token, loneMarkers = [], max = delimiters.length;
      for (i4 = 0; i4 < max; i4++) {
        startDelim = delimiters[i4];
        if (startDelim.marker !== 126) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        endDelim = delimiters[startDelim.end];
        token = state.tokens[startDelim.token];
        token.type = "s_open";
        token.tag = "s";
        token.nesting = 1;
        token.markup = "~~";
        token.content = "";
        token = state.tokens[endDelim.token];
        token.type = "s_close";
        token.tag = "s";
        token.nesting = -1;
        token.markup = "~~";
        token.content = "";
        if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "~") {
          loneMarkers.push(endDelim.token - 1);
        }
      }
      while (loneMarkers.length) {
        i4 = loneMarkers.pop();
        j2 = i4 + 1;
        while (j2 < state.tokens.length && state.tokens[j2].type === "s_close") {
          j2++;
        }
        j2--;
        if (i4 !== j2) {
          token = state.tokens[j2];
          state.tokens[j2] = state.tokens[i4];
          state.tokens[i4] = token;
        }
      }
    }
    module.exports.postProcess = function strikethrough(state) {
      var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
      postProcess(state, state.delimiters);
      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess(state, tokens_meta[curr].delimiters);
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/emphasis.js
var require_emphasis = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/emphasis.js"(exports, module) {
    "use strict";
    module.exports.tokenize = function emphasis(state, silent) {
      var i4, scanned, token, start = state.pos, marker = state.src.charCodeAt(start);
      if (silent) {
        return false;
      }
      if (marker !== 95 && marker !== 42) {
        return false;
      }
      scanned = state.scanDelims(state.pos, marker === 42);
      for (i4 = 0; i4 < scanned.length; i4++) {
        token = state.push("text", "", 0);
        token.content = String.fromCharCode(marker);
        state.delimiters.push({
          // Char code of the starting marker (number).
          //
          marker,
          // Total length of these series of delimiters.
          //
          length: scanned.length,
          // A position of the token this delimiter corresponds to.
          //
          token: state.tokens.length - 1,
          // If this delimiter is matched as a valid opener, `end` will be
          // equal to its position, otherwise it's `-1`.
          //
          end: -1,
          // Boolean flags that determine if this delimiter could open or close
          // an emphasis.
          //
          open: scanned.can_open,
          close: scanned.can_close
        });
      }
      state.pos += scanned.length;
      return true;
    };
    function postProcess(state, delimiters) {
      var i4, startDelim, endDelim, token, ch, isStrong, max = delimiters.length;
      for (i4 = max - 1; i4 >= 0; i4--) {
        startDelim = delimiters[i4];
        if (startDelim.marker !== 95 && startDelim.marker !== 42) {
          continue;
        }
        if (startDelim.end === -1) {
          continue;
        }
        endDelim = delimiters[startDelim.end];
        isStrong = i4 > 0 && delimiters[i4 - 1].end === startDelim.end + 1 && // check that first two markers match and adjacent
        delimiters[i4 - 1].marker === startDelim.marker && delimiters[i4 - 1].token === startDelim.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
        delimiters[startDelim.end + 1].token === endDelim.token + 1;
        ch = String.fromCharCode(startDelim.marker);
        token = state.tokens[startDelim.token];
        token.type = isStrong ? "strong_open" : "em_open";
        token.tag = isStrong ? "strong" : "em";
        token.nesting = 1;
        token.markup = isStrong ? ch + ch : ch;
        token.content = "";
        token = state.tokens[endDelim.token];
        token.type = isStrong ? "strong_close" : "em_close";
        token.tag = isStrong ? "strong" : "em";
        token.nesting = -1;
        token.markup = isStrong ? ch + ch : ch;
        token.content = "";
        if (isStrong) {
          state.tokens[delimiters[i4 - 1].token].content = "";
          state.tokens[delimiters[startDelim.end + 1].token].content = "";
          i4--;
        }
      }
    }
    module.exports.postProcess = function emphasis(state) {
      var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
      postProcess(state, state.delimiters);
      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          postProcess(state, tokens_meta[curr].delimiters);
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/link.js
var require_link = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/link.js"(exports, module) {
    "use strict";
    var normalizeReference = require_utils().normalizeReference;
    var isSpace = require_utils().isSpace;
    module.exports = function link(state, silent) {
      var attrs, code, label, labelEnd, labelStart, pos, res, ref2, token, href = "", title = "", oldPos = state.pos, max = state.posMax, start = state.pos, parseReference = true;
      if (state.src.charCodeAt(state.pos) !== 91) {
        return false;
      }
      labelStart = state.pos + 1;
      labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
      if (labelEnd < 0) {
        return false;
      }
      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        parseReference = false;
        pos++;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = "";
          }
          start = pos;
          for (; pos < max; pos++) {
            code = state.src.charCodeAt(pos);
            if (!isSpace(code) && code !== 10) {
              break;
            }
          }
          res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
          if (pos < max && start !== pos && res.ok) {
            title = res.str;
            pos = res.pos;
            for (; pos < max; pos++) {
              code = state.src.charCodeAt(pos);
              if (!isSpace(code) && code !== 10) {
                break;
              }
            }
          }
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          parseReference = true;
        }
        pos++;
      }
      if (parseReference) {
        if (typeof state.env.references === "undefined") {
          return false;
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }
        if (!label) {
          label = state.src.slice(labelStart, labelEnd);
        }
        ref2 = state.env.references[normalizeReference(label)];
        if (!ref2) {
          state.pos = oldPos;
          return false;
        }
        href = ref2.href;
        title = ref2.title;
      }
      if (!silent) {
        state.pos = labelStart;
        state.posMax = labelEnd;
        token = state.push("link_open", "a", 1);
        token.attrs = attrs = [["href", href]];
        if (title) {
          attrs.push(["title", title]);
        }
        state.linkLevel++;
        state.md.inline.tokenize(state);
        state.linkLevel--;
        token = state.push("link_close", "a", -1);
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/image.js
var require_image = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/image.js"(exports, module) {
    "use strict";
    var normalizeReference = require_utils().normalizeReference;
    var isSpace = require_utils().isSpace;
    module.exports = function image(state, silent) {
      var attrs, code, content, label, labelEnd, labelStart, pos, ref2, res, title, token, tokens, start, href = "", oldPos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(state.pos) !== 33) {
        return false;
      }
      if (state.src.charCodeAt(state.pos + 1) !== 91) {
        return false;
      }
      labelStart = state.pos + 2;
      labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
      if (labelEnd < 0) {
        return false;
      }
      pos = labelEnd + 1;
      if (pos < max && state.src.charCodeAt(pos) === 40) {
        pos++;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 10) {
            break;
          }
        }
        if (pos >= max) {
          return false;
        }
        start = pos;
        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
        if (res.ok) {
          href = state.md.normalizeLink(res.str);
          if (state.md.validateLink(href)) {
            pos = res.pos;
          } else {
            href = "";
          }
        }
        start = pos;
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (!isSpace(code) && code !== 10) {
            break;
          }
        }
        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
        if (pos < max && start !== pos && res.ok) {
          title = res.str;
          pos = res.pos;
          for (; pos < max; pos++) {
            code = state.src.charCodeAt(pos);
            if (!isSpace(code) && code !== 10) {
              break;
            }
          }
        } else {
          title = "";
        }
        if (pos >= max || state.src.charCodeAt(pos) !== 41) {
          state.pos = oldPos;
          return false;
        }
        pos++;
      } else {
        if (typeof state.env.references === "undefined") {
          return false;
        }
        if (pos < max && state.src.charCodeAt(pos) === 91) {
          start = pos + 1;
          pos = state.md.helpers.parseLinkLabel(state, pos);
          if (pos >= 0) {
            label = state.src.slice(start, pos++);
          } else {
            pos = labelEnd + 1;
          }
        } else {
          pos = labelEnd + 1;
        }
        if (!label) {
          label = state.src.slice(labelStart, labelEnd);
        }
        ref2 = state.env.references[normalizeReference(label)];
        if (!ref2) {
          state.pos = oldPos;
          return false;
        }
        href = ref2.href;
        title = ref2.title;
      }
      if (!silent) {
        content = state.src.slice(labelStart, labelEnd);
        state.md.inline.parse(
          content,
          state.md,
          state.env,
          tokens = []
        );
        token = state.push("image", "img", 0);
        token.attrs = attrs = [["src", href], ["alt", ""]];
        token.children = tokens;
        token.content = content;
        if (title) {
          attrs.push(["title", title]);
        }
      }
      state.pos = pos;
      state.posMax = max;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/autolink.js
var require_autolink = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/autolink.js"(exports, module) {
    "use strict";
    var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
    var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/;
    module.exports = function autolink(state, silent) {
      var url, fullUrl, token, ch, start, max, pos = state.pos;
      if (state.src.charCodeAt(pos) !== 60) {
        return false;
      }
      start = state.pos;
      max = state.posMax;
      for (; ; ) {
        if (++pos >= max)
          return false;
        ch = state.src.charCodeAt(pos);
        if (ch === 60)
          return false;
        if (ch === 62)
          break;
      }
      url = state.src.slice(start + 1, pos);
      if (AUTOLINK_RE.test(url)) {
        fullUrl = state.md.normalizeLink(url);
        if (!state.md.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          token = state.push("link_open", "a", 1);
          token.attrs = [["href", fullUrl]];
          token.markup = "autolink";
          token.info = "auto";
          token = state.push("text", "", 0);
          token.content = state.md.normalizeLinkText(url);
          token = state.push("link_close", "a", -1);
          token.markup = "autolink";
          token.info = "auto";
        }
        state.pos += url.length + 2;
        return true;
      }
      if (EMAIL_RE.test(url)) {
        fullUrl = state.md.normalizeLink("mailto:" + url);
        if (!state.md.validateLink(fullUrl)) {
          return false;
        }
        if (!silent) {
          token = state.push("link_open", "a", 1);
          token.attrs = [["href", fullUrl]];
          token.markup = "autolink";
          token.info = "auto";
          token = state.push("text", "", 0);
          token.content = state.md.normalizeLinkText(url);
          token = state.push("link_close", "a", -1);
          token.markup = "autolink";
          token.info = "auto";
        }
        state.pos += url.length + 2;
        return true;
      }
      return false;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/html_inline.js
var require_html_inline = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/html_inline.js"(exports, module) {
    "use strict";
    var HTML_TAG_RE = require_html_re().HTML_TAG_RE;
    function isLinkOpen(str) {
      return /^<a[>\s]/i.test(str);
    }
    function isLinkClose(str) {
      return /^<\/a\s*>/i.test(str);
    }
    function isLetter(ch) {
      var lc = ch | 32;
      return lc >= 97 && lc <= 122;
    }
    module.exports = function html_inline(state, silent) {
      var ch, match, max, token, pos = state.pos;
      if (!state.md.options.html) {
        return false;
      }
      max = state.posMax;
      if (state.src.charCodeAt(pos) !== 60 || pos + 2 >= max) {
        return false;
      }
      ch = state.src.charCodeAt(pos + 1);
      if (ch !== 33 && ch !== 63 && ch !== 47 && !isLetter(ch)) {
        return false;
      }
      match = state.src.slice(pos).match(HTML_TAG_RE);
      if (!match) {
        return false;
      }
      if (!silent) {
        token = state.push("html_inline", "", 0);
        token.content = state.src.slice(pos, pos + match[0].length);
        if (isLinkOpen(token.content))
          state.linkLevel++;
        if (isLinkClose(token.content))
          state.linkLevel--;
      }
      state.pos += match[0].length;
      return true;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/entity.js
var require_entity = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/entity.js"(exports, module) {
    "use strict";
    var entities = require_entities2();
    var has = require_utils().has;
    var isValidEntityCode = require_utils().isValidEntityCode;
    var fromCodePoint2 = require_utils().fromCodePoint;
    var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
    var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
    module.exports = function entity(state, silent) {
      var ch, code, match, token, pos = state.pos, max = state.posMax;
      if (state.src.charCodeAt(pos) !== 38)
        return false;
      if (pos + 1 >= max)
        return false;
      ch = state.src.charCodeAt(pos + 1);
      if (ch === 35) {
        match = state.src.slice(pos).match(DIGITAL_RE);
        if (match) {
          if (!silent) {
            code = match[1][0].toLowerCase() === "x" ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
            token = state.push("text_special", "", 0);
            token.content = isValidEntityCode(code) ? fromCodePoint2(code) : fromCodePoint2(65533);
            token.markup = match[0];
            token.info = "entity";
          }
          state.pos += match[0].length;
          return true;
        }
      } else {
        match = state.src.slice(pos).match(NAMED_RE);
        if (match) {
          if (has(entities, match[1])) {
            if (!silent) {
              token = state.push("text_special", "", 0);
              token.content = entities[match[1]];
              token.markup = match[0];
              token.info = "entity";
            }
            state.pos += match[0].length;
            return true;
          }
        }
      }
      return false;
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/balance_pairs.js
var require_balance_pairs = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/balance_pairs.js"(exports, module) {
    "use strict";
    function processDelimiters(state, delimiters) {
      var closerIdx, openerIdx, closer, opener, minOpenerIdx, newMinOpenerIdx, isOddMatch, lastJump, openersBottom = {}, max = delimiters.length;
      if (!max)
        return;
      var headerIdx = 0;
      var lastTokenIdx = -2;
      var jumps = [];
      for (closerIdx = 0; closerIdx < max; closerIdx++) {
        closer = delimiters[closerIdx];
        jumps.push(0);
        if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
          headerIdx = closerIdx;
        }
        lastTokenIdx = closer.token;
        closer.length = closer.length || 0;
        if (!closer.close)
          continue;
        if (!openersBottom.hasOwnProperty(closer.marker)) {
          openersBottom[closer.marker] = [-1, -1, -1, -1, -1, -1];
        }
        minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
        openerIdx = headerIdx - jumps[headerIdx] - 1;
        newMinOpenerIdx = openerIdx;
        for (; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1) {
          opener = delimiters[openerIdx];
          if (opener.marker !== closer.marker)
            continue;
          if (opener.open && opener.end < 0) {
            isOddMatch = false;
            if (opener.close || closer.open) {
              if ((opener.length + closer.length) % 3 === 0) {
                if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
                  isOddMatch = true;
                }
              }
            }
            if (!isOddMatch) {
              lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
              jumps[closerIdx] = closerIdx - openerIdx + lastJump;
              jumps[openerIdx] = lastJump;
              closer.open = false;
              opener.end = closerIdx;
              opener.close = false;
              newMinOpenerIdx = -1;
              lastTokenIdx = -2;
              break;
            }
          }
        }
        if (newMinOpenerIdx !== -1) {
          openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
        }
      }
    }
    module.exports = function link_pairs(state) {
      var curr, tokens_meta = state.tokens_meta, max = state.tokens_meta.length;
      processDelimiters(state, state.delimiters);
      for (curr = 0; curr < max; curr++) {
        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
          processDelimiters(state, tokens_meta[curr].delimiters);
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/fragments_join.js
var require_fragments_join = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/fragments_join.js"(exports, module) {
    "use strict";
    module.exports = function fragments_join(state) {
      var curr, last, level = 0, tokens = state.tokens, max = state.tokens.length;
      for (curr = last = 0; curr < max; curr++) {
        if (tokens[curr].nesting < 0)
          level--;
        tokens[curr].level = level;
        if (tokens[curr].nesting > 0)
          level++;
        if (tokens[curr].type === "text" && curr + 1 < max && tokens[curr + 1].type === "text") {
          tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
        } else {
          if (curr !== last) {
            tokens[last] = tokens[curr];
          }
          last++;
        }
      }
      if (curr !== last) {
        tokens.length = last;
      }
    };
  }
});

// node_modules/markdown-it/lib/rules_inline/state_inline.js
var require_state_inline = __commonJS({
  "node_modules/markdown-it/lib/rules_inline/state_inline.js"(exports, module) {
    "use strict";
    var Token = require_token();
    var isWhiteSpace = require_utils().isWhiteSpace;
    var isPunctChar = require_utils().isPunctChar;
    var isMdAsciiPunct = require_utils().isMdAsciiPunct;
    function StateInline(src, md, env, outTokens) {
      this.src = src;
      this.env = env;
      this.md = md;
      this.tokens = outTokens;
      this.tokens_meta = Array(outTokens.length);
      this.pos = 0;
      this.posMax = this.src.length;
      this.level = 0;
      this.pending = "";
      this.pendingLevel = 0;
      this.cache = {};
      this.delimiters = [];
      this._prev_delimiters = [];
      this.backticks = {};
      this.backticksScanned = false;
      this.linkLevel = 0;
    }
    StateInline.prototype.pushPending = function() {
      var token = new Token("text", "", 0);
      token.content = this.pending;
      token.level = this.pendingLevel;
      this.tokens.push(token);
      this.pending = "";
      return token;
    };
    StateInline.prototype.push = function(type, tag, nesting) {
      if (this.pending) {
        this.pushPending();
      }
      var token = new Token(type, tag, nesting);
      var token_meta = null;
      if (nesting < 0) {
        this.level--;
        this.delimiters = this._prev_delimiters.pop();
      }
      token.level = this.level;
      if (nesting > 0) {
        this.level++;
        this._prev_delimiters.push(this.delimiters);
        this.delimiters = [];
        token_meta = { delimiters: this.delimiters };
      }
      this.pendingLevel = this.level;
      this.tokens.push(token);
      this.tokens_meta.push(token_meta);
      return token;
    };
    StateInline.prototype.scanDelims = function(start, canSplitWord) {
      var pos = start, lastChar, nextChar, count, can_open, can_close, isLastWhiteSpace, isLastPunctChar, isNextWhiteSpace, isNextPunctChar, left_flanking = true, right_flanking = true, max = this.posMax, marker = this.src.charCodeAt(start);
      lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 32;
      while (pos < max && this.src.charCodeAt(pos) === marker) {
        pos++;
      }
      count = pos - start;
      nextChar = pos < max ? this.src.charCodeAt(pos) : 32;
      isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
      isLastWhiteSpace = isWhiteSpace(lastChar);
      isNextWhiteSpace = isWhiteSpace(nextChar);
      if (isNextWhiteSpace) {
        left_flanking = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          left_flanking = false;
        }
      }
      if (isLastWhiteSpace) {
        right_flanking = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          right_flanking = false;
        }
      }
      if (!canSplitWord) {
        can_open = left_flanking && (!right_flanking || isLastPunctChar);
        can_close = right_flanking && (!left_flanking || isNextPunctChar);
      } else {
        can_open = left_flanking;
        can_close = right_flanking;
      }
      return {
        can_open,
        can_close,
        length: count
      };
    };
    StateInline.prototype.Token = Token;
    module.exports = StateInline;
  }
});

// node_modules/markdown-it/lib/parser_inline.js
var require_parser_inline = __commonJS({
  "node_modules/markdown-it/lib/parser_inline.js"(exports, module) {
    "use strict";
    var Ruler = require_ruler();
    var _rules = [
      ["text", require_text()],
      ["linkify", require_linkify2()],
      ["newline", require_newline()],
      ["escape", require_escape()],
      ["backticks", require_backticks()],
      ["strikethrough", require_strikethrough().tokenize],
      ["emphasis", require_emphasis().tokenize],
      ["link", require_link()],
      ["image", require_image()],
      ["autolink", require_autolink()],
      ["html_inline", require_html_inline()],
      ["entity", require_entity()]
    ];
    var _rules2 = [
      ["balance_pairs", require_balance_pairs()],
      ["strikethrough", require_strikethrough().postProcess],
      ["emphasis", require_emphasis().postProcess],
      // rules for pairs separate '**' into its own text tokens, which may be left unused,
      // rule below merges unused segments back with the rest of the text
      ["fragments_join", require_fragments_join()]
    ];
    function ParserInline() {
      var i4;
      this.ruler = new Ruler();
      for (i4 = 0; i4 < _rules.length; i4++) {
        this.ruler.push(_rules[i4][0], _rules[i4][1]);
      }
      this.ruler2 = new Ruler();
      for (i4 = 0; i4 < _rules2.length; i4++) {
        this.ruler2.push(_rules2[i4][0], _rules2[i4][1]);
      }
    }
    ParserInline.prototype.skipToken = function(state) {
      var ok, i4, pos = state.pos, rules = this.ruler.getRules(""), len = rules.length, maxNesting = state.md.options.maxNesting, cache = state.cache;
      if (typeof cache[pos] !== "undefined") {
        state.pos = cache[pos];
        return;
      }
      if (state.level < maxNesting) {
        for (i4 = 0; i4 < len; i4++) {
          state.level++;
          ok = rules[i4](state, true);
          state.level--;
          if (ok) {
            break;
          }
        }
      } else {
        state.pos = state.posMax;
      }
      if (!ok) {
        state.pos++;
      }
      cache[pos] = state.pos;
    };
    ParserInline.prototype.tokenize = function(state) {
      var ok, i4, rules = this.ruler.getRules(""), len = rules.length, end = state.posMax, maxNesting = state.md.options.maxNesting;
      while (state.pos < end) {
        if (state.level < maxNesting) {
          for (i4 = 0; i4 < len; i4++) {
            ok = rules[i4](state, false);
            if (ok) {
              break;
            }
          }
        }
        if (ok) {
          if (state.pos >= end) {
            break;
          }
          continue;
        }
        state.pending += state.src[state.pos++];
      }
      if (state.pending) {
        state.pushPending();
      }
    };
    ParserInline.prototype.parse = function(str, md, env, outTokens) {
      var i4, rules, len;
      var state = new this.State(str, md, env, outTokens);
      this.tokenize(state);
      rules = this.ruler2.getRules("");
      len = rules.length;
      for (i4 = 0; i4 < len; i4++) {
        rules[i4](state);
      }
    };
    ParserInline.prototype.State = require_state_inline();
    module.exports = ParserInline;
  }
});

// node_modules/linkify-it/lib/re.js
var require_re = __commonJS({
  "node_modules/linkify-it/lib/re.js"(exports, module) {
    "use strict";
    module.exports = function(opts) {
      var re2 = {};
      opts = opts || {};
      re2.src_Any = require_regex2().source;
      re2.src_Cc = require_regex3().source;
      re2.src_Z = require_regex5().source;
      re2.src_P = require_regex().source;
      re2.src_ZPCc = [re2.src_Z, re2.src_P, re2.src_Cc].join("|");
      re2.src_ZCc = [re2.src_Z, re2.src_Cc].join("|");
      var text_separators = "[><｜]";
      re2.src_pseudo_letter = "(?:(?!" + text_separators + "|" + re2.src_ZPCc + ")" + re2.src_Any + ")";
      re2.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
      re2.src_auth = "(?:(?:(?!" + re2.src_ZCc + "|[@/\\[\\]()]).)+@)?";
      re2.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?";
      re2.src_host_terminator = "(?=$|" + text_separators + "|" + re2.src_ZPCc + ")(?!" + (opts["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + re2.src_ZPCc + "))";
      re2.src_path = "(?:[/?#](?:(?!" + re2.src_ZCc + "|" + text_separators + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + re2.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + re2.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + re2.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + re2.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + re2.src_ZCc + "|[']).)+\\'|\\'(?=" + re2.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + re2.src_ZCc + "|[.]|$)|" + (opts["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + ",(?!" + re2.src_ZCc + "|$)|;(?!" + re2.src_ZCc + "|$)|\\!+(?!" + re2.src_ZCc + "|[!]|$)|\\?(?!" + re2.src_ZCc + "|[?]|$))+|\\/)?";
      re2.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
      re2.src_xn = "xn--[a-z0-9\\-]{1,59}";
      re2.src_domain_root = // Allow letters & digits (http://test1)
      "(?:" + re2.src_xn + "|" + re2.src_pseudo_letter + "{1,63})";
      re2.src_domain = "(?:" + re2.src_xn + "|(?:" + re2.src_pseudo_letter + ")|(?:" + re2.src_pseudo_letter + "(?:-|" + re2.src_pseudo_letter + "){0,61}" + re2.src_pseudo_letter + "))";
      re2.src_host = "(?:(?:(?:(?:" + re2.src_domain + ")\\.)*" + re2.src_domain + "))";
      re2.tpl_host_fuzzy = "(?:" + re2.src_ip4 + "|(?:(?:(?:" + re2.src_domain + ")\\.)+(?:%TLDS%)))";
      re2.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + re2.src_domain + ")\\.)+(?:%TLDS%))";
      re2.src_host_strict = re2.src_host + re2.src_host_terminator;
      re2.tpl_host_fuzzy_strict = re2.tpl_host_fuzzy + re2.src_host_terminator;
      re2.src_host_port_strict = re2.src_host + re2.src_port + re2.src_host_terminator;
      re2.tpl_host_port_fuzzy_strict = re2.tpl_host_fuzzy + re2.src_port + re2.src_host_terminator;
      re2.tpl_host_port_no_ip_fuzzy_strict = re2.tpl_host_no_ip_fuzzy + re2.src_port + re2.src_host_terminator;
      re2.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + re2.src_ZPCc + "|>|$))";
      re2.tpl_email_fuzzy = "(^|" + text_separators + '|"|\\(|' + re2.src_ZCc + ")(" + re2.src_email_name + "@" + re2.tpl_host_fuzzy_strict + ")";
      re2.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re2.src_ZPCc + "))((?![$+<=>^`|｜])" + re2.tpl_host_port_fuzzy_strict + re2.src_path + ")";
      re2.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + re2.src_ZPCc + "))((?![$+<=>^`|｜])" + re2.tpl_host_port_no_ip_fuzzy_strict + re2.src_path + ")";
      return re2;
    };
  }
});

// node_modules/linkify-it/index.js
var require_linkify_it = __commonJS({
  "node_modules/linkify-it/index.js"(exports, module) {
    "use strict";
    function assign(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function(source) {
        if (!source) {
          return;
        }
        Object.keys(source).forEach(function(key) {
          obj[key] = source[key];
        });
      });
      return obj;
    }
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isString(obj) {
      return _class(obj) === "[object String]";
    }
    function isObject(obj) {
      return _class(obj) === "[object Object]";
    }
    function isRegExp(obj) {
      return _class(obj) === "[object RegExp]";
    }
    function isFunction(obj) {
      return _class(obj) === "[object Function]";
    }
    function escapeRE(str) {
      return str.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
    }
    var defaultOptions = {
      fuzzyLink: true,
      fuzzyEmail: true,
      fuzzyIP: false
    };
    function isOptionsObj(obj) {
      return Object.keys(obj || {}).reduce(function(acc, k3) {
        return acc || defaultOptions.hasOwnProperty(k3);
      }, false);
    }
    var defaultSchemas = {
      "http:": {
        validate: function(text, pos, self) {
          var tail = text.slice(pos);
          if (!self.re.http) {
            self.re.http = new RegExp(
              "^\\/\\/" + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path,
              "i"
            );
          }
          if (self.re.http.test(tail)) {
            return tail.match(self.re.http)[0].length;
          }
          return 0;
        }
      },
      "https:": "http:",
      "ftp:": "http:",
      "//": {
        validate: function(text, pos, self) {
          var tail = text.slice(pos);
          if (!self.re.no_http) {
            self.re.no_http = new RegExp(
              "^" + self.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
              // with code comments
              "(?:localhost|(?:(?:" + self.re.src_domain + ")\\.)+" + self.re.src_domain_root + ")" + self.re.src_port + self.re.src_host_terminator + self.re.src_path,
              "i"
            );
          }
          if (self.re.no_http.test(tail)) {
            if (pos >= 3 && text[pos - 3] === ":") {
              return 0;
            }
            if (pos >= 3 && text[pos - 3] === "/") {
              return 0;
            }
            return tail.match(self.re.no_http)[0].length;
          }
          return 0;
        }
      },
      "mailto:": {
        validate: function(text, pos, self) {
          var tail = text.slice(pos);
          if (!self.re.mailto) {
            self.re.mailto = new RegExp(
              "^" + self.re.src_email_name + "@" + self.re.src_host_strict,
              "i"
            );
          }
          if (self.re.mailto.test(tail)) {
            return tail.match(self.re.mailto)[0].length;
          }
          return 0;
        }
      }
    };
    var tlds_2ch_src_re = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]";
    var tlds_default = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
    function resetScanCache(self) {
      self.__index__ = -1;
      self.__text_cache__ = "";
    }
    function createValidator(re2) {
      return function(text, pos) {
        var tail = text.slice(pos);
        if (re2.test(tail)) {
          return tail.match(re2)[0].length;
        }
        return 0;
      };
    }
    function createNormalizer() {
      return function(match, self) {
        self.normalize(match);
      };
    }
    function compile(self) {
      var re2 = self.re = require_re()(self.__opts__);
      var tlds = self.__tlds__.slice();
      self.onCompile();
      if (!self.__tlds_replaced__) {
        tlds.push(tlds_2ch_src_re);
      }
      tlds.push(re2.src_xn);
      re2.src_tlds = tlds.join("|");
      function untpl(tpl) {
        return tpl.replace("%TLDS%", re2.src_tlds);
      }
      re2.email_fuzzy = RegExp(untpl(re2.tpl_email_fuzzy), "i");
      re2.link_fuzzy = RegExp(untpl(re2.tpl_link_fuzzy), "i");
      re2.link_no_ip_fuzzy = RegExp(untpl(re2.tpl_link_no_ip_fuzzy), "i");
      re2.host_fuzzy_test = RegExp(untpl(re2.tpl_host_fuzzy_test), "i");
      var aliases = [];
      self.__compiled__ = {};
      function schemaError(name, val) {
        throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
      }
      Object.keys(self.__schemas__).forEach(function(name) {
        var val = self.__schemas__[name];
        if (val === null) {
          return;
        }
        var compiled = { validate: null, link: null };
        self.__compiled__[name] = compiled;
        if (isObject(val)) {
          if (isRegExp(val.validate)) {
            compiled.validate = createValidator(val.validate);
          } else if (isFunction(val.validate)) {
            compiled.validate = val.validate;
          } else {
            schemaError(name, val);
          }
          if (isFunction(val.normalize)) {
            compiled.normalize = val.normalize;
          } else if (!val.normalize) {
            compiled.normalize = createNormalizer();
          } else {
            schemaError(name, val);
          }
          return;
        }
        if (isString(val)) {
          aliases.push(name);
          return;
        }
        schemaError(name, val);
      });
      aliases.forEach(function(alias) {
        if (!self.__compiled__[self.__schemas__[alias]]) {
          return;
        }
        self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
        self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
      });
      self.__compiled__[""] = { validate: null, normalize: createNormalizer() };
      var slist = Object.keys(self.__compiled__).filter(function(name) {
        return name.length > 0 && self.__compiled__[name];
      }).map(escapeRE).join("|");
      self.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + re2.src_ZPCc + "))(" + slist + ")", "i");
      self.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + re2.src_ZPCc + "))(" + slist + ")", "ig");
      self.re.schema_at_start = RegExp("^" + self.re.schema_search.source, "i");
      self.re.pretest = RegExp(
        "(" + self.re.schema_test.source + ")|(" + self.re.host_fuzzy_test.source + ")|@",
        "i"
      );
      resetScanCache(self);
    }
    function Match(self, shift) {
      var start = self.__index__, end = self.__last_index__, text = self.__text_cache__.slice(start, end);
      this.schema = self.__schema__.toLowerCase();
      this.index = start + shift;
      this.lastIndex = end + shift;
      this.raw = text;
      this.text = text;
      this.url = text;
    }
    function createMatch(self, shift) {
      var match = new Match(self, shift);
      self.__compiled__[match.schema].normalize(match, self);
      return match;
    }
    function LinkifyIt(schemas, options) {
      if (!(this instanceof LinkifyIt)) {
        return new LinkifyIt(schemas, options);
      }
      if (!options) {
        if (isOptionsObj(schemas)) {
          options = schemas;
          schemas = {};
        }
      }
      this.__opts__ = assign({}, defaultOptions, options);
      this.__index__ = -1;
      this.__last_index__ = -1;
      this.__schema__ = "";
      this.__text_cache__ = "";
      this.__schemas__ = assign({}, defaultSchemas, schemas);
      this.__compiled__ = {};
      this.__tlds__ = tlds_default;
      this.__tlds_replaced__ = false;
      this.re = {};
      compile(this);
    }
    LinkifyIt.prototype.add = function add2(schema, definition) {
      this.__schemas__[schema] = definition;
      compile(this);
      return this;
    };
    LinkifyIt.prototype.set = function set(options) {
      this.__opts__ = assign(this.__opts__, options);
      return this;
    };
    LinkifyIt.prototype.test = function test(text) {
      this.__text_cache__ = text;
      this.__index__ = -1;
      if (!text.length) {
        return false;
      }
      var m5, ml, me, len, shift, next, re2, tld_pos, at_pos;
      if (this.re.schema_test.test(text)) {
        re2 = this.re.schema_search;
        re2.lastIndex = 0;
        while ((m5 = re2.exec(text)) !== null) {
          len = this.testSchemaAt(text, m5[2], re2.lastIndex);
          if (len) {
            this.__schema__ = m5[2];
            this.__index__ = m5.index + m5[1].length;
            this.__last_index__ = m5.index + m5[0].length + len;
            break;
          }
        }
      }
      if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
        tld_pos = text.search(this.re.host_fuzzy_test);
        if (tld_pos >= 0) {
          if (this.__index__ < 0 || tld_pos < this.__index__) {
            if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
              shift = ml.index + ml[1].length;
              if (this.__index__ < 0 || shift < this.__index__) {
                this.__schema__ = "";
                this.__index__ = shift;
                this.__last_index__ = ml.index + ml[0].length;
              }
            }
          }
        }
      }
      if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
        at_pos = text.indexOf("@");
        if (at_pos >= 0) {
          if ((me = text.match(this.re.email_fuzzy)) !== null) {
            shift = me.index + me[1].length;
            next = me.index + me[0].length;
            if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
              this.__schema__ = "mailto:";
              this.__index__ = shift;
              this.__last_index__ = next;
            }
          }
        }
      }
      return this.__index__ >= 0;
    };
    LinkifyIt.prototype.pretest = function pretest(text) {
      return this.re.pretest.test(text);
    };
    LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
      if (!this.__compiled__[schema.toLowerCase()]) {
        return 0;
      }
      return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
    };
    LinkifyIt.prototype.match = function match(text) {
      var shift = 0, result = [];
      if (this.__index__ >= 0 && this.__text_cache__ === text) {
        result.push(createMatch(this, shift));
        shift = this.__last_index__;
      }
      var tail = shift ? text.slice(shift) : text;
      while (this.test(tail)) {
        result.push(createMatch(this, shift));
        tail = tail.slice(this.__last_index__);
        shift += this.__last_index__;
      }
      if (result.length) {
        return result;
      }
      return null;
    };
    LinkifyIt.prototype.matchAtStart = function matchAtStart(text) {
      this.__text_cache__ = text;
      this.__index__ = -1;
      if (!text.length)
        return null;
      var m5 = this.re.schema_at_start.exec(text);
      if (!m5)
        return null;
      var len = this.testSchemaAt(text, m5[2], m5[0].length);
      if (!len)
        return null;
      this.__schema__ = m5[2];
      this.__index__ = m5.index + m5[1].length;
      this.__last_index__ = m5.index + m5[0].length + len;
      return createMatch(this, 0);
    };
    LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
      list = Array.isArray(list) ? list : [list];
      if (!keepOld) {
        this.__tlds__ = list.slice();
        this.__tlds_replaced__ = true;
        compile(this);
        return this;
      }
      this.__tlds__ = this.__tlds__.concat(list).sort().filter(function(el, idx, arr) {
        return el !== arr[idx - 1];
      }).reverse();
      compile(this);
      return this;
    };
    LinkifyIt.prototype.normalize = function normalize(match) {
      if (!match.schema) {
        match.url = "http://" + match.url;
      }
      if (match.schema === "mailto:" && !/^mailto:/i.test(match.url)) {
        match.url = "mailto:" + match.url;
      }
    };
    LinkifyIt.prototype.onCompile = function onCompile() {
    };
    module.exports = LinkifyIt;
  }
});

// node_modules/punycode/punycode.es6.js
var punycode_es6_exports = {};
__export(punycode_es6_exports, {
  decode: () => decode,
  default: () => punycode_es6_default,
  encode: () => encode,
  toASCII: () => toASCII,
  toUnicode: () => toUnicode,
  ucs2decode: () => ucs2decode,
  ucs2encode: () => ucs2encode
});
function error(type) {
  throw new RangeError(errors[type]);
}
function map(array, callback) {
  const result = [];
  let length = array.length;
  while (length--) {
    result[length] = callback(array[length]);
  }
  return result;
}
function mapDomain(domain, callback) {
  const parts = domain.split("@");
  let result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    domain = parts[1];
  }
  domain = domain.replace(regexSeparators, ".");
  const labels = domain.split(".");
  const encoded = map(labels, callback).join(".");
  return result + encoded;
}
function ucs2decode(string) {
  const output = [];
  let counter = 0;
  const length = string.length;
  while (counter < length) {
    const value = string.charCodeAt(counter++);
    if (value >= 55296 && value <= 56319 && counter < length) {
      const extra = string.charCodeAt(counter++);
      if ((extra & 64512) == 56320) {
        output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}
var maxInt, base, tMin, tMax, skew, damp, initialBias, initialN, delimiter, regexPunycode, regexNonASCII, regexSeparators, errors, baseMinusTMin, floor, stringFromCharCode, ucs2encode, basicToDigit, digitToBasic, adapt, decode, encode, toUnicode, toASCII, punycode, punycode_es6_default;
var init_punycode_es6 = __esm({
  "node_modules/punycode/punycode.es6.js"() {
    "use strict";
    maxInt = 2147483647;
    base = 36;
    tMin = 1;
    tMax = 26;
    skew = 38;
    damp = 700;
    initialBias = 72;
    initialN = 128;
    delimiter = "-";
    regexPunycode = /^xn--/;
    regexNonASCII = /[^\0-\x7F]/;
    regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
    errors = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    };
    baseMinusTMin = base - tMin;
    floor = Math.floor;
    stringFromCharCode = String.fromCharCode;
    ucs2encode = (codePoints) => String.fromCodePoint(...codePoints);
    basicToDigit = function(codePoint) {
      if (codePoint >= 48 && codePoint < 58) {
        return 26 + (codePoint - 48);
      }
      if (codePoint >= 65 && codePoint < 91) {
        return codePoint - 65;
      }
      if (codePoint >= 97 && codePoint < 123) {
        return codePoint - 97;
      }
      return base;
    };
    digitToBasic = function(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };
    adapt = function(delta, numPoints, firstTime) {
      let k3 = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k3 += base) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k3 + (baseMinusTMin + 1) * delta / (delta + skew));
    };
    decode = function(input) {
      const output = [];
      const inputLength = input.length;
      let i4 = 0;
      let n3 = initialN;
      let bias = initialBias;
      let basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (let j2 = 0; j2 < basic; ++j2) {
        if (input.charCodeAt(j2) >= 128) {
          error("not-basic");
        }
        output.push(input.charCodeAt(j2));
      }
      for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
        const oldi = i4;
        for (let w2 = 1, k3 = base; ; k3 += base) {
          if (index >= inputLength) {
            error("invalid-input");
          }
          const digit = basicToDigit(input.charCodeAt(index++));
          if (digit >= base) {
            error("invalid-input");
          }
          if (digit > floor((maxInt - i4) / w2)) {
            error("overflow");
          }
          i4 += digit * w2;
          const t2 = k3 <= bias ? tMin : k3 >= bias + tMax ? tMax : k3 - bias;
          if (digit < t2) {
            break;
          }
          const baseMinusT = base - t2;
          if (w2 > floor(maxInt / baseMinusT)) {
            error("overflow");
          }
          w2 *= baseMinusT;
        }
        const out = output.length + 1;
        bias = adapt(i4 - oldi, out, oldi == 0);
        if (floor(i4 / out) > maxInt - n3) {
          error("overflow");
        }
        n3 += floor(i4 / out);
        i4 %= out;
        output.splice(i4++, 0, n3);
      }
      return String.fromCodePoint(...output);
    };
    encode = function(input) {
      const output = [];
      input = ucs2decode(input);
      const inputLength = input.length;
      let n3 = initialN;
      let delta = 0;
      let bias = initialBias;
      for (const currentValue of input) {
        if (currentValue < 128) {
          output.push(stringFromCharCode(currentValue));
        }
      }
      const basicLength = output.length;
      let handledCPCount = basicLength;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        let m5 = maxInt;
        for (const currentValue of input) {
          if (currentValue >= n3 && currentValue < m5) {
            m5 = currentValue;
          }
        }
        const handledCPCountPlusOne = handledCPCount + 1;
        if (m5 - n3 > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error("overflow");
        }
        delta += (m5 - n3) * handledCPCountPlusOne;
        n3 = m5;
        for (const currentValue of input) {
          if (currentValue < n3 && ++delta > maxInt) {
            error("overflow");
          }
          if (currentValue === n3) {
            let q2 = delta;
            for (let k3 = base; ; k3 += base) {
              const t2 = k3 <= bias ? tMin : k3 >= bias + tMax ? tMax : k3 - bias;
              if (q2 < t2) {
                break;
              }
              const qMinusT = q2 - t2;
              const baseMinusT = base - t2;
              output.push(
                stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0))
              );
              q2 = floor(qMinusT / baseMinusT);
            }
            output.push(stringFromCharCode(digitToBasic(q2, 0)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }
        ++delta;
        ++n3;
      }
      return output.join("");
    };
    toUnicode = function(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
      });
    };
    toASCII = function(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
      });
    };
    punycode = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      "version": "2.1.0",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      "ucs2": {
        "decode": ucs2decode,
        "encode": ucs2encode
      },
      "decode": decode,
      "encode": encode,
      "toASCII": toASCII,
      "toUnicode": toUnicode
    };
    punycode_es6_default = punycode;
  }
});

// node_modules/markdown-it/lib/presets/default.js
var require_default = __commonJS({
  "node_modules/markdown-it/lib/presets/default.js"(exports, module) {
    "use strict";
    module.exports = {
      options: {
        html: false,
        // Enable HTML tags in source
        xhtmlOut: false,
        // Use '/' to close single tags (<br />)
        breaks: false,
        // Convert '\n' in paragraphs into <br>
        langPrefix: "language-",
        // CSS language prefix for fenced blocks
        linkify: false,
        // autoconvert URL-like texts to links
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "“”‘’",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        maxNesting: 100
        // Internal protection, recursion limit
      },
      components: {
        core: {},
        block: {},
        inline: {}
      }
    };
  }
});

// node_modules/markdown-it/lib/presets/zero.js
var require_zero = __commonJS({
  "node_modules/markdown-it/lib/presets/zero.js"(exports, module) {
    "use strict";
    module.exports = {
      options: {
        html: false,
        // Enable HTML tags in source
        xhtmlOut: false,
        // Use '/' to close single tags (<br />)
        breaks: false,
        // Convert '\n' in paragraphs into <br>
        langPrefix: "language-",
        // CSS language prefix for fenced blocks
        linkify: false,
        // autoconvert URL-like texts to links
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "“”‘’",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        maxNesting: 20
        // Internal protection, recursion limit
      },
      components: {
        core: {
          rules: [
            "normalize",
            "block",
            "inline",
            "text_join"
          ]
        },
        block: {
          rules: [
            "paragraph"
          ]
        },
        inline: {
          rules: [
            "text"
          ],
          rules2: [
            "balance_pairs",
            "fragments_join"
          ]
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/presets/commonmark.js
var require_commonmark = __commonJS({
  "node_modules/markdown-it/lib/presets/commonmark.js"(exports, module) {
    "use strict";
    module.exports = {
      options: {
        html: true,
        // Enable HTML tags in source
        xhtmlOut: true,
        // Use '/' to close single tags (<br />)
        breaks: false,
        // Convert '\n' in paragraphs into <br>
        langPrefix: "language-",
        // CSS language prefix for fenced blocks
        linkify: false,
        // autoconvert URL-like texts to links
        // Enable some language-neutral replacements + quotes beautification
        typographer: false,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: "“”‘’",
        /* “”‘’ */
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externaly.
        // If result starts with <pre... internal wrapper is skipped.
        //
        // function (/*str, lang*/) { return ''; }
        //
        highlight: null,
        maxNesting: 20
        // Internal protection, recursion limit
      },
      components: {
        core: {
          rules: [
            "normalize",
            "block",
            "inline",
            "text_join"
          ]
        },
        block: {
          rules: [
            "blockquote",
            "code",
            "fence",
            "heading",
            "hr",
            "html_block",
            "lheading",
            "list",
            "reference",
            "paragraph"
          ]
        },
        inline: {
          rules: [
            "autolink",
            "backticks",
            "emphasis",
            "entity",
            "escape",
            "html_inline",
            "image",
            "link",
            "newline",
            "text"
          ],
          rules2: [
            "balance_pairs",
            "emphasis",
            "fragments_join"
          ]
        }
      }
    };
  }
});

// node_modules/markdown-it/lib/index.js
var require_lib = __commonJS({
  "node_modules/markdown-it/lib/index.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var helpers = require_helpers();
    var Renderer = require_renderer();
    var ParserCore = require_parser_core();
    var ParserBlock = require_parser_block();
    var ParserInline = require_parser_inline();
    var LinkifyIt = require_linkify_it();
    var mdurl = require_mdurl();
    var punycode2 = (init_punycode_es6(), __toCommonJS(punycode_es6_exports));
    var config = {
      default: require_default(),
      zero: require_zero(),
      commonmark: require_commonmark()
    };
    var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
    var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
    function validateLink(url) {
      var str = url.trim().toLowerCase();
      return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) ? true : false : true;
    }
    var RECODE_HOSTNAME_FOR = ["http:", "https:", "mailto:"];
    function normalizeLink(url) {
      var parsed = mdurl.parse(url, true);
      if (parsed.hostname) {
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode2.toASCII(parsed.hostname);
          } catch (er) {
          }
        }
      }
      return mdurl.encode(mdurl.format(parsed));
    }
    function normalizeLinkText(url) {
      var parsed = mdurl.parse(url, true);
      if (parsed.hostname) {
        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
          try {
            parsed.hostname = punycode2.toUnicode(parsed.hostname);
          } catch (er) {
          }
        }
      }
      return mdurl.decode(mdurl.format(parsed), mdurl.decode.defaultChars + "%");
    }
    function MarkdownIt(presetName, options) {
      if (!(this instanceof MarkdownIt)) {
        return new MarkdownIt(presetName, options);
      }
      if (!options) {
        if (!utils.isString(presetName)) {
          options = presetName || {};
          presetName = "default";
        }
      }
      this.inline = new ParserInline();
      this.block = new ParserBlock();
      this.core = new ParserCore();
      this.renderer = new Renderer();
      this.linkify = new LinkifyIt();
      this.validateLink = validateLink;
      this.normalizeLink = normalizeLink;
      this.normalizeLinkText = normalizeLinkText;
      this.utils = utils;
      this.helpers = utils.assign({}, helpers);
      this.options = {};
      this.configure(presetName);
      if (options) {
        this.set(options);
      }
    }
    MarkdownIt.prototype.set = function(options) {
      utils.assign(this.options, options);
      return this;
    };
    MarkdownIt.prototype.configure = function(presets) {
      var self = this, presetName;
      if (utils.isString(presets)) {
        presetName = presets;
        presets = config[presetName];
        if (!presets) {
          throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
        }
      }
      if (!presets) {
        throw new Error("Wrong `markdown-it` preset, can't be empty");
      }
      if (presets.options) {
        self.set(presets.options);
      }
      if (presets.components) {
        Object.keys(presets.components).forEach(function(name) {
          if (presets.components[name].rules) {
            self[name].ruler.enableOnly(presets.components[name].rules);
          }
          if (presets.components[name].rules2) {
            self[name].ruler2.enableOnly(presets.components[name].rules2);
          }
        });
      }
      return this;
    };
    MarkdownIt.prototype.enable = function(list, ignoreInvalid) {
      var result = [];
      if (!Array.isArray(list)) {
        list = [list];
      }
      ["core", "block", "inline"].forEach(function(chain) {
        result = result.concat(this[chain].ruler.enable(list, true));
      }, this);
      result = result.concat(this.inline.ruler2.enable(list, true));
      var missed = list.filter(function(name) {
        return result.indexOf(name) < 0;
      });
      if (missed.length && !ignoreInvalid) {
        throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + missed);
      }
      return this;
    };
    MarkdownIt.prototype.disable = function(list, ignoreInvalid) {
      var result = [];
      if (!Array.isArray(list)) {
        list = [list];
      }
      ["core", "block", "inline"].forEach(function(chain) {
        result = result.concat(this[chain].ruler.disable(list, true));
      }, this);
      result = result.concat(this.inline.ruler2.disable(list, true));
      var missed = list.filter(function(name) {
        return result.indexOf(name) < 0;
      });
      if (missed.length && !ignoreInvalid) {
        throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + missed);
      }
      return this;
    };
    MarkdownIt.prototype.use = function(plugin) {
      var args = [this].concat(Array.prototype.slice.call(arguments, 1));
      plugin.apply(plugin, args);
      return this;
    };
    MarkdownIt.prototype.parse = function(src, env) {
      if (typeof src !== "string") {
        throw new Error("Input data should be a String");
      }
      var state = new this.core.State(src, this, env);
      this.core.process(state);
      return state.tokens;
    };
    MarkdownIt.prototype.render = function(src, env) {
      env = env || {};
      return this.renderer.render(this.parse(src, env), this.options, env);
    };
    MarkdownIt.prototype.parseInline = function(src, env) {
      var state = new this.core.State(src, this, env);
      state.inlineMode = true;
      this.core.process(state);
      return state.tokens;
    };
    MarkdownIt.prototype.renderInline = function(src, env) {
      env = env || {};
      return this.renderer.render(this.parseInline(src, env), this.options, env);
    };
    module.exports = MarkdownIt;
  }
});

// node_modules/markdown-it/index.js
var require_markdown_it = __commonJS({
  "node_modules/markdown-it/index.js"(exports, module) {
    "use strict";
    module.exports = require_lib();
  }
});

// node_modules/markdown-it-task-lists/index.js
var require_markdown_it_task_lists = __commonJS({
  "node_modules/markdown-it-task-lists/index.js"(exports, module) {
    var disableCheckboxes = true;
    var useLabelWrapper = false;
    var useLabelAfter = false;
    module.exports = function(md, options) {
      if (options) {
        disableCheckboxes = !options.enabled;
        useLabelWrapper = !!options.label;
        useLabelAfter = !!options.labelAfter;
      }
      md.core.ruler.after("inline", "github-task-lists", function(state) {
        var tokens = state.tokens;
        for (var i4 = 2; i4 < tokens.length; i4++) {
          if (isTodoItem(tokens, i4)) {
            todoify(tokens[i4], state.Token);
            attrSet(tokens[i4 - 2], "class", "task-list-item" + (!disableCheckboxes ? " enabled" : ""));
            attrSet(tokens[parentToken(tokens, i4 - 2)], "class", "contains-task-list");
          }
        }
      });
    };
    function attrSet(token, name, value) {
      var index = token.attrIndex(name);
      var attr = [name, value];
      if (index < 0) {
        token.attrPush(attr);
      } else {
        token.attrs[index] = attr;
      }
    }
    function parentToken(tokens, index) {
      var targetLevel = tokens[index].level - 1;
      for (var i4 = index - 1; i4 >= 0; i4--) {
        if (tokens[i4].level === targetLevel) {
          return i4;
        }
      }
      return -1;
    }
    function isTodoItem(tokens, index) {
      return isInline(tokens[index]) && isParagraph(tokens[index - 1]) && isListItem(tokens[index - 2]) && startsWithTodoMarkdown(tokens[index]);
    }
    function todoify(token, TokenConstructor) {
      token.children.unshift(makeCheckbox(token, TokenConstructor));
      token.children[1].content = token.children[1].content.slice(3);
      token.content = token.content.slice(3);
      if (useLabelWrapper) {
        if (useLabelAfter) {
          token.children.pop();
          var id = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
          token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">';
          token.children.push(afterLabel(token.content, id, TokenConstructor));
        } else {
          token.children.unshift(beginLabel(TokenConstructor));
          token.children.push(endLabel(TokenConstructor));
        }
      }
    }
    function makeCheckbox(token, TokenConstructor) {
      var checkbox = new TokenConstructor("html_inline", "", 0);
      var disabledAttr = disableCheckboxes ? ' disabled="" ' : "";
      if (token.content.indexOf("[ ] ") === 0) {
        checkbox.content = '<input class="task-list-item-checkbox"' + disabledAttr + 'type="checkbox">';
      } else if (token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0) {
        checkbox.content = '<input class="task-list-item-checkbox" checked=""' + disabledAttr + 'type="checkbox">';
      }
      return checkbox;
    }
    function beginLabel(TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = "<label>";
      return token;
    }
    function endLabel(TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = "</label>";
      return token;
    }
    function afterLabel(content, id, TokenConstructor) {
      var token = new TokenConstructor("html_inline", "", 0);
      token.content = '<label class="task-list-item-label" for="' + id + '">' + content + "</label>";
      token.attrs = [{ for: id }];
      return token;
    }
    function isInline(token) {
      return token.type === "inline";
    }
    function isParagraph(token) {
      return token.type === "paragraph_open";
    }
    function isListItem(token) {
      return token.type === "list_item_open";
    }
    function startsWithTodoMarkdown(token) {
      return token.content.indexOf("[ ] ") === 0 || token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0;
    }
  }
});

// node_modules/md-editor-v3/lib/es/MdEditor.mjs
init_vue_runtime_esm_bundler();

// node_modules/md-editor-v3/lib/es/chunks/config.mjs
var a = "md-editor";
var o = "md-editor-v3";
var r = "https://at.alicdn.com/t/c/font_2605852_u82y61ve02.js";
var n = "https://at.alicdn.com/t/c/font_2605852_qm4cjcggwma.css";
var e = "https://cdnjs.cloudflare.com/ajax/libs";
var c = `${e}/highlight.js/11.7.0/highlight.min.js`;
var d = {
  main: `${e}/prettier/2.8.0/standalone.js`,
  markdown: `${e}/prettier/2.8.0/parser-markdown.js`
};
var h2 = {
  css: `${e}/cropperjs/1.5.13/cropper.min.css`,
  js: `${e}/cropperjs/1.5.13/cropper.min.js`
};
var g = `${e}/screenfull.js/5.2.0/screenfull.min.js`;
var m = [
  "bold",
  "underline",
  "italic",
  "strikeThrough",
  "-",
  "title",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "task",
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "mermaid",
  "katex",
  "-",
  "revoke",
  "next",
  "save",
  "=",
  "prettier",
  "pageFullscreen",
  "fullscreen",
  "preview",
  "htmlPreview",
  "catalog",
  "github"
];
var p = ["markdownTotal", "=", "scrollSwitch"];
var u = {
  "zh-CN": {
    toolbarTips: {
      bold: "加粗",
      underline: "下划线",
      italic: "斜体",
      strikeThrough: "删除线",
      title: "标题",
      sub: "下标",
      sup: "上标",
      quote: "引用",
      unorderedList: "无序列表",
      orderedList: "有序列表",
      task: "任务列表",
      codeRow: "行内代码",
      code: "块级代码",
      link: "链接",
      image: "图片",
      table: "表格",
      mermaid: "mermaid图",
      katex: "katex公式",
      revoke: "后退",
      next: "前进",
      save: "保存",
      prettier: "美化",
      pageFullscreen: "浏览器全屏",
      fullscreen: "屏幕全屏",
      preview: "预览",
      htmlPreview: "html代码预览",
      catalog: "目录",
      github: "源码地址"
    },
    titleItem: {
      h1: "一级标题",
      h2: "二级标题",
      h3: "三级标题",
      h4: "四级标题",
      h5: "五级标题",
      h6: "六级标题"
    },
    imgTitleItem: {
      link: "添加链接",
      upload: "上传图片",
      clip2upload: "裁剪上传"
    },
    linkModalTips: {
      linkTitle: "添加链接",
      imageTitle: "添加图片",
      descLabel: "链接描述：",
      descLabelPlaceHolder: "请输入描述...",
      urlLabel: "链接地址：",
      urlLabelPlaceHolder: "请输入链接...",
      buttonOK: "确定"
    },
    clipModalTips: {
      title: "裁剪图片上传",
      buttonUpload: "上传"
    },
    copyCode: {
      text: "复制代码",
      successTips: "已复制！",
      failTips: "复制失败！"
    },
    mermaid: {
      flow: "流程图",
      sequence: "时序图",
      gantt: "甘特图",
      class: "类图",
      state: "状态图",
      pie: "饼图",
      relationship: "关系图",
      journey: "旅程图"
    },
    katex: {
      inline: "行内公式",
      block: "块级公式"
    },
    footer: {
      markdownTotal: "字数",
      scrollAuto: "同步滚动"
    }
  },
  "en-US": {
    toolbarTips: {
      bold: "bold",
      underline: "underline",
      italic: "italic",
      strikeThrough: "strikeThrough",
      title: "title",
      sub: "subscript",
      sup: "superscript",
      quote: "quote",
      unorderedList: "unordered list",
      orderedList: "ordered list",
      task: "task list",
      codeRow: "inline code",
      code: "block-level code",
      link: "link",
      image: "image",
      table: "table",
      mermaid: "mermaid",
      katex: "formula",
      revoke: "revoke",
      next: "undo revoke",
      save: "save",
      prettier: "prettier",
      pageFullscreen: "fullscreen in page",
      fullscreen: "fullscreen",
      preview: "preview",
      htmlPreview: "html preview",
      catalog: "catalog",
      github: "source code"
    },
    titleItem: {
      h1: "Lv1 Heading",
      h2: "Lv2 Heading",
      h3: "Lv3 Heading",
      h4: "Lv4 Heading",
      h5: "Lv5 Heading",
      h6: "Lv6 Heading"
    },
    imgTitleItem: {
      link: "Add Img Link",
      upload: "Upload Img",
      clip2upload: "Clip Upload"
    },
    linkModalTips: {
      linkTitle: "Add Link",
      imageTitle: "Add Image",
      descLabel: "Desc:",
      descLabelPlaceHolder: "Enter a description...",
      urlLabel: "Link:",
      urlLabelPlaceHolder: "Enter a link...",
      buttonOK: "OK"
    },
    clipModalTips: {
      title: "Crop Image",
      buttonUpload: "Upload"
    },
    copyCode: {
      text: "Copy",
      successTips: "Copied!",
      failTips: "Copy failed!"
    },
    mermaid: {
      flow: "flow",
      sequence: "sequence",
      gantt: "gantt",
      class: "class",
      state: "state",
      pie: "pie",
      relationship: "relationship",
      journey: "journey"
    },
    katex: {
      inline: "inline",
      block: "block"
    },
    footer: {
      markdownTotal: "Word Count",
      scrollAuto: "Scroll Auto"
    }
  }
};
var k = `${e}/mermaid/10.1.0/mermaid.esm.min.mjs`;
var b = {
  js: `${e}/KaTeX/0.16.3/katex.min.js`,
  css: `${e}/KaTeX/0.16.3/katex.min.css`
};
var f = {
  a11y: {
    light: `${e}/highlight.js/11.7.0/styles/a11y-light.min.css`,
    dark: `${e}/highlight.js/11.7.0/styles/a11y-dark.min.css`
  },
  atom: {
    light: `${e}/highlight.js/11.7.0/styles/atom-one-light.min.css`,
    dark: `${e}/highlight.js/11.7.0/styles/atom-one-dark.min.css`
  },
  github: {
    light: `${e}/highlight.js/11.7.0/styles/github.min.css`,
    dark: `${e}/highlight.js/11.7.0/styles/github-dark.min.css`
  },
  gradient: {
    light: `${e}/highlight.js/11.7.0/styles/gradient-light.min.css`,
    dark: `${e}/highlight.js/11.7.0/styles/gradient-dark.min.css`
  },
  kimbie: {
    light: `${e}/highlight.js/11.7.0/styles/kimbie-light.min.css`,
    dark: `${e}/highlight.js/11.7.0/styles/kimbie-dark.min.css`
  },
  paraiso: {
    light: `${e}/highlight.js/11.7.0/styles/paraiso-light.min.css`,
    dark: `${e}/highlight.js/11.7.0/styles/paraiso-dark.min.css`
  },
  qtcreator: {
    light: `${e}/highlight.js/11.7.0/styles/qtcreator-light.min.css`,
    dark: `${e}/highlight.js/11.7.0/styles/qtcreator-dark.min.css`
  },
  stackoverflow: {
    light: `${e}/highlight.js/11.7.0/styles/stackoverflow-light.min.css`,
    dark: `${e}/highlight.js/11.7.0/styles/stackoverflow-dark.min.css`
  }
};
var l = {
  editorExtensions: {},
  editorConfig: {},
  codeMirrorExtensions: (t2, i4) => i4,
  markdownItConfig: () => {
  },
  markdownItPlugins: (t2) => t2,
  iconfontType: "svg"
};
var j = (t2) => {
  if (t2)
    for (const i4 in t2) {
      const s2 = t2[i4];
      s2 && (l[i4] = s2);
    }
};

// node_modules/@vavt/util/lib/es/index.mjs
var M = (e4, n3 = 200) => {
  let t2 = 0;
  return (...o2) => new Promise((r4) => {
    t2 && (clearTimeout(t2), r4("cancel")), t2 = window.setTimeout(() => {
      e4.apply(void 0, o2), t2 = 0, r4("done");
    }, n3);
  });
};
var x = (e4, n3 = {
  _blank: true,
  nofollow: true
}) => {
  const t2 = document.createElement("a");
  t2.href = e4, n3._blank && (t2.target = "_blank"), n3.nofollow && (t2.rel = "noopener noreferrer"), t2.click();
};
var T = () => {
  let e4 = -1;
  return (t2, o2, r4, c2 = 100) => {
    const s2 = () => {
      r4 && (typeof c2 == "number" ? setTimeout(r4, c2) : r4());
    };
    e4 !== -1 && (cancelAnimationFrame(e4), s2());
    let i4 = t2.scrollTop;
    const l2 = () => {
      e4 = -1;
      const u2 = o2 - i4;
      i4 = i4 + u2 / 5, Math.abs(u2) < 1 ? (t2.scrollTo(0, o2), s2()) : (t2.scrollTo(0, i4), e4 = requestAnimationFrame(l2));
    };
    e4 = requestAnimationFrame(l2);
  };
};
var R = T();
var L = (e4, n3 = 200) => {
  let t2 = 0, o2 = null;
  return (...r4) => {
    const c2 = (s2) => {
      t2 === 0 && (t2 = s2), s2 - t2 >= n3 ? (e4.apply(void 0, o2), o2 = null, t2 = 0) : window.requestAnimationFrame(c2);
    };
    o2 === null && window.requestAnimationFrame(c2), o2 = r4;
  };
};
var _ = (e4) => {
  const n3 = (t2) => {
    const { scrollHeight: o2, scrollWidth: r4, offsetHeight: c2, offsetWidth: s2, scrollLeft: i4, scrollTop: l2 } = e4, u2 = t2.x, w2 = t2.y, p3 = (g4) => {
      const f3 = l2 + w2 - g4.y, m5 = i4 + u2 - g4.x, S2 = o2 - c2, y2 = r4 - s2, d3 = {};
      m5 >= 0 && m5 <= y2 && (d3.left = m5), f3 >= 0 && f3 <= S2 && (d3.top = f3), e4.scroll(d3);
    };
    document.addEventListener("mousemove", p3);
    const v = () => {
      document.removeEventListener("mousemove", p3), document.removeEventListener("mouseup", v);
    };
    document.addEventListener("mouseup", v);
  };
  return e4.addEventListener("mousedown", n3), () => {
    e4.removeEventListener("mousedown", n3);
  };
};

// node_modules/md-editor-v3/lib/es/chunks/index2.mjs
init_vue_runtime_esm_bundler();

// node_modules/md-editor-v3/lib/es/chunks/vue-tsx.mjs
var s = ({
  instance: o2,
  ctx: l2,
  props: t2 = {}
}, r4 = "default") => {
  const g4 = (o2 == null ? void 0 : o2.$slots[r4]) || (l2 == null ? void 0 : l2.slots[r4]);
  return (g4 ? g4(o2) : "") || t2[r4];
};

// node_modules/md-editor-v3/lib/es/chunks/index2.mjs
var B = {
  overlay: {
    type: [String, Object],
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function,
    default: () => {
    }
  },
  // 相对滚动的元素选择器
  relative: {
    type: String,
    default: "html"
  }
};
var F = defineComponent({
  props: B,
  setup(e4, a2) {
    const i4 = `${a}-dropdown-hidden`, t2 = reactive({
      overlayClass: [i4],
      overlayStyle: {},
      triggerHover: false,
      overlayHover: false
    }), o2 = ref(), n3 = ref(), s2 = () => {
      var p3;
      t2.triggerHover = true;
      const r4 = o2.value, l2 = n3.value;
      if (!r4 || !l2)
        return;
      const u2 = r4.getBoundingClientRect(), f3 = r4.offsetTop, b4 = r4.offsetLeft, H2 = u2.height, L4 = u2.width, w2 = ((p3 = document.querySelector(e4.relative)) == null ? void 0 : p3.scrollLeft) || 0;
      t2.overlayStyle = {
        ...t2.overlayStyle,
        top: f3 + H2 + "px",
        left: b4 - l2.offsetWidth / 2 + L4 / 2 - w2 + "px"
      }, e4.onChange(true);
    }, m5 = () => {
      t2.overlayHover = true;
    };
    watch(() => e4.visible, (r4) => {
      r4 ? t2.overlayClass = t2.overlayClass.filter((l2) => l2 !== i4) : t2.overlayClass.push(i4);
    });
    let h6 = -1;
    const g4 = (r4) => {
      o2.value === r4.target ? t2.triggerHover = false : t2.overlayHover = false, clearTimeout(h6), h6 = window.setTimeout(() => {
        !t2.overlayHover && !t2.triggerHover && e4.onChange(false);
      }, 10);
    };
    return onMounted(() => {
      o2.value.addEventListener("mouseenter", s2), o2.value.addEventListener("mouseleave", g4), n3.value.addEventListener("mouseenter", m5), n3.value.addEventListener("mouseleave", g4);
    }), onBeforeUnmount(() => {
      o2.value.removeEventListener("mouseenter", s2), o2.value.removeEventListener("mouseleave", g4), n3.value.removeEventListener("mouseenter", m5), n3.value.removeEventListener("mouseleave", g4);
    }), () => {
      const r4 = s({
        ctx: a2
      }), l2 = s({
        props: e4,
        ctx: a2
      }, "overlay"), u2 = cloneVNode(r4 instanceof Array ? r4[0] : r4, {
        ref: o2
      }), f3 = createVNode("div", {
        class: [`${a}-dropdown`, t2.overlayClass],
        style: t2.overlayStyle,
        ref: n3
      }, [createVNode("div", {
        class: `${a}-dropdown-overlay`
      }, [l2 instanceof Array ? l2[0] : l2])]);
      return [u2, f3];
    };
  }
});
var I = {
  title: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onChange: {
    type: Function
  },
  // 下拉框中的内容
  overlay: {
    type: [String, Object]
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function
  },
  language: {
    type: String
  },
  theme: {
    type: String
  },
  /**
   * ==结束
   */
  default: {
    type: [String, Object]
  }
};
var y = defineComponent({
  name: "DropdownToolbar",
  props: I,
  emits: ["onChange"],
  setup(e4, a2) {
    const i4 = inject("editorId");
    return () => {
      const t2 = s({
        props: e4,
        ctx: a2
      }, "trigger"), o2 = s({
        props: e4,
        ctx: a2
      }, "overlay"), n3 = s({
        props: e4,
        ctx: a2
      });
      return createVNode(F, {
        relative: `#${i4}-toolbar-wrapper`,
        visible: e4.visible,
        onChange: (s2) => {
          e4.onChange instanceof Function ? e4.onChange(s2) : a2.emit("onChange", s2);
        },
        overlay: o2
      }, {
        default: () => [createVNode("div", {
          class: `${a}-toolbar-item`,
          title: e4.title || ""
        }, [t2, n3])]
      });
    };
  }
});
y.install = (e4) => (e4.component(y.name, y), e4);

// node_modules/md-editor-v3/lib/es/chunks/index3.mjs
var r2 = Object.defineProperty;
var p2 = (o2, s2, t2) => s2 in o2 ? r2(o2, s2, { enumerable: true, configurable: true, writable: true, value: t2 }) : o2[s2] = t2;
var i = (o2, s2, t2) => (p2(o2, typeof s2 != "symbol" ? s2 + "" : s2, t2), t2);
var h3 = class {
  constructor() {
    i(this, "pools", {});
  }
  // 移除事件监听
  remove(s2, t2, n3) {
    const a2 = this.pools[s2] && this.pools[s2][t2];
    a2 && (this.pools[s2][t2] = a2.filter((e4) => e4 !== n3));
  }
  // 清空全部事件，由于单一实例，多次注册会被共享内容
  clear(s2) {
    this.pools[s2] = {};
  }
  // 注册事件监听
  on(s2, t2) {
    return this.pools[s2] || (this.pools[s2] = {}), this.pools[s2][t2.name] || (this.pools[s2][t2.name] = []), this.pools[s2][t2.name].push(t2.callback), this.pools[s2][t2.name].includes(t2.callback);
  }
  // 触发事件
  emit(s2, t2, ...n3) {
    this.pools[s2] || (this.pools[s2] = {});
    const a2 = this.pools[s2][t2];
    a2 && a2.forEach((e4) => {
      try {
        e4(...n3);
      } catch (c2) {
        console.error(`${t2} monitor event exception！`, c2);
      }
    });
  }
};
var C = new h3();
var E = "onSave";
var g2 = "changeCatalogVisible";
var A = "changeFullscreen";
var R2 = "pageFullscreenChanged";
var _2 = "fullscreenChanged";
var d2 = "previewChanged";
var L2 = "htmlPreviewChanged";
var N = "catalogVisibleChanged";
var f2 = "textareaFocus";
var S = "buildFinished";
var b2 = "errorCatcher";
var G = "replace";
var H = "uploadImage";
var T2 = "openModals";
var F2 = "ctrlZ";
var m2 = "ctrlShiftZ";
var I2 = "catalogChanged";
var D = "pushCatalog";
var O = (o2, s2 = "image.png") => {
  const t2 = o2.split(","), n3 = t2[0].match(/:(.*?);/);
  if (n3) {
    const l2 = n3[1], a2 = atob(t2[1]);
    let e4 = a2.length;
    const c2 = new Uint8Array(e4);
    for (; e4--; )
      c2[e4] = a2.charCodeAt(e4);
    return new File([c2], s2, { type: l2 });
  }
  return null;
};
var w = (o2) => {
  if (!o2)
    return o2;
  const s2 = o2.split(`
`), t2 = ['<span rn-wrapper aria-hidden="true">'];
  return s2.forEach(() => {
    t2.push("<span></span>");
  }), t2.push("</span>"), `<span class="code-block">${o2}</span>${t2.join("")}`;
};
var P = (o2, s2) => {
  if (!o2 || !s2)
    return 0;
  const t2 = o2 == null ? void 0 : o2.getBoundingClientRect();
  if (s2 === document.documentElement)
    return t2.top - s2.clientTop;
  const n3 = s2 == null ? void 0 : s2.getBoundingClientRect();
  return t2.top - n3.top;
};
var U = () => `${Date.now().toString(36)}${Math.random().toString(36).substring(2)}`;

// node_modules/md-editor-v3/lib/es/chunks/dom.mjs
var L3 = (e4, d3) => {
  const t2 = (n3) => {
    const o2 = e4.parentElement || document.body, i4 = o2.offsetWidth, m5 = o2.offsetHeight, { clientWidth: u2 } = document.documentElement, { clientHeight: l2 } = document.documentElement, p3 = n3.offsetX, v = n3.offsetY, a2 = (f3) => {
      let s2 = f3.x + document.body.scrollLeft - document.body.clientLeft - p3, c2 = f3.y + document.body.scrollTop - document.body.clientTop - v;
      s2 = s2 < 1 ? 1 : s2 < u2 - i4 - 1 ? s2 : u2 - i4 - 1, c2 = c2 < 1 ? 1 : c2 < l2 - m5 - 1 ? c2 : l2 - m5 - 1, d3 ? d3(s2, c2) : (o2.style.left = `${s2}px`, o2.style.top = `${c2}px`);
    };
    document.addEventListener("mousemove", a2);
    const r4 = () => {
      document.removeEventListener("mousemove", a2), document.removeEventListener("mouseup", r4);
    };
    document.addEventListener("mouseup", r4);
  };
  return e4.addEventListener("mousedown", t2), () => {
    e4.removeEventListener("mousedown", t2);
  };
};
var h4 = (e4, d3 = "") => {
  const t2 = document.getElementById(e4.id), n3 = e4.onload;
  e4.onload = null;
  const o2 = function(i4) {
    typeof n3 == "function" && n3.bind(this)(i4), e4.removeEventListener("load", o2);
  };
  t2 ? d3 !== "" && (t2.addEventListener("load", o2), Reflect.get(window, d3) && t2.dispatchEvent(new Event("load"))) : (e4.addEventListener("load", o2), document.head.appendChild(e4));
};
var b3 = M((e4, d3, t2) => {
  const n3 = document.getElementById(e4);
  n3 && n3.setAttribute(d3, t2);
}, 10);

// node_modules/md-editor-v3/lib/es/chunks/index.mjs
init_vue_runtime_esm_bundler();
var T3 = defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(e4) {
    return () => l.iconfontType === "svg" ? createVNode("svg", {
      class: `${a}-icon`,
      "aria-hidden": "true"
    }, [createVNode("use", {
      "xlink:href": `#${a}-icon-${e4.name}`
    }, null)]) : createVNode("i", {
      class: `${a}-iconfont ${a}-icon-${e4.name}`
    }, null);
  }
});
var C2 = defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(e4) {
    const c2 = inject("customIcon");
    return () => {
      const i4 = c2.value[e4.name];
      return typeof i4 == "object" ? typeof i4.component == "object" ? h(i4.component, i4.props) : createVNode("span", {
        innerHTML: i4.component
      }, null) : createVNode(T3, {
        name: e4.name
      }, null);
    };
  }
});
var z = {
  title: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  onClose: {
    type: Function
  },
  showAdjust: {
    type: Boolean,
    default: false
  },
  isFullscreen: {
    type: Boolean,
    default: false
  },
  onAdjust: {
    type: Function,
    default: () => {
    }
  }
};
var h5 = defineComponent({
  name: "MdModal",
  props: z,
  emits: ["onClose"],
  setup(e4, c2) {
    const i4 = ref(e4.visible), a2 = ref([`${a}-modal`]), m5 = ref(), r4 = ref();
    let d3 = () => {
    };
    const o2 = reactive({
      initPos: {
        left: "0px",
        top: "0px"
      },
      historyPos: {
        left: "0px",
        top: "0px"
      }
    }), P3 = computed(() => e4.isFullscreen ? {
      width: "100%",
      height: "100%"
    } : {
      width: e4.width,
      height: e4.height
    });
    return onMounted(() => {
      d3 = L3(r4.value, (s2, n3) => {
        o2.initPos.left = s2 + "px", o2.initPos.top = n3 + "px";
      });
    }), onBeforeUnmount(() => {
      d3();
    }), watch(() => e4.isFullscreen, (s2) => {
      s2 ? d3() : d3 = L3(r4.value, (n3, u2) => {
        o2.initPos.left = n3 + "px", o2.initPos.top = u2 + "px";
      });
    }), watch(() => e4.visible, (s2) => {
      s2 ? (a2.value.push("zoom-in"), i4.value = s2, nextTick(() => {
        const n3 = m5.value.offsetWidth / 2, u2 = m5.value.offsetHeight / 2, $ = document.documentElement.clientWidth / 2, x3 = document.documentElement.clientHeight / 2;
        o2.initPos.left = $ - n3 + "px", o2.initPos.top = x3 - u2 + "px";
      }), setTimeout(() => {
        a2.value = a2.value.filter((n3) => n3 !== "zoom-in");
      }, 140)) : (a2.value.push("zoom-out"), setTimeout(() => {
        a2.value = a2.value.filter((n3) => n3 !== "zoom-out"), i4.value = s2;
      }, 130));
    }), () => {
      const s2 = s({
        ctx: c2
      }), n3 = s({
        props: e4,
        ctx: c2
      }, "title");
      return createVNode("div", {
        style: {
          display: i4.value ? "block" : "none"
        }
      }, [createVNode("div", {
        class: `${a}-modal-mask`,
        onClick: () => {
          e4.onClose ? e4.onClose() : c2.emit("onClose");
        }
      }, null), createVNode("div", {
        class: a2.value,
        style: {
          ...o2.initPos,
          ...P3.value
        },
        ref: m5
      }, [createVNode("div", {
        class: `${a}-modal-header`,
        ref: r4
      }, [n3 || ""]), createVNode("div", {
        class: `${a}-modal-body`
      }, [s2]), createVNode("div", {
        class: `${a}-modal-func`
      }, [e4.showAdjust && createVNode("div", {
        class: `${a}-modal-adjust`,
        onClick: (u2) => {
          u2.stopPropagation(), e4.isFullscreen ? o2.initPos = o2.historyPos : (o2.historyPos = o2.initPos, o2.initPos = {
            left: "0",
            top: "0"
          }), e4.onAdjust(!e4.isFullscreen);
        }
      }, [createVNode(C2, {
        name: e4.isFullscreen ? "suoxiao" : "fangda"
      }, null)]), createVNode("div", {
        class: `${a}-modal-close`,
        onClick: (u2) => {
          u2.stopPropagation(), e4.onClose ? e4.onClose() : c2.emit("onClose");
        }
      }, [createVNode(C2, {
        name: "close"
      }, null)])])])]);
    };
  }
});
h5.install = (e4) => (e4.component(h5.name, h5), e4);

// node_modules/@codemirror/commands/dist/index.js
var toggleComment = (target) => {
  let { state } = target, line = state.doc.lineAt(state.selection.main.from), config = getConfig(target.state, line.from);
  return config.line ? toggleLineComment(target) : config.block ? toggleBlockCommentByLine(target) : false;
};
function command(f3, option) {
  return ({ state, dispatch }) => {
    if (state.readOnly)
      return false;
    let tr = f3(option, state);
    if (!tr)
      return false;
    dispatch(state.update(tr));
    return true;
  };
}
var toggleLineComment = command(
  changeLineComment,
  0
  /* CommentOption.Toggle */
);
var lineComment = command(
  changeLineComment,
  1
  /* CommentOption.Comment */
);
var lineUncomment = command(
  changeLineComment,
  2
  /* CommentOption.Uncomment */
);
var toggleBlockComment = command(
  changeBlockComment,
  0
  /* CommentOption.Toggle */
);
var blockComment = command(
  changeBlockComment,
  1
  /* CommentOption.Comment */
);
var blockUncomment = command(
  changeBlockComment,
  2
  /* CommentOption.Uncomment */
);
var toggleBlockCommentByLine = command(
  (o2, s2) => changeBlockComment(o2, s2, selectedLineRanges(s2)),
  0
  /* CommentOption.Toggle */
);
function getConfig(state, pos) {
  let data = state.languageDataAt("commentTokens", pos);
  return data.length ? data[0] : {};
}
var SearchMargin = 50;
function findBlockComment(state, { open, close }, from, to2) {
  let textBefore = state.sliceDoc(from - SearchMargin, from);
  let textAfter = state.sliceDoc(to2, to2 + SearchMargin);
  let spaceBefore = /\s*$/.exec(textBefore)[0].length, spaceAfter = /^\s*/.exec(textAfter)[0].length;
  let beforeOff = textBefore.length - spaceBefore;
  if (textBefore.slice(beforeOff - open.length, beforeOff) == open && textAfter.slice(spaceAfter, spaceAfter + close.length) == close) {
    return {
      open: { pos: from - spaceBefore, margin: spaceBefore && 1 },
      close: { pos: to2 + spaceAfter, margin: spaceAfter && 1 }
    };
  }
  let startText, endText;
  if (to2 - from <= 2 * SearchMargin) {
    startText = endText = state.sliceDoc(from, to2);
  } else {
    startText = state.sliceDoc(from, from + SearchMargin);
    endText = state.sliceDoc(to2 - SearchMargin, to2);
  }
  let startSpace = /^\s*/.exec(startText)[0].length, endSpace = /\s*$/.exec(endText)[0].length;
  let endOff = endText.length - endSpace - close.length;
  if (startText.slice(startSpace, startSpace + open.length) == open && endText.slice(endOff, endOff + close.length) == close) {
    return {
      open: {
        pos: from + startSpace + open.length,
        margin: /\s/.test(startText.charAt(startSpace + open.length)) ? 1 : 0
      },
      close: {
        pos: to2 - endSpace - close.length,
        margin: /\s/.test(endText.charAt(endOff - 1)) ? 1 : 0
      }
    };
  }
  return null;
}
function selectedLineRanges(state) {
  let ranges = [];
  for (let r4 of state.selection.ranges) {
    let fromLine = state.doc.lineAt(r4.from);
    let toLine = r4.to <= fromLine.to ? fromLine : state.doc.lineAt(r4.to);
    let last = ranges.length - 1;
    if (last >= 0 && ranges[last].to > fromLine.from)
      ranges[last].to = toLine.to;
    else
      ranges.push({ from: fromLine.from + /^\s*/.exec(fromLine.text)[0].length, to: toLine.to });
  }
  return ranges;
}
function changeBlockComment(option, state, ranges = state.selection.ranges) {
  let tokens = ranges.map((r4) => getConfig(state, r4.from).block);
  if (!tokens.every((c2) => c2))
    return null;
  let comments = ranges.map((r4, i4) => findBlockComment(state, tokens[i4], r4.from, r4.to));
  if (option != 2 && !comments.every((c2) => c2)) {
    return { changes: state.changes(ranges.map((range, i4) => {
      if (comments[i4])
        return [];
      return [{ from: range.from, insert: tokens[i4].open + " " }, { from: range.to, insert: " " + tokens[i4].close }];
    })) };
  } else if (option != 1 && comments.some((c2) => c2)) {
    let changes = [];
    for (let i4 = 0, comment; i4 < comments.length; i4++)
      if (comment = comments[i4]) {
        let token = tokens[i4], { open, close } = comment;
        changes.push({ from: open.pos - token.open.length, to: open.pos + open.margin }, { from: close.pos - close.margin, to: close.pos + token.close.length });
      }
    return { changes };
  }
  return null;
}
function changeLineComment(option, state, ranges = state.selection.ranges) {
  let lines = [];
  let prevLine = -1;
  for (let { from, to: to2 } of ranges) {
    let startI = lines.length, minIndent = 1e9;
    let token = getConfig(state, from).line;
    if (!token)
      continue;
    for (let pos = from; pos <= to2; ) {
      let line = state.doc.lineAt(pos);
      if (line.from > prevLine && (from == to2 || to2 > line.from)) {
        prevLine = line.from;
        let indent = /^\s*/.exec(line.text)[0].length;
        let empty2 = indent == line.length;
        let comment = line.text.slice(indent, indent + token.length) == token ? indent : -1;
        if (indent < line.text.length && indent < minIndent)
          minIndent = indent;
        lines.push({ line, comment, token, indent, empty: empty2, single: false });
      }
      pos = line.to + 1;
    }
    if (minIndent < 1e9) {
      for (let i4 = startI; i4 < lines.length; i4++)
        if (lines[i4].indent < lines[i4].line.text.length)
          lines[i4].indent = minIndent;
    }
    if (lines.length == startI + 1)
      lines[startI].single = true;
  }
  if (option != 2 && lines.some((l2) => l2.comment < 0 && (!l2.empty || l2.single))) {
    let changes = [];
    for (let { line, token, indent, empty: empty2, single } of lines)
      if (single || !empty2)
        changes.push({ from: line.from + indent, insert: token + " " });
    let changeSet = state.changes(changes);
    return { changes: changeSet, selection: state.selection.map(changeSet, 1) };
  } else if (option != 1 && lines.some((l2) => l2.comment >= 0)) {
    let changes = [];
    for (let { line, comment, token } of lines)
      if (comment >= 0) {
        let from = line.from + comment, to2 = from + token.length;
        if (line.text[to2 - line.from] == " ")
          to2++;
        changes.push({ from, to: to2 });
      }
    return { changes };
  }
  return null;
}
var fromHistory = Annotation.define();
var isolateHistory = Annotation.define();
var invertedEffects = Facet.define();
var historyConfig = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (_t, isAdjacent2) => isAdjacent2
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (a2, b4) => (tr, adj) => a2(tr, adj) || b4(tr, adj)
    });
  }
});
function changeEnd(changes) {
  let end = 0;
  changes.iterChangedRanges((_3, to2) => end = to2);
  return end;
}
var historyField_ = StateField.define({
  create() {
    return HistoryState.empty;
  },
  update(state, tr) {
    let config = tr.state.facet(historyConfig);
    let fromHist = tr.annotation(fromHistory);
    if (fromHist) {
      let selection = tr.docChanged ? EditorSelection.single(changeEnd(tr.changes)) : void 0;
      let item = HistEvent.fromTransaction(tr, selection), from = fromHist.side;
      let other = from == 0 ? state.undone : state.done;
      if (item)
        other = updateBranch(other, other.length, config.minDepth, item);
      else
        other = addSelection(other, tr.startState.selection);
      return new HistoryState(from == 0 ? fromHist.rest : other, from == 0 ? other : fromHist.rest);
    }
    let isolate = tr.annotation(isolateHistory);
    if (isolate == "full" || isolate == "before")
      state = state.isolate();
    if (tr.annotation(Transaction.addToHistory) === false)
      return !tr.changes.empty ? state.addMapping(tr.changes.desc) : state;
    let event = HistEvent.fromTransaction(tr);
    let time = tr.annotation(Transaction.time), userEvent = tr.annotation(Transaction.userEvent);
    if (event)
      state = state.addChanges(event, time, userEvent, config, tr);
    else if (tr.selection)
      state = state.addSelection(tr.startState.selection, time, userEvent, config.newGroupDelay);
    if (isolate == "full" || isolate == "after")
      state = state.isolate();
    return state;
  },
  toJSON(value) {
    return { done: value.done.map((e4) => e4.toJSON()), undone: value.undone.map((e4) => e4.toJSON()) };
  },
  fromJSON(json) {
    return new HistoryState(json.done.map(HistEvent.fromJSON), json.undone.map(HistEvent.fromJSON));
  }
});
function history(config = {}) {
  return [
    historyField_,
    historyConfig.of(config),
    EditorView.domEventHandlers({
      beforeinput(e4, view) {
        let command2 = e4.inputType == "historyUndo" ? undo : e4.inputType == "historyRedo" ? redo : null;
        if (!command2)
          return false;
        e4.preventDefault();
        return command2(view);
      }
    })
  ];
}
function cmd(side, selection) {
  return function({ state, dispatch }) {
    if (!selection && state.readOnly)
      return false;
    let historyState = state.field(historyField_, false);
    if (!historyState)
      return false;
    let tr = historyState.pop(side, state, selection);
    if (!tr)
      return false;
    dispatch(tr);
    return true;
  };
}
var undo = cmd(0, false);
var redo = cmd(1, false);
var undoSelection = cmd(0, true);
var redoSelection = cmd(1, true);
function depth(side) {
  return function(state) {
    let histState = state.field(historyField_, false);
    if (!histState)
      return 0;
    let branch = side == 0 ? histState.done : histState.undone;
    return branch.length - (branch.length && !branch[0].changes ? 1 : 0);
  };
}
var undoDepth = depth(
  0
  /* BranchName.Done */
);
var redoDepth = depth(
  1
  /* BranchName.Undone */
);
var HistEvent = class _HistEvent {
  constructor(changes, effects, mapped, startSelection, selectionsAfter) {
    this.changes = changes;
    this.effects = effects;
    this.mapped = mapped;
    this.startSelection = startSelection;
    this.selectionsAfter = selectionsAfter;
  }
  setSelAfter(after) {
    return new _HistEvent(this.changes, this.effects, this.mapped, this.startSelection, after);
  }
  toJSON() {
    var _a, _b, _c;
    return {
      changes: (_a = this.changes) === null || _a === void 0 ? void 0 : _a.toJSON(),
      mapped: (_b = this.mapped) === null || _b === void 0 ? void 0 : _b.toJSON(),
      startSelection: (_c = this.startSelection) === null || _c === void 0 ? void 0 : _c.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s2) => s2.toJSON())
    };
  }
  static fromJSON(json) {
    return new _HistEvent(json.changes && ChangeSet.fromJSON(json.changes), [], json.mapped && ChangeDesc.fromJSON(json.mapped), json.startSelection && EditorSelection.fromJSON(json.startSelection), json.selectionsAfter.map(EditorSelection.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(tr, selection) {
    let effects = none;
    for (let invert of tr.startState.facet(invertedEffects)) {
      let result = invert(tr);
      if (result.length)
        effects = effects.concat(result);
    }
    if (!effects.length && tr.changes.empty)
      return null;
    return new _HistEvent(tr.changes.invert(tr.startState.doc), effects, void 0, selection || tr.startState.selection, none);
  }
  static selection(selections) {
    return new _HistEvent(void 0, none, void 0, void 0, selections);
  }
};
function updateBranch(branch, to2, maxLen, newEvent) {
  let start = to2 + 1 > maxLen + 20 ? to2 - maxLen - 1 : 0;
  let newBranch = branch.slice(start, to2);
  newBranch.push(newEvent);
  return newBranch;
}
function isAdjacent(a2, b4) {
  let ranges = [], isAdjacent2 = false;
  a2.iterChangedRanges((f3, t2) => ranges.push(f3, t2));
  b4.iterChangedRanges((_f, _t, f3, t2) => {
    for (let i4 = 0; i4 < ranges.length; ) {
      let from = ranges[i4++], to2 = ranges[i4++];
      if (t2 >= from && f3 <= to2)
        isAdjacent2 = true;
    }
  });
  return isAdjacent2;
}
function eqSelectionShape(a2, b4) {
  return a2.ranges.length == b4.ranges.length && a2.ranges.filter((r4, i4) => r4.empty != b4.ranges[i4].empty).length === 0;
}
function conc(a2, b4) {
  return !a2.length ? b4 : !b4.length ? a2 : a2.concat(b4);
}
var none = [];
var MaxSelectionsPerEvent = 200;
function addSelection(branch, selection) {
  if (!branch.length) {
    return [HistEvent.selection([selection])];
  } else {
    let lastEvent = branch[branch.length - 1];
    let sels = lastEvent.selectionsAfter.slice(Math.max(0, lastEvent.selectionsAfter.length - MaxSelectionsPerEvent));
    if (sels.length && sels[sels.length - 1].eq(selection))
      return branch;
    sels.push(selection);
    return updateBranch(branch, branch.length - 1, 1e9, lastEvent.setSelAfter(sels));
  }
}
function popSelection(branch) {
  let last = branch[branch.length - 1];
  let newBranch = branch.slice();
  newBranch[branch.length - 1] = last.setSelAfter(last.selectionsAfter.slice(0, last.selectionsAfter.length - 1));
  return newBranch;
}
function addMappingToBranch(branch, mapping) {
  if (!branch.length)
    return branch;
  let length = branch.length, selections = none;
  while (length) {
    let event = mapEvent(branch[length - 1], mapping, selections);
    if (event.changes && !event.changes.empty || event.effects.length) {
      let result = branch.slice(0, length);
      result[length - 1] = event;
      return result;
    } else {
      mapping = event.mapped;
      length--;
      selections = event.selectionsAfter;
    }
  }
  return selections.length ? [HistEvent.selection(selections)] : none;
}
function mapEvent(event, mapping, extraSelections) {
  let selections = conc(event.selectionsAfter.length ? event.selectionsAfter.map((s2) => s2.map(mapping)) : none, extraSelections);
  if (!event.changes)
    return HistEvent.selection(selections);
  let mappedChanges = event.changes.map(mapping), before = mapping.mapDesc(event.changes, true);
  let fullMapping = event.mapped ? event.mapped.composeDesc(before) : before;
  return new HistEvent(mappedChanges, StateEffect.mapEffects(event.effects, mapping), fullMapping, event.startSelection.map(before), selections);
}
var joinableUserEvent = /^(input\.type|delete)($|\.)/;
var HistoryState = class _HistoryState {
  constructor(done, undone, prevTime = 0, prevUserEvent = void 0) {
    this.done = done;
    this.undone = undone;
    this.prevTime = prevTime;
    this.prevUserEvent = prevUserEvent;
  }
  isolate() {
    return this.prevTime ? new _HistoryState(this.done, this.undone) : this;
  }
  addChanges(event, time, userEvent, config, tr) {
    let done = this.done, lastEvent = done[done.length - 1];
    if (lastEvent && lastEvent.changes && !lastEvent.changes.empty && event.changes && (!userEvent || joinableUserEvent.test(userEvent)) && (!lastEvent.selectionsAfter.length && time - this.prevTime < config.newGroupDelay && config.joinToEvent(tr, isAdjacent(lastEvent.changes, event.changes)) || // For compose (but not compose.start) events, always join with previous event
    userEvent == "input.type.compose")) {
      done = updateBranch(done, done.length - 1, config.minDepth, new HistEvent(event.changes.compose(lastEvent.changes), conc(event.effects, lastEvent.effects), lastEvent.mapped, lastEvent.startSelection, none));
    } else {
      done = updateBranch(done, done.length, config.minDepth, event);
    }
    return new _HistoryState(done, none, time, userEvent);
  }
  addSelection(selection, time, userEvent, newGroupDelay) {
    let last = this.done.length ? this.done[this.done.length - 1].selectionsAfter : none;
    if (last.length > 0 && time - this.prevTime < newGroupDelay && userEvent == this.prevUserEvent && userEvent && /^select($|\.)/.test(userEvent) && eqSelectionShape(last[last.length - 1], selection))
      return this;
    return new _HistoryState(addSelection(this.done, selection), this.undone, time, userEvent);
  }
  addMapping(mapping) {
    return new _HistoryState(addMappingToBranch(this.done, mapping), addMappingToBranch(this.undone, mapping), this.prevTime, this.prevUserEvent);
  }
  pop(side, state, selection) {
    let branch = side == 0 ? this.done : this.undone;
    if (branch.length == 0)
      return null;
    let event = branch[branch.length - 1];
    if (selection && event.selectionsAfter.length) {
      return state.update({
        selection: event.selectionsAfter[event.selectionsAfter.length - 1],
        annotations: fromHistory.of({ side, rest: popSelection(branch) }),
        userEvent: side == 0 ? "select.undo" : "select.redo",
        scrollIntoView: true
      });
    } else if (!event.changes) {
      return null;
    } else {
      let rest = branch.length == 1 ? none : branch.slice(0, branch.length - 1);
      if (event.mapped)
        rest = addMappingToBranch(rest, event.mapped);
      return state.update({
        changes: event.changes,
        selection: event.startSelection,
        effects: event.effects,
        annotations: fromHistory.of({ side, rest }),
        filter: false,
        userEvent: side == 0 ? "undo" : "redo",
        scrollIntoView: true
      });
    }
  }
};
HistoryState.empty = new HistoryState(none, none);
var historyKeymap = [
  { key: "Mod-z", run: undo, preventDefault: true },
  { key: "Mod-y", mac: "Mod-Shift-z", run: redo, preventDefault: true },
  { linux: "Ctrl-Shift-z", run: redo, preventDefault: true },
  { key: "Mod-u", run: undoSelection, preventDefault: true },
  { key: "Alt-u", mac: "Mod-Shift-u", run: redoSelection, preventDefault: true }
];
function updateSel(sel, by) {
  return EditorSelection.create(sel.ranges.map(by), sel.mainIndex);
}
function setSel(state, selection) {
  return state.update({ selection, scrollIntoView: true, userEvent: "select" });
}
function moveSel({ state, dispatch }, how) {
  let selection = updateSel(state.selection, how);
  if (selection.eq(state.selection))
    return false;
  dispatch(setSel(state, selection));
  return true;
}
function rangeEnd(range, forward) {
  return EditorSelection.cursor(forward ? range.to : range.from);
}
function cursorByChar(view, forward) {
  return moveSel(view, (range) => range.empty ? view.moveByChar(range, forward) : rangeEnd(range, forward));
}
function ltrAtCursor(view) {
  return view.textDirectionAt(view.state.selection.main.head) == Direction.LTR;
}
var cursorCharLeft = (view) => cursorByChar(view, !ltrAtCursor(view));
var cursorCharRight = (view) => cursorByChar(view, ltrAtCursor(view));
function cursorByGroup(view, forward) {
  return moveSel(view, (range) => range.empty ? view.moveByGroup(range, forward) : rangeEnd(range, forward));
}
var cursorGroupLeft = (view) => cursorByGroup(view, !ltrAtCursor(view));
var cursorGroupRight = (view) => cursorByGroup(view, ltrAtCursor(view));
var segmenter = typeof Intl != "undefined" && Intl.Segmenter ? new Intl.Segmenter(void 0, { granularity: "word" }) : null;
function interestingNode(state, node, bracketProp) {
  if (node.type.prop(bracketProp))
    return true;
  let len = node.to - node.from;
  return len && (len > 2 || /[^\s,.;:]/.test(state.sliceDoc(node.from, node.to))) || node.firstChild;
}
function moveBySyntax(state, start, forward) {
  let pos = syntaxTree(state).resolveInner(start.head);
  let bracketProp = forward ? NodeProp.closedBy : NodeProp.openedBy;
  for (let at2 = start.head; ; ) {
    let next = forward ? pos.childAfter(at2) : pos.childBefore(at2);
    if (!next)
      break;
    if (interestingNode(state, next, bracketProp))
      pos = next;
    else
      at2 = forward ? next.to : next.from;
  }
  let bracket = pos.type.prop(bracketProp), match, newPos;
  if (bracket && (match = forward ? matchBrackets(state, pos.from, 1) : matchBrackets(state, pos.to, -1)) && match.matched)
    newPos = forward ? match.end.to : match.end.from;
  else
    newPos = forward ? pos.to : pos.from;
  return EditorSelection.cursor(newPos, forward ? -1 : 1);
}
var cursorSyntaxLeft = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
var cursorSyntaxRight = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function cursorByLine(view, forward) {
  return moveSel(view, (range) => {
    if (!range.empty)
      return rangeEnd(range, forward);
    let moved = view.moveVertically(range, forward);
    return moved.head != range.head ? moved : view.moveToLineBoundary(range, forward);
  });
}
var cursorLineUp = (view) => cursorByLine(view, false);
var cursorLineDown = (view) => cursorByLine(view, true);
function pageInfo(view) {
  let selfScroll = view.scrollDOM.clientHeight < view.scrollDOM.scrollHeight - 2;
  let marginTop = 0, marginBottom = 0, height;
  if (selfScroll) {
    for (let source of view.state.facet(EditorView.scrollMargins)) {
      let margins = source(view);
      if (margins === null || margins === void 0 ? void 0 : margins.top)
        marginTop = Math.max(margins === null || margins === void 0 ? void 0 : margins.top, marginTop);
      if (margins === null || margins === void 0 ? void 0 : margins.bottom)
        marginBottom = Math.max(margins === null || margins === void 0 ? void 0 : margins.bottom, marginBottom);
    }
    height = view.scrollDOM.clientHeight - marginTop - marginBottom;
  } else {
    height = (view.dom.ownerDocument.defaultView || window).innerHeight;
  }
  return {
    marginTop,
    marginBottom,
    selfScroll,
    height: Math.max(view.defaultLineHeight, height - 5)
  };
}
function cursorByPage(view, forward) {
  let page = pageInfo(view);
  let { state } = view, selection = updateSel(state.selection, (range) => {
    return range.empty ? view.moveVertically(range, forward, page.height) : rangeEnd(range, forward);
  });
  if (selection.eq(state.selection))
    return false;
  let effect;
  if (page.selfScroll) {
    let startPos = view.coordsAtPos(state.selection.main.head);
    let scrollRect = view.scrollDOM.getBoundingClientRect();
    let scrollTop = scrollRect.top + page.marginTop, scrollBottom = scrollRect.bottom - page.marginBottom;
    if (startPos && startPos.top > scrollTop && startPos.bottom < scrollBottom)
      effect = EditorView.scrollIntoView(selection.main.head, { y: "start", yMargin: startPos.top - scrollTop });
  }
  view.dispatch(setSel(state, selection), { effects: effect });
  return true;
}
var cursorPageUp = (view) => cursorByPage(view, false);
var cursorPageDown = (view) => cursorByPage(view, true);
function moveByLineBoundary(view, start, forward) {
  let line = view.lineBlockAt(start.head), moved = view.moveToLineBoundary(start, forward);
  if (moved.head == start.head && moved.head != (forward ? line.to : line.from))
    moved = view.moveToLineBoundary(start, forward, false);
  if (!forward && moved.head == line.from && line.length) {
    let space = /^\s*/.exec(view.state.sliceDoc(line.from, Math.min(line.from + 100, line.to)))[0].length;
    if (space && start.head != line.from + space)
      moved = EditorSelection.cursor(line.from + space);
  }
  return moved;
}
var cursorLineBoundaryForward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, true));
var cursorLineBoundaryBackward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, false));
var cursorLineBoundaryLeft = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
var cursorLineBoundaryRight = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
var cursorLineStart = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from, 1));
var cursorLineEnd = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to, -1));
function toMatchingBracket(state, dispatch, extend) {
  let found = false, selection = updateSel(state.selection, (range) => {
    let matching = matchBrackets(state, range.head, -1) || matchBrackets(state, range.head, 1) || range.head > 0 && matchBrackets(state, range.head - 1, 1) || range.head < state.doc.length && matchBrackets(state, range.head + 1, -1);
    if (!matching || !matching.end)
      return range;
    found = true;
    let head = matching.start.from == range.head ? matching.end.to : matching.end.from;
    return extend ? EditorSelection.range(range.anchor, head) : EditorSelection.cursor(head);
  });
  if (!found)
    return false;
  dispatch(setSel(state, selection));
  return true;
}
var cursorMatchingBracket = ({ state, dispatch }) => toMatchingBracket(state, dispatch, false);
function extendSel(view, how) {
  let selection = updateSel(view.state.selection, (range) => {
    let head = how(range);
    return EditorSelection.range(range.anchor, head.head, head.goalColumn, head.bidiLevel || void 0);
  });
  if (selection.eq(view.state.selection))
    return false;
  view.dispatch(setSel(view.state, selection));
  return true;
}
function selectByChar(view, forward) {
  return extendSel(view, (range) => view.moveByChar(range, forward));
}
var selectCharLeft = (view) => selectByChar(view, !ltrAtCursor(view));
var selectCharRight = (view) => selectByChar(view, ltrAtCursor(view));
function selectByGroup(view, forward) {
  return extendSel(view, (range) => view.moveByGroup(range, forward));
}
var selectGroupLeft = (view) => selectByGroup(view, !ltrAtCursor(view));
var selectGroupRight = (view) => selectByGroup(view, ltrAtCursor(view));
var selectSyntaxLeft = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
var selectSyntaxRight = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function selectByLine(view, forward) {
  return extendSel(view, (range) => view.moveVertically(range, forward));
}
var selectLineUp = (view) => selectByLine(view, false);
var selectLineDown = (view) => selectByLine(view, true);
function selectByPage(view, forward) {
  return extendSel(view, (range) => view.moveVertically(range, forward, pageInfo(view).height));
}
var selectPageUp = (view) => selectByPage(view, false);
var selectPageDown = (view) => selectByPage(view, true);
var selectLineBoundaryForward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, true));
var selectLineBoundaryBackward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, false));
var selectLineBoundaryLeft = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
var selectLineBoundaryRight = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
var selectLineStart = (view) => extendSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from));
var selectLineEnd = (view) => extendSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to));
var cursorDocStart = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: 0 }));
  return true;
};
var cursorDocEnd = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.doc.length }));
  return true;
};
var selectDocStart = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.selection.main.anchor, head: 0 }));
  return true;
};
var selectDocEnd = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.selection.main.anchor, head: state.doc.length }));
  return true;
};
var selectAll = ({ state, dispatch }) => {
  dispatch(state.update({ selection: { anchor: 0, head: state.doc.length }, userEvent: "select" }));
  return true;
};
var selectLine = ({ state, dispatch }) => {
  let ranges = selectedLineBlocks(state).map(({ from, to: to2 }) => EditorSelection.range(from, Math.min(to2 + 1, state.doc.length)));
  dispatch(state.update({ selection: EditorSelection.create(ranges), userEvent: "select" }));
  return true;
};
var selectParentSyntax = ({ state, dispatch }) => {
  let selection = updateSel(state.selection, (range) => {
    var _a;
    let context = syntaxTree(state).resolveInner(range.head, 1);
    while (!(context.from < range.from && context.to >= range.to || context.to > range.to && context.from <= range.from || !((_a = context.parent) === null || _a === void 0 ? void 0 : _a.parent)))
      context = context.parent;
    return EditorSelection.range(context.to, context.from);
  });
  dispatch(setSel(state, selection));
  return true;
};
var simplifySelection = ({ state, dispatch }) => {
  let cur = state.selection, selection = null;
  if (cur.ranges.length > 1)
    selection = EditorSelection.create([cur.main]);
  else if (!cur.main.empty)
    selection = EditorSelection.create([EditorSelection.cursor(cur.main.head)]);
  if (!selection)
    return false;
  dispatch(setSel(state, selection));
  return true;
};
function deleteBy(target, by) {
  if (target.state.readOnly)
    return false;
  let event = "delete.selection", { state } = target;
  let changes = state.changeByRange((range) => {
    let { from, to: to2 } = range;
    if (from == to2) {
      let towards = by(from);
      if (towards < from) {
        event = "delete.backward";
        towards = skipAtomic(target, towards, false);
      } else if (towards > from) {
        event = "delete.forward";
        towards = skipAtomic(target, towards, true);
      }
      from = Math.min(from, towards);
      to2 = Math.max(to2, towards);
    } else {
      from = skipAtomic(target, from, false);
      to2 = skipAtomic(target, to2, true);
    }
    return from == to2 ? { range } : { changes: { from, to: to2 }, range: EditorSelection.cursor(from) };
  });
  if (changes.changes.empty)
    return false;
  target.dispatch(state.update(changes, {
    scrollIntoView: true,
    userEvent: event,
    effects: event == "delete.selection" ? EditorView.announce.of(state.phrase("Selection deleted")) : void 0
  }));
  return true;
}
function skipAtomic(target, pos, forward) {
  if (target instanceof EditorView)
    for (let ranges of target.state.facet(EditorView.atomicRanges).map((f3) => f3(target)))
      ranges.between(pos, pos, (from, to2) => {
        if (from < pos && to2 > pos)
          pos = forward ? to2 : from;
      });
  return pos;
}
var deleteByChar = (target, forward) => deleteBy(target, (pos) => {
  let { state } = target, line = state.doc.lineAt(pos), before, targetPos;
  if (!forward && pos > line.from && pos < line.from + 200 && !/[^ \t]/.test(before = line.text.slice(0, pos - line.from))) {
    if (before[before.length - 1] == "	")
      return pos - 1;
    let col = countColumn(before, state.tabSize), drop = col % getIndentUnit(state) || getIndentUnit(state);
    for (let i4 = 0; i4 < drop && before[before.length - 1 - i4] == " "; i4++)
      pos--;
    targetPos = pos;
  } else {
    targetPos = findClusterBreak(line.text, pos - line.from, forward, forward) + line.from;
    if (targetPos == pos && line.number != (forward ? state.doc.lines : 1))
      targetPos += forward ? 1 : -1;
  }
  return targetPos;
});
var deleteCharBackward = (view) => deleteByChar(view, false);
var deleteCharForward = (view) => deleteByChar(view, true);
var deleteByGroup = (target, forward) => deleteBy(target, (start) => {
  let pos = start, { state } = target, line = state.doc.lineAt(pos);
  let categorize = state.charCategorizer(pos);
  for (let cat = null; ; ) {
    if (pos == (forward ? line.to : line.from)) {
      if (pos == start && line.number != (forward ? state.doc.lines : 1))
        pos += forward ? 1 : -1;
      break;
    }
    let next = findClusterBreak(line.text, pos - line.from, forward) + line.from;
    let nextChar = line.text.slice(Math.min(pos, next) - line.from, Math.max(pos, next) - line.from);
    let nextCat = categorize(nextChar);
    if (cat != null && nextCat != cat)
      break;
    if (nextChar != " " || pos != start)
      cat = nextCat;
    pos = next;
  }
  return pos;
});
var deleteGroupBackward = (target) => deleteByGroup(target, false);
var deleteGroupForward = (target) => deleteByGroup(target, true);
var deleteToLineEnd = (view) => deleteBy(view, (pos) => {
  let lineEnd = view.lineBlockAt(pos).to;
  return pos < lineEnd ? lineEnd : Math.min(view.state.doc.length, pos + 1);
});
var deleteToLineStart = (view) => deleteBy(view, (pos) => {
  let lineStart = view.lineBlockAt(pos).from;
  return pos > lineStart ? lineStart : Math.max(0, pos - 1);
});
var splitLine = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let changes = state.changeByRange((range) => {
    return {
      changes: { from: range.from, to: range.to, insert: Text.of(["", ""]) },
      range: EditorSelection.cursor(range.from)
    };
  });
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
  return true;
};
var transposeChars = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let changes = state.changeByRange((range) => {
    if (!range.empty || range.from == 0 || range.from == state.doc.length)
      return { range };
    let pos = range.from, line = state.doc.lineAt(pos);
    let from = pos == line.from ? pos - 1 : findClusterBreak(line.text, pos - line.from, false) + line.from;
    let to2 = pos == line.to ? pos + 1 : findClusterBreak(line.text, pos - line.from, true) + line.from;
    return {
      changes: { from, to: to2, insert: state.doc.slice(pos, to2).append(state.doc.slice(from, pos)) },
      range: EditorSelection.cursor(to2)
    };
  });
  if (changes.changes.empty)
    return false;
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "move.character" }));
  return true;
};
function selectedLineBlocks(state) {
  let blocks = [], upto = -1;
  for (let range of state.selection.ranges) {
    let startLine = state.doc.lineAt(range.from), endLine = state.doc.lineAt(range.to);
    if (!range.empty && range.to == endLine.from)
      endLine = state.doc.lineAt(range.to - 1);
    if (upto >= startLine.number) {
      let prev = blocks[blocks.length - 1];
      prev.to = endLine.to;
      prev.ranges.push(range);
    } else {
      blocks.push({ from: startLine.from, to: endLine.to, ranges: [range] });
    }
    upto = endLine.number + 1;
  }
  return blocks;
}
function moveLine(state, dispatch, forward) {
  if (state.readOnly)
    return false;
  let changes = [], ranges = [];
  for (let block of selectedLineBlocks(state)) {
    if (forward ? block.to == state.doc.length : block.from == 0)
      continue;
    let nextLine = state.doc.lineAt(forward ? block.to + 1 : block.from - 1);
    let size = nextLine.length + 1;
    if (forward) {
      changes.push({ from: block.to, to: nextLine.to }, { from: block.from, insert: nextLine.text + state.lineBreak });
      for (let r4 of block.ranges)
        ranges.push(EditorSelection.range(Math.min(state.doc.length, r4.anchor + size), Math.min(state.doc.length, r4.head + size)));
    } else {
      changes.push({ from: nextLine.from, to: block.from }, { from: block.to, insert: state.lineBreak + nextLine.text });
      for (let r4 of block.ranges)
        ranges.push(EditorSelection.range(r4.anchor - size, r4.head - size));
    }
  }
  if (!changes.length)
    return false;
  dispatch(state.update({
    changes,
    scrollIntoView: true,
    selection: EditorSelection.create(ranges, state.selection.mainIndex),
    userEvent: "move.line"
  }));
  return true;
}
var moveLineUp = ({ state, dispatch }) => moveLine(state, dispatch, false);
var moveLineDown = ({ state, dispatch }) => moveLine(state, dispatch, true);
function copyLine(state, dispatch, forward) {
  if (state.readOnly)
    return false;
  let changes = [];
  for (let block of selectedLineBlocks(state)) {
    if (forward)
      changes.push({ from: block.from, insert: state.doc.slice(block.from, block.to) + state.lineBreak });
    else
      changes.push({ from: block.to, insert: state.lineBreak + state.doc.slice(block.from, block.to) });
  }
  dispatch(state.update({ changes, scrollIntoView: true, userEvent: "input.copyline" }));
  return true;
}
var copyLineUp = ({ state, dispatch }) => copyLine(state, dispatch, false);
var copyLineDown = ({ state, dispatch }) => copyLine(state, dispatch, true);
var deleteLine = (view) => {
  if (view.state.readOnly)
    return false;
  let { state } = view, changes = state.changes(selectedLineBlocks(state).map(({ from, to: to2 }) => {
    if (from > 0)
      from--;
    else if (to2 < state.doc.length)
      to2++;
    return { from, to: to2 };
  }));
  let selection = updateSel(state.selection, (range) => view.moveVertically(range, true)).map(changes);
  view.dispatch({ changes, selection, scrollIntoView: true, userEvent: "delete.line" });
  return true;
};
function isBetweenBrackets(state, pos) {
  if (/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos - 1, pos + 1)))
    return { from: pos, to: pos };
  let context = syntaxTree(state).resolveInner(pos);
  let before = context.childBefore(pos), after = context.childAfter(pos), closedBy;
  if (before && after && before.to <= pos && after.from >= pos && (closedBy = before.type.prop(NodeProp.closedBy)) && closedBy.indexOf(after.name) > -1 && state.doc.lineAt(before.to).from == state.doc.lineAt(after.from).from && !/\S/.test(state.sliceDoc(before.to, after.from)))
    return { from: before.to, to: after.from };
  return null;
}
var insertNewlineAndIndent = newlineAndIndent(false);
var insertBlankLine = newlineAndIndent(true);
function newlineAndIndent(atEof) {
  return ({ state, dispatch }) => {
    if (state.readOnly)
      return false;
    let changes = state.changeByRange((range) => {
      let { from, to: to2 } = range, line = state.doc.lineAt(from);
      let explode = !atEof && from == to2 && isBetweenBrackets(state, from);
      if (atEof)
        from = to2 = (to2 <= line.to ? line : state.doc.lineAt(to2)).to;
      let cx = new IndentContext(state, { simulateBreak: from, simulateDoubleBreak: !!explode });
      let indent = getIndentation(cx, from);
      if (indent == null)
        indent = countColumn(/^\s*/.exec(state.doc.lineAt(from).text)[0], state.tabSize);
      while (to2 < line.to && /\s/.test(line.text[to2 - line.from]))
        to2++;
      if (explode)
        ({ from, to: to2 } = explode);
      else if (from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from)))
        from = line.from;
      let insert = ["", indentString(state, indent)];
      if (explode)
        insert.push(indentString(state, cx.lineIndent(line.from, -1)));
      return {
        changes: { from, to: to2, insert: Text.of(insert) },
        range: EditorSelection.cursor(from + 1 + insert[1].length)
      };
    });
    dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
    return true;
  };
}
function changeBySelectedLine(state, f3) {
  let atLine = -1;
  return state.changeByRange((range) => {
    let changes = [];
    for (let pos = range.from; pos <= range.to; ) {
      let line = state.doc.lineAt(pos);
      if (line.number > atLine && (range.empty || range.to > line.from)) {
        f3(line, changes, range);
        atLine = line.number;
      }
      pos = line.to + 1;
    }
    let changeSet = state.changes(changes);
    return {
      changes,
      range: EditorSelection.range(changeSet.mapPos(range.anchor, 1), changeSet.mapPos(range.head, 1))
    };
  });
}
var indentSelection = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let updated = /* @__PURE__ */ Object.create(null);
  let context = new IndentContext(state, { overrideIndentation: (start) => {
    let found = updated[start];
    return found == null ? -1 : found;
  } });
  let changes = changeBySelectedLine(state, (line, changes2, range) => {
    let indent = getIndentation(context, line.from);
    if (indent == null)
      return;
    if (!/\S/.test(line.text))
      indent = 0;
    let cur = /^\s*/.exec(line.text)[0];
    let norm = indentString(state, indent);
    if (cur != norm || range.from < line.from + cur.length) {
      updated[line.from] = indent;
      changes2.push({ from: line.from, to: line.from + cur.length, insert: norm });
    }
  });
  if (!changes.changes.empty)
    dispatch(state.update(changes, { userEvent: "indent" }));
  return true;
};
var indentMore = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
    changes.push({ from: line.from, insert: state.facet(indentUnit) });
  }), { userEvent: "input.indent" }));
  return true;
};
var indentLess = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
    let space = /^\s*/.exec(line.text)[0];
    if (!space)
      return;
    let col = countColumn(space, state.tabSize), keep = 0;
    let insert = indentString(state, Math.max(0, col - getIndentUnit(state)));
    while (keep < space.length && keep < insert.length && space.charCodeAt(keep) == insert.charCodeAt(keep))
      keep++;
    changes.push({ from: line.from + keep, to: line.from + space.length, insert: insert.slice(keep) });
  }), { userEvent: "delete.dedent" }));
  return true;
};
var emacsStyleKeymap = [
  { key: "Ctrl-b", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
  { key: "Ctrl-f", run: cursorCharRight, shift: selectCharRight },
  { key: "Ctrl-p", run: cursorLineUp, shift: selectLineUp },
  { key: "Ctrl-n", run: cursorLineDown, shift: selectLineDown },
  { key: "Ctrl-a", run: cursorLineStart, shift: selectLineStart },
  { key: "Ctrl-e", run: cursorLineEnd, shift: selectLineEnd },
  { key: "Ctrl-d", run: deleteCharForward },
  { key: "Ctrl-h", run: deleteCharBackward },
  { key: "Ctrl-k", run: deleteToLineEnd },
  { key: "Ctrl-Alt-h", run: deleteGroupBackward },
  { key: "Ctrl-o", run: splitLine },
  { key: "Ctrl-t", run: transposeChars },
  { key: "Ctrl-v", run: cursorPageDown }
];
var standardKeymap = [
  { key: "ArrowLeft", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: cursorGroupLeft, shift: selectGroupLeft, preventDefault: true },
  { mac: "Cmd-ArrowLeft", run: cursorLineBoundaryLeft, shift: selectLineBoundaryLeft, preventDefault: true },
  { key: "ArrowRight", run: cursorCharRight, shift: selectCharRight, preventDefault: true },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: cursorGroupRight, shift: selectGroupRight, preventDefault: true },
  { mac: "Cmd-ArrowRight", run: cursorLineBoundaryRight, shift: selectLineBoundaryRight, preventDefault: true },
  { key: "ArrowUp", run: cursorLineUp, shift: selectLineUp, preventDefault: true },
  { mac: "Cmd-ArrowUp", run: cursorDocStart, shift: selectDocStart },
  { mac: "Ctrl-ArrowUp", run: cursorPageUp, shift: selectPageUp },
  { key: "ArrowDown", run: cursorLineDown, shift: selectLineDown, preventDefault: true },
  { mac: "Cmd-ArrowDown", run: cursorDocEnd, shift: selectDocEnd },
  { mac: "Ctrl-ArrowDown", run: cursorPageDown, shift: selectPageDown },
  { key: "PageUp", run: cursorPageUp, shift: selectPageUp },
  { key: "PageDown", run: cursorPageDown, shift: selectPageDown },
  { key: "Home", run: cursorLineBoundaryBackward, shift: selectLineBoundaryBackward, preventDefault: true },
  { key: "Mod-Home", run: cursorDocStart, shift: selectDocStart },
  { key: "End", run: cursorLineBoundaryForward, shift: selectLineBoundaryForward, preventDefault: true },
  { key: "Mod-End", run: cursorDocEnd, shift: selectDocEnd },
  { key: "Enter", run: insertNewlineAndIndent },
  { key: "Mod-a", run: selectAll },
  { key: "Backspace", run: deleteCharBackward, shift: deleteCharBackward },
  { key: "Delete", run: deleteCharForward },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: deleteGroupBackward },
  { key: "Mod-Delete", mac: "Alt-Delete", run: deleteGroupForward },
  { mac: "Mod-Backspace", run: deleteToLineStart },
  { mac: "Mod-Delete", run: deleteToLineEnd }
].concat(emacsStyleKeymap.map((b4) => ({ mac: b4.key, run: b4.run, shift: b4.shift })));
var defaultKeymap = [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: cursorSyntaxLeft, shift: selectSyntaxLeft },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: cursorSyntaxRight, shift: selectSyntaxRight },
  { key: "Alt-ArrowUp", run: moveLineUp },
  { key: "Shift-Alt-ArrowUp", run: copyLineUp },
  { key: "Alt-ArrowDown", run: moveLineDown },
  { key: "Shift-Alt-ArrowDown", run: copyLineDown },
  { key: "Escape", run: simplifySelection },
  { key: "Mod-Enter", run: insertBlankLine },
  { key: "Alt-l", mac: "Ctrl-l", run: selectLine },
  { key: "Mod-i", run: selectParentSyntax, preventDefault: true },
  { key: "Mod-[", run: indentLess },
  { key: "Mod-]", run: indentMore },
  { key: "Mod-Alt-\\", run: indentSelection },
  { key: "Shift-Mod-k", run: deleteLine },
  { key: "Shift-Mod-\\", run: cursorMatchingBracket },
  { key: "Mod-/", run: toggleComment },
  { key: "Alt-A", run: toggleBlockComment }
].concat(standardKeymap);
var indentWithTab = { key: "Tab", run: indentMore, shift: indentLess };

// node_modules/crelt/index.js
function crelt() {
  var elt = arguments[0];
  if (typeof elt == "string")
    elt = document.createElement(elt);
  var i4 = 1, next = arguments[1];
  if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
    for (var name in next)
      if (Object.prototype.hasOwnProperty.call(next, name)) {
        var value = next[name];
        if (typeof value == "string")
          elt.setAttribute(name, value);
        else if (value != null)
          elt[name] = value;
      }
    i4++;
  }
  for (; i4 < arguments.length; i4++)
    add(elt, arguments[i4]);
  return elt;
}
function add(elt, child) {
  if (typeof child == "string") {
    elt.appendChild(document.createTextNode(child));
  } else if (child == null) {
  } else if (child.nodeType != null) {
    elt.appendChild(child);
  } else if (Array.isArray(child)) {
    for (var i4 = 0; i4 < child.length; i4++)
      add(elt, child[i4]);
  } else {
    throw new RangeError("Unsupported child node: " + child);
  }
}

// node_modules/@codemirror/search/dist/index.js
var basicNormalize = typeof String.prototype.normalize == "function" ? (x3) => x3.normalize("NFKD") : (x3) => x3;
var SearchCursor = class {
  /**
  Create a text cursor. The query is the search string, `from` to
  `to` provides the region to search.
  
  When `normalize` is given, it will be called, on both the query
  string and the content it is matched against, before comparing.
  You can, for example, create a case-insensitive search by
  passing `s => s.toLowerCase()`.
  
  Text is always normalized with
  [`.normalize("NFKD")`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)
  (when supported).
  */
  constructor(text, query, from = 0, to2 = text.length, normalize, test) {
    this.test = test;
    this.value = { from: 0, to: 0 };
    this.done = false;
    this.matches = [];
    this.buffer = "";
    this.bufferPos = 0;
    this.iter = text.iterRange(from, to2);
    this.bufferStart = from;
    this.normalize = normalize ? (x3) => normalize(basicNormalize(x3)) : basicNormalize;
    this.query = this.normalize(query);
  }
  peek() {
    if (this.bufferPos == this.buffer.length) {
      this.bufferStart += this.buffer.length;
      this.iter.next();
      if (this.iter.done)
        return -1;
      this.bufferPos = 0;
      this.buffer = this.iter.value;
    }
    return codePointAt(this.buffer, this.bufferPos);
  }
  /**
  Look for the next match. Updates the iterator's
  [`value`](https://codemirror.net/6/docs/ref/#search.SearchCursor.value) and
  [`done`](https://codemirror.net/6/docs/ref/#search.SearchCursor.done) properties. Should be called
  at least once before using the cursor.
  */
  next() {
    while (this.matches.length)
      this.matches.pop();
    return this.nextOverlapping();
  }
  /**
  The `next` method will ignore matches that partially overlap a
  previous match. This method behaves like `next`, but includes
  such matches.
  */
  nextOverlapping() {
    for (; ; ) {
      let next = this.peek();
      if (next < 0) {
        this.done = true;
        return this;
      }
      let str = fromCodePoint(next), start = this.bufferStart + this.bufferPos;
      this.bufferPos += codePointSize(next);
      let norm = this.normalize(str);
      for (let i4 = 0, pos = start; ; i4++) {
        let code = norm.charCodeAt(i4);
        let match = this.match(code, pos);
        if (i4 == norm.length - 1) {
          if (match) {
            this.value = match;
            return this;
          }
          break;
        }
        if (pos == start && i4 < str.length && str.charCodeAt(i4) == code)
          pos++;
      }
    }
  }
  match(code, pos) {
    let match = null;
    for (let i4 = 0; i4 < this.matches.length; i4 += 2) {
      let index = this.matches[i4], keep = false;
      if (this.query.charCodeAt(index) == code) {
        if (index == this.query.length - 1) {
          match = { from: this.matches[i4 + 1], to: pos + 1 };
        } else {
          this.matches[i4]++;
          keep = true;
        }
      }
      if (!keep) {
        this.matches.splice(i4, 2);
        i4 -= 2;
      }
    }
    if (this.query.charCodeAt(0) == code) {
      if (this.query.length == 1)
        match = { from: pos, to: pos + 1 };
      else
        this.matches.push(1, pos);
    }
    if (match && this.test && !this.test(match.from, match.to, this.buffer, this.bufferStart))
      match = null;
    return match;
  }
};
if (typeof Symbol != "undefined")
  SearchCursor.prototype[Symbol.iterator] = function() {
    return this;
  };
var empty = { from: -1, to: -1, match: /.*/.exec("") };
var baseFlags = "gm" + (/x/.unicode == null ? "" : "u");
var RegExpCursor = class {
  /**
  Create a cursor that will search the given range in the given
  document. `query` should be the raw pattern (as you'd pass it to
  `new RegExp`).
  */
  constructor(text, query, options, from = 0, to2 = text.length) {
    this.text = text;
    this.to = to2;
    this.curLine = "";
    this.done = false;
    this.value = empty;
    if (/\\[sWDnr]|\n|\r|\[\^/.test(query))
      return new MultilineRegExpCursor(text, query, options, from, to2);
    this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
    this.test = options === null || options === void 0 ? void 0 : options.test;
    this.iter = text.iter();
    let startLine = text.lineAt(from);
    this.curLineStart = startLine.from;
    this.matchPos = toCharEnd(text, from);
    this.getLine(this.curLineStart);
  }
  getLine(skip) {
    this.iter.next(skip);
    if (this.iter.lineBreak) {
      this.curLine = "";
    } else {
      this.curLine = this.iter.value;
      if (this.curLineStart + this.curLine.length > this.to)
        this.curLine = this.curLine.slice(0, this.to - this.curLineStart);
      this.iter.next();
    }
  }
  nextLine() {
    this.curLineStart = this.curLineStart + this.curLine.length + 1;
    if (this.curLineStart > this.to)
      this.curLine = "";
    else
      this.getLine(0);
  }
  /**
  Move to the next match, if there is one.
  */
  next() {
    for (let off = this.matchPos - this.curLineStart; ; ) {
      this.re.lastIndex = off;
      let match = this.matchPos <= this.to && this.re.exec(this.curLine);
      if (match) {
        let from = this.curLineStart + match.index, to2 = from + match[0].length;
        this.matchPos = toCharEnd(this.text, to2 + (from == to2 ? 1 : 0));
        if (from == this.curLineStart + this.curLine.length)
          this.nextLine();
        if ((from < to2 || from > this.value.to) && (!this.test || this.test(from, to2, match))) {
          this.value = { from, to: to2, match };
          return this;
        }
        off = this.matchPos - this.curLineStart;
      } else if (this.curLineStart + this.curLine.length < this.to) {
        this.nextLine();
        off = 0;
      } else {
        this.done = true;
        return this;
      }
    }
  }
};
var flattened = /* @__PURE__ */ new WeakMap();
var FlattenedDoc = class _FlattenedDoc {
  constructor(from, text) {
    this.from = from;
    this.text = text;
  }
  get to() {
    return this.from + this.text.length;
  }
  static get(doc, from, to2) {
    let cached = flattened.get(doc);
    if (!cached || cached.from >= to2 || cached.to <= from) {
      let flat = new _FlattenedDoc(from, doc.sliceString(from, to2));
      flattened.set(doc, flat);
      return flat;
    }
    if (cached.from == from && cached.to == to2)
      return cached;
    let { text, from: cachedFrom } = cached;
    if (cachedFrom > from) {
      text = doc.sliceString(from, cachedFrom) + text;
      cachedFrom = from;
    }
    if (cached.to < to2)
      text += doc.sliceString(cached.to, to2);
    flattened.set(doc, new _FlattenedDoc(cachedFrom, text));
    return new _FlattenedDoc(from, text.slice(from - cachedFrom, to2 - cachedFrom));
  }
};
var MultilineRegExpCursor = class {
  constructor(text, query, options, from, to2) {
    this.text = text;
    this.to = to2;
    this.done = false;
    this.value = empty;
    this.matchPos = toCharEnd(text, from);
    this.re = new RegExp(query, baseFlags + ((options === null || options === void 0 ? void 0 : options.ignoreCase) ? "i" : ""));
    this.test = options === null || options === void 0 ? void 0 : options.test;
    this.flat = FlattenedDoc.get(text, from, this.chunkEnd(
      from + 5e3
      /* Chunk.Base */
    ));
  }
  chunkEnd(pos) {
    return pos >= this.to ? this.to : this.text.lineAt(pos).to;
  }
  next() {
    for (; ; ) {
      let off = this.re.lastIndex = this.matchPos - this.flat.from;
      let match = this.re.exec(this.flat.text);
      if (match && !match[0] && match.index == off) {
        this.re.lastIndex = off + 1;
        match = this.re.exec(this.flat.text);
      }
      if (match) {
        let from = this.flat.from + match.index, to2 = from + match[0].length;
        if ((this.flat.to >= this.to || match.index + match[0].length <= this.flat.text.length - 10) && (!this.test || this.test(from, to2, match))) {
          this.value = { from, to: to2, match };
          this.matchPos = toCharEnd(this.text, to2 + (from == to2 ? 1 : 0));
          return this;
        }
      }
      if (this.flat.to == this.to) {
        this.done = true;
        return this;
      }
      this.flat = FlattenedDoc.get(this.text, this.flat.from, this.chunkEnd(this.flat.from + this.flat.text.length * 2));
    }
  }
};
if (typeof Symbol != "undefined") {
  RegExpCursor.prototype[Symbol.iterator] = MultilineRegExpCursor.prototype[Symbol.iterator] = function() {
    return this;
  };
}
function validRegExp(source) {
  try {
    new RegExp(source, baseFlags);
    return true;
  } catch (_a) {
    return false;
  }
}
function toCharEnd(text, pos) {
  if (pos >= text.length)
    return pos;
  let line = text.lineAt(pos), next;
  while (pos < line.to && (next = line.text.charCodeAt(pos - line.from)) >= 56320 && next < 57344)
    pos++;
  return pos;
}
function createLineDialog(view) {
  let line = String(view.state.doc.lineAt(view.state.selection.main.head).number);
  let input = crelt("input", { class: "cm-textfield", name: "line", value: line });
  let dom = crelt("form", {
    class: "cm-gotoLine",
    onkeydown: (event) => {
      if (event.keyCode == 27) {
        event.preventDefault();
        view.dispatch({ effects: dialogEffect.of(false) });
        view.focus();
      } else if (event.keyCode == 13) {
        event.preventDefault();
        go2();
      }
    },
    onsubmit: (event) => {
      event.preventDefault();
      go2();
    }
  }, crelt("label", view.state.phrase("Go to line"), ": ", input), " ", crelt("button", { class: "cm-button", type: "submit" }, view.state.phrase("go")));
  function go2() {
    let match = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(input.value);
    if (!match)
      return;
    let { state } = view, startLine = state.doc.lineAt(state.selection.main.head);
    let [, sign, ln, cl, percent] = match;
    let col = cl ? +cl.slice(1) : 0;
    let line2 = ln ? +ln : startLine.number;
    if (ln && percent) {
      let pc = line2 / 100;
      if (sign)
        pc = pc * (sign == "-" ? -1 : 1) + startLine.number / state.doc.lines;
      line2 = Math.round(state.doc.lines * pc);
    } else if (ln && sign) {
      line2 = line2 * (sign == "-" ? -1 : 1) + startLine.number;
    }
    let docLine = state.doc.line(Math.max(1, Math.min(state.doc.lines, line2)));
    let selection = EditorSelection.cursor(docLine.from + Math.max(0, Math.min(col, docLine.length)));
    view.dispatch({
      effects: [dialogEffect.of(false), EditorView.scrollIntoView(selection.from, { y: "center" })],
      selection
    });
    view.focus();
  }
  return { dom };
}
var dialogEffect = StateEffect.define();
var dialogField = StateField.define({
  create() {
    return true;
  },
  update(value, tr) {
    for (let e4 of tr.effects)
      if (e4.is(dialogEffect))
        value = e4.value;
    return value;
  },
  provide: (f3) => showPanel.from(f3, (val) => val ? createLineDialog : null)
});
var gotoLine = (view) => {
  let panel = getPanel(view, createLineDialog);
  if (!panel) {
    let effects = [dialogEffect.of(true)];
    if (view.state.field(dialogField, false) == null)
      effects.push(StateEffect.appendConfig.of([dialogField, baseTheme$1]));
    view.dispatch({ effects });
    panel = getPanel(view, createLineDialog);
  }
  if (panel)
    panel.dom.querySelector("input").select();
  return true;
};
var baseTheme$1 = EditorView.baseTheme({
  ".cm-panel.cm-gotoLine": {
    padding: "2px 6px 4px",
    "& label": { fontSize: "80%" }
  }
});
var defaultHighlightOptions = {
  highlightWordAroundCursor: false,
  minSelectionLength: 1,
  maxMatches: 100,
  wholeWords: false
};
var highlightConfig = Facet.define({
  combine(options) {
    return combineConfig(options, defaultHighlightOptions, {
      highlightWordAroundCursor: (a2, b4) => a2 || b4,
      minSelectionLength: Math.min,
      maxMatches: Math.min
    });
  }
});
function highlightSelectionMatches(options) {
  let ext = [defaultTheme, matchHighlighter];
  if (options)
    ext.push(highlightConfig.of(options));
  return ext;
}
var matchDeco = Decoration.mark({ class: "cm-selectionMatch" });
var mainMatchDeco = Decoration.mark({ class: "cm-selectionMatch cm-selectionMatch-main" });
function insideWordBoundaries(check, state, from, to2) {
  return (from == 0 || check(state.sliceDoc(from - 1, from)) != CharCategory.Word) && (to2 == state.doc.length || check(state.sliceDoc(to2, to2 + 1)) != CharCategory.Word);
}
function insideWord(check, state, from, to2) {
  return check(state.sliceDoc(from, from + 1)) == CharCategory.Word && check(state.sliceDoc(to2 - 1, to2)) == CharCategory.Word;
}
var matchHighlighter = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = this.getDeco(view);
  }
  update(update) {
    if (update.selectionSet || update.docChanged || update.viewportChanged)
      this.decorations = this.getDeco(update.view);
  }
  getDeco(view) {
    let conf = view.state.facet(highlightConfig);
    let { state } = view, sel = state.selection;
    if (sel.ranges.length > 1)
      return Decoration.none;
    let range = sel.main, query, check = null;
    if (range.empty) {
      if (!conf.highlightWordAroundCursor)
        return Decoration.none;
      let word = state.wordAt(range.head);
      if (!word)
        return Decoration.none;
      check = state.charCategorizer(range.head);
      query = state.sliceDoc(word.from, word.to);
    } else {
      let len = range.to - range.from;
      if (len < conf.minSelectionLength || len > 200)
        return Decoration.none;
      if (conf.wholeWords) {
        query = state.sliceDoc(range.from, range.to);
        check = state.charCategorizer(range.head);
        if (!(insideWordBoundaries(check, state, range.from, range.to) && insideWord(check, state, range.from, range.to)))
          return Decoration.none;
      } else {
        query = state.sliceDoc(range.from, range.to).trim();
        if (!query)
          return Decoration.none;
      }
    }
    let deco = [];
    for (let part of view.visibleRanges) {
      let cursor = new SearchCursor(state.doc, query, part.from, part.to);
      while (!cursor.next().done) {
        let { from, to: to2 } = cursor.value;
        if (!check || insideWordBoundaries(check, state, from, to2)) {
          if (range.empty && from <= range.from && to2 >= range.to)
            deco.push(mainMatchDeco.range(from, to2));
          else if (from >= range.to || to2 <= range.from)
            deco.push(matchDeco.range(from, to2));
          if (deco.length > conf.maxMatches)
            return Decoration.none;
        }
      }
    }
    return Decoration.set(deco);
  }
}, {
  decorations: (v) => v.decorations
});
var defaultTheme = EditorView.baseTheme({
  ".cm-selectionMatch": { backgroundColor: "#99ff7780" },
  ".cm-searchMatch .cm-selectionMatch": { backgroundColor: "transparent" }
});
var selectWord = ({ state, dispatch }) => {
  let { selection } = state;
  let newSel = EditorSelection.create(selection.ranges.map((range) => state.wordAt(range.head) || EditorSelection.cursor(range.head)), selection.mainIndex);
  if (newSel.eq(selection))
    return false;
  dispatch(state.update({ selection: newSel }));
  return true;
};
function findNextOccurrence(state, query) {
  let { main, ranges } = state.selection;
  let word = state.wordAt(main.head), fullWord = word && word.from == main.from && word.to == main.to;
  for (let cycled = false, cursor = new SearchCursor(state.doc, query, ranges[ranges.length - 1].to); ; ) {
    cursor.next();
    if (cursor.done) {
      if (cycled)
        return null;
      cursor = new SearchCursor(state.doc, query, 0, Math.max(0, ranges[ranges.length - 1].from - 1));
      cycled = true;
    } else {
      if (cycled && ranges.some((r4) => r4.from == cursor.value.from))
        continue;
      if (fullWord) {
        let word2 = state.wordAt(cursor.value.from);
        if (!word2 || word2.from != cursor.value.from || word2.to != cursor.value.to)
          continue;
      }
      return cursor.value;
    }
  }
}
var selectNextOccurrence = ({ state, dispatch }) => {
  let { ranges } = state.selection;
  if (ranges.some((sel) => sel.from === sel.to))
    return selectWord({ state, dispatch });
  let searchedText = state.sliceDoc(ranges[0].from, ranges[0].to);
  if (state.selection.ranges.some((r4) => state.sliceDoc(r4.from, r4.to) != searchedText))
    return false;
  let range = findNextOccurrence(state, searchedText);
  if (!range)
    return false;
  dispatch(state.update({
    selection: state.selection.addRange(EditorSelection.range(range.from, range.to), false),
    effects: EditorView.scrollIntoView(range.to)
  }));
  return true;
};
var searchConfigFacet = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      top: false,
      caseSensitive: false,
      literal: false,
      regexp: false,
      wholeWord: false,
      createPanel: (view) => new SearchPanel(view),
      scrollToMatch: (range) => EditorView.scrollIntoView(range)
    });
  }
});
var SearchQuery = class {
  /**
  Create a query object.
  */
  constructor(config) {
    this.search = config.search;
    this.caseSensitive = !!config.caseSensitive;
    this.literal = !!config.literal;
    this.regexp = !!config.regexp;
    this.replace = config.replace || "";
    this.valid = !!this.search && (!this.regexp || validRegExp(this.search));
    this.unquoted = this.unquote(this.search);
    this.wholeWord = !!config.wholeWord;
  }
  /**
  @internal
  */
  unquote(text) {
    return this.literal ? text : text.replace(/\\([nrt\\])/g, (_3, ch) => ch == "n" ? "\n" : ch == "r" ? "\r" : ch == "t" ? "	" : "\\");
  }
  /**
  Compare this query to another query.
  */
  eq(other) {
    return this.search == other.search && this.replace == other.replace && this.caseSensitive == other.caseSensitive && this.regexp == other.regexp && this.wholeWord == other.wholeWord;
  }
  /**
  @internal
  */
  create() {
    return this.regexp ? new RegExpQuery(this) : new StringQuery(this);
  }
  /**
  Get a search cursor for this query, searching through the given
  range in the given state.
  */
  getCursor(state, from = 0, to2) {
    let st = state.doc ? state : EditorState.create({ doc: state });
    if (to2 == null)
      to2 = st.doc.length;
    return this.regexp ? regexpCursor(this, st, from, to2) : stringCursor(this, st, from, to2);
  }
};
var QueryType = class {
  constructor(spec) {
    this.spec = spec;
  }
};
function stringCursor(spec, state, from, to2) {
  return new SearchCursor(state.doc, spec.unquoted, from, to2, spec.caseSensitive ? void 0 : (x3) => x3.toLowerCase(), spec.wholeWord ? stringWordTest(state.doc, state.charCategorizer(state.selection.main.head)) : void 0);
}
function stringWordTest(doc, categorizer) {
  return (from, to2, buf, bufPos) => {
    if (bufPos > from || bufPos + buf.length < to2) {
      bufPos = Math.max(0, from - 2);
      buf = doc.sliceString(bufPos, Math.min(doc.length, to2 + 2));
    }
    return (categorizer(charBefore(buf, from - bufPos)) != CharCategory.Word || categorizer(charAfter(buf, from - bufPos)) != CharCategory.Word) && (categorizer(charAfter(buf, to2 - bufPos)) != CharCategory.Word || categorizer(charBefore(buf, to2 - bufPos)) != CharCategory.Word);
  };
}
var StringQuery = class extends QueryType {
  constructor(spec) {
    super(spec);
  }
  nextMatch(state, curFrom, curTo) {
    let cursor = stringCursor(this.spec, state, curTo, state.doc.length).nextOverlapping();
    if (cursor.done)
      cursor = stringCursor(this.spec, state, 0, curFrom).nextOverlapping();
    return cursor.done ? null : cursor.value;
  }
  // Searching in reverse is, rather than implementing an inverted search
  // cursor, done by scanning chunk after chunk forward.
  prevMatchInRange(state, from, to2) {
    for (let pos = to2; ; ) {
      let start = Math.max(from, pos - 1e4 - this.spec.unquoted.length);
      let cursor = stringCursor(this.spec, state, start, pos), range = null;
      while (!cursor.nextOverlapping().done)
        range = cursor.value;
      if (range)
        return range;
      if (start == from)
        return null;
      pos -= 1e4;
    }
  }
  prevMatch(state, curFrom, curTo) {
    return this.prevMatchInRange(state, 0, curFrom) || this.prevMatchInRange(state, curTo, state.doc.length);
  }
  getReplacement(_result) {
    return this.spec.unquote(this.spec.replace);
  }
  matchAll(state, limit) {
    let cursor = stringCursor(this.spec, state, 0, state.doc.length), ranges = [];
    while (!cursor.next().done) {
      if (ranges.length >= limit)
        return null;
      ranges.push(cursor.value);
    }
    return ranges;
  }
  highlight(state, from, to2, add2) {
    let cursor = stringCursor(this.spec, state, Math.max(0, from - this.spec.unquoted.length), Math.min(to2 + this.spec.unquoted.length, state.doc.length));
    while (!cursor.next().done)
      add2(cursor.value.from, cursor.value.to);
  }
};
function regexpCursor(spec, state, from, to2) {
  return new RegExpCursor(state.doc, spec.search, {
    ignoreCase: !spec.caseSensitive,
    test: spec.wholeWord ? regexpWordTest(state.charCategorizer(state.selection.main.head)) : void 0
  }, from, to2);
}
function charBefore(str, index) {
  return str.slice(findClusterBreak(str, index, false), index);
}
function charAfter(str, index) {
  return str.slice(index, findClusterBreak(str, index));
}
function regexpWordTest(categorizer) {
  return (_from, _to, match) => !match[0].length || (categorizer(charBefore(match.input, match.index)) != CharCategory.Word || categorizer(charAfter(match.input, match.index)) != CharCategory.Word) && (categorizer(charAfter(match.input, match.index + match[0].length)) != CharCategory.Word || categorizer(charBefore(match.input, match.index + match[0].length)) != CharCategory.Word);
}
var RegExpQuery = class extends QueryType {
  nextMatch(state, curFrom, curTo) {
    let cursor = regexpCursor(this.spec, state, curTo, state.doc.length).next();
    if (cursor.done)
      cursor = regexpCursor(this.spec, state, 0, curFrom).next();
    return cursor.done ? null : cursor.value;
  }
  prevMatchInRange(state, from, to2) {
    for (let size = 1; ; size++) {
      let start = Math.max(
        from,
        to2 - size * 1e4
        /* FindPrev.ChunkSize */
      );
      let cursor = regexpCursor(this.spec, state, start, to2), range = null;
      while (!cursor.next().done)
        range = cursor.value;
      if (range && (start == from || range.from > start + 10))
        return range;
      if (start == from)
        return null;
    }
  }
  prevMatch(state, curFrom, curTo) {
    return this.prevMatchInRange(state, 0, curFrom) || this.prevMatchInRange(state, curTo, state.doc.length);
  }
  getReplacement(result) {
    return this.spec.unquote(this.spec.replace.replace(/\$([$&\d+])/g, (m5, i4) => i4 == "$" ? "$" : i4 == "&" ? result.match[0] : i4 != "0" && +i4 < result.match.length ? result.match[i4] : m5));
  }
  matchAll(state, limit) {
    let cursor = regexpCursor(this.spec, state, 0, state.doc.length), ranges = [];
    while (!cursor.next().done) {
      if (ranges.length >= limit)
        return null;
      ranges.push(cursor.value);
    }
    return ranges;
  }
  highlight(state, from, to2, add2) {
    let cursor = regexpCursor(this.spec, state, Math.max(
      0,
      from - 250
      /* RegExp.HighlightMargin */
    ), Math.min(to2 + 250, state.doc.length));
    while (!cursor.next().done)
      add2(cursor.value.from, cursor.value.to);
  }
};
var setSearchQuery = StateEffect.define();
var togglePanel = StateEffect.define();
var searchState = StateField.define({
  create(state) {
    return new SearchState(defaultQuery(state).create(), null);
  },
  update(value, tr) {
    for (let effect of tr.effects) {
      if (effect.is(setSearchQuery))
        value = new SearchState(effect.value.create(), value.panel);
      else if (effect.is(togglePanel))
        value = new SearchState(value.query, effect.value ? createSearchPanel : null);
    }
    return value;
  },
  provide: (f3) => showPanel.from(f3, (val) => val.panel)
});
var SearchState = class {
  constructor(query, panel) {
    this.query = query;
    this.panel = panel;
  }
};
var matchMark = Decoration.mark({ class: "cm-searchMatch" });
var selectedMatchMark = Decoration.mark({ class: "cm-searchMatch cm-searchMatch-selected" });
var searchHighlighter = ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this.decorations = this.highlight(view.state.field(searchState));
  }
  update(update) {
    let state = update.state.field(searchState);
    if (state != update.startState.field(searchState) || update.docChanged || update.selectionSet || update.viewportChanged)
      this.decorations = this.highlight(state);
  }
  highlight({ query, panel }) {
    if (!panel || !query.spec.valid)
      return Decoration.none;
    let { view } = this;
    let builder = new RangeSetBuilder();
    for (let i4 = 0, ranges = view.visibleRanges, l2 = ranges.length; i4 < l2; i4++) {
      let { from, to: to2 } = ranges[i4];
      while (i4 < l2 - 1 && to2 > ranges[i4 + 1].from - 2 * 250)
        to2 = ranges[++i4].to;
      query.highlight(view.state, from, to2, (from2, to3) => {
        let selected = view.state.selection.ranges.some((r4) => r4.from == from2 && r4.to == to3);
        builder.add(from2, to3, selected ? selectedMatchMark : matchMark);
      });
    }
    return builder.finish();
  }
}, {
  decorations: (v) => v.decorations
});
function searchCommand(f3) {
  return (view) => {
    let state = view.state.field(searchState, false);
    return state && state.query.spec.valid ? f3(view, state) : openSearchPanel(view);
  };
}
var findNext = searchCommand((view, { query }) => {
  let { to: to2 } = view.state.selection.main;
  let next = query.nextMatch(view.state, to2, to2);
  if (!next)
    return false;
  let selection = EditorSelection.single(next.from, next.to);
  let config = view.state.facet(searchConfigFacet);
  view.dispatch({
    selection,
    effects: [announceMatch(view, next), config.scrollToMatch(selection.main, view)],
    userEvent: "select.search"
  });
  selectSearchInput(view);
  return true;
});
var findPrevious = searchCommand((view, { query }) => {
  let { state } = view, { from } = state.selection.main;
  let prev = query.prevMatch(state, from, from);
  if (!prev)
    return false;
  let selection = EditorSelection.single(prev.from, prev.to);
  let config = view.state.facet(searchConfigFacet);
  view.dispatch({
    selection,
    effects: [announceMatch(view, prev), config.scrollToMatch(selection.main, view)],
    userEvent: "select.search"
  });
  selectSearchInput(view);
  return true;
});
var selectMatches = searchCommand((view, { query }) => {
  let ranges = query.matchAll(view.state, 1e3);
  if (!ranges || !ranges.length)
    return false;
  view.dispatch({
    selection: EditorSelection.create(ranges.map((r4) => EditorSelection.range(r4.from, r4.to))),
    userEvent: "select.search.matches"
  });
  return true;
});
var selectSelectionMatches = ({ state, dispatch }) => {
  let sel = state.selection;
  if (sel.ranges.length > 1 || sel.main.empty)
    return false;
  let { from, to: to2 } = sel.main;
  let ranges = [], main = 0;
  for (let cur = new SearchCursor(state.doc, state.sliceDoc(from, to2)); !cur.next().done; ) {
    if (ranges.length > 1e3)
      return false;
    if (cur.value.from == from)
      main = ranges.length;
    ranges.push(EditorSelection.range(cur.value.from, cur.value.to));
  }
  dispatch(state.update({
    selection: EditorSelection.create(ranges, main),
    userEvent: "select.search.matches"
  }));
  return true;
};
var replaceNext = searchCommand((view, { query }) => {
  let { state } = view, { from, to: to2 } = state.selection.main;
  if (state.readOnly)
    return false;
  let next = query.nextMatch(state, from, from);
  if (!next)
    return false;
  let changes = [], selection, replacement;
  let effects = [];
  if (next.from == from && next.to == to2) {
    replacement = state.toText(query.getReplacement(next));
    changes.push({ from: next.from, to: next.to, insert: replacement });
    next = query.nextMatch(state, next.from, next.to);
    effects.push(EditorView.announce.of(state.phrase("replaced match on line $", state.doc.lineAt(from).number) + "."));
  }
  if (next) {
    let off = changes.length == 0 || changes[0].from >= next.to ? 0 : next.to - next.from - replacement.length;
    selection = EditorSelection.single(next.from - off, next.to - off);
    effects.push(announceMatch(view, next));
    effects.push(state.facet(searchConfigFacet).scrollToMatch(selection.main, view));
  }
  view.dispatch({
    changes,
    selection,
    effects,
    userEvent: "input.replace"
  });
  return true;
});
var replaceAll = searchCommand((view, { query }) => {
  if (view.state.readOnly)
    return false;
  let changes = query.matchAll(view.state, 1e9).map((match) => {
    let { from, to: to2 } = match;
    return { from, to: to2, insert: query.getReplacement(match) };
  });
  if (!changes.length)
    return false;
  let announceText = view.state.phrase("replaced $ matches", changes.length) + ".";
  view.dispatch({
    changes,
    effects: EditorView.announce.of(announceText),
    userEvent: "input.replace.all"
  });
  return true;
});
function createSearchPanel(view) {
  return view.state.facet(searchConfigFacet).createPanel(view);
}
function defaultQuery(state, fallback) {
  var _a, _b, _c, _d, _e2;
  let sel = state.selection.main;
  let selText = sel.empty || sel.to > sel.from + 100 ? "" : state.sliceDoc(sel.from, sel.to);
  if (fallback && !selText)
    return fallback;
  let config = state.facet(searchConfigFacet);
  return new SearchQuery({
    search: ((_a = fallback === null || fallback === void 0 ? void 0 : fallback.literal) !== null && _a !== void 0 ? _a : config.literal) ? selText : selText.replace(/\n/g, "\\n"),
    caseSensitive: (_b = fallback === null || fallback === void 0 ? void 0 : fallback.caseSensitive) !== null && _b !== void 0 ? _b : config.caseSensitive,
    literal: (_c = fallback === null || fallback === void 0 ? void 0 : fallback.literal) !== null && _c !== void 0 ? _c : config.literal,
    regexp: (_d = fallback === null || fallback === void 0 ? void 0 : fallback.regexp) !== null && _d !== void 0 ? _d : config.regexp,
    wholeWord: (_e2 = fallback === null || fallback === void 0 ? void 0 : fallback.wholeWord) !== null && _e2 !== void 0 ? _e2 : config.wholeWord
  });
}
function getSearchInput(view) {
  let panel = getPanel(view, createSearchPanel);
  return panel && panel.dom.querySelector("[main-field]");
}
function selectSearchInput(view) {
  let input = getSearchInput(view);
  if (input && input == view.root.activeElement)
    input.select();
}
var openSearchPanel = (view) => {
  let state = view.state.field(searchState, false);
  if (state && state.panel) {
    let searchInput = getSearchInput(view);
    if (searchInput && searchInput != view.root.activeElement) {
      let query = defaultQuery(view.state, state.query.spec);
      if (query.valid)
        view.dispatch({ effects: setSearchQuery.of(query) });
      searchInput.focus();
      searchInput.select();
    }
  } else {
    view.dispatch({ effects: [
      togglePanel.of(true),
      state ? setSearchQuery.of(defaultQuery(view.state, state.query.spec)) : StateEffect.appendConfig.of(searchExtensions)
    ] });
  }
  return true;
};
var closeSearchPanel = (view) => {
  let state = view.state.field(searchState, false);
  if (!state || !state.panel)
    return false;
  let panel = getPanel(view, createSearchPanel);
  if (panel && panel.dom.contains(view.root.activeElement))
    view.focus();
  view.dispatch({ effects: togglePanel.of(false) });
  return true;
};
var searchKeymap = [
  { key: "Mod-f", run: openSearchPanel, scope: "editor search-panel" },
  { key: "F3", run: findNext, shift: findPrevious, scope: "editor search-panel", preventDefault: true },
  { key: "Mod-g", run: findNext, shift: findPrevious, scope: "editor search-panel", preventDefault: true },
  { key: "Escape", run: closeSearchPanel, scope: "editor search-panel" },
  { key: "Mod-Shift-l", run: selectSelectionMatches },
  { key: "Alt-g", run: gotoLine },
  { key: "Mod-d", run: selectNextOccurrence, preventDefault: true }
];
var SearchPanel = class {
  constructor(view) {
    this.view = view;
    let query = this.query = view.state.field(searchState).query.spec;
    this.commit = this.commit.bind(this);
    this.searchField = crelt("input", {
      value: query.search,
      placeholder: phrase(view, "Find"),
      "aria-label": phrase(view, "Find"),
      class: "cm-textfield",
      name: "search",
      form: "",
      "main-field": "true",
      onchange: this.commit,
      onkeyup: this.commit
    });
    this.replaceField = crelt("input", {
      value: query.replace,
      placeholder: phrase(view, "Replace"),
      "aria-label": phrase(view, "Replace"),
      class: "cm-textfield",
      name: "replace",
      form: "",
      onchange: this.commit,
      onkeyup: this.commit
    });
    this.caseField = crelt("input", {
      type: "checkbox",
      name: "case",
      form: "",
      checked: query.caseSensitive,
      onchange: this.commit
    });
    this.reField = crelt("input", {
      type: "checkbox",
      name: "re",
      form: "",
      checked: query.regexp,
      onchange: this.commit
    });
    this.wordField = crelt("input", {
      type: "checkbox",
      name: "word",
      form: "",
      checked: query.wholeWord,
      onchange: this.commit
    });
    function button(name, onclick, content) {
      return crelt("button", { class: "cm-button", name, onclick, type: "button" }, content);
    }
    this.dom = crelt("div", { onkeydown: (e4) => this.keydown(e4), class: "cm-search" }, [
      this.searchField,
      button("next", () => findNext(view), [phrase(view, "next")]),
      button("prev", () => findPrevious(view), [phrase(view, "previous")]),
      button("select", () => selectMatches(view), [phrase(view, "all")]),
      crelt("label", null, [this.caseField, phrase(view, "match case")]),
      crelt("label", null, [this.reField, phrase(view, "regexp")]),
      crelt("label", null, [this.wordField, phrase(view, "by word")]),
      ...view.state.readOnly ? [] : [
        crelt("br"),
        this.replaceField,
        button("replace", () => replaceNext(view), [phrase(view, "replace")]),
        button("replaceAll", () => replaceAll(view), [phrase(view, "replace all")])
      ],
      crelt("button", {
        name: "close",
        onclick: () => closeSearchPanel(view),
        "aria-label": phrase(view, "close"),
        type: "button"
      }, ["×"])
    ]);
  }
  commit() {
    let query = new SearchQuery({
      search: this.searchField.value,
      caseSensitive: this.caseField.checked,
      regexp: this.reField.checked,
      wholeWord: this.wordField.checked,
      replace: this.replaceField.value
    });
    if (!query.eq(this.query)) {
      this.query = query;
      this.view.dispatch({ effects: setSearchQuery.of(query) });
    }
  }
  keydown(e4) {
    if (runScopeHandlers(this.view, e4, "search-panel")) {
      e4.preventDefault();
    } else if (e4.keyCode == 13 && e4.target == this.searchField) {
      e4.preventDefault();
      (e4.shiftKey ? findPrevious : findNext)(this.view);
    } else if (e4.keyCode == 13 && e4.target == this.replaceField) {
      e4.preventDefault();
      replaceNext(this.view);
    }
  }
  update(update) {
    for (let tr of update.transactions)
      for (let effect of tr.effects) {
        if (effect.is(setSearchQuery) && !effect.value.eq(this.query))
          this.setQuery(effect.value);
      }
  }
  setQuery(query) {
    this.query = query;
    this.searchField.value = query.search;
    this.replaceField.value = query.replace;
    this.caseField.checked = query.caseSensitive;
    this.reField.checked = query.regexp;
    this.wordField.checked = query.wholeWord;
  }
  mount() {
    this.searchField.select();
  }
  get pos() {
    return 80;
  }
  get top() {
    return this.view.state.facet(searchConfigFacet).top;
  }
};
function phrase(view, phrase2) {
  return view.state.phrase(phrase2);
}
var AnnounceMargin = 30;
var Break = /[\s\.,:;?!]/;
function announceMatch(view, { from, to: to2 }) {
  let line = view.state.doc.lineAt(from), lineEnd = view.state.doc.lineAt(to2).to;
  let start = Math.max(line.from, from - AnnounceMargin), end = Math.min(lineEnd, to2 + AnnounceMargin);
  let text = view.state.sliceDoc(start, end);
  if (start != line.from) {
    for (let i4 = 0; i4 < AnnounceMargin; i4++)
      if (!Break.test(text[i4 + 1]) && Break.test(text[i4])) {
        text = text.slice(i4);
        break;
      }
  }
  if (end != lineEnd) {
    for (let i4 = text.length - 1; i4 > text.length - AnnounceMargin; i4--)
      if (!Break.test(text[i4 - 1]) && Break.test(text[i4])) {
        text = text.slice(0, i4);
        break;
      }
  }
  return EditorView.announce.of(`${view.state.phrase("current match")}. ${text} ${view.state.phrase("on line")} ${line.number}.`);
}
var baseTheme = EditorView.baseTheme({
  ".cm-panel.cm-search": {
    padding: "2px 6px 4px",
    position: "relative",
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "4px",
      backgroundColor: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    },
    "& input, & button, & label": {
      margin: ".2em .6em .2em 0"
    },
    "& input[type=checkbox]": {
      marginRight: ".2em"
    },
    "& label": {
      fontSize: "80%",
      whiteSpace: "pre"
    }
  },
  "&light .cm-searchMatch": { backgroundColor: "#ffff0054" },
  "&dark .cm-searchMatch": { backgroundColor: "#00ffff8a" },
  "&light .cm-searchMatch-selected": { backgroundColor: "#ff6a0054" },
  "&dark .cm-searchMatch-selected": { backgroundColor: "#ff00ff8a" }
});
var searchExtensions = [
  searchState,
  Prec.low(searchHighlighter),
  baseTheme
];

// node_modules/@codemirror/lint/dist/index.js
var SelectedDiagnostic = class {
  constructor(from, to2, diagnostic) {
    this.from = from;
    this.to = to2;
    this.diagnostic = diagnostic;
  }
};
var LintState = class _LintState {
  constructor(diagnostics, panel, selected) {
    this.diagnostics = diagnostics;
    this.panel = panel;
    this.selected = selected;
  }
  static init(diagnostics, panel, state) {
    let markedDiagnostics = diagnostics;
    let diagnosticFilter = state.facet(lintConfig).markerFilter;
    if (diagnosticFilter)
      markedDiagnostics = diagnosticFilter(markedDiagnostics);
    let ranges = Decoration.set(markedDiagnostics.map((d3) => {
      return d3.from == d3.to || d3.from == d3.to - 1 && state.doc.lineAt(d3.from).to == d3.from ? Decoration.widget({
        widget: new DiagnosticWidget(d3),
        diagnostic: d3
      }).range(d3.from) : Decoration.mark({
        attributes: { class: "cm-lintRange cm-lintRange-" + d3.severity + (d3.markClass ? " " + d3.markClass : "") },
        diagnostic: d3
      }).range(d3.from, d3.to);
    }), true);
    return new _LintState(ranges, panel, findDiagnostic(ranges));
  }
};
function findDiagnostic(diagnostics, diagnostic = null, after = 0) {
  let found = null;
  diagnostics.between(after, 1e9, (from, to2, { spec }) => {
    if (diagnostic && spec.diagnostic != diagnostic)
      return;
    found = new SelectedDiagnostic(from, to2, spec.diagnostic);
    return false;
  });
  return found;
}
function hideTooltip(tr, tooltip) {
  let line = tr.startState.doc.lineAt(tooltip.pos);
  return !!(tr.effects.some((e4) => e4.is(setDiagnosticsEffect)) || tr.changes.touchesRange(line.from, line.to));
}
function maybeEnableLint(state, effects) {
  return state.field(lintState, false) ? effects : effects.concat(StateEffect.appendConfig.of(lintExtensions));
}
function setDiagnostics(state, diagnostics) {
  return {
    effects: maybeEnableLint(state, [setDiagnosticsEffect.of(diagnostics)])
  };
}
var setDiagnosticsEffect = StateEffect.define();
var togglePanel2 = StateEffect.define();
var movePanelSelection = StateEffect.define();
var lintState = StateField.define({
  create() {
    return new LintState(Decoration.none, null, null);
  },
  update(value, tr) {
    if (tr.docChanged) {
      let mapped = value.diagnostics.map(tr.changes), selected = null;
      if (value.selected) {
        let selPos = tr.changes.mapPos(value.selected.from, 1);
        selected = findDiagnostic(mapped, value.selected.diagnostic, selPos) || findDiagnostic(mapped, null, selPos);
      }
      value = new LintState(mapped, value.panel, selected);
    }
    for (let effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        value = LintState.init(effect.value, value.panel, tr.state);
      } else if (effect.is(togglePanel2)) {
        value = new LintState(value.diagnostics, effect.value ? LintPanel.open : null, value.selected);
      } else if (effect.is(movePanelSelection)) {
        value = new LintState(value.diagnostics, value.panel, effect.value);
      }
    }
    return value;
  },
  provide: (f3) => [
    showPanel.from(f3, (val) => val.panel),
    EditorView.decorations.from(f3, (s2) => s2.diagnostics)
  ]
});
var activeMark = Decoration.mark({ class: "cm-lintRange cm-lintRange-active" });
function lintTooltip(view, pos, side) {
  let { diagnostics } = view.state.field(lintState);
  let found = [], stackStart = 2e8, stackEnd = 0;
  diagnostics.between(pos - (side < 0 ? 1 : 0), pos + (side > 0 ? 1 : 0), (from, to2, { spec }) => {
    if (pos >= from && pos <= to2 && (from == to2 || (pos > from || side > 0) && (pos < to2 || side < 0))) {
      found.push(spec.diagnostic);
      stackStart = Math.min(from, stackStart);
      stackEnd = Math.max(to2, stackEnd);
    }
  });
  let diagnosticFilter = view.state.facet(lintConfig).tooltipFilter;
  if (diagnosticFilter)
    found = diagnosticFilter(found);
  if (!found.length)
    return null;
  return {
    pos: stackStart,
    end: stackEnd,
    above: view.state.doc.lineAt(stackStart).to < stackEnd,
    create() {
      return { dom: diagnosticsTooltip(view, found) };
    }
  };
}
function diagnosticsTooltip(view, diagnostics) {
  return crelt("ul", { class: "cm-tooltip-lint" }, diagnostics.map((d3) => renderDiagnostic(view, d3, false)));
}
var openLintPanel = (view) => {
  let field = view.state.field(lintState, false);
  if (!field || !field.panel)
    view.dispatch({ effects: maybeEnableLint(view.state, [togglePanel2.of(true)]) });
  let panel = getPanel(view, LintPanel.open);
  if (panel)
    panel.dom.querySelector(".cm-panel-lint ul").focus();
  return true;
};
var closeLintPanel = (view) => {
  let field = view.state.field(lintState, false);
  if (!field || !field.panel)
    return false;
  view.dispatch({ effects: togglePanel2.of(false) });
  return true;
};
var nextDiagnostic = (view) => {
  let field = view.state.field(lintState, false);
  if (!field)
    return false;
  let sel = view.state.selection.main, next = field.diagnostics.iter(sel.to + 1);
  if (!next.value) {
    next = field.diagnostics.iter(0);
    if (!next.value || next.from == sel.from && next.to == sel.to)
      return false;
  }
  view.dispatch({ selection: { anchor: next.from, head: next.to }, scrollIntoView: true });
  return true;
};
var lintKeymap = [
  { key: "Mod-Shift-m", run: openLintPanel, preventDefault: true },
  { key: "F8", run: nextDiagnostic }
];
var lintPlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    this.view = view;
    this.timeout = -1;
    this.set = true;
    let { delay } = view.state.facet(lintConfig);
    this.lintTime = Date.now() + delay;
    this.run = this.run.bind(this);
    this.timeout = setTimeout(this.run, delay);
  }
  run() {
    let now = Date.now();
    if (now < this.lintTime - 10) {
      this.timeout = setTimeout(this.run, this.lintTime - now);
    } else {
      this.set = false;
      let { state } = this.view, { sources } = state.facet(lintConfig);
      Promise.all(sources.map((source) => Promise.resolve(source(this.view)))).then((annotations) => {
        let all = annotations.reduce((a2, b4) => a2.concat(b4));
        if (this.view.state.doc == state.doc)
          this.view.dispatch(setDiagnostics(this.view.state, all));
      }, (error2) => {
        logException(this.view.state, error2);
      });
    }
  }
  update(update) {
    let config = update.state.facet(lintConfig);
    if (update.docChanged || config != update.startState.facet(lintConfig) || config.needsRefresh && config.needsRefresh(update)) {
      this.lintTime = Date.now() + config.delay;
      if (!this.set) {
        this.set = true;
        this.timeout = setTimeout(this.run, config.delay);
      }
    }
  }
  force() {
    if (this.set) {
      this.lintTime = Date.now();
      this.run();
    }
  }
  destroy() {
    clearTimeout(this.timeout);
  }
});
var lintConfig = Facet.define({
  combine(input) {
    return Object.assign({ sources: input.map((i4) => i4.source) }, combineConfig(input.map((i4) => i4.config), {
      delay: 750,
      markerFilter: null,
      tooltipFilter: null,
      needsRefresh: null
    }, {
      needsRefresh: (a2, b4) => !a2 ? b4 : !b4 ? a2 : (u2) => a2(u2) || b4(u2)
    }));
  }
});
function assignKeys(actions) {
  let assigned = [];
  if (actions)
    actions:
      for (let { name } of actions) {
        for (let i4 = 0; i4 < name.length; i4++) {
          let ch = name[i4];
          if (/[a-zA-Z]/.test(ch) && !assigned.some((c2) => c2.toLowerCase() == ch.toLowerCase())) {
            assigned.push(ch);
            continue actions;
          }
        }
        assigned.push("");
      }
  return assigned;
}
function renderDiagnostic(view, diagnostic, inPanel) {
  var _a;
  let keys = inPanel ? assignKeys(diagnostic.actions) : [];
  return crelt("li", { class: "cm-diagnostic cm-diagnostic-" + diagnostic.severity }, crelt("span", { class: "cm-diagnosticText" }, diagnostic.renderMessage ? diagnostic.renderMessage() : diagnostic.message), (_a = diagnostic.actions) === null || _a === void 0 ? void 0 : _a.map((action, i4) => {
    let fired = false, click = (e4) => {
      e4.preventDefault();
      if (fired)
        return;
      fired = true;
      let found = findDiagnostic(view.state.field(lintState).diagnostics, diagnostic);
      if (found)
        action.apply(view, found.from, found.to);
    };
    let { name } = action, keyIndex = keys[i4] ? name.indexOf(keys[i4]) : -1;
    let nameElt = keyIndex < 0 ? name : [
      name.slice(0, keyIndex),
      crelt("u", name.slice(keyIndex, keyIndex + 1)),
      name.slice(keyIndex + 1)
    ];
    return crelt("button", {
      type: "button",
      class: "cm-diagnosticAction",
      onclick: click,
      onmousedown: click,
      "aria-label": ` Action: ${name}${keyIndex < 0 ? "" : ` (access key "${keys[i4]})"`}.`
    }, nameElt);
  }), diagnostic.source && crelt("div", { class: "cm-diagnosticSource" }, diagnostic.source));
}
var DiagnosticWidget = class extends WidgetType {
  constructor(diagnostic) {
    super();
    this.diagnostic = diagnostic;
  }
  eq(other) {
    return other.diagnostic == this.diagnostic;
  }
  toDOM() {
    return crelt("span", { class: "cm-lintPoint cm-lintPoint-" + this.diagnostic.severity });
  }
};
var PanelItem = class {
  constructor(view, diagnostic) {
    this.diagnostic = diagnostic;
    this.id = "item_" + Math.floor(Math.random() * 4294967295).toString(16);
    this.dom = renderDiagnostic(view, diagnostic, true);
    this.dom.id = this.id;
    this.dom.setAttribute("role", "option");
  }
};
var LintPanel = class _LintPanel {
  constructor(view) {
    this.view = view;
    this.items = [];
    let onkeydown = (event) => {
      if (event.keyCode == 27) {
        closeLintPanel(this.view);
        this.view.focus();
      } else if (event.keyCode == 38 || event.keyCode == 33) {
        this.moveSelection((this.selectedIndex - 1 + this.items.length) % this.items.length);
      } else if (event.keyCode == 40 || event.keyCode == 34) {
        this.moveSelection((this.selectedIndex + 1) % this.items.length);
      } else if (event.keyCode == 36) {
        this.moveSelection(0);
      } else if (event.keyCode == 35) {
        this.moveSelection(this.items.length - 1);
      } else if (event.keyCode == 13) {
        this.view.focus();
      } else if (event.keyCode >= 65 && event.keyCode <= 90 && this.selectedIndex >= 0) {
        let { diagnostic } = this.items[this.selectedIndex], keys = assignKeys(diagnostic.actions);
        for (let i4 = 0; i4 < keys.length; i4++)
          if (keys[i4].toUpperCase().charCodeAt(0) == event.keyCode) {
            let found = findDiagnostic(this.view.state.field(lintState).diagnostics, diagnostic);
            if (found)
              diagnostic.actions[i4].apply(view, found.from, found.to);
          }
      } else {
        return;
      }
      event.preventDefault();
    };
    let onclick = (event) => {
      for (let i4 = 0; i4 < this.items.length; i4++) {
        if (this.items[i4].dom.contains(event.target))
          this.moveSelection(i4);
      }
    };
    this.list = crelt("ul", {
      tabIndex: 0,
      role: "listbox",
      "aria-label": this.view.state.phrase("Diagnostics"),
      onkeydown,
      onclick
    });
    this.dom = crelt("div", { class: "cm-panel-lint" }, this.list, crelt("button", {
      type: "button",
      name: "close",
      "aria-label": this.view.state.phrase("close"),
      onclick: () => closeLintPanel(this.view)
    }, "×"));
    this.update();
  }
  get selectedIndex() {
    let selected = this.view.state.field(lintState).selected;
    if (!selected)
      return -1;
    for (let i4 = 0; i4 < this.items.length; i4++)
      if (this.items[i4].diagnostic == selected.diagnostic)
        return i4;
    return -1;
  }
  update() {
    let { diagnostics, selected } = this.view.state.field(lintState);
    let i4 = 0, needsSync = false, newSelectedItem = null;
    diagnostics.between(0, this.view.state.doc.length, (_start, _end, { spec }) => {
      let found = -1, item;
      for (let j2 = i4; j2 < this.items.length; j2++)
        if (this.items[j2].diagnostic == spec.diagnostic) {
          found = j2;
          break;
        }
      if (found < 0) {
        item = new PanelItem(this.view, spec.diagnostic);
        this.items.splice(i4, 0, item);
        needsSync = true;
      } else {
        item = this.items[found];
        if (found > i4) {
          this.items.splice(i4, found - i4);
          needsSync = true;
        }
      }
      if (selected && item.diagnostic == selected.diagnostic) {
        if (!item.dom.hasAttribute("aria-selected")) {
          item.dom.setAttribute("aria-selected", "true");
          newSelectedItem = item;
        }
      } else if (item.dom.hasAttribute("aria-selected")) {
        item.dom.removeAttribute("aria-selected");
      }
      i4++;
    });
    while (i4 < this.items.length && !(this.items.length == 1 && this.items[0].diagnostic.from < 0)) {
      needsSync = true;
      this.items.pop();
    }
    if (this.items.length == 0) {
      this.items.push(new PanelItem(this.view, {
        from: -1,
        to: -1,
        severity: "info",
        message: this.view.state.phrase("No diagnostics")
      }));
      needsSync = true;
    }
    if (newSelectedItem) {
      this.list.setAttribute("aria-activedescendant", newSelectedItem.id);
      this.view.requestMeasure({
        key: this,
        read: () => ({ sel: newSelectedItem.dom.getBoundingClientRect(), panel: this.list.getBoundingClientRect() }),
        write: ({ sel, panel }) => {
          let scaleY = panel.height / this.list.offsetHeight;
          if (sel.top < panel.top)
            this.list.scrollTop -= (panel.top - sel.top) / scaleY;
          else if (sel.bottom > panel.bottom)
            this.list.scrollTop += (sel.bottom - panel.bottom) / scaleY;
        }
      });
    } else if (this.selectedIndex < 0) {
      this.list.removeAttribute("aria-activedescendant");
    }
    if (needsSync)
      this.sync();
  }
  sync() {
    let domPos = this.list.firstChild;
    function rm() {
      let prev = domPos;
      domPos = prev.nextSibling;
      prev.remove();
    }
    for (let item of this.items) {
      if (item.dom.parentNode == this.list) {
        while (domPos != item.dom)
          rm();
        domPos = item.dom.nextSibling;
      } else {
        this.list.insertBefore(item.dom, domPos);
      }
    }
    while (domPos)
      rm();
  }
  moveSelection(selectedIndex) {
    if (this.selectedIndex < 0)
      return;
    let field = this.view.state.field(lintState);
    let selection = findDiagnostic(field.diagnostics, this.items[selectedIndex].diagnostic);
    if (!selection)
      return;
    this.view.dispatch({
      selection: { anchor: selection.from, head: selection.to },
      scrollIntoView: true,
      effects: movePanelSelection.of(selection)
    });
  }
  static open(view) {
    return new _LintPanel(view);
  }
};
function svg(content, attrs = `viewBox="0 0 40 40"`) {
  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${encodeURIComponent(content)}</svg>')`;
}
function underline(color) {
  return svg(`<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${color}" fill="none" stroke-width=".7"/>`, `width="6" height="3"`);
}
var baseTheme2 = EditorView.baseTheme({
  ".cm-diagnostic": {
    padding: "3px 6px 3px 8px",
    marginLeft: "-1px",
    display: "block",
    whiteSpace: "pre-wrap"
  },
  ".cm-diagnostic-error": { borderLeft: "5px solid #d11" },
  ".cm-diagnostic-warning": { borderLeft: "5px solid orange" },
  ".cm-diagnostic-info": { borderLeft: "5px solid #999" },
  ".cm-diagnostic-hint": { borderLeft: "5px solid #66d" },
  ".cm-diagnosticAction": {
    font: "inherit",
    border: "none",
    padding: "2px 4px",
    backgroundColor: "#444",
    color: "white",
    borderRadius: "3px",
    marginLeft: "8px",
    cursor: "pointer"
  },
  ".cm-diagnosticSource": {
    fontSize: "70%",
    opacity: 0.7
  },
  ".cm-lintRange": {
    backgroundPosition: "left bottom",
    backgroundRepeat: "repeat-x",
    paddingBottom: "0.7px"
  },
  ".cm-lintRange-error": { backgroundImage: underline("#d11") },
  ".cm-lintRange-warning": { backgroundImage: underline("orange") },
  ".cm-lintRange-info": { backgroundImage: underline("#999") },
  ".cm-lintRange-hint": { backgroundImage: underline("#66d") },
  ".cm-lintRange-active": { backgroundColor: "#ffdd9980" },
  ".cm-tooltip-lint": {
    padding: 0,
    margin: 0
  },
  ".cm-lintPoint": {
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "-2px",
      borderLeft: "3px solid transparent",
      borderRight: "3px solid transparent",
      borderBottom: "4px solid #d11"
    }
  },
  ".cm-lintPoint-warning": {
    "&:after": { borderBottomColor: "orange" }
  },
  ".cm-lintPoint-info": {
    "&:after": { borderBottomColor: "#999" }
  },
  ".cm-lintPoint-hint": {
    "&:after": { borderBottomColor: "#66d" }
  },
  ".cm-panel.cm-panel-lint": {
    position: "relative",
    "& ul": {
      maxHeight: "100px",
      overflowY: "auto",
      "& [aria-selected]": {
        backgroundColor: "#ddd",
        "& u": { textDecoration: "underline" }
      },
      "&:focus [aria-selected]": {
        background_fallback: "#bdf",
        backgroundColor: "Highlight",
        color_fallback: "white",
        color: "HighlightText"
      },
      "& u": { textDecoration: "none" },
      padding: 0,
      margin: 0
    },
    "& [name=close]": {
      position: "absolute",
      top: "0",
      right: "2px",
      background: "inherit",
      border: "none",
      font: "inherit",
      padding: 0,
      margin: 0
    }
  }
});
function severityWeight(sev) {
  return sev == "error" ? 4 : sev == "warning" ? 3 : sev == "info" ? 2 : 1;
}
var LintGutterMarker = class extends GutterMarker {
  constructor(diagnostics) {
    super();
    this.diagnostics = diagnostics;
    this.severity = diagnostics.reduce((max, d3) => severityWeight(max) < severityWeight(d3.severity) ? d3.severity : max, "hint");
  }
  toDOM(view) {
    let elt = document.createElement("div");
    elt.className = "cm-lint-marker cm-lint-marker-" + this.severity;
    let diagnostics = this.diagnostics;
    let diagnosticsFilter = view.state.facet(lintGutterConfig).tooltipFilter;
    if (diagnosticsFilter)
      diagnostics = diagnosticsFilter(diagnostics);
    if (diagnostics.length)
      elt.onmouseover = () => gutterMarkerMouseOver(view, elt, diagnostics);
    return elt;
  }
};
function trackHoverOn(view, marker) {
  let mousemove = (event) => {
    let rect = marker.getBoundingClientRect();
    if (event.clientX > rect.left - 10 && event.clientX < rect.right + 10 && event.clientY > rect.top - 10 && event.clientY < rect.bottom + 10)
      return;
    for (let target = event.target; target; target = target.parentNode) {
      if (target.nodeType == 1 && target.classList.contains("cm-tooltip-lint"))
        return;
    }
    window.removeEventListener("mousemove", mousemove);
    if (view.state.field(lintGutterTooltip))
      view.dispatch({ effects: setLintGutterTooltip.of(null) });
  };
  window.addEventListener("mousemove", mousemove);
}
function gutterMarkerMouseOver(view, marker, diagnostics) {
  function hovered() {
    let line = view.elementAtHeight(marker.getBoundingClientRect().top + 5 - view.documentTop);
    const linePos = view.coordsAtPos(line.from);
    if (linePos) {
      view.dispatch({ effects: setLintGutterTooltip.of({
        pos: line.from,
        above: false,
        create() {
          return {
            dom: diagnosticsTooltip(view, diagnostics),
            getCoords: () => marker.getBoundingClientRect()
          };
        }
      }) });
    }
    marker.onmouseout = marker.onmousemove = null;
    trackHoverOn(view, marker);
  }
  let { hoverTime } = view.state.facet(lintGutterConfig);
  let hoverTimeout = setTimeout(hovered, hoverTime);
  marker.onmouseout = () => {
    clearTimeout(hoverTimeout);
    marker.onmouseout = marker.onmousemove = null;
  };
  marker.onmousemove = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(hovered, hoverTime);
  };
}
function markersForDiagnostics(doc, diagnostics) {
  let byLine = /* @__PURE__ */ Object.create(null);
  for (let diagnostic of diagnostics) {
    let line = doc.lineAt(diagnostic.from);
    (byLine[line.from] || (byLine[line.from] = [])).push(diagnostic);
  }
  let markers = [];
  for (let line in byLine) {
    markers.push(new LintGutterMarker(byLine[line]).range(+line));
  }
  return RangeSet.of(markers, true);
}
var lintGutterExtension = gutter({
  class: "cm-gutter-lint",
  markers: (view) => view.state.field(lintGutterMarkers)
});
var lintGutterMarkers = StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(markers, tr) {
    markers = markers.map(tr.changes);
    let diagnosticFilter = tr.state.facet(lintGutterConfig).markerFilter;
    for (let effect of tr.effects) {
      if (effect.is(setDiagnosticsEffect)) {
        let diagnostics = effect.value;
        if (diagnosticFilter)
          diagnostics = diagnosticFilter(diagnostics || []);
        markers = markersForDiagnostics(tr.state.doc, diagnostics.slice(0));
      }
    }
    return markers;
  }
});
var setLintGutterTooltip = StateEffect.define();
var lintGutterTooltip = StateField.define({
  create() {
    return null;
  },
  update(tooltip, tr) {
    if (tooltip && tr.docChanged)
      tooltip = hideTooltip(tr, tooltip) ? null : Object.assign(Object.assign({}, tooltip), { pos: tr.changes.mapPos(tooltip.pos) });
    return tr.effects.reduce((t2, e4) => e4.is(setLintGutterTooltip) ? e4.value : t2, tooltip);
  },
  provide: (field) => showTooltip.from(field)
});
var lintGutterTheme = EditorView.baseTheme({
  ".cm-gutter-lint": {
    width: "1.4em",
    "& .cm-gutterElement": {
      padding: ".2em"
    }
  },
  ".cm-lint-marker": {
    width: "1em",
    height: "1em"
  },
  ".cm-lint-marker-info": {
    content: svg(`<path fill="#aaf" stroke="#77e" stroke-width="6" stroke-linejoin="round" d="M5 5L35 5L35 35L5 35Z"/>`)
  },
  ".cm-lint-marker-warning": {
    content: svg(`<path fill="#fe8" stroke="#fd7" stroke-width="6" stroke-linejoin="round" d="M20 6L37 35L3 35Z"/>`)
  },
  ".cm-lint-marker-error": {
    content: svg(`<circle cx="20" cy="20" r="15" fill="#f87" stroke="#f43" stroke-width="6"/>`)
  }
});
var lintExtensions = [
  lintState,
  EditorView.decorations.compute([lintState], (state) => {
    let { selected, panel } = state.field(lintState);
    return !selected || !panel || selected.from == selected.to ? Decoration.none : Decoration.set([
      activeMark.range(selected.from, selected.to)
    ]);
  }),
  hoverTooltip(lintTooltip, { hideOn: hideTooltip }),
  baseTheme2
];
var lintGutterConfig = Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      hoverTime: 300,
      markerFilter: null,
      tooltipFilter: null
    });
  }
});

// node_modules/codemirror/dist/index.js
var basicSetup = (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
])();
var minimalSetup = (() => [
  highlightSpecialChars(),
  history(),
  drawSelection(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap
  ])
])();

// node_modules/@codemirror/language-data/dist/index.js
function legacy(parser) {
  return new LanguageSupport(StreamLanguage.define(parser));
}
function sql(dialectName) {
  return import("./dist-Q67HELQG.js").then((m5) => m5.sql({ dialect: m5[dialectName] }));
}
var languages = [
  // New-style language modes
  LanguageDescription.of({
    name: "C",
    extensions: ["c", "h", "ino"],
    load() {
      return import("./dist-EQ23FJT3.js").then((m5) => m5.cpp());
    }
  }),
  LanguageDescription.of({
    name: "C++",
    alias: ["cpp"],
    extensions: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
    load() {
      return import("./dist-EQ23FJT3.js").then((m5) => m5.cpp());
    }
  }),
  LanguageDescription.of({
    name: "CQL",
    alias: ["cassandra"],
    extensions: ["cql"],
    load() {
      return sql("Cassandra");
    }
  }),
  LanguageDescription.of({
    name: "CSS",
    extensions: ["css"],
    load() {
      return import("./dist-7VTLQXQC.js").then((m5) => m5.css());
    }
  }),
  LanguageDescription.of({
    name: "HTML",
    alias: ["xhtml"],
    extensions: ["html", "htm", "handlebars", "hbs"],
    load() {
      return import("./dist-QXKTFP3F.js").then((m5) => m5.html());
    }
  }),
  LanguageDescription.of({
    name: "Java",
    extensions: ["java"],
    load() {
      return import("./dist-SRWBBXLO.js").then((m5) => m5.java());
    }
  }),
  LanguageDescription.of({
    name: "JavaScript",
    alias: ["ecmascript", "js", "node"],
    extensions: ["js", "mjs", "cjs"],
    load() {
      return import("./dist-IDZ6TPOT.js").then((m5) => m5.javascript());
    }
  }),
  LanguageDescription.of({
    name: "JSON",
    alias: ["json5"],
    extensions: ["json", "map"],
    load() {
      return import("./dist-23AW4CCK.js").then((m5) => m5.json());
    }
  }),
  LanguageDescription.of({
    name: "JSX",
    extensions: ["jsx"],
    load() {
      return import("./dist-IDZ6TPOT.js").then((m5) => m5.javascript({ jsx: true }));
    }
  }),
  LanguageDescription.of({
    name: "LESS",
    extensions: ["less"],
    load() {
      return import("./dist-I2SUC5YV.js").then((m5) => m5.less());
    }
  }),
  LanguageDescription.of({
    name: "MariaDB SQL",
    load() {
      return sql("MariaSQL");
    }
  }),
  LanguageDescription.of({
    name: "Markdown",
    extensions: ["md", "markdown", "mkd"],
    load() {
      return import("./dist-NQUILAKV.js").then((m5) => m5.markdown());
    }
  }),
  LanguageDescription.of({
    name: "MS SQL",
    load() {
      return sql("MSSQL");
    }
  }),
  LanguageDescription.of({
    name: "MySQL",
    load() {
      return sql("MySQL");
    }
  }),
  LanguageDescription.of({
    name: "PHP",
    extensions: ["php", "php3", "php4", "php5", "php7", "phtml"],
    load() {
      return import("./dist-FDDK7TGE.js").then((m5) => m5.php());
    }
  }),
  LanguageDescription.of({
    name: "PLSQL",
    extensions: ["pls"],
    load() {
      return sql("PLSQL");
    }
  }),
  LanguageDescription.of({
    name: "PostgreSQL",
    load() {
      return sql("PostgreSQL");
    }
  }),
  LanguageDescription.of({
    name: "Python",
    extensions: ["BUILD", "bzl", "py", "pyw"],
    filename: /^(BUCK|BUILD)$/,
    load() {
      return import("./dist-4BI7MP4D.js").then((m5) => m5.python());
    }
  }),
  LanguageDescription.of({
    name: "Rust",
    extensions: ["rs"],
    load() {
      return import("./dist-T7CWCQH7.js").then((m5) => m5.rust());
    }
  }),
  LanguageDescription.of({
    name: "Sass",
    extensions: ["sass"],
    load() {
      return import("./dist-BUTB2PYH.js").then((m5) => m5.sass({ indented: true }));
    }
  }),
  LanguageDescription.of({
    name: "SCSS",
    extensions: ["scss"],
    load() {
      return import("./dist-BUTB2PYH.js").then((m5) => m5.sass());
    }
  }),
  LanguageDescription.of({
    name: "SQL",
    extensions: ["sql"],
    load() {
      return sql("StandardSQL");
    }
  }),
  LanguageDescription.of({
    name: "SQLite",
    load() {
      return sql("SQLite");
    }
  }),
  LanguageDescription.of({
    name: "TSX",
    extensions: ["tsx"],
    load() {
      return import("./dist-IDZ6TPOT.js").then((m5) => m5.javascript({ jsx: true, typescript: true }));
    }
  }),
  LanguageDescription.of({
    name: "TypeScript",
    alias: ["ts"],
    extensions: ["ts"],
    load() {
      return import("./dist-IDZ6TPOT.js").then((m5) => m5.javascript({ typescript: true }));
    }
  }),
  LanguageDescription.of({
    name: "WebAssembly",
    extensions: ["wat", "wast"],
    load() {
      return import("./dist-M56VEQTJ.js").then((m5) => m5.wast());
    }
  }),
  LanguageDescription.of({
    name: "XML",
    alias: ["rss", "wsdl", "xsd"],
    extensions: ["xml", "xsl", "xsd", "svg"],
    load() {
      return import("./dist-6BQEI6BQ.js").then((m5) => m5.xml());
    }
  }),
  // Legacy modes ported from CodeMirror 5
  LanguageDescription.of({
    name: "APL",
    extensions: ["dyalog", "apl"],
    load() {
      return import("./apl-6OSTRRKJ.js").then((m5) => legacy(m5.apl));
    }
  }),
  LanguageDescription.of({
    name: "PGP",
    alias: ["asciiarmor"],
    extensions: ["asc", "pgp", "sig"],
    load() {
      return import("./asciiarmor-GKSORJ5G.js").then((m5) => legacy(m5.asciiArmor));
    }
  }),
  LanguageDescription.of({
    name: "ASN.1",
    extensions: ["asn", "asn1"],
    load() {
      return import("./asn1-XKRHYVDD.js").then((m5) => legacy(m5.asn1({})));
    }
  }),
  LanguageDescription.of({
    name: "Asterisk",
    filename: /^extensions\.conf$/i,
    load() {
      return import("./asterisk-I2FLAF5Z.js").then((m5) => legacy(m5.asterisk));
    }
  }),
  LanguageDescription.of({
    name: "Brainfuck",
    extensions: ["b", "bf"],
    load() {
      return import("./brainfuck-G5L2HAD6.js").then((m5) => legacy(m5.brainfuck));
    }
  }),
  LanguageDescription.of({
    name: "Cobol",
    extensions: ["cob", "cpy"],
    load() {
      return import("./cobol-UB447ABL.js").then((m5) => legacy(m5.cobol));
    }
  }),
  LanguageDescription.of({
    name: "C#",
    alias: ["csharp", "cs"],
    extensions: ["cs"],
    load() {
      return import("./clike-I7FDTQAK.js").then((m5) => legacy(m5.csharp));
    }
  }),
  LanguageDescription.of({
    name: "Clojure",
    extensions: ["clj", "cljc", "cljx"],
    load() {
      return import("./clojure-OK5ITMLF.js").then((m5) => legacy(m5.clojure));
    }
  }),
  LanguageDescription.of({
    name: "ClojureScript",
    extensions: ["cljs"],
    load() {
      return import("./clojure-OK5ITMLF.js").then((m5) => legacy(m5.clojure));
    }
  }),
  LanguageDescription.of({
    name: "Closure Stylesheets (GSS)",
    extensions: ["gss"],
    load() {
      return import("./css-VGNZJD3T.js").then((m5) => legacy(m5.gss));
    }
  }),
  LanguageDescription.of({
    name: "CMake",
    extensions: ["cmake", "cmake.in"],
    filename: /^CMakeLists\.txt$/,
    load() {
      return import("./cmake-7SWFFFKI.js").then((m5) => legacy(m5.cmake));
    }
  }),
  LanguageDescription.of({
    name: "CoffeeScript",
    alias: ["coffee", "coffee-script"],
    extensions: ["coffee"],
    load() {
      return import("./coffeescript-QGWC7K6A.js").then((m5) => legacy(m5.coffeeScript));
    }
  }),
  LanguageDescription.of({
    name: "Common Lisp",
    alias: ["lisp"],
    extensions: ["cl", "lisp", "el"],
    load() {
      return import("./commonlisp-EQBIFH7X.js").then((m5) => legacy(m5.commonLisp));
    }
  }),
  LanguageDescription.of({
    name: "Cypher",
    extensions: ["cyp", "cypher"],
    load() {
      return import("./cypher-BA4ZQB57.js").then((m5) => legacy(m5.cypher));
    }
  }),
  LanguageDescription.of({
    name: "Cython",
    extensions: ["pyx", "pxd", "pxi"],
    load() {
      return import("./python-ACZN4ZD3.js").then((m5) => legacy(m5.cython));
    }
  }),
  LanguageDescription.of({
    name: "Crystal",
    extensions: ["cr"],
    load() {
      return import("./crystal-4BXQNZGQ.js").then((m5) => legacy(m5.crystal));
    }
  }),
  LanguageDescription.of({
    name: "D",
    extensions: ["d"],
    load() {
      return import("./d-WNSSUCAS.js").then((m5) => legacy(m5.d));
    }
  }),
  LanguageDescription.of({
    name: "Dart",
    extensions: ["dart"],
    load() {
      return import("./clike-I7FDTQAK.js").then((m5) => legacy(m5.dart));
    }
  }),
  LanguageDescription.of({
    name: "diff",
    extensions: ["diff", "patch"],
    load() {
      return import("./diff-6L77WGAV.js").then((m5) => legacy(m5.diff));
    }
  }),
  LanguageDescription.of({
    name: "Dockerfile",
    filename: /^Dockerfile$/,
    load() {
      return import("./dockerfile-KTMVIDUC.js").then((m5) => legacy(m5.dockerFile));
    }
  }),
  LanguageDescription.of({
    name: "DTD",
    extensions: ["dtd"],
    load() {
      return import("./dtd-G4EQVYPR.js").then((m5) => legacy(m5.dtd));
    }
  }),
  LanguageDescription.of({
    name: "Dylan",
    extensions: ["dylan", "dyl", "intr"],
    load() {
      return import("./dylan-SZZ7WAKU.js").then((m5) => legacy(m5.dylan));
    }
  }),
  LanguageDescription.of({
    name: "EBNF",
    load() {
      return import("./ebnf-LJDZFIOL.js").then((m5) => legacy(m5.ebnf));
    }
  }),
  LanguageDescription.of({
    name: "ECL",
    extensions: ["ecl"],
    load() {
      return import("./ecl-VPODS6IQ.js").then((m5) => legacy(m5.ecl));
    }
  }),
  LanguageDescription.of({
    name: "edn",
    extensions: ["edn"],
    load() {
      return import("./clojure-OK5ITMLF.js").then((m5) => legacy(m5.clojure));
    }
  }),
  LanguageDescription.of({
    name: "Eiffel",
    extensions: ["e"],
    load() {
      return import("./eiffel-ZNT5TQAV.js").then((m5) => legacy(m5.eiffel));
    }
  }),
  LanguageDescription.of({
    name: "Elm",
    extensions: ["elm"],
    load() {
      return import("./elm-GKPDNXE3.js").then((m5) => legacy(m5.elm));
    }
  }),
  LanguageDescription.of({
    name: "Erlang",
    extensions: ["erl"],
    load() {
      return import("./erlang-AZYXAPYK.js").then((m5) => legacy(m5.erlang));
    }
  }),
  LanguageDescription.of({
    name: "Esper",
    load() {
      return import("./sql-MWWP7B5Y.js").then((m5) => legacy(m5.esper));
    }
  }),
  LanguageDescription.of({
    name: "Factor",
    extensions: ["factor"],
    load() {
      return import("./factor-SSSO33SN.js").then((m5) => legacy(m5.factor));
    }
  }),
  LanguageDescription.of({
    name: "FCL",
    load() {
      return import("./fcl-XAZ5VOPI.js").then((m5) => legacy(m5.fcl));
    }
  }),
  LanguageDescription.of({
    name: "Forth",
    extensions: ["forth", "fth", "4th"],
    load() {
      return import("./forth-GMX6XUYX.js").then((m5) => legacy(m5.forth));
    }
  }),
  LanguageDescription.of({
    name: "Fortran",
    extensions: ["f", "for", "f77", "f90", "f95"],
    load() {
      return import("./fortran-EI6TMUH4.js").then((m5) => legacy(m5.fortran));
    }
  }),
  LanguageDescription.of({
    name: "F#",
    alias: ["fsharp"],
    extensions: ["fs"],
    load() {
      return import("./mllike-FEMRJ5NA.js").then((m5) => legacy(m5.fSharp));
    }
  }),
  LanguageDescription.of({
    name: "Gas",
    extensions: ["s"],
    load() {
      return import("./gas-4KP76V4U.js").then((m5) => legacy(m5.gas));
    }
  }),
  LanguageDescription.of({
    name: "Gherkin",
    extensions: ["feature"],
    load() {
      return import("./gherkin-2PNCUFXU.js").then((m5) => legacy(m5.gherkin));
    }
  }),
  LanguageDescription.of({
    name: "Go",
    extensions: ["go"],
    load() {
      return import("./go-D5XBNWRC.js").then((m5) => legacy(m5.go));
    }
  }),
  LanguageDescription.of({
    name: "Groovy",
    extensions: ["groovy", "gradle"],
    filename: /^Jenkinsfile$/,
    load() {
      return import("./groovy-EBOO3DCV.js").then((m5) => legacy(m5.groovy));
    }
  }),
  LanguageDescription.of({
    name: "Haskell",
    extensions: ["hs"],
    load() {
      return import("./haskell-RIEH6W2H.js").then((m5) => legacy(m5.haskell));
    }
  }),
  LanguageDescription.of({
    name: "Haxe",
    extensions: ["hx"],
    load() {
      return import("./haxe-IPZULSTP.js").then((m5) => legacy(m5.haxe));
    }
  }),
  LanguageDescription.of({
    name: "HXML",
    extensions: ["hxml"],
    load() {
      return import("./haxe-IPZULSTP.js").then((m5) => legacy(m5.hxml));
    }
  }),
  LanguageDescription.of({
    name: "HTTP",
    load() {
      return import("./http-EFHCY2ON.js").then((m5) => legacy(m5.http));
    }
  }),
  LanguageDescription.of({
    name: "IDL",
    extensions: ["pro"],
    load() {
      return import("./idl-7L2YDRGQ.js").then((m5) => legacy(m5.idl));
    }
  }),
  LanguageDescription.of({
    name: "JSON-LD",
    alias: ["jsonld"],
    extensions: ["jsonld"],
    load() {
      return import("./javascript-NTQV5GBL.js").then((m5) => legacy(m5.jsonld));
    }
  }),
  LanguageDescription.of({
    name: "Jinja2",
    extensions: ["j2", "jinja", "jinja2"],
    load() {
      return import("./jinja2-VYOSJJEC.js").then((m5) => legacy(m5.jinja2));
    }
  }),
  LanguageDescription.of({
    name: "Julia",
    extensions: ["jl"],
    load() {
      return import("./julia-KZWR26O4.js").then((m5) => legacy(m5.julia));
    }
  }),
  LanguageDescription.of({
    name: "Kotlin",
    extensions: ["kt"],
    load() {
      return import("./clike-I7FDTQAK.js").then((m5) => legacy(m5.kotlin));
    }
  }),
  LanguageDescription.of({
    name: "LiveScript",
    alias: ["ls"],
    extensions: ["ls"],
    load() {
      return import("./livescript-CMDFSJQE.js").then((m5) => legacy(m5.liveScript));
    }
  }),
  LanguageDescription.of({
    name: "Lua",
    extensions: ["lua"],
    load() {
      return import("./lua-LBCA25MU.js").then((m5) => legacy(m5.lua));
    }
  }),
  LanguageDescription.of({
    name: "mIRC",
    extensions: ["mrc"],
    load() {
      return import("./mirc-Q2V7H5PL.js").then((m5) => legacy(m5.mirc));
    }
  }),
  LanguageDescription.of({
    name: "Mathematica",
    extensions: ["m", "nb", "wl", "wls"],
    load() {
      return import("./mathematica-2TPIJBLL.js").then((m5) => legacy(m5.mathematica));
    }
  }),
  LanguageDescription.of({
    name: "Modelica",
    extensions: ["mo"],
    load() {
      return import("./modelica-QZEZLM53.js").then((m5) => legacy(m5.modelica));
    }
  }),
  LanguageDescription.of({
    name: "MUMPS",
    extensions: ["mps"],
    load() {
      return import("./mumps-JXEZMWMY.js").then((m5) => legacy(m5.mumps));
    }
  }),
  LanguageDescription.of({
    name: "Mbox",
    extensions: ["mbox"],
    load() {
      return import("./mbox-EHSOM75N.js").then((m5) => legacy(m5.mbox));
    }
  }),
  LanguageDescription.of({
    name: "Nginx",
    filename: /nginx.*\.conf$/i,
    load() {
      return import("./nginx-ASVDPVXG.js").then((m5) => legacy(m5.nginx));
    }
  }),
  LanguageDescription.of({
    name: "NSIS",
    extensions: ["nsh", "nsi"],
    load() {
      return import("./nsis-7NZCW324.js").then((m5) => legacy(m5.nsis));
    }
  }),
  LanguageDescription.of({
    name: "NTriples",
    extensions: ["nt", "nq"],
    load() {
      return import("./ntriples-QVLNBTIM.js").then((m5) => legacy(m5.ntriples));
    }
  }),
  LanguageDescription.of({
    name: "Objective-C",
    alias: ["objective-c", "objc"],
    extensions: ["m"],
    load() {
      return import("./clike-I7FDTQAK.js").then((m5) => legacy(m5.objectiveC));
    }
  }),
  LanguageDescription.of({
    name: "Objective-C++",
    alias: ["objective-c++", "objc++"],
    extensions: ["mm"],
    load() {
      return import("./clike-I7FDTQAK.js").then((m5) => legacy(m5.objectiveCpp));
    }
  }),
  LanguageDescription.of({
    name: "OCaml",
    extensions: ["ml", "mli", "mll", "mly"],
    load() {
      return import("./mllike-FEMRJ5NA.js").then((m5) => legacy(m5.oCaml));
    }
  }),
  LanguageDescription.of({
    name: "Octave",
    extensions: ["m"],
    load() {
      return import("./octave-LISZG2MK.js").then((m5) => legacy(m5.octave));
    }
  }),
  LanguageDescription.of({
    name: "Oz",
    extensions: ["oz"],
    load() {
      return import("./oz-ZPQ45CUK.js").then((m5) => legacy(m5.oz));
    }
  }),
  LanguageDescription.of({
    name: "Pascal",
    extensions: ["p", "pas"],
    load() {
      return import("./pascal-BQHNAST7.js").then((m5) => legacy(m5.pascal));
    }
  }),
  LanguageDescription.of({
    name: "Perl",
    extensions: ["pl", "pm"],
    load() {
      return import("./perl-HLUN4IJN.js").then((m5) => legacy(m5.perl));
    }
  }),
  LanguageDescription.of({
    name: "Pig",
    extensions: ["pig"],
    load() {
      return import("./pig-GYTBJZXO.js").then((m5) => legacy(m5.pig));
    }
  }),
  LanguageDescription.of({
    name: "PowerShell",
    extensions: ["ps1", "psd1", "psm1"],
    load() {
      return import("./powershell-LS3WBIML.js").then((m5) => legacy(m5.powerShell));
    }
  }),
  LanguageDescription.of({
    name: "Properties files",
    alias: ["ini", "properties"],
    extensions: ["properties", "ini", "in"],
    load() {
      return import("./properties-GUDW77U7.js").then((m5) => legacy(m5.properties));
    }
  }),
  LanguageDescription.of({
    name: "ProtoBuf",
    extensions: ["proto"],
    load() {
      return import("./protobuf-WUGOS6UR.js").then((m5) => legacy(m5.protobuf));
    }
  }),
  LanguageDescription.of({
    name: "Puppet",
    extensions: ["pp"],
    load() {
      return import("./puppet-WOTFSNRV.js").then((m5) => legacy(m5.puppet));
    }
  }),
  LanguageDescription.of({
    name: "Q",
    extensions: ["q"],
    load() {
      return import("./q-DRIAU3MD.js").then((m5) => legacy(m5.q));
    }
  }),
  LanguageDescription.of({
    name: "R",
    alias: ["rscript"],
    extensions: ["r", "R"],
    load() {
      return import("./r-FNASM7YB.js").then((m5) => legacy(m5.r));
    }
  }),
  LanguageDescription.of({
    name: "RPM Changes",
    load() {
      return import("./rpm-TXNPOZJL.js").then((m5) => legacy(m5.rpmChanges));
    }
  }),
  LanguageDescription.of({
    name: "RPM Spec",
    extensions: ["spec"],
    load() {
      return import("./rpm-TXNPOZJL.js").then((m5) => legacy(m5.rpmSpec));
    }
  }),
  LanguageDescription.of({
    name: "Ruby",
    alias: ["jruby", "macruby", "rake", "rb", "rbx"],
    extensions: ["rb"],
    filename: /^(Gemfile|Rakefile)$/,
    load() {
      return import("./ruby-4H77JHKY.js").then((m5) => legacy(m5.ruby));
    }
  }),
  LanguageDescription.of({
    name: "SAS",
    extensions: ["sas"],
    load() {
      return import("./sas-GFTQSYBO.js").then((m5) => legacy(m5.sas));
    }
  }),
  LanguageDescription.of({
    name: "Scala",
    extensions: ["scala"],
    load() {
      return import("./clike-I7FDTQAK.js").then((m5) => legacy(m5.scala));
    }
  }),
  LanguageDescription.of({
    name: "Scheme",
    extensions: ["scm", "ss"],
    load() {
      return import("./scheme-ZO4257JX.js").then((m5) => legacy(m5.scheme));
    }
  }),
  LanguageDescription.of({
    name: "Shell",
    alias: ["bash", "sh", "zsh"],
    extensions: ["sh", "ksh", "bash"],
    filename: /^PKGBUILD$/,
    load() {
      return import("./shell-54LGKCPK.js").then((m5) => legacy(m5.shell));
    }
  }),
  LanguageDescription.of({
    name: "Sieve",
    extensions: ["siv", "sieve"],
    load() {
      return import("./sieve-U2GXV3L7.js").then((m5) => legacy(m5.sieve));
    }
  }),
  LanguageDescription.of({
    name: "Smalltalk",
    extensions: ["st"],
    load() {
      return import("./smalltalk-OQQOHYNV.js").then((m5) => legacy(m5.smalltalk));
    }
  }),
  LanguageDescription.of({
    name: "Solr",
    load() {
      return import("./solr-7DYFDHSH.js").then((m5) => legacy(m5.solr));
    }
  }),
  LanguageDescription.of({
    name: "SML",
    extensions: ["sml", "sig", "fun", "smackspec"],
    load() {
      return import("./mllike-FEMRJ5NA.js").then((m5) => legacy(m5.sml));
    }
  }),
  LanguageDescription.of({
    name: "SPARQL",
    alias: ["sparul"],
    extensions: ["rq", "sparql"],
    load() {
      return import("./sparql-BC5CI3WK.js").then((m5) => legacy(m5.sparql));
    }
  }),
  LanguageDescription.of({
    name: "Spreadsheet",
    alias: ["excel", "formula"],
    load() {
      return import("./spreadsheet-WCOQSPQB.js").then((m5) => legacy(m5.spreadsheet));
    }
  }),
  LanguageDescription.of({
    name: "Squirrel",
    extensions: ["nut"],
    load() {
      return import("./clike-I7FDTQAK.js").then((m5) => legacy(m5.squirrel));
    }
  }),
  LanguageDescription.of({
    name: "Stylus",
    extensions: ["styl"],
    load() {
      return import("./stylus-HBAFAAY2.js").then((m5) => legacy(m5.stylus));
    }
  }),
  LanguageDescription.of({
    name: "Swift",
    extensions: ["swift"],
    load() {
      return import("./swift-NE27553Z.js").then((m5) => legacy(m5.swift));
    }
  }),
  LanguageDescription.of({
    name: "sTeX",
    load() {
      return import("./stex-VSHACAPH.js").then((m5) => legacy(m5.stex));
    }
  }),
  LanguageDescription.of({
    name: "LaTeX",
    alias: ["tex"],
    extensions: ["text", "ltx", "tex"],
    load() {
      return import("./stex-VSHACAPH.js").then((m5) => legacy(m5.stex));
    }
  }),
  LanguageDescription.of({
    name: "SystemVerilog",
    extensions: ["v", "sv", "svh"],
    load() {
      return import("./verilog-YYNQCXGK.js").then((m5) => legacy(m5.verilog));
    }
  }),
  LanguageDescription.of({
    name: "Tcl",
    extensions: ["tcl"],
    load() {
      return import("./tcl-NHAMYVEN.js").then((m5) => legacy(m5.tcl));
    }
  }),
  LanguageDescription.of({
    name: "Textile",
    extensions: ["textile"],
    load() {
      return import("./textile-K7ELQV7H.js").then((m5) => legacy(m5.textile));
    }
  }),
  LanguageDescription.of({
    name: "TiddlyWiki",
    load() {
      return import("./tiddlywiki-7AH5K6M6.js").then((m5) => legacy(m5.tiddlyWiki));
    }
  }),
  LanguageDescription.of({
    name: "Tiki wiki",
    load() {
      return import("./tiki-SF2XMVIQ.js").then((m5) => legacy(m5.tiki));
    }
  }),
  LanguageDescription.of({
    name: "TOML",
    extensions: ["toml"],
    load() {
      return import("./toml-FEX3C2CE.js").then((m5) => legacy(m5.toml));
    }
  }),
  LanguageDescription.of({
    name: "Troff",
    extensions: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    load() {
      return import("./troff-FH73JTBG.js").then((m5) => legacy(m5.troff));
    }
  }),
  LanguageDescription.of({
    name: "TTCN",
    extensions: ["ttcn", "ttcn3", "ttcnpp"],
    load() {
      return import("./ttcn-X543EQQA.js").then((m5) => legacy(m5.ttcn));
    }
  }),
  LanguageDescription.of({
    name: "TTCN_CFG",
    extensions: ["cfg"],
    load() {
      return import("./ttcn-cfg-BHGNASR2.js").then((m5) => legacy(m5.ttcnCfg));
    }
  }),
  LanguageDescription.of({
    name: "Turtle",
    extensions: ["ttl"],
    load() {
      return import("./turtle-E3ZC5ZHM.js").then((m5) => legacy(m5.turtle));
    }
  }),
  LanguageDescription.of({
    name: "Web IDL",
    extensions: ["webidl"],
    load() {
      return import("./webidl-NAHCZRQM.js").then((m5) => legacy(m5.webIDL));
    }
  }),
  LanguageDescription.of({
    name: "VB.NET",
    extensions: ["vb"],
    load() {
      return import("./vb-W4EQQXCN.js").then((m5) => legacy(m5.vb));
    }
  }),
  LanguageDescription.of({
    name: "VBScript",
    extensions: ["vbs"],
    load() {
      return import("./vbscript-EAY3KW3R.js").then((m5) => legacy(m5.vbScript));
    }
  }),
  LanguageDescription.of({
    name: "Velocity",
    extensions: ["vtl"],
    load() {
      return import("./velocity-NYYPWQY7.js").then((m5) => legacy(m5.velocity));
    }
  }),
  LanguageDescription.of({
    name: "Verilog",
    extensions: ["v"],
    load() {
      return import("./verilog-YYNQCXGK.js").then((m5) => legacy(m5.verilog));
    }
  }),
  LanguageDescription.of({
    name: "VHDL",
    extensions: ["vhd", "vhdl"],
    load() {
      return import("./vhdl-6MWXSB6W.js").then((m5) => legacy(m5.vhdl));
    }
  }),
  LanguageDescription.of({
    name: "XQuery",
    extensions: ["xy", "xquery"],
    load() {
      return import("./xquery-4NFNZE6U.js").then((m5) => legacy(m5.xQuery));
    }
  }),
  LanguageDescription.of({
    name: "Yacas",
    extensions: ["ys"],
    load() {
      return import("./yacas-ES5UEEGG.js").then((m5) => legacy(m5.yacas));
    }
  }),
  LanguageDescription.of({
    name: "YAML",
    alias: ["yml"],
    extensions: ["yaml", "yml"],
    load() {
      return import("./yaml-VLODU6SN.js").then((m5) => legacy(m5.yaml));
    }
  }),
  LanguageDescription.of({
    name: "Z80",
    extensions: ["z80"],
    load() {
      return import("./z80-TGMTJ4C3.js").then((m5) => legacy(m5.z80));
    }
  }),
  LanguageDescription.of({
    name: "MscGen",
    extensions: ["mscgen", "mscin", "msc"],
    load() {
      return import("./mscgen-VAWRI6WK.js").then((m5) => legacy(m5.mscgen));
    }
  }),
  LanguageDescription.of({
    name: "Xù",
    extensions: ["xu"],
    load() {
      return import("./mscgen-VAWRI6WK.js").then((m5) => legacy(m5.xu));
    }
  }),
  LanguageDescription.of({
    name: "MsGenny",
    extensions: ["msgenny"],
    load() {
      return import("./mscgen-VAWRI6WK.js").then((m5) => legacy(m5.msgenny));
    }
  }),
  LanguageDescription.of({
    name: "Vue",
    extensions: ["vue"],
    load() {
      return import("./dist-DY2SNRPH.js").then((m5) => m5.vue());
    }
  }),
  LanguageDescription.of({
    name: "Angular Template",
    load() {
      return import("./dist-D5DPH4QD.js").then((m5) => m5.angular());
    }
  })
];

// node_modules/md-editor-v3/lib/es/chunks/index4.mjs
init_vue_runtime_esm_bundler();

// node_modules/medium-zoom/dist/medium-zoom.esm.js
var _extends = Object.assign || function(target) {
  for (var i4 = 1; i4 < arguments.length; i4++) {
    var source = arguments[i4];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var isSupported = function isSupported2(node) {
  return node.tagName === "IMG";
};
var isNodeList = function isNodeList2(selector) {
  return NodeList.prototype.isPrototypeOf(selector);
};
var isNode = function isNode2(selector) {
  return selector && selector.nodeType === 1;
};
var isSvg = function isSvg2(image) {
  var source = image.currentSrc || image.src;
  return source.substr(-4).toLowerCase() === ".svg";
};
var getImagesFromSelector = function getImagesFromSelector2(selector) {
  try {
    if (Array.isArray(selector)) {
      return selector.filter(isSupported);
    }
    if (isNodeList(selector)) {
      return [].slice.call(selector).filter(isSupported);
    }
    if (isNode(selector)) {
      return [selector].filter(isSupported);
    }
    if (typeof selector === "string") {
      return [].slice.call(document.querySelectorAll(selector)).filter(isSupported);
    }
    return [];
  } catch (err) {
    throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
  }
};
var createOverlay = function createOverlay2(background) {
  var overlay = document.createElement("div");
  overlay.classList.add("medium-zoom-overlay");
  overlay.style.background = background;
  return overlay;
};
var cloneTarget = function cloneTarget2(template) {
  var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height;
  var clone = template.cloneNode();
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  clone.removeAttribute("id");
  clone.style.position = "absolute";
  clone.style.top = top + scrollTop + "px";
  clone.style.left = left + scrollLeft + "px";
  clone.style.width = width + "px";
  clone.style.height = height + "px";
  clone.style.transform = "";
  return clone;
};
var createCustomEvent = function createCustomEvent2(type, params) {
  var eventParams = _extends({
    bubbles: false,
    cancelable: false,
    detail: void 0
  }, params);
  if (typeof window.CustomEvent === "function") {
    return new CustomEvent(type, eventParams);
  }
  var customEvent = document.createEvent("CustomEvent");
  customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
  return customEvent;
};
var mediumZoom = function mediumZoom2(selector) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var Promise2 = window.Promise || function Promise3(fn) {
    function noop() {
    }
    fn(noop, noop);
  };
  var _handleClick = function _handleClick2(event) {
    var target = event.target;
    if (target === overlay) {
      close();
      return;
    }
    if (images.indexOf(target) === -1) {
      return;
    }
    toggle({ target });
  };
  var _handleScroll = function _handleScroll2() {
    if (isAnimating || !active.original) {
      return;
    }
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset) {
      setTimeout(close, 150);
    }
  };
  var _handleKeyUp = function _handleKeyUp2(event) {
    var key = event.key || event.keyCode;
    if (key === "Escape" || key === "Esc" || key === 27) {
      close();
    }
  };
  var update = function update2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var newOptions = options2;
    if (options2.background) {
      overlay.style.background = options2.background;
    }
    if (options2.container && options2.container instanceof Object) {
      newOptions.container = _extends({}, zoomOptions.container, options2.container);
    }
    if (options2.template) {
      var template = isNode(options2.template) ? options2.template : document.querySelector(options2.template);
      newOptions.template = template;
    }
    zoomOptions = _extends({}, zoomOptions, newOptions);
    images.forEach(function(image) {
      image.dispatchEvent(createCustomEvent("medium-zoom:update", {
        detail: { zoom }
      }));
    });
    return zoom;
  };
  var clone = function clone2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return mediumZoom2(_extends({}, zoomOptions, options2));
  };
  var attach = function attach2() {
    for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
      selectors[_key] = arguments[_key];
    }
    var newImages = selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []);
    newImages.filter(function(newImage) {
      return images.indexOf(newImage) === -1;
    }).forEach(function(newImage) {
      images.push(newImage);
      newImage.classList.add("medium-zoom-image");
    });
    eventListeners.forEach(function(_ref) {
      var type = _ref.type, listener = _ref.listener, options2 = _ref.options;
      newImages.forEach(function(image) {
        image.addEventListener(type, listener, options2);
      });
    });
    return zoom;
  };
  var detach = function detach2() {
    for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      selectors[_key2] = arguments[_key2];
    }
    if (active.zoomed) {
      close();
    }
    var imagesToDetach = selectors.length > 0 ? selectors.reduce(function(imagesAccumulator, currentSelector) {
      return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
    }, []) : images;
    imagesToDetach.forEach(function(image) {
      image.classList.remove("medium-zoom-image");
      image.dispatchEvent(createCustomEvent("medium-zoom:detach", {
        detail: { zoom }
      }));
    });
    images = images.filter(function(image) {
      return imagesToDetach.indexOf(image) === -1;
    });
    return zoom;
  };
  var on = function on2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image) {
      image.addEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners.push({ type: "medium-zoom:" + type, listener, options: options2 });
    return zoom;
  };
  var off = function off2(type, listener) {
    var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    images.forEach(function(image) {
      image.removeEventListener("medium-zoom:" + type, listener, options2);
    });
    eventListeners = eventListeners.filter(function(eventListener) {
      return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
    });
    return zoom;
  };
  var open = function open2() {
    var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref2.target;
    var _animate = function _animate2() {
      var container = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      var viewportWidth = void 0;
      var viewportHeight = void 0;
      if (zoomOptions.container) {
        if (zoomOptions.container instanceof Object) {
          container = _extends({}, container, zoomOptions.container);
          viewportWidth = container.width - container.left - container.right - zoomOptions.margin * 2;
          viewportHeight = container.height - container.top - container.bottom - zoomOptions.margin * 2;
        } else {
          var zoomContainer = isNode(zoomOptions.container) ? zoomOptions.container : document.querySelector(zoomOptions.container);
          var _zoomContainer$getBou = zoomContainer.getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
          container = _extends({}, container, {
            width: _width,
            height: _height,
            left: _left,
            top: _top
          });
        }
      }
      viewportWidth = viewportWidth || container.width - zoomOptions.margin * 2;
      viewportHeight = viewportHeight || container.height - zoomOptions.margin * 2;
      var zoomTarget = active.zoomedHd || active.original;
      var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
      var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;
      var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height;
      var scaleX = Math.min(Math.max(width, naturalWidth), viewportWidth) / width;
      var scaleY = Math.min(Math.max(height, naturalHeight), viewportHeight) / height;
      var scale = Math.min(scaleX, scaleY);
      var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions.margin + container.left) / scale;
      var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions.margin + container.top) / scale;
      var transform = "scale(" + scale + ") translate3d(" + translateX + "px, " + translateY + "px, 0)";
      active.zoomed.style.transform = transform;
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = transform;
      }
    };
    return new Promise2(function(resolve) {
      if (target && images.indexOf(target) === -1) {
        resolve(zoom);
        return;
      }
      var _handleOpenEnd = function _handleOpenEnd2() {
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleOpenEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", {
          detail: { zoom }
        }));
        resolve(zoom);
      };
      if (active.zoomed) {
        resolve(zoom);
        return;
      }
      if (target) {
        active.original = target;
      } else if (images.length > 0) {
        var _images = images;
        active.original = _images[0];
      } else {
        resolve(zoom);
        return;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:open", {
        detail: { zoom }
      }));
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      isAnimating = true;
      active.zoomed = cloneTarget(active.original);
      document.body.appendChild(overlay);
      if (zoomOptions.template) {
        var template = isNode(zoomOptions.template) ? zoomOptions.template : document.querySelector(zoomOptions.template);
        active.template = document.createElement("div");
        active.template.appendChild(template.content.cloneNode(true));
        document.body.appendChild(active.template);
      }
      if (active.original.parentElement && active.original.parentElement.tagName === "PICTURE" && active.original.currentSrc) {
        active.zoomed.src = active.original.currentSrc;
      }
      document.body.appendChild(active.zoomed);
      window.requestAnimationFrame(function() {
        document.body.classList.add("medium-zoom--opened");
      });
      active.original.classList.add("medium-zoom-image--hidden");
      active.zoomed.classList.add("medium-zoom-image--opened");
      active.zoomed.addEventListener("click", close);
      active.zoomed.addEventListener("transitionend", _handleOpenEnd);
      if (active.original.getAttribute("data-zoom-src")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("srcset");
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.removeAttribute("loading");
        active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src");
        active.zoomedHd.onerror = function() {
          clearInterval(getZoomTargetSize);
          console.warn("Unable to reach the zoom image target " + active.zoomedHd.src);
          active.zoomedHd = null;
          _animate();
        };
        var getZoomTargetSize = setInterval(function() {
          if (active.zoomedHd.complete) {
            clearInterval(getZoomTargetSize);
            active.zoomedHd.classList.add("medium-zoom-image--opened");
            active.zoomedHd.addEventListener("click", close);
            document.body.appendChild(active.zoomedHd);
            _animate();
          }
        }, 10);
      } else if (active.original.hasAttribute("srcset")) {
        active.zoomedHd = active.zoomed.cloneNode();
        active.zoomedHd.removeAttribute("sizes");
        active.zoomedHd.removeAttribute("loading");
        var loadEventListener = active.zoomedHd.addEventListener("load", function() {
          active.zoomedHd.removeEventListener("load", loadEventListener);
          active.zoomedHd.classList.add("medium-zoom-image--opened");
          active.zoomedHd.addEventListener("click", close);
          document.body.appendChild(active.zoomedHd);
          _animate();
        });
      } else {
        _animate();
      }
    });
  };
  var close = function close2() {
    return new Promise2(function(resolve) {
      if (isAnimating || !active.original) {
        resolve(zoom);
        return;
      }
      var _handleCloseEnd = function _handleCloseEnd2() {
        active.original.classList.remove("medium-zoom-image--hidden");
        document.body.removeChild(active.zoomed);
        if (active.zoomedHd) {
          document.body.removeChild(active.zoomedHd);
        }
        document.body.removeChild(overlay);
        active.zoomed.classList.remove("medium-zoom-image--opened");
        if (active.template) {
          document.body.removeChild(active.template);
        }
        isAnimating = false;
        active.zoomed.removeEventListener("transitionend", _handleCloseEnd2);
        active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", {
          detail: { zoom }
        }));
        active.original = null;
        active.zoomed = null;
        active.zoomedHd = null;
        active.template = null;
        resolve(zoom);
      };
      isAnimating = true;
      document.body.classList.remove("medium-zoom--opened");
      active.zoomed.style.transform = "";
      if (active.zoomedHd) {
        active.zoomedHd.style.transform = "";
      }
      if (active.template) {
        active.template.style.transition = "opacity 150ms";
        active.template.style.opacity = 0;
      }
      active.original.dispatchEvent(createCustomEvent("medium-zoom:close", {
        detail: { zoom }
      }));
      active.zoomed.addEventListener("transitionend", _handleCloseEnd);
    });
  };
  var toggle = function toggle2() {
    var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref3.target;
    if (active.original) {
      return close();
    }
    return open({ target });
  };
  var getOptions = function getOptions2() {
    return zoomOptions;
  };
  var getImages = function getImages2() {
    return images;
  };
  var getZoomedImage = function getZoomedImage2() {
    return active.original;
  };
  var images = [];
  var eventListeners = [];
  var isAnimating = false;
  var scrollTop = 0;
  var zoomOptions = options;
  var active = {
    original: null,
    zoomed: null,
    zoomedHd: null,
    template: null
    // If the selector is omitted, it's replaced by the options
  };
  if (Object.prototype.toString.call(selector) === "[object Object]") {
    zoomOptions = selector;
  } else if (selector || typeof selector === "string") {
    attach(selector);
  }
  zoomOptions = _extends({
    margin: 0,
    background: "#fff",
    scrollOffset: 40,
    container: null,
    template: null
  }, zoomOptions);
  var overlay = createOverlay(zoomOptions.background);
  document.addEventListener("click", _handleClick);
  document.addEventListener("keyup", _handleKeyUp);
  document.addEventListener("scroll", _handleScroll);
  window.addEventListener("resize", close);
  var zoom = {
    open,
    close,
    toggle,
    update,
    clone,
    attach,
    detach,
    on,
    off,
    getOptions,
    getImages,
    getZoomedImage
  };
  return zoom;
};
function styleInject(css2, ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var insertAt = ref2.insertAt;
  if (!css2 || typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css2;
  } else {
    style.appendChild(document.createTextNode(css2));
  }
}
var css = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
styleInject(css);
var medium_zoom_esm_default = mediumZoom;

// node_modules/md-editor-v3/lib/es/chunks/index4.mjs
var import_copy_to_clipboard = __toESM(require_copy_to_clipboard(), 1);
var import_markdown_it = __toESM(require_markdown_it(), 1);

// node_modules/markdown-it-image-figures/dist/markdown-it-images-figures.mjs
var t = /* @__PURE__ */ new Set([true, false, "alt", "title"]);
function e2(t2, e4) {
  return (Array.isArray(t2) ? t2 : []).filter(([t3]) => t3 !== e4);
}
function n2(t2, n3) {
  t2 && t2.attrs && (t2.attrs = e2(t2.attrs, n3));
}
function i2(e4, i4) {
  if (!t.has(e4))
    throw new TypeError(`figcaption must be one of: ${[...t]}.`);
  if ("alt" === e4)
    return i4.content;
  const r4 = i4.attrs.find(([t2]) => "title" === t2);
  return Array.isArray(r4) && r4[1] ? (n2(i4, "title"), r4[1]) : void 0;
}
function r3(t2, r4) {
  r4 = r4 || {}, t2.core.ruler.before("linkify", "image_figures", function(s2) {
    let a2 = 1;
    for (let o2 = 1, c2 = s2.tokens.length; o2 < c2 - 1; ++o2) {
      const l2 = s2.tokens[o2];
      if ("inline" !== l2.type)
        continue;
      if (!l2.children || 1 !== l2.children.length && 3 !== l2.children.length)
        continue;
      if (1 === l2.children.length && "image" !== l2.children[0].type)
        continue;
      if (3 === l2.children.length) {
        const [t3, e4, n3] = l2.children;
        if ("link_open" !== t3.type || "image" !== e4.type || "link_close" !== n3.type)
          continue;
      }
      if (0 !== o2 && "paragraph_open" !== s2.tokens[o2 - 1].type)
        continue;
      if (o2 !== c2 - 1 && "paragraph_close" !== s2.tokens[o2 + 1].type)
        continue;
      const f3 = s2.tokens[o2 - 1];
      let h6;
      if (f3.type = "figure_open", f3.tag = "figure", s2.tokens[o2 + 1].type = "figure_close", s2.tokens[o2 + 1].tag = "figure", r4.dataType && s2.tokens[o2 - 1].attrPush(["data-type", "image"]), r4.link && 1 === l2.children.length) {
        [h6] = l2.children;
        const t3 = new s2.Token("link_open", "a", 1);
        t3.attrPush(["href", h6.attrGet("src")]), l2.children.unshift(t3), l2.children.push(new s2.Token("link_close", "a", -1));
      }
      if (h6 = 1 === l2.children.length ? l2.children[0] : l2.children[1], r4.figcaption) {
        const n3 = i2(r4.figcaption, h6);
        if (n3) {
          const [i4] = t2.parseInline(n3, s2.env);
          l2.children.push(new s2.Token("figcaption_open", "figcaption", 1)), l2.children.push(...i4.children), l2.children.push(new s2.Token("figcaption_close", "figcaption", -1)), h6.attrs && (h6.attrs = e2(h6.attrs, "title"));
        }
      }
      if (r4.copyAttrs && h6.attrs) {
        const t3 = true === r4.copyAttrs ? "" : r4.copyAttrs;
        f3.attrs = h6.attrs.filter(([e4]) => e4.match(t3)).map((t4) => Array.from(t4));
      }
      if (r4.tabindex && (s2.tokens[o2 - 1].attrPush(["tabindex", a2]), a2++), r4.lazy && (h6.attrs.some(([t3]) => "loading" === t3) || h6.attrs.push(["loading", "lazy"])), r4.async && (h6.attrs.some(([t3]) => "decoding" === t3) || h6.attrs.push(["decoding", "async"])), r4.classes && "string" == typeof r4.classes) {
        let t3 = false;
        for (let e4 = 0, n3 = h6.attrs.length; e4 < n3 && !t3; e4++) {
          const n4 = h6.attrs[e4];
          "class" === n4[0] && (n4[1] = `${n4[1]} ${r4.classes}`, t3 = true);
        }
        t3 || h6.attrs.push(["class", r4.classes]);
      }
      if (r4.removeSrc) {
        const t3 = h6.attrs.find(([t4]) => "src" === t4);
        h6.attrs.push(["data-src", t3[1]]), n2(h6, "src");
      }
    }
  });
}

// node_modules/md-editor-v3/lib/es/chunks/index4.mjs
var import_markdown_it_task_lists = __toESM(require_markdown_it_task_lists(), 1);

// node_modules/md-editor-v3/node_modules/lru-cache/dist/mjs/index.js
var perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
var warned = /* @__PURE__ */ new Set();
var emitWarning = (msg, type, code, fn) => {
  typeof process === "object" && process && typeof process.emitWarning === "function" ? process.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
var shouldWarn = (code) => !warned.has(code);
var TYPE = Symbol("type");
var isPosInt = (n3) => n3 && n3 === Math.floor(n3) && n3 > 0 && isFinite(n3);
var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
var ZeroArray = class extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
};
var _constructing;
var _Stack = class _Stack {
  constructor(max, HeapCls) {
    __publicField(this, "heap");
    __publicField(this, "length");
    if (!__privateGet(_Stack, _constructing)) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    this.heap = new HeapCls(max);
    this.length = 0;
  }
  static create(max) {
    const HeapCls = getUintArray(max);
    if (!HeapCls)
      return [];
    __privateSet(_Stack, _constructing, true);
    const s2 = new _Stack(max, HeapCls);
    __privateSet(_Stack, _constructing, false);
    return s2;
  }
  push(n3) {
    this.heap[this.length++] = n3;
  }
  pop() {
    return this.heap[--this.length];
  }
};
_constructing = new WeakMap();
// private constructor
__privateAdd(_Stack, _constructing, false);
var Stack = _Stack;
var _max, _maxSize, _dispose, _disposeAfter, _fetchMethod, _size, _calculatedSize, _keyMap, _keyList, _valList, _next, _prev, _head, _tail, _free, _disposed, _sizes, _starts, _ttls, _hasDispose, _hasFetchMethod, _hasDisposeAfter, _initializeTTLTracking, initializeTTLTracking_fn, _updateItemAge, _statusTTL, _setItemTTL, _isStale, _initializeSizeTracking, initializeSizeTracking_fn, _removeItemSize, _addItemSize, _requireSize, _indexes, indexes_fn, _rindexes, rindexes_fn, _isValidIndex, isValidIndex_fn, _evict, evict_fn, _backgroundFetch, backgroundFetch_fn, _isBackgroundFetch, isBackgroundFetch_fn, _connect, connect_fn, _moveToTail, moveToTail_fn;
var _LRUCache = class _LRUCache {
  constructor(options) {
    __privateAdd(this, _initializeTTLTracking);
    __privateAdd(this, _initializeSizeTracking);
    __privateAdd(this, _indexes);
    __privateAdd(this, _rindexes);
    __privateAdd(this, _isValidIndex);
    __privateAdd(this, _evict);
    __privateAdd(this, _backgroundFetch);
    __privateAdd(this, _isBackgroundFetch);
    __privateAdd(this, _connect);
    __privateAdd(this, _moveToTail);
    // properties coming in from the options of these, only max and maxSize
    // really *need* to be protected. The rest can be modified, as they just
    // set defaults for various methods.
    __privateAdd(this, _max, void 0);
    __privateAdd(this, _maxSize, void 0);
    __privateAdd(this, _dispose, void 0);
    __privateAdd(this, _disposeAfter, void 0);
    __privateAdd(this, _fetchMethod, void 0);
    /**
     * {@link LRUCache.OptionsBase.ttl}
     */
    __publicField(this, "ttl");
    /**
     * {@link LRUCache.OptionsBase.ttlResolution}
     */
    __publicField(this, "ttlResolution");
    /**
     * {@link LRUCache.OptionsBase.ttlAutopurge}
     */
    __publicField(this, "ttlAutopurge");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnGet}
     */
    __publicField(this, "updateAgeOnGet");
    /**
     * {@link LRUCache.OptionsBase.updateAgeOnHas}
     */
    __publicField(this, "updateAgeOnHas");
    /**
     * {@link LRUCache.OptionsBase.allowStale}
     */
    __publicField(this, "allowStale");
    /**
     * {@link LRUCache.OptionsBase.noDisposeOnSet}
     */
    __publicField(this, "noDisposeOnSet");
    /**
     * {@link LRUCache.OptionsBase.noUpdateTTL}
     */
    __publicField(this, "noUpdateTTL");
    /**
     * {@link LRUCache.OptionsBase.maxEntrySize}
     */
    __publicField(this, "maxEntrySize");
    /**
     * {@link LRUCache.OptionsBase.sizeCalculation}
     */
    __publicField(this, "sizeCalculation");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
     */
    __publicField(this, "noDeleteOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
     */
    __publicField(this, "noDeleteOnStaleGet");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
     */
    __publicField(this, "allowStaleOnFetchAbort");
    /**
     * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
     */
    __publicField(this, "allowStaleOnFetchRejection");
    /**
     * {@link LRUCache.OptionsBase.ignoreFetchAbort}
     */
    __publicField(this, "ignoreFetchAbort");
    // computed properties
    __privateAdd(this, _size, void 0);
    __privateAdd(this, _calculatedSize, void 0);
    __privateAdd(this, _keyMap, void 0);
    __privateAdd(this, _keyList, void 0);
    __privateAdd(this, _valList, void 0);
    __privateAdd(this, _next, void 0);
    __privateAdd(this, _prev, void 0);
    __privateAdd(this, _head, void 0);
    __privateAdd(this, _tail, void 0);
    __privateAdd(this, _free, void 0);
    __privateAdd(this, _disposed, void 0);
    __privateAdd(this, _sizes, void 0);
    __privateAdd(this, _starts, void 0);
    __privateAdd(this, _ttls, void 0);
    __privateAdd(this, _hasDispose, void 0);
    __privateAdd(this, _hasFetchMethod, void 0);
    __privateAdd(this, _hasDisposeAfter, void 0);
    // conditionally set private methods related to TTL
    __privateAdd(this, _updateItemAge, () => {
    });
    __privateAdd(this, _statusTTL, () => {
    });
    __privateAdd(this, _setItemTTL, () => {
    });
    /* c8 ignore stop */
    __privateAdd(this, _isStale, () => false);
    __privateAdd(this, _removeItemSize, (_i) => {
    });
    __privateAdd(this, _addItemSize, (_i, _s, _st) => {
    });
    __privateAdd(this, _requireSize, (_k, _v, size, sizeCalculation) => {
      if (size || sizeCalculation) {
        throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
      }
      return 0;
    });
    const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort } = options;
    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error("invalid max value: " + max);
    }
    __privateSet(this, _max, max);
    __privateSet(this, _maxSize, maxSize);
    this.maxEntrySize = maxEntrySize || __privateGet(this, _maxSize);
    this.sizeCalculation = sizeCalculation;
    if (this.sizeCalculation) {
      if (!__privateGet(this, _maxSize) && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    __privateSet(this, _fetchMethod, fetchMethod);
    __privateSet(this, _hasFetchMethod, !!fetchMethod);
    __privateSet(this, _keyMap, /* @__PURE__ */ new Map());
    __privateSet(this, _keyList, new Array(max).fill(void 0));
    __privateSet(this, _valList, new Array(max).fill(void 0));
    __privateSet(this, _next, new UintArray(max));
    __privateSet(this, _prev, new UintArray(max));
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateSet(this, _free, Stack.create(max));
    __privateSet(this, _size, 0);
    __privateSet(this, _calculatedSize, 0);
    if (typeof dispose === "function") {
      __privateSet(this, _dispose, dispose);
    }
    if (typeof disposeAfter === "function") {
      __privateSet(this, _disposeAfter, disposeAfter);
      __privateSet(this, _disposed, []);
    } else {
      __privateSet(this, _disposeAfter, void 0);
      __privateSet(this, _disposed, void 0);
    }
    __privateSet(this, _hasDispose, !!__privateGet(this, _dispose));
    __privateSet(this, _hasDisposeAfter, !!__privateGet(this, _disposeAfter));
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;
    if (this.maxEntrySize !== 0) {
      if (__privateGet(this, _maxSize) !== 0) {
        if (!isPosInt(__privateGet(this, _maxSize))) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      __privateMethod(this, _initializeSizeTracking, initializeSizeTracking_fn).call(this);
    }
    this.allowStale = !!allowStale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      __privateMethod(this, _initializeTTLTracking, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _max) === 0 && this.ttl === 0 && __privateGet(this, _maxSize) === 0) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !__privateGet(this, _max) && !__privateGet(this, _maxSize)) {
      const code = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code)) {
        warned.add(code);
        const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
        emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
      }
    }
  }
  /**
   * Do not call this method unless you need to inspect the
   * inner workings of the cache.  If anything returned by this
   * object is modified in any way, strange breakage may occur.
   *
   * These fields are private for a reason!
   *
   * @internal
   */
  static unsafeExposeInternals(c2) {
    return {
      // properties
      starts: __privateGet(c2, _starts),
      ttls: __privateGet(c2, _ttls),
      sizes: __privateGet(c2, _sizes),
      keyMap: __privateGet(c2, _keyMap),
      keyList: __privateGet(c2, _keyList),
      valList: __privateGet(c2, _valList),
      next: __privateGet(c2, _next),
      prev: __privateGet(c2, _prev),
      get head() {
        return __privateGet(c2, _head);
      },
      get tail() {
        return __privateGet(c2, _tail);
      },
      free: __privateGet(c2, _free),
      // methods
      isBackgroundFetch: (p3) => {
        var _a;
        return __privateMethod(_a = c2, _isBackgroundFetch, isBackgroundFetch_fn).call(_a, p3);
      },
      backgroundFetch: (k3, index, options, context) => {
        var _a;
        return __privateMethod(_a = c2, _backgroundFetch, backgroundFetch_fn).call(_a, k3, index, options, context);
      },
      moveToTail: (index) => {
        var _a;
        return __privateMethod(_a = c2, _moveToTail, moveToTail_fn).call(_a, index);
      },
      indexes: (options) => {
        var _a;
        return __privateMethod(_a = c2, _indexes, indexes_fn).call(_a, options);
      },
      rindexes: (options) => {
        var _a;
        return __privateMethod(_a = c2, _rindexes, rindexes_fn).call(_a, options);
      },
      isStale: (index) => {
        var _a;
        return __privateGet(_a = c2, _isStale).call(_a, index);
      }
    };
  }
  // Protected read-only members
  /**
   * {@link LRUCache.OptionsBase.max} (read-only)
   */
  get max() {
    return __privateGet(this, _max);
  }
  /**
   * {@link LRUCache.OptionsBase.maxSize} (read-only)
   */
  get maxSize() {
    return __privateGet(this, _maxSize);
  }
  /**
   * The total computed size of items in the cache (read-only)
   */
  get calculatedSize() {
    return __privateGet(this, _calculatedSize);
  }
  /**
   * The number of items stored in the cache (read-only)
   */
  get size() {
    return __privateGet(this, _size);
  }
  /**
   * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
   */
  get fetchMethod() {
    return __privateGet(this, _fetchMethod);
  }
  /**
   * {@link LRUCache.OptionsBase.dispose} (read-only)
   */
  get dispose() {
    return __privateGet(this, _dispose);
  }
  /**
   * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
   */
  get disposeAfter() {
    return __privateGet(this, _disposeAfter);
  }
  /**
   * Return the remaining TTL time for a given entry key
   */
  getRemainingTTL(key) {
    return __privateGet(this, _keyMap).has(key) ? Infinity : 0;
  }
  /**
   * Return a generator yielding `[key, value]` pairs,
   * in order from most recently used to least recently used.
   */
  *entries() {
    for (const i4 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i4] !== void 0 && __privateGet(this, _keyList)[i4] !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i4])) {
        yield [__privateGet(this, _keyList)[i4], __privateGet(this, _valList)[i4]];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.entries}
   *
   * Return a generator yielding `[key, value]` pairs,
   * in order from least recently used to most recently used.
   */
  *rentries() {
    for (const i4 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      if (__privateGet(this, _valList)[i4] !== void 0 && __privateGet(this, _keyList)[i4] !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i4])) {
        yield [__privateGet(this, _keyList)[i4], __privateGet(this, _valList)[i4]];
      }
    }
  }
  /**
   * Return a generator yielding the keys in the cache,
   * in order from most recently used to least recently used.
   */
  *keys() {
    for (const i4 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const k3 = __privateGet(this, _keyList)[i4];
      if (k3 !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i4])) {
        yield k3;
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.keys}
   *
   * Return a generator yielding the keys in the cache,
   * in order from least recently used to most recently used.
   */
  *rkeys() {
    for (const i4 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const k3 = __privateGet(this, _keyList)[i4];
      if (k3 !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i4])) {
        yield k3;
      }
    }
  }
  /**
   * Return a generator yielding the values in the cache,
   * in order from most recently used to least recently used.
   */
  *values() {
    for (const i4 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i4];
      if (v !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i4])) {
        yield __privateGet(this, _valList)[i4];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.values}
   *
   * Return a generator yielding the values in the cache,
   * in order from least recently used to most recently used.
   */
  *rvalues() {
    for (const i4 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i4];
      if (v !== void 0 && !__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i4])) {
        yield __privateGet(this, _valList)[i4];
      }
    }
  }
  /**
   * Iterating over the cache itself yields the same results as
   * {@link LRUCache.entries}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Find a value for which the supplied fn method returns a truthy value,
   * similar to Array.find().  fn is called as fn(value, key, cache).
   */
  find(fn, getOptions = {}) {
    for (const i4 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i4];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      if (fn(value, __privateGet(this, _keyList)[i4], this)) {
        return this.get(__privateGet(this, _keyList)[i4], getOptions);
      }
    }
  }
  /**
   * Call the supplied function on each item in the cache, in order from
   * most recently used to least recently used.  fn is called as
   * fn(value, key, cache).  Does not update age or recenty of use.
   * Does not iterate over stale values.
   */
  forEach(fn, thisp = this) {
    for (const i4 of __privateMethod(this, _indexes, indexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i4];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i4], this);
    }
  }
  /**
   * The same as {@link LRUCache.forEach} but items are iterated over in
   * reverse order.  (ie, less recently used items are iterated over first.)
   */
  rforEach(fn, thisp = this) {
    for (const i4 of __privateMethod(this, _rindexes, rindexes_fn).call(this)) {
      const v = __privateGet(this, _valList)[i4];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, __privateGet(this, _keyList)[i4], this);
    }
  }
  /**
   * Delete any stale entries. Returns true if anything was removed,
   * false otherwise.
   */
  purgeStale() {
    let deleted = false;
    for (const i4 of __privateMethod(this, _rindexes, rindexes_fn).call(this, { allowStale: true })) {
      if (__privateGet(this, _isStale).call(this, i4)) {
        this.delete(__privateGet(this, _keyList)[i4]);
        deleted = true;
      }
    }
    return deleted;
  }
  /**
   * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
   * passed to cache.load()
   */
  dump() {
    const arr = [];
    for (const i4 of __privateMethod(this, _indexes, indexes_fn).call(this, { allowStale: true })) {
      const key = __privateGet(this, _keyList)[i4];
      const v = __privateGet(this, _valList)[i4];
      const value = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0 || key === void 0)
        continue;
      const entry = { value };
      if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
        entry.ttl = __privateGet(this, _ttls)[i4];
        const age = perf.now() - __privateGet(this, _starts)[i4];
        entry.start = Math.floor(Date.now() - age);
      }
      if (__privateGet(this, _sizes)) {
        entry.size = __privateGet(this, _sizes)[i4];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }
  /**
   * Reset the cache and load in the items in entries in the order listed.
   * Note that the shape of the resulting cache may be different if the
   * same options are not used in both caches.
   */
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  /**
   * Add a value to the cache.
   */
  set(k3, v, setOptions = {}) {
    var _a, _b, _c;
    const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
    let { noUpdateTTL = this.noUpdateTTL } = setOptions;
    const size = __privateGet(this, _requireSize).call(this, k3, v, setOptions.size || 0, sizeCalculation);
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      this.delete(k3);
      return this;
    }
    let index = __privateGet(this, _size) === 0 ? void 0 : __privateGet(this, _keyMap).get(k3);
    if (index === void 0) {
      index = __privateGet(this, _size) === 0 ? __privateGet(this, _tail) : __privateGet(this, _free).length !== 0 ? __privateGet(this, _free).pop() : __privateGet(this, _size) === __privateGet(this, _max) ? __privateMethod(this, _evict, evict_fn).call(this, false) : __privateGet(this, _size);
      __privateGet(this, _keyList)[index] = k3;
      __privateGet(this, _valList)[index] = v;
      __privateGet(this, _keyMap).set(k3, index);
      __privateGet(this, _next)[__privateGet(this, _tail)] = index;
      __privateGet(this, _prev)[index] = __privateGet(this, _tail);
      __privateSet(this, _tail, index);
      __privateWrapper(this, _size)._++;
      __privateGet(this, _addItemSize).call(this, index, size, status);
      if (status)
        status.set = "add";
      noUpdateTTL = false;
    } else {
      __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
      const oldVal = __privateGet(this, _valList)[index];
      if (v !== oldVal) {
        if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
        } else if (!noDisposeOnSet) {
          if (__privateGet(this, _hasDispose)) {
            (_a = __privateGet(this, _dispose)) == null ? void 0 : _a.call(this, oldVal, k3, "set");
          }
          if (__privateGet(this, _hasDisposeAfter)) {
            (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([oldVal, k3, "set"]);
          }
        }
        __privateGet(this, _removeItemSize).call(this, index);
        __privateGet(this, _addItemSize).call(this, index, size, status);
        __privateGet(this, _valList)[index] = v;
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
          if (oldValue !== void 0)
            status.oldValue = oldValue;
        }
      } else if (status) {
        status.set = "update";
      }
    }
    if (ttl !== 0 && !__privateGet(this, _ttls)) {
      __privateMethod(this, _initializeTTLTracking, initializeTTLTracking_fn).call(this);
    }
    if (__privateGet(this, _ttls)) {
      if (!noUpdateTTL) {
        __privateGet(this, _setItemTTL).call(this, index, ttl, start);
      }
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
    }
    if (!noDisposeOnSet && __privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_c = __privateGet(this, _disposeAfter)) == null ? void 0 : _c.call(this, ...task);
      }
    }
    return this;
  }
  /**
   * Evict the least recently used item, returning its value or
   * `undefined` if cache is empty.
   */
  pop() {
    var _a;
    try {
      while (__privateGet(this, _size)) {
        const val = __privateGet(this, _valList)[__privateGet(this, _head)];
        __privateMethod(this, _evict, evict_fn).call(this, true);
        if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, val)) {
          if (val.__staleWhileFetching) {
            return val.__staleWhileFetching;
          }
        } else if (val !== void 0) {
          return val;
        }
      }
    } finally {
      if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
        const dt = __privateGet(this, _disposed);
        let task;
        while (task = dt == null ? void 0 : dt.shift()) {
          (_a = __privateGet(this, _disposeAfter)) == null ? void 0 : _a.call(this, ...task);
        }
      }
    }
  }
  /**
   * Check if a key is in the cache, without updating the recency of use.
   * Will return false if the item is stale, even though it is technically
   * in the cache.
   *
   * Will not update item age unless
   * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
   */
  has(k3, hasOptions = {}) {
    const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
    const index = __privateGet(this, _keyMap).get(k3);
    if (index !== void 0) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) && v.__staleWhileFetching === void 0) {
        return false;
      }
      if (!__privateGet(this, _isStale).call(this, index)) {
        if (updateAgeOnHas) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status) {
          status.has = "hit";
          __privateGet(this, _statusTTL).call(this, status, index);
        }
        return true;
      } else if (status) {
        status.has = "stale";
        __privateGet(this, _statusTTL).call(this, status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }
  /**
   * Like {@link LRUCache#get} but doesn't update recency or delete stale
   * items.
   *
   * Returns `undefined` if the item is stale, unless
   * {@link LRUCache.OptionsBase.allowStale} is set.
   */
  peek(k3, peekOptions = {}) {
    const { allowStale = this.allowStale } = peekOptions;
    const index = __privateGet(this, _keyMap).get(k3);
    if (index !== void 0 && (allowStale || !__privateGet(this, _isStale).call(this, index))) {
      const v = __privateGet(this, _valList)[index];
      return __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
    }
  }
  async fetch(k3, fetchOptions = {}) {
    const {
      // get options
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      // set options
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      // fetch exclusive options
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
      ignoreFetchAbort = this.ignoreFetchAbort,
      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
      context,
      forceRefresh = false,
      status,
      signal
    } = fetchOptions;
    if (!__privateGet(this, _hasFetchMethod)) {
      if (status)
        status.fetch = "get";
      return this.get(k3, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status
      });
    }
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal
    };
    let index = __privateGet(this, _keyMap).get(k3);
    if (index === void 0) {
      if (status)
        status.fetch = "miss";
      const p3 = __privateMethod(this, _backgroundFetch, backgroundFetch_fn).call(this, k3, index, options, context);
      return p3.__returned = p3;
    } else {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
        const stale = allowStale && v.__staleWhileFetching !== void 0;
        if (status) {
          status.fetch = "inflight";
          if (stale)
            status.returnedStale = true;
        }
        return stale ? v.__staleWhileFetching : v.__returned = v;
      }
      const isStale = __privateGet(this, _isStale).call(this, index);
      if (!forceRefresh && !isStale) {
        if (status)
          status.fetch = "hit";
        __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        if (status)
          __privateGet(this, _statusTTL).call(this, status, index);
        return v;
      }
      const p3 = __privateMethod(this, _backgroundFetch, backgroundFetch_fn).call(this, k3, index, options, context);
      const hasStale = p3.__staleWhileFetching !== void 0;
      const staleVal = hasStale && allowStale;
      if (status) {
        status.fetch = isStale ? "stale" : "refresh";
        if (staleVal && isStale)
          status.returnedStale = true;
      }
      return staleVal ? p3.__staleWhileFetching : p3.__returned = p3;
    }
  }
  /**
   * Return a value from the cache. Will update the recency of the cache
   * entry found.
   *
   * If the key is not found, get() will return `undefined`.
   */
  get(k3, getOptions = {}) {
    const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
    const index = __privateGet(this, _keyMap).get(k3);
    if (index !== void 0) {
      const value = __privateGet(this, _valList)[index];
      const fetching = __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, value);
      if (status)
        __privateGet(this, _statusTTL).call(this, status, index);
      if (__privateGet(this, _isStale).call(this, index)) {
        if (status)
          status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.delete(k3);
          }
          if (status && allowStale)
            status.returnedStale = true;
          return allowStale ? value : void 0;
        } else {
          if (status && allowStale && value.__staleWhileFetching !== void 0) {
            status.returnedStale = true;
          }
          return allowStale ? value.__staleWhileFetching : void 0;
        }
      } else {
        if (status)
          status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        __privateMethod(this, _moveToTail, moveToTail_fn).call(this, index);
        if (updateAgeOnGet) {
          __privateGet(this, _updateItemAge).call(this, index);
        }
        return value;
      }
    } else if (status) {
      status.get = "miss";
    }
  }
  /**
   * Deletes a key out of the cache.
   * Returns true if the key was deleted, false otherwise.
   */
  delete(k3) {
    var _a, _b, _c, _d;
    let deleted = false;
    if (__privateGet(this, _size) !== 0) {
      const index = __privateGet(this, _keyMap).get(k3);
      if (index !== void 0) {
        deleted = true;
        if (__privateGet(this, _size) === 1) {
          this.clear();
        } else {
          __privateGet(this, _removeItemSize).call(this, index);
          const v = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
            v.__abortController.abort(new Error("deleted"));
          } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
            if (__privateGet(this, _hasDispose)) {
              (_a = __privateGet(this, _dispose)) == null ? void 0 : _a.call(this, v, k3, "delete");
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k3, "delete"]);
            }
          }
          __privateGet(this, _keyMap).delete(k3);
          __privateGet(this, _keyList)[index] = void 0;
          __privateGet(this, _valList)[index] = void 0;
          if (index === __privateGet(this, _tail)) {
            __privateSet(this, _tail, __privateGet(this, _prev)[index]);
          } else if (index === __privateGet(this, _head)) {
            __privateSet(this, _head, __privateGet(this, _next)[index]);
          } else {
            __privateGet(this, _next)[__privateGet(this, _prev)[index]] = __privateGet(this, _next)[index];
            __privateGet(this, _prev)[__privateGet(this, _next)[index]] = __privateGet(this, _prev)[index];
          }
          __privateWrapper(this, _size)._--;
          __privateGet(this, _free).push(index);
        }
      }
    }
    if (__privateGet(this, _hasDisposeAfter) && ((_c = __privateGet(this, _disposed)) == null ? void 0 : _c.length)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_d = __privateGet(this, _disposeAfter)) == null ? void 0 : _d.call(this, ...task);
      }
    }
    return deleted;
  }
  /**
   * Clear the cache entirely, throwing away all values.
   */
  clear() {
    var _a, _b, _c;
    for (const index of __privateMethod(this, _rindexes, rindexes_fn).call(this, { allowStale: true })) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
        v.__abortController.abort(new Error("deleted"));
      } else {
        const k3 = __privateGet(this, _keyList)[index];
        if (__privateGet(this, _hasDispose)) {
          (_a = __privateGet(this, _dispose)) == null ? void 0 : _a.call(this, v, k3, "delete");
        }
        if (__privateGet(this, _hasDisposeAfter)) {
          (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k3, "delete"]);
        }
      }
    }
    __privateGet(this, _keyMap).clear();
    __privateGet(this, _valList).fill(void 0);
    __privateGet(this, _keyList).fill(void 0);
    if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
      __privateGet(this, _ttls).fill(0);
      __privateGet(this, _starts).fill(0);
    }
    if (__privateGet(this, _sizes)) {
      __privateGet(this, _sizes).fill(0);
    }
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateGet(this, _free).length = 0;
    __privateSet(this, _calculatedSize, 0);
    __privateSet(this, _size, 0);
    if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt == null ? void 0 : dt.shift()) {
        (_c = __privateGet(this, _disposeAfter)) == null ? void 0 : _c.call(this, ...task);
      }
    }
  }
};
_max = new WeakMap();
_maxSize = new WeakMap();
_dispose = new WeakMap();
_disposeAfter = new WeakMap();
_fetchMethod = new WeakMap();
_size = new WeakMap();
_calculatedSize = new WeakMap();
_keyMap = new WeakMap();
_keyList = new WeakMap();
_valList = new WeakMap();
_next = new WeakMap();
_prev = new WeakMap();
_head = new WeakMap();
_tail = new WeakMap();
_free = new WeakMap();
_disposed = new WeakMap();
_sizes = new WeakMap();
_starts = new WeakMap();
_ttls = new WeakMap();
_hasDispose = new WeakMap();
_hasFetchMethod = new WeakMap();
_hasDisposeAfter = new WeakMap();
_initializeTTLTracking = new WeakSet();
initializeTTLTracking_fn = function() {
  const ttls = new ZeroArray(__privateGet(this, _max));
  const starts = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _ttls, ttls);
  __privateSet(this, _starts, starts);
  __privateSet(this, _setItemTTL, (index, ttl, start = perf.now()) => {
    starts[index] = ttl !== 0 ? start : 0;
    ttls[index] = ttl;
    if (ttl !== 0 && this.ttlAutopurge) {
      const t2 = setTimeout(() => {
        if (__privateGet(this, _isStale).call(this, index)) {
          this.delete(__privateGet(this, _keyList)[index]);
        }
      }, ttl + 1);
      if (t2.unref) {
        t2.unref();
      }
    }
  });
  __privateSet(this, _updateItemAge, (index) => {
    starts[index] = ttls[index] !== 0 ? perf.now() : 0;
  });
  __privateSet(this, _statusTTL, (status, index) => {
    if (ttls[index]) {
      const ttl = ttls[index];
      const start = starts[index];
      status.ttl = ttl;
      status.start = start;
      status.now = cachedNow || getNow();
      status.remainingTTL = status.now + ttl - start;
    }
  });
  let cachedNow = 0;
  const getNow = () => {
    const n3 = perf.now();
    if (this.ttlResolution > 0) {
      cachedNow = n3;
      const t2 = setTimeout(() => cachedNow = 0, this.ttlResolution);
      if (t2.unref) {
        t2.unref();
      }
    }
    return n3;
  };
  this.getRemainingTTL = (key) => {
    const index = __privateGet(this, _keyMap).get(key);
    if (index === void 0) {
      return 0;
    }
    return ttls[index] === 0 || starts[index] === 0 ? Infinity : starts[index] + ttls[index] - (cachedNow || getNow());
  };
  __privateSet(this, _isStale, (index) => {
    return ttls[index] !== 0 && starts[index] !== 0 && (cachedNow || getNow()) - starts[index] > ttls[index];
  });
};
_updateItemAge = new WeakMap();
_statusTTL = new WeakMap();
_setItemTTL = new WeakMap();
_isStale = new WeakMap();
_initializeSizeTracking = new WeakSet();
initializeSizeTracking_fn = function() {
  const sizes = new ZeroArray(__privateGet(this, _max));
  __privateSet(this, _calculatedSize, 0);
  __privateSet(this, _sizes, sizes);
  __privateSet(this, _removeItemSize, (index) => {
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) - sizes[index]);
    sizes[index] = 0;
  });
  __privateSet(this, _requireSize, (k3, v, size, sizeCalculation) => {
    if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
      return 0;
    }
    if (!isPosInt(size)) {
      if (sizeCalculation) {
        if (typeof sizeCalculation !== "function") {
          throw new TypeError("sizeCalculation must be a function");
        }
        size = sizeCalculation(v, k3);
        if (!isPosInt(size)) {
          throw new TypeError("sizeCalculation return invalid (expect positive integer)");
        }
      } else {
        throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
      }
    }
    return size;
  });
  __privateSet(this, _addItemSize, (index, size, status) => {
    sizes[index] = size;
    if (__privateGet(this, _maxSize)) {
      const maxSize = __privateGet(this, _maxSize) - sizes[index];
      while (__privateGet(this, _calculatedSize) > maxSize) {
        __privateMethod(this, _evict, evict_fn).call(this, true);
      }
    }
    __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) + sizes[index]);
    if (status) {
      status.entrySize = size;
      status.totalCalculatedSize = __privateGet(this, _calculatedSize);
    }
  });
};
_removeItemSize = new WeakMap();
_addItemSize = new WeakMap();
_requireSize = new WeakMap();
_indexes = new WeakSet();
indexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i4 = __privateGet(this, _tail); true; ) {
      if (!__privateMethod(this, _isValidIndex, isValidIndex_fn).call(this, i4)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i4)) {
        yield i4;
      }
      if (i4 === __privateGet(this, _head)) {
        break;
      } else {
        i4 = __privateGet(this, _prev)[i4];
      }
    }
  }
};
_rindexes = new WeakSet();
rindexes_fn = function* ({ allowStale = this.allowStale } = {}) {
  if (__privateGet(this, _size)) {
    for (let i4 = __privateGet(this, _head); true; ) {
      if (!__privateMethod(this, _isValidIndex, isValidIndex_fn).call(this, i4)) {
        break;
      }
      if (allowStale || !__privateGet(this, _isStale).call(this, i4)) {
        yield i4;
      }
      if (i4 === __privateGet(this, _tail)) {
        break;
      } else {
        i4 = __privateGet(this, _next)[i4];
      }
    }
  }
};
_isValidIndex = new WeakSet();
isValidIndex_fn = function(index) {
  return index !== void 0 && __privateGet(this, _keyMap).get(__privateGet(this, _keyList)[index]) === index;
};
_evict = new WeakSet();
evict_fn = function(free) {
  var _a, _b;
  const head = __privateGet(this, _head);
  const k3 = __privateGet(this, _keyList)[head];
  const v = __privateGet(this, _valList)[head];
  if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
    v.__abortController.abort(new Error("evicted"));
  } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
    if (__privateGet(this, _hasDispose)) {
      (_a = __privateGet(this, _dispose)) == null ? void 0 : _a.call(this, v, k3, "evict");
    }
    if (__privateGet(this, _hasDisposeAfter)) {
      (_b = __privateGet(this, _disposed)) == null ? void 0 : _b.push([v, k3, "evict"]);
    }
  }
  __privateGet(this, _removeItemSize).call(this, head);
  if (free) {
    __privateGet(this, _keyList)[head] = void 0;
    __privateGet(this, _valList)[head] = void 0;
    __privateGet(this, _free).push(head);
  }
  if (__privateGet(this, _size) === 1) {
    __privateSet(this, _head, __privateSet(this, _tail, 0));
    __privateGet(this, _free).length = 0;
  } else {
    __privateSet(this, _head, __privateGet(this, _next)[head]);
  }
  __privateGet(this, _keyMap).delete(k3);
  __privateWrapper(this, _size)._--;
  return head;
};
_backgroundFetch = new WeakSet();
backgroundFetch_fn = function(k3, index, options, context) {
  const v = index === void 0 ? void 0 : __privateGet(this, _valList)[index];
  if (__privateMethod(this, _isBackgroundFetch, isBackgroundFetch_fn).call(this, v)) {
    return v;
  }
  const ac = new AbortController();
  const { signal } = options;
  signal == null ? void 0 : signal.addEventListener("abort", () => ac.abort(signal.reason), {
    signal: ac.signal
  });
  const fetchOpts = {
    signal: ac.signal,
    options,
    context
  };
  const cb = (v2, updateCache = false) => {
    const { aborted } = ac.signal;
    const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
    if (options.status) {
      if (aborted && !updateCache) {
        options.status.fetchAborted = true;
        options.status.fetchError = ac.signal.reason;
        if (ignoreAbort)
          options.status.fetchAbortIgnored = true;
      } else {
        options.status.fetchResolved = true;
      }
    }
    if (aborted && !ignoreAbort && !updateCache) {
      return fetchFail(ac.signal.reason);
    }
    const bf2 = p3;
    if (__privateGet(this, _valList)[index] === p3) {
      if (v2 === void 0) {
        if (bf2.__staleWhileFetching) {
          __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
        } else {
          this.delete(k3);
        }
      } else {
        if (options.status)
          options.status.fetchUpdated = true;
        this.set(k3, v2, fetchOpts.options);
      }
    }
    return v2;
  };
  const eb = (er) => {
    if (options.status) {
      options.status.fetchRejected = true;
      options.status.fetchError = er;
    }
    return fetchFail(er);
  };
  const fetchFail = (er) => {
    const { aborted } = ac.signal;
    const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
    const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
    const noDelete = allowStale || options.noDeleteOnFetchRejection;
    const bf2 = p3;
    if (__privateGet(this, _valList)[index] === p3) {
      const del = !noDelete || bf2.__staleWhileFetching === void 0;
      if (del) {
        this.delete(k3);
      } else if (!allowStaleAborted) {
        __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
      }
    }
    if (allowStale) {
      if (options.status && bf2.__staleWhileFetching !== void 0) {
        options.status.returnedStale = true;
      }
      return bf2.__staleWhileFetching;
    } else if (bf2.__returned === bf2) {
      throw er;
    }
  };
  const pcall = (res, rej) => {
    var _a;
    const fmp = (_a = __privateGet(this, _fetchMethod)) == null ? void 0 : _a.call(this, k3, v, fetchOpts);
    if (fmp && fmp instanceof Promise) {
      fmp.then((v2) => res(v2), rej);
    }
    ac.signal.addEventListener("abort", () => {
      if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
        res();
        if (options.allowStaleOnFetchAbort) {
          res = (v2) => cb(v2, true);
        }
      }
    });
  };
  if (options.status)
    options.status.fetchDispatched = true;
  const p3 = new Promise(pcall).then(cb, eb);
  const bf = Object.assign(p3, {
    __abortController: ac,
    __staleWhileFetching: v,
    __returned: void 0
  });
  if (index === void 0) {
    this.set(k3, bf, { ...fetchOpts.options, status: void 0 });
    index = __privateGet(this, _keyMap).get(k3);
  } else {
    __privateGet(this, _valList)[index] = bf;
  }
  return bf;
};
_isBackgroundFetch = new WeakSet();
isBackgroundFetch_fn = function(p3) {
  if (!__privateGet(this, _hasFetchMethod))
    return false;
  const b4 = p3;
  return !!b4 && b4 instanceof Promise && b4.hasOwnProperty("__staleWhileFetching") && b4.__abortController instanceof AbortController;
};
_connect = new WeakSet();
connect_fn = function(p3, n3) {
  __privateGet(this, _prev)[n3] = p3;
  __privateGet(this, _next)[p3] = n3;
};
_moveToTail = new WeakSet();
moveToTail_fn = function(index) {
  if (index !== __privateGet(this, _tail)) {
    if (index === __privateGet(this, _head)) {
      __privateSet(this, _head, __privateGet(this, _next)[index]);
    } else {
      __privateMethod(this, _connect, connect_fn).call(this, __privateGet(this, _prev)[index], __privateGet(this, _next)[index]);
    }
    __privateMethod(this, _connect, connect_fn).call(this, __privateGet(this, _tail), index);
    __privateSet(this, _tail, index);
  }
};
var LRUCache = _LRUCache;
var mjs_default = LRUCache;

// node_modules/md-editor-v3/lib/es/chunks/index4.mjs
var Me = (e4, a2) => {
  const l2 = inject("editorId"), { noImgZoomIn: t2 } = e4, n3 = M(() => {
    const r4 = document.querySelectorAll(`#${l2}-preview img`);
    r4.length !== 0 && medium_zoom_esm_default(r4, {
      background: "#00000073"
    });
  });
  onMounted(() => {
    !t2 && n3();
  }), watch([a2, toRef(e4.setting, "preview")], () => {
    !t2 && n3();
  });
};
var Re = Me;
var xe = (e4, a2) => {
  if (typeof a2[e4] == "string")
    return a2[e4];
  const l2 = `<i class="${a}-iconfont ${a}-icon-${e4}"></i>`;
  switch (l.iconfontType) {
    case "svg":
      return `<svg class="${a}-icon" aria-hidden="true"><use xlink:href="#${a}-icon-${e4}"></use></svg>`;
    default:
      return l2;
  }
};
var Le = (e4, a2) => {
  const l2 = inject("editorId"), t2 = inject("usedLanguageText"), n3 = inject("customIcon"), r4 = () => {
    document.querySelectorAll(`#${l2}-preview pre`).forEach((u2) => {
      var b4, v;
      let s2 = -1;
      (b4 = u2.querySelector(".copy-button")) == null || b4.remove();
      const o2 = ((v = t2.value.copyCode) == null ? void 0 : v.text) || "复制代码", d3 = document.createElement("span");
      d3.setAttribute("class", "copy-button"), d3.dataset.tips = o2, d3.innerHTML = xe("copy", n3.value), d3.addEventListener("click", () => {
        var y2, w2;
        clearTimeout(s2);
        const m5 = u2.querySelector("code").innerText, h6 = (0, import_copy_to_clipboard.default)(e4.formatCopiedText(m5)), f3 = ((y2 = t2.value.copyCode) == null ? void 0 : y2.successTips) || "已复制！", k3 = ((w2 = t2.value.copyCode) == null ? void 0 : w2.failTips) || "已复制！";
        d3.dataset.tips = h6 ? f3 : k3, s2 = window.setTimeout(() => {
          d3.dataset.tips = o2;
        }, 1500);
      }), u2.appendChild(d3);
    });
  }, i4 = () => {
    nextTick(r4);
  }, c2 = (u2) => {
    u2 && nextTick(r4);
  };
  watch(() => a2.value, i4), watch(() => e4.setting.preview, c2), watch(() => e4.setting.htmlPreview, c2), watch(() => t2.value, r4), onMounted(r4);
};
var Be = Le;
var Ne = (e4) => {
  var r4;
  const a2 = (r4 = l.editorExtensions) == null ? void 0 : r4.highlight, l2 = a2 == null ? void 0 : a2.instance, t2 = inject("highlight"), n3 = shallowRef(l2);
  return onMounted(() => {
    if (!e4.noHighlight && !n3.value) {
      const i4 = document.createElement("script");
      i4.src = t2.value.js, i4.onload = () => {
        n3.value = window.hljs;
      }, i4.id = `${a}-hljs`, h4(i4, "hljs");
      const c2 = document.createElement("link");
      c2.rel = "stylesheet", c2.href = t2.value.css, c2.id = `${a}-hlCss`, h4(c2);
    }
  }), watch(
    () => t2.value.css,
    (i4) => {
      b3(`${a}-hlCss`, "href", i4);
    }
  ), n3;
};
var Oe = Ne;
var Ue = (e4) => {
  const a2 = inject("theme"), { editorExtensions: l2 } = l, t2 = l2 == null ? void 0 : l2.mermaid, n3 = shallowRef(t2 == null ? void 0 : t2.instance), r4 = shallowRef(-1), i4 = new mjs_default({
    max: 1e3,
    // 缓存10分钟
    ttl: 6e5
  }), c2 = () => {
    const s2 = n3.value;
    !e4.noMermaid && s2 && (s2.initialize({
      startOnLoad: false,
      theme: a2.value === "dark" ? "dark" : "default"
    }), r4.value = r4.value + 1);
  };
  return watch(
    () => a2.value,
    () => {
      i4.clear(), c2();
    }
  ), onMounted(() => {
    if (!e4.noMermaid && !(t2 != null && t2.instance)) {
      const s2 = (t2 == null ? void 0 : t2.js) || k;
      if (/\.mjs/.test(s2))
        import(
          /* @vite-ignore */
          /* webpackIgnore: true */
          s2
        ).then((o2) => {
          n3.value = o2.default, c2();
        });
      else {
        const o2 = document.createElement("script");
        o2.id = `${a}-mermaid`, o2.src = s2, o2.onload = () => {
          n3.value = window.mermaid, c2();
        }, h4(o2, "mermaid");
      }
    }
  }), { mermaidRef: n3, reRenderRef: r4, replaceMermaid: () => {
    nextTick(() => {
      if (!e4.noMermaid && n3.value) {
        const s2 = document.querySelectorAll(
          `div.${a}-mermaid`
        ), o2 = document.createElement("div");
        o2.style.width = document.body.offsetWidth + "px", o2.style.height = document.body.offsetHeight + "px", o2.style.position = "fixed", o2.style.zIndex = "-10000", o2.style.top = "-10000";
        let d3 = s2.length;
        d3 > 0 && document.body.appendChild(o2), s2.forEach(async (b4) => {
          let v = i4.get(b4.innerText);
          if (!v) {
            const h6 = U(), f3 = n3.value.renderAsync || n3.value.render;
            let k3 = "";
            try {
              k3 = await f3(h6, b4.innerText, o2);
            } catch {
            }
            v = typeof k3 == "string" ? k3 : k3.svg, i4.set(b4.innerText, v);
          }
          const m5 = document.createElement("p");
          m5.className = `${a}-mermaid`, m5.setAttribute("data-processed", ""), m5.innerHTML = v, b4.dataset.line !== void 0 && (m5.dataset.line = b4.dataset.line), b4.replaceWith(m5), --d3 === 0 && o2.remove();
        });
      }
    });
  } };
};
var je = Ue;
var Ge = (e4) => {
  var n3;
  const a2 = (n3 = l.editorExtensions) == null ? void 0 : n3.katex, l2 = a2 == null ? void 0 : a2.instance, t2 = shallowRef(l2);
  return onMounted(() => {
    if (!e4.noKatex && !t2.value) {
      const r4 = document.createElement("script");
      r4.src = (a2 == null ? void 0 : a2.js) || b.js, r4.onload = () => {
        t2.value = window.katex;
      }, r4.id = `${a}-katex`;
      const i4 = document.createElement("link");
      i4.rel = "stylesheet", i4.href = (a2 == null ? void 0 : a2.css) || b.css, i4.id = `${a}-katexCss`, h4(r4, "katex"), h4(i4);
    }
  }), t2;
};
var De = Ge;
var Ve = (e4, a2) => {
  const l2 = e4.renderer.rules.fence.bind(e4.renderer.rules);
  e4.renderer.rules.fence = (t2, n3, r4, i4, c2) => {
    const u2 = t2[n3], s2 = u2.content.trim();
    if (u2.info === "mermaid") {
      let o2;
      return t2[n3].map && t2[n3].level === 0 && (o2 = t2[n3].map[0], t2[n3].attrSet("data-line", String(o2))), `<div class="${a}-mermaid" ${o2 !== void 0 ? "data-line=" + o2 : ""} data-mermaid-theme=${a2.themeRef.value}>${s2}</div>`;
    }
    return l2(t2, n3, r4, i4, c2);
  };
};
var ze = Ve;
var J = (e4, a2) => {
  let l2 = true, t2 = true;
  const n3 = e4.posMax, r4 = a2 > 0 ? e4.src.charCodeAt(a2 - 1) : -1, i4 = a2 + 1 <= n3 ? e4.src.charCodeAt(a2 + 1) : -1;
  return (r4 === 32 || r4 === 9 || i4 >= 48 && i4 <= 57) && (t2 = false), (i4 === 32 || i4 === 9) && (l2 = false), {
    can_open: l2,
    can_close: t2
  };
};
var Ke = (e4, a2) => {
  let l2, t2, n3, r4;
  if (e4.src[e4.pos] !== "$")
    return false;
  if (n3 = J(e4, e4.pos), !n3.can_open)
    return a2 || (e4.pending += "$"), e4.pos += 1, true;
  const i4 = e4.pos + 1;
  for (l2 = i4; (l2 = e4.src.indexOf("$", l2)) !== -1; ) {
    for (r4 = l2 - 1; e4.src[r4] === "\\"; )
      r4 -= 1;
    if ((l2 - r4) % 2 == 1)
      break;
    l2 += 1;
  }
  return l2 === -1 ? (a2 || (e4.pending += "$"), e4.pos = i4, true) : l2 - i4 === 0 ? (a2 || (e4.pending += "$$"), e4.pos = i4 + 1, true) : (n3 = J(e4, l2), n3.can_close ? (a2 || (t2 = e4.push("math_inline", "math", 0), t2.markup = "$", t2.content = e4.src.slice(i4, l2)), e4.pos = l2 + 1, true) : (a2 || (e4.pending += "$"), e4.pos = i4, true));
};
var qe = (e4, a2, l2, t2) => {
  let n3, r4, i4, c2, u2 = false, s2 = e4.bMarks[a2] + e4.tShift[a2], o2 = e4.eMarks[a2];
  if (s2 + 2 > o2 || e4.src.slice(s2, s2 + 2) !== "$$")
    return false;
  if (s2 += 2, n3 = e4.src.slice(s2, o2), t2)
    return true;
  for (n3.trim().slice(-2) === "$$" && (n3 = n3.trim().slice(0, -2), u2 = true), i4 = a2; !u2 && (i4++, !(i4 >= l2 || (s2 = e4.bMarks[i4] + e4.tShift[i4], o2 = e4.eMarks[i4], s2 < o2 && e4.tShift[i4] < e4.blkIndent))); )
    e4.src.slice(s2, o2).trim().slice(-2) === "$$" && (c2 = e4.src.slice(0, o2).lastIndexOf("$$"), r4 = e4.src.slice(s2, c2), u2 = true);
  e4.line = i4 + 1;
  const d3 = e4.push("math_block", "math", 0);
  return d3.block = true, d3.content = (n3 && n3.trim() ? n3 + `
` : "") + e4.getLines(a2 + 1, i4, e4.tShift[a2], true) + (r4 && r4.trim() ? r4 : ""), d3.map = [a2, e4.line], d3.markup = "$$", true;
};
var Ze = (e4, a2) => {
  const l2 = (n3) => {
    if (a2.katexRef.value) {
      const r4 = a2.katexRef.value.renderToString(n3, {
        throwOnError: false
      });
      return `<span class="${a}-katex-inline" data-processed>${r4}</span>`;
    } else
      return `<span class="${a}-katex-inline">${n3}</span>`;
  }, t2 = (n3, r4) => {
    if (a2.katexRef.value) {
      const i4 = a2.katexRef.value.renderToString(n3, {
        throwOnError: false,
        displayMode: true
      });
      return `<p class="${a}-katex-block" data-line=${r4} data-processed>${i4}</p>`;
    } else
      return `<p class="${a}-katex-block" data-line=${r4}>${n3}</p>`;
  };
  e4.inline.ruler.after("escape", "math_inline", Ke), e4.block.ruler.after("blockquote", "math_block", qe, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  }), e4.renderer.rules.math_inline = (n3, r4) => l2(n3[r4].content), e4.renderer.rules.math_block = (n3, r4) => t2(n3[r4].content, n3[r4].map[0]) + `
`;
};
var We = Ze;
var Je = (e4, a2) => {
  a2 = a2 || {};
  const l2 = 3, t2 = a2.marker || "!", n3 = t2.charCodeAt(0), r4 = t2.length;
  let i4 = "", c2 = "";
  const u2 = (o2, d3, b4, v, m5) => {
    const h6 = o2[d3];
    return h6.type === "admonition_open" ? (o2[d3].attrPush([
      "class",
      `${a}-admonition ${a}-admonition-${h6.info}`
    ]), o2[d3].attrSet("data-line", String(o2[d3].map[0]))) : h6.type === "admonition_title_open" && o2[d3].attrPush(["class", `${a}-admonition-title`]), m5.renderToken(o2, d3, b4);
  }, s2 = (o2) => {
    const d3 = o2.trim().split(" ", 2);
    c2 = "", i4 = d3[0], d3.length > 1 && (c2 = o2.substring(i4.length + 2)), (c2 === "" || !c2) && (c2 = i4);
  };
  e4.block.ruler.before(
    "code",
    "admonition",
    (o2, d3, b4, v) => {
      let m5, h6, f3, k3 = false, y2 = o2.bMarks[d3] + o2.tShift[d3], w2 = o2.eMarks[d3];
      if (n3 !== o2.src.charCodeAt(y2))
        return false;
      for (m5 = y2 + 1; m5 <= w2 && t2[(m5 - y2) % r4] === o2.src[m5]; m5++)
        ;
      const I3 = Math.floor((m5 - y2) / r4);
      if (I3 !== l2)
        return false;
      m5 -= (m5 - y2) % r4;
      const E2 = o2.src.slice(y2, m5), T4 = o2.src.slice(m5, w2);
      if (s2(T4), v)
        return true;
      for (h6 = d3; h6++, !(h6 >= b4 || (y2 = o2.bMarks[h6] + o2.tShift[h6], w2 = o2.eMarks[h6], y2 < w2 && o2.sCount[h6] < o2.blkIndent)); )
        if (n3 === o2.src.charCodeAt(y2) && !(o2.sCount[h6] - o2.blkIndent >= 4)) {
          for (m5 = y2 + 1; m5 <= w2 && t2[(m5 - y2) % r4] === o2.src[m5]; m5++)
            ;
          if (!(Math.floor((m5 - y2) / r4) < I3) && (m5 -= (m5 - y2) % r4, m5 = o2.skipSpaces(m5), !(m5 < w2))) {
            k3 = true;
            break;
          }
        }
      const N2 = o2.parentType, se2 = o2.lineMax;
      return o2.parentType = "root", o2.lineMax = h6, f3 = o2.push("admonition_open", "div", 1), f3.markup = E2, f3.block = true, f3.info = i4, f3.map = [d3, h6], f3 = o2.push("admonition_title_open", "p", 1), f3.markup = E2 + " " + i4, f3.map = [d3, h6], f3 = o2.push("inline", "", 0), f3.content = c2, f3.map = [d3, o2.line - 1], f3.children = [], f3 = o2.push("admonition_title_close", "p", -1), f3.markup = E2 + " " + i4, o2.md.block.tokenize(o2, d3 + 1, h6), f3 = o2.push("admonition_close", "div", -1), f3.markup = o2.src.slice(y2, m5), f3.block = true, o2.parentType = N2, o2.lineMax = se2, o2.line = h6 + (k3 ? 1 : 0), true;
    },
    {
      alt: ["paragraph", "reference", "blockquote", "list"]
    }
  ), e4.renderer.rules.admonition_open = u2, e4.renderer.rules.admonition_title_open = u2, e4.renderer.rules.admonition_title_close = u2, e4.renderer.rules.admonition_close = u2;
};
var Xe = Je;
var Qe = (e4, a2) => {
  e4.renderer.rules.heading_open = (l2, t2) => {
    var c2;
    const n3 = l2[t2], r4 = ((c2 = l2[t2 + 1].children) == null ? void 0 : c2.reduce((u2, s2) => u2 + (s2.content || ""), "")) || "", i4 = n3.markup.length;
    return a2.headsRef.value.push({
      text: r4,
      level: i4
    }), n3.map && n3.level === 0 && (n3.attrSet("data-line", String(n3.map[0])), n3.attrSet(
      "id",
      a2.mdHeadingId(r4, i4, a2.headsRef.value.length)
    )), e4.renderer.renderToken(l2, t2, a2);
  }, e4.renderer.rules.heading_close = (l2, t2, n3, r4, i4) => i4.renderToken(l2, t2, n3);
};
var Ye = Qe;
var et = (e4, a2) => {
  const l2 = e4.renderer.rules.fence, t2 = e4.utils.unescapeAll, n3 = /\[(\w*)(?::([\w ]*))?\]/;
  function r4(s2) {
    return s2.info ? t2(s2.info).trim() : "";
  }
  function i4(s2) {
    const o2 = r4(s2), [d3 = null, b4 = ""] = (n3.exec(o2) || []).slice(1);
    return [d3, b4];
  }
  function c2(s2) {
    const o2 = r4(s2);
    return o2 ? o2.split(/(\s+)/g)[0] : "";
  }
  const u2 = (s2, o2, d3, b4, v) => {
    if (s2[o2].hidden)
      return "";
    const [m5, h6] = i4(s2[o2]);
    if (m5 === null)
      return l2(s2, o2, d3, b4, v);
    let f3, k3, y2, w2, I3 = "", E2 = "";
    for (let T4 = o2; T4 < s2.length && (f3 = s2[T4], [k3, y2] = i4(f3), k3 === m5); T4++)
      f3.info = f3.info.replace(n3, ""), f3.hidden = true, w2 = T4 - o2 > 0 ? "" : " checked", I3 += `<li><input type="radio" name="label-group-${a2.editorId}-${o2}"${w2}><label for="group-${a2.editorId}-${o2}-tab-${T4 - o2}" onclick="this.previousElementSibling.click()">${y2 || c2(f3)}</label></li>
`, E2 += `<input type="radio" id="group-${a2.editorId}-${o2}-tab-${T4 - o2}" name="group-${a2.editorId}-${o2}"${w2}>
` + l2(s2, T4, d3, b4, v);
    return `<div class="code-tabs">
<ul>
` + I3 + `</ul>
` + E2 + "</div>";
  };
  e4.renderer.rules.fence = u2;
};
var tt = et;
var nt = (e4) => {
  [
    "paragraph_open",
    "table_open",
    "ordered_list_open",
    "bullet_list_open",
    "blockquote_open",
    "hr",
    "html_block",
    "fence"
  ].forEach((a2) => {
    const l2 = e4.renderer.rules[a2];
    l2 ? e4.renderer.rules[a2] = (t2, n3, r4, i4, c2) => {
      let u2;
      const s2 = l2(t2, n3, r4, i4, c2);
      return t2[n3].map && t2[n3].level === 0 ? (u2 = t2[n3].map[0], s2.replace(/^(<[^>]*)/, `$1 data-line="${u2}"`)) : s2;
    } : e4.renderer.rules[a2] = (t2, n3, r4, i4, c2) => {
      let u2;
      return t2[n3].map && t2[n3].level === 0 && (u2 = t2[n3].map[0], t2[n3].attrSet("data-line", String(u2))), c2.renderToken(t2, n3, r4);
    };
  });
};
var ot = (e4, a2) => {
  const { editorConfig: l2, markdownItConfig: t2, markdownItPlugins: n3 } = l, r4 = inject("editorId"), i4 = inject("showCodeRowNumber"), c2 = inject("theme"), u2 = ref([]), s2 = Oe(e4), o2 = De(e4), { reRenderRef: d3, replaceMermaid: b4 } = je(e4), v = (0, import_markdown_it.default)({
    html: true,
    breaks: true
  });
  t2(v);
  const m5 = [
    {
      type: "katex",
      plugin: We,
      options: { katexRef: o2 }
    },
    {
      type: "image",
      plugin: r3,
      options: { figcaption: true, classes: "md-zoom" }
    },
    {
      type: "admonition",
      plugin: Xe,
      options: {}
    },
    {
      type: "taskList",
      plugin: import_markdown_it_task_lists.default,
      options: {}
    },
    {
      type: "heading",
      plugin: Ye,
      options: { mdHeadingId: e4.mdHeadingId, headsRef: u2 }
    },
    {
      type: "codeTabs",
      plugin: tt,
      options: { editorId: r4 }
    }
  ];
  e4.noMermaid || m5.push({
    type: "mermaid",
    plugin: ze,
    options: { themeRef: c2 }
  }), n3(m5).forEach((w2) => {
    v.use(w2.plugin, w2.options);
  }), v.set({
    highlight: (w2, I3) => {
      let E2;
      !e4.noHighlight && s2.value ? s2.value.getLanguage(I3) ? E2 = s2.value.highlight(w2, {
        language: I3,
        ignoreIllegals: true
      }).value : E2 = s2.value.highlightAuto(w2).value : E2 = v.utils.escapeHtml(w2);
      const T4 = i4 ? w(E2.trim()) : `<span class="code-block">${E2.trim()}</span>`;
      return `<pre><code class="language-${I3}" language=${I3}>${T4}</code></pre>`;
    }
  }), nt(v);
  const h6 = ref(e4.sanitize(v.render(e4.modelValue))), f3 = () => {
    C.emit(r4, S, h6.value), e4.onHtmlChanged(h6.value), e4.onGetCatalog(u2.value), C.emit(r4, I2, u2.value), b4();
  };
  onMounted(f3);
  const k3 = M(
    async () => {
      u2.value = [], h6.value = e4.sanitize(v.render(e4.modelValue)), f3();
    },
    (l2 == null ? void 0 : l2.renderDelay) !== void 0 ? l2 == null ? void 0 : l2.renderDelay : a2 ? 0 : 500
  ), y2 = computed(() => (e4.noKatex || o2.value) && (e4.noHighlight || s2.value));
  return watch([toRef(e4, "modelValue"), y2, d3], k3), onMounted(() => {
    C.on(r4, {
      name: D,
      callback() {
        C.emit(r4, I2, u2.value);
      }
    });
  }), { html: h6 };
};
var rt = ot;
var re = {
  modelValue: {
    type: String,
    default: ""
  },
  setting: {
    type: Object,
    default: () => ({})
  },
  onHtmlChanged: {
    type: Function,
    default: () => {
    }
  },
  onGetCatalog: {
    type: Function,
    default: () => {
    }
  },
  mdHeadingId: {
    type: Function,
    default: () => ""
  },
  noMermaid: {
    type: Boolean,
    default: false
  },
  sanitize: {
    type: Function,
    default: (e4) => e4
  },
  // 不使用该函数功能
  noKatex: {
    type: Boolean,
    default: false
  },
  formatCopiedText: {
    type: Function,
    default: (e4) => e4
  },
  noHighlight: {
    type: Boolean,
    default: false
  },
  previewOnly: {
    type: Boolean,
    default: false
  },
  noImgZoomIn: {
    type: Boolean
  }
};
var bt = {
  ...re,
  onChange: {
    type: Function,
    default: () => {
    }
  },
  placeholder: {
    type: String,
    default: ""
  },
  scrollAuto: {
    type: Boolean
  },
  autofocus: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  readonly: {
    type: Boolean
  },
  maxlength: {
    type: Number
  },
  autoDetectCode: {
    type: Boolean
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function,
    default: () => {
    }
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function,
    default: () => {
    }
  },
  noPrettier: {
    type: Boolean
  },
  completions: {
    type: Array
  },
  catalogVisible: {
    type: Boolean
  },
  theme: {
    type: String,
    default: "light"
  },
  onInput: {
    type: Function
  },
  onDrop: {
    type: Function,
    default: () => {
    }
  }
};
var at = defineComponent({
  name: "ContentPreview",
  props: re,
  setup(e4) {
    const a2 = inject("editorId"), l2 = inject("previewTheme"), t2 = inject("showCodeRowNumber"), {
      html: n3
    } = rt(e4, e4.previewOnly);
    return Be(e4, n3), Re(e4, n3), () => createVNode(Fragment, null, [createVNode("div", {
      id: `${a2}-preview-wrapper`,
      class: `${a}-preview-wrapper`,
      "data-show": e4.setting.preview,
      key: "content-preview-wrapper"
    }, [createVNode("article", {
      id: `${a2}-preview`,
      class: [`${a}-preview`, `${l2 == null ? void 0 : l2.value}-theme`, t2 && `${a}-scrn`],
      innerHTML: n3.value
    }, null)]), !e4.previewOnly && createVNode("div", {
      id: `${a2}-html-wrapper`,
      class: `${a}-preview-wrapper`,
      "data-show": e4.setting.htmlPreview,
      key: "html-preview-wrapper"
    }, [createVNode("div", {
      class: `${a}-html`
    }, [n3.value])])]);
  }
});
var wt = (e4, a2) => {
  const { editorId: l2 } = e4, t2 = reactive({
    // 是否已编译成html
    buildFinished: false,
    // 存储当前最新的html
    html: ""
  });
  watch(
    () => e4.modelValue,
    () => {
      t2.buildFinished = false;
    }
  ), onMounted(() => {
    C.on(l2, {
      name: S,
      callback(n3) {
        t2.buildFinished = true, t2.html = n3;
      }
    }), C.on(l2, {
      name: E,
      callback() {
        const n3 = new Promise((r4) => {
          if (t2.buildFinished)
            r4(t2.html);
          else {
            const i4 = (c2) => {
              r4(c2), C.remove(l2, S, i4);
            };
            C.on(l2, {
              name: S,
              callback: i4
            });
          }
        });
        e4.onSave ? e4.onSave(e4.modelValue, n3) : a2.emit("onSave", e4.modelValue, n3);
      }
    });
  });
};
var ae = (e4) => {
  var n3, r4;
  const { editorId: a2 } = e4, l2 = (r4 = (n3 = l) == null ? void 0 : n3.editorExtensions) == null ? void 0 : r4.highlight;
  provide("editorId", a2), provide(
    "theme",
    computed(() => e4.theme)
  ), provide(
    "language",
    computed(() => e4.language)
  ), provide(
    "highlight",
    computed(() => {
      const i4 = {
        ...f,
        ...l2 == null ? void 0 : l2.css
      }, c2 = e4.codeStyleReverse && e4.codeStyleReverseList.includes(e4.previewTheme) ? "dark" : e4.theme;
      return {
        js: (l2 == null ? void 0 : l2.js) || c,
        css: i4[e4.codeTheme] ? i4[e4.codeTheme][c2] : f.atom[c2]
      };
    })
  ), provide("showCodeRowNumber", e4.showCodeRowNumber);
  const t2 = computed(() => {
    var c2, u2;
    const i4 = {
      ...u,
      ...(u2 = (c2 = l) == null ? void 0 : c2.editorConfig) == null ? void 0 : u2.languageUserDefined
    };
    return i4[e4.language] ? i4[e4.language] : u["zh-CN"];
  });
  provide("usedLanguageText", t2), provide(
    "previewTheme",
    computed(() => e4.previewTheme)
  ), provide(
    "customIcon",
    computed(() => e4.customIcon)
  );
};
var kt = (e4) => {
  ae(e4), provide("tabWidth", e4.tabWidth);
};
var le = (e4) => {
  onMounted(() => {
    var a2, l2;
    if (!e4.noIconfont)
      if (l.iconfontType === "svg") {
        const t2 = document.createElement("script");
        t2.src = ((a2 = l.editorExtensions) == null ? void 0 : a2.iconfont) || r, t2.id = `${a}-icon`, h4(t2);
      } else {
        const t2 = document.createElement("link");
        t2.rel = "stylesheet", t2.href = ((l2 = l.editorExtensions) == null ? void 0 : l2.iconfontClass) || n, t2.id = `${a}-icon-class`, h4(t2);
      }
  });
};
var $t = (e4) => {
  var c2, u2, s2, o2, d3, b4;
  const { noPrettier: a2, noUploadImg: l2 } = e4, { editorExtensions: t2 } = l, n3 = a2 || !!((u2 = (c2 = l.editorExtensions) == null ? void 0 : c2.prettier) != null && u2.prettierInstance), r4 = a2 || !!((o2 = (s2 = l.editorExtensions) == null ? void 0 : s2.prettier) != null && o2.parserMarkdownInstance), i4 = l2 || !!((b4 = (d3 = l.editorExtensions) == null ? void 0 : d3.cropper) != null && b4.instance);
  onMounted(() => {
    var k3, y2, w2, I3;
    const v = document.createElement("script"), m5 = document.createElement("script");
    v.src = ((k3 = t2 == null ? void 0 : t2.prettier) == null ? void 0 : k3.standaloneJs) || d.main, v.id = `${a}-prettier`, m5.src = ((y2 = t2 == null ? void 0 : t2.prettier) == null ? void 0 : y2.parserMarkdownJs) || d.markdown, m5.id = `${a}-prettierMD`;
    const h6 = document.createElement("link");
    h6.rel = "stylesheet", h6.href = ((w2 = t2 == null ? void 0 : t2.cropper) == null ? void 0 : w2.css) || h2.css, h6.id = `${a}-cropperCss`;
    const f3 = document.createElement("script");
    f3.src = ((I3 = t2 == null ? void 0 : t2.cropper) == null ? void 0 : I3.js) || h2.js, f3.id = `${a}-cropper`, i4 || (h4(h6), h4(f3)), n3 || h4(v), r4 || h4(m5);
  }), le(e4);
};
var Ct = (e4, a2) => {
  const { editorId: l2 } = e4;
  onMounted(() => {
    C.on(l2, {
      name: b2,
      callback: (t2) => {
        e4.onError instanceof Function ? e4.onError(t2) : a2.emit("onError", t2);
      }
    });
  });
};
var It = (e4, a2) => {
  const { editorId: l2 } = e4, t2 = reactive({
    pageFullscreen: e4.pageFullscreen,
    fullscreen: false,
    preview: e4.preview,
    htmlPreview: e4.preview ? false : e4.htmlPreview
  }), n3 = (c2, u2) => {
    t2[c2] = u2 === void 0 ? !t2[c2] : u2, c2 === "preview" && t2.preview ? t2.htmlPreview = false : c2 === "htmlPreview" && t2.htmlPreview && (t2.preview = false);
  };
  let r4 = "";
  const i4 = () => {
    t2.pageFullscreen || t2.fullscreen ? document.body.style.overflow = "hidden" : document.body.style.overflow = r4;
  };
  return watch(() => [t2.pageFullscreen, t2.fullscreen], i4), onMounted(() => {
    C.on(l2, {
      name: H,
      callback(c2, u2) {
        const s2 = (o2) => {
          C.emit(l2, G, "image", {
            desc: "",
            urls: o2
          }), u2 && u2();
        };
        e4.onUploadImg ? e4.onUploadImg(c2, s2) : a2.emit("onUploadImg", c2, s2);
      }
    }), r4 = document.body.style.overflow, i4();
  }), [t2, n3];
};
var St = (e4) => {
  const { editorId: a2 } = e4, l2 = ref(false);
  return onMounted(() => {
    C.on(a2, {
      name: g2,
      callback: (n3) => {
        n3 === void 0 ? l2.value = !l2.value : l2.value = n3;
      }
    });
  }), computed(() => !e4.toolbarsExclude.includes("catalog") && e4.toolbars.includes("catalog") && l2.value);
};
var Et = (e4, a2, l2, t2, n3) => {
  const { editorId: r4 } = e4;
  watch(
    () => t2.pageFullscreen,
    (c2) => {
      C.emit(r4, R2, c2);
    }
  ), watch(
    () => t2.fullscreen,
    (c2) => {
      C.emit(r4, _2, c2);
    }
  ), watch(
    () => t2.preview,
    (c2) => {
      C.emit(r4, d2, c2);
    }
  ), watch(
    () => t2.htmlPreview,
    (c2) => {
      C.emit(r4, L2, c2);
    }
  ), watch(l2, (c2) => {
    C.emit(r4, N, c2);
  });
  const i4 = {
    on(c2, u2) {
      switch (c2) {
        case "pageFullscreen": {
          C.on(r4, {
            name: R2,
            callback(s2) {
              u2(s2);
            }
          });
          break;
        }
        case "fullscreen": {
          C.on(r4, {
            name: _2,
            callback(s2) {
              u2(s2);
            }
          });
          break;
        }
        case "preview": {
          C.on(r4, {
            name: d2,
            callback(s2) {
              u2(s2);
            }
          });
          break;
        }
        case "htmlPreview": {
          C.on(r4, {
            name: L2,
            callback(s2) {
              u2(s2);
            }
          });
          break;
        }
        case "catalog": {
          C.on(r4, {
            name: N,
            callback(s2) {
              u2(s2);
            }
          });
          break;
        }
      }
    },
    togglePageFullscreen(c2) {
      n3("pageFullscreen", c2);
    },
    toggleFullscreen(c2) {
      C.emit(r4, A, c2);
    },
    togglePreview(c2) {
      n3("preview", c2);
    },
    toggleHtmlPreview(c2) {
      n3("htmlPreview", c2);
    },
    toggleCatalog(c2) {
      C.emit(r4, g2, c2);
    },
    triggerSave() {
      C.emit(r4, E);
    },
    insert(c2) {
      C.emit(r4, G, "universal", { generate: c2 });
    },
    focus(c2) {
      C.emit(r4, f2, c2);
    }
  };
  a2.expose(i4);
};
var lt = (e4) => e4;
var ie = {
  /**
   * markdown content.
   *
   * @default ''
   */
  modelValue: {
    type: String,
    default: ""
  },
  /**
   * 主题，支持light和dark
   *
   * @default 'light'
   */
  theme: {
    type: String,
    default: "light"
  },
  /**
   * 外层类名
   *
   * @default ''
   */
  class: {
    type: String,
    default: ""
  },
  /**
   * 预设语言名称
   *
   * @default 'zh-CN'
   */
  language: {
    type: String,
    default: "zh-CN"
  },
  /**
   * html变化事件
   */
  onHtmlChanged: {
    type: Function
  },
  /**
   * 获取目录结构
   */
  onGetCatalog: {
    type: Function
  },
  /**
   * 编辑器唯一标识
   *
   * @default 'md-editor-v3'
   */
  editorId: {
    type: String,
    default: o
  },
  /**
   * 预览中代码是否显示行号
   *
   * @default false
   */
  showCodeRowNumber: {
    type: Boolean,
    default: false
  },
  /**
   * 预览内容样式
   *
   * @default 'default'
   */
  previewTheme: {
    type: String,
    default: "default"
  },
  /**
   * 编辑器样式
   */
  style: {
    type: Object,
    default: () => ({})
  },
  /**
   * 标题的id生成方式
   *
   * @default (text: string) => text
   */
  mdHeadingId: {
    type: Function,
    default: lt
  },
  /**
   *
   * 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
   * 推荐DOMPurify、sanitize-html
   *
   * @default (text: string) => text
   */
  sanitize: {
    type: Function,
    default: (e4) => e4
  },
  /**
   * 不使用该mermaid
   *
   * @default false
   */
  noMermaid: {
    type: Boolean,
    default: false
  },
  /**
   * 不使用katex
   *
   * @default false
   */
  noKatex: {
    type: Boolean,
    default: false
  },
  /**
   * 代码主题
   *
   * @default 'atom'
   */
  codeTheme: {
    type: String,
    default: "atom"
  },
  /**
   * 不插入iconfont链接
   *
   * @default false
   */
  noIconfont: {
    type: Boolean
  },
  /**
   * 复制代码格式化方法
   *
   * @default (text) => text
   */
  formatCopiedText: {
    type: Function,
    default: (e4) => e4
  },
  /**
   * 某些预览主题的代码模块背景是暗色系
   * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
   *
   * @default true
   */
  codeStyleReverse: {
    type: Boolean,
    default: true
  },
  /**
   * 需要自动调整的预览主题
   *
   * @default ['default', 'mk-cute']
   */
  codeStyleReverseList: {
    type: Array,
    default: ["default", "mk-cute"]
  },
  noHighlight: {
    type: Boolean,
    default: false
  },
  /**
   * 是否关闭编辑器默认的放大缩小功能
   */
  noImgZoomIn: {
    type: Boolean,
    default: false
  },
  /**
   * 自定义的图标
   */
  customIcon: {
    type: Object,
    default: {}
  }
};
var Pt = {
  ...ie,
  /**
   * input回调事件
   */
  onChange: {
    type: Function
  },
  /**
   * input回调事件
   */
  onSave: {
    type: Function
  },
  /**
   * 上传图片事件
   */
  onUploadImg: {
    type: Function
  },
  /**
   * 是否页面内全屏
   *
   * @default false
   */
  pageFullscreen: {
    type: Boolean,
    default: false
  },
  /**
   * 是否展开预览
   *
   * @default true
   */
  preview: {
    type: Boolean,
    default: true
  },
  /**
   * 是否展开html预览
   *
   * @default false
   */
  htmlPreview: {
    type: Boolean,
    default: false
  },
  /**
   * 仅预览模式，不显示toolbar和编辑框
   *
   * @4.0.0开始移除该设置，使用组件MdPreview替换
   *
   * @default false
   */
  // previewOnly: {
  //   type: Boolean as PropType<boolean>,
  //   default: false
  // },
  /**
   * 工具栏选择显示
   *
   * @default allToolbar
   */
  toolbars: {
    type: Array,
    default: m
  },
  /**
   * 工具栏选择不显示
   *
   * @default []
   */
  toolbarsExclude: {
    type: Array,
    default: []
  },
  /**
   * 格式化md
   *
   * @default true
   */
  noPrettier: {
    type: Boolean,
    default: false
  },
  /**
   * 一个tab等于空格数
   *
   * @default 2
   */
  tabWidth: {
    type: Number,
    default: 2
  },
  /**
   * 表格预设格子数
   *
   * @default [6, 4]
   */
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  /**
   * 空提示
   *
   * @default ''
   */
  placeholder: {
    type: String,
    default: ""
  },
  /**
   * 自定义的工具栏列表
   */
  defToolbars: {
    type: [String, Object]
  },
  /**
   * 内部错误捕获
   */
  onError: {
    type: Function
  },
  /**
   * 页脚列表显示顺序
   */
  footers: {
    type: Array,
    default: p
  },
  /**
   * 是否默认激活输入框和预览框同步滚动
   *
   * @default true
   */
  scrollAuto: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义的也叫工具组件列表
   */
  defFooters: {
    type: [String, Object]
  },
  /**
   * 是否禁用上传图片
   *
   * @default false
   */
  noUploadImg: {
    type: Boolean
  },
  /**
   * 文本区域自动获得焦点
   *
   * @default false
   */
  autoFocus: {
    type: Boolean
  },
  /**
   * 禁用文本区域
   *
   * @default false
   */
  disabled: {
    type: Boolean
  },
  /**
   * 文本区域为只读
   *
   * @default false
   */
  readOnly: {
    type: Boolean
  },
  /**
   * 文本区域允许的最大字符数
   */
  maxLength: {
    type: Number
  },
  /**
   * 是否启用自动识别粘贴代码类别
   * 目前支持 vscode 复制的代码识别
   *
   * @default false
   */
  autoDetectCode: {
    type: Boolean
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function
  },
  /**
   * @codemirror/autocomplete匹配关键词的方法列表
   *
   * 它会被像下面这样嵌入编辑器
   *
   * import { autocompletion } from '@codemirror/autocomplete';
   * autocompletion({
   *   override: [...completions]
   * })
   */
  completions: {
    type: Array
  },
  /**
   * 是否在工具栏下面显示对应的文字名称
   *
   * @default false
   */
  showToolbarName: {
    type: Boolean,
    default: false
  },
  /**
   * 字符输入事件
   */
  onInput: {
    type: Function
  },
  onDrop: {
    type: Function
  }
};
var ce = ["onHtmlChanged", "onGetCatalog"];
var Tt = [
  ...ce,
  "onChange",
  "onSave",
  "onUploadImg",
  "onError",
  "update:modelValue",
  "onBlur",
  "onFocus",
  "onInput",
  "onDrop"
];
var it = defineComponent({
  name: "MdPreview",
  props: ie,
  emits: ce,
  setup(e4, a2) {
    const {
      editorId: l2,
      noKatex: t2,
      noMermaid: n3,
      noHighlight: r4
    } = e4;
    return ae(e4), le(e4), onBeforeUnmount(() => {
      C.clear(l2);
    }), () => createVNode("div", {
      id: l2,
      class: [a, e4.class, e4.theme === "dark" && `${a}-dark`, `${a}-previewOnly`],
      style: e4.style
    }, [createVNode(at, {
      modelValue: e4.modelValue,
      onHtmlChanged: (i4) => {
        e4.onHtmlChanged ? e4.onHtmlChanged(i4) : a2.emit("onHtmlChanged", i4);
      },
      onGetCatalog: (i4) => {
        e4.onGetCatalog ? e4.onGetCatalog(i4) : a2.emit("onGetCatalog", i4);
      },
      mdHeadingId: e4.mdHeadingId,
      noMermaid: n3,
      sanitize: e4.sanitize,
      noKatex: t2,
      formatCopiedText: e4.formatCopiedText,
      noHighlight: r4,
      noImgZoomIn: e4.noImgZoomIn,
      previewOnly: true
    }, null)]);
  }
});
var x2 = it;
x2.install = (e4) => (e4.component(x2.name, x2), e4);

// node_modules/md-editor-v3/lib/es/MdCatalog.mjs
init_vue_runtime_esm_bundler();
var A2 = {
  tocItem: {
    type: Object,
    default: () => ({})
  },
  mdHeadingId: {
    type: Function,
    default: () => {
    }
  },
  scrollElement: {
    type: [String, Object],
    default: ""
  },
  onClick: {
    type: Function,
    default: () => {
    }
  },
  scrollElementOffsetTop: {
    type: Number,
    default: 0
  }
};
var C3 = defineComponent({
  props: A2,
  setup(l2) {
    return () => {
      const {
        tocItem: o2,
        mdHeadingId: i4,
        scrollElement: n3,
        onClick: u2,
        scrollElementOffsetTop: p3
      } = l2;
      return createVNode("div", {
        class: [`${a}-catalog-link`, o2.active && `${a}-catalog-active`],
        onClick: (s2) => {
          u2(s2, o2), s2.stopPropagation();
          const g4 = i4(o2.text, o2.level, o2.index), d3 = document.getElementById(g4), e4 = n3 instanceof Element ? n3 : document.querySelector(n3);
          if (d3 && e4) {
            let t2 = d3.offsetParent, c2 = d3.offsetTop;
            if (e4.contains(t2))
              for (; t2 && e4 != t2; )
                c2 += t2 == null ? void 0 : t2.offsetTop, t2 = t2 == null ? void 0 : t2.offsetParent;
            e4 == null || e4.scrollTo({
              top: c2 - p3,
              behavior: "smooth"
            });
          }
        }
      }, [createVNode("span", {
        title: o2.text
      }, [o2.text]), createVNode("div", {
        class: `${a}-catalog-wrapper`
      }, [o2.children && o2.children.map((s2) => createVNode(C3, {
        mdHeadingId: i4,
        key: `${o2.text}-link-${s2.level}-${s2.text}`,
        tocItem: s2,
        scrollElement: n3,
        onClick: u2,
        scrollElementOffsetTop: p3
      }, null))])]);
    };
  }
});
var M2 = C3;
var F3 = {
  /**
   * 编辑器的Id，务必与需要绑定的编辑器Id相同
   */
  editorId: {
    type: String
  },
  class: {
    type: String,
    default: ""
  },
  mdHeadingId: {
    type: Function,
    default: (l2) => l2
  },
  /**
   * 指定滚动的容器，选择器需带上对应的符号，默认预览框
   * 元素必须定位！！！！！！
   *
   * 默认：#md-editor-preview-wrapper
   */
  scrollElement: {
    type: [String, Object]
  },
  theme: {
    type: String,
    default: "light"
  },
  /**
   * 高亮标题相对滚动容器顶部偏移量，即距离该值时，高亮当前目录菜单项
   *
   * 默认：20px
   */
  offsetTop: {
    type: Number,
    default: 20
  },
  /**
   * 滚动区域的固定顶部高度
   *
   * 默认：0
   */
  scrollElementOffsetTop: {
    type: Number,
    default: 0
  },
  onClick: {
    type: Function
  }
};
var P2 = defineComponent({
  name: "MdCatalog",
  props: F3,
  emits: ["onClick"],
  setup(l2, o2) {
    const i4 = l2.editorId, n3 = reactive({
      list: [],
      show: false,
      scrollElement: l2.scrollElement || `#${i4}-preview-wrapper`
    }), u2 = shallowRef(), p3 = computed(() => {
      const e4 = [];
      return n3.list.forEach((t2, c2) => {
        const {
          text: E2,
          level: h6
        } = t2, a2 = {
          level: h6,
          text: E2,
          index: c2 + 1,
          active: u2.value === t2
        };
        if (e4.length === 0)
          e4.push(a2);
        else {
          let r4 = e4[e4.length - 1];
          if (a2.level > r4.level)
            for (let m5 = r4.level + 1; m5 <= 6; m5++) {
              const {
                children: v
              } = r4;
              if (!v) {
                r4.children = [a2];
                break;
              }
              if (r4 = v[v.length - 1], a2.level <= r4.level) {
                v.push(a2);
                break;
              }
            }
          else
            e4.push(a2);
        }
      }), e4;
    }), s2 = () => n3.scrollElement instanceof HTMLElement ? n3.scrollElement : document.querySelector(n3.scrollElement), g4 = L((e4) => {
      if (e4.length === 0)
        return n3.list = [], false;
      const {
        activeHead: t2
      } = e4.reduce((c2, E2, h6) => {
        const a2 = document.getElementById(l2.mdHeadingId(E2.text, E2.level, h6 + 1));
        if (a2 instanceof HTMLElement) {
          const r4 = s2(), m5 = P(a2, r4);
          if (m5 < l2.offsetTop && m5 > c2.minTop)
            return {
              activeHead: E2,
              minTop: m5
            };
        }
        return c2;
      }, {
        activeHead: e4[0],
        minTop: Number.MIN_SAFE_INTEGER
      });
      u2.value = t2, n3.list = e4;
    }), d3 = () => {
      g4(n3.list);
    };
    return onMounted(() => {
      var t2;
      const e4 = s2();
      (t2 = e4 === document.documentElement ? window : e4) == null || t2.addEventListener("scroll", d3), C.on(i4, {
        name: I2,
        callback: (c2) => {
          g4(c2);
        }
      }), C.emit(i4, D);
    }), onBeforeUnmount(() => {
      var t2;
      const e4 = s2();
      (t2 = e4 === document.documentElement ? window : e4) == null || t2.removeEventListener("scroll", d3);
    }), () => createVNode("div", {
      class: `${a}-catalog${l2.theme === "dark" ? "-dark" : ""} ${l2.class}`
    }, [p3.value.map((e4) => createVNode(M2, {
      mdHeadingId: l2.mdHeadingId,
      tocItem: e4,
      key: `link-${e4.level}-${e4.text}`,
      scrollElement: n3.scrollElement,
      onClick: (t2, c2) => {
        l2.onClick ? l2.onClick(t2, c2) : o2.emit("onClick", t2, c2);
      },
      scrollElementOffsetTop: l2.scrollElementOffsetTop
    }, null))]);
  }
});
var k2 = P2;
k2.install = (l2) => (l2.component(k2.name, k2), l2);

// node_modules/md-editor-v3/lib/es/NormalToolbar.mjs
init_vue_runtime_esm_bundler();
var m3 = {
  title: {
    type: String,
    default: ""
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onClick: {
    type: Function
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function
  },
  language: {
    type: String
  },
  theme: {
    type: String
  }
  /**
   * ==结束
   */
};
var e3 = defineComponent({
  name: "NormalToolbar",
  props: m3,
  emits: ["onClick"],
  setup(t2, n3) {
    return () => {
      const o2 = s({
        props: t2,
        ctx: n3
      }, "trigger");
      return createVNode("div", {
        class: `${a}-toolbar-item`,
        title: t2.title,
        onClick: (i4) => {
          t2.onClick instanceof Function ? t2.onClick(i4) : n3.emit("onClick", i4);
        }
      }, [o2]);
    };
  }
});
e3.install = (t2) => (t2.component(e3.name, e3), t2);

// node_modules/md-editor-v3/lib/es/ModalToolbar.mjs
init_vue_runtime_esm_bundler();
function m4(t2) {
  return typeof t2 == "function" || Object.prototype.toString.call(t2) === "[object Object]" && !isVNode(t2);
}
var g3 = {
  title: {
    type: String,
    default: ""
  },
  modalTitle: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object]
  },
  onClick: {
    type: Function
  },
  onClose: {
    type: Function
  },
  /**
   * 显示全屏按钮
   */
  showAdjust: {
    type: Boolean,
    default: false
  },
  isFullscreen: {
    type: Boolean,
    default: false
  },
  onAdjust: {
    type: Function
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function
  },
  language: {
    type: String
  },
  theme: {
    type: String
  }
  /**
   * ==结束
   */
};
var i3 = defineComponent({
  name: "ModalToolbar",
  props: g3,
  emits: ["onClick", "onClose", "onAdjust"],
  setup(t2, e4) {
    return () => {
      const u2 = s({
        props: t2,
        ctx: e4
      }, "trigger"), n3 = s({
        props: t2,
        ctx: e4
      }, "default");
      return createVNode(Fragment, null, [createVNode("div", {
        class: `${a}-toolbar-item`,
        title: t2.title,
        onClick: () => {
          t2.onClick instanceof Function ? t2.onClick() : e4.emit("onClick");
        }
      }, [u2]), createVNode(h5, {
        width: t2.width,
        height: t2.height,
        title: t2.modalTitle,
        visible: t2.visible,
        onClose: () => {
          t2.onClose instanceof Function ? t2.onClose() : e4.emit("onClose");
        },
        showAdjust: t2.showAdjust,
        isFullscreen: t2.isFullscreen,
        onAdjust: (l2) => {
          t2.onAdjust instanceof Function ? t2.onAdjust(l2) : e4.emit("onAdjust", l2);
        }
      }, m4(n3) ? n3 : {
        default: () => [n3]
      })]);
    };
  }
});
i3.install = (t2) => (t2.component(i3.name, i3), t2);

// node_modules/md-editor-v3/lib/es/MdEditor.mjs
var import_copy_to_clipboard2 = __toESM(require_copy_to_clipboard(), 1);
var import_markdown_it2 = __toESM(require_markdown_it(), 1);
var import_markdown_it_task_lists2 = __toESM(require_markdown_it_task_lists(), 1);
var Vt = Object.defineProperty;
var Ft = (e4, o2, l2) => o2 in e4 ? Vt(e4, o2, { enumerable: true, configurable: true, writable: true, value: l2 }) : e4[o2] = l2;
var q = (e4, o2, l2) => (Ft(e4, typeof o2 != "symbol" ? o2 + "" : o2, l2), l2);
var Sl = defineComponent({
  setup() {
    return () => createVNode("div", {
      class: `${a}-divider`
    }, null);
  }
});
var Al = {
  noPrettier: {
    type: Boolean
  },
  // 工具栏选择显示
  toolbars: {
    type: Array,
    default: () => []
  },
  // 工具栏选择不显示
  toolbarsExclude: {
    type: Array,
    default: () => []
  },
  setting: {
    type: Object,
    default: () => ({})
  },
  screenfull: {
    type: Object,
    default: null
  },
  screenfullJs: {
    type: String,
    default: ""
  },
  updateSetting: {
    type: Function,
    default: () => {
    }
  },
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  defToolbars: {
    type: Object
  },
  noUploadImg: {
    type: Boolean
  },
  /**
   * 是否在工具栏下面显示对应的文字名称
   *
   * @default false
   */
  showToolbarName: {
    type: Boolean
  }
};
var Ml = (e4) => {
  var u2, c2, v, x3;
  const o2 = inject("editorId");
  let l2 = (c2 = (u2 = l.editorExtensions) == null ? void 0 : u2.screenfull) == null ? void 0 : c2.instance;
  const a2 = (x3 = (v = l.editorExtensions) == null ? void 0 : v.screenfull) == null ? void 0 : x3.js, i4 = ref(false), r4 = (y2) => {
    if (!l2) {
      C.emit(o2, b2, {
        name: "fullscreen",
        message: "fullscreen is undefined"
      });
      return;
    }
    l2.isEnabled ? (i4.value = true, (y2 === void 0 ? !l2.isFullscreen : y2) ? l2.request() : l2.exit()) : console.error("browser does not support screenfull!");
  }, m5 = () => {
    l2 && l2.isEnabled && l2.on("change", () => {
      (i4.value || e4.setting.fullscreen) && (i4.value = false, e4.updateSetting("fullscreen"));
    });
  }, g4 = () => {
    l2 = window.screenfull, m5();
  };
  return onMounted(() => {
    if (m5(), !l2) {
      const y2 = document.createElement("script");
      y2.src = a2 || g, y2.onload = g4, y2.id = `${a}-screenfull`, h4(y2, "screenfull");
    }
  }), onMounted(() => {
    C.on(o2, {
      name: A,
      callback: r4
    });
  }), { fullscreenHandler: r4 };
};
var Ll = {
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  onSelected: {
    type: Function,
    default: () => {
    }
  }
};
var Dl = defineComponent({
  name: "TableShape",
  props: Ll,
  setup(e4) {
    const o2 = reactive({
      x: -1,
      y: -1
    });
    return () => createVNode("div", {
      class: `${a}-table-shape`,
      onMouseleave: () => {
        o2.x = -1, o2.y = -1;
      }
    }, [new Array(e4.tableShape[1]).fill("").map((l2, a2) => createVNode("div", {
      class: `${a}-table-shape-row`,
      key: `table-shape-row-${a2}`
    }, [new Array(e4.tableShape[0]).fill("").map((i4, r4) => createVNode("div", {
      class: `${a}-table-shape-col`,
      key: `table-shape-col-${r4}`,
      onMouseenter: () => {
        o2.x = a2, o2.y = r4;
      },
      onClick: () => {
        e4.onSelected(o2);
      }
    }, [createVNode("div", {
      class: [`${a}-table-shape-col-default`, a2 <= o2.x && r4 <= o2.y && `${a}-table-shape-col-include`]
    }, null)]))]))]);
  }
});
var Il = Dl;
var El = {
  type: {
    type: String,
    default: "link"
  },
  visible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var Hl = defineComponent({
  props: El,
  setup(e4) {
    const o2 = inject("usedLanguageText"), l2 = inject("editorId"), a2 = computed(() => {
      var r4, m5;
      switch (e4.type) {
        case "link":
          return (r4 = o2.value.linkModalTips) == null ? void 0 : r4.linkTitle;
        case "image":
          return (m5 = o2.value.linkModalTips) == null ? void 0 : m5.imageTitle;
        default:
          return "";
      }
    }), i4 = reactive({
      desc: "",
      url: ""
    });
    return watch(() => e4.visible, (r4) => {
      r4 || setTimeout(() => {
        i4.desc = "", i4.url = "";
      }, 200);
    }), () => createVNode(h5, {
      title: a2.value,
      visible: e4.visible,
      onClose: e4.onCancel
    }, {
      default: () => {
        var r4, m5, g4, u2, c2;
        return [createVNode("div", {
          class: `${a}-form-item`
        }, [createVNode("label", {
          class: `${a}-label`,
          for: `link-desc-${l2}`
        }, [(r4 = o2.value.linkModalTips) == null ? void 0 : r4.descLabel]), createVNode("input", {
          placeholder: (m5 = o2.value.linkModalTips) == null ? void 0 : m5.descLabelPlaceHolder,
          class: `${a}-input`,
          id: `link-desc-${l2}`,
          type: "text",
          value: i4.desc,
          onChange: (v) => {
            i4.desc = v.target.value;
          },
          autocomplete: "off"
        }, null)]), createVNode("div", {
          class: `${a}-form-item`
        }, [createVNode("label", {
          class: `${a}-label`,
          for: `link-url-${l2}`
        }, [(g4 = o2.value.linkModalTips) == null ? void 0 : g4.urlLabel]), createVNode("input", {
          placeholder: (u2 = o2.value.linkModalTips) == null ? void 0 : u2.urlLabelPlaceHolder,
          class: `${a}-input`,
          id: `link-url-${l2}`,
          type: "text",
          value: i4.url,
          onChange: (v) => {
            i4.url = v.target.value;
          },
          autocomplete: "off"
        }, null)]), createVNode("div", {
          class: `${a}-form-item`
        }, [createVNode("button", {
          class: [`${a}-btn`, `${a}-btn-row`],
          type: "button",
          onClick: () => {
            e4.onOk(i4), i4.desc = "", i4.url = "";
          }
        }, [(c2 = o2.value.linkModalTips) == null ? void 0 : c2.buttonOK])])];
      }
    });
  }
});
var Nl = {
  visible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var Ol = defineComponent({
  props: Nl,
  setup(e4) {
    var v, x3, y2;
    const o2 = inject("usedLanguageText"), l2 = inject("editorId");
    let a2 = (y2 = (x3 = (v = l) == null ? void 0 : v.editorExtensions) == null ? void 0 : x3.cropper) == null ? void 0 : y2.instance;
    const i4 = ref(), r4 = ref(), m5 = ref(), g4 = reactive({
      cropperInited: false,
      imgSelected: false,
      imgSrc: "",
      // 是否全屏
      isFullscreen: false
    });
    let u2 = null;
    watch(() => e4.visible, () => {
      e4.visible && !g4.cropperInited && (a2 = a2 || window.Cropper, i4.value.onchange = () => {
        if (!a2) {
          C.emit(l2, b2, {
            name: "Cropper",
            message: "Cropper is undefined"
          });
          return;
        }
        const d3 = i4.value.files || [];
        if (g4.imgSelected = true, (d3 == null ? void 0 : d3.length) > 0) {
          const k3 = new FileReader();
          k3.onload = (b4) => {
            g4.imgSrc = b4.target.result, nextTick(() => {
              u2 = new a2(r4.value, {
                viewMode: 2,
                preview: `.${a}-clip-preview-target`
                // aspectRatio: 16 / 9,
              });
            });
          }, k3.readAsDataURL(d3[0]);
        }
      });
    }), watch(() => [g4.imgSelected], () => {
      m5.value.style = "";
    }), watch(() => g4.isFullscreen, () => {
      nextTick(() => {
        u2 == null || u2.destroy(), m5.value.style = "", r4.value && (u2 = new a2(r4.value, {
          viewMode: 2,
          preview: `.${a}-clip-preview-target`
          // aspectRatio: 16 / 9,
        }));
      });
    });
    const c2 = () => {
      u2.clear(), u2.destroy(), u2 = null, i4.value.value = "", g4.imgSelected = false;
    };
    return () => {
      var d3;
      return createVNode(h5, {
        class: `${a}-modal-clip`,
        title: (d3 = o2.value.clipModalTips) == null ? void 0 : d3.title,
        visible: e4.visible,
        onClose: e4.onCancel,
        showAdjust: true,
        isFullscreen: g4.isFullscreen,
        onAdjust: (k3) => {
          g4.isFullscreen = k3;
        },
        width: "668px",
        height: "421px"
      }, {
        default: () => {
          var k3, b4;
          return [createVNode("div", {
            class: `${a}-form-item ${a}-clip`
          }, [createVNode("div", {
            class: `${a}-clip-main`
          }, [g4.imgSelected ? createVNode("div", {
            class: `${a}-clip-cropper`
          }, [createVNode("img", {
            src: g4.imgSrc,
            ref: r4,
            style: {
              display: "none"
            },
            alt: ""
          }, null), createVNode("div", {
            class: `${a}-clip-delete`,
            onClick: c2
          }, [createVNode(C2, {
            name: "delete"
          }, null)])]) : createVNode("div", {
            class: `${a}-clip-upload`,
            onClick: () => {
              i4.value.click();
            }
          }, [createVNode(C2, {
            name: "upload"
          }, null)])]), createVNode("div", {
            class: `${a}-clip-preview`
          }, [createVNode("div", {
            class: `${a}-clip-preview-target`,
            ref: m5
          }, null)])]), createVNode("div", {
            class: `${a}-form-item`
          }, [createVNode("button", {
            class: `${a}-btn`,
            type: "button",
            onClick: () => {
              if (u2) {
                const f3 = u2.getCroppedCanvas();
                C.emit(l2, H, [O(f3.toDataURL("image/png"))], e4.onOk), c2();
              }
            }
          }, [((k3 = o2.value.clipModalTips) == null ? void 0 : k3.buttonUpload) || ((b4 = o2.value.linkModalTips) == null ? void 0 : b4.buttonOK)])]), createVNode("input", {
            ref: i4,
            accept: "image/*",
            type: "file",
            multiple: false,
            style: {
              display: "none"
            }
          }, null)];
        }
      });
    };
  }
});
var Vl = {
  type: {
    type: String,
    default: "link"
  },
  linkVisible: {
    type: Boolean,
    default: false
  },
  clipVisible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
var Fl = defineComponent({
  props: Vl,
  setup(e4) {
    return () => createVNode(Fragment, null, [createVNode(Hl, {
      type: e4.type,
      visible: e4.linkVisible,
      onOk: e4.onOk,
      onCancel: e4.onCancel
    }, null), createVNode(Ol, {
      visible: e4.clipVisible,
      onOk: e4.onOk,
      onCancel: e4.onCancel
    }, null)]);
  }
});
var Bl = defineComponent({
  name: "MDEditorToolbar",
  props: Al,
  setup(e4) {
    const o2 = inject("editorId"), l2 = inject("usedLanguageText"), a2 = inject("theme"), i4 = inject("language"), {
      fullscreenHandler: r4
    } = Ml(e4), m5 = `${o2}-toolbar-wrapper`, g4 = ref(), u2 = reactive({
      title: false,
      catalog: false,
      // 图片上传下拉
      image: false,
      // 表格预选
      table: false,
      // mermaid
      mermaid: false,
      katex: false
    }), c2 = (f3, C4) => {
      C.emit(o2, G, f3, C4);
    }, v = reactive({
      type: "link",
      linkVisible: false,
      clipVisible: false
    }), x3 = ref();
    onMounted(() => {
      C.on(o2, {
        name: T2,
        callback(f3) {
          v.type = f3, v.linkVisible = true;
        }
      });
    });
    const y2 = computed(() => {
      const f3 = e4.toolbars.filter((D2) => !e4.toolbarsExclude.includes(D2)), C4 = f3.indexOf("="), T4 = C4 === -1 ? f3 : f3.slice(0, C4 + 1), S2 = C4 === -1 ? [] : f3.slice(C4, Number.MAX_SAFE_INTEGER);
      return [T4, S2];
    }), d3 = ref(), k3 = () => {
      C.emit(o2, H, Array.from(d3.value.files || [])), d3.value.value = "";
    };
    onMounted(() => {
      d3.value.addEventListener("change", k3);
    });
    const b4 = (f3) => {
      var C4, T4, S2, D2, I3, le2, oe, M3, L4, _3, U2, O2, H2, N2, F4, K, W, ue, ae2, X, z2, ne, Z, B2, R3, re2, de, Se, Ae, Me2, Le2, De2, Ie, Ee, He, Ne2, Oe2, Ve2, Fe2, Be2, Re2, Pe, Ue2, _e2, qe2, Ge2, je2, Ke2, We2, ze2, Ze2, Xe2, Ye2, Je2, Qe2, et2, tt2, lt2, ot2, at2, nt2, rt2, it2, st, ct, ut, dt;
      if (m.includes(f3))
        switch (f3) {
          case "-":
            return createVNode(Sl, null, null);
          case "bold":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (C4 = l2.value.toolbarTips) == null ? void 0 : C4.bold,
              onClick: () => {
                c2("bold");
              }
            }, [createVNode(C2, {
              name: "bold"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(T4 = l2.value.toolbarTips) == null ? void 0 : T4.bold])]);
          case "underline":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (S2 = l2.value.toolbarTips) == null ? void 0 : S2.underline,
              onClick: () => {
                c2("underline");
              }
            }, [createVNode(C2, {
              name: "underline"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(D2 = l2.value.toolbarTips) == null ? void 0 : D2.underline])]);
          case "italic":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (I3 = l2.value.toolbarTips) == null ? void 0 : I3.italic,
              onClick: () => {
                c2("italic");
              }
            }, [createVNode(C2, {
              name: "italic"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(le2 = l2.value.toolbarTips) == null ? void 0 : le2.italic])]);
          case "strikeThrough":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (oe = l2.value.toolbarTips) == null ? void 0 : oe.strikeThrough,
              onClick: () => {
                c2("strikeThrough");
              }
            }, [createVNode(C2, {
              name: "strike-through"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(M3 = l2.value.toolbarTips) == null ? void 0 : M3.strikeThrough])]);
          case "title":
            return createVNode(F, {
              relative: `#${m5}`,
              visible: u2.title,
              onChange: (p3) => {
                u2.title = p3;
              },
              overlay: createVNode("ul", {
                class: `${a}-menu`,
                onClick: () => {
                  u2.title = false;
                }
              }, [createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("h1");
                }
              }, [(L4 = l2.value.titleItem) == null ? void 0 : L4.h1]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("h2");
                }
              }, [(_3 = l2.value.titleItem) == null ? void 0 : _3.h2]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("h3");
                }
              }, [(U2 = l2.value.titleItem) == null ? void 0 : U2.h3]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("h4");
                }
              }, [(O2 = l2.value.titleItem) == null ? void 0 : O2.h4]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("h5");
                }
              }, [(H2 = l2.value.titleItem) == null ? void 0 : H2.h5]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("h6");
                }
              }, [(N2 = l2.value.titleItem) == null ? void 0 : N2.h6])])
            }, {
              default: () => {
                var p3, E2;
                return [createVNode("div", {
                  class: `${a}-toolbar-item`,
                  title: (p3 = l2.value.toolbarTips) == null ? void 0 : p3.title
                }, [createVNode(C2, {
                  name: "title"
                }, null), e4.showToolbarName && createVNode("div", {
                  class: `${a}-toolbar-item-name`
                }, [(E2 = l2.value.toolbarTips) == null ? void 0 : E2.title])])];
              }
            });
          case "sub":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (F4 = l2.value.toolbarTips) == null ? void 0 : F4.sub,
              onClick: () => {
                c2("sub");
              }
            }, [createVNode(C2, {
              name: "sub"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(K = l2.value.toolbarTips) == null ? void 0 : K.sub])]);
          case "sup":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (W = l2.value.toolbarTips) == null ? void 0 : W.sup,
              onClick: () => {
                c2("sup");
              }
            }, [createVNode(C2, {
              name: "sup"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(ue = l2.value.toolbarTips) == null ? void 0 : ue.sup])]);
          case "quote":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (ae2 = l2.value.toolbarTips) == null ? void 0 : ae2.quote,
              onClick: () => {
                c2("quote");
              }
            }, [createVNode(C2, {
              name: "quote"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(X = l2.value.toolbarTips) == null ? void 0 : X.quote])]);
          case "unorderedList":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (z2 = l2.value.toolbarTips) == null ? void 0 : z2.unorderedList,
              onClick: () => {
                c2("unorderedList");
              }
            }, [createVNode(C2, {
              name: "unordered-list"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(ne = l2.value.toolbarTips) == null ? void 0 : ne.unorderedList])]);
          case "orderedList":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Z = l2.value.toolbarTips) == null ? void 0 : Z.orderedList,
              onClick: () => {
                c2("orderedList");
              }
            }, [createVNode(C2, {
              name: "ordered-list"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(B2 = l2.value.toolbarTips) == null ? void 0 : B2.orderedList])]);
          case "task":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (R3 = l2.value.toolbarTips) == null ? void 0 : R3.task,
              onClick: () => {
                c2("task");
              }
            }, [createVNode(C2, {
              name: "task"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(re2 = l2.value.toolbarTips) == null ? void 0 : re2.task])]);
          case "codeRow":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (de = l2.value.toolbarTips) == null ? void 0 : de.codeRow,
              onClick: () => {
                c2("codeRow");
              }
            }, [createVNode(C2, {
              name: "code-row"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Se = l2.value.toolbarTips) == null ? void 0 : Se.codeRow])]);
          case "code":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Ae = l2.value.toolbarTips) == null ? void 0 : Ae.code,
              onClick: () => {
                c2("code");
              }
            }, [createVNode(C2, {
              name: "code"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Me2 = l2.value.toolbarTips) == null ? void 0 : Me2.code])]);
          case "link":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Le2 = l2.value.toolbarTips) == null ? void 0 : Le2.link,
              onClick: () => {
                v.type = "link", v.linkVisible = true;
              }
            }, [createVNode(C2, {
              name: "link"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(De2 = l2.value.toolbarTips) == null ? void 0 : De2.link])]);
          case "image":
            return e4.noUploadImg ? createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Ie = l2.value.toolbarTips) == null ? void 0 : Ie.image,
              onClick: () => {
                v.type = "image", v.linkVisible = true;
              }
            }, [createVNode(C2, {
              name: "image"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Ee = l2.value.toolbarTips) == null ? void 0 : Ee.image])]) : createVNode(F, {
              relative: `#${m5}`,
              visible: u2.image,
              onChange: (p3) => {
                u2.image = p3;
              },
              overlay: createVNode("ul", {
                class: `${a}-menu`,
                onClick: () => {
                  u2.title = false;
                }
              }, [createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  v.type = "image", v.linkVisible = true;
                }
              }, [(He = l2.value.imgTitleItem) == null ? void 0 : He.link]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  d3.value.click();
                }
              }, [(Ne2 = l2.value.imgTitleItem) == null ? void 0 : Ne2.upload]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  v.clipVisible = true;
                }
              }, [(Oe2 = l2.value.imgTitleItem) == null ? void 0 : Oe2.clip2upload])])
            }, {
              default: () => {
                var p3, E2;
                return [createVNode("div", {
                  class: `${a}-toolbar-item`,
                  title: (p3 = l2.value.toolbarTips) == null ? void 0 : p3.image
                }, [createVNode(C2, {
                  name: "image"
                }, null), e4.showToolbarName && createVNode("div", {
                  class: `${a}-toolbar-item-name`
                }, [(E2 = l2.value.toolbarTips) == null ? void 0 : E2.image])])];
              }
            });
          case "table":
            return createVNode(F, {
              relative: `#${m5}`,
              visible: u2.table,
              onChange: (p3) => {
                u2.table = p3;
              },
              key: "bar-table",
              overlay: createVNode(Il, {
                tableShape: e4.tableShape,
                onSelected: (p3) => {
                  c2("table", {
                    selectedShape: p3
                  });
                }
              }, null)
            }, {
              default: () => {
                var p3, E2;
                return [createVNode("div", {
                  class: `${a}-toolbar-item`,
                  title: (p3 = l2.value.toolbarTips) == null ? void 0 : p3.table
                }, [createVNode(C2, {
                  name: "table"
                }, null), e4.showToolbarName && createVNode("div", {
                  class: `${a}-toolbar-item-name`
                }, [(E2 = l2.value.toolbarTips) == null ? void 0 : E2.table])])];
              }
            });
          case "revoke":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Ve2 = l2.value.toolbarTips) == null ? void 0 : Ve2.revoke,
              onClick: () => {
                C.emit(o2, F2);
              }
            }, [createVNode(C2, {
              name: "revoke"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Fe2 = l2.value.toolbarTips) == null ? void 0 : Fe2.revoke])]);
          case "next":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Be2 = l2.value.toolbarTips) == null ? void 0 : Be2.next,
              onClick: () => {
                C.emit(o2, m2);
              }
            }, [createVNode(C2, {
              name: "next"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Re2 = l2.value.toolbarTips) == null ? void 0 : Re2.next])]);
          case "save":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Pe = l2.value.toolbarTips) == null ? void 0 : Pe.save,
              onClick: () => {
                C.emit(o2, E);
              }
            }, [createVNode(C2, {
              name: "baocun"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Ue2 = l2.value.toolbarTips) == null ? void 0 : Ue2.save])]);
          case "prettier":
            return e4.noPrettier ? "" : createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (_e2 = l2.value.toolbarTips) == null ? void 0 : _e2.prettier,
              onClick: () => {
                c2("prettier");
              }
            }, [createVNode(C2, {
              name: "prettier"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(qe2 = l2.value.toolbarTips) == null ? void 0 : qe2.prettier])]);
          case "pageFullscreen":
            return !e4.setting.fullscreen && createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Ge2 = l2.value.toolbarTips) == null ? void 0 : Ge2.pageFullscreen,
              onClick: () => {
                e4.updateSetting("pageFullscreen");
              }
            }, [createVNode(C2, {
              name: e4.setting.pageFullscreen ? "suoxiao" : "fangda"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(je2 = l2.value.toolbarTips) == null ? void 0 : je2.pageFullscreen])]);
          case "fullscreen":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Ke2 = l2.value.toolbarTips) == null ? void 0 : Ke2.fullscreen,
              onClick: () => {
                r4();
              }
            }, [createVNode(C2, {
              name: e4.setting.fullscreen ? "fullscreen-exit" : "fullscreen"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(We2 = l2.value.toolbarTips) == null ? void 0 : We2.fullscreen])]);
          case "preview":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (ze2 = l2.value.toolbarTips) == null ? void 0 : ze2.preview,
              onClick: () => {
                e4.updateSetting("preview");
              }
            }, [createVNode(C2, {
              name: "preview"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Ze2 = l2.value.toolbarTips) == null ? void 0 : Ze2.preview])]);
          case "htmlPreview":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Xe2 = l2.value.toolbarTips) == null ? void 0 : Xe2.htmlPreview,
              onClick: () => {
                e4.updateSetting("htmlPreview");
              }
            }, [createVNode(C2, {
              name: "coding"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Ye2 = l2.value.toolbarTips) == null ? void 0 : Ye2.htmlPreview])]);
          case "catalog":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (Je2 = l2.value.toolbarTips) == null ? void 0 : Je2.catalog,
              onClick: () => {
                C.emit(o2, g2);
              },
              key: "bar-catalog"
            }, [createVNode(C2, {
              name: "catalog"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(Qe2 = l2.value.toolbarTips) == null ? void 0 : Qe2.catalog])]);
          case "github":
            return createVNode("div", {
              class: `${a}-toolbar-item`,
              title: (et2 = l2.value.toolbarTips) == null ? void 0 : et2.github,
              onClick: () => x("https://github.com/imzbf/md-editor-v3")
            }, [createVNode(C2, {
              name: "github"
            }, null), e4.showToolbarName && createVNode("div", {
              class: `${a}-toolbar-item-name`
            }, [(tt2 = l2.value.toolbarTips) == null ? void 0 : tt2.github])]);
          case "mermaid":
            return createVNode(F, {
              relative: `#${m5}`,
              visible: u2.mermaid,
              onChange: (p3) => {
                u2.mermaid = p3;
              },
              overlay: createVNode("ul", {
                class: `${a}-menu`,
                onClick: () => {
                  u2.mermaid = false;
                }
              }, [createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("flow");
                }
              }, [(lt2 = l2.value.mermaid) == null ? void 0 : lt2.flow]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("sequence");
                }
              }, [(ot2 = l2.value.mermaid) == null ? void 0 : ot2.sequence]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("gantt");
                }
              }, [(at2 = l2.value.mermaid) == null ? void 0 : at2.gantt]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("class");
                }
              }, [(nt2 = l2.value.mermaid) == null ? void 0 : nt2.class]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("state");
                }
              }, [(rt2 = l2.value.mermaid) == null ? void 0 : rt2.state]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("pie");
                }
              }, [(it2 = l2.value.mermaid) == null ? void 0 : it2.pie]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("relationship");
                }
              }, [(st = l2.value.mermaid) == null ? void 0 : st.relationship]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("journey");
                }
              }, [(ct = l2.value.mermaid) == null ? void 0 : ct.journey])]),
              key: "bar-mermaid"
            }, {
              default: () => {
                var p3, E2;
                return [createVNode("div", {
                  class: `${a}-toolbar-item`,
                  title: (p3 = l2.value.toolbarTips) == null ? void 0 : p3.mermaid
                }, [createVNode(C2, {
                  name: "mermaid"
                }, null), e4.showToolbarName && createVNode("div", {
                  class: `${a}-toolbar-item-name`
                }, [(E2 = l2.value.toolbarTips) == null ? void 0 : E2.mermaid])])];
              }
            });
          case "katex":
            return createVNode(F, {
              relative: `#${m5}`,
              visible: u2.katex,
              onChange: (p3) => {
                u2.katex = p3;
              },
              overlay: createVNode("ul", {
                class: `${a}-menu`,
                onClick: () => {
                  u2.katex = false;
                }
              }, [createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("katexInline");
                }
              }, [(ut = l2.value.katex) == null ? void 0 : ut.inline]), createVNode("li", {
                class: `${a}-menu-item`,
                onClick: () => {
                  c2("katexBlock");
                }
              }, [(dt = l2.value.katex) == null ? void 0 : dt.block])]),
              key: "bar-katex"
            }, {
              default: () => {
                var p3, E2;
                return [createVNode("div", {
                  class: `${a}-toolbar-item`,
                  title: (p3 = l2.value.toolbarTips) == null ? void 0 : p3.katex
                }, [createVNode(C2, {
                  name: "formula"
                }, null), e4.showToolbarName && createVNode("div", {
                  class: `${a}-toolbar-item-name`
                }, [(E2 = l2.value.toolbarTips) == null ? void 0 : E2.katex])])];
              }
            });
        }
      else if (e4.defToolbars instanceof Array) {
        const p3 = e4.defToolbars[f3];
        return p3 ? cloneVNode(p3, {
          theme: a2.value,
          language: i4.value,
          insert(ve) {
            C.emit(o2, G, "universal", {
              generate: ve
            });
          }
        }) : "";
      } else if (e4.defToolbars && e4.defToolbars.children instanceof Array) {
        const p3 = e4.defToolbars.children[f3];
        return p3 ? cloneVNode(p3, {
          theme: a2.value,
          language: i4.value,
          insert(ve) {
            C.emit(o2, G, "universal", {
              generate: ve
            });
          }
        }) : "";
      } else
        return "";
    };
    return watch(() => e4.toolbars, () => {
      nextTick(() => {
        g4.value && _(g4.value);
      });
    }, {
      immediate: true
    }), () => {
      const f3 = y2.value[0].map((T4) => b4(T4)), C4 = y2.value[1].map((T4) => b4(T4));
      return createVNode(Fragment, null, [e4.toolbars.length > 0 && createVNode("div", {
        class: `${a}-toolbar-wrapper`,
        ref: g4,
        id: m5
      }, [createVNode("div", {
        class: [`${a}-toolbar`, e4.showToolbarName && `${a}-stn`]
      }, [createVNode("div", {
        class: `${a}-toolbar-left`,
        ref: x3
      }, [f3]), createVNode("div", {
        class: `${a}-toolbar-right`
      }, [C4])])]), createVNode("input", {
        ref: d3,
        accept: "image/*",
        type: "file",
        multiple: true,
        style: {
          display: "none"
        }
      }, null), createVNode(Fl, {
        linkVisible: v.linkVisible,
        clipVisible: v.clipVisible,
        type: v.type,
        onCancel: () => {
          v.linkVisible = false, v.clipVisible = false;
        },
        onOk: (T4) => {
          T4 && c2(v.type, {
            desc: T4.desc,
            url: T4.url
          }), v.linkVisible = false, v.clipVisible = false;
        }
      }, null)]);
    };
  }
});
var Rl = (e4, o2) => {
  const l2 = M(() => {
    e4.removeEventListener("scroll", a2), e4.addEventListener("scroll", a2), o2.removeEventListener("scroll", a2), o2.addEventListener("scroll", a2);
  }, 50), a2 = (i4) => {
    const r4 = e4.clientHeight, m5 = o2.clientHeight, g4 = e4.scrollHeight, u2 = o2.scrollHeight, c2 = (g4 - r4) / (u2 - m5);
    i4.target === e4 ? (o2.removeEventListener("scroll", a2), o2.scrollTo({
      top: e4.scrollTop / c2
      // behavior: 'smooth'
    }), l2()) : (e4.removeEventListener("scroll", a2), e4.scrollTo({
      top: o2.scrollTop * c2
      // behavior: 'smooth'
    }), l2());
  };
  return [
    () => {
      l2().finally(() => {
        e4.dispatchEvent(new Event("scroll"));
      });
    },
    () => {
      e4.removeEventListener("scroll", a2), o2.removeEventListener("scroll", a2);
    }
  ];
};
var Pl = (e4, o2, l2) => {
  const { view: a2 } = l2, i4 = T(), r4 = (y2) => a2.lineBlockAt(a2.state.doc.line(y2).from).top, m5 = (y2) => a2.lineBlockAt(a2.state.doc.line(y2).from).height;
  let g4 = [];
  const u2 = () => {
    g4 = [];
    const y2 = Array.from(o2.querySelectorAll("[data-line]")).map(
      (f3) => Number(f3.dataset.line) + 1
    ), { lines: d3 } = a2.state.doc;
    let k3 = 1, b4 = y2.shift() ?? d3;
    for (let f3 = 1; f3 <= d3; f3++)
      f3 === b4 && (k3 = f3, b4 = y2.shift() || d3 + 1), g4.push({
        start: k3,
        end: b4 - 1
      });
  };
  let c2 = 0, v = 0;
  const x3 = L((y2) => {
    var C4, T4, S2, D2, I3, le2, oe;
    if (!((C4 = o2.firstElementChild) != null && C4.firstElementChild))
      return;
    const d3 = a2.lineBlockAtHeight(a2.scrollDOM.scrollTop), { number: k3 } = a2.state.doc.lineAt(d3.from);
    if (k3 > g4.length || a2.state.doc.lines < g4[g4.length - 1].end)
      return;
    let b4 = +getComputedStyle(o2).paddingTop.replace("px", "");
    const f3 = +getComputedStyle(o2).paddingBottom.replace("px", "");
    if (y2.target === e4) {
      if (v !== 0)
        return;
      c2++;
      const M3 = g4[k3 - 1];
      let L4 = r4(M3.end) + m5(M3.end), _3 = 0;
      const U2 = r4(M3.start), O2 = o2.querySelector(`[data-line="${M3.start - 1}"]`) || ((T4 = o2.firstElementChild) == null ? void 0 : T4.firstElementChild), H2 = o2.querySelector(`[data-line="${M3.end}"]`) || ((S2 = o2.lastElementChild) == null ? void 0 : S2.lastElementChild);
      let N2 = 0, F4 = 0;
      U2 === 0 ? O2 === H2 ? (b4 = 0, L4 = a2.contentDOM.offsetHeight - a2.scrollDOM.offsetHeight, _3 = a2.scrollDOM.scrollTop / L4, N2 = H2.offsetTop + H2.offsetHeight - o2.clientHeight) : (_3 = a2.scrollDOM.scrollTop / L4, N2 = H2.offsetTop) : L4 > a2.scrollDOM.scrollHeight - a2.scrollDOM.clientHeight ? (_3 = (a2.scrollDOM.scrollTop - U2) / (a2.scrollDOM.scrollHeight - a2.scrollDOM.clientHeight - U2), F4 = O2.offsetTop, N2 = o2.scrollHeight - o2.clientHeight - F4 + 10) : (_3 = (a2.scrollDOM.scrollTop - U2) / (L4 - U2), F4 = O2.offsetTop, N2 = H2.offsetTop - F4);
      const K = F4 - b4 + N2 * _3;
      i4(o2, K, () => {
        c2--;
      });
    } else {
      if (c2 !== 0)
        return;
      v++;
      const M3 = Array.from(
        o2.querySelectorAll("[data-line]")
      ), L4 = o2.scrollTop, _3 = o2.scrollHeight;
      let U2 = M3.length === 0 ? 1 : Math.ceil(
        Number(M3[M3.length - 1].dataset.line) * (L4 / _3)
      ), O2 = (D2 = o2.firstElementChild) == null ? void 0 : D2.firstElementChild;
      for (let B2 = U2; B2 >= 0; B2--) {
        const R3 = o2.querySelector(`[data-line="${B2}"]`);
        if (R3 && R3.offsetTop <= L4) {
          O2 = R3, U2 = B2;
          break;
        }
      }
      let H2 = (I3 = o2.firstElementChild) == null ? void 0 : I3.firstElementChild, N2 = (le2 = o2.firstElementChild) == null ? void 0 : le2.lastElementChild;
      for (; M3.length > 0; ) {
        const B2 = M3.indexOf(O2);
        if (B2 + 1 >= M3.length)
          break;
        const R3 = M3[B2 + 1];
        if (B2 === -1) {
          N2 = R3;
          break;
        }
        const re2 = O2.offsetTop;
        if (re2 > L4) {
          if (B2 === 0) {
            H2 = O2, N2 = R3;
            break;
          }
          O2 = M3[B2 - 1];
          continue;
        }
        const de = R3.offsetTop;
        if (re2 <= L4 && de > L4) {
          H2 = O2, N2 = R3;
          break;
        }
        O2 = R3;
      }
      const F4 = H2.offsetTop;
      let K = N2.offsetTop, W = 0;
      const { start: ue, end: ae2 } = g4[Number(H2.dataset.line || 0)], X = r4(ue);
      let z2 = r4(ae2);
      const ne = m5(ae2);
      let Z = 0;
      H2 === ((oe = o2.firstElementChild) == null ? void 0 : oe.firstElementChild) ? (H2 === N2 ? (K = N2.offsetHeight - o2.offsetHeight + b4 + f3, Z = a2.contentDOM.offsetHeight - a2.scrollDOM.offsetHeight) : Z = z2 + ne - X, W = Math.max(L4 / K, 0)) : z2 > a2.scrollDOM.scrollHeight - a2.scrollDOM.clientHeight ? (W = Math.max(
        (L4 - F4) / (o2.scrollHeight - F4 - o2.clientHeight),
        0
      ), z2 = r4(a2.state.doc.lines) + m5(a2.state.doc.lines), Z = 8 + z2 - X - e4.clientHeight) : (W = Math.max(
        (L4 - F4) / (K - F4),
        0
      ), Z = z2 + ne - X), i4(e4, X + Z * W, () => {
        v--;
      });
    }
  }, 10);
  return [
    () => {
      u2(), e4.addEventListener("scroll", x3), o2.addEventListener("scroll", x3), e4.dispatchEvent(new Event("scroll"));
    },
    () => {
      g4 = [], e4.removeEventListener("scroll", x3), o2.removeEventListener("scroll", x3);
    }
  ];
};
var Ul = (e4, o2, l2) => {
  const a2 = inject("editorId");
  let i4 = () => {
  }, r4 = () => {
  };
  const m5 = () => {
    i4();
    const g4 = document.querySelector(
      `#${a2} .cm-scroller`
    ), u2 = document.querySelector(
      `[id="${a2}-preview-wrapper"][data-show="true"]`
    ), c2 = document.querySelector(
      `[id="${a2}-html-wrapper"][data-show="true"]`
    );
    (u2 || c2) && ([r4, i4] = (u2 ? Pl : Rl)(
      g4,
      u2 || c2,
      l2.value
    )), e4.scrollAuto && r4();
  };
  watch(
    [
      o2,
      toRef(e4.setting, "preview"),
      toRef(e4.setting, "htmlPreview"),
      toRef(e4.setting, "fullscreen"),
      toRef(e4.setting, "pageFullscreen")
    ],
    () => {
      nextTick(m5);
    }
  ), watch(
    () => e4.scrollAuto,
    (g4) => {
      g4 ? r4() : i4();
    }
  ), onMounted(m5);
};
var _l = Ul;
var ql = (e4, o2, l2) => {
  var v, x3, y2, d3, k3, b4;
  let a2 = "", i4 = 0, r4 = 0, m5 = true, g4 = false;
  const u2 = o2.getSelectedText(), c2 = (v = l.editorConfig) == null ? void 0 : v.mermaidTemplate;
  if (/^h[1-6]{1}$/.test(e4)) {
    const f3 = e4.replace(/^h(\d)/, (C4, T4) => new Array(Number(T4)).fill("#", 0, T4).join(""));
    a2 = `${f3} ${u2}`, i4 = f3.length + 1;
  } else if (e4 === "prettier") {
    const f3 = window.prettier || ((y2 = (x3 = l.editorExtensions) == null ? void 0 : x3.prettier) == null ? void 0 : y2.prettierInstance), C4 = [
      ((d3 = window.prettierPlugins) == null ? void 0 : d3.markdown) || ((b4 = (k3 = l.editorExtensions) == null ? void 0 : k3.prettier) == null ? void 0 : b4.parserMarkdownInstance)
    ];
    !f3 || C4[0] === void 0 ? (C.emit(l2.editorId, b2, {
      name: "prettier",
      message: "prettier is undefined"
    }), a2 = o2.getValue()) : a2 = f3.format(o2.getValue(), {
      parser: "markdown",
      plugins: C4
    }), m5 = false, g4 = true;
  } else
    switch (e4) {
      case "bold": {
        a2 = `**${u2}**`, i4 = 2, r4 = -2;
        break;
      }
      case "underline": {
        a2 = `<u>${u2}</u>`, i4 = 3, r4 = -4;
        break;
      }
      case "italic": {
        a2 = `*${u2}*`, i4 = 1, r4 = -1;
        break;
      }
      case "strikeThrough": {
        a2 = `~~${u2}~~`, i4 = 2, r4 = -2;
        break;
      }
      case "sub": {
        a2 = `<sub>${u2}</sub>`, i4 = 5, r4 = -6;
        break;
      }
      case "sup": {
        a2 = `<sup>${u2}</sup>`, i4 = 5, r4 = -6;
        break;
      }
      case "codeRow": {
        a2 = "`" + u2 + "`", i4 = 1, r4 = -1;
        break;
      }
      case "quote": {
        a2 = `> ${u2}`, i4 = 2;
        break;
      }
      case "orderedList": {
        a2 = `1. ${u2}`, i4 = 3;
        break;
      }
      case "unorderedList": {
        a2 = `- ${u2}`, i4 = 2;
        break;
      }
      case "task": {
        a2 = `- [ ] ${u2}`, i4 = 6;
        break;
      }
      case "code": {
        const f3 = l2.text || u2 || "", C4 = l2.mode || "language";
        a2 = `\`\`\`${C4}
${f3}
\`\`\`
`, i4 = 3, r4 = 3 + C4.length - a2.length;
        break;
      }
      case "table": {
        a2 = "|";
        const { selectedShape: f3 = { x: 1, y: 1 } } = l2, { x: C4, y: T4 } = f3;
        for (let S2 = 0; S2 <= T4; S2++)
          a2 += " col |";
        a2 += `
|`;
        for (let S2 = 0; S2 <= T4; S2++)
          a2 += " - |";
        for (let S2 = 0; S2 <= C4; S2++) {
          a2 += `
|`;
          for (let D2 = 0; D2 <= T4; D2++)
            a2 += " content |";
        }
        i4 = 2, r4 = 5 - a2.length;
        break;
      }
      case "link": {
        const { desc: f3, url: C4 } = l2;
        a2 = `[${f3}](${C4})`, m5 = false;
        break;
      }
      case "image": {
        const { desc: f3, url: C4, urls: T4 } = l2;
        T4 instanceof Array ? a2 = T4.reduce((S2, D2) => S2 + `![${f3}](${D2})
`, "") : a2 = `![${f3}](${C4})
`, m5 = false;
        break;
      }
      case "flow": {
        a2 = `\`\`\`mermaid
${(c2 == null ? void 0 : c2.flow) || `flowchart TD 
  Start --> Stop`}
\`\`\`
`, i4 = 3, r4 = 10 - a2.length;
        break;
      }
      case "sequence": {
        a2 = `\`\`\`mermaid
${(c2 == null ? void 0 : c2.sequence) || `sequenceDiagram
  A->>B: hello!
  B-->>A: hi!
  A-)B: bye!`}
\`\`\`
`, i4 = 3, r4 = 10 - a2.length;
        break;
      }
      case "gantt": {
        a2 = `\`\`\`mermaid
${(c2 == null ? void 0 : c2.gantt) || `gantt
title A Gantt Diagram
dateFormat  YYYY-MM-DD
section Section
A task  :a1, 2014-01-01, 30d
Another task  :after a1, 20d`}
\`\`\`
`, i4 = 3, r4 = 10 - a2.length;
        break;
      }
      case "class": {
        a2 = `\`\`\`mermaid
${(c2 == null ? void 0 : c2.class) || `classDiagram
  class Animal
  Vehicle <|-- Car`}
\`\`\`
`, i4 = 3, r4 = 10 - a2.length;
        break;
      }
      case "state": {
        a2 = `\`\`\`mermaid
${(c2 == null ? void 0 : c2.state) || `stateDiagram-v2
  s1 --> s2`}
\`\`\`
`, i4 = 3, r4 = 10 - a2.length;
        break;
      }
      case "pie": {
        a2 = `\`\`\`mermaid
${(c2 == null ? void 0 : c2.pie) || `pie title Pets adopted by volunteers
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15`}
\`\`\`
`, i4 = 3, r4 = 10 - a2.length;
        break;
      }
      case "relationship": {
        a2 = `\`\`\`mermaid
${(c2 == null ? void 0 : c2.relationship) || `erDiagram
  CAR ||--o{ NAMED-DRIVER : allows
  PERSON ||--o{ NAMED-DRIVER : is`}
\`\`\`
`, i4 = 3, r4 = 10 - a2.length;
        break;
      }
      case "journey": {
        a2 = `\`\`\`mermaid
${(c2 == null ? void 0 : c2.journey) || `journey
  title My working day
  section Go to work
    Make tea: 5: Me
    Go upstairs: 3: Me
    Do work: 1: Me, Cat
  section Go home
    Go downstairs: 5: Me
    Sit down: 5: Me`}
\`\`\`
`, i4 = 3, r4 = 10 - a2.length;
        break;
      }
      case "katexInline": {
        a2 = "$$", i4 = 1, r4 = -1;
        break;
      }
      case "katexBlock": {
        a2 = `$$

$$
`, i4 = 3, r4 = -4;
        break;
      }
      case "universal": {
        const { generate: f3 } = l2, C4 = f3(u2);
        a2 = C4.targetValue, m5 = C4.select, i4 = C4.deviationStart, r4 = C4.deviationEnd;
      }
    }
  return {
    text: a2,
    options: {
      // 是否选中
      select: m5,
      // 选中时，开始位置的偏移量
      deviationStart: i4,
      // 结束的偏移量
      deviationEnd: r4,
      // 是否整个替换
      replaceAll: g4
    }
  };
};
var Gl = "#e5c07b";
var ft = "var(--md-color)";
var jl = "#56b6c2";
var Kl = "#ffffff";
var se = "var(--md-color)";
var bt2 = "#e5c07b";
var Wl = "#e5c07b";
var zl = "var(--md-color)";
var ht = "#d19a66";
var Zl = "#c678dd";
var Xl = "#21252b";
var Yl = "#2c313a";
var vt = "var(--md-bk-color)";
var Ce = "var(--md-bk-color)";
var Jl = "#ceedfa33";
var kt2 = "#528bff";
var Ql = EditorView.theme(
  {
    "&": {
      color: se,
      backgroundColor: vt
    },
    ".cm-content": {
      caretColor: kt2
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: kt2 },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: Jl },
    ".cm-panels": { backgroundColor: Xl, color: se },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: vt,
      color: se,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: Yl
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: Ce
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: Ce,
      borderBottomColor: Ce
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: se
      }
    }
  },
  { dark: true }
);
var eo = HighlightStyle.define([
  { tag: tags.keyword, color: Zl },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: ft },
  { tag: [tags.function(tags.variableName), tags.labelName], color: Wl },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: ht },
  { tag: [tags.definition(tags.name), tags.separator], color: se },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: Gl
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: jl
  },
  { tag: [tags.meta, tags.comment], color: bt2 },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: bt2, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: ft },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: ht },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: zl },
  { tag: tags.invalid, color: Kl }
]);
var Ct2 = [
  Ql,
  syntaxHighlighting(eo)
];
var to = "#e5c07b";
var pt = "#3f4a54";
var lo = "#56b6c2";
var oo = "#fff";
var ce2 = "#3f4a54";
var $t2 = "#2d8cf0";
var ao = "#2d8cf0";
var no = "#3f4a54";
var yt = "#d19a66";
var ro = "#c678dd";
var io = "#21252b";
var so = "#ceedfa33";
var Tt2 = "var(--md-bk-color)";
var pe = "var(--md-bk-color)";
var co = "#bad5fa";
var wt2 = "#3f4a54";
var uo = EditorView.theme(
  {
    "&": {
      color: ce2,
      backgroundColor: Tt2
    },
    ".cm-content": {
      caretColor: wt2
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: wt2 },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: co },
    ".cm-panels": { backgroundColor: io, color: ce2 },
    ".cm-panels.cm-panels-top": { borderBottom: "2px solid black" },
    ".cm-panels.cm-panels-bottom": { borderTop: "2px solid black" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: Tt2,
      color: ce2,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: so
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: pe
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: pe,
      borderBottomColor: pe
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: ce2
      }
    }
  }
  // { dark: true }
);
var mo = HighlightStyle.define([
  { tag: tags.keyword, color: ro },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: pt },
  { tag: [tags.function(tags.variableName), tags.labelName], color: ao },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: yt },
  { tag: [tags.definition(tags.name), tags.separator], color: ce2 },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: to
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: lo
  },
  { tag: [tags.meta, tags.comment], color: $t2 },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: $t2, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: pt },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: yt },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: no },
  { tag: tags.invalid, color: oo }
]);
var xt = [
  uo,
  syntaxHighlighting(mo)
];
var fe = (e4, o2, l2, a2, i4) => (r4, m5, g4, u2) => {
  const c2 = `${e4}${o2}`.slice(u2 - g4);
  r4.dispatch(r4.state.replaceSelection(`${c2}${l2}${a2}`));
  const v = g4 + m5.label.length + (i4 === "title" ? l2.length : 0);
  r4.dispatch({
    selection: EditorSelection.create(
      [
        EditorSelection.range(
          g4 + m5.label.length + (i4 === "title" ? 1 : -o2.length),
          v
        ),
        EditorSelection.cursor(v)
      ],
      1
    )
  }), r4.focus();
};
var St2 = (e4) => (o2, l2, a2, i4) => {
  const r4 = e4.slice(i4 - a2);
  o2.dispatch(o2.state.replaceSelection(`${r4} `));
};
var go = (e4) => {
  const o2 = (l2) => {
    const a2 = l2.matchBefore(
      /^#+|^-\s*\[*\s*\]*|`+|\[|!\[*|^\|\s?\|?|^\$\$?|!+\s*\w*/
    );
    return a2 === null || a2.from == a2.to && l2.explicit ? null : {
      from: a2.from,
      options: [
        // 标题
        ...["h1", "h2", "h3", "h4", "h5", "h6"].map((i4, r4) => {
          const m5 = new Array(r4 + 1).fill("#").join("");
          return {
            label: m5,
            type: "text",
            apply: St2(m5)
          };
        }),
        // 任务列表
        ...["unchecked", "checked"].map((i4) => {
          const r4 = i4 === "checked" ? "- [x]" : "- [ ]";
          return {
            label: r4,
            type: "text",
            apply: St2(r4)
          };
        }),
        // 代码
        ...[
          ["`", ""],
          ["```", "language"],
          ["```mermaid\n", ""]
        ].map((i4) => ({
          label: `${i4[0]}${i4[1]}`,
          type: "text",
          apply: fe(i4[0], i4[1], "", i4[0] === "`" ? "`" : "\n```", "type")
        })),
        // 链接
        {
          label: "[]()",
          type: "text"
        },
        {
          label: "![]()",
          type: "text"
        },
        // 表格
        {
          label: "| |",
          type: "text",
          detail: "table",
          apply: `| col | col | col |
| - | - | - |
| content | content | content |
| content | content | content |`
        },
        // 公式
        {
          label: "$",
          type: "text",
          apply: fe("$", "", "", "$", "type")
        },
        {
          label: "$$",
          type: "text",
          apply: fe("$$", "", `
`, `
$$`, "title")
        },
        // 那啥？
        ...[
          "note",
          "abstract",
          "info",
          "tip",
          "success",
          "question",
          "warning",
          "failure",
          "danger",
          "bug",
          "example",
          "quote",
          "hint",
          "caution",
          "error",
          "attention"
        ].map((i4) => ({
          label: `!!! ${i4}`,
          type: "text",
          apply: fe("!!!", ` ${i4}`, " Title", `

!!!`, "title")
        }))
      ]
    };
  };
  return autocompletion({
    override: e4 ? [o2, ...e4] : [o2]
  });
};
var At = go;
var Q = (e4) => {
  const o2 = new Compartment();
  return (a2) => (o2.get(e4.state) ? e4.dispatch({ effects: o2.reconfigure(a2) }) : e4.dispatch({
    effects: StateEffect.appendConfig.of(o2.of(a2))
  }), true);
};
var fo = class {
  constructor(o2) {
    q(this, "view");
    q(this, "maxLength", Number.MAX_SAFE_INTEGER);
    q(this, "toggleTabSize");
    q(this, "togglePlaceholder");
    q(this, "setExtensions");
    q(this, "toggleDisabled");
    q(this, "toggleReadOnly");
    q(this, "toggleMaxlength");
    this.view = o2, this.toggleTabSize = Q(this.view), this.togglePlaceholder = Q(this.view), this.setExtensions = Q(this.view), this.toggleDisabled = Q(this.view), this.toggleReadOnly = Q(this.view), this.toggleMaxlength = Q(this.view);
  }
  getValue() {
    return this.view.state.doc.toString();
  }
  /**
   * 设置内容
   *
   * @param insert 待插入内容
   * @param from 插入开始位置
   * @param to 插入结束位置
   */
  setValue(o2, l2 = 0, a2 = this.view.state.doc.length) {
    this.view.dispatch({
      changes: {
        from: l2,
        to: a2,
        insert: o2
      }
    });
  }
  /**
   * 获取选中的文本
   */
  getSelectedText() {
    const { from: o2, to: l2 } = this.view.state.selection.main;
    return this.view.state.sliceDoc(o2, l2);
  }
  /**
   * 使用新的内容替换选中的内容
   *
   * @param text 待替换内容
   * @param options 替换后是否选中
   */
  replaceSelectedText(o2, l2 = {
    // 是否选中
    select: true,
    // 选中时，开始位置的偏移量
    deviationStart: 0,
    // 结束的偏移量
    deviationEnd: 0,
    // 直接替换所有文本
    replaceAll: false
  }, a2) {
    try {
      if (l2.replaceAll) {
        if (this.setValue(o2), o2.length > this.maxLength)
          throw new Error("The input text is too long");
        return;
      }
      if (this.view.state.doc.length - this.getSelectedText().length + o2.length > this.maxLength)
        throw new Error("The input text is too long");
      const { from: i4 } = this.view.state.selection.main;
      if (this.view.dispatch(this.view.state.replaceSelection(o2)), l2.select) {
        const r4 = i4 + o2.length + l2.deviationEnd;
        this.view.dispatch({
          selection: EditorSelection.create(
            [
              EditorSelection.range(i4 + l2.deviationStart, r4),
              EditorSelection.cursor(r4)
            ],
            1
          )
        });
      }
      this.view.focus();
    } catch (i4) {
      if (i4.message === "The input text is too long")
        C.emit(a2, b2, {
          name: "overlength",
          message: i4.message,
          data: o2
        });
      else
        throw i4;
    }
  }
  /**
   * 设置tabSize
   *
   * @param tabSize 需要切换的大小
   */
  setTabSize(o2) {
    this.toggleTabSize([
      EditorState.tabSize.of(o2),
      indentUnit.of(" ".repeat(o2))
    ]);
  }
  /**
   * 设置placeholder
   *
   * @param t 目标内容
   */
  setPlaceholder(o2) {
    this.togglePlaceholder(placeholder(o2));
  }
  focus(o2) {
    if (this.view.focus(), !o2)
      return;
    let l2 = 0, a2 = 0, i4 = 0;
    switch (o2) {
      case "start":
        break;
      case "end": {
        l2 = a2 = i4 = this.getValue().length;
        break;
      }
      default:
        l2 = o2.rangeAnchor || o2.cursorPos, a2 = o2.rangeHead || o2.cursorPos, i4 = o2.cursorPos;
    }
    this.view.dispatch({
      scrollIntoView: true,
      selection: EditorSelection.create(
        [EditorSelection.range(l2, a2), EditorSelection.cursor(i4)],
        1
      )
    });
  }
  setDisabled(o2) {
    this.toggleDisabled([EditorView.editable.of(!o2)]);
  }
  setReadOnly(o2) {
    this.toggleReadOnly([EditorState.readOnly.of(o2)]);
  }
  setMaxLength(o2) {
    this.maxLength = o2, this.toggleMaxlength([
      EditorState.changeFilter.of((l2) => l2.newDoc.length <= o2)
    ]);
  }
};
var bo = (e4) => {
  const o2 = inject("editorId");
  return (a2) => {
    if (!a2.clipboardData)
      return;
    if (a2.clipboardData.files.length > 0) {
      const { files: r4 } = a2.clipboardData;
      C.emit(
        o2,
        H,
        Array.from(r4).filter((m5) => /image\/.*/.test(m5.type))
      ), a2.preventDefault();
      return;
    }
    if (e4.autoDetectCode && a2.clipboardData.types.includes("vscode-editor-data")) {
      const r4 = JSON.parse(a2.clipboardData.getData("vscode-editor-data"));
      C.emit(o2, G, "code", {
        mode: r4.mode,
        text: a2.clipboardData.getData("text/plain")
      }), a2.preventDefault();
      return;
    }
    const i4 = a2.clipboardData.getData("text/plain");
    e4.maxlength && i4.length + e4.modelValue.length > e4.maxlength && C.emit(o2, b2, {
      name: "overlength",
      message: "The input text is too long",
      data: i4
    });
  };
};
var ho = bo;
var vo = (e4) => {
  const o2 = inject("editorId");
  onMounted(() => {
    C.on(o2, {
      name: f2,
      callback(l2) {
        var a2;
        (a2 = e4.value) == null || a2.focus(l2);
      }
    });
  });
};
var ko = vo;
var Co = (e4, o2) => [
  {
    key: "Ctrl-b",
    mac: "Cmd-b",
    run: () => (C.emit(e4, G, "bold"), true)
  },
  {
    key: "Ctrl-d",
    mac: "Cmd-d",
    run: deleteLine,
    preventDefault: true
  },
  {
    key: "Ctrl-s",
    mac: "Cmd-s",
    run: (D2) => (C.emit(e4, E, D2.state.doc.toString()), true),
    shift: () => (C.emit(e4, G, "strikeThrough"), true)
  },
  {
    key: "Ctrl-u",
    mac: "Cmd-u",
    run: () => (C.emit(e4, G, "underline"), true),
    shift: () => (C.emit(e4, G, "unorderedList"), true)
  },
  {
    key: "Ctrl-i",
    mac: "Cmd-i",
    run: () => (C.emit(e4, G, "italic"), true),
    shift: () => (C.emit(e4, T2, "image"), true)
  },
  {
    key: "Ctrl-1",
    mac: "Cmd-1",
    run: () => (C.emit(e4, G, "h1"), true)
  },
  {
    key: "Ctrl-2",
    mac: "Cmd-2",
    run: () => (C.emit(e4, G, "h2"), true)
  },
  {
    key: "Ctrl-3",
    mac: "Cmd-3",
    run: () => (C.emit(e4, G, "h3"), true)
  },
  {
    key: "Ctrl-4",
    mac: "Cmd-4",
    run: () => (C.emit(e4, G, "h4"), true)
  },
  {
    key: "Ctrl-5",
    mac: "Cmd-5",
    run: () => (C.emit(e4, G, "h5"), true)
  },
  {
    key: "Ctrl-6",
    mac: "Cmd-6",
    run: () => (C.emit(e4, G, "h6"), true)
  },
  {
    key: "Ctrl-ArrowUp",
    mac: "Cmd-ArrowUp",
    run: () => (C.emit(e4, G, "sup"), true)
  },
  {
    key: "Ctrl-ArrowDown",
    mac: "Cmd-ArrowDown",
    run: () => (C.emit(e4, G, "sub"), true)
  },
  {
    key: "Ctrl-o",
    mac: "Cmd-o",
    run: () => (C.emit(e4, G, "orderedList"), true)
  },
  {
    key: "Ctrl-c",
    mac: "Cmd-c",
    shift: () => (C.emit(e4, G, "code"), true),
    any(D2, I3) {
      return (I3.ctrlKey || I3.metaKey) && I3.altKey && I3.code === "KeyC" ? (C.emit(e4, G, "codeRow"), true) : false;
    }
  },
  {
    key: "Ctrl-l",
    mac: "Cmd-l",
    run: () => (C.emit(e4, T2, "link"), true)
  },
  {
    key: "Ctrl-f",
    mac: "Cmd-f",
    shift: () => o2.noPrettier ? false : (C.emit(e4, G, "prettier"), true)
  },
  {
    any: (D2, I3) => (I3.ctrlKey || I3.metaKey) && I3.altKey && I3.shiftKey && I3.code === "KeyT" ? (C.emit(e4, G, "table"), true) : false
  }
];
var po = Co;
var $o = (e4) => {
  const o2 = inject("tabWidth"), l2 = inject("editorId"), a2 = inject("theme"), i4 = ref(), r4 = shallowRef(), m5 = new Compartment(), g4 = new Compartment(), u2 = new Compartment(), c2 = po(l2, e4), v = ho(e4), x3 = [
    keymap.of([...c2, indentWithTab]),
    minimalSetup,
    m5.of(markdown({ codeLanguages: languages })),
    // 横向换行
    EditorView.lineWrapping,
    EditorView.updateListener.of((d3) => {
      d3.docChanged && e4.onChange(d3.state.doc.toString());
    }),
    EditorView.domEventHandlers({
      paste: v,
      blur: e4.onBlur,
      focus: e4.onFocus,
      drop: e4.onDrop,
      input: (d3) => {
        e4.onInput && e4.onInput(d3);
        const { data: k3 } = d3;
        e4.maxlength && e4.modelValue.length + k3.length > e4.maxlength && C.emit(l2, b2, {
          name: "overlength",
          message: "The input text is too long",
          data: k3
        });
      }
    })
  ], y2 = () => {
    const d3 = [
      ...x3,
      g4.of(a2.value === "light" ? xt : Ct2),
      u2.of(At(e4.completions))
    ];
    return l.codeMirrorExtensions(a2.value, d3, [
      ...c2
    ]);
  };
  return onMounted(() => {
    const d3 = new EditorView({
      doc: e4.modelValue,
      parent: i4.value,
      extensions: [y2()]
    }), k3 = new fo(d3);
    r4.value = k3, setTimeout(() => {
      k3.setTabSize(o2), k3.setDisabled(e4.disabled), k3.setReadOnly(e4.readonly), e4.placeholder && k3.setPlaceholder(e4.placeholder), typeof e4.maxlength == "number" && k3.setMaxLength(e4.maxlength), e4.autofocus && d3.focus();
    }, 0), C.on(l2, {
      name: F2,
      callback() {
        undo(d3);
      }
    }), C.on(l2, {
      name: m2,
      callback() {
        redo(d3);
      }
    }), C.on(l2, {
      name: G,
      callback(b4, f3 = {}) {
        var S2;
        const { text: C4, options: T4 } = ql(b4, r4.value, f3);
        (S2 = r4.value) == null || S2.replaceSelectedText(C4, T4, l2);
      }
    });
  }), watch(
    a2,
    () => {
      var d3;
      (d3 = r4.value) == null || d3.view.dispatch({
        effects: g4.reconfigure(a2.value === "light" ? xt : Ct2)
      });
    },
    {
      deep: true
    }
  ), watch(
    () => e4.completions,
    () => {
      var d3;
      (d3 = r4.value) == null || d3.view.dispatch({
        effects: u2.reconfigure(At(e4.completions))
      });
    },
    {
      deep: true
    }
  ), watch(
    () => e4.modelValue,
    () => {
      var d3, k3;
      ((d3 = r4.value) == null ? void 0 : d3.getValue()) !== e4.modelValue && ((k3 = r4.value) == null || k3.setValue(e4.modelValue));
    }
  ), watch(
    () => e4.placeholder,
    () => {
      var d3;
      (d3 = r4.value) == null || d3.setPlaceholder(e4.placeholder);
    }
  ), watch(
    () => e4.disabled,
    () => {
      var d3;
      (d3 = r4.value) == null || d3.setDisabled(e4.disabled);
    }
  ), watch(
    () => e4.readonly,
    () => {
      var d3;
      (d3 = r4.value) == null || d3.setDisabled(e4.readonly);
    }
  ), watch(
    () => e4.maxlength,
    () => {
      var d3;
      e4.maxlength && ((d3 = r4.value) == null || d3.setMaxLength(e4.maxlength));
    }
  ), ko(r4), {
    inputWrapperRef: i4,
    codeMirrorUt: r4
  };
};
var yo = $o;
var To = defineComponent({
  name: "MDEditorContent",
  props: bt,
  setup(e4) {
    const o2 = inject("editorId"), l2 = ref(""), {
      inputWrapperRef: a2,
      codeMirrorUt: i4
    } = yo(e4);
    return _l(e4, l2, i4), () => createVNode("div", {
      class: `${a}-content`
    }, [createVNode("div", {
      class: `${a}-input-wrapper`,
      ref: a2
    }, null), createVNode(at, {
      modelValue: e4.modelValue,
      setting: e4.setting,
      onHtmlChanged: (r4) => {
        l2.value = r4, e4.onHtmlChanged(r4);
      },
      onGetCatalog: e4.onGetCatalog,
      mdHeadingId: e4.mdHeadingId,
      noMermaid: e4.noMermaid,
      sanitize: e4.sanitize,
      noKatex: e4.noKatex,
      formatCopiedText: e4.formatCopiedText,
      noHighlight: e4.noHighlight,
      noImgZoomIn: e4.noImgZoomIn
    }, null), e4.catalogVisible && createVNode(k2, {
      theme: e4.theme,
      class: `${a}-catalog-editor`,
      editorId: o2,
      mdHeadingId: e4.mdHeadingId,
      key: "internal-catalog"
    }, null)]);
  }
});
var wo = defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  setup(e4) {
    const o2 = inject("usedLanguageText");
    return () => {
      var l2, a2;
      return createVNode("div", {
        class: `${a}-footer-item`
      }, [createVNode("label", {
        class: `${a}-footer-label`
      }, [`${(l2 = o2.value.footer) == null ? void 0 : l2.markdownTotal}:`]), createVNode("span", null, [((a2 = e4.modelValue) == null ? void 0 : a2.length) || 0])]);
    };
  }
});
var xo = {
  checked: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function,
    default: () => {
    }
  }
};
var So = defineComponent({
  props: xo,
  setup(e4) {
    return () => createVNode("div", {
      class: [`${a}-checkbox`, e4.checked && `${a}-checkbox-checked`],
      onClick: () => {
        e4.onChange(!e4.checked);
      }
    }, null);
  }
});
var Ao = {
  scrollAuto: {
    type: Boolean
  },
  onScrollAutoChange: {
    type: Function,
    default: () => {
    }
  }
};
var Mo = defineComponent({
  props: Ao,
  setup(e4) {
    const o2 = inject("usedLanguageText");
    return () => {
      var l2;
      return createVNode("div", {
        class: `${a}-footer-item`
      }, [createVNode("label", {
        class: `${a}-footer-label`,
        onClick: () => {
          e4.onScrollAutoChange(!e4.scrollAuto);
        }
      }, [(l2 = o2.value.footer) == null ? void 0 : l2.scrollAuto]), createVNode(So, {
        checked: e4.scrollAuto,
        onChange: e4.onScrollAutoChange
      }, null)]);
    };
  }
});
var Lo = {
  modelValue: {
    type: String,
    default: ""
  },
  footers: {
    type: Array,
    default: []
  },
  scrollAuto: {
    type: Boolean
  },
  onScrollAutoChange: {
    type: Function,
    default: () => {
    }
  },
  defFooters: {
    type: Object
  }
};
var Do = defineComponent({
  name: "MDEditorFooter",
  props: Lo,
  setup(e4) {
    const o2 = computed(() => {
      const a2 = e4.footers.indexOf("="), i4 = a2 === -1 ? e4.footers : e4.footers.slice(0, a2), r4 = a2 === -1 ? [] : e4.footers.slice(a2, Number.MAX_SAFE_INTEGER);
      return [i4, r4];
    }), l2 = (a2) => {
      if (p.includes(a2))
        switch (a2) {
          case "markdownTotal":
            return createVNode(wo, {
              modelValue: e4.modelValue
            }, null);
          case "scrollSwitch":
            return createVNode(Mo, {
              scrollAuto: e4.scrollAuto,
              onScrollAutoChange: e4.onScrollAutoChange
            }, null);
        }
      else
        return e4.defFooters instanceof Array ? e4.defFooters[a2] || "" : e4.defFooters && e4.defFooters.children instanceof Array && e4.defFooters.children[a2] || "";
    };
    return () => {
      const a2 = o2.value[0].map((r4) => l2(r4)), i4 = o2.value[1].map((r4) => l2(r4));
      return createVNode("div", {
        class: `${a}-footer`
      }, [createVNode("div", {
        class: `${a}-footer-left`
      }, [a2]), createVNode("div", {
        class: `${a}-footer-right`
      }, [i4])]);
    };
  }
});
var Io = defineComponent({
  name: "MdEditorV3",
  props: Pt,
  emits: Tt,
  setup(e4, o2) {
    const {
      editorId: l2,
      noKatex: a2,
      noMermaid: i4,
      noPrettier: r4,
      noUploadImg: m5,
      noHighlight: g4
    } = e4, u2 = reactive({
      scrollAuto: e4.scrollAuto
    });
    wt(e4, o2), kt(e4), $t(e4), Ct(e4, o2);
    const [c2, v] = It(e4, o2), x3 = St(e4);
    return onBeforeUnmount(() => {
      C.clear(l2);
    }), Et(e4, o2, x3, c2, v), () => {
      var k3;
      const y2 = s({
        props: e4,
        ctx: o2
      }, "defToolbars"), d3 = s({
        props: e4,
        ctx: o2
      }, "defFooters");
      return createVNode("div", {
        id: l2,
        class: [a, e4.class, e4.theme === "dark" && `${a}-dark`, c2.fullscreen || c2.pageFullscreen ? `${a}-fullscreen` : ""],
        style: e4.style
      }, [createVNode(Bl, {
        noPrettier: r4,
        toolbars: e4.toolbars,
        toolbarsExclude: e4.toolbarsExclude,
        setting: c2,
        updateSetting: v,
        tableShape: e4.tableShape,
        defToolbars: y2,
        noUploadImg: m5,
        showToolbarName: e4.showToolbarName
      }, null), createVNode(To, {
        modelValue: e4.modelValue,
        setting: c2,
        mdHeadingId: e4.mdHeadingId,
        noMermaid: i4,
        noPrettier: r4,
        sanitize: e4.sanitize,
        placeholder: e4.placeholder,
        noKatex: a2,
        scrollAuto: u2.scrollAuto,
        formatCopiedText: e4.formatCopiedText,
        autofocus: e4.autoFocus,
        disabled: e4.disabled,
        readonly: e4.readOnly,
        maxlength: e4.maxLength,
        autoDetectCode: e4.autoDetectCode,
        noHighlight: g4,
        onChange: (b4) => {
          e4.onChange ? e4.onChange(b4) : (o2.emit("update:modelValue", b4), o2.emit("onChange", b4));
        },
        onHtmlChanged: (b4) => {
          e4.onHtmlChanged ? e4.onHtmlChanged(b4) : o2.emit("onHtmlChanged", b4);
        },
        onGetCatalog: (b4) => {
          e4.onGetCatalog ? e4.onGetCatalog(b4) : o2.emit("onGetCatalog", b4);
        },
        onBlur: (b4) => {
          e4.onBlur ? e4.onBlur(b4) : o2.emit("onBlur", b4);
        },
        onFocus: (b4) => {
          e4.onFocus ? e4.onFocus(b4) : o2.emit("onFocus", b4);
        },
        onInput: (b4) => {
          e4.onInput ? e4.onInput(b4) : o2.emit("onInput", b4);
        },
        completions: e4.completions,
        catalogVisible: x3.value,
        theme: e4.theme,
        noImgZoomIn: e4.noImgZoomIn,
        onDrop: (b4) => {
          e4.onDrop ? e4.onDrop(b4) : o2.emit("onDrop", b4);
        }
      }, null), ((k3 = e4.footers) == null ? void 0 : k3.length) > 0 && createVNode(Do, {
        modelValue: e4.modelValue,
        footers: e4.footers,
        defFooters: d3,
        scrollAuto: u2.scrollAuto,
        onScrollAutoChange: (b4) => u2.scrollAuto = b4
      }, null)]);
    };
  }
});
var $e = Io;
$e.install = (e4) => (e4.component($e.name, $e), e4.use(e3).use(y).use(i3).use(k2).use(x2), e4);

// node_modules/md-editor-v3/lib/es/index.mjs
init_vue_runtime_esm_bundler();
var import_copy_to_clipboard3 = __toESM(require_copy_to_clipboard(), 1);
var import_markdown_it3 = __toESM(require_markdown_it(), 1);
var import_markdown_it_task_lists3 = __toESM(require_markdown_it_task_lists(), 1);
export {
  y as DropdownToolbar,
  k2 as MdCatalog,
  $e as MdEditor,
  h5 as MdModal,
  x2 as MdPreview,
  i3 as ModalToolbar,
  e3 as NormalToolbar,
  j as config
};
/*! Bundled license information:

medium-zoom/dist/medium-zoom.esm.js:
  (*! medium-zoom 1.0.8 | MIT License | https://github.com/francoischalifour/medium-zoom *)
*/
//# sourceMappingURL=md-editor-v3.js.map
