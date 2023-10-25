var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { getCurrentInstance, defineComponent, inject, useSlots, useAttrs, ref, watchEffect, watch, resolveComponent, openBlock, createElementBlock, createVNode, normalizeProps, guardReactiveProps, unref, withCtx, mergeProps, createSlots, Fragment, renderList, renderSlot, createTextVNode, toDisplayString, createBlock, reactive, computed, provide, nextTick, createCommentVNode, resolveDynamicComponent, createElementVNode, normalizeClass, normalizeStyle, onMounted, onUnmounted, onBeforeUnmount, onErrorCaptured, h, resolveDirective, withDirectives, isRef, withModifiers, vShow, pushScopeId, popScopeId, defineAsyncComponent, Suspense } from "vue";
import axios from "axios";
import pkg from "file-saver";
import * as XLSX from "xlsx";
import { ElMessage, ElForm, ElSpace, ElButton, ElLoading, ElMenu, ElMenuItem, ElSubMenu, ElNotification, ElContainer, ElMessageBox } from "element-plus";
import { useVModel } from "@vueuse/core";
import lodash from "lodash";
import draggable from "vuedraggable";
import Sortable from "sortablejs";
import { MdPreview, MdEditor } from "md-editor-v3";
import { defineStore } from "pinia";
import ace from "ace-builds";
import VueJsonViewer from "vue-json-viewer";
import JsonEditorVue from "json-editor-vue";
Array.prototype.remove = function remove(item) {
  let index = this.indexOf(item);
  if (index > -1) {
    this.splice(index, 1);
  }
  return this;
};
Number.prototype.toFixedNumber = function toFixedNumber(digits = 2) {
  return parseFloat(this.toFixed(digits));
};
Number.prototype.appendPx = function() {
  if (this) {
    return this + "px";
  }
  return "";
};
String.prototype.setPowerPublicQuery = function() {
  if (!this) {
    return "";
  }
  let url = this;
  let currParms = location.href.split("?")[1];
  if (currParms) {
    let dtParms = currParms.split("&");
    dtParms.forEach((ele) => {
      let parmKeyValue = ele.split("=");
      if (ele && (ele.includes("Power_") || ele.includes("Transfer_")) && !url.includes(parmKeyValue[0])) {
        url = url.indexOf("?") == -1 ? url + "?" + parmKeyValue[0] + "=" + parmKeyValue[1] : url + "&" + parmKeyValue[0] + "=" + parmKeyValue[1];
      }
    });
  }
  return url.toString();
}, String.prototype.toCamel = function() {
  return this.replace(/-([a-z])/g, function(match, letter) {
    console.log(match);
    return letter.toUpperCase();
  });
};
String.prototype.appendPx = function() {
  if (!this) {
    return "";
  }
  if (lessCom$1.isNumber(this.toString())) {
    return this + "px";
  }
  return this.toString();
};
String.prototype.toList = function(valueSeparator = ",") {
  if (this) {
    return this.toString().split(valueSeparator);
  }
  return [];
};
String.prototype.toListNumber = function(valueSeparator = ",") {
  if (this) {
    return this.toString().split(valueSeparator).map((ele) => parseFloat(ele));
  }
  return [];
};
String.prototype.toBool = function toBool() {
  if (this.toLowerCase() === "true") {
    return true;
  } else if (this.toLowerCase() === "false") {
    return false;
  }
  return false;
};
String.prototype.toInt = function toInt() {
  if (lessCom$1.isNumber(this.toString())) {
    return parseInt(this.toString());
  }
  return 0;
};
String.prototype.toFloat = function toFloat(digits = 2) {
  if (!digits) {
    return parseFloat(this.toString());
  }
  return parseFloat(parseFloat(this.toString()).toFixed(digits));
};
String.prototype.cutWord = function(len) {
  if (this) {
    if (this.length > len) {
      return this.substring(0, len) + "...";
    }
  }
  return this.toString();
};
String.prototype.replacePowerUrl = function replacePowerUrl() {
  try {
    if (this && this.indexOf("{Power_CoteID}") > -1 && location.host) {
      return this.replace("{Power_CoteID}", location.host.split(".")[0]);
    }
  } catch (err) {
    console.log(err);
  }
  return this.toString();
};
String.prototype.addUrlParameter = function addUrlParameter(param, value) {
  if (value === void 0) {
    return this.toString();
  }
  if (this.toString().indexOf(param) > -1) {
    var oUrl = this.toString();
    return oUrl.replace(new RegExp("/(" + param + "=)([^&]*)/gi"), param + "=" + value);
  }
  let cSymbol = this.indexOf("?") > -1 ? "&" : "?";
  return `${this}${cSymbol}${param}=${value}`;
};
String.prototype.post = function request(postdata, alertCatchError = true) {
  return lessCom$1.post(this.toString(), postdata, alertCatchError);
};
String.prototype.get = function request2(postdata, alertCatchError = true) {
  return lessCom$1.get(this.toString(), postdata, alertCatchError);
};
String.prototype.md5 = function md5() {
  function RotateLeft(lValue, iShiftBits) {
    return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
  }
  function AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = lX & 2147483648;
    lY8 = lY & 2147483648;
    lX4 = lX & 1073741824;
    lY4 = lY & 1073741824;
    lResult = (lX & 1073741823) + (lY & 1073741823);
    if (lX4 & lY4) {
      return lResult ^ 2147483648 ^ lX8 ^ lY8;
    }
    if (lX4 | lY4) {
      if (lResult & 1073741824) {
        return lResult ^ 3221225472 ^ lX8 ^ lY8;
      } else {
        return lResult ^ 1073741824 ^ lX8 ^ lY8;
      }
    } else {
      return lResult ^ lX8 ^ lY8;
    }
  }
  function F(x2, y, z) {
    return x2 & y | ~x2 & z;
  }
  function G(x2, y, z) {
    return x2 & z | y & ~z;
  }
  function H(x2, y, z) {
    return x2 ^ y ^ z;
  }
  function I(x2, y, z) {
    return y ^ (x2 | ~z);
  }
  function FF(a2, b2, c2, d2, x2, s, ac) {
    a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(F(b2, c2, d2), x2), ac));
    return AddUnsigned(RotateLeft(a2, s), b2);
  }
  function GG(a2, b2, c2, d2, x2, s, ac) {
    a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(G(b2, c2, d2), x2), ac));
    return AddUnsigned(RotateLeft(a2, s), b2);
  }
  function HH(a2, b2, c2, d2, x2, s, ac) {
    a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(H(b2, c2, d2), x2), ac));
    return AddUnsigned(RotateLeft(a2, s), b2);
  }
  function II(a2, b2, c2, d2, x2, s, ac) {
    a2 = AddUnsigned(a2, AddUnsigned(AddUnsigned(I(b2, c2, d2), x2), ac));
    return AddUnsigned(RotateLeft(a2, s), b2);
  }
  function ConvertToWordArray(sMessage) {
    var lWordCount;
    var lMessageLength = sMessage.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - lByteCount % 4) / 4;
      lBytePosition = lByteCount % 4 * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | sMessage.charCodeAt(lByteCount) << lBytePosition;
      lByteCount++;
    }
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function WordToHex(lValue) {
    var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = lValue >>> lCount * 8 & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
  x = ConvertToWordArray(this);
  a = 1732584193;
  b = 4023233417;
  c = 2562383102;
  d = 271733878;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
    d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
    c = FF(c, d, a, b, x[k + 2], S13, 606105819);
    b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
    a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
    d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
    c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
    b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
    a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
    d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
    c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
    b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
    a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
    d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
    c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
    b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
    a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
    d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
    c = GG(c, d, a, b, x[k + 11], S23, 643717713);
    b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
    a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
    d = GG(d, a, b, c, x[k + 10], S22, 38016083);
    c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
    b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
    a = GG(a, b, c, d, x[k + 9], S21, 568446438);
    d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
    c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
    b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
    a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
    d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
    c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
    b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
    a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
    d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
    c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
    b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
    a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
    d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
    c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
    b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
    a = HH(a, b, c, d, x[k + 13], S31, 681279174);
    d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
    c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
    b = HH(b, c, d, a, x[k + 6], S34, 76029189);
    a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
    d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
    c = HH(c, d, a, b, x[k + 15], S33, 530742520);
    b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
    a = II(a, b, c, d, x[k + 0], S41, 4096336452);
    d = II(d, a, b, c, x[k + 7], S42, 1126891415);
    c = II(c, d, a, b, x[k + 14], S43, 2878612391);
    b = II(b, c, d, a, x[k + 5], S44, 4237533241);
    a = II(a, b, c, d, x[k + 12], S41, 1700485571);
    d = II(d, a, b, c, x[k + 3], S42, 2399980690);
    c = II(c, d, a, b, x[k + 10], S43, 4293915773);
    b = II(b, c, d, a, x[k + 1], S44, 2240044497);
    a = II(a, b, c, d, x[k + 8], S41, 1873313359);
    d = II(d, a, b, c, x[k + 15], S42, 4264355552);
    c = II(c, d, a, b, x[k + 6], S43, 2734768916);
    b = II(b, c, d, a, x[k + 13], S44, 1309151649);
    a = II(a, b, c, d, x[k + 4], S41, 4149444226);
    d = II(d, a, b, c, x[k + 11], S42, 3174756917);
    c = II(c, d, a, b, x[k + 2], S43, 718787259);
    b = II(b, c, d, a, x[k + 9], S44, 3951481745);
    a = AddUnsigned(a, AA);
    b = AddUnsigned(b, BB);
    c = AddUnsigned(c, CC);
    d = AddUnsigned(d, DD);
  }
  var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
  return temp.toLowerCase();
};
const { saveAs } = pkg;
function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var r = 0, t = Array(e.length); r < e.length; r++)
      t[r] = e[r];
    return t;
  }
  return Array.from(e);
}
function generateArray(e) {
  var _a, _b;
  var exportTr = e.querySelectorAll("tr");
  if (e.getElementsByClassName("els_stat_export_tr").length > 0) {
    exportTr = e.getElementsByClassName("els_stat_export_tr");
  } else if (e.getElementsByClassName("el-table__body-wrapper").length > 0) {
    exportTr = e.getElementsByClassName("el-table__header-wrapper")[0].querySelectorAll("tr");
    exportTr = Array.from(exportTr).concat(Array.from(e.getElementsByClassName("el-table__body-wrapper")[0].querySelectorAll("tr")));
  }
  for (var r = [], t = exportTr, n = [], o = 0; o < t.length; ++o) {
    for (var a = [], s = t[o], l = s.getElementsByClassName("els-isexport"), c = 0; c < l.length; ++c) {
      var h2 = l[c], i = h2.getAttribute("colspan") ? (_a = h2.getAttribute("colspan")) == null ? void 0 : _a.toInt() : 0, u = h2.getAttribute("rowspan") ? (_b = h2.getAttribute("rowspan")) == null ? void 0 : _b.toInt() : 0, f = h2.innerText ? h2.innerText.trim() : "";
      if (h2.getElementsByClassName("isexport").length > 0) {
        f = h2.getElementsByClassName("isexport")[0].textContent ? h2.getElementsByClassName("isexport")[0].textContent : f;
      }
      if ("" !== f && f === +f && (f = +f), n.forEach(function(e2) {
        if (o >= e2.s.r && o <= e2.e.r && a.length >= e2.s.c && a.length <= e2.e.c)
          for (var r2 = 0; r2 <= e2.e.c - e2.s.c; ++r2)
            a.push(null);
      }), (u || i) && (u = u || 1, i = i || 1, n.push({
        s: {
          r: o,
          c: a.length
        },
        e: {
          r: o + u - 1,
          c: a.length + i - 1
        }
      })), a.push("" !== f ? f : null), i)
        for (var g = 0; g < i - 1; ++g)
          a.push(null);
    }
    r.push(a);
  }
  return [r, n];
}
function datenum(e, r = 0) {
  return r && (e += 1462), (Date.parse(e) - Date.parse("1899-11-30")) / 864e5;
}
function sheet_from_array_of_arrays(e) {
  for (var t = {}, n = {
    s: {
      c: 1e7,
      r: 1e7
    },
    e: {
      c: 0,
      r: 0
    }
  }, o = 0; o != e.length; ++o)
    for (var a = 0; a != e[o].length; ++a) {
      n.s.r > o && (n.s.r = o), n.s.c > a && (n.s.c = a), n.e.r < o && (n.e.r = o), n.e.c < a && (n.e.c = a);
      var s = {
        v: e[o][a]
      };
      if (null != s.v) {
        var l = XLSX.utils.encode_cell({
          c: a,
          r: o
        });
        if (typeof s.v === "string" && /^-*[\d,]+\d*\.*\d*%*$/.test(s.v) && s.v.length < 13) {
          s.t = "n";
          s.v = s.v.replaceAll(",", "");
          if (s.v.includes("%")) {
            s.v = s.v.replaceAll("%", "") / 100;
          }
          s.v = Number(s.v);
        } else {
          "number" == typeof s.v ? s.t = "n" : "boolean" == typeof s.v ? s.t = "b" : s.v instanceof Date ? (s.t = "n", s.z = XLSX.SSF._table[14], s.v = datenum(s.v)) : s.t = "s";
        }
        t[l] = s;
      }
    }
  return n.s.c < 1e7 && (t["!ref"] = XLSX.utils.encode_range(n)), t;
}
class Workbook {
  constructor(sheetNames = [], sheets = {}) {
    __publicField(this, "SheetNames");
    __publicField(this, "Sheets");
    this.SheetNames = sheetNames;
    this.Sheets = sheets;
  }
}
function s2ab(e) {
  for (var r = new ArrayBuffer(e.length), t = new Uint8Array(r), n = 0; n != e.length; ++n)
    t[n] = 255 & e.charCodeAt(n);
  return r;
}
function exportTableToExcelEl(e, cellStyles = [], headerRowCount = 0, headerCellStyle = {}, filename = "") {
  var r = e, t = generateArray(r), n = t[1], o = t[0], a = new Workbook(), s = sheet_from_array_of_arrays(o);
  s["!merges"] = n;
  if (cellStyles.length > 0) {
    for (let item of cellStyles) {
      s[item.cell].s = item.style;
    }
  }
  if (headerRowCount > 0) {
    Object.keys(s).map((ele) => {
      if (ele.replace(/[^0-9]/ig, "") && parseInt(ele.replace(/[^0-9]/ig, "")) <= headerRowCount) {
        return ele;
      }
    }).filter((ele) => ele).forEach((ele) => {
      if (ele) {
        s[ele].s = headerCellStyle;
      }
    });
  }
  a.SheetNames.push("Sheet1");
  a.Sheets.Sheet1 = s;
  var l = XLSX.write(a, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary"
  });
  if (!filename) {
    if (window.document.title) {
      filename = window.document.title + "_" + (/* @__PURE__ */ new Date()).getTime();
    } else {
      filename = "数据文件" + (/* @__PURE__ */ new Date()).getTime();
    }
  }
  saveAs(new Blob([s2ab(l)], {
    type: "application/octet-stream"
  }), filename + ".xlsx");
}
function exportTableToExcelElMuti(es, sheetNames, cellStyles = [], headerRowCounts = [1], headerCellStyle = {}, filename = "") {
  var a = new Workbook();
  for (var i = 0; i < es.length; i++) {
    var e = es[i];
    var r = e, t = generateArray(r), n = t[1], o = t[0], s = sheet_from_array_of_arrays(o);
    s["!merges"] = n;
    if (cellStyles.length > 0) {
      for (let item of cellStyles) {
        s[item.cell].s = item.style;
      }
    }
    if (headerRowCounts[i] > 0) {
      Object.keys(s).map((ele) => {
        if (ele.replace(/[^0-9]/ig, "") && parseInt(ele.replace(/[^0-9]/ig, "")) <= headerRowCounts[i]) {
          return ele;
        }
      }).filter((ele) => ele).forEach((ele) => {
        if (ele) {
          s[ele].s = headerCellStyle;
        }
      });
    }
    a.SheetNames.push(sheetNames[i]);
    a.Sheets[sheetNames[i]] = s;
  }
  var l = XLSX.write(a, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary"
  });
  if (!filename) {
    if (window.document.title) {
      filename = window.document.title + "_" + (/* @__PURE__ */ new Date()).getTime();
    } else {
      filename = "数据文件" + (/* @__PURE__ */ new Date()).getTime();
    }
  }
  saveAs(new Blob([s2ab(l)], {
    type: "application/octet-stream"
  }), filename + ".xlsx");
}
function exportJsonToExcel(data) {
  var e = data.length > 0 && void 0 !== data[0] ? data[0] : {}, r = e.multiHeader, t = void 0 === r ? [] : r, n = e.header, o = e.data, a = e.filename, s = e.merges, l = void 0 === s ? [] : s, c = e.autoWidth, h2 = void 0 === c || c, i = e.bookType, u = void 0 === i ? "xlsx" : i;
  a = a || "excel-list", o = [..._toConsumableArray(o)], o.unshift(n);
  for (var f = t.length - 1; f > -1; f--)
    o.unshift(t[f]);
  var g = new Workbook(), v = sheet_from_array_of_arrays(o);
  if (l.length > 0 && (v["!merges"] || (v["!merges"] = []), l.forEach(function(e2) {
    v["!merges"].push(XLSX.utils.decode_range(e2));
  })), h2) {
    for (var S = o.map(function(e2) {
      return e2.map(function(e3) {
        return null == e3 ? {
          wch: 10
        } : e3.toString().charCodeAt(0) > 255 ? {
          wch: 2 * e3.toString().length
        } : {
          wch: e3.toString().length
        };
      });
    }), y = S[0], p = 1; p < S.length; p++)
      for (var b = 0; b < S[p].length; b++)
        y[b].wch < S[p][b].wch && (y[b].wch = S[p][b].wch);
    v["!cols"] = y;
  }
  g.SheetNames.push("SheetJS"), g.Sheets.SheetJS = v;
  var m = XLSX.write(g, {
    bookType: u,
    bookSST: false,
    type: "binary"
  });
  saveAs(new Blob([s2ab(m)], {
    type: "application/octet-stream"
  }), a + "." + u);
}
var ValueType = /* @__PURE__ */ ((ValueType2) => {
  ValueType2["Auto"] = "";
  ValueType2["String"] = "String";
  ValueType2["Number"] = "Number";
  ValueType2["Bool"] = "Bool";
  return ValueType2;
})(ValueType || {});
var ValidType = /* @__PURE__ */ ((ValidType2) => {
  ValidType2["None"] = "";
  ValidType2["Number"] = "Number";
  ValidType2["Float"] = "Float";
  ValidType2["Price"] = "Price";
  ValidType2["Date"] = "Date";
  ValidType2["DateTime"] = "DateTime";
  ValidType2["Time"] = "Time";
  ValidType2["Url"] = "Url";
  ValidType2["Email"] = "Email";
  ValidType2["Phone"] = "Phone";
  ValidType2["Character"] = "Character";
  return ValidType2;
})(ValidType || {});
var QueryMethod = /* @__PURE__ */ ((QueryMethod2) => {
  QueryMethod2["Equal"] = "Equal";
  QueryMethod2["GreaterThan"] = "GreaterThan";
  QueryMethod2["GreaterThanOrEqual"] = "GreaterThanOrEqual";
  QueryMethod2["LessThan"] = "LessThan";
  QueryMethod2["LessThanOrEqual"] = "LessThanOrEqual";
  QueryMethod2["NotEqual"] = "NotEqual";
  QueryMethod2["StartsWith"] = "StartsWith";
  QueryMethod2["EndsWith"] = "EndsWith";
  QueryMethod2["Contains"] = "Contains";
  QueryMethod2["Like"] = "Like";
  QueryMethod2["StdIn"] = "StdIn";
  QueryMethod2["In"] = "In";
  QueryMethod2["ORLike"] = "ORLike";
  QueryMethod2["NoAuto"] = "NoAuto";
  return QueryMethod2;
})(QueryMethod || {});
var QueryDataType = /* @__PURE__ */ ((QueryDataType2) => {
  QueryDataType2["String"] = "String";
  QueryDataType2["Int"] = "Int";
  QueryDataType2["Guid"] = "Guid";
  QueryDataType2["Date"] = "Date";
  QueryDataType2["Object"] = "Object";
  QueryDataType2["TimeStamp"] = "TimeStamp";
  QueryDataType2["SecondStamp"] = "SecondStamp";
  return QueryDataType2;
})(QueryDataType || {});
var UploadType = /* @__PURE__ */ ((UploadType2) => {
  UploadType2["None"] = "None";
  UploadType2["Pic"] = "Pic";
  UploadType2["File"] = "File";
  return UploadType2;
})(UploadType || {});
var DynamicComponentGroup = /* @__PURE__ */ ((DynamicComponentGroup2) => {
  DynamicComponentGroup2["Form"] = "Form";
  DynamicComponentGroup2["Desc"] = "Desc";
  DynamicComponentGroup2["Container"] = "Container";
  return DynamicComponentGroup2;
})(DynamicComponentGroup || {});
const lessCom = {
  jsonFormatter(obj) {
    if (!obj) {
      return "";
    }
    return JSON.stringify(obj, null, "  ");
  },
  getFormNodeProps(props) {
    const param = (({
      prop,
      label,
      hasFormItem,
      span,
      aIndex,
      tip,
      tipPosition,
      suffixContent,
      required,
      requiredMessage,
      validType,
      validExpression,
      validMessage,
      validMethod,
      validTrigger,
      queryField,
      queryMethod,
      queryDataType,
      queryDefaultValue,
      queryAutoReadData,
      queryAroundComma,
      queryRange,
      queryRangeOrEqual
    }) => ({
      prop,
      label,
      hasFormItem,
      span,
      aIndex,
      tip,
      tipPosition,
      suffixContent,
      required,
      requiredMessage,
      validType,
      validExpression,
      validMessage,
      validMethod,
      validTrigger,
      queryField,
      queryMethod,
      queryDataType,
      queryDefaultValue,
      queryAutoReadData,
      queryAroundComma,
      queryRange,
      queryRangeOrEqual
    }))(props);
    for (const key in param) {
      if (param[key] === void 0) {
        delete param[key];
      }
    }
    return param;
  },
  getApiConfig() {
    const { proxy } = getCurrentInstance();
    if (!proxy || !proxy.$lessConfig) {
      return {};
    }
    return {
      $codeField: proxy.$lessConfig.api["code"],
      $messageField: proxy.$lessConfig.api["message"],
      $dataField: proxy.$lessConfig.api["data"],
      $eventData: proxy.$lessConfig.api["eventData"],
      $success: proxy.$lessConfig.api["successCode"]
    };
  },
  getMenuConfig() {
    const { proxy } = getCurrentInstance();
    if (!proxy || !proxy.$lessConfig) {
      return {};
    }
    return {
      $idField: proxy.$lessConfig.menu["id"],
      $actionField: proxy.$lessConfig.menu["action"],
      $nameField: proxy.$lessConfig.menu["name"],
      $actionNameField: proxy.$lessConfig.menu["actionName"],
      $areaField: proxy.$lessConfig.menu["areaName"],
      $controllerField: proxy.$lessConfig.menu["controllerName"],
      $iconField: proxy.$lessConfig.menu["icon"],
      $urlField: proxy.$lessConfig.menu["url"],
      $buttonColorField: proxy.$lessConfig.menu["buttonColor"],
      $buttonTypeField: proxy.$lessConfig.menu["buttonType"],
      $groupField: proxy.$lessConfig.menu["group"],
      $confirmField: proxy.$lessConfig.menu["confirmField"],
      $confirmPasswordField: proxy.$lessConfig.menu["confirmPasswordField"]
    };
  },
  getTableConfig() {
    const { proxy } = getCurrentInstance();
    if (!proxy || !proxy.$lessConfig) {
      return {};
    }
    return {
      $menuField: proxy.$lessConfig.table["menu"],
      $avgDayField: proxy.$lessConfig.table["avgDay"],
      $pageDataField: proxy.$lessConfig.table.page["data"],
      $pageSizeField: proxy.$lessConfig.table.page["pageSize"],
      $currentPageField: proxy.$lessConfig.table.page["currentPage"],
      $totalField: proxy.$lessConfig.table.page["total"],
      $pageCountField: proxy.$lessConfig.table.page["pageCount"]
    };
  },
  getUEditorConfig() {
    const { proxy } = getCurrentInstance();
    if (!proxy || !proxy.$lessConfig) {
      return {};
    }
    return {
      $serverUrl: proxy.$lessConfig.uEditor["serverUrl"],
      $homeUrl: proxy.$lessConfig.uEditor["homeUrl"]
    };
  },
  getUploadConfig() {
    const { proxy } = getCurrentInstance();
    if (!proxy || !proxy.$lessConfig) {
      return {};
    }
    return {
      $uploadUrl: proxy.$lessConfig.upload["url"],
      $dataField: proxy.$lessConfig.upload["data"],
      $pathField: proxy.$lessConfig.upload["data_path"],
      $md5Field: proxy.$lessConfig.upload["data_md5"]
    };
  },
  getCompareClass(val) {
    if (!val || val === "-") {
      return "";
    }
    if (parseFloat(val) < 0) {
      return "txt-color-green";
    }
    return "txt-color-red";
  },
  getHBResult(row, fieldName) {
    let val1 = row[fieldName];
    let val2 = row.HBData[fieldName];
    if (!val1 || !val2) {
      return "-";
    }
    val1 = val1.toString().toFloat(4);
    val2 = val2.toString().toFloat(4);
    return !val1 || !val2 ? "-" : ((val1 - val2) / val2 * 100).toFixed(2) + "%";
  },
  getTBResult(row, fieldName) {
    let val1 = row[fieldName];
    let val2 = row.TBData[fieldName];
    if (!val1 || !val2) {
      return "-";
    }
    val1 = val1.toString().toFloat(4);
    val2 = val2.toString().toFloat(4);
    return !val1 || !val2 ? "-" : ((val1 - val2) / val2 * 100).toFixed(2) + "%";
  },
  getAvgDayResult(val, fixed = 2, dayCount = 1) {
    if (val) {
      return (val / dayCount).toFixed(fixed);
    }
    return "-";
  },
  getUrlParms(paramName) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == paramName) {
        return pair[1];
      }
    }
    return "";
  },
  formatDate(date, fmt) {
    if (typeof date === "string" || typeof date === "number") {
      date = new Date(date);
    }
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),
      "y+": date.getFullYear().toString(),
      // 年
      "M+": (date.getMonth() + 1).toString(),
      // 月
      "m+": date.getMinutes().toString(),
      // 分
      "D+": date.getDate().toString(),
      // 日
      "d+": date.getDate().toString(),
      // 日
      "H+": date.getHours().toString(),
      // 时
      "h+": date.getHours().toString(),
      "S+": date.getSeconds().toString(),
      // 秒
      "s+": date.getSeconds().toString()
      // 秒
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  },
  parseTime(time, cFormat = "") {
    if (arguments.length === 0) {
      return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time == "object") {
      date = time;
    } else {
      if (("" + time).length === 10)
        time = parseInt(time) * 1e3;
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      if (key === "a")
        return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
      if (result.length > 0 && value < 10) {
        value = "0" + value;
      }
      return value || 0;
    });
    return time_str;
  },
  exportMuti(es, sheetNames, cellStyles = [], headerRowCounts = [1], headerCellStyle = {}, filename = "") {
    exportTableToExcelElMuti(es, sheetNames, cellStyles, headerRowCounts, headerCellStyle, filename);
  },
  exportTable(el, cellStyles = [], headerRowCount = 0, headerCellStyle = {}, filename = "") {
    exportTableToExcelEl(el, cellStyles, headerRowCount, headerCellStyle, filename);
  },
  exportJSON(data) {
    exportJsonToExcel(data);
  },
  getObjectKey(obj, fields, separator = "$") {
    let currValue = [];
    fields.split(",").forEach((ele) => {
      currValue.push(obj[ele]);
    });
    return currValue.join(separator);
  },
  sumArray(arr) {
    if (arr.length) {
      let currArr = arr.filter((ele) => this.isNumber(ele));
      if (currArr.length) {
        let sum = currArr.map((ele) => parseFloat(ele)).reduce(function(prev, curr) {
          if (!prev) {
            prev = 0;
          }
          if (!curr) {
            curr = 0;
          }
          return prev + curr;
        });
        return sum.toFixedNumber();
      }
      return 0;
    }
    return 0;
  },
  pageArray(arr, pageIndex, pageSize) {
    var skipNum = pageIndex * pageSize;
    var newArr = skipNum + pageSize >= arr.length ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
    return newArr;
  },
  removeArrayItem(list, item) {
    let index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
    }
  },
  orderBy(data, fieldName) {
    if (data) {
      data.sort(function(obj1, obj2) {
        var val1 = !obj1[fieldName] ? 0 : obj1[fieldName];
        var val2 = !obj2[fieldName] ? 0 : obj2[fieldName];
        if (lessCom.isNumber(val1) && lessCom.isNumber(val2)) {
          val1 = parseFloat(val1);
          val2 = parseFloat(val2);
        }
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  },
  orderByDescending(data, fieldName) {
    if (data) {
      data.sort(function(obj1, obj2) {
        var val1 = !obj2[fieldName] ? 0 : obj2[fieldName];
        var val2 = !obj1[fieldName] ? 0 : obj1[fieldName];
        if (lessCom.isNumber(val1) && lessCom.isNumber(val2)) {
          val1 = parseFloat(val1);
          val2 = parseFloat(val2);
        }
        if (val1 < val2) {
          return -1;
        } else if (val1 > val2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  },
  randomNumber(len = 1e5) {
    return (Math.random() * len).toString().toInt();
  },
  getQueryData(queryData) {
    if (!queryData) {
      return {};
    }
    let queryParms = {};
    for (let key in queryData) {
      var item = queryData[key];
      if (item.QueryParameterType == "NoPost") {
        continue;
      }
      if (key == "PageSize" || key == "PageIndex") {
        queryParms["Query_" + key] = item.Value;
      } else if (item.QueryParameterType == "Sort") {
        var parameterName = key.startsWith("Sort_") ? key : "Sort_" + key;
        var fieldName = item.QueryFieldName;
        var sortRank = item.Value;
        if (sortRank) {
          var signatureMD5 = (fieldName + "_" + sortRank).md5();
          queryParms[parameterName] = fieldName + "$" + sortRank + "$" + signatureMD5;
        }
      } else {
        if (item.QueryParameterType !== void 0 && item.QueryParameterType !== "NoQuery" && item.QueryMethod !== "NoAuto") {
          if (item.IsRange || item.isRangeOrEqual) {
            let fieldName2 = item.QueryFieldName;
            let startQueryMethod = item.IsRangeOrEqual ? QueryMethod.GreaterThanOrEqual : QueryMethod.GreaterThan;
            let queryDataType = item.QueryDataType;
            let startSignatureMD5 = (fieldName2 + "_" + startQueryMethod + "_" + queryDataType).md5();
            let startFieldValue = item.Value.split(",")[0];
            if (startFieldValue || typeof startFieldValue == "number") {
              queryParms["Query_Start_" + key] = fieldName2 + "$" + startQueryMethod + "$" + queryDataType + "$" + startSignatureMD5 + "$" + encodeURIComponent(startFieldValue);
            }
            let endQueryMethod = item.IsRangeOrEqual ? QueryMethod.LessThanOrEqual : QueryMethod.LessThan;
            let endSignatureMD5 = (fieldName2 + "_" + startQueryMethod + "_" + queryDataType).md5();
            let endFieldValue = item.Value.split(",")[1];
            if (endFieldValue || typeof endFieldValue == "number") {
              queryParms["Query_End_" + key] = fieldName2 + "$" + endQueryMethod + "$" + queryDataType + "$" + endSignatureMD5 + "$" + encodeURIComponent(endFieldValue);
            }
          } else {
            let parameterName2 = "Query_" + key;
            let fieldName2 = item.QueryFieldName;
            let queryMethod = item.QueryMethod;
            let queryDataType = item.QueryDataType;
            let signatureMD52 = (fieldName2 + "_" + queryMethod + "_" + queryDataType).md5();
            let fieldValue = item.Value;
            if (item.IsAroundComma === true && fieldValue && !fieldValue.startsWith(",")) {
              fieldValue = `,${fieldValue},`;
            }
            if (fieldValue || typeof fieldValue == "number") {
              queryParms[parameterName2] = fieldName2 + "$" + queryMethod + "$" + queryDataType + "$" + signatureMD52 + "$" + encodeURIComponent(fieldValue);
            }
          }
        } else {
          if (item.IsRange || item.IsRangeOrEqual) {
            queryParms["Start_" + key] = item.Value.split(",")[0];
            queryParms["End_" + key] = item.Value.split(",")[1];
          } else {
            queryParms[key] = item.Value;
          }
        }
      }
    }
    return queryParms;
  },
  downLoadTxt(url) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", url.split("/").pop());
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "ElsDownloadFile");
    const eleFile = document.getElementById("LeoDownloadFile");
    if (eleFile) {
      document.body.removeChild(eleFile);
    }
    document.body.appendChild(a);
    a.click();
  },
  getToolHeight() {
    return 0;
  },
  Guid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16).toString(16);
      guid += n;
      if (i == 8 || i == 12 || i == 16 || i == 20)
        guid += "-";
    }
    return guid;
  },
  Guid32() {
    return lessCom.Guid().replace(/-/g, "");
  },
  cloneObj(obj) {
    if (!obj) {
      return {};
    }
    return JSON.parse(JSON.stringify(obj));
  },
  isObject: (obj) => {
    return Object.prototype.toString.call(obj).indexOf("Object") > -1 || Object.prototype.toString.call(obj).indexOf("Array") > -1;
  },
  isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/;
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  dtGroupBy(data, fieldName, sortFieldName = "") {
    const groups = {};
    data.forEach(function(o) {
      const group = o[fieldName];
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    if (sortFieldName) {
      let sortGroupData = Object.keys(groups).map(function(group) {
        let groupsData = groups[group];
        let sort = groupsData[0][sortFieldName];
        return { key: group, sort: sort ? sort : 0, value: groupsData };
      });
      this.orderBy(sortGroupData, "sort");
      return sortGroupData;
    } else {
      return Object.keys(groups).map(function(group) {
        return { key: group, value: groups[group] };
      });
    }
  },
  post(url, data, alertCatchError = true) {
    if (!data) {
      data = [];
    }
    return new Promise((resolve, reject) => {
      axios.post(url, data, { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).then((res) => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      }).catch((action) => {
        if (alertCatchError) {
          ElMessage.error({ message: "接口调用异常" });
        }
        console.log(action);
        reject(action);
      });
    });
  },
  get(url, data, alertCatchError = true) {
    if (!data) {
      data = [];
    }
    return new Promise((resolve, reject) => {
      axios.get(url, { params: data }).then((res) => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      }).catch((action) => {
        if (alertCatchError) {
          ElMessage.error({ message: "接口调用异常" });
        }
        console.log(action);
        reject(action);
      });
    });
  }
};
const lessCom$1 = lessCom;
const _hoisted_1$I = { class: "els-node" };
const _sfc_main$1b = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsInput",
    inheritAttrs: false
  },
  __name: "Input",
  props: {
    modelValue: {},
    prefixTag: {},
    suffixTag: {},
    width: {},
    encode: { type: Boolean, default: false },
    encodeType: { default: "url" },
    textarea: { type: Boolean },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: { default: "blur" },
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const setModelValue = inject("setModelValue", () => null);
    const getModelValue = inject("getModelValue", () => null);
    const formInputWidth = inject("inputWidth", "");
    const slots = useSlots();
    const attrs = useAttrs();
    const slotNames = [];
    for (const slotItem in slots) {
      slotNames.push(slotItem);
    }
    const encodeValue = ref();
    const inputValue = ref();
    const currWidth = ref();
    watchEffect(() => {
      currWidth.value = props.width ?? "";
      if (!currWidth.value) {
        if (formInputWidth) {
          currWidth.value = formInputWidth;
        }
      }
    });
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      const currValue = initModelValue();
      if (currValue) {
        if (props.encode) {
          encodeValue.value = currValue;
          if (props.encodeType == "url") {
            inputValue.value = decodeURIComponent(encodeValue.value);
          }
        } else {
          inputValue.value = currValue;
        }
      }
    });
    watch(inputValue, (val) => {
      handleReturnResult(val);
    });
    function handleReturnResult(val) {
      let currValue = val;
      if (props.encode) {
        currValue = encodeURIComponent(val);
      }
      emits("update:modelValue", currValue);
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, currValue, props.aIndex);
      }
    }
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$I, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createVNode(_component_el_input, mergeProps({
              modelValue: inputValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
              style: [{ width: currWidth.value.appendPx() }]
            }, unref(attrs)), createSlots({
              default: withCtx(() => [
                (openBlock(), createElementBlock(Fragment, null, renderList(slotNames, (item) => {
                  return renderSlot(_ctx.$slots, item);
                }), 64))
              ]),
              _: 2
            }, [
              !unref(slots).prepend && _ctx.prefixTag ? {
                name: "prepend",
                fn: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.prefixTag), 1)
                ]),
                key: "0"
              } : unref(slots).prepend ? {
                name: "prepend",
                fn: withCtx(() => [
                  renderSlot(_ctx.$slots, "prepend")
                ]),
                key: "1"
              } : void 0,
              !unref(slots).append && _ctx.suffixTag ? {
                name: "append",
                fn: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.suffixTag), 1)
                ]),
                key: "2"
              } : unref(slots).append ? {
                name: "prepend",
                fn: withCtx(() => [
                  renderSlot(_ctx.$slots, "append")
                ]),
                key: "3"
              } : void 0
            ]), 1040, ["modelValue", "style"])
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
const Input_vue_vue_type_style_index_0_lang = "";
_sfc_main$1b.install = (app) => {
  app.component(_sfc_main$1b.__name, _sfc_main$1b);
};
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsTextarea"
  },
  __name: "Textarea",
  props: {
    modelValue: {},
    width: {},
    encode: { type: Boolean, default: false },
    encodeType: { default: "url" },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: { default: "blur" },
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    useSlots();
    const inputValue = ref();
    watch(() => props.modelValue, (val) => {
      inputValue.value = val;
    }, { immediate: true });
    watch(inputValue, (val) => {
      emits("update:modelValue", val);
    });
    return (_ctx, _cache) => {
      const _component_els_input = resolveComponent("els-input");
      return openBlock(), createBlock(_component_els_input, mergeProps({
        modelValue: inputValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
        type: "textarea"
      }, props), null, 16, ["modelValue"]);
    };
  }
});
const Textarea_vue_vue_type_style_index_0_lang = "";
_sfc_main$1a.install = (app) => {
  app.component(_sfc_main$1a.__name, _sfc_main$1a);
};
const _hoisted_1$H = { class: "els-node" };
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsInputRange",
    inheritAttrs: false
  },
  __name: "InputRange",
  props: {
    modelValue: {},
    start: {},
    end: {},
    startPlaceholder: {},
    endPlaceholder: {},
    isNumber: { type: Boolean, default: true },
    onChange: {},
    width: { default: "100" },
    valueSeparator: { default: "," },
    propStart: {},
    propEnd: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", "update:start", "update:end"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const setModelValue = inject("setModelValue", () => {
    });
    const attrs = useAttrs();
    const currValue = ref([]);
    const currStartValue = ref();
    const currEndValue = ref();
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop !== void 0) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    function initStartModelValue() {
      if (props.start === void 0 && getModelValue && attrs.propStart !== void 0) {
        return getModelValue(attrs.propStart);
      }
      return props.start;
    }
    function initEndModelValue() {
      if (props.end === void 0 && getModelValue && attrs.propEnd !== void 0) {
        return getModelValue(attrs.propEnd);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      const startValue = initStartModelValue();
      const endValue = initEndModelValue();
      currStartValue.value = startValue;
      currEndValue.value = endValue;
    });
    watchEffect(() => {
      const currValue2 = initModelValue();
      currValue2.value.length = 0;
      currValue2.value.push(...currValue2.split(props.valueSeparator));
    });
    function handleChange() {
      if (props.onChange) {
        props.onChange([currStartValue.value, currEndValue.value]);
      }
    }
    function handleBlur() {
      var _a, _b;
      currStartValue.value = (_a = currStartValue.value) == null ? void 0 : _a.toString().trim();
      currEndValue.value = (_b = currEndValue.value) == null ? void 0 : _b.toString().trim();
      currValue.value.length = 0;
      currValue.value.push(currStartValue.value);
      currValue.value.push(currEndValue.value);
      handleReturnResult();
    }
    function handleReturnResult() {
      if (currStartValue.value && !lessCom$1.isNumber(currStartValue.value)) {
        currStartValue.value = 0;
      }
      if (currEndValue.value && !lessCom$1.isNumber(currEndValue.value)) {
        currEndValue.value = 0;
      }
      let startValue = currStartValue.value;
      let endValue = currEndValue.value;
      let currValue2 = "";
      if (props.isNumber) {
        startValue = lessCom$1.isNumber(currStartValue.value) ? parseFloat(currStartValue.value ?? 0) : 0;
        endValue = lessCom$1.isNumber(currEndValue.value) ? parseFloat(currEndValue.value ?? 0) : 0;
        emits("update:start", startValue);
        emits("update:end", endValue);
      } else {
        emits("update:start", currStartValue.value);
        emits("update:end", currEndValue.value);
      }
      if (currStartValue.value || currEndValue.value) {
        currValue2 = currStartValue.value + props.valueSeparator + currEndValue.value;
        emits("update:modelValue", currValue2);
      } else {
        emits("update:modelValue", "");
      }
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, currValue2, props.aIndex);
        setModelValue(props.propStart, startValue, props.aIndex);
        setModelValue(props.propEnd, endValue, props.aIndex);
      }
    }
    return (_ctx, _cache) => {
      const _component_els_input = resolveComponent("els-input");
      const _component_el_space = resolveComponent("el-space");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$H, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createVNode(_component_el_space, { class: "els-range" }, {
              default: withCtx(() => [
                createVNode(_component_els_input, mergeProps({
                  "auto-complete": "on",
                  placeholder: _ctx.startPlaceholder,
                  width: _ctx.width
                }, unref(attrs), {
                  modelValue: currStartValue.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currStartValue.value = $event),
                  onBlur: handleBlur,
                  onChange: handleChange
                }), null, 16, ["placeholder", "width", "modelValue"]),
                renderSlot(_ctx.$slots, "range-separator", {}, () => [
                  createTextVNode("-")
                ]),
                createVNode(_component_els_input, mergeProps({
                  "auto-complete": "on",
                  placeholder: _ctx.endPlaceholder,
                  width: _ctx.width
                }, unref(attrs), {
                  modelValue: currEndValue.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => currEndValue.value = $event),
                  onBlur: handleBlur,
                  onChange: handleChange
                }), null, 16, ["placeholder", "width", "modelValue"])
              ]),
              _: 3
            })
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
_sfc_main$19.install = (app) => {
  app.component(_sfc_main$19.__name, _sfc_main$19);
};
const _hoisted_1$G = { class: "els-node" };
const _hoisted_2$n = {
  key: 0,
  class: "check"
};
const _hoisted_3$c = {
  key: 0,
  class: "check"
};
const _hoisted_4$8 = {
  key: 0,
  class: "check"
};
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsSelect",
    inheritAttrs: false
  },
  __name: "Select",
  props: {
    data: {},
    url: {},
    modelValue: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    disabledField: { default: "disabled" },
    selectIndex: { default: -1 },
    isClearWithSearch: { type: Boolean },
    isClearSearchWithNoSelect: { type: Boolean },
    groupField: {},
    noExistOptionPrefix: { default: "未知选项" },
    hasNoExistOption: { type: Boolean, default: true },
    isInitTriggerSelect: { type: Boolean, default: true },
    resetValueByChangeData: { type: Boolean, default: true },
    valueType: { default: ValueType.Auto },
    loading: { type: Boolean },
    width: {},
    onChange: {},
    valueSeparator: { default: "," },
    multiple: { type: Boolean },
    allowCreate: { type: Boolean },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: { default: "change" },
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:select", "update:select-label", "change", "click-option", "select", "blur", "clear", "readdataed"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const slots = useSlots();
    const attrs = useAttrs();
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    const initSelect = ref(false);
    const preSelectValue = ref("");
    const currLoading = ref(false);
    const selectValue = ref("");
    watch(() => props.multiple, (val) => {
      if (val) {
        selectValue.value = [];
      } else {
        selectValue.value = "";
      }
    }, { immediate: true });
    const selectItem = ref();
    const selectLabel = ref("");
    const options = reactive([]);
    const noExistOption = reactive([]);
    const extraOption = reactive([]);
    const defaultSlotData = reactive([]);
    const queryData = reactive({ searchKey: "", idString: "" });
    const formInputWidth = inject("inputWidth", "");
    const currWidth = ref(props.width ?? "");
    if (!currWidth.value) {
      if (formInputWidth) {
        currWidth.value = formInputWidth;
      }
    }
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    const optionData = computed(() => {
      return options.concat(extraOption).concat(noExistOption);
    });
    watch(() => props.selectIndex, () => {
      initSelectIndex();
    });
    watch(() => props.url, () => {
      if (props.resetValueByChangeData) {
        if (props.multiple) {
          selectValue.value = [];
        } else {
          selectValue.value = "";
        }
      }
      readData();
    });
    watch(() => props.data, (val, oldVal) => {
      if (val === void 0 && oldVal === void 0) {
        return;
      }
      if (val != oldVal && JSON.stringify(val) != JSON.stringify(oldVal) && val) {
        if (props.resetValueByChangeData) {
          if (props.multiple) {
            selectValue.value = [];
          } else {
            selectValue.value = "";
          }
        }
        options.length = 0;
        options.push(...val);
        initNoExistData();
        initSelectIndex();
      }
    });
    watch(selectValue, (val) => {
      if (props.multiple) {
        handleReturnResult(val.join(props.valueSeparator));
        return;
      }
      handleReturnResult(val);
    });
    watchEffect(() => {
      initSelectValue();
      initNoExistData();
    });
    const provideOptionData = ref({ type: "select" });
    provide("provideOption", provideOptionData);
    provide("multiple", props.multiple);
    provide("setExtraOption", setExtraOption);
    function initSelectValue() {
      let currValueType = props.valueType;
      if (props.allowCreate) {
        currValueType = ValueType.String;
      }
      const currModelValue = initModelValue();
      if (currModelValue === "" || currModelValue === void 0 || selectValue.value === currModelValue) {
        return;
      }
      if (props.multiple) {
        if (currValueType === ValueType.Number) {
          selectValue.value = currModelValue.toString().toListNumber(props.valueSeparator);
        } else if (currValueType === ValueType.String) {
          selectValue.value = currModelValue.toString().toList(props.valueSeparator);
        } else if (optionData.value.length && typeof optionData.value[0][props.valueField] === "number") {
          selectValue.value = currModelValue.toString().toListNumber(props.valueSeparator);
        } else if (currModelValue) {
          selectValue.value = currModelValue.toString().toList(props.valueSeparator);
        }
      } else {
        if (currValueType === ValueType.Number) {
          selectValue.value = parseFloat(currModelValue.toString());
        } else if (currValueType === ValueType.String) {
          selectValue.value = currModelValue.toString();
        } else if (optionData.value.length && currModelValue.toString().length < 12 && typeof optionData.value[0][props.valueField] === "number") {
          selectValue.value = parseFloat(currModelValue.toString());
        } else {
          selectValue.value = currModelValue;
        }
      }
    }
    function initSelectIndex() {
      const currModelValue = initModelValue();
      if (props.selectIndex > -1 && !currModelValue) {
        if (optionData.value.length) {
          selectValue.value = optionData.value[props.selectIndex][props.valueField];
          if (props.multiple) {
            selectValue.value = [selectValue];
          }
        }
      }
    }
    function setExtraOption(item) {
      let index = optionData.value.findIndex((ele) => ele[props.valueField] == item.value);
      if (index == -1) {
        let currSlotData = {};
        currSlotData[props.labelField] = item.label;
        currSlotData[props.valueField] = item.value;
        currSlotData["DataIsExtra"] = true;
        extraOption.push(currSlotData);
      }
    }
    function initNoExistData() {
      nextTick(() => {
        noExistOption.length = 0;
        if (props.hasNoExistOption) {
          if (props.multiple) {
            if (selectValue.value.length) {
              let existValue = selectValue.value.filter((ele) => !optionData.value.map((cele) => cele[props.valueField]).includes(ele));
              if (existValue && existValue.length) {
                existValue.forEach((ele) => {
                  if (ele === 0 || ele) {
                    let newOption = {};
                    if (props.allowCreate) {
                      newOption[props.labelField] = ele;
                    } else {
                      newOption[props.labelField] = props.noExistOptionPrefix ? props.noExistOptionPrefix + "-" + ele : ele;
                    }
                    newOption[props.valueField] = ele;
                    newOption["DataNoExist"] = true;
                    noExistOption.push(newOption);
                  }
                });
              }
            }
          } else {
            if (selectValue.value) {
              let currOption = optionData.value.find((oele) => oele[props.valueField] == selectValue.value);
              if (!currOption) {
                let newOption = {};
                if (props.allowCreate) {
                  newOption[props.labelField] = selectValue.value;
                } else {
                  newOption[props.labelField] = props.noExistOptionPrefix ? props.noExistOptionPrefix + "-" + selectValue.value : selectValue.value;
                }
                newOption[props.valueField] = selectValue.value;
                newOption["DataNoExist"] = true;
                noExistOption.push(newOption);
              } else {
                currOption[props.valueField] = selectValue.value;
              }
            }
          }
        }
      });
    }
    function handleComitSelect(value) {
      try {
        if ((value || value === 0) && optionData.value.length) {
          let currOptions = optionData.value;
          let currValue = value;
          if (props.multiple) {
            selectItem.value = currOptions.filter((ele) => value.toString().indexOf(ele[props.valueField]) > -1);
            selectLabel.value = selectItem.value.map((ele) => ele[props.labelField]).toString();
            currValue = value.toString();
          } else {
            selectItem.value = currOptions.find((ele) => value === ele[props.valueField]);
            if (selectItem.value) {
              selectLabel.value = selectItem.value[props.labelField];
            }
          }
          emits("select", { selectItem: selectItem.value, selectLabel: selectLabel.value, selectValue: currValue, preSelectValue: preSelectValue.value });
          preSelectValue.value = value;
        }
      } catch (err) {
        console.log(err);
      }
    }
    function handleBlur() {
      if (props.isClearSearchWithNoSelect && queryData.searchKey && !selectValue.value) {
        handleSearch("");
      }
      emits("blur");
    }
    function handleClear() {
      if (props.isClearWithSearch && queryData.searchKey) {
        handleSearch("");
      }
      emits("clear");
    }
    function handleSearch(searchValue) {
      var _a;
      if (attrs["remote"] === void 0 || attrs["remote"] === false) {
        return;
      }
      queryData["idString"] = (_a = selectValue.value) == null ? void 0 : _a.toString();
      queryData["searchKey"] = searchValue;
      readData();
    }
    function readData() {
      var _a;
      currLoading.value = true;
      let currUrl = ((_a = props.url) == null ? void 0 : _a.replacePowerUrl()) ?? "";
      return new Promise((resolve, reject) => {
        currUrl.post(queryData).then((res) => {
          if (res[$codeField] == $success) {
            options.length = 0;
            options.push(...res[$dataField]);
            initSelectValue();
            initNoExistData();
            initSelectIndex();
            emits("readdataed", options);
          } else {
            ElMessage.error(res[$messageField]);
          }
          currLoading.value = false;
          resolve(true);
        }).catch((action) => {
          reject(action);
        });
      });
    }
    function handleClickOption(item) {
      emits("click-option", item);
    }
    const setModelValue = inject("setModelValue", () => null);
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnResult(value) {
      if (value === void 0) {
        value = "";
      }
      handleReturnModelValue(value);
      if (initSelect) {
        if (value || value === 0) {
          if (props.valueField && props.labelField) {
            if (props.multiple) {
              emits("update:select", optionData.value.filter((ele) => value.indexOf(ele[props.valueField]) > -1));
              emits("update:select-label", optionData.value.filter((ele) => value.indexOf(ele[props.valueField]) > -1).map((ele) => ele[props.labelField]).toString());
            } else {
              let currOption = optionData.value.find((ele) => value == ele[props.valueField]);
              emits("update:select", currOption);
              if (currOption) {
                emits("update:select-label", currOption[props.labelField]);
              } else {
                emits("update:select-label", "");
              }
            }
          }
          handleComitSelect(value);
          emits("change", value);
        }
      }
      initSelect.value = true;
    }
    if ((attrs["remote"] === true || attrs["remote"] === "") && props.url) {
      if (props.modelValue) {
        queryData["idString"] = props.modelValue.toString();
      }
    }
    currLoading.value = props.loading;
    if (props.url) {
      readData();
    } else {
      options.length = 0;
      if (props.data) {
        options.push(...props.data);
      }
      initSelectValue();
      initNoExistData();
      initSelectIndex();
    }
    return (_ctx, _cache) => {
      const _component_el_option = resolveComponent("el-option");
      const _component_el_option_group = resolveComponent("el-option-group");
      const _component_el_select = resolveComponent("el-select");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$G, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => {
            var _a;
            return [
              createVNode(_component_el_select, mergeProps({
                modelValue: selectValue.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event),
                allowCreate: _ctx.allowCreate,
                multiple: _ctx.multiple,
                "remote-method": handleSearch,
                style: { width: (_a = currWidth.value) == null ? void 0 : _a.appendPx() },
                loading: currLoading.value,
                "remote-show-suffix": "",
                onBlur: handleBlur,
                onClear: handleClear
              }, unref(attrs)), createSlots({
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "extra", {}, void 0, true),
                  (_ctx.url || _ctx.data && _ctx.data.length > 0 || options.length) && !_ctx.groupField && !defaultSlotData.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(options, (item) => {
                    return openBlock(), createBlock(_component_el_option, {
                      onClick: ($event) => handleClickOption(item),
                      disabled: item[_ctx.disabledField] === true,
                      key: item[_ctx.valueField],
                      label: item[_ctx.labelField],
                      value: item[_ctx.valueField]
                    }, {
                      default: withCtx(() => [
                        _ctx.multiple ? (openBlock(), createElementBlock("i", _hoisted_2$n)) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "default", { item }, () => [
                          createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                        ], true)
                      ]),
                      _: 2
                    }, 1032, ["onClick", "disabled", "label", "value"]);
                  }), 128)) : (_ctx.url || _ctx.data && _ctx.data.length > 0 || options.length) && _ctx.groupField && !defaultSlotData.length ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(lessCom$1).dtGroupBy(options, _ctx.groupField), (group) => {
                    return openBlock(), createBlock(_component_el_option_group, {
                      key: group.key,
                      label: group.key
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(group.value, (item) => {
                          return openBlock(), createBlock(_component_el_option, {
                            onClick: ($event) => handleClickOption(item),
                            key: item[_ctx.valueField],
                            label: item[_ctx.labelField],
                            value: item[_ctx.valueField]
                          }, {
                            default: withCtx(() => [
                              _ctx.multiple ? (openBlock(), createElementBlock("i", _hoisted_3$c)) : createCommentVNode("", true),
                              renderSlot(_ctx.$slots, "default", { item }, () => [
                                createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                              ], true)
                            ]),
                            _: 2
                          }, 1032, ["onClick", "label", "value"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 128)) : renderSlot(_ctx.$slots, "default", { key: 2 }, void 0, true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(noExistOption, (item) => {
                    return openBlock(), createBlock(_component_el_option, {
                      onClick: ($event) => handleClickOption(item),
                      key: item[_ctx.valueField],
                      label: item[_ctx.labelField],
                      value: item[_ctx.valueField]
                    }, {
                      default: withCtx(() => [
                        unref(attrs).multiple ? (openBlock(), createElementBlock("i", _hoisted_4$8)) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(item[_ctx.labelField]), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick", "label", "value"]);
                  }), 128))
                ]),
                _: 2
              }, [
                unref(slots)["empty"] ? {
                  name: "empty",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "empty", {}, void 0, true)
                  ]),
                  key: "0"
                } : void 0,
                unref(slots)["prefix"] ? {
                  name: "prefix",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["modelValue", "allowCreate", "multiple", "style", "loading"])
            ];
          }),
          _: 3
        }, 16)
      ]);
    };
  }
});
const Select_vue_vue_type_style_index_0_scoped_16126be8_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Select = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["__scopeId", "data-v-16126be8"]]);
Select.install = (app) => {
  app.component(Select.__name, Select);
};
const _hoisted_1$F = {
  key: 0,
  class: "check"
};
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsOption" },
  __name: "Option",
  props: {
    type: {},
    label: {},
    value: {}
  },
  setup(__props) {
    const props = __props;
    const componentName = ref("");
    const currLabel = ref("");
    const multiple = ref(false);
    const provideOption = inject("provideOption", void 0);
    const slots = useSlots();
    const optionStyle = reactive([]);
    const attrs = useAttrs();
    const currType = ref();
    multiple.value = inject("multiple", false);
    watchEffect(() => {
      var _a, _b;
      if (provideOption.value) {
        const optionWidth = provideOption.value.optionWidth;
        if (optionWidth) {
          optionStyle.push({ "width": optionWidth.appendPx() });
        }
        currType.value = provideOption.value.type;
        if (currType.value != "tabs" && currType.value != "dropdown") {
          switch (currType.value) {
            case "radio":
              componentName.value = "el-radio";
              break;
            case "radiobutton":
              componentName.value = "el-radio-button";
              break;
            case "checkbox":
              componentName.value = "el-checkbox";
              break;
            case "checkboxbutton":
              componentName.value = "el-checkbox-button";
              break;
          }
        }
        currLabel.value = props.label ?? "";
        if (currType.value == "select" || currType.value.indexOf("checkbox") > -1 || currType.value.indexOf("radio") > -1) {
          if (slots.default && ((_a = slots.default()[0].type) == null ? void 0 : _a.toString()) == "Symbol(v-txt)") {
            currLabel.value = ((_b = slots.default()[0].children) == null ? void 0 : _b.toString()) ?? "";
          }
        }
      }
    });
    const setExtraOption = inject("setExtraOption", () => null);
    if (setExtraOption) {
      setExtraOption({ label: currLabel.value, value: props.value ?? currLabel.value });
    }
    return (_ctx, _cache) => {
      const _component_el_option = resolveComponent("el-option");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      return currType.value == "select" ? (openBlock(), createBlock(_component_el_option, mergeProps({
        key: 0,
        label: currLabel.value,
        value: _ctx.value ?? currLabel.value
      }, unref(attrs)), {
        default: withCtx(() => [
          multiple.value ? (openBlock(), createElementBlock("i", _hoisted_1$F)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(currLabel.value), 1)
          ])
        ]),
        _: 3
      }, 16, ["label", "value"])) : currType.value == "tabs" ? (openBlock(), createBlock(_component_el_tab_pane, mergeProps({
        key: 1,
        label: _ctx.label,
        name: _ctx.value ?? currLabel.value
      }, unref(attrs)), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
      }, [
        unref(slots).label ? {
          name: "label",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "label")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["label", "name"])) : currType.value == "dropdown" ? (openBlock(), createBlock(_component_el_dropdown_item, mergeProps({
        key: 2,
        command: _ctx.value ?? currLabel.value
      }, unref(attrs)), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(currLabel.value), 1)
          ])
        ]),
        _: 2
      }, [
        unref(slots).dropdown ? {
          name: "dropdown",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "dropdown")
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["command"])) : (openBlock(), createBlock(resolveDynamicComponent(componentName.value), mergeProps({
        key: 3,
        style: optionStyle
      }, unref(attrs), {
        label: _ctx.value ?? currLabel.value
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(unref(provideOption)), 1)
          ])
        ]),
        _: 3
      }, 16, ["style", "label"]));
    };
  }
});
const _hoisted_1$E = {
  key: 1,
  style: { "width": "100%" }
};
const _hoisted_2$m = { class: "els-radio-group-item" };
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsOptionGroup" },
  __name: "OptionGroup",
  props: {
    label: {}
  },
  setup(__props) {
    const provideOption = inject("provideOption", void 0);
    const attrs = useAttrs();
    const currType = ref();
    watchEffect(() => {
      currType.value = provideOption.value.type;
    });
    return (_ctx, _cache) => {
      const _component_el_option_group = resolveComponent("el-option-group");
      return currType.value == "select" ? (openBlock(), createBlock(_component_el_option_group, mergeProps({
        key: 0,
        label: _ctx.label
      }, unref(attrs)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 16, ["label"])) : (openBlock(), createElementBlock("div", _hoisted_1$E, [
        createElementVNode("div", _hoisted_2$m, toDisplayString(_ctx.label), 1),
        renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(unref(attrs))), void 0, true)
      ]));
    };
  }
});
const OptionGroup_vue_vue_type_style_index_0_scoped_acf762c0_lang = "";
const OptionGroup = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-acf762c0"]]);
const _hoisted_1$D = { class: "els-node" };
const _hoisted_2$l = { key: 0 };
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsRadio",
    inheritAttrs: false
  },
  __name: "Radio",
  props: {
    type: { default: "radio" },
    modelValue: {},
    width: {},
    height: {},
    optionWidth: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    noExistOptionPrefix: { default: "未知选项" },
    filterable: { type: Boolean },
    hasNoExistOption: { type: Boolean, default: true },
    disabledField: { default: "disabled" },
    selectIndex: { default: -1 },
    url: {},
    groupField: {},
    data: {},
    isInitTriggerSelect: { type: Boolean, default: true },
    resetValueByChangeData: { type: Boolean, default: true },
    valueType: {},
    onChange: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: { default: "change" },
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["select", "readdataed", "click-option", "update:modelValue", "update:select", "update:select-label", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    const selectValue = ref();
    const preSelectValue = ref("");
    const selectItem = ref();
    const selectLabel = ref("");
    const filterText = ref("");
    const initSelect = ref(false);
    const options = reactive([]);
    const noExistOption = reactive([]);
    const extraOption = reactive([]);
    const originalData = reactive([]);
    const queryData = reactive({ searchKey: "", idString: "" });
    const attrs = useAttrs();
    const radioStyle = reactive([]);
    const optionData = computed(() => {
      return options.concat(extraOption).concat(noExistOption);
    });
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watch(selectValue, (val) => {
      initNoExistData();
      handleReturnResult(val);
    });
    watch(() => props.selectIndex, () => {
      initSelectIndex();
    });
    watchEffect(() => {
      initModelValue();
      initSelectValue();
    });
    watch(() => props.url, () => {
      if (props.resetValueByChangeData) {
        selectValue.value = "";
      }
      readData();
    });
    watch(() => props.data, (val) => {
      if (props.resetValueByChangeData) {
        selectValue.value = "";
      }
      options.length = 0;
      originalData.length = 0;
      if (val) {
        options.push(...val);
        originalData.push(...val);
      }
      initNoExistData();
      initSelectIndex();
    });
    watch(filterText, (val) => {
      options.length = 0;
      options.push(...originalData.filter((ele) => {
        return ele[props.labelField].toLowerCase().indexOf(val.toLowerCase()) > -1;
      }));
    });
    const provideOptionData = ref({ type: "radio", optionWidth: "" });
    provide("provideOption", provideOptionData);
    watchEffect(() => {
      if (props.type == "button") {
        provideOptionData.value.type = "radiobutton";
      } else {
        provideOptionData.value.type = "radio";
      }
      if (props.optionWidth) {
        provideOptionData.value.optionWidth = props.optionWidth;
      }
    });
    provide("setExtraOption", setExtraOption);
    const radioClass = reactive([]);
    if (props.type == "radio") {
      radioStyle.push({ "text-align": "left" });
      if (props.width) {
        radioStyle.push({ "width": props.width.appendPx() });
      }
      radioClass.push("els-radio-default");
    } else {
      radioClass.push("els-radio");
    }
    if (props.height) {
      radioClass.push("scrollheight");
      if (props.height) {
        radioStyle.push({ "max-height": props.height.appendPx() });
      }
    }
    function initSelectValue() {
      const currValue = initModelValue();
      let currValueType = props.valueType;
      if (currValue === "" || currValue === void 0) {
        selectValue.value = "";
        return;
      }
      if (currValueType === ValueType.Number) {
        selectValue.value = parseFloat(currValue.toString());
      } else if (currValueType === ValueType.String) {
        selectValue.value = currValue.toString();
      } else if (optionData.value.length && currValue.toString().length < 12 && typeof optionData.value[0][props.valueField] === "number") {
        selectValue.value = parseFloat(currValue.toString());
      } else {
        selectValue.value = currValue;
      }
    }
    function initSelectIndex() {
      const currValue = initModelValue();
      if (props.selectIndex > -1 && !currValue) {
        if (optionData.value.length) {
          selectValue.value = optionData.value[props.selectIndex][props.valueField];
        }
      }
    }
    function setExtraOption(item) {
      let index = optionData.value.findIndex((ele) => ele[props.valueField] == item.value);
      if (index == -1) {
        let currSlotData = {};
        currSlotData[props.labelField] = item.label;
        currSlotData[props.valueField] = item.value;
        currSlotData["DataIsExtra"] = true;
        extraOption.push(currSlotData);
      }
    }
    function initNoExistData() {
      nextTick(() => {
        noExistOption.length = 0;
        if (props.hasNoExistOption) {
          if (selectValue.value) {
            let currOption = optionData.value.find((oele) => oele[props.valueField] == selectValue.value);
            if (!currOption) {
              let newOption = {};
              if (attrs["allow-create"]) {
                newOption[props.labelField] = selectValue.value;
              } else {
                newOption[props.labelField] = props.noExistOptionPrefix ? props.noExistOptionPrefix + "-" + selectValue.value : selectValue.value;
              }
              newOption[props.valueField] = selectValue.value;
              newOption["DataNoExist"] = true;
              noExistOption.push(newOption);
            } else {
              currOption[props.valueField] = selectValue.value;
            }
          }
        }
      });
    }
    function handleComitSelect(value) {
      try {
        if ((value || value === 0) && optionData.value.length) {
          let currValue = value;
          selectItem.value = optionData.value.find((ele) => value === ele[props.valueField]);
          if (selectItem.value) {
            selectLabel.value = selectItem.value[props.labelField];
          }
          emits("select", { selectItem: selectItem.value, selectLabel: selectLabel.value, selectValue: currValue, preSelectValue: preSelectValue.value });
          preSelectValue.value = value;
        }
      } catch (err) {
        console.log(err);
      }
    }
    function readData() {
      var _a, _b;
      let currUrl = ((_a = props.url) == null ? void 0 : _a.replacePowerUrl()) ?? "";
      queryData["idString"] = (_b = selectValue.value) == null ? void 0 : _b.toString();
      return new Promise((resolve, reject) => {
        currUrl.post(queryData).then((res) => {
          if (res[$codeField] == $success) {
            options.length = 0;
            options.push(...res[$dataField]);
            originalData.length = 0;
            originalData.push(...res[$dataField]);
            initSelectValue();
            initNoExistData();
            initSelectIndex();
            emits("readdataed", options);
          } else {
            ElMessage.error(res[$messageField]);
          }
          resolve(true);
        }).catch((action) => {
          reject(action);
        });
      });
    }
    function handleClickOption(item) {
      emits("click-option", item);
    }
    const setModelValue = inject("setModelValue", () => null);
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnResult(value) {
      if (value === void 0) {
        value = "";
      }
      handleReturnModelValue(value);
      if (initSelect.value) {
        if (value || value === 0) {
          if (props.valueField && props.labelField) {
            let currOption = optionData.value.find((ele) => value == ele[props.valueField]);
            emits("update:select", currOption);
            if (currOption) {
              emits("update:select-label", currOption[props.labelField]);
            } else {
              emits("update:select-label", "");
            }
          }
          handleComitSelect(value);
          emits("change", value);
        }
      }
      initSelect.value = true;
    }
    initSelect.value = props.isInitTriggerSelect;
    if (props.modelValue === "") {
      initSelect.value = true;
    }
    if (props.url) {
      readData();
    } else {
      if (props.data) {
        options.push(...props.data);
        originalData.push(...props.data);
      }
      initSelectValue();
      initNoExistData();
      initSelectIndex();
    }
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_radio = resolveComponent("el-radio");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_el_radio_group = resolveComponent("el-radio-group");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$D, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createElementVNode("div", {
              class: normalizeClass(radioClass),
              style: normalizeStyle(radioStyle)
            }, [
              props.filterable ? (openBlock(), createElementBlock("div", _hoisted_2$l, [
                _ctx.filterable ? (openBlock(), createBlock(_component_el_input, {
                  key: 0,
                  style: { "width": "200px" },
                  "suffix-icon": "Search",
                  placeholder: "输入关键字进行过滤",
                  modelValue: filterText.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filterText.value = $event),
                  clearable: ""
                }, null, 8, ["modelValue"])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              !_ctx.url && (!_ctx.data || !_ctx.data.length) && !optionData.value.length ? (openBlock(), createBlock(_component_el_radio, mergeProps({
                key: 1,
                ref: "leo-radio",
                modelValue: selectValue.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectValue.value = $event)
              }, unref(attrs)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ]),
                _: 3
              }, 16, ["modelValue"])) : (openBlock(), createBlock(_component_el_radio_group, mergeProps({
                key: 2,
                modelValue: selectValue.value,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => selectValue.value = $event),
                ref: "els-radio-group"
              }, unref(attrs)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "extra", {}, void 0, true),
                  filterText.value && !optionData.value.length ? (openBlock(), createBlock(_component_el_empty, { key: 0 })) : (_ctx.url || _ctx.data && _ctx.data.length > 0 || options.length) && !_ctx.groupField ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(options, (item, index) => {
                    return openBlock(), createBlock(_sfc_main$17, {
                      type: _ctx.type,
                      key: index,
                      value: item[_ctx.valueField],
                      disabled: item[_ctx.disabledField] === true,
                      onClick: ($event) => handleClickOption(item)
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default", { item }, () => [
                          createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                        ], true)
                      ]),
                      _: 2
                    }, 1032, ["type", "value", "disabled", "onClick"]);
                  }), 128)) : (_ctx.url || _ctx.data && _ctx.data.length > 0) && _ctx.groupField ? (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(unref(lessCom$1).dtGroupBy(options, _ctx.groupField), (gitem) => {
                    return openBlock(), createBlock(OptionGroup, {
                      label: gitem.key ?? "未分组"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(gitem.value, (item, index) => {
                          return openBlock(), createBlock(_sfc_main$17, {
                            type: _ctx.type,
                            key: index,
                            value: item[_ctx.valueField],
                            disabled: item[_ctx.disabledField] === true,
                            onClick: ($event) => handleClickOption(item)
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "default", { item }, () => [
                                createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                              ], true)
                            ]),
                            _: 2
                          }, 1032, ["type", "value", "disabled", "onClick"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 256)) : renderSlot(_ctx.$slots, "default", { key: 3 }, void 0, true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(noExistOption, (item) => {
                    return openBlock(), createBlock(_sfc_main$17, {
                      type: _ctx.type,
                      key: item[_ctx.valueField],
                      value: item[_ctx.valueField],
                      onClick: ($event) => handleClickOption(item)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                      ]),
                      _: 2
                    }, 1032, ["type", "value", "onClick"]);
                  }), 128))
                ]),
                _: 3
              }, 16, ["modelValue"]))
            ], 6)
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
const Radio_vue_vue_type_style_index_0_scoped_e5576b34_lang = "";
const ElsRadio = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["__scopeId", "data-v-e5576b34"]]);
ElsRadio.install = (app) => {
  app.component(ElsRadio.__name, ElsRadio);
};
const _hoisted_1$C = { class: "els-node" };
const _hoisted_2$k = {
  key: 0,
  style: { "margin-bottom": "15px", "text-align": "left" }
};
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsCheckbox", inheritAttrs: false },
  __name: "Checkbox",
  props: {
    type: { default: "checkbox" },
    modelValue: {},
    width: {},
    height: {},
    optionWidth: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    disabledField: { default: "disabled" },
    noExistOptionPrefix: { default: "未知选项" },
    hasNoExistOption: { type: Boolean, default: true },
    url: {},
    data: {},
    groupField: {},
    filterable: { type: Boolean },
    showCheckall: { type: Boolean },
    showInverse: { type: Boolean },
    resetValueByChangeData: { type: Boolean, default: true },
    isInitTriggerSelect: { type: Boolean },
    valueType: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:select", "update:select-label", "change", "click-option", "select", "blur", "clear", "readdataed"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const setModelValue = inject("setModelValue", () => null);
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    let initSelect = ref(false);
    const preSelectValue = ref([]);
    const selectItem = ref();
    const selectLabel = ref();
    const selectValue = ref([]);
    const singleSelectValue = ref();
    const options = reactive([]);
    const noExistOption = reactive([]);
    const extraOption = reactive([]);
    const originalData = reactive([]);
    const checkInverse = ref(false);
    const checkAll = ref(false);
    const isIndeterminate = ref(false);
    const filterText = ref("");
    let multiple = ref(true);
    const queryData = reactive({ searchKey: "", idString: "" });
    const optionData = computed(() => {
      return options.concat(extraOption).concat(noExistOption);
    });
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    const checkboxClass = reactive([]);
    const checkboxStyle = reactive([]);
    const provideOptionData = ref({ type: "checkbox", optionWidth: "" });
    provide("provideOption", provideOptionData);
    watchEffect(() => {
      if (props.type == "button") {
        provideOptionData.value.type = "checkboxbutton";
      } else {
        provideOptionData.value.type = "checkbox";
      }
      if (props.optionWidth) {
        provideOptionData.value.optionWidth = props.optionWidth;
      }
    });
    provide("setExtraOption", setExtraOption);
    if (props.type == "checkbox") {
      checkboxStyle.push({ "text-align": "left" });
      if (props.width) {
        checkboxStyle.push({ "width": props.width.appendPx() });
      }
      checkboxClass.push("els-checkbox-default");
    } else {
      checkboxClass.push("els-checkbox");
    }
    if (props.height) {
      checkboxClass.push("scrollheight");
      if (props.height) {
        checkboxStyle.push({ "max-height": props.height.appendPx() });
      }
    }
    watch(filterText, (val) => {
      options.length = 0;
      options.push(...originalData.filter((ele) => {
        return ele[props.labelField].toLowerCase().indexOf(val.toLowerCase()) > -1;
      }));
    });
    watch(() => props.url, () => {
      if (props.resetValueByChangeData) {
        if (multiple.value) {
          selectValue.value = [];
        } else {
          singleSelectValue.value = "";
        }
      }
      readData();
    });
    watch(() => props.data, (val, oldVal) => {
      if (val === void 0 && oldVal === void 0) {
        return;
      }
      if (val != oldVal && JSON.stringify(val) != JSON.stringify(oldVal) && val) {
        if (props.resetValueByChangeData) {
          if (multiple.value) {
            selectValue.value = [];
          } else {
            singleSelectValue.value = "";
          }
        }
        options.length = 0;
        originalData.length = 0;
        if (val) {
          options.push(...val);
          originalData.push(...val);
        }
        initNoExistData();
      }
    });
    watchEffect(() => {
      initModelValue();
      initSelectValue();
    });
    watch(selectValue, (val) => {
      initNoExistData();
      handleReturnResult(val);
      checkAllStatus();
    });
    watch(singleSelectValue, (val) => {
      handleReturnResult(val);
    });
    function initData() {
      if (!props.url && (!props.data || !props.data.length) && !optionData.value.length) {
        multiple.value = false;
      }
      if (props.url) {
        queryData["idString"] = props.modelValue ?? "";
        readData();
      } else {
        if (props.data) {
          options.push(...props.data);
          originalData.push(...props.data);
        }
        initSelectValue();
        initNoExistData();
        checkAllStatus();
      }
    }
    function initNoExistData() {
      nextTick(() => {
        noExistOption.length = 0;
        if (props.hasNoExistOption && multiple) {
          if (selectValue.length) {
            let existValue = selectValue.filter((ele) => !optionData.value.map((cele) => cele[props.valueField]).includes(ele));
            if (existValue && existValue.length) {
              existValue.forEach((ele) => {
                if (ele === 0 || ele) {
                  let newOption = {};
                  newOption[props.labelField] = props.noExistOptionPrefix ? props.noExistOptionPrefix + "-" + ele : ele;
                  newOption[props.valueField] = ele;
                  newOption["DataNoExist"] = true;
                  noExistOption.push(newOption);
                }
              });
            }
          }
        }
      });
    }
    function setExtraOption(item) {
      if (!multiple.value) {
        multiple.value = true;
        selectValue.value = [];
      }
      let index = optionData.value.findIndex((ele) => ele[props.valueField] == item.value);
      if (index == -1) {
        let currSlotData = {};
        currSlotData[props.labelField] = item.label;
        currSlotData[props.valueField] = item.value;
        currSlotData["DataIsExtra"] = true;
        extraOption.push(currSlotData);
      }
    }
    function handleInverseChange() {
      selectValue.value = optionData.value.filter((ele) => !selectValue.value.includes(ele[props.valueField])).map((obj) => {
        return obj[props.valueField];
      });
    }
    function handleCheckAllChange(val) {
      selectValue.value = val ? optionData.value.map((obj) => {
        return obj[props.valueField];
      }) : [];
      isIndeterminate.value = false;
    }
    function initSelectValue() {
      let currValueType = props.valueType;
      let currModelValue = initModelValue();
      if (typeof currModelValue == "string") {
        currModelValue = currModelValue.replace(/^,+/, "").replace(/,+$/, "");
      }
      if (currModelValue === "" || currModelValue === void 0) {
        return;
      }
      if (!multiple.value) {
        if (currValueType === ValueType.Number) {
          singleSelectValue.value = parseFloat(currModelValue);
        } else if (currValueType === ValueType.String) {
          singleSelectValue.value = currModelValue.toString();
        } else if (optionData.value.length && currModelValue.length < 12 && typeof optionData.value[0][props.valueField] === "number") {
          singleSelectValue.value = parseFloat(currModelValue);
        } else {
          singleSelectValue.value = currModelValue;
        }
        return;
      } else {
        if (currValueType === ValueType.Number) {
          selectValue.value = currModelValue.split(",").map((ele) => parseFloat(ele));
        } else if (currValueType === ValueType.String && currModelValue !== "") {
          selectValue.value = currModelValue.split(",");
        } else if (optionData.value.length && typeof optionData.value[0][props.valueField] === "number") {
          selectValue.value = currModelValue.split(",").map((ele) => parseFloat(ele));
        } else if (currModelValue) {
          selectValue.value = currModelValue.split(",");
        }
      }
    }
    function readData() {
      var _a;
      let currUrl = ((_a = props.url) == null ? void 0 : _a.replacePowerUrl()) ?? "";
      return new Promise((resolve, reject) => {
        currUrl.post(queryData).then((res) => {
          if (res[$codeField] == $success) {
            options.length = 0;
            options.push(...res[$dataField]);
            originalData.length = 0;
            originalData.push(...res[$dataField]);
            initSelectValue();
            initNoExistData();
            checkAllStatus();
            emits("readdataed", options);
          } else {
            ElMessage.error(res[$messageField]);
          }
          resolve(true);
        }).catch((action) => {
          reject(action);
        });
      });
    }
    function checkAllStatus() {
      if (props.showCheckall) {
        let checkedCount = selectValue.value.length;
        checkAll.value = checkedCount > 0 && checkedCount === optionData.value.length;
        isIndeterminate.value = checkedCount > 0 && checkedCount < optionData.value.length;
      }
    }
    function handleComitSelect(value) {
      try {
        if (value && options.length) {
          let currOptions = options;
          let currValue = value;
          if (multiple.value) {
            selectItem.value = currOptions.filter((ele) => value.indexOf(ele[props.valueField]) > -1);
            selectLabel.value = selectItem.value.map((ele) => ele[props.labelField]).toString();
            currValue = value.toString();
          } else {
            selectItem.value = currOptions.find((ele) => value === ele[props.valueField]);
            if (selectItem) {
              selectLabel.value = selectItem[props.labelField];
            }
          }
          emits("select", { selectItem, selectLabel, selectValue: currValue, preSelectValue });
          preSelectValue.value = value;
        }
      } catch (err) {
        console.log(err);
      }
    }
    function handleClickOption(item) {
      emits("click-option", item);
    }
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnResult(value) {
      if (value === void 0) {
        value = "";
      }
      if (multiple.value) {
        handleReturnModelValue(value.toString());
      } else {
        handleReturnModelValue(value);
      }
      if (initSelect) {
        if (value) {
          if (props.valueField && props.labelField) {
            if (multiple.value) {
              emits("update:select", optionData.value.filter((ele) => value.indexOf(ele[props.valueField]) > -1));
              emits("update:select-label", optionData.value.filter((ele) => value.indexOf(ele[props.valueField]) > -1).map((ele) => ele[props.labelField]).toString());
            } else {
              let currOption = optionData.value.find((ele) => value == ele[props.valueField]);
              emits("update:select", currOption);
              if (currOption) {
                emits("update:select-label", currOption[props.labelField]);
              } else {
                emits("update:select-label", "");
              }
            }
          }
          handleComitSelect(value);
        }
      }
      initSelect.value = true;
    }
    initSelect.value = props.isInitTriggerSelect;
    if (props.modelValue === "") {
      initSelect.value = true;
    }
    onMounted(() => {
      initData();
    });
    return (_ctx, _cache) => {
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_els_option = resolveComponent("els-option");
      const _component_els_option_group = resolveComponent("els-option-group");
      const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$C, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createElementVNode("div", {
              class: normalizeClass(checkboxClass),
              style: normalizeStyle(checkboxStyle)
            }, [
              _ctx.showCheckall || _ctx.filterable ? (openBlock(), createElementBlock("div", _hoisted_2$k, [
                _ctx.showCheckall ? (openBlock(), createBlock(_component_el_checkbox, {
                  key: 0,
                  indeterminate: isIndeterminate.value,
                  modelValue: checkAll.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => checkAll.value = $event),
                  onChange: handleCheckAllChange
                }, {
                  default: withCtx(() => [
                    createTextVNode("全选")
                  ]),
                  _: 1
                }, 8, ["indeterminate", "modelValue"])) : createCommentVNode("", true),
                _ctx.showInverse ? (openBlock(), createBlock(_component_el_checkbox, {
                  key: 1,
                  modelValue: checkInverse.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => checkInverse.value = $event),
                  onChange: handleInverseChange
                }, {
                  default: withCtx(() => [
                    createTextVNode("反选")
                  ]),
                  _: 1
                }, 8, ["modelValue"])) : createCommentVNode("", true),
                _ctx.filterable ? (openBlock(), createBlock(_component_el_input, {
                  key: 2,
                  style: normalizeStyle([{ "width": "200px" }, _ctx.showCheckall ? "margin-left:15px;" : ""]),
                  "suffix-icon": "Search",
                  placeholder: "输入关键字进行过滤",
                  modelValue: filterText.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => filterText.value = $event),
                  clearable: ""
                }, null, 8, ["style", "modelValue"])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              !_ctx.url && (!_ctx.data || !_ctx.data.length) && !optionData.value.length ? (openBlock(), createBlock(_component_el_checkbox, mergeProps({
                key: 1,
                ref: "els-checkbox",
                modelValue: singleSelectValue.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => singleSelectValue.value = $event)
              }, unref(attrs)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ]),
                _: 3
              }, 16, ["modelValue"])) : (openBlock(), createBlock(_component_el_checkbox_group, mergeProps({
                key: 2,
                modelValue: selectValue.value,
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => selectValue.value = $event),
                ref: "els-checkbox-group"
              }, unref(attrs)), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "extra", {}, void 0, true),
                  filterText.value && !optionData.value.length ? (openBlock(), createBlock(_component_el_empty, { key: 0 })) : (_ctx.url || _ctx.data && _ctx.data.length > 0 || options.length) && !_ctx.groupField ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(options, (item, index) => {
                    return openBlock(), createBlock(_component_els_option, {
                      key: index,
                      value: item[_ctx.valueField],
                      disabled: item[_ctx.disabledField] === true,
                      onClick: ($event) => handleClickOption(item)
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default", { item }, () => [
                          createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                        ], true)
                      ]),
                      _: 2
                    }, 1032, ["value", "disabled", "onClick"]);
                  }), 128)) : (_ctx.url || _ctx.data && _ctx.data.length > 0) && _ctx.groupField ? (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(unref(lessCom$1).dtGroupBy(options, _ctx.groupField), (gitem) => {
                    return openBlock(), createBlock(_component_els_option_group, {
                      label: gitem.key ?? "未分组"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(gitem.value, (item, index) => {
                          return openBlock(), createBlock(_component_els_option, {
                            key: index,
                            value: item[_ctx.valueField],
                            disabled: item[_ctx.disabledField] === true,
                            onClick: ($event) => handleClickOption(item)
                          }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "default", { item }, () => [
                                createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                              ], true)
                            ]),
                            _: 2
                          }, 1032, ["value", "disabled", "onClick"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["label"]);
                  }), 256)) : renderSlot(_ctx.$slots, "default", { key: 3 }, void 0, true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(noExistOption, (item) => {
                    return openBlock(), createBlock(_component_els_option, {
                      key: item[_ctx.valueField],
                      value: item[_ctx.valueField],
                      onClick: ($event) => handleClickOption(item)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                      ]),
                      _: 2
                    }, 1032, ["value", "onClick"]);
                  }), 128))
                ]),
                _: 3
              }, 16, ["modelValue"]))
            ], 6)
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
const Checkbox_vue_vue_type_style_index_0_scoped_46400140_lang = "";
const ElsCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-46400140"]]);
ElsCheckbox.install = (app) => {
  app.component(ElsCheckbox.__name, ElsCheckbox);
};
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsCheckboxButton"
  },
  __name: "CheckboxButton",
  props: {
    type: { default: "checkboxbutton" },
    modelValue: {},
    width: {},
    height: {},
    optionWidth: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    disabledField: { default: "disabled" },
    noExistOptionPrefix: { default: "未知选项" },
    hasNoExistOption: { type: Boolean, default: true },
    url: {},
    data: {},
    groupField: {},
    filterable: { type: Boolean },
    showCheckall: { type: Boolean },
    showInverse: { type: Boolean },
    resetValueByChangeData: { type: Boolean, default: true },
    isInitTriggerSelect: { type: Boolean },
    valueType: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const slots = useSlots();
    const selectValue = ref("");
    selectValue.value = props.modelValue ?? "";
    watch(() => props.modelValue, (val) => {
      selectValue.value = val ?? "";
    });
    watch(selectValue, (value) => {
      emits("update:modelValue", value);
    });
    const slotNames = [];
    for (const slotItem in slots) {
      slotNames.push(slotItem);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ElsCheckbox, mergeProps({
        modelValue: selectValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event)
      }, props), {
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList(slotNames, (item) => {
            return renderSlot(_ctx.$slots, item);
          }), 64))
        ]),
        _: 3
      }, 16, ["modelValue"]);
    };
  }
});
_sfc_main$13.install = (app) => {
  app.component(_sfc_main$13.__name, _sfc_main$13);
};
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsRadioButton"
  },
  __name: "RadioButton",
  props: {
    type: { default: "button" },
    modelValue: {},
    width: {},
    height: {},
    optionWidth: {},
    labelField: { default: "label" },
    valueField: { default: "value" },
    noExistOptionPrefix: { default: "未知选项" },
    filterable: { type: Boolean },
    hasNoExistOption: { type: Boolean, default: true },
    disabledField: { default: "disabled" },
    selectIndex: { default: -1 },
    url: {},
    groupField: {},
    data: {},
    isInitTriggerSelect: { type: Boolean, default: true },
    resetValueByChangeData: { type: Boolean, default: true },
    valueType: {},
    onChange: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const slots = useSlots();
    const selectValue = ref("");
    selectValue.value = props.modelValue;
    watch(() => props.modelValue, (val) => {
      selectValue.value = val;
    });
    watch(selectValue, (value) => {
      emits("update:modelValue", value);
    });
    const slotNames = [];
    for (const slotItem in slots) {
      slotNames.push(slotItem);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(ElsRadio, mergeProps({
        modelValue: selectValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event)
      }, props), {
        default: withCtx(() => [
          (openBlock(), createElementBlock(Fragment, null, renderList(slotNames, (item) => {
            return renderSlot(_ctx.$slots, item);
          }), 64))
        ]),
        _: 3
      }, 16, ["modelValue"]);
    };
  }
});
_sfc_main$12.install = (app) => {
  app.component(_sfc_main$12.__name, _sfc_main$12);
};
_sfc_main$17.install = (app) => {
  app.component(_sfc_main$17.__name, _sfc_main$17);
};
OptionGroup.install = (app) => {
  app.component(OptionGroup.__name, OptionGroup);
};
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsRow"
  },
  __name: "Row",
  setup(__props) {
    const colData = ref([]);
    const spanCount = ref(24);
    provide("layer", "row");
    provide("colData", colData);
    provide("getSpan", getSpan);
    provide("setSpan", setSpan);
    provide("removeSpan", removeSpan);
    function setSpan(id, span) {
      if (colData.value.find((ele) => ele.id == id)) {
        removeSpan(id);
      }
      colData.value.push({ "id": id, "span": span });
    }
    function removeSpan(id) {
      colData.value.splice(colData.value.findIndex((ele) => ele.id == id), 1);
    }
    function getSpan() {
      const autoSpan = colData.value.filter((ele) => !ele.span).length;
      if (autoSpan)
        return spanCount.value / autoSpan;
    }
    return (_ctx, _cache) => {
      const _component_el_row = resolveComponent("el-row");
      return openBlock(), createBlock(_component_el_row, null, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
_sfc_main$11.install = (app) => {
  app.component(_sfc_main$11.__name, _sfc_main$11);
};
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsCol"
  },
  __name: "Col",
  props: {
    span: {}
  },
  setup(__props) {
    const props = __props;
    const tagID = "els-col-" + lessCom$1.Guid32();
    provide("layer", "col");
    const currSpan = ref(24);
    const colData = inject("colData", null);
    const getSpan = inject("getSpan", () => null);
    const setSpan = inject("setSpan", () => null);
    const removeSpan = inject("removeSpan", () => null);
    watch(() => props.span, (val) => {
      setSpan(tagID, val);
    }, { immediate: true });
    watch(colData.value, () => {
      if (getSpan) {
        currSpan.value = getSpan();
      }
    }, { deep: true });
    onMounted(() => {
      if (getSpan) {
        currSpan.value = getSpan();
      }
    });
    onUnmounted(() => {
      if (removeSpan) {
        removeSpan(tagID);
      }
    });
    return (_ctx, _cache) => {
      const _component_el_col = resolveComponent("el-col");
      return openBlock(), createBlock(_component_el_col, { span: currSpan.value }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["span"]);
    };
  }
});
_sfc_main$10.install = (app) => {
  app.component(_sfc_main$10.__name, _sfc_main$10);
};
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsForm" },
  __name: "Form",
  props: {
    type: {},
    modelValue: {},
    formName: {},
    queryTableRef: {},
    queryAutoReadData: { type: Boolean },
    queryParameterType: { default: "Query" },
    labelWidth: {},
    saveUrl: {},
    beforeSave: {},
    afterSave: {},
    inputWidth: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: emits }) {
    const props = __props;
    const tagID = "els-form" + lessCom$1.Guid32();
    const attrs = useAttrs();
    const dataForm = ref();
    const submitButton = ref();
    let modelData = useVModel(props, "modelValue", emits);
    provide("container", "form");
    provide("setModelValue", setModelValue);
    provide("getModelValue", getModelValue);
    provide("formData", modelData);
    const parentLabelWidth = inject("labelWidth", "");
    const currLabelWidth = ref();
    const parentInputWidth = inject("inputWidth", "");
    const elsApiResult = inject("elsApiResult", () => null);
    const elsPageStore = inject("elsPageStore", null);
    const validateStore = { id: tagID, validate };
    const saveStore = { id: tagID, save: saveData };
    if (props.labelWidth) {
      provide("labelWidth", props.labelWidth);
    }
    if (props.inputWidth) {
      provide("inputWidth", props.inputWidth);
    } else {
      provide("inputWidth", parentInputWidth);
    }
    watch(() => props.labelWidth, (val) => {
      if (val) {
        currLabelWidth.value = props.labelWidth;
      }
    });
    onMounted(() => {
      if (props.labelWidth) {
        currLabelWidth.value = props.labelWidth;
      }
      if ((currLabelWidth.value === void 0 || currLabelWidth.value === "") && parentLabelWidth) {
        currLabelWidth.value = parentLabelWidth;
      }
      if (attrs["inline"] === void 0 && currLabelWidth.value === void 0 || currLabelWidth.value === "") {
        currLabelWidth.value = "100";
      }
      if (currLabelWidth.value) {
        currLabelWidth.value = currLabelWidth.value.appendPx();
      }
      if (elsPageStore) {
        elsPageStore.value.saveForms.push(saveStore);
        elsPageStore.value.validates.push(validateStore);
      }
    });
    onBeforeUnmount(() => {
      if (elsPageStore) {
        elsPageStore.value.saveForms.remove(saveStore);
        elsPageStore.value.validates.remove(validateStore);
      }
    });
    function saveData(url) {
      return new Promise((resolve, reject) => {
        let currSaveUrl = props.saveUrl ?? "";
        if (!currSaveUrl) {
          currSaveUrl = url;
        }
        currSaveUrl = currSaveUrl.replacePowerUrl();
        if (currSaveUrl) {
          validate().then((valid) => {
            if (valid) {
              if (props.beforeSave) {
                props.beforeSave(modelData.value).then((bres) => {
                  if (bres) {
                    currSaveUrl.post(modelData).then((res) => {
                      if (props.afterSave) {
                        props.afterSave(res);
                      }
                      elsApiResult(res);
                      resolve(res);
                    }).catch((error) => {
                      reject(error);
                    });
                  }
                });
              } else {
                currSaveUrl.post(modelData).then((res) => {
                  if (props.afterSave) {
                    props.afterSave(res);
                  }
                  elsApiResult(res);
                  resolve(res);
                }).catch((error) => {
                  reject(error);
                });
              }
            } else {
              resolve(false);
            }
          });
        } else {
          resolve(false);
        }
      });
    }
    function clearValidate() {
      nextTick(() => {
        dataForm.value.clearValidate();
      });
    }
    function validate() {
      return new Promise((resolve) => {
        if (!dataForm.value) {
          resolve(true);
        } else {
          dataForm.value.validate().then((res) => {
            resolve(res);
          }).catch((action) => {
            console.log(action);
            resolve(false);
          });
        }
      });
    }
    function validateField(fields) {
      return dataForm.value.validateField(fields);
    }
    function handleSubmitButton() {
      submitButton.value.$el.trigger("click");
    }
    function getModelValue(key, aIndex = -1) {
      if (key === void 0 || key === "") {
        return;
      }
      if (aIndex > -1) {
        if (key.toString().includes(".")) {
          return new Function("modelData", `return modelData.value[${aIndex}].${key};`);
        } else {
          return modelData.value[aIndex][key];
        }
      }
      if (key.toString().includes(".")) {
        return new Function("modelData", `return modelData.value.${key};`);
      } else {
        return modelData.value[key];
      }
    }
    function setModelValue(key, value, aIndex = -1) {
      if (key === void 0 || key === "") {
        return;
      }
      if (aIndex > -1) {
        if (key.toString().includes(".")) {
          new Function("modelData,value", `modelData.value[${aIndex}].${key}=value;`);
        } else {
          modelData.value[aIndex][key] = value;
        }
      }
      if (key.toString().includes(".")) {
        new Function("modelData,value", `modelData.value.${key}=value;`);
      } else {
        modelData.value[key] = value;
      }
    }
    __expose({
      clearValidate,
      validateField,
      validate,
      handleSubmitButton
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElForm), {
        model: unref(modelData),
        ref_key: "dataForm",
        ref: dataForm,
        onsubmit: "return false;",
        "label-width": currLabelWidth.value
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["model", "label-width"]);
    };
  }
});
_sfc_main$$.install = (app) => {
  app.component(_sfc_main$$.__name, _sfc_main$$);
};
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsFormQuery" },
  __name: "FormQuery",
  props: {
    tableRef: {},
    autoReadData: { type: Boolean },
    parameterType: { default: "Query" }
  },
  emits: ["update:modelValue", "search"],
  setup(__props, { expose: __expose, emit: emits }) {
    const props = __props;
    const { debounce } = lodash;
    const queryForm = ref();
    const submitButton = ref();
    const tagID = "els-form" + lessCom$1.Guid32();
    const attrs = useAttrs();
    const elsPageStore = inject("elsPageStore", void 0);
    const elsQuery = inject("elsQuery", () => null);
    let modelData = reactive({});
    let formData = reactive({});
    const debouncedQuerySearch = computed(() => {
      if (elsQuery) {
        return debounce(handleElsQuery, 200);
      } else {
        return debounce(handleSearch, 200);
      }
    });
    function handleElsQuery() {
      if (elsQuery) {
        return elsQuery(false, props.tableRef);
      }
    }
    provide("setQueryData", setQueryData);
    provide("getQueryData", getQueryData);
    provide("labelWidth", attrs["label-width"]);
    provide("formType", "Query");
    provide("queryTableRef", props.tableRef);
    provide("formData", formData);
    provide("setModelValue", setModelValue);
    provide("getModelValue", getModelValue);
    provide("container", "form");
    watch(formData, (val) => {
      emits("update:modelValue", val);
    });
    const queryStore = { id: tagID, tableRef: props.tableRef, query: handleSearch, cacheQueryState };
    const validateStore = { id: tagID, validate };
    onMounted(() => {
      recoverQueryState();
      if (elsPageStore) {
        elsPageStore.value.queryForms.push(queryStore);
        elsPageStore.value.validates.push(validateStore);
      }
    });
    onBeforeUnmount(() => {
      if (elsPageStore) {
        elsPageStore.value.queryForms.remove(queryStore);
        elsPageStore.value.validates.remove(validateStore);
      }
    });
    function getQueryData() {
      return modelData;
    }
    function setQueryData(item) {
      if (Array.isArray(item)) {
        item.forEach((ele) => {
          modelData[ele.key] = converToQueryData(ele);
          formData[ele.key] = modelData[ele.key].Value;
          if (modelData[ele.key]["QueryParameterType"] != "NoPost" && modelData[ele.key]["IsAutoQuery"]) {
            watch(() => formData[ele.key], (newVal, oldVal) => {
              if (newVal !== "" && newVal !== 0 && newVal == oldVal) {
                return;
              }
              debouncedQuerySearch.value();
            });
          }
        });
      } else {
        modelData[item.key] = converToQueryData(item);
        formData[item.key] = modelData[item.key].Value;
        if (modelData[item.key]["QueryParameterType"] != "NoPost" && modelData[item.key]["IsAutoQuery"]) {
          watch(() => formData[item.key], (newVal, oldVal) => {
            if (newVal !== "" && newVal !== 0 && newVal == oldVal) {
              return;
            }
            debouncedQuerySearch.value();
          });
        }
      }
    }
    function converToQueryData(query) {
      const isRange = query.isRange ?? false;
      const isRangeOrEqual = query.isRangeOrEqual ?? false;
      const queryFieldname = query.prop ?? "";
      const isAroundComma = query.isAroundComma ?? false;
      const queryDataType = query.dataType ?? QueryDataType.String;
      const queryMethod = query.method ?? queryDataType == QueryDataType.String ? QueryMethod.Contains : QueryMethod.Equal;
      const isAutoQuery = query.isAutoQuery ?? props.autoReadData;
      let parameterType = props.parameterType;
      if (query.parameterType) {
        parameterType = query.parameterType;
      }
      let defaultValue = query.value ?? "";
      if (query.key) {
        if (modelData[query.key] && modelData[query.key].Value !== "") {
          defaultValue = modelData[query.key].Value;
        }
        return {
          QueryFieldName: queryFieldname,
          QueryDataType: queryDataType,
          QueryMethod: queryMethod,
          QueryParameterType: parameterType,
          IsAroundComma: isAroundComma,
          IsAutoQuery: isAutoQuery,
          IsRange: isRange,
          isRangeOrEqual,
          Value: queryDataType === QueryDataType.Int && defaultValue && lessCom$1.isNumber(defaultValue) ? parseFloat(defaultValue) : defaultValue
        };
      }
      return null;
    }
    function recoverQueryState() {
      const pathID = inject("elsPathID", "");
      if (!pathID) {
        return;
      }
      var currQueryDataStr = sessionStorage.getItem(`${pathID}_QueryData`);
      if (currQueryDataStr) {
        var currQueryData = JSON.parse(currQueryDataStr);
        for (const key in currQueryData.QueryData) {
          if (key) {
            if (formData[key] || formData[key] === 0) {
              formData[key] = currQueryData.QueryData[key];
            }
          }
        }
        clearQueryState();
      }
    }
    function cacheQueryState() {
      if (Object.keys(formData).length > 0) {
        var cacheData = { QueryData: formData, CreateTime: (/* @__PURE__ */ new Date()).getTime() };
        sessionStorage.setItem(`$${tagID}_QueryData`, JSON.stringify(cacheData));
      }
    }
    function clearQueryState() {
      sessionStorage.removeItem(`${tagID}_QueryData`);
    }
    function handleSearch() {
      return new Promise((resolve) => {
        validate().then((res) => {
          for (const key in formData) {
            if (key && modelData[key]) {
              modelData[key].Value = formData[key];
            }
          }
          if (res) {
            if (attrs["onSearch"]) {
              emits("search", modelData);
            }
            resolve(modelData);
          } else {
            resolve(false);
          }
        });
      });
    }
    function clearValidate() {
      nextTick(() => {
        queryForm.value.clearValidate();
      });
    }
    function validate() {
      return new Promise((resolve) => {
        if (!queryForm.value) {
          resolve(true);
        } else {
          queryForm.value.validate().then((res) => {
            resolve(res);
          }).catch((action) => {
            console.log(action);
            resolve(false);
          });
        }
      });
    }
    function validateField(fields) {
      return queryForm.value.validateField(fields);
    }
    function handleSubmitButton() {
      submitButton.value.$el.trigger("click");
    }
    function getModelValue(key, aIndex = -1) {
      if (key === void 0 || key === "") {
        return;
      }
      if (aIndex > -1) {
        if (key.toString().includes(".")) {
          return new Function("formData", `return formData[${aIndex}].${key};`);
        } else {
          return formData[aIndex][key];
        }
      }
      if (key.toString().includes(".")) {
        return new Function("formData", `return formData.${key};`);
      } else {
        return formData[key];
      }
    }
    function setModelValue(key, value, aIndex = -1) {
      if (key === void 0 || key === "") {
        return;
      }
      if (aIndex > -1) {
        if (key.toString().includes(".")) {
          new Function("formData,value", `formData[${aIndex}].${key}=value;`);
        } else {
          formData[aIndex][key] = value;
        }
      }
      if (key.toString().includes(".")) {
        new Function("formData,value", `formData.${key}=value;`);
      } else {
        formData[key] = value;
      }
    }
    __expose({
      recoverQueryState,
      cacheQueryState,
      clearValidate,
      validateField,
      validate,
      handleSubmitButton
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElForm), {
        model: unref(formData),
        class: "queryForm",
        ref_key: "queryForm",
        ref: queryForm,
        onsubmit: "return false;",
        inline: "",
        "show-message": false
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 8, ["model"]);
    };
  }
});
const FormQuery_vue_vue_type_style_index_0_scoped_56d3df3a_lang = "";
const FormQuery = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-56d3df3a"]]);
FormQuery.install = (app) => {
  app.component(FormQuery.__name, FormQuery);
};
const _hoisted_1$B = ["innerHTML"];
const _hoisted_2$j = { class: "els-form-item-append" };
const _hoisted_3$b = ["innerHTML"];
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsFormItem" },
  __name: "FormItem",
  props: {
    spacer: {},
    spaceWrap: { type: Boolean },
    spaceSize: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean, default: true },
    span: {},
    aIndex: { default: -1 },
    tip: {},
    tipPosition: { default: "left" },
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean, default: void 0 },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const attrs = useAttrs();
    const formItem = ref();
    const setQueryData = inject("setQueryData", () => {
    });
    const getQueryData = inject("getQueryData", () => {
    });
    const formType = inject("formType", "");
    if (!props.hasFormItem) {
      provide("container", "formitem");
    }
    const slots = useSlots();
    function initRules() {
      if (formItem.value) {
        formItem.value.clearValidate();
      }
      let currItemRules = [];
      let currLabel = props.label ? props.label : "";
      if (attrs.rules) {
        return attrs.rules;
      } else {
        if (props.required) {
          currItemRules.push({ required: true, message: props.requiredMessage ? props.requiredMessage : (props.validTrigger == "change" ? "请选择" : "请输入") + currLabel, trigger: props.validTrigger });
        }
        let validExpression = props.validExpression;
        if (!validExpression) {
          switch (props.validType) {
            case ValidType.Number:
              validExpression = "^-?\\d+$";
              break;
            case ValidType.Float:
              validExpression = "^([1-9]+\\d*(\\.\\d+)?|0\\.\\d+)$";
              break;
            case ValidType.Price:
              validExpression = "((^[1-9]\\d*)|^0)(\\.\\d{0,2}){0,1}$";
              break;
            case ValidType.Date:
              validExpression = "^(\\d{4})(-)(\\d{2})(-)(\\d{2})$";
              break;
            case ValidType.DateTime:
              validExpression = "^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$";
              break;
            case ValidType.Time:
              validExpression = "^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$";
              break;
            case ValidType.Email:
              validExpression = "^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$";
              break;
            case ValidType.Phone:
              validExpression = "^[1][0-9]{10}$";
              break;
            case ValidType.Character:
              validExpression = "^[\\u4e00-\\u9fa5]{0,}$";
              break;
            case ValidType.Url:
              validExpression = "^((https?|ftp|file)://)?([da-z.-]+).([a-z.]{2,6})([/w .-]*)*/?$";
              break;
          }
        }
        if (validExpression) {
          currItemRules.push({ pattern: new RegExp(validExpression), message: props.validMessage ? props.validMessage : currLabel + "格式错误" });
        }
        if (props.validMethod) {
          currItemRules.push({ validator: props.validMethod, trigger: props.validTrigger });
        }
      }
      return currItemRules;
    }
    function initQuery() {
      if (getQueryData && (props.queryField || props.prop)) {
        let currKey = props.prop ?? lessCom$1.Guid32();
        const currQueryData = getQueryData();
        if (currQueryData) {
          if (currQueryData[currKey]) {
            currKey += "_" + lessCom$1.Guid32();
          }
        }
        const queryInfo = {
          key: currKey,
          prop: props.queryField ?? props.prop,
          method: props.queryMethod,
          dataType: props.queryDataType,
          isAroundComma: props.queryAroundComma,
          isAutoQuery: props.queryAutoReadData,
          isRange: props.queryRange,
          isRangeOrEqual: props.queryRangeOrEqual,
          value: props.queryDefaultValue
        };
        return queryInfo;
      }
      return null;
    }
    const itemRules = computed(() => {
      return initRules();
    });
    const defaultKey = ref();
    const defaultProp = ref();
    let queryData = reactive({});
    watchEffect(() => {
      defaultKey.value = props.prop;
      if (formType == "Query" && setQueryData) {
        queryData = initQuery();
        if (queryData) {
          setQueryData(queryData);
        }
        defaultKey.value = queryData == null ? void 0 : queryData.key;
      }
      defaultProp.value = defaultKey.value;
      if (props.aIndex > -1) {
        defaultProp.value = `[${props.aIndex}]['${defaultKey.value}']`;
      }
    });
    let startKey = attrs["propStart"];
    let endKey = attrs["propEnd"];
    return (_ctx, _cache) => {
      const _component_Question_Filled = resolveComponent("Question-Filled");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_tooltip = resolveComponent("el-tooltip");
      const _component_el_form_item = resolveComponent("el-form-item");
      return openBlock(), createBlock(_component_el_form_item, {
        ref_key: "formItem",
        ref: formItem,
        label: _ctx.label,
        prop: defaultProp.value,
        rules: itemRules.value
      }, createSlots({
        default: withCtx(() => [
          _ctx.spacer ? (openBlock(), createBlock(unref(ElSpace), {
            key: 0,
            wrap: _ctx.spaceWrap,
            spacer: _ctx.spacer,
            size: _ctx.spaceSize
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["wrap", "spacer", "size"])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps({ key: defaultKey.value, startKey: unref(startKey), endKey: unref(endKey) }))),
          _ctx.tip && _ctx.tipPosition == "right" ? (openBlock(), createBlock(_component_el_tooltip, {
            key: 1,
            placement: "top"
          }, {
            content: withCtx(() => [
              createElementVNode("div", { innerHTML: _ctx.tip }, null, 8, _hoisted_1$B)
            ]),
            default: withCtx(() => [
              createElementVNode("span", _hoisted_2$j, [
                createVNode(_component_el_icon, { style: { "margin-left": "5px", "cursor": "pointer" } }, {
                  default: withCtx(() => [
                    createVNode(_component_Question_Filled)
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.suffixContent ? (openBlock(), createElementBlock("span", {
            key: 2,
            innerHTML: _ctx.suffixContent,
            class: "els-form-item-append"
          }, null, 8, _hoisted_3$b)) : createCommentVNode("", true),
          unref(slots).error ? renderSlot(_ctx.$slots, "error", { key: 3 }) : createCommentVNode("", true)
        ]),
        _: 2
      }, [
        unref(slots).label ? {
          name: "label",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "label")
          ]),
          key: "0"
        } : _ctx.tip && _ctx.tipPosition == "left" ? {
          name: "label",
          fn: withCtx(() => [
            createVNode(_component_el_tooltip, { placement: "top" }, {
              content: withCtx(() => [
                createElementVNode("div", { innerHTML: _ctx.tip }, null, 8, ["innerHTML"])
              ]),
              default: withCtx(() => [
                createElementVNode("span", { class: "els-form-item-label" }, [
                  createTextVNode(toDisplayString(_ctx.label) + " ", 1),
                  createVNode(_component_el_icon, { style: { "margin-left": "5px", "cursor": "pointer" } }, {
                    default: withCtx(() => [
                      createVNode(_component_Question_Filled)
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["label", "prop", "rules"]);
    };
  }
});
const FormItem_vue_vue_type_style_index_0_lang = "";
_sfc_main$Z.install = (app) => {
  app.component(_sfc_main$Z.__name, _sfc_main$Z);
};
const _hoisted_1$A = ["innerHTML"];
const _hoisted_2$i = { key: 1 };
const _hoisted_3$a = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-question" }, null, -1);
const _hoisted_4$7 = ["innerHTML"];
const _hoisted_5$5 = ["innerHTML"];
const _hoisted_6$4 = {
  key: 0,
  class: "el-table-tr-split"
};
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumn" },
  __name: "TableColumn",
  props: {
    prop: {},
    sortable: { type: [String, Boolean] },
    type: {},
    isLocaleString: { type: Boolean },
    isHb: { type: Boolean },
    isTb: { type: Boolean },
    isEdit: { type: Boolean },
    editFields: {},
    isCustomEdit: { type: Boolean },
    sortExpress: {},
    filterable: { type: Boolean },
    dateFormatter: {},
    isExport: { type: Boolean, default: true },
    autoComplete: { type: Boolean, default: true },
    triggerActionName: {},
    triggerMenuId: {},
    headerFormatter: {},
    mergeRow: { type: Boolean },
    mergeRowByFieldname: {},
    mergeFieldname: {},
    mergeMethod: {},
    mergeSum: { type: Boolean },
    showSummary: { type: Boolean },
    summaryMethod: {},
    summaryValue: {},
    trueLabel: { default: "是" },
    falseLabel: { type: [String, Number, Boolean], default: "否" },
    trueValue: { type: [String, Number, Boolean], default: 1 },
    trueClass: {},
    falseClass: { default: "txt-red" },
    enumShowType: { default: "Description" },
    enumEqualType: { default: "Value" },
    enumData: {},
    enumNoneLabel: { default: "未知" },
    hasBottomBorder: { type: Boolean },
    imageStyle: {},
    imageEmptyDesc: {},
    isPreview: { type: Boolean, default: true },
    isFold: { type: Boolean },
    unFoldCount: {},
    selectButtonLabel: { default: "选择" },
    sortMethod: {},
    columnKey: {},
    isAvgDay: { type: Boolean },
    sortData: {},
    tipContent: {},
    align: {},
    headerAlign: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {}
  },
  setup(__props) {
    const props = __props;
    const setEditData = inject("setEditData", () => null);
    const setSortData = inject("setSortData", () => null);
    const setMergeRowData = inject("setMergeRowData", () => null);
    const setSummaryData = inject("setSummaryData", () => null);
    const handleTableSelectRow = inject("handleTableSelectRow", () => null);
    const handlePowerMenu = inject("handlePowerMenu", () => null);
    const rowKey = inject("rowKey", "");
    const tableCheckData = inject("tableCheckData", []);
    const provideData = inject("provideData", {});
    const slots = useSlots();
    const attrs = useAttrs();
    const currColumnKey = ref("");
    const columnSortable = ref(false);
    let columnSortMethod = ref();
    const columnClass = ref("");
    let { $menuField } = lessCom$1.getTableConfig();
    watch(() => props.sortable, (val) => {
      columnSortable.value = val;
    }, { immediate: true });
    watch(() => props.isEdit, (val) => {
      if (setEditData && (props.editFields || props.prop)) {
        setEditData(props.editFields ?? props.prop, val);
      }
    }, { immediate: true });
    watch(() => props.mergeRow, (val) => {
      if (setMergeRowData) {
        const isMergeRow = val || (props.mergeFieldname ? true : false) || (props.mergeRowByFieldname ? true : false) || (props.mergeMethod ? true : false) || props.mergeSum;
        setMergeRowData(props.prop, {
          mergeRow: isMergeRow,
          mergeFieldName: props.mergeFieldname ? props.mergeFieldname : props.prop,
          mergeRowByFieldName: props.mergeRowByFieldname,
          mergeMethod: props.mergeMethod,
          mergeSum: props.mergeSum
        });
      }
    }, { immediate: true });
    watch(() => props.summaryValue, (val) => {
      if (!val) {
        return;
      }
      if (setSummaryData) {
        const isSummary = props.showSummary || (props.summaryValue !== void 0 ? true : false) || (props.summaryMethod ? true : false);
        setSummaryData(props.prop, {
          showSummary: isSummary,
          summaryFieldName: props.prop,
          summaryValue: val,
          summaryMethod: props.summaryMethod
        });
      }
    }, { immediate: true });
    watch(() => props.showSummary, (val) => {
      if (!val) {
        return;
      }
      if (setSummaryData) {
        const isSummary = val || (props.summaryValue !== void 0 ? true : false) || (props.summaryMethod ? true : false);
        setSummaryData(props.prop, {
          showSummary: isSummary,
          summaryFieldName: props.prop,
          summaryValue: props.summaryValue,
          summaryMethod: props.summaryMethod
        });
      }
    }, { immediate: true });
    onErrorCaptured(() => {
      return false;
    });
    onMounted(() => {
      if (props.sortable !== void 0) {
        if (setSortData && props.prop) {
          setSortData({ Key: "Sort_" + props.prop, Info: { QueryFieldName: props.prop, QueryParameterType: "Sort", Value: props.sortExpress } });
        }
      }
    });
    function hasPowerMenu(row) {
      if (!row.PowerMenu || !row.PowerMenu.length) {
        return false;
      }
      return row.PowerMenu.some((ele) => ele.MenuID === props.triggerMenuId || ele.ActionName === props.triggerActionName);
    }
    function handleRowPowerMenu(row) {
      if (handlePowerMenu) {
        if (props.triggerMenuId) {
          handlePowerMenu(row, props.triggerMenuId);
        } else if (props.triggerActionName) {
          handlePowerMenu(row, props.triggerActionName);
        } else {
          ElMessage.error("请设置MenuID或则ActionName");
        }
      }
    }
    function formatterText(val) {
      if (val === void 0) {
        return "";
      }
      let currVal = val;
      if (provideData.avgDay > 0 && props.isAvgDay) {
        currVal = lessCom$1.getAvgDayResult(val, 2, provideData.avgDay);
      }
      if (lessCom$1.isNumber(currVal) && (props.isLocaleString || provideData.isLocaleString)) {
        currVal = parseFloat(currVal).toLocaleString();
      }
      if (props.dateFormatter) {
        currVal = lessCom$1.formatDate(val, props.dateFormatter);
      }
      return currVal;
    }
    function getEnumKeyByValue(row) {
      if (props.enumData[props.enumEqualType] && props.enumData[props.enumShowType]) {
        const enumValue = props.enumData.find((ele) => ele[props.enumEqualType] == row[props.prop ?? ""]);
        if (enumValue) {
          return enumValue[props.enumShowType];
        }
        return props.enumNoneLabel;
      } else {
        let keys = Object.keys(props.enumData).filter((x) => props.enumData[x] == row[props.prop ?? ""]);
        return keys.length > 0 ? keys[0] : null;
      }
    }
    function handleSelectRow(row) {
      let selectTagID = lessCom$1.getUrlParms("Transfer_SelectTagID");
      let multiple = lessCom$1.getUrlParms("Transfer_Multiple");
      if (handleTableSelectRow) {
        handleTableSelectRow(row);
      }
      if (multiple.toLowerCase() == "true") {
        return;
      }
      if (selectTagID) {
        var parent = window.parent;
        if (!parent[selectTagID]) {
          ElMessage.error("父页面接收方法不存在");
        }
        parent[selectTagID](row);
      }
    }
    function getContextMenus(row) {
      const currMenus = [];
      if (provideData.contextMenus) {
        currMenus.push(...provideData.contextMenus);
      }
      if ($menuField) {
        currMenus.push(...row[$menuField]);
      }
      return currMenus;
    }
    currColumnKey.value = props.prop ?? "";
    columnSortMethod = props.sortMethod;
    if (props.columnKey) {
      currColumnKey.value = props.columnKey;
    }
    if (props.isHb) {
      currColumnKey.value += "_HB";
    }
    if (props.isTb) {
      currColumnKey.value += "_TB";
    }
    columnClass.value = "";
    if (provideData.isExport && props.isExport && props.type != "selection" && props.type != "select") {
      columnClass.value += "els-isexport ";
    }
    if (attrs["class-name"]) {
      columnClass.value += attrs["class-name"];
    }
    columnSortable.value = props.sortable === "" ? true : props.sortable;
    if (columnSortable.value === true) {
      columnSortable.value = "custom";
    }
    const align = props.align ?? provideData.align;
    const headAlign = props.headerAlign ?? props.align ?? provideData.headerAlign;
    return (_ctx, _cache) => {
      const _component_el_tooltip = resolveComponent("el-tooltip");
      const _component_els_image = resolveComponent("els-image");
      const _component_el_link = resolveComponent("el-link");
      const _component_els_menu_dropdown = resolveComponent("els-menu-dropdown");
      const _component_el_input = resolveComponent("el-input");
      const _component_els_form_item = resolveComponent("els-form-item");
      const _component_el_table_column = resolveComponent("el-table-column");
      return openBlock(), createBlock(_component_el_table_column, {
        type: _ctx.type,
        prop: _ctx.prop,
        "column-key": currColumnKey.value,
        "class-name": columnClass.value,
        sortable: columnSortable.value,
        "sort-method": unref(columnSortMethod),
        align: unref(align),
        "header-align": unref(headAlign)
      }, createSlots({ _: 2 }, [
        _ctx.$slots["header"] ? {
          name: "header",
          fn: withCtx(({ column, $index }) => [
            renderSlot(_ctx.$slots, "header", {
              column,
              $index
            }, () => [
              _ctx.headerFormatter ? (openBlock(), createElementBlock("span", {
                key: 0,
                innerHTML: _ctx.headerFormatter
              }, null, 8, _hoisted_1$A)) : _ctx.tipContent ? (openBlock(), createElementBlock("span", _hoisted_2$i, [
                createTextVNode(toDisplayString(unref(attrs)["label"]) + " ", 1),
                createVNode(_component_el_tooltip, {
                  content: _ctx.tipContent,
                  placement: "right"
                }, {
                  default: withCtx(() => [
                    _hoisted_3$a
                  ]),
                  _: 1
                }, 8, ["content"])
              ])) : createCommentVNode("", true)
            ])
          ]),
          key: "0"
        } : void 0,
        _ctx.type != "selection" ? {
          name: "default",
          fn: withCtx(({ row, column, $index }) => [
            _ctx.isCustomEdit ? renderSlot(_ctx.$slots, "default", {
              key: 0,
              row,
              column,
              $index
            }, () => [
              _ctx.prop ? (openBlock(), createElementBlock("span", {
                key: 0,
                innerHTML: row[_ctx.prop]
              }, null, 8, _hoisted_4$7)) : createCommentVNode("", true)
            ]) : (!row.edit || !_ctx.isEdit) && _ctx.prop ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              _ctx.type == "image" ? (openBlock(), createBlock(_component_els_image, {
                key: 0,
                "empty-desc": _ctx.imageEmptyDesc,
                url: row[_ctx.prop],
                "is-preview": _ctx.isPreview,
                style: normalizeStyle(_ctx.imageStyle)
              }, null, 8, ["empty-desc", "url", "is-preview", "style"])) : _ctx.type == "enum" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(getEnumKeyByValue(row)), 1)
              ], 64)) : _ctx.type == "bool" && _ctx.prop ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                row[_ctx.prop] == _ctx.trueValue ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(_ctx.trueClass)
                }, toDisplayString(_ctx.trueLabel), 3)) : (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(_ctx.falseClass)
                }, toDisplayString(_ctx.falseLabel), 3))
              ], 64)) : (_ctx.triggerActionName || _ctx.triggerMenuId) && hasPowerMenu(row) ? (openBlock(), createBlock(_component_el_link, {
                key: 3,
                type: "primary",
                onClick: ($event) => handleRowPowerMenu(row)
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {
                    row,
                    column,
                    $index
                  }, () => [
                    createTextVNode(toDisplayString(_ctx.prop ? row[_ctx.prop] : ""), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"])) : renderSlot(_ctx.$slots, "default", {
                key: 4,
                row,
                column,
                $index
              }, () => [
                _ctx.isHb && _ctx.prop ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(unref(lessCom$1).getCompareClass(unref(lessCom$1).getHBResult(row, _ctx.prop)))
                }, toDisplayString(unref(lessCom$1).getHBResult(row, _ctx.prop)), 3)) : _ctx.isTb && _ctx.prop ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(unref(lessCom$1).getCompareClass(unref(lessCom$1).getTBResult(row, _ctx.prop)))
                }, toDisplayString(unref(lessCom$1).getTBResult(row, _ctx.prop)), 3)) : (_ctx.isLocaleString || _ctx.isAvgDay || _ctx.dateFormatter) && _ctx.prop ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  createTextVNode(toDisplayString(formatterText(row[_ctx.prop])), 1)
                ], 64)) : _ctx.prop ? (openBlock(), createElementBlock("span", {
                  key: 3,
                  innerHTML: row[_ctx.prop]
                }, null, 8, _hoisted_5$5)) : createCommentVNode("", true)
              ])
            ], 64)) : !row.edit || !_ctx.isEdit ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              _ctx.type == "operate" ? (openBlock(), createBlock(_component_els_menu_dropdown, {
                menus: getContextMenus(row),
                key: row,
                "is-fold": _ctx.isFold,
                "un-fold-count": _ctx.unFoldCount,
                "is-mobile": unref(attrs)["is-mobile"]
              }, null, 8, ["menus", "is-fold", "un-fold-count", "is-mobile"])) : _ctx.type == "select" ? (openBlock(), createBlock(unref(ElButton), {
                key: 1,
                onClick: ($event) => handleSelectRow(row),
                type: unref(tableCheckData).checkRowKeys.indexOf(row[unref(rowKey)]) > -1 ? "info" : "primary"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(tableCheckData).checkRowKeys.indexOf(row[unref(rowKey)]) > -1 ? "取消选择" : _ctx.selectButtonLabel), 1)
                ]),
                _: 2
              }, 1032, ["onClick", "type"])) : _ctx.type == "expand" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                renderSlot(_ctx.$slots, "default", {
                  row,
                  column,
                  $index
                }),
                _ctx.hasBottomBorder ? (openBlock(), createElementBlock("div", _hoisted_6$4)) : createCommentVNode("", true)
              ], 64)) : renderSlot(_ctx.$slots, "default", {
                key: 3,
                row,
                column,
                $index
              })
            ], 64)) : _ctx.prop ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
              createCommentVNode("", true),
              renderSlot(_ctx.$slots, "formitem", {
                row,
                column,
                $index
              }, () => [
                unref(slots).edit ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(slots).edit({ row })[0].children, (vnode) => {
                  return openBlock(), createBlock(resolveDynamicComponent(vnode), {
                    key: `[${$index}]['${_ctx.prop}']`,
                    prop: _ctx.prop,
                    aIndex: $index
                  }, null, 8, ["prop", "aIndex"]);
                }), 128)) : (openBlock(), createBlock(_component_els_form_item, {
                  prop: `[${$index}]['${_ctx.prop}']`,
                  key: `[${$index}]['${_ctx.prop}']`,
                  required: _ctx.required,
                  requiredMessage: _ctx.requiredMessage,
                  validMessage: _ctx.validMessage,
                  validExpression: _ctx.validExpression,
                  validMethod: _ctx.validMethod,
                  validTrigger: _ctx.validTrigger
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      name: _ctx.prop,
                      clearable: "",
                      placeholder: "请输入" + unref(attrs)["label"],
                      modelValue: row[_ctx.prop],
                      "onUpdate:modelValue": ($event) => row[_ctx.prop] = $event
                    }, null, 8, ["name", "placeholder", "modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 2
                }, 1032, ["prop", "required", "requiredMessage", "validMessage", "validExpression", "validMethod", "validTrigger"]))
              ])
            ], 64)) : createCommentVNode("", true)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["type", "prop", "column-key", "class-name", "sortable", "sort-method", "align", "header-align"]);
    };
  }
});
const _hoisted_1$z = {
  key: 0,
  class: "select_container"
};
const _hoisted_2$h = { key: 0 };
const _hoisted_3$9 = {
  key: 0,
  class: "leo-bottom-scroll-fixed"
};
const _hoisted_4$6 = {
  key: 1,
  class: "pagination-container",
  style: { "margin-top": "10px" }
};
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsTable", inheritAttrs: false },
  __name: "Table",
  props: {
    tableName: {},
    url: {},
    queryData: { default: {} },
    saveUrl: {},
    rowKey: { default: "" },
    rowClassName: {},
    data: {},
    hasPage: { type: Boolean, default: true },
    pageSize: { default: 20 },
    pageTotal: {},
    recordCount: {},
    pageSizes: { default: [10, 20, 30, 40, 50, 100] },
    pageIndex: { default: 1 },
    pageLayout: { default: "total,slot, sizes, prev, pager, next, jumper" },
    isCustomPageSize: { type: Boolean },
    hasBottomFixdScroll: { type: Boolean, default: true },
    isLocaleString: { type: Boolean },
    isExport: { type: Boolean, default: true },
    isClientSort: { type: Boolean },
    isClientPage: { type: Boolean },
    isClientSearch: { type: Boolean },
    dragRow: { type: Boolean },
    align: { default: "center" },
    headerAlign: {},
    initReadData: { type: Boolean, default: true },
    isReadDataClearCheckRowKey: { type: Boolean, default: true },
    isPostCheckRowData: { type: Boolean },
    isPostNoCheckRow: { type: Boolean },
    checkRowKeys: {},
    checkRows: {},
    extraPowerMenus: {},
    loading: { type: Boolean },
    spanMethod: {},
    showSummary: { type: Boolean },
    showCheckField: {},
    showEditColumn: { type: Boolean, default: true },
    summaryMethod: {},
    beforeSave: {},
    beforeReadData: {},
    afterReadData: {},
    headerStickyTop: { type: [Number, Boolean], default: -1 },
    editStatus: { type: Boolean },
    beforeTriggerContextMenu: {},
    contextMenus: {},
    hasContextMenu: { type: Boolean, default: true }
  },
  emits: ["update:check-rows", "update:check-row-keys", "dragMove", "dragEnd", "update:editStatus"],
  setup(__props, { expose: __expose, emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    const { $idField, $actionNameField } = lessCom$1.getMenuConfig();
    const { $pageDataField, $menuField, $pageSizeField, $currentPageField, $totalField, $pageCountField, $avgDayField } = lessCom$1.getTableConfig();
    const tagID = "els_table_" + lessCom$1.Guid32();
    const wrapTagID = "els-wrap-" + tagID;
    const queryFormData = ref({});
    let currSaveUrl = ref("");
    let currHeaderStickyTop = ref(-1);
    let dataLoading = ref(false);
    let saveDataLoading = ref(false);
    let currPageSize = ref(0);
    let currPageIndex = ref(1);
    let currPageTotal = ref(0);
    let currRecourdCount = ref(0);
    const tableData = reactive([]);
    const sourceTableData = reactive([]);
    let editSourceTableData = reactive([]);
    let rowData = reactive({});
    let currContextMenus = reactive([]);
    let contextMenuVisible = ref(false);
    let contextMenuPositionLeft = ref(0);
    let contextMenuPositionTop = ref(0);
    let sortSelectRow = reactive({});
    let currShowSummary = ref(false);
    let currSpanMethod;
    let currSummaryMethod;
    let currSortChange;
    let columnEditData = reactive([]);
    let columnSortData = reactive({});
    let columnMergeData = reactive([]);
    let columnSummaryData = reactive([]);
    let isFirstReadData = ref(true);
    let tableCheckData = reactive({ checkRows: [], checkRowKeys: [] });
    let provideData = reactive({ avgDay: 0, isLocaleString: false, isClientPage: false, isClientSearch: false, align: "", headerAlign: "", isExport: true, contextMenus: props.contextMenus });
    let tableBodyWidth = ref("");
    let scrollLeft = ref("");
    let isMobile = ref(false);
    let mobilePageLayout = "total, prev, next, jumper";
    const bottomScroll = ref();
    const dataTable = ref();
    const tableForm = ref();
    const contentMenu = ref();
    let tableContainer = h("div", { class: "table-container" });
    let tableFormContainer = h(_sfc_main$$, { modelValue: tableData, class: "table-form-container", labelWidth: "0", showMessage: false });
    watch(() => props.isLocaleString, (val) => {
      provideData.isLocaleString = val;
    }, { immediate: true });
    if (props.data && props.data[$pageDataField]) {
      watch(() => props.data[$pageDataField], (val) => {
        if (val) {
          if (props.isReadDataClearCheckRowKey) {
            tableCheckData.checkRowKeys.length = 0;
            tableCheckData.checkRows.length = 0;
          }
          initTableData(props.data);
        }
      }, { deep: true });
    }
    watch(() => props.data, (val) => {
      if (Array.isArray(val)) {
        if (props.isReadDataClearCheckRowKey) {
          tableCheckData.checkRowKeys.length = 0;
          tableCheckData.checkRows.length = 0;
        }
        initTableData(val);
      }
    });
    watch(tableData, () => {
      updateBottomScroll();
    }, { immediate: true });
    watch(() => props.pageSize, (val) => {
      currPageSize.value = val;
    });
    watch(() => props.pageTotal, (val) => {
      currPageSize.value = val ?? 0;
    });
    watch(() => props.recordCount, (val) => {
      currRecourdCount.value = val ?? 0;
    });
    watch(() => props.pageIndex, (val) => {
      currPageIndex.value = val;
    });
    watch(() => props.loading, (val) => {
      dataLoading.value = val;
    }, { immediate: true });
    watch(() => props.headerStickyTop, (val) => {
      if (val === true) {
        currHeaderStickyTop.value = 0;
      } else if (typeof val === "number") {
        currHeaderStickyTop.value = val;
      }
    }, { immediate: true });
    watch(columnMergeData, (val) => {
      if (val && val.length) {
        currSpanMethod = handleSpanMethod;
      }
    }, { immediate: true });
    watch(tableCheckData, (val) => {
      emits("update:check-rows", lessCom$1.cloneObj(val.checkRows));
      emits("update:check-row-keys", lessCom$1.cloneObj(val.checkRowKeys));
    }, { deep: true });
    const currRowClassName = computed(() => {
      if (props.rowClassName) {
        return props.rowClassName;
      }
      return tableRowClassName;
    });
    const isShowEditColumn = computed(() => {
      return props.saveUrl && columnEditData.filter((ele) => ele.isEdit).length;
    });
    const isEdit = computed(() => {
      return columnEditData.filter((ele) => ele.isEdit).length > 0;
    });
    provide("tableData", tableData);
    provide("provideData", provideData);
    provide("rowKey", props.rowKey);
    provide("setEditData", setEditData);
    provide("setSortData", setSortData);
    provide("setMergeRowData", setMergeRowData);
    provide("setSummaryData", setSummaryData);
    provide("handleTableSelectRow", handleTableSelectRow);
    provide("tableCheckData", tableCheckData);
    provide("handlePowerMenu", handlePowerMenu);
    isMobile.value = navigator.userAgent.indexOf("Mobile") > -1;
    function handleTableBodyScroll(data) {
      if (scrollLeft != data.scrollLeft) {
        scrollLeft = data.scrollLeft;
        bottomScroll.value.setScrollLeft(data.scrollLeft);
      }
    }
    function handleBottomFixedScroll(data) {
      if (scrollLeft != data.scrollLeft) {
        scrollLeft = data.scrollLeft;
        dataTable.value.setScrollLeft(data.scrollLeft);
      }
    }
    function updateBottomScroll() {
      if (props.hasBottomFixdScroll && !isMobile) {
        nextTick(() => {
          setTimeout(function() {
            if (dataTable.value) {
              tableBodyWidth.value = parseFloat(dataTable.value.bodyWidth) + "px";
              setTimeout(() => {
                if (bottomScroll.value) {
                  bottomScroll.value.update();
                }
              }, 50);
            }
          }, 50);
        });
      }
    }
    function getTableSelectionWithQuery(hasQuery) {
      const keyData = getTableSelection();
      if (hasQuery) {
        let searchQueryData = Object.assign({}, props.queryData ?? {}, columnSortData, queryFormData.value);
        searchQueryData.PageSize = { Value: currPageSize.value };
        searchQueryData.PageIndex = { Value: currPageIndex.value - 1 };
        const queryData = lessCom$1.getQueryData(searchQueryData);
        return Object.assign({}, keyData, queryData);
      }
      return keyData;
    }
    function getTableSelection(isPostCheckRowData = false, isPostNoCheckRow = false) {
      if (isPostCheckRowData === false) {
        isPostCheckRowData = props.isPostCheckRowData;
      }
      if (isPostNoCheckRow === false) {
        isPostNoCheckRow = props.isPostNoCheckRow;
      }
      if (isPostCheckRowData) {
        let keyData = {};
        keyData["selectRows"] = JSON.stringify(tableCheckData.checkRows);
        return keyData;
      } else {
        let keyData = {};
        if (props.rowKey) {
          const currRowKey = props.rowKey.toString();
          keyData[currRowKey] = tableCheckData.checkRowKeys.toString();
          if (isPostNoCheckRow) {
            keyData["No" + props.rowKey] = tableData.map((ele) => ele[currRowKey]).filter((ele) => {
              return tableCheckData.checkRowKeys.indexOf(ele) == -1;
            }).toString();
          }
        }
        return keyData;
      }
    }
    function setDragSortable() {
      if (props.dragRow) {
        new Sortable(dataTable.value.$el.querySelector(".el-table__body-wrapper tbody"), {
          handle: ".leo-table-drag",
          draggable: ".el-table__row",
          // 允许拖拽的项目类名
          // 拖拽中 回调函数
          onMove(customEvent) {
            emits("dragMove", customEvent);
          },
          onStart() {
          },
          // 拖拽结束，调整位置
          onEnd({ newIndex, oldIndex }) {
            if (newIndex !== void 0 && oldIndex !== void 0) {
              if (oldIndex > -1 && newIndex > -1) {
                const startRow = tableData[oldIndex];
                const endRow = tableData[newIndex];
                const currRow = tableData.splice(oldIndex, 1)[0];
                tableData.splice(newIndex, 0, currRow);
                emits("dragEnd", { startRow, endRow });
              }
            }
          }
        });
      }
    }
    function setEditData(fields, isEdit2) {
      if (!fields) {
        return;
      }
      fields.split(",").forEach((field) => {
        let currIndex = columnEditData.findIndex((ele) => ele.fieldName == field);
        if (currIndex > -1) {
          columnEditData.splice(currIndex, 1);
        }
        columnEditData.push({ fieldName: field, isEdit: isEdit2 });
        columnEditData = columnEditData.filter((ele) => ele.isEdit);
      });
    }
    function setSortData(sortData) {
      if (!sortData) {
        return;
      }
      columnSortData[sortData.Key] = {
        QueryFieldName: sortData.Info["QueryFieldName"],
        QueryParameterType: sortData.Info["QueryParameterType"],
        Value: sortData.Info["Value"]
      };
    }
    function setMergeRowData(field, mergeData) {
      if (!field) {
        return;
      }
      let currIndex = columnMergeData.findIndex((ele) => ele.fieldName == field);
      if (currIndex > -1) {
        columnMergeData.splice(currIndex, 1);
      }
      if (mergeData.mergeRow) {
        columnMergeData.push({ fieldName: field, mergeData });
        columnMergeData = columnMergeData.filter((ele) => ele.mergeData.mergeRow);
      }
      if (!currSpanMethod) {
        currSpanMethod = handleSpanMethod;
      }
    }
    function setSummaryData(field, summaryData) {
      if (!field) {
        return;
      }
      let currIndex = columnSummaryData.findIndex((ele) => ele.fieldName == field);
      if (currIndex > -1) {
        columnSummaryData.splice(currIndex, 1);
      }
      columnSummaryData.push({ fieldName: field, summaryData });
      columnSummaryData = columnSummaryData.filter((ele) => ele.summaryData.showSummary);
      if (!currSummaryMethod) {
        currSummaryMethod = handleSummaryMethod;
        currShowSummary.value = true;
      }
    }
    function initData() {
      if (props.headerStickyTop === true) {
        currHeaderStickyTop.value = 0;
      } else if (typeof props.headerStickyTop == "number") {
        currHeaderStickyTop.value = props.headerStickyTop;
      } else {
        currHeaderStickyTop.value = -1;
      }
      currPageSize.value = props.pageSize;
      currPageIndex.value = props.pageIndex;
      provideData.isExport = props.isExport;
      provideData.isClientPage = props.isClientPage;
      provideData.isClientSearch = props.isClientSearch;
      provideData.align = props.align;
      provideData.headerAlign = props.headerAlign ?? props.align;
      currSaveUrl.value = props.saveUrl ?? "";
      if (props.data) {
        initTableData(props.data);
      }
    }
    function initTableData(val) {
      if (Array.isArray(val)) {
        sourceTableData.length = 0;
        sourceTableData.push(...val);
      } else if (val[$pageDataField]) {
        sourceTableData.length = 0;
        sourceTableData.push(...val[$pageDataField]);
        if (val[$pageSizeField] !== void 0 && !props.isClientPage) {
          currPageSize.value = val[$pageSizeField];
        }
        if (val[$currentPageField] !== void 0) {
          currPageIndex.value = val[$currentPageField] + 1;
        }
        if (val[$totalField] !== void 0) {
          currRecourdCount.value = val[$totalField];
        }
        if (val[$pageCountField] !== void 0) {
          currPageTotal.value = val[$pageCountField];
        }
        if ($avgDayField && val[$avgDayField]) {
          provideData.avgDay = val[$avgDayField];
        }
      } else {
        sourceTableData.length = 0;
      }
      if (props.isClientSearch || props.isClientPage) {
        clientTableData();
      } else {
        tableData.length = 0;
        tableData.push(...sourceTableData);
      }
      editSourceTableData = lessCom$1.cloneObj(sourceTableData);
      setTableCheckRows();
    }
    function setTableCurrentRow(id) {
      if (dataTable.value && props.rowKey) {
        let currRow = tableData.find((ele) => ele[props.rowKey.toString()] == id);
        if (currRow) {
          dataTable.value.setCurrentRow(currRow);
        }
      }
    }
    function validTableForm(postData = []) {
      return new Promise((resolve) => {
        if (!columnEditData.length) {
          ElMessage.error("没有编辑的行");
          return resolve(false);
        }
        if (!postData.length) {
          tableData.forEach((row) => {
            if (row.edit) {
              var postItem = {};
              postItem[props.rowKey] = row[props.rowKey];
              columnEditData.forEach((ele) => {
                postItem[ele.fieldName] = row[ele.fieldName];
              });
              postData.push(postItem);
            }
          });
        }
        if (postData.length > 1) {
          tableForm.value.validate().then((res) => {
            if (res) {
              resolve(postData);
            }
          }).catch((action) => {
            console.log(action);
            resolve(false);
          });
        } else {
          validEditRow(postData[0]).then(() => {
            resolve(postData);
          }).catch((action) => {
            console.log(action);
            resolve(false);
          });
        }
      }).catch((action) => {
        console.log(action);
        ElMessage.error("数据异常，保存失败！请联系技术解决！");
      });
    }
    function saveTableData(url, postData = []) {
      return new Promise((resolve, reject) => {
        validTableForm(postData).then((validData) => {
          if (validData !== false) {
            if (props.beforeSave) {
              props.beforeSave();
            }
            if (!url) {
              url = currSaveUrl.value;
            }
            if (!url) {
              ElMessage.error("请设置保存地址");
              return resolve(false);
            }
            if (validData.length == 1) {
              let currRow = tableData.find((ele) => ele[props.rowKey] == validData[0][props.rowKey]);
              if (currRow) {
                currRow.saveDataLoading = true;
              }
            } else {
              saveDataLoading.value = true;
            }
            url.post({ tabledata: JSON.stringify(validData) }).then((res) => {
              saveDataLoading.value = false;
              tableData.forEach((ele) => {
                ele.saveDataLoading = false;
              });
              tableForm.value.handleSubmitButton();
              if (res[$codeField] != "0") {
                ElMessage.error(res[$messageField]);
              } else {
                if (!res.EventActionData) {
                  ElMessage.success("保存成功");
                  compatibleReadData();
                } else {
                  elsApiResult(res);
                }
              }
              resolve(res);
            }).catch((action) => {
              saveDataLoading.value = false;
              tableData.forEach((ele) => {
                ele.saveDataLoading = false;
              });
              reject(action);
            });
          }
        });
      });
    }
    function handleTableRowClick(row) {
      rowData = row;
    }
    function handleTableRowDblClick(row) {
      handleRowEdit(row, tableData.findIndex((ele) => ele[props.rowKey] == row[props.rowKey]));
    }
    function editTable() {
      tableData.forEach((ele) => {
        ele.edit = true;
      });
      emits("update:editStatus", true);
    }
    function unEditTable() {
      tableData.forEach((row, index) => {
        let sourceRow = editSourceTableData.find((ele) => ele[props.rowKey] == row[props.rowKey]);
        if (sourceRow) {
          for (const key in sourceRow) {
            if (tableData[index].hasOwnProperty(key)) {
              tableData[index][key] = sourceRow[key];
            }
          }
          row.edit = false;
          sourceRow.edit = false;
        }
      });
      emits("update:editStatus", false);
    }
    function handleRowEdit(row, index) {
      if (isEdit) {
        if (row.edit) {
          let sourceRow = editSourceTableData.find((ele) => ele[props.rowKey] == row[props.rowKey]);
          if (sourceRow) {
            for (const key in sourceRow) {
              if (tableData[index].hasOwnProperty(key)) {
                tableData[index][key] = sourceRow[key];
              }
            }
            sourceRow.edit = false;
          }
          row.edit = false;
        } else {
          row.edit = true;
        }
        if (props.saveUrl) {
          if (tableData.find((ele) => ele["edit"] === true)) {
            emits("update:editStatus", true);
          } else {
            emits("update:editStatus", false);
          }
        }
      }
    }
    function handleRowSave(row) {
      if (!props.rowKey) {
        ElMessage.error("主键ID不存在，请设置RowKey");
        return;
      }
      let postItem = {};
      postItem[props.rowKey] = row[props.rowKey];
      if (!columnEditData.length) {
        return;
      }
      columnEditData.forEach((ele) => {
        postItem[ele.fieldName] = row[ele.fieldName];
      });
      let postData = [postItem];
      saveTableData(currSaveUrl.value, postData);
    }
    function validEditRow(row) {
      let validFields = [];
      let rowIndex = tableData.findIndex((ele) => ele[props.rowKey] == row[props.rowKey]);
      if (rowIndex == -1) {
        ElMessage.error(`【${row[props.rowKey]}】当前行未找到`);
      }
      for (let key in row) {
        validFields.push(`[${rowIndex}]['${key}']`);
      }
      return tableForm.value.validateField(validFields);
    }
    function handleTableSelectSortRow() {
      sortSelectRow = lessCom$1.cloneObj(rowData);
    }
    function handleTableRowMoveHere(url) {
      url.post({ selectID: sortSelectRow[props.rowKey], moveID: rowData[props.rowKey] }).then((res) => {
        if (!res || res[$codeField] != "0") {
          ElMessage.error(res[$messageField]);
        } else {
          ElMessage.success("移动成功");
          readData();
        }
      });
    }
    function handleTableRowExchangeMove(url) {
      url.post({ selectID: sortSelectRow[props.rowKey], moveID: rowData[props.rowKey] }).then((res) => {
        if (!res || res[$codeField] != "0") {
          ElMessage.error(res[$messageField]);
        } else {
          ElMessage.success("移动成功");
          readData();
        }
      });
    }
    function tableRowClassName({ row }) {
      if (props.rowKey) {
        if (sortSelectRow && sortSelectRow[props.rowKey] && row[props.rowKey] == sortSelectRow[props.rowKey]) {
          return "table_selectrow";
        } else {
          if (tableCheckData.checkRowKeys && tableCheckData.checkRowKeys.indexOf(row[props.rowKey]) > -1) {
            return "table_checkrow";
          }
          return "";
        }
      }
    }
    function handleTableSelectRow(row) {
      var index = tableCheckData.checkRowKeys.indexOf(row[props.rowKey]);
      if (index == -1) {
        dataTable.value.toggleRowSelection(row, true);
      } else {
        dataTable.value.toggleRowSelection(row, false);
      }
      handleTableSelect(null, row);
    }
    function handleTableSelect(selection, row) {
      console.log(selection);
      if (row[props.rowKey]) {
        var index = tableCheckData.checkRowKeys.indexOf(row[props.rowKey]);
        if (index == -1) {
          tableCheckData.checkRowKeys.push(row[props.rowKey]);
          tableCheckData.checkRows.push(row);
        } else {
          tableCheckData.checkRows.splice(index, 1);
          tableCheckData.checkRowKeys.splice(index, 1);
        }
      }
    }
    function handleTableSelectAll(selection) {
      if (selection.length > 0) {
        selection.forEach((ele) => {
          var index = tableCheckData.checkRowKeys.indexOf(ele[props.rowKey]);
          if (index == -1) {
            tableCheckData.checkRowKeys.push(ele[props.rowKey]);
            tableCheckData.checkRows.push(ele);
          }
        });
      } else {
        tableData.forEach((ele) => {
          var index = tableCheckData.checkRowKeys.indexOf(ele[props.rowKey]);
          if (index > -1) {
            tableCheckData.checkRowKeys.splice(index, 1);
            tableCheckData.checkRows.splice(index, 1);
          }
        });
      }
    }
    function handleRowContextMenu(row, column, event) {
      if (!props.hasContextMenu) {
        return;
      }
      if (!$menuField) {
        console.log("未设置全局配置$lessConfig，无法使用菜单");
        return;
      }
      console.log(column);
      if (!row[$menuField] || !row[$menuField].length) {
        return;
      }
      if (event.target.className.indexOf("el-image-viewer") > -1) {
        return;
      }
      var currEvent = event;
      rowData = row;
      if (props.beforeTriggerContextMenu) {
        props.beforeTriggerContextMenu(row);
      }
      currContextMenus.length = 0;
      if (props.contextMenus) {
        currContextMenus.push(...props.contextMenus);
      }
      if ($menuField && row[$menuField]) {
        currContextMenus.push(...row[$menuField]);
      }
      contextMenuPositionLeft.value = currEvent.clientX;
      contextMenuPositionTop.value = currEvent.clientY;
      contextMenuVisible.value = true;
      currEvent.returnValue = false;
      dataTable.value.setCurrentRow(row);
    }
    function handleSpanMethod({ row, column, rowIndex }) {
      var rowSpan = 1;
      var colSpan = 1;
      if (columnMergeData.length && column.columnKey) {
        let currTableData = tableData;
        let mergeAttrData = columnMergeData.find((ele) => ele.fieldName == column.columnKey && ele.mergeData.mergeRow === true);
        if (mergeAttrData) {
          mergeAttrData = mergeAttrData.mergeData;
        }
        if (mergeAttrData) {
          const mergeFieldName = mergeAttrData.mergeFieldName;
          let mergeByFieldName = mergeFieldName;
          if (mergeAttrData.mergeRowByFieldName) {
            mergeByFieldName = mergeAttrData.mergeRowByFieldName;
          }
          let currRowValue = lessCom$1.getObjectKey(row, mergeByFieldName);
          if (currTableData.findIndex((ele) => lessCom$1.getObjectKey(ele, mergeByFieldName) === currRowValue) === rowIndex) {
            let currRows = currTableData.filter((ele) => lessCom$1.getObjectKey(ele, mergeByFieldName) === currRowValue);
            rowSpan = currRows.length;
            colSpan = 1;
            if (mergeAttrData.mergeSum) {
              row[column.columnKey] = lessCom$1.sumArray(currRows.map((ele) => ele[mergeFieldName]));
            } else if (mergeAttrData.mergeMethod) {
              row[column.columnKey] = mergeAttrData.mergeMethod(currRows, column);
            }
          } else {
            if (mergeAttrData.mergeSum || mergeAttrData.mergeMethod) {
              row[column.columnKey] = 0;
            }
            rowSpan = 0;
            colSpan = 0;
          }
        }
      }
      return {
        rowspan: rowSpan,
        colspan: colSpan
      };
    }
    function handleSummaryMethod(param) {
      let sums = [];
      param.columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合";
        } else {
          let currSummary = columnSummaryData.map((ele) => ele.summaryData).filter((ele) => ele.showSummary).find((ele) => ele.summaryFieldName == column.columnKey);
          if (currSummary) {
            if (currSummary.summaryMethod) {
              sums[index] = currSummary["summaryMethod"](column, param.tableRef);
            } else if (currSummary.summaryValue) {
              sums[index] = currSummary.summaryValue;
            } else {
              sums[index] = lessCom$1.sumArray(sourceTableData.map((ele) => ele[currSummary.summaryFieldName]));
            }
          } else {
            sums[index] = "";
          }
        }
      });
      return sums;
    }
    function clientTableData() {
      let clientData = lessCom$1.cloneObj(sourceTableData);
      if (props.isClientSearch) {
        clientData = clientTableSearchData(clientData);
      }
      if (props.isClientPage) {
        clientData = clientTablePageData(clientData);
      }
      tableData.length = 0;
      tableData.push(...clientData);
      setTableCheckRows();
    }
    function clientTablePageData(data) {
      var pageData = lessCom$1.pageArray(data, currPageIndex.value - 1, currPageSize.value);
      if (pageData.length === 0) {
        pageData = lessCom$1.pageArray(data, 0, currPageSize.value);
      }
      currRecourdCount.value = data.length;
      return pageData;
    }
    function clientTableSearchData(data) {
      let currQueryData = Object.assign({}, props.queryData ?? {}, columnSortData, queryFormData.value);
      if (!currQueryData) {
        return data;
      }
      let filterData = data.filter((ele) => {
        var isTrue = true;
        for (let key in currQueryData) {
          let currQuery = currQueryData[key];
          let currFieldName = currQuery["QueryFieldName"];
          if (!currFieldName) {
            continue;
          }
          var currValue = currQuery.Value;
          var currType = currQuery.QueryDataType;
          if (currValue === "" || currQuery.QueryParameterType == "NoQuery" || currQuery.QueryParameterType == "Sort" || currQuery.QueryType == "Parm") {
            continue;
          }
          if (key.startsWith("StartDate_") || key.startsWith("Start_")) {
            isTrue = ele[currFieldName] >= currValue;
          } else if (key.startsWith("EndDate_") || key.startsWith("End_")) {
            isTrue = ele[currFieldName] <= currValue;
          } else {
            if (currType == "Int") {
              isTrue = ele[currFieldName] == currValue;
            } else {
              isTrue = ele[currFieldName] && ele[currFieldName].toString().toLowerCase().includes(currValue.toLowerCase());
            }
          }
          if (!isTrue) {
            return isTrue;
          }
        }
        return isTrue;
      });
      currRecourdCount.value = filterData.length;
      return filterData;
    }
    function query(initPage = true, queryData = {}, isFirstPage = true) {
      queryFormData.value = queryData;
      if (isFirstPage) {
        currPageIndex.value = 1;
      }
      if (initPage) {
        if (props.url) {
          return readData();
        }
      } else {
        return compatibleReadData();
      }
    }
    function searchData(queryData = {}, isFirstPage = true) {
      queryFormData.value = queryData;
      if (isFirstPage) {
        currPageIndex.value = 1;
      }
      return compatibleReadData();
    }
    function readData() {
      if (!props.url) {
        return;
      }
      let searchQueryData = Object.assign({}, props.queryData ?? {}, columnSortData, queryFormData.value);
      searchQueryData.PageSize = { Value: currPageSize.value };
      searchQueryData.PageIndex = { Value: currPageIndex.value - 1 };
      if (props.beforeReadData) {
        props.beforeReadData();
      }
      dataLoading.value = true;
      let currQueryData = lessCom$1.getQueryData(searchQueryData);
      return props.url.post(currQueryData).then((res) => {
        if (res[$codeField] === $success) {
          if (res[$dataField][$pageSizeField] != void 0) {
            sourceTableData.length = 0;
            sourceTableData.push(...res[$dataField][$pageDataField]);
            if (!props.isClientPage) {
              currPageSize.value = res[$dataField][$pageSizeField];
            }
            currPageIndex.value = res[$dataField][$currentPageField] + 1;
            currRecourdCount.value = res[$dataField][$totalField];
            currPageTotal.value = res[$dataField][$pageCountField];
          } else {
            sourceTableData.length = 0;
            sourceTableData.push(...res[$dataField]);
          }
          if (props.isClientSearch || props.isClientPage) {
            clientTableData();
          } else {
            tableData.length = 0;
            tableData.push(...sourceTableData);
          }
          editSourceTableData = lessCom$1.cloneObj(sourceTableData);
          if ($avgDayField && res[$dataField][$avgDayField]) {
            provideData.avgDay = res[$dataField][$avgDayField];
          }
        } else {
          ElMessage.error(res[$messageField]);
        }
        dataLoading.value = false;
        if (props.afterReadData) {
          props.afterReadData();
        }
        if (props.isReadDataClearCheckRowKey && !isFirstReadData) {
          tableCheckData.checkRowKeys.length = 0;
          tableCheckData.checkRows.length = 0;
        }
        isFirstReadData.value = false;
        margePowerMenu();
        setTableCheckRows();
      }).catch((error) => {
        dataLoading.value = false;
        console.log(error);
        ElMessage.error("数据加载失败！");
      });
    }
    function initTableCheckRows(defaultCheckRow) {
      if (defaultCheckRow) {
        dataTable.value.clearSelection();
        tableCheckData.checkRows = defaultCheckRow;
        if (props.rowKey && defaultCheckRow) {
          tableCheckData.checkRowKeys = defaultCheckRow.map((obj) => {
            return obj[props.rowKey];
          });
        }
        setTableCheckRows();
      }
    }
    function initTableCheckKeys(checkRowKeys) {
      if (checkRowKeys) {
        tableCheckData.checkRows = tableData.filter((ele) => checkRowKeys.indexOf(ele[props.rowKey]) > -1);
        tableCheckData.checkRowKeys = tableCheckData.checkRows.map((ele) => ele[props.rowKey]);
        dataTable.value.clearSelection();
        setTableCheckRows(tableCheckData.checkRowKeys);
      }
    }
    function toggleRowSelection(item, checked) {
      dataTable.value.toggleRowSelection(item, checked);
    }
    function setTableCheckRows(checkRowKeys = null) {
      nextTick(() => {
        if (props.rowKey && tableData.length) {
          tableData.forEach((ele) => {
            if (ele[props.rowKey]) {
              if (checkRowKeys) {
                if (checkRowKeys.indexOf(ele[props.rowKey]) > -1) {
                  tableCheckData.checkRowKeys = lessCom$1.cloneObj(checkRowKeys);
                  dataTable.value.toggleRowSelection(ele, true);
                }
              } else {
                if (tableCheckData.checkRowKeys.indexOf(ele[props.rowKey]) > -1) {
                  dataTable.value.toggleRowSelection(ele, true);
                }
              }
            }
          });
        }
      });
    }
    function handlePowerMenu(row, menuID) {
      if (!$menuField) {
        ElMessage.warning("未设置全局配置$lessConfig，无法使用菜单");
        return;
      }
      if (!row[$menuField]) {
        ElMessage.error("菜单不存在");
        return;
      }
      setTimeout(() => {
        var currPowerMenu = row[$menuField].find((ele) => ele[$idField] === menuID || ele[$actionNameField] === menuID);
        if (!currPowerMenu) {
          ElMessage.error("菜单不存在");
          return;
        }
        contentMenu.value.handleCommand(currPowerMenu);
      }, 150);
    }
    function margePowerMenu() {
      if (tableData && props.extraPowerMenus) {
        tableData.forEach((ele) => {
          ele[$menuField].push(...props.extraPowerMenus);
        });
      }
    }
    function handleSortTable(column) {
      if (props.isClientPage || props.isClientSearch || props.isClientSort) {
        sortTableData(column.prop, column.order);
        return;
      }
      let prop = column.prop;
      if (!prop) {
        return;
      }
      let columnSort = "";
      if (column.order === "ascending") {
        columnSort = "Asc";
      } else if (column.order === "descending") {
        columnSort = "Desc";
      }
      if (columnSortData["Sort_" + prop]) {
        columnSortData["Sort_" + prop].Value = columnSort;
      }
      currPageIndex.value = 1;
      compatibleReadData();
    }
    function sortTableData(fieldName, order) {
      if (order == "ascending") {
        lessCom$1.orderBy(sourceTableData, fieldName);
      } else if (order == "descending") {
        lessCom$1.orderByDescending(sourceTableData, fieldName);
      }
      clientTableData();
    }
    function getPageInfo() {
      return { pageSize: currPageSize.value, pageIndex: currPageIndex.value };
    }
    function setPageInfo(pageInfo) {
      if (pageInfo) {
        currPageSize.value = pageInfo.pageSize;
        currPageIndex.value = pageInfo.pageIndex;
      }
    }
    function changePageReadData() {
      if (props.isClientPage) {
        clientTableData();
        return;
      }
      return compatibleReadData();
    }
    function compatibleReadData() {
      if (props.isClientSearch) {
        return new Promise((resolve) => {
          clientTableData();
          return resolve(true);
        });
      }
      if (props.url) {
        return readData();
      }
    }
    function handleChangePage(val) {
      currPageIndex.value = val;
      changePageReadData();
      emits("update:editStatus", false);
    }
    function handleChangePageSize(val) {
      currPageSize.value = val;
      changePageReadData();
      emits("update:editStatus", false);
    }
    function handleDragCheckItem() {
      tableCheckData.checkRowKeys = tableCheckData.checkRows.map((ele) => ele[props.rowKey]);
    }
    function handleCloseCheckItem(item) {
      lessCom$1.removeArrayItem(tableCheckData.checkRows, item);
      tableCheckData.checkRowKeys = tableCheckData.checkRows.map((ele) => ele[props.rowKey]);
      let currRow = tableData.find((ele) => ele[props.rowKey] == item[props.rowKey]);
      if (currRow) {
        dataTable.value.toggleRowSelection(currRow, false);
      }
    }
    function exportTable() {
      if (props.isClientPage || !props.url) {
        exportClientDataHtml();
      } else if (props.url) {
        exportReadDataHtml();
      }
    }
    function exportClientDataHtml() {
      let pageSize = currPageSize.value;
      let pageIndex = currPageIndex.value;
      currPageSize.value = 1e5;
      currPageIndex.value = 0;
      changePageReadData();
      nextTick(() => {
        exportDataHtml();
        currPageSize.value = pageSize;
        currPageIndex.value = pageIndex;
        changePageReadData();
      });
    }
    function exportDataHtml() {
      let filename = getExportFileName();
      let headerCount = dataTable.value.$el.querySelector(".el-table__header").querySelectorAll("tr").length;
      lessCom$1.exportTable(dataTable.value.$el, [], headerCount, {
        font: {
          bold: true
        },
        alignment: { horizontal: "center", vertical: "center", wrap_text: true },
        fill: { bgcolor: { rgb: "F5F7FA" }, fgColor: { rgb: "F5F7FA" } }
      }, filename);
    }
    function exportReadDataHtml() {
      let currUrl = props.url;
      if (!currUrl) {
        ElMessage.error("接口地址不存在！");
        return;
      }
      if (props.beforeReadData) {
        props.beforeReadData();
      }
      let currQueryData = Object.assign({}, props.queryData ?? {}, columnSortData, queryFormData.value);
      currQueryData = lessCom$1.getQueryData(currQueryData);
      currQueryData["Query_PageSize"] = 1e5;
      currQueryData["Query_PageIndex"] = 0;
      const exportLoading = ElLoading.service({
        lock: true,
        text: "数据导出中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      currUrl.post(currQueryData).then((res) => {
        if (res[$codeField] === "0") {
          tableData.length = 0;
          if (res[$dataField][$pageSizeField] != void 0) {
            tableData.push(...res[$avgDayField][$pageDataField]);
          } else {
            tableData.push(...res[$avgDayField]);
          }
          nextTick(() => {
            exportDataHtml();
            changePageReadData();
            exportLoading.close();
          });
        } else {
          exportLoading.close();
          ElMessage.error(res[$messageField]);
        }
      }).catch((action) => {
        exportLoading.close();
        console.log(action);
      });
    }
    function getExportFileName() {
      let filename = props.tableName ?? "未设置名称";
      let currQueryData = Object.assign({}, props.queryData ?? {}, columnSortData, queryFormData.value);
      if (currQueryData.StartDate_QueryDate && currQueryData.EndDate_QueryDate) {
        filename += "(" + currQueryData.StartDate_QueryDate.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_QueryDate.replaceAll(" 23:59:59", "") + ")-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
      } else if (currQueryData.StartDate_CreateDate && currQueryData.EndDate_CreateDate) {
        filename += "(" + currQueryData.StartDate_CreateDate.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateDate.replaceAll(" 23:59:59", "") + ")-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
      } else if (currQueryData.DateType) {
        if ((currQueryData.DateType == 1 || currQueryData.DateType == "Day") && currQueryData.StartDate_CreateDay) {
          filename += "(" + currQueryData.StartDate_CreateDay.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateDay.replaceAll(" 23:59:59", "") + ")-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
        } else if ((currQueryData.DateType == 2 || currQueryData.DateType == "Week") && currQueryData.StartDate_CreateWeek) {
          filename += "(" + currQueryData.StartDate_CreateWeek.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateWeek.replaceAll(" 23:59:59", "") + ")-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
        } else if (currQueryData.EndDate_CreateMonth) {
          filename += "(" + currQueryData.StartDate_CreateMonth.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateMonth.replaceAll(" 23:59:59", "") + ")-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
        } else {
          filename += "-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
        }
      } else if (currQueryData.StartDate_CreateMonth && currQueryData.EndDate_CreateMonth) {
        filename += "(" + currQueryData.StartDate_CreateMonth.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateMonth.replaceAll(" 23:59:59", "") + ")-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
      } else if (currQueryData.StartDate_CreateDay && currQueryData.EndDate_CreateDay) {
        filename += "(" + currQueryData.StartDate_CreateDay.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateDay.replaceAll(" 23:59:59", "") + ")-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
      } else if (currQueryData.StartDate_CreateWeek && currQueryData.EndDate_CreateWeek) {
        filename += "(" + currQueryData.StartDate_CreateWeek.replaceAll(" 00:00:00", "") + "~" + currQueryData.EndDate_CreateWeek.replaceAll(" 23:59:59", "") + ")-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
      } else {
        filename += "-" + lessCom$1.formatDate(/* @__PURE__ */ new Date(), "yyyyMMddHHmmss");
      }
      return filename;
    }
    initData();
    const elsPageStore = inject("elsPageStore", null);
    const elsApiResult = inject("elsApiResult", null);
    const isQuery = computed(() => {
      return props.url || props.isClientSearch;
    });
    onMounted(() => {
      if (elsPageStore) {
        elsPageStore.value.dataTables.push({
          tagID,
          tableName: props.tableName,
          initReadData: props.initReadData,
          isQuery,
          isExport: props.isExport,
          saveTableData,
          query,
          table: dataTable,
          changePageReadData,
          setPageInfo,
          getPageInfo,
          exportTable,
          getTableSelectionWithQuery
        });
      } else {
        if (props.initReadData && props.url) {
          searchData();
        }
      }
      currShowSummary.value = props.showSummary;
      if (props.spanMethod) {
        currSpanMethod = props.spanMethod;
      } else if (columnMergeData.length) {
        currSpanMethod = handleSpanMethod;
      }
      if (attrs["onSortChange"]) {
        currSortChange = attrs["onSortChange"];
      } else {
        currSortChange = handleSortTable;
      }
      if (props.summaryMethod) {
        currSummaryMethod = props.summaryMethod;
        currShowSummary.value = true;
      } else if (columnSummaryData.length) {
        currSummaryMethod = handleSummaryMethod;
        currShowSummary.value = true;
      }
      if (props.headerStickyTop === true || props.headerStickyTop > -1) {
        setTimeout(() => {
          currHeaderStickyTop.value = lessCom$1.getToolHeight();
        }, 400);
      }
      setDragSortable();
      window.addEventListener("resize", function() {
        if (props.headerStickyTop === true || props.headerStickyTop > -1) {
          setTimeout(() => {
            currHeaderStickyTop.value = lessCom$1.getToolHeight();
          }, 400);
        }
      });
    });
    __expose({
      exportReadDataHtml,
      exportClientDataHtml,
      toggleRowSelection,
      initTableCheckKeys,
      initTableCheckRows,
      handleTableRowExchangeMove,
      handleTableRowMoveHere,
      handleTableSelectSortRow,
      setTableCurrentRow,
      getTableSelection,
      handleTableBodyScroll,
      editTable,
      unEditTable,
      saveTableData,
      searchData,
      query,
      exportTable,
      contextMenuVisible,
      tagID,
      initReadData: props.initReadData
    });
    return (_ctx, _cache) => {
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_button = resolveComponent("el-button");
      const _component_el_table = resolveComponent("el-table");
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      const _component_el_affix = resolveComponent("el-affix");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_pagination = resolveComponent("el-pagination");
      const _component_els_menu_context = resolveComponent("els-menu-context");
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock(Fragment, null, [
        _ctx.showCheckField ? (openBlock(), createElementBlock("div", _hoisted_1$z, [
          createVNode(unref(draggable), {
            list: unref(tableCheckData).checkRows,
            "item-key": _ctx.rowKey.toString(),
            class: "els-table-checkrows",
            onEnd: handleDragCheckItem
          }, {
            item: withCtx(({ element }) => [
              createVNode(_component_el_tag, {
                closable: true,
                onClose: ($event) => handleCloseCheckItem(element)
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "checklabel", { checkItem: element }, () => [
                    _ctx.showCheckField ? (openBlock(), createElementBlock("span", _hoisted_2$h, toDisplayString(element[_ctx.showCheckField]), 1)) : createCommentVNode("", true)
                  ])
                ]),
                _: 2
              }, 1032, ["onClose"])
            ]),
            _: 3
          }, 8, ["list", "item-key"])
        ])) : createCommentVNode("", true),
        (openBlock(), createBlock(resolveDynamicComponent(isEdit.value ? unref(tableFormContainer) : unref(tableContainer)), {
          ref_key: "tableForm",
          ref: tableForm
        }, {
          default: withCtx(() => [
            withDirectives((openBlock(), createBlock(_component_el_table, mergeProps({
              data: tableData,
              "inner-wrapper-class": wrapTagID,
              border: true,
              fit: "",
              "highlight-current-row": "",
              class: !unref(isMobile) && _ctx.hasBottomFixdScroll ? tagID + " els-table-noScroll" : tagID,
              "row-key": _ctx.rowKey,
              ref_key: "dataTable",
              ref: dataTable,
              "header-sticky-top": unref(currHeaderStickyTop),
              "row-class-name": currRowClassName.value,
              "show-summary": unref(currShowSummary),
              onSortChange: unref(currSortChange),
              onRowContextmenu: handleRowContextMenu,
              onRowDblclick: handleTableRowDblClick,
              onRowClick: handleTableRowClick,
              onSelect: handleTableSelect,
              onSelectAll: handleTableSelectAll,
              "span-method": unref(currSpanMethod),
              "summary-method": unref(currSummaryMethod)
            }, unref(attrs)), {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default"),
                _ctx.showEditColumn && (isShowEditColumn.value || _ctx.dragRow) ? (openBlock(), createBlock(_sfc_main$Y, {
                  key: 0,
                  label: "操作",
                  fixed: "right",
                  width: isShowEditColumn.value ? "200" : "80"
                }, {
                  default: withCtx(({ row, $index }) => [
                    isShowEditColumn.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      row.edit && isEdit.value ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        type: "success",
                        onClick: ($event) => handleRowSave(row),
                        loading: row.saveDataLoading,
                        icon: "Check"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("保存")
                        ]),
                        _: 2
                      }, 1032, ["onClick", "loading"])) : createCommentVNode("", true),
                      createVNode(_component_el_button, {
                        onClick: ($event) => handleRowEdit(row, $index),
                        icon: "Edit",
                        type: row.edit ? "info" : "primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.edit ? "取消" : "编辑"), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick", "type"])
                    ], 64)) : createCommentVNode("", true),
                    _ctx.dragRow ? (openBlock(), createBlock(_component_el_button, {
                      key: 1,
                      type: "info",
                      class: "leo-table-drag",
                      icon: "Rank"
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["width"])) : createCommentVNode("", true)
              ]),
              append: withCtx(() => [
                renderSlot(_ctx.$slots, "append")
              ]),
              empty: withCtx(() => [
                renderSlot(_ctx.$slots, "empty")
              ]),
              _: 3
            }, 16, ["data", "class", "row-key", "header-sticky-top", "row-class-name", "show-summary", "onSortChange", "span-method", "summary-method"])), [
              [_directive_loading, unref(dataLoading)]
            ]),
            !unref(isMobile) && _ctx.hasBottomFixdScroll && unref(tableBodyWidth) ? (openBlock(), createBlock(_component_el_affix, {
              key: 0,
              position: "bottom",
              ref: "bottomAffix",
              offset: 20,
              target: "." + tagID
            }, {
              default: withCtx(() => [
                !unref(dataLoading) ? (openBlock(), createElementBlock("div", _hoisted_3$9, [
                  createVNode(_component_el_scrollbar, {
                    ref_key: "bottomScroll",
                    ref: bottomScroll,
                    class: "leo_scollbar_container",
                    onScroll: handleBottomFixedScroll
                  }, {
                    default: withCtx(() => [
                      createElementVNode("div", {
                        style: normalizeStyle({ width: unref(tableBodyWidth), height: "10px" })
                      }, null, 4)
                    ]),
                    _: 1
                  }, 512)
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }, 8, ["target"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 512)),
        _ctx.isClientPage || unref(currPageTotal) > 0 ? (openBlock(), createElementBlock("div", _hoisted_4$6, [
          _ctx.hasPage ? (openBlock(), createBlock(_component_el_pagination, {
            key: 0,
            background: "",
            small: "",
            layout: unref(isMobile) ? unref(mobilePageLayout) : _ctx.pageLayout,
            "page-sizes": _ctx.pageSizes,
            "page-size": unref(currPageSize),
            total: unref(currRecourdCount),
            "current-page": unref(currPageIndex),
            onCurrentChange: handleChangePage,
            onSizeChange: handleChangePageSize
          }, {
            default: withCtx(() => [
              _ctx.isCustomPageSize && !unref(isMobile) ? (openBlock(), createBlock(_component_el_input, {
                key: 0,
                modelValue: unref(currPageSize),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(currPageSize) ? currPageSize.value = $event : currPageSize = $event),
                style: { "width": "55px", "margin-left": "5px" },
                onBlur: handleChangePageSize,
                placeholder: "页数"
              }, null, 8, ["modelValue"])) : createCommentVNode("", true),
              !unref(isMobile) ? (openBlock(), createBlock(_component_el_tag, {
                key: 1,
                type: "info",
                onClick: exportDataHtml,
                style: { "margin-right": "10px", "cursor": "pointer", "margin-left": "10px" }
              }, {
                default: withCtx(() => [
                  createTextVNode("导出")
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["layout", "page-sizes", "page-size", "total", "current-page"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        _ctx.hasContextMenu ? (openBlock(), createBlock(_component_els_menu_context, {
          key: 2,
          ref_key: "contentMenu",
          ref: contentMenu,
          menus: unref(currContextMenus),
          visible: unref(contextMenuVisible),
          positionLeft: unref(contextMenuPositionLeft),
          positionTop: unref(contextMenuPositionTop)
        }, null, 8, ["menus", "visible", "positionLeft", "positionTop"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const Table_vue_vue_type_style_index_0_lang = "";
_sfc_main$X.install = (app) => {
  app.component(_sfc_main$X.__name, _sfc_main$X);
};
_sfc_main$Y.install = (app) => {
  app.component(_sfc_main$Y.__name, _sfc_main$Y);
};
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumnBool" },
  __name: "TableColumnBool",
  props: {
    trueLabel: { default: "是" },
    falseLabel: { default: "否" },
    trueValue: { type: [String, Number, Boolean], default: 1 }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$Y, mergeProps({ type: "bool" }, props), createSlots({ _: 2 }, [
        unref(slots).default ? {
          name: "default",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "default", {
              row,
              $index
            })
          ]),
          key: "0"
        } : void 0,
        unref(slots).edit ? {
          name: "edit",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "edit", {
              row,
              $index
            })
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
_sfc_main$W.install = (app) => {
  app.component(_sfc_main$W.__name, _sfc_main$W);
};
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumnCheckbox" },
  __name: "TableColumnCheckbox",
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$Y, {
        type: "selection",
        isExport: false
      }, createSlots({ _: 2 }, [
        unref(slots).default ? {
          name: "default",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "default", {
              row,
              $index
            })
          ]),
          key: "0"
        } : void 0,
        unref(slots).edit ? {
          name: "edit",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "edit", {
              row,
              $index
            })
          ]),
          key: "1"
        } : void 0
      ]), 1024);
    };
  }
});
_sfc_main$V.install = (app) => {
  app.component(_sfc_main$V.__name, _sfc_main$V);
};
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumnEnum" },
  __name: "TableColumnEnum",
  props: {
    enumData: {},
    enumShowType: { default: "Description" },
    enumEqualType: { default: "Value" },
    enumNoneLabel: { default: "未知" }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$Y, mergeProps({ type: "enum" }, props), createSlots({ _: 2 }, [
        unref(slots).default ? {
          name: "default",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "default", {
              row,
              $index
            })
          ]),
          key: "0"
        } : void 0,
        unref(slots).edit ? {
          name: "edit",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "edit", {
              row,
              $index
            })
          ]),
          key: "1"
        } : void 0
      ]), 1040);
    };
  }
});
_sfc_main$U.install = (app) => {
  app.component(_sfc_main$U.__name, _sfc_main$U);
};
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumnExpand" },
  __name: "TableColumnExpand",
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$Y, {
        type: "expand",
        isExport: false
      }, createSlots({ _: 2 }, [
        unref(slots).default ? {
          name: "default",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "default", {
              row,
              $index
            })
          ]),
          key: "0"
        } : void 0
      ]), 1024);
    };
  }
});
_sfc_main$T.install = (app) => {
  app.component(_sfc_main$T.__name, _sfc_main$T);
};
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumnHeader" },
  __name: "TableColumnHeader",
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$Y, { type: "header" }, createSlots({ _: 2 }, [
        unref(slots).default ? {
          name: "default",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "default", {
              row,
              $index
            })
          ]),
          key: "0"
        } : void 0
      ]), 1024);
    };
  }
});
_sfc_main$S.install = (app) => {
  app.component(_sfc_main$S.__name, _sfc_main$S);
};
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumnImage" },
  __name: "TableColumnImage",
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$Y, {
        type: "image",
        width: "100"
      }, createSlots({ _: 2 }, [
        unref(slots).default ? {
          name: "default",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "default", {
              row,
              $index
            })
          ]),
          key: "0"
        } : void 0,
        unref(slots).edit ? {
          name: "edit",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "edit", {
              row,
              $index
            })
          ]),
          key: "1"
        } : void 0
      ]), 1024);
    };
  }
});
_sfc_main$R.install = (app) => {
  app.component(_sfc_main$R.__name, _sfc_main$R);
};
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumnOperate" },
  __name: "TableColumnOperate",
  props: {
    unFoldCount: { default: 0 },
    isFold: { type: Boolean, default: false }
  },
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$Y, {
        label: "操作",
        type: "operate",
        width: "100",
        unFoldCount: _ctx.unFoldCount,
        isFold: _ctx.isFold,
        isExport: false
      }, createSlots({ _: 2 }, [
        unref(slots).default ? {
          name: "default",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "default", {
              row,
              $index
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["unFoldCount", "isFold"]);
    };
  }
});
_sfc_main$Q.install = (app) => {
  app.component(_sfc_main$Q.__name, _sfc_main$Q);
};
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsColumnSelect" },
  __name: "TableColumnSelect",
  props: {
    selectButtonLabel: { default: "选择" }
  },
  setup(__props) {
    const slots = useSlots();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$Y, {
        type: "select",
        label: "操作",
        width: "120",
        selectButtonLabel: _ctx.selectButtonLabel,
        isExport: false
      }, createSlots({ _: 2 }, [
        unref(slots).default ? {
          name: "default",
          fn: withCtx(({ row, $index }) => [
            renderSlot(_ctx.$slots, "default", {
              row,
              $index
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["selectButtonLabel"]);
    };
  }
});
_sfc_main$P.install = (app) => {
  app.component(_sfc_main$P.__name, _sfc_main$P);
};
const _hoisted_1$y = { class: "els-node" };
const _hoisted_2$g = ["onDblclick"];
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsTreeSelect", inheritAttrs: false },
  __name: "TreeSelect",
  props: {
    modelValue: {},
    checkStrictly: { type: Boolean, default: true },
    expandOnClickNode: { type: Boolean },
    labelField: { default: "label" },
    valueField: { default: "value" },
    idField: {},
    idPathField: {},
    parentIdField: { default: "parentId" },
    targetUrlField: {},
    disabledField: {},
    rootParentValue: { default: "" },
    showSelect: { type: Boolean },
    treeData: {},
    url: {},
    data: {},
    expandAll: { type: Boolean },
    expandDepth: {},
    checkWithParent: { type: Boolean, default: true },
    unCheckWithchild: { type: Boolean, default: true },
    load: {},
    isInitTriggerSelect: { type: Boolean, default: true },
    resetValueByChangeData: { type: Boolean, default: true },
    isOnlySelectChild: { type: Boolean },
    lazyNoChild: {},
    hasNoExistOption: { type: Boolean },
    valueSeparator: { default: "," },
    multiple: { type: Boolean },
    valueType: {},
    showCheckBox: { type: Boolean },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:select", "update:select-label", "select"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    const attrs = useAttrs();
    const currProps = ref({
      children: "children",
      label: "label",
      isLeaf: "noChild"
    });
    if (attrs["props"]) {
      currProps.value = attrs["props"];
    }
    const currIdField = ref(props.idField ?? "");
    if (!currIdField.value) {
      currIdField.value = props.valueField;
    }
    const initSelect = ref(props.isInitTriggerSelect);
    const optionData = ref([]);
    const options = ref([]);
    const selectValue = ref([]);
    const selectOptionData = ref([]);
    const dataLoading = ref(false);
    const expendData = ref([]);
    const filterText = ref();
    const viewData = ref();
    const collapseID = ref();
    const expendID = ref();
    const dataTree = ref();
    const preSelectValue = ref();
    const currMultiple = props.multiple || props.showCheckBox;
    const currShowCheckbox = props.showCheckBox || currMultiple;
    watch(selectValue, (val) => {
      handleReturnResult(val);
    });
    watch(filterText, (val) => {
      dataTree.value.filter(val);
    });
    watch(() => props.url, () => {
      if (props.resetValueByChangeData) {
        selectValue.value.length = 0;
      }
      readData();
    }, { immediate: true });
    watch(() => props.data, (val) => {
      if (val && val.length) {
        if (props.resetValueByChangeData) {
          selectValue.value.length = 0;
        }
        options.value.length = [];
        optionData.value = val;
        toTreeData();
      }
    }, { immediate: true });
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      initModelValue();
      initSelectValue();
    });
    function handleHasLazyChild(item, data = null) {
      if (attrs["lazy"] && props.lazyNoChild) {
        item.noChild = props.lazyNoChild(item, data);
      } else if (attrs["lazy"]) {
        item.noChild = item.children === void 0 || item.children === null || item.children.length === 0;
      }
    }
    function handleLoadNode(node, resolve) {
      if (node.data.id) {
        if (props.load) {
          props.load(node).then((res) => {
            if (res === false) {
              if (node.data.children && node.data.children.length) {
                return resolve(node.data.children);
              } else {
                return resolve(getChildData(node.data, node.data.depth));
              }
            } else {
              var childData = [];
              res.filter((cele) => cele[props.parentIdField] == node.data.sourceData[currIdField.value]).forEach((ele) => {
                var item = {
                  id: ele[currIdField.value],
                  label: ele[props.labelField],
                  sourceData: ele,
                  children: []
                };
                lazyDataConvertToTreeData(res, item);
                if (item.children.length == 0) {
                  item.children = null;
                }
                item.noChild = item.children == null;
                childData.push(item);
              });
              resolve(childData);
            }
          });
        } else {
          return resolve(getChildData(node.data, node.data.depth));
        }
      }
    }
    function lazyDataConvertToTreeData(childData, item) {
      childData.filter((cele) => cele[props.parentIdField] == item.sourceData[currIdField.value]).forEach((ele) => {
        var childitem = {
          id: ele[currIdField.value],
          label: ele[props.labelField],
          sourceData: ele,
          children: []
        };
        lazyDataConvertToTreeData(childData, childitem);
        if (childitem.children.length == 0) {
          childitem.children = null;
        }
        childitem.noChild = childitem.children == null;
        item.children.push(childitem);
      });
    }
    function getChildData(item, depth) {
      depth += 1;
      var childItems = [];
      optionData.value.filter((cele) => cele[props.parentIdField] == item.sourceData[currIdField.value]).forEach((ele) => {
        var childItem = {
          id: ele[currIdField.value],
          label: ele[props.labelField],
          sourceData: ele,
          noChild: true,
          depth
        };
        handleHasLazyChild(childItem, optionData.value);
        childItems.push(childItem);
      });
      return childItems;
    }
    onMounted(() => {
      if (attrs["props"]) {
        currProps.value = attrs["props"];
      }
      initSelectValue();
    });
    function initSelectValue() {
      if (props.modelValue === "" || props.modelValue === void 0) {
        return;
      }
      if (currMultiple) {
        if (props.valueType === ValueType.Number) {
          selectValue.value = props.modelValue.toString().toListNumber(props.valueSeparator);
        } else if (props.valueType === ValueType.String) {
          selectValue.value = props.modelValue.toString().toList(props.valueSeparator);
        } else if (optionData.value.length && typeof optionData.value[0][props.valueField] === "number") {
          selectValue.value = props.modelValue.toString().toListNumber(props.valueSeparator);
        } else if (props.modelValue) {
          selectValue.value = props.modelValue.toString().toList(props.valueSeparator);
        }
        dataTree.value.setCheckedKeys(selectValue.value);
      } else {
        if (props.valueType === ValueType.Number) {
          selectValue.value = parseFloat(props.modelValue.toString());
        } else if (props.valueType === ValueType.String) {
          selectValue.value = props.modelValue.toString();
        } else if (optionData.value.length && props.modelValue.toString().length < 12 && typeof optionData.value[0][props.valueField] === "number") {
          selectValue.value = parseFloat(props.modelValue.toString());
        } else {
          selectValue.value = props.modelValue;
        }
        selectOptionData.value.forEach((ele) => {
          pushExpendData(ele);
          pushParentExpendData(ele);
        });
      }
    }
    function filterNode(value, data) {
      if (!value)
        return true;
      return data.label.indexOf(value) !== -1;
    }
    function readData() {
      var _a;
      let currUrl = ((_a = props.url) == null ? void 0 : _a.replacePowerUrl()) ?? "";
      return new Promise((resolve, reject) => {
        if (!props.url) {
          resolve(false);
          return;
        }
        dataLoading.value = true;
        currUrl.post({}).then((res) => {
          if (res[$codeField] == $success) {
            optionData.value = res[$dataField];
            options.value = [];
            toTreeData();
            initSelectValue();
          } else {
            ElMessage.error(res[$messageField]);
          }
          dataLoading.value = false;
          resolve(true);
        }).catch((action) => {
          reject(action);
        });
      });
    }
    function toTreeData() {
      var groups = [];
      if (!props.parentIdField) {
        options.value = optionData.value.map((ele) => {
          return {
            id: ele[currIdField.value],
            label: ele[props.labelField],
            children: [],
            sourceData: ele
          };
        });
        return;
      }
      var roots = optionData.value.filter((ele) => ele[props.parentIdField] == props.rootParentValue).map((ele) => {
        let item = {
          id: ele[currIdField.value],
          label: ele[props.labelField],
          sourceData: ele,
          noChild: true,
          children: [],
          disabled: props.disabledField ? ele[props.disabledField] : false
        };
        return item;
      });
      for (let ele of optionData.value.filter((i) => i[props.parentIdField] != props.rootParentValue)) {
        var parentid = ele[props.parentIdField];
        var parent = groups.find((x) => x.pid == parentid);
        if (!parent) {
          parent = { pid: parentid, items: [] };
          groups.push(parent);
        }
        let item = {
          id: ele[currIdField.value],
          label: ele[props.labelField],
          sourceData: ele,
          noChild: true,
          disabled: props.disabledField ? ele[props.disabledField] : false
        };
        parent.items.push(item);
      }
      searchChildData(roots, groups);
      options.value = roots;
    }
    function searchChildData(roots, groups, depth = 1) {
      for (let root of roots) {
        root.depth = depth;
        if (props.expandDepth && props.expandDepth >= depth) {
          if (expendData.value.indexOf(root.id) == -1) {
            expendData.value.push(root.id);
          }
        }
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          if (group.pid == root.id) {
            root.children = group.items;
            handleHasLazyChild(root);
            groups.splice(i, 1);
            for (let j = 0; j < group.items.length; j++) {
              const child = group.items[j];
              searchChildData([child], groups, depth + 1);
            }
            continue;
          }
        }
      }
    }
    function handleChange(data, checked) {
      if (!currMultiple) {
        return;
      }
      if (data.sourceData[props.parentIdField] != 0 && data.sourceData[props.parentIdField] != "" && checked && props.checkWithParent) {
        if (props.idPathField && data.sourceData[props.idPathField]) {
          var ids = data.sourceData[props.idPathField].split(",");
          ids.forEach((ele) => {
            if (ele) {
              dataTree.value.setChecked(ele, true);
            }
          });
        } else {
          checkParent(data.sourceData);
        }
      } else if (!checked && props.unCheckWithchild) {
        if (props.idPathField && data.sourceData[props.idPathField]) {
          unCheckChildForIDPath(data.sourceData[currIdField.value]);
        } else {
          unCheckChild(data.sourceData[currIdField.value]);
        }
      }
      selectValue.value = dataTree.value.getCheckedKeys();
      if (props.valueField != currIdField.value) {
        if (optionData.value && optionData.value.length) {
          selectValue.value = optionData.value.filter((ele) => selectValue.indexOf(ele[props.valueField]) > -1).map((ele) => ele[currIdField.value]);
        }
        if (props.hasNoExistOption && props.modelValue) {
          let noExists = props.modelValue.split(props.valueSeparator).filter((ele) => optionData.value.map((cele) => cele[props.valueField]).indexOf(ele) == -1);
          selectValue.value = selectValue.value.concat(noExists);
        }
      }
    }
    function handleComitSelect(value) {
      try {
        if (value && optionData.value.length) {
          let currValue = value.toString();
          if (currMultiple) {
            emits("select", { selectItem: selectOptionData.value, selectLabel: selectOptionData.value.map((ele) => ele[props.labelField]).toString(), selectValue: currValue, preSelectValue: preSelectValue.value });
          } else {
            const selectItem = selectOptionData.value.at(0);
            let selectLabel = "";
            if (selectItem) {
              selectLabel = selectItem[props.labelField];
            }
            emits("select", { selectItem, selectLabel, selectValue: currValue, preSelectValue: preSelectValue.value });
          }
          preSelectValue.value = value;
        }
      } catch (err) {
        console.log(err);
      }
    }
    const setModelValue = inject("setModelValue", () => {
    });
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnResult(value) {
      if (value === void 0) {
        value = [];
      }
      if (currMultiple) {
        handleReturnModelValue(value.join(props.valueSeparator));
      } else {
        handleReturnModelValue(value.toString());
      }
      if (attrs["onUpdate:select"] || attrs["onUpdate:select-label"] || attrs["onSelect"]) {
        if (currMultiple) {
          selectOptionData.value = optionData.value.filter((ele) => value.indexOf(ele[props.valueField]) > -1);
        } else {
          selectOptionData.value = optionData.value.filter((ele) => value == ele[props.valueField]);
        }
        if (initSelect) {
          if (props.valueField && props.labelField) {
            if (currMultiple) {
              emits("update:select", selectOptionData.value);
              emits("update:select-label", selectOptionData.value.map((ele) => ele[props.labelField]).toString());
            } else {
              if (selectOptionData.value.length > 0) {
                let currOption = selectOptionData.value[0];
                emits("update:select", selectOptionData.value[0]);
                if (currOption) {
                  emits("update:select-label", currOption[props.labelField]);
                } else {
                  emits("update:select-label", "");
                }
              }
            }
          }
          handleComitSelect(value);
        }
        initSelect.value = true;
      }
    }
    function checkParent(data) {
      if (data[props.parentIdField]) {
        var currData = findParentData(data[props.parentIdField]);
        if (currData) {
          checkParent(currData);
          dataTree.value.setChecked(currData[currIdField.value], true);
        }
      }
    }
    function findParentData(parentID) {
      return optionData.value.find((ele) => ele[currIdField.value] == parentID);
    }
    function unCheckChild(parentID) {
      optionData.value.filter((ele) => ele[props.parentIdField] == parentID).forEach((ele) => {
        if (dataTree.value.getCheckedKeys().indexOf(ele[currIdField.value]) > -1) {
          dataTree.value.setChecked(ele[currIdField.value], false);
        }
      });
    }
    function unCheckChildForIDPath(parentID) {
      if (props.idPathField) {
        optionData.value.filter((ele) => ele[props.idPathField ?? ""].indexOf(parentID) > -1).forEach((ele) => {
          dataTree.value.setChecked(ele[currIdField.value], false);
        });
      }
    }
    function handleAllSelect(node) {
      var isSelect = node.isSelectAll;
      if (!isSelect) {
        isSelect = true;
      } else {
        isSelect = false;
      }
      node.isSelectAll = isSelect;
      dataTree.value.setChecked(node.data.id, isSelect);
      node.childNodes.forEach((ele) => {
        selectChild(ele, isSelect);
      });
    }
    function selectChild(node, select) {
      dataTree.value.setChecked(node.data.id, select);
      node.childNodes.forEach((ele) => {
        selectChild(ele, select);
      });
    }
    function pushParentExpendData(item) {
      if (item[currIdField.value] != item[props.parentIdField] && item[props.parentIdField]) {
        var currData = optionData.value.find((ele) => {
          return ele[currIdField.value] == item[props.parentIdField];
        });
        pushExpendData(currData[currIdField.value]);
        pushParentExpendData(currData);
      }
    }
    function pushExpendData(val) {
      if (collapseID.value == val) {
        collapseID.value = "";
        return;
      }
      if (expendID.value == val) {
        expendID.value = "";
        return;
      }
      const index = expendData.value.indexOf(val);
      if (index == -1) {
        expendData.value.push(val);
      } else {
        expendData.value.splice(index, 1);
      }
    }
    function handleNodeExpand(data) {
      if (currMultiple) {
        return;
      }
      expendID.value = data.id;
      if (expendData.value.indexOf(data.id) == -1) {
        expendData.value.push(data.id);
      }
    }
    function handleNodeCollapse(data) {
      if (currMultiple) {
        return;
      }
      collapseID.value = data.id;
      const index = expendData.value.indexOf(data.id);
      expendData.value.splice(index, 1);
    }
    function handleNodeClick(data) {
      if (currMultiple) {
        return;
      }
      if (props.isOnlySelectChild && data.children) {
        return;
      }
      viewData.value = data.sourceData;
      if (!data.noChild) {
        pushExpendData(data.sourceData[currIdField.value]);
      }
      selectValue.value = [data.sourceData[props.valueField]];
    }
    return (_ctx, _cache) => {
      const _component_Check = resolveComponent("Check");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_tree_select = resolveComponent("el-tree-select");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1$y, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            withDirectives((openBlock(), createBlock(_component_el_tree_select, mergeProps({
              ref_key: "dataTree",
              ref: dataTree,
              load: handleLoadNode,
              modelValue: selectValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event),
              "node-key": "id",
              props: currProps.value,
              data: options.value,
              onCheckChange: handleChange,
              onNodeClick: handleNodeClick,
              onNodeExpand: handleNodeExpand,
              onNodeCollapse: handleNodeCollapse,
              "default-expanded-keys": expendData.value,
              "check-strictly": _ctx.checkStrictly,
              multiple: unref(currMultiple),
              "expand-on-click-node": !unref(currMultiple) ? true : _ctx.expandOnClickNode,
              "filter-node-method": filterNode,
              "show-checkbox": unref(currShowCheckbox)
            }, unref(attrs)), {
              default: withCtx(({ node, data }) => [
                renderSlot(_ctx.$slots, "default", {
                  node,
                  data: data.sourceData
                }, () => [
                  unref(currMultiple) ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    onDblclick: ($event) => handleAllSelect(node)
                  }, toDisplayString(node.label), 41, _hoisted_2$g)) : (openBlock(), createElementBlock("span", {
                    key: 1,
                    class: normalizeClass({ "els-tree-selected": viewData.value && viewData.value[_ctx.valueField] == data.sourceData[_ctx.valueField] })
                  }, [
                    createTextVNode(toDisplayString(node.label) + " ", 1),
                    viewData.value && viewData.value[_ctx.valueField] == data.sourceData[_ctx.valueField] ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_Check)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ], 2))
                ], true)
              ]),
              _: 3
            }, 16, ["modelValue", "props", "data", "default-expanded-keys", "check-strictly", "multiple", "expand-on-click-node", "show-checkbox"])), [
              [_directive_loading, dataLoading.value]
            ])
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
const TreeSelect_vue_vue_type_style_index_0_scoped_4feb0803_lang = "";
const TreeSelect = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-4feb0803"]]);
TreeSelect.install = (app) => {
  app.component(TreeSelect.__name, TreeSelect);
};
const _hoisted_1$x = { class: "els-node" };
const _hoisted_2$f = ["onDblclick"];
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsTree", inheritAttrs: false },
  __name: "Tree",
  props: {
    modelValue: {},
    checkStrictly: { type: Boolean, default: true },
    expandOnClickNode: { type: Boolean },
    labelField: { default: "label" },
    valueField: { default: "value" },
    idField: {},
    idPathField: {},
    parentIdField: { default: "parentId" },
    targetUrlField: {},
    disabledField: {},
    rootParentValue: { default: "" },
    showSelect: { type: Boolean },
    showCheckAll: { type: Boolean },
    treeData: {},
    url: {},
    data: {},
    expandAll: { type: Boolean },
    expandDepth: {},
    filterable: { type: Boolean },
    checkWithParent: { type: Boolean, default: true },
    unCheckWithchild: { type: Boolean, default: true },
    load: {},
    isInitTriggerSelect: { type: Boolean, default: true },
    resetValueByChangeData: { type: Boolean, default: true },
    isOnlySelectChild: { type: Boolean },
    lazyNoChild: {},
    hasNoExistOption: { type: Boolean },
    valueSeparator: { default: "," },
    multiple: { type: Boolean },
    valueType: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:select", "update:select-label", "select"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    const attrs = useAttrs();
    const currProps = ref({
      children: "children",
      label: "label",
      isLeaf: "noChild"
    });
    if (attrs["props"]) {
      currProps.value = attrs["props"];
    }
    const currIdField = ref(props.idField ?? "");
    if (!currIdField.value) {
      currIdField.value = props.valueField;
    }
    const checkAll = ref(false);
    const initSelect = ref(props.isInitTriggerSelect);
    const optionData = ref([]);
    const options = ref([]);
    const selectValue = ref([]);
    const selectOptionData = ref([]);
    const dataLoading = ref(false);
    const expendData = ref([]);
    const filterText = ref();
    const viewData = ref();
    const collapseID = ref();
    const expendID = ref();
    const dataTree = ref();
    const preSelectValue = ref();
    const currMultiple = props.multiple || (attrs["show-checkbox"] === true || attrs["show-checkbox"] === "");
    watch(selectValue, (val) => {
      handleReturnResult(val);
    });
    watch(filterText, (val) => {
      dataTree.value.filter(val);
    });
    watch(() => props.url, () => {
      if (props.resetValueByChangeData) {
        selectValue.value.length = 0;
      }
      readData();
    }, { immediate: true });
    watch(() => props.data, (val) => {
      if (val && val.length) {
        if (props.resetValueByChangeData) {
          selectValue.value.length = 0;
        }
        options.value.length = [];
        optionData.value = val;
        toTreeData();
      }
    }, { immediate: true });
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      initModelValue();
      initSelectValue();
    });
    function handleHasLazyChild(item, data = null) {
      if (attrs["lazy"] && props.lazyNoChild) {
        item.noChild = props.lazyNoChild(item, data);
      } else if (attrs["lazy"]) {
        item.noChild = item.children === void 0 || item.children === null || item.children.length === 0;
      }
    }
    function handleLoadNode(node, resolve) {
      if (node.data.id) {
        if (props.load) {
          props.load(node).then((res) => {
            if (res === false) {
              if (node.data.children && node.data.children.length) {
                return resolve(node.data.children);
              } else {
                return resolve(getChildData(node.data, node.data.depth));
              }
            } else {
              var childData = [];
              res.filter((cele) => cele[props.parentIdField] == node.data.sourceData[currIdField.value]).forEach((ele) => {
                var item = {
                  id: ele[currIdField.value],
                  label: ele[props.labelField],
                  sourceData: ele,
                  children: []
                };
                lazyDataConvertToTreeData(res, item);
                if (item.children.length == 0) {
                  item.children = null;
                }
                item.noChild = item.children == null;
                childData.push(item);
              });
              resolve(childData);
            }
          });
        } else {
          return resolve(getChildData(node.data, node.data.depth));
        }
      }
    }
    function lazyDataConvertToTreeData(childData, item) {
      childData.filter((cele) => cele[props.parentIdField] == item.sourceData[currIdField.value]).forEach((ele) => {
        var childitem = {
          id: ele[currIdField.value],
          label: ele[props.labelField],
          sourceData: ele,
          children: []
        };
        lazyDataConvertToTreeData(childData, childitem);
        if (childitem.children.length == 0) {
          childitem.children = null;
        }
        childitem.noChild = childitem.children == null;
        item.children.push(childitem);
      });
    }
    function getChildData(item, depth) {
      depth += 1;
      var childItems = [];
      optionData.value.filter((cele) => cele[props.parentIdField] == item.sourceData[currIdField.value]).forEach((ele) => {
        var childItem = {
          id: ele[currIdField.value],
          label: ele[props.labelField],
          sourceData: ele,
          noChild: true,
          depth
        };
        handleHasLazyChild(childItem, optionData.value);
        childItems.push(childItem);
      });
      return childItems;
    }
    onMounted(() => {
      if (attrs["props"]) {
        currProps.value = attrs["props"];
      }
      initSelectValue();
    });
    function initSelectValue() {
      if (props.modelValue === "" || props.modelValue === void 0) {
        return;
      }
      if (currMultiple) {
        if (props.valueType === ValueType.Number) {
          selectValue.value = props.modelValue.toString().toListNumber(props.valueSeparator);
        } else if (props.valueType === ValueType.String) {
          selectValue.value = props.modelValue.toString().toList(props.valueSeparator);
        } else if (optionData.value.length && typeof optionData.value[0][props.valueField] === "number") {
          selectValue.value = props.modelValue.toString().toListNumber(props.valueSeparator);
        } else if (props.modelValue) {
          selectValue.value = props.modelValue.toString().toList(props.valueSeparator);
        }
        dataTree.value.setCheckedKeys(selectValue.value);
      } else {
        if (props.valueType === ValueType.Number) {
          selectValue.value = parseFloat(props.modelValue.toString());
        } else if (props.valueType === ValueType.String) {
          selectValue.value = props.modelValue.toString();
        } else if (optionData.value.length && props.modelValue.toString().length < 12 && typeof optionData.value[0][props.valueField] === "number") {
          selectValue.value = parseFloat(props.modelValue.toString());
        } else {
          selectValue.value = props.modelValue;
        }
        selectOptionData.value.forEach((ele) => {
          pushExpendData(ele);
          pushParentExpendData(ele);
        });
      }
    }
    function filterNode(value, data) {
      if (!value)
        return true;
      return data.label.indexOf(value) !== -1;
    }
    function handleCheckAllChange() {
      options.forEach((ele) => {
        handleDataAllSelect(ele);
      });
      return;
    }
    function readData() {
      var _a;
      let currUrl = ((_a = props.url) == null ? void 0 : _a.replacePowerUrl()) ?? "";
      return new Promise((resolve, reject) => {
        if (!props.url) {
          resolve(false);
          return;
        }
        dataLoading.value = true;
        currUrl.post({}).then((res) => {
          if (res[$codeField] == $success) {
            optionData.value = res[$dataField];
            options.value = [];
            toTreeData();
            initSelectValue();
          } else {
            ElMessage.error(res[$messageField]);
          }
          dataLoading.value = false;
          resolve(true);
        }).catch((action) => {
          reject(action);
        });
      });
    }
    function toTreeData() {
      var groups = [];
      if (!props.parentIdField) {
        options.value = optionData.value.map((ele) => {
          return {
            id: ele[currIdField.value],
            label: ele[props.labelField],
            children: [],
            sourceData: ele
          };
        });
        return;
      }
      var roots = optionData.value.filter((ele) => ele[props.parentIdField] == props.rootParentValue).map((ele) => {
        let item = {
          id: ele[currIdField.value],
          label: ele[props.labelField],
          sourceData: ele,
          noChild: true,
          children: [],
          disabled: props.disabledField ? ele[props.disabledField] : false
        };
        return item;
      });
      for (let ele of optionData.value.filter((i) => i[props.parentIdField] != props.rootParentValue)) {
        var parentid = ele[props.parentIdField];
        var parent = groups.find((x) => x.pid == parentid);
        if (!parent) {
          parent = { pid: parentid, items: [] };
          groups.push(parent);
        }
        let item = {
          id: ele[currIdField.value],
          label: ele[props.labelField],
          sourceData: ele,
          noChild: true,
          disabled: props.disabledField ? ele[props.disabledField] : false
        };
        parent.items.push(item);
      }
      searchChildData(roots, groups);
      options.value = roots;
    }
    function searchChildData(roots, groups, depth = 1) {
      for (let root of roots) {
        root.depth = depth;
        if (props.expandDepth && props.expandDepth >= depth) {
          if (expendData.value.indexOf(root.id) == -1) {
            expendData.value.push(root.id);
          }
        }
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          if (group.pid == root.id) {
            root.children = group.items;
            handleHasLazyChild(root);
            groups.splice(i, 1);
            for (let j = 0; j < group.items.length; j++) {
              const child = group.items[j];
              searchChildData([child], groups, depth + 1);
            }
            continue;
          }
        }
      }
    }
    function handleChange(data, checked) {
      if (!currMultiple) {
        return;
      }
      if (data.sourceData[props.parentIdField] != 0 && data.sourceData[props.parentIdField] != "" && checked && props.checkWithParent) {
        if (props.idPathField && data.sourceData[props.idPathField]) {
          var ids = data.sourceData[props.idPathField].split(",");
          ids.forEach((ele) => {
            if (ele) {
              dataTree.value.setChecked(ele, true);
            }
          });
        } else {
          checkParent(data.sourceData);
        }
      } else if (!checked && props.unCheckWithchild) {
        if (props.idPathField && data.sourceData[props.idPathField]) {
          unCheckChildForIDPath(data.sourceData[currIdField.value]);
        } else {
          unCheckChild(data.sourceData[currIdField.value]);
        }
      }
      selectValue.value = dataTree.value.getCheckedKeys();
      if (props.valueField != currIdField.value) {
        if (optionData.value && optionData.value.length) {
          selectValue.value = optionData.value.filter((ele) => selectValue.indexOf(ele[props.valueField]) > -1).map((ele) => ele[currIdField.value]);
        }
        if (props.hasNoExistOption && props.modelValue) {
          let noExists = props.modelValue.split(props.valueSeparator).filter((ele) => optionData.value.map((cele) => cele[props.valueField]).indexOf(ele) == -1);
          selectValue.value = selectValue.value.concat(noExists);
        }
      }
    }
    function handleComitSelect(value) {
      try {
        if (value && optionData.value.length) {
          let currValue = value.toString();
          if (currMultiple) {
            emits("select", { selectItem: selectOptionData.value, selectLabel: selectOptionData.value.map((ele) => ele[props.labelField]).toString(), selectValue: currValue, preSelectValue: preSelectValue.value });
          } else {
            const selectItem = selectOptionData.value.at(0);
            let selectLabel = "";
            if (selectItem) {
              selectLabel = selectItem[props.labelField];
            }
            emits("select", { selectItem, selectLabel, selectValue: currValue, preSelectValue: preSelectValue.value });
          }
          preSelectValue.value = value;
        }
      } catch (err) {
        console.log(err);
      }
    }
    const setModelValue = inject("setModelValue", () => {
    });
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnResult(value) {
      if (value === void 0) {
        value = [];
      }
      if (currMultiple) {
        handleReturnModelValue(value.join(props.valueSeparator));
      } else {
        handleReturnModelValue(value.toString());
      }
      if (attrs["onUpdate:select"] || attrs["onUpdate:select-label"] || attrs["onSelect"]) {
        if (currMultiple) {
          selectOptionData.value = optionData.value.filter((ele) => value.indexOf(ele[props.valueField]) > -1);
        } else {
          selectOptionData.value = optionData.value.filter((ele) => value == ele[props.valueField]);
        }
        if (initSelect) {
          if (props.valueField && props.labelField) {
            if (currMultiple) {
              emits("update:select", selectOptionData.value);
              emits("update:select-label", selectOptionData.value.map((ele) => ele[props.labelField]).toString());
            } else {
              if (selectOptionData.value.length > 0) {
                let currOption = selectOptionData.value[0];
                emits("update:select", selectOptionData.value[0]);
                if (currOption) {
                  emits("update:select-label", currOption[props.labelField]);
                } else {
                  emits("update:select-label", "");
                }
              }
            }
          }
          handleComitSelect(value);
        }
        initSelect.value = true;
      }
    }
    function checkParent(data) {
      if (data[props.parentIdField]) {
        var currData = findParentData(data[props.parentIdField]);
        if (currData) {
          checkParent(currData);
          dataTree.value.setChecked(currData[currIdField.value], true);
        }
      }
    }
    function findParentData(parentID) {
      return optionData.value.find((ele) => ele[currIdField.value] == parentID);
    }
    function unCheckChild(parentID) {
      optionData.value.filter((ele) => ele[props.parentIdField] == parentID).forEach((ele) => {
        if (dataTree.value.getCheckedKeys().indexOf(ele[currIdField.value]) > -1) {
          dataTree.value.setChecked(ele[currIdField.value], false);
        }
      });
    }
    function unCheckChildForIDPath(parentID) {
      if (props.idPathField) {
        optionData.value.filter((ele) => ele[props.idPathField ?? ""].indexOf(parentID) > -1).forEach((ele) => {
          dataTree.value.setChecked(ele[currIdField.value], false);
        });
      }
    }
    function handleAllSelect(node) {
      var isSelect = node.isSelectAll;
      if (!isSelect) {
        isSelect = true;
      } else {
        isSelect = false;
      }
      node.isSelectAll = isSelect;
      dataTree.value.setChecked(node.data.id, isSelect);
      node.childNodes.forEach((ele) => {
        selectChild(ele, isSelect);
      });
    }
    function selectChild(node, select) {
      dataTree.value.setChecked(node.data.id, select);
      node.childNodes.forEach((ele) => {
        selectChild(ele, select);
      });
    }
    function handleDataAllSelect(data) {
      var isSelect = data.isSelectAll;
      if (!isSelect) {
        isSelect = true;
      } else {
        isSelect = false;
      }
      data.isSelectAll = isSelect;
      dataTree.value.setChecked(data.id, isSelect);
      if (data.children) {
        data.children.forEach((ele) => {
          selectDataChild(ele, isSelect);
        });
      }
    }
    function selectDataChild(data, select) {
      dataTree.value.setChecked(data.id, select);
      if (data.children) {
        data.children.forEach((ele) => {
          selectDataChild(ele, select);
        });
      }
    }
    function targetFrame(url) {
      if (url) {
        let currFramePage = lessCom$1.getUrlParms("Transfer_FramePageTagID");
        if (!currFramePage) {
          ElMessage.error("未找到Transfer_FramePageTagID");
          return;
        }
        if (window.parent["elsStore"]) {
          let currFrame = window.parent["elsStore"].framePages.find((ele) => ele.tagID == currFramePage);
          if (!currFrame) {
            ElMessage.error("未找到Transfer_FramePageTagID页面");
            return;
          }
          currFrame.setFramePageLoading(true);
          currFrame.setFrameViewUrl(url);
        }
      }
    }
    function pushParentExpendData(item) {
      if (item[currIdField.value] != item[props.parentIdField] && item[props.parentIdField]) {
        var currData = optionData.value.find((ele) => {
          return ele[currIdField.value] == item[props.parentIdField];
        });
        pushExpendData(currData[currIdField.value]);
        pushParentExpendData(currData);
      }
    }
    function pushExpendData(val) {
      if (collapseID.value == val) {
        collapseID.value = "";
        return;
      }
      if (expendID.value == val) {
        expendID.value = "";
        return;
      }
      const index = expendData.value.indexOf(val);
      if (index == -1) {
        expendData.value.push(val);
      } else {
        expendData.value.splice(index, 1);
      }
    }
    function handleNodeExpand(data) {
      if (currMultiple) {
        return;
      }
      expendID.value = data.id;
      if (expendData.value.indexOf(data.id) == -1) {
        expendData.value.push(data.id);
      }
    }
    function handleNodeCollapse(data) {
      if (currMultiple) {
        return;
      }
      collapseID.value = data.id;
      const index = expendData.value.indexOf(data.id);
      expendData.value.splice(index, 1);
    }
    function handleNodeClick(data) {
      if (currMultiple) {
        return;
      }
      if (props.isOnlySelectChild && data.children) {
        return;
      }
      viewData.value = data.sourceData;
      if (!data.noChild) {
        pushExpendData(data.sourceData[currIdField.value]);
      }
      if (props.targetUrlField) {
        targetFrame(data.sourceData[props.targetUrlField]);
      }
      selectValue.value = [data.sourceData[props.valueField]];
    }
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_Check = resolveComponent("Check");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_tree = resolveComponent("el-tree");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createElementBlock("div", _hoisted_1$x, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            _ctx.filterable ? (openBlock(), createBlock(_component_el_input, {
              key: 0,
              placeholder: "输入关键字进行过滤",
              modelValue: filterText.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filterText.value = $event),
              "suffix-icon": "Search",
              clearable: ""
            }, null, 8, ["modelValue"])) : createCommentVNode("", true),
            unref(currMultiple) && _ctx.showCheckAll ? (openBlock(), createBlock(_component_el_checkbox, {
              key: 1,
              modelValue: checkAll.value,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => checkAll.value = $event),
              onChange: handleCheckAllChange
            }, {
              default: withCtx(() => [
                createTextVNode("全选")
              ]),
              _: 1
            }, 8, ["modelValue"])) : createCommentVNode("", true),
            withDirectives((openBlock(), createBlock(_component_el_tree, mergeProps({
              ref_key: "dataTree",
              ref: dataTree,
              load: handleLoadNode,
              "node-key": "id",
              props: currProps.value,
              data: options.value,
              "default-checked-keys": selectValue.value,
              onCheckChange: handleChange,
              onNodeClick: handleNodeClick,
              onNodeExpand: handleNodeExpand,
              onNodeCollapse: handleNodeCollapse,
              "default-expanded-keys": expendData.value,
              "check-strictly": _ctx.checkStrictly,
              "expand-on-click-node": !unref(currMultiple) ? true : _ctx.expandOnClickNode,
              "filter-node-method": filterNode,
              "show-checkbox": unref(currMultiple)
            }, unref(attrs)), {
              default: withCtx(({ node, data }) => [
                unref(currMultiple) ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  onDblclick: ($event) => handleAllSelect(node),
                  class: normalizeClass(!node.childNodes.length ? "els-tree-last-node" : "els-tree-node")
                }, [
                  renderSlot(_ctx.$slots, "default", {
                    node,
                    data: data.sourceData
                  }, () => [
                    createTextVNode(toDisplayString(node.label), 1)
                  ], true)
                ], 42, _hoisted_2$f)) : (openBlock(), createElementBlock("div", {
                  key: 1,
                  class: normalizeClass({ "els-tree-selected ": viewData.value && viewData.value[_ctx.valueField] == data.sourceData[_ctx.valueField] })
                }, [
                  createElementVNode("span", null, [
                    renderSlot(_ctx.$slots, "default", {
                      node,
                      data: data.sourceData
                    }, () => [
                      createTextVNode(toDisplayString(node.label), 1)
                    ], true)
                  ]),
                  viewData.value && viewData.value[_ctx.valueField] == data.sourceData[_ctx.valueField] && !unref(currMultiple) && _ctx.showSelect ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(_component_Check)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ], 2))
              ]),
              _: 3
            }, 16, ["props", "data", "default-checked-keys", "default-expanded-keys", "check-strictly", "expand-on-click-node", "show-checkbox"])), [
              [_directive_loading, dataLoading.value]
            ])
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
const Tree_vue_vue_type_style_index_0_scoped_ab7b090f_lang = "";
const Tree = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-ab7b090f"]]);
Tree.install = (app) => {
  app.component(Tree.__name, Tree);
};
const _hoisted_1$w = {
  key: 0,
  class: "menu-filterable"
};
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsMenu" },
  __name: "Menu",
  props: {
    collapse: { type: Boolean },
    labelField: { default: "" },
    idField: { default: "" },
    targetField: {},
    parentIdField: { default: "ParentID" },
    rootParentValue: { default: "" },
    iconField: { default: "" },
    targetFrameName: {},
    width: {},
    url: {},
    data: {},
    hiddenIds: {},
    filterable: { type: Boolean }
  },
  emits: ["menuClick"],
  setup(__props, { expose: __expose, emit: emits }) {
    const props = __props;
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    const searchKey = ref("");
    const isCollapse = ref(props.collapse);
    let hiddenMenuIds = ref([]);
    const optionData = reactive([]);
    const sourceData = reactive([]);
    const menuData = reactive([]);
    const provideData = reactive({ openMenuData: [] });
    const searchOpenMenuData = reactive([]);
    const preMenuItem = ref();
    const currMenuID = ref();
    const elMenu = ref();
    const searchInput = ref();
    watch(searchKey, (val) => {
      searchOpenMenuData.length = 0;
      provideData.openMenuData = [];
      provideData.openMenuData.push(...searchOpenMenuData);
      let currSearchData = lessCom$1.cloneObj(sourceData);
      if (val) {
        searchTree(currSearchData);
      }
      nextTick(() => {
        searchOpenMenuData.forEach((ele) => {
          elMenu.value.open(ele);
        });
        nextTick(() => {
          menuData.length = 0;
          menuData.push(...currSearchData);
        });
      });
    });
    watch(() => props.filterable, (val) => {
      if (val) {
        nextTick(() => {
          searchInput.value.focus();
        });
      } else {
        searchKey.value = "";
      }
    });
    watch(() => props.url, (val) => {
      if (val) {
        readData();
      }
    }, { immediate: true });
    watch(() => props.data, (val) => {
      if (val) {
        optionData.length = 0;
        if (typeof val == "string") {
          optionData.push(...JSON.parse(val));
        } else {
          optionData.push(...val);
        }
        converToData();
      }
    }, { deep: true, immediate: true });
    watch(() => props.hiddenIds, (val) => {
      if (val) {
        hiddenMenuIds.value = val;
      }
    }, { immediate: true });
    function setActiveMenuID(id) {
      currMenuID.value = id;
    }
    function handleOpen(index) {
      if (provideData.openMenuData.indexOf(index) > -1) {
        return;
      }
      provideData.openMenuData.push(index);
    }
    function handleMenuClick(item) {
      if (preMenuItem.value) {
        preMenuItem.value.active = false;
      }
      item.active = true;
      preMenuItem.value = item;
      currMenuID.value = item.id;
      emits("menuClick", item);
    }
    function readData() {
      if (props.url) {
        props.url.post({}).then((res) => {
          if (res[$codeField] == $success) {
            optionData.length = 0;
            optionData.push(...res[$dataField]);
            converToData();
          } else {
            ElMessage.error(res[$messageField]);
          }
        });
      }
    }
    function converToData() {
      if (props.idField && props.parentIdField) {
        let groups = [];
        let roots = optionData.filter((ele) => hiddenMenuIds.value.indexOf(ele[props.idField]) == -1 && ele[props.parentIdField] == props.rootParentValue).map((ele) => {
          let item = {
            id: ele[props.idField].toString(),
            label: ele[props.labelField],
            icon: ele[props.iconField],
            url: ele[props.targetUrlField],
            sourceData: ele,
            active: false,
            visible: true,
            children: []
          };
          return item;
        });
        for (let ele of optionData.filter((i) => i[props.parentIdField] != props.rootParentValue)) {
          let parentid = ele[props.parentIdField];
          let parent = groups.find((x) => x.pid == parentid);
          if (!parent) {
            parent = { pid: parentid, items: [] };
            groups.push(parent);
          }
          let item = {
            id: ele[props.idField].toString(),
            label: ele[props.labelField],
            icon: ele[props.iconField],
            url: ele[props.targetUrlField],
            sourceData: ele,
            active: false,
            visible: true,
            children: []
          };
          parent.items.push(item);
        }
        searchChildData(roots, groups);
        menuData.length = 0;
        menuData.push(...roots);
        sourceData.length = 0;
        sourceData.push(...roots);
      }
    }
    function searchChildData(roots, groups, depth = 1) {
      for (let root of roots) {
        root.depth = depth;
        if (!root.namePath) {
          root.namePath = root.label;
        }
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          if (group.pid == root.id) {
            group.items.forEach((ele) => {
              ele.namePath = root.namePath + "," + ele.label;
            });
            root.children = group.items;
            groups.splice(i, 1);
            for (let j = 0; j < group.items.length; j++) {
              const child = group.items[j];
              searchChildData([child], groups, depth + 1);
            }
            continue;
          }
        }
      }
    }
    function searchTree(tree) {
      var isMatching = false;
      tree.forEach((ele) => {
        let childVisible = false;
        let currVisible = ele.label.indexOf(searchKey) > -1;
        if (ele.children) {
          childVisible = searchTree(ele.children);
        }
        if (!childVisible) {
          ele.children = [];
        }
        if (childVisible) {
          searchOpenMenuData.push(ele.id);
        }
        ele.visible = childVisible || currVisible;
        if (!isMatching) {
          isMatching = childVisible || currVisible;
        }
      });
      return isMatching;
    }
    provide("provideData", provideData);
    provide("handleMenuClick", handleMenuClick);
    __expose({
      setActiveMenuID
    });
    return (_ctx, _cache) => {
      var _a;
      const _component_el_input = resolveComponent("el-input");
      const _component_el_collapse_transition = resolveComponent("el-collapse-transition");
      const _component_els_menu_item = resolveComponent("els-menu-item");
      return openBlock(), createBlock(unref(ElMenu), {
        ref_key: "elMenu",
        ref: elMenu,
        "default-openeds": provideData.openMenuData,
        onOpen: handleOpen,
        "default-active": currMenuID.value,
        collapse: isCollapse.value,
        style: normalizeStyle([{ "width": (_a = _ctx.width) == null ? void 0 : _a.appendPx() }])
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default"),
          createVNode(_component_el_collapse_transition, null, {
            default: withCtx(() => [
              _ctx.filterable ? (openBlock(), createElementBlock("span", _hoisted_1$w, [
                createVNode(_component_el_input, {
                  modelValue: searchKey.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchKey.value = $event),
                  ref_key: "searchInput",
                  ref: searchInput,
                  "suffix-icon": "Search",
                  clearable: ""
                }, null, 8, ["modelValue"])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          (openBlock(true), createElementBlock(Fragment, null, renderList(menuData.filter((ele) => ele.visible), (item, index) => {
            return openBlock(), createBlock(_component_els_menu_item, {
              key: index,
              isRootMenu: true,
              item
            }, null, 8, ["item"]);
          }), 128))
        ]),
        _: 3
      }, 8, ["default-openeds", "default-active", "collapse", "style"]);
    };
  }
});
_sfc_main$M.install = (app) => {
  app.component(_sfc_main$M.__name, _sfc_main$M);
};
const _hoisted_1$v = ["title"];
const _hoisted_2$e = ["title"];
const _hoisted_3$8 = { key: 0 };
const _hoisted_4$5 = ["title"];
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsMenuItem" },
  __name: "MenuItem",
  props: {
    item: {},
    isRootMenu: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const provideData = inject("provideData", void 0);
    const handleMenuClick = inject("handleMenuClick", () => {
    });
    const hasChild = computed(() => {
      if (props.item) {
        return props.item.children && props.item.children.length > 0;
      }
      return false;
    });
    return (_ctx, _cache) => {
      const _component_els_menu_item = resolveComponent("els-menu-item");
      const _component_els_sub_menu = resolveComponent("els-sub-menu");
      return !_ctx.item ? (openBlock(), createBlock(unref(ElMenuItem), { key: 0 }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        !hasChild.value ? (openBlock(), createBlock(unref(ElMenuItem), {
          key: 0,
          index: _ctx.item.id,
          onClick: _cache[0] || (_cache[0] = ($event) => unref(handleMenuClick)(_ctx.item)),
          class: "submenu-title-noDropdown"
        }, {
          title: withCtx(() => [
            _ctx.item.label ? (openBlock(), createElementBlock("span", {
              key: 0,
              title: _ctx.item.label
            }, toDisplayString(_ctx.item.label), 9, _hoisted_1$v)) : createCommentVNode("", true)
          ]),
          default: withCtx(() => [
            _ctx.item.icon ? (openBlock(), createElementBlock("i", {
              key: 0,
              class: normalizeClass(["el-icon", _ctx.item.icon])
            }, null, 2)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["index"])) : (openBlock(), createBlock(_component_els_sub_menu, {
          key: 1,
          index: _ctx.item.id,
          class: normalizeClass(_ctx.isRootMenu && _ctx.item.active ? "menuitem_root el-menu-active" : _ctx.isRootMenu ? "menuitem_root" : _ctx.item.active ? "el-menu-active" : "")
        }, {
          title: withCtx(() => [
            createElementVNode("div", {
              onClick: _cache[1] || (_cache[1] = ($event) => unref(handleMenuClick)(_ctx.item)),
              class: normalizeClass(["sub-menu-title", { "el-submenu-active": _ctx.item.active }])
            }, [
              _ctx.item.icon ? (openBlock(), createElementBlock("i", {
                key: 0,
                class: normalizeClass(["el-icon", _ctx.item.icon])
              }, null, 2)) : createCommentVNode("", true),
              _ctx.item.label ? (openBlock(), createElementBlock("span", {
                key: 1,
                title: _ctx.item.label
              }, toDisplayString(_ctx.item.label), 9, _hoisted_2$e)) : createCommentVNode("", true)
            ], 2)
          ]),
          default: withCtx(() => [
            unref(provideData) && unref(provideData).openMenuData.indexOf(_ctx.item.id) > -1 ? (openBlock(), createElementBlock("div", _hoisted_3$8, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.item.children.filter((ele) => ele.visible), (citem, index) => {
                return openBlock(), createElementBlock(Fragment, null, [
                  citem.children && citem.children.length > 0 ? (openBlock(), createBlock(_component_els_menu_item, {
                    class: "nest-menu",
                    item: citem,
                    key: index,
                    onMenuClick: unref(handleMenuClick)
                  }, null, 8, ["item", "onMenuClick"])) : (openBlock(), createBlock(unref(ElMenuItem), {
                    key: 1,
                    index: citem.id,
                    onClick: ($event) => unref(handleMenuClick)(citem)
                  }, {
                    title: withCtx(() => [
                      citem.label ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        title: citem.label
                      }, toDisplayString(citem.label), 9, _hoisted_4$5)) : createCommentVNode("", true)
                    ]),
                    default: withCtx(() => [
                      _ctx.item.icon ? (openBlock(), createElementBlock("i", {
                        key: 0,
                        class: normalizeClass(["el-icon", citem.icon])
                      }, null, 2)) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["index", "onClick"]))
                ], 64);
              }), 256))
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["index", "class"]))
      ], 64));
    };
  }
});
_sfc_main$L.install = (app) => {
  app.component(_sfc_main$L.__name, _sfc_main$L);
};
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsSubMenu" },
  __name: "SubMenu",
  props: {
    title: {},
    index: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElSubMenu), { index: _ctx.index }, {
        title: withCtx(() => [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title ?? ""), 1)
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["index"]);
    };
  }
});
_sfc_main$K.install = (app) => {
  app.component(_sfc_main$K.__name, _sfc_main$K);
};
const _hoisted_1$u = { class: "els-node" };
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsSwitch",
    inheritAttrs: false
  },
  __name: "Switch",
  props: {
    modelValue: { type: [Boolean, String, Number] },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: { type: Function },
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const currValue = useVModel(props, "modelValue", emits);
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      const val = initModelValue();
      currValue.value = val;
    });
    const setModelValue = inject("setModelValue", () => {
    });
    watch(currValue, (val) => {
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, val, props.aIndex);
      }
    });
    return (_ctx, _cache) => {
      const _component_el_switch = resolveComponent("el-switch");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$u, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createVNode(_component_el_switch, mergeProps({
              modelValue: unref(currValue),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(currValue) ? currValue.value = $event : null),
              "active-value": 1,
              "inactive-value": 0
            }, unref(attrs)), null, 16, ["modelValue"])
          ]),
          _: 1
        }, 16)
      ]);
    };
  }
});
_sfc_main$J.install = (app) => {
  app.component(_sfc_main$J.__name, _sfc_main$J);
};
const _hoisted_1$t = {
  key: 0,
  class: "leo_image_empty"
};
const _hoisted_2$d = ["width"];
const _hoisted_3$7 = /* @__PURE__ */ createElementVNode("path", {
  d: "M345.15968 357.80096a48.54784 48.54784 0 1 0 48.52736 48.54784 48.58368 48.58368 0 0 0-48.52736-48.54784zM844.68736 174.08H184.43264A102.656 102.656 0 0 0 81.92 276.64896v470.70208A102.656 102.656 0 0 0 184.43264 849.92h660.25472A102.65088 102.65088 0 0 0 947.2 747.35104V276.64896A102.65088 102.65088 0 0 0 844.68736 174.08zM345.15968 295.02976a111.32416 111.32416 0 1 1-111.2576 111.31904 111.42144 111.42144 0 0 1 111.2576-111.31904z m-72.45312 444.544l-42.496-46.17728 174.71488-161.0496L483.88096 611.328l-44.35968 44.39552-36.38272-36.4032z m517.6064-25.12896l-134.55872-151.552-171.12064 183.42912L438.784 703.488l218.112-233.82016 180.3264 203.10016z",
  fill: "#7da3cc",
  "p-id": "4593",
  "data-spm-anchor-id": "a313x.7781069.0.i10",
  class: "selected"
}, null, -1);
const _hoisted_4$4 = [
  _hoisted_3$7
];
const _hoisted_5$4 = ["innerHTML"];
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsImage", inheritAttrs: false },
  __name: "Image",
  props: {
    url: {},
    previewUrls: {},
    thumbnailUrl: {},
    width: {},
    height: {},
    isPreview: { type: Boolean, default: true },
    emptyDesc: {},
    hideOnClickModal: { type: Boolean, default: true },
    previewTeleported: { type: Boolean, default: true },
    onSwitch: {}
  },
  setup(__props) {
    const props = __props;
    const attrs = useAttrs();
    const picUrls = ref([]);
    const thumbnailPicUrls = ref([]);
    const showPreview = ref(false);
    const previewUrl = ref("");
    function initData() {
      if (props.previewUrls) {
        picUrls.value = props.previewUrls;
      } else if (props.url) {
        picUrls.value = props.url.split("$");
      }
      if (props.thumbnailUrl) {
        thumbnailPicUrls.value = props.thumbnailUrl.split("$");
      } else if (props.url) {
        thumbnailPicUrls.value = props.url.split("$");
      }
    }
    function preview(url, index) {
      if (props.isPreview) {
        if (thumbnailPicUrls.value.length == picUrls.value.length && index > -1) {
          previewUrl.value = picUrls.value[index];
        } else {
          previewUrl.value = url;
        }
        showPreview.value = true;
      }
    }
    watch(() => props.url, () => {
      initData();
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_el_skeleton_item = resolveComponent("el-skeleton-item");
      const _component_el_skeleton = resolveComponent("el-skeleton");
      const _component_el_image = resolveComponent("el-image");
      const _component_els_image_viewer = resolveComponent("els-image-viewer");
      return openBlock(), createElementBlock(Fragment, null, [
        !_ctx.url ? (openBlock(), createElementBlock("div", _hoisted_1$t, [
          (openBlock(), createElementBlock("svg", {
            t: "1626166549727",
            class: "icon",
            viewBox: "0 0 1024 1024",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "p-id": "4592",
            width: _ctx.width
          }, _hoisted_4$4, 8, _hoisted_2$d)),
          _ctx.emptyDesc ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: _ctx.emptyDesc,
            class: "leo_image_empty_desc"
          }, null, 8, _hoisted_5$4)) : createCommentVNode("", true)
        ])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(thumbnailPicUrls.value, (item, index) => {
          return openBlock(), createBlock(_component_el_image, mergeProps({ src: item }, unref(attrs), {
            style: [{ width: _ctx.width }, { height: _ctx.height }, { cursor: _ctx.isPreview ? "zoom-in" : "default" }],
            onClick: ($event) => preview(item, index)
          }), {
            placeholder: withCtx(() => [
              renderSlot(_ctx.$slots, "placeholder", {}, () => [
                createVNode(_component_el_skeleton, {
                  style: normalizeStyle([{ "width": _ctx.width }, { "height": _ctx.height }, { "min-height": _ctx.width }]),
                  animated: ""
                }, {
                  template: withCtx(() => [
                    createVNode(_component_el_skeleton_item, {
                      variant: "image",
                      style: normalizeStyle([{ "width": _ctx.width }, { "height": _ctx.height }, { "min-height": _ctx.width }])
                    }, null, 8, ["style"])
                  ]),
                  _: 1
                }, 8, ["style"])
              ])
            ]),
            error: withCtx(() => [
              renderSlot(_ctx.$slots, "error")
            ]),
            viewer: withCtx(() => [
              renderSlot(_ctx.$slots, "viewer")
            ]),
            _: 2
          }, 1040, ["src", "style", "onClick"]);
        }), 256)),
        showPreview.value ? (openBlock(), createBlock(_component_els_image_viewer, {
          key: 2,
          url: picUrls.value,
          "current-url": previewUrl.value,
          onSwitch: _ctx.onSwitch,
          "hide-on-click-modal": _ctx.hideOnClickModal,
          onClose: _cache[0] || (_cache[0] = ($event) => showPreview.value = false),
          teleported: _ctx.previewTeleported
        }, null, 8, ["url", "current-url", "onSwitch", "hide-on-click-modal", "teleported"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
_sfc_main$I.install = (app) => {
  app.component(_sfc_main$I.__name, _sfc_main$I);
};
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsImageViewer" },
  __name: "ImageViewer",
  props: {
    currentUrl: {},
    initialIndex: { default: 0 },
    url: {},
    separator: { default: "$" }
  },
  setup(__props) {
    const props = __props;
    const urls = ref();
    let index = props.initialIndex;
    function initData() {
      if (props.url) {
        if (Array.isArray(props.url)) {
          urls.value = props.url;
        } else {
          urls.value = props.url.split(props.separator);
        }
        if (props.currentUrl) {
          index = urls.value.indexOf(props.currentUrl);
        }
      }
    }
    watch(() => props.url, () => {
      initData();
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_el_image_viewer = resolveComponent("el-image-viewer");
      return openBlock(), createBlock(_component_el_image_viewer, {
        "url-list": urls.value,
        "initial-index": unref(index)
      }, null, 8, ["url-list", "initial-index"]);
    };
  }
});
_sfc_main$H.install = (app) => {
  app.component(_sfc_main$H.__name, _sfc_main$H);
};
const _hoisted_1$s = { class: "els-node" };
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsAutocomplete", inheritAttrs: false },
  __name: "Autocomplete",
  props: {
    data: {},
    url: {},
    modelValue: {},
    valueField: { default: "value" },
    fetchSuggestions: {},
    remote: { type: Boolean },
    width: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const setModelValue = inject("setModelValue", () => {
    });
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    const selectValue = ref();
    const tableData = reactive([]);
    const queryData = reactive({ searchKey: "", idString: "" });
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watch(selectValue, (val) => {
      handleReturnResult(val);
    });
    watchEffect(() => {
      const currValue = initModelValue();
      selectValue.value = currValue;
    });
    watch(() => props.data, (val) => {
      tableData.length = 0;
      if (val) {
        tableData.push(...val);
      }
    }, { immediate: true });
    function queryMethod(searchValue, cb) {
      if (props.fetchSuggestions) {
        return props.fetchSuggestions(searchValue, cb);
      }
      queryData["searchKey"] = searchValue;
      if (props.remote && props.url || !props.remote && props.url && !tableData.length) {
        readData().then((res) => {
          if (res) {
            cb(tableData);
          }
        });
      } else {
        return tableData.filter((ele) => ele[props.valueField].toString().indexOf(searchValue) > -1);
      }
    }
    function readData() {
      return new Promise((resolve) => {
        if (props.url) {
          props.url.post(queryData).then((res) => {
            if (res[$codeField] == $success) {
              tableData.length = 0;
              tableData.push(...res[$dataField]);
            } else {
              ElMessage.error(res[$messageField]);
            }
          });
        } else {
          resolve(false);
        }
      });
    }
    function handleReturnResult(value) {
      if (value === void 0) {
        value = "";
      }
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    return (_ctx, _cache) => {
      const _component_el_autocomplete = resolveComponent("el-autocomplete");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$s, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => {
            var _a;
            return [
              createVNode(_component_el_autocomplete, {
                modelValue: selectValue.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event),
                style: normalizeStyle([{ width: (_a = _ctx.width) == null ? void 0 : _a.appendPx() }]),
                "fetch-suggestions": queryMethod,
                "value-key": _ctx.valueField
              }, createSlots({
                prefix: withCtx(() => [
                  renderSlot(_ctx.$slots, "prefix")
                ]),
                suffix: withCtx(() => [
                  renderSlot(_ctx.$slots, "suffix")
                ]),
                default: withCtx(({ item }) => [
                  _ctx.valueField ? renderSlot(_ctx.$slots, "default", {
                    key: 0,
                    item
                  }, () => [
                    createTextVNode(toDisplayString(item[_ctx.valueField]), 1)
                  ]) : renderSlot(_ctx.$slots, "default", {
                    key: 1,
                    item
                  }, () => [
                    createTextVNode(toDisplayString(item), 1)
                  ])
                ]),
                _: 2
              }, [
                _ctx.$slots.prepend ? {
                  name: "prepend",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "prepend")
                  ]),
                  key: "0"
                } : void 0,
                _ctx.$slots.append ? {
                  name: "append",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "append")
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["modelValue", "style", "value-key"])
            ];
          }),
          _: 3
        }, 16)
      ]);
    };
  }
});
_sfc_main$G.install = (app) => {
  app.component(_sfc_main$G.__name, _sfc_main$G);
};
const _hoisted_1$r = { class: "els-node" };
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsCascader", inheritAttrs: false },
  __name: "Cascader",
  props: {
    modelValue: {},
    isPanel: { type: Boolean },
    labelField: { default: "label" },
    valueField: { default: "value" },
    parentIdField: { default: "parentId" },
    rootParentValue: { default: "" },
    disabledField: { default: "" },
    childrenField: { default: "children" },
    leafField: { default: "leaf" },
    url: {},
    expandTrigger: {},
    checkStrictly: { type: Boolean },
    multiple: { type: Boolean },
    emitPath: { type: Boolean, default: true },
    lazy: { type: Boolean },
    lazyLoad: {},
    onChange: {},
    data: {},
    resetValueByChangeData: { type: Boolean, default: true },
    pathSeparator: { default: "$" },
    isInitTriggerSelect: { type: Boolean },
    valueSeparator: { default: "," },
    valueType: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:select", "update:select-label"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    const initSelect = ref(false);
    const componentName = ref("el-cascader");
    if (props.isPanel) {
      componentName.value = "el-cascader-panel";
    }
    const dataProps = ref({});
    const tableData = reactive([]);
    const optionData = reactive([]);
    const selectValue = ref([]);
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watch(selectValue, (val) => {
      handleReturnResult(val);
    });
    watchEffect(() => {
      initModelValue();
      initSelectValue();
    });
    watch(() => props.url, () => {
      if (props.resetValueByChangeData) {
        selectValue.value.length = 0;
      }
      readData();
    }, { immediate: true });
    watch(() => props.data, (val) => {
      if (val && val.length) {
        if (props.resetValueByChangeData) {
          selectValue.value.length = 0;
        }
        tableData.length = 0;
        tableData.push(...val);
        toTreeData();
      }
    }, { immediate: true });
    const attrs = useAttrs();
    const setModelValue = inject("setModelValue", () => {
    });
    function initSelectValue() {
      const currValue = initModelValue();
      if (currValue === "" || currValue === void 0) {
        return;
      }
      if (props.multiple && props.emitPath) {
        if (currValue && props.emitPath) {
          selectValue.value.length = 0;
          selectValue.value.push(...currValue.split(props.pathSeparator).map((ele) => ele.split(",")));
        } else if (currValue) {
          selectValue.value.length = 0;
          selectValue.value.push(...currValue.split(props.pathSeparator));
        } else {
          selectValue.value.length = 0;
        }
        selectValue.value.length = 0;
        if (props.valueType === ValueType.Number) {
          selectValue.value.push(...currValue.toString().split(props.pathSeparator).map((ele) => ele.toListNumber(props.valueSeparator)));
        } else if (props.valueType === ValueType.String) {
          selectValue.value.push(...currValue.toString().split(props.pathSeparator).map((ele) => ele.toList(props.valueSeparator)));
        } else if (optionData.length && typeof optionData[0][props.valueField] === "number") {
          selectValue.value.push(...currValue.toString().split(props.pathSeparator).map((ele) => ele.toListNumber(props.valueSeparator)));
        } else if (currValue) {
          selectValue.value.push(...currValue.toString().split(props.pathSeparator).map((ele) => ele.toList(props.valueSeparator)));
        }
      } else if (props.multiple || props.emitPath) {
        selectValue.value.length = 0;
        if (props.valueType === ValueType.Number) {
          selectValue.value.push(...currValue.toString().toListNumber(props.valueSeparator));
        } else if (props.valueType === ValueType.String) {
          selectValue.value.push(...currValue.toString().toList(props.valueSeparator));
        } else if (optionData.length && typeof optionData[0][props.valueField] === "number") {
          selectValue.value.push(...currValue.toString().toListNumber(props.valueSeparator));
        } else if (currValue) {
          selectValue.value.push(...currValue.toString().toList(props.valueSeparator));
        }
      } else {
        if (props.valueType === ValueType.Number) {
          selectValue.value = parseFloat(currValue.toString());
        } else if (props.valueType === ValueType.String) {
          selectValue.value = currValue.toString();
        } else if (optionData.length && currValue.toString().length < 12 && typeof optionData[0][props.valueField] === "number") {
          selectValue.value = parseFloat(currValue.toString());
        } else {
          selectValue.value = currValue;
        }
      }
    }
    function readData() {
      if (props.url) {
        props.url.post({}).then((res) => {
          if (res[$codeField] == $success) {
            tableData.length = 0;
            tableData.push(...res[$dataField]);
            toTreeData();
            initSelectValue();
          } else {
            ElMessage.error(res[$messageField]);
          }
        });
      }
    }
    function toTreeData() {
      optionData.length = 0;
      if (tableData.length) {
        tableData.filter((ele) => ele[props.parentIdField] == props.rootParentValue).forEach((ele) => {
          let currOption = ele;
          currOption[props.childrenField] = [];
          searchChildData(currOption);
          if (currOption[props.childrenField].length == 0) {
            currOption[props.childrenField] = null;
          }
          optionData.push(currOption);
        });
      }
    }
    function searchChildData(item) {
      tableData.filter((ele) => ele[props.parentIdField] == item[props.valueField]).forEach((ele) => {
        let currOption = ele;
        currOption[props.childrenField] = [];
        searchChildData(currOption);
        if (currOption[props.childrenField].length == 0) {
          currOption[props.childrenField] = null;
        }
        item[props.childrenField].push(currOption);
      });
    }
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnResult(value) {
      if (value === void 0) {
        value = "";
      }
      if (!value || value.length == 0) {
        handleReturnModelValue("");
        if (initSelect.value) {
          emits("update:select", {});
          emits("update:select-label", "");
        }
        initSelect.value = true;
        if (props.onChange) {
          props.onChange("");
        }
        return;
      }
      if (props.multiple && props.emitPath) {
        const currValue = value.map((ele) => ele.join(props.valueSeparator)).join(props.pathSeparator);
        handleReturnModelValue(currValue);
        if (initSelect && tableData.length) {
          let selectData = value.map((ele) => tableData.filter((cele) => ele.includes(cele[props.valueField])));
          emits("update:select", selectData);
          let selectLabelData = selectData.map((ele) => ele.map((cele) => cele[props.labelField]));
          emits("update:select-label", selectLabelData.join(props.pathSeparator));
        }
        initSelect.value = true;
        if (props.onChange) {
          props.onChange(currValue);
        }
        return;
      }
      if (props.emitPath || props.multiple) {
        handleReturnModelValue(value.join(props.valueSeparator));
        if (initSelect.value && tableData.length) {
          let selectData = tableData.filter((cele) => value.indexOf(cele[props.valueField]) > -1);
          emits("update:select", selectData);
          let selectLabelData = selectData.map((ele) => ele[props.labelField]);
          emits("update:select-label", selectLabelData.toString());
        }
        initSelect.value = true;
        if (props.onChange) {
          props.onChange(value.join(props.valueSeparator));
        }
        return;
      }
      handleReturnModelValue(value);
      if (initSelect.value && tableData.length) {
        let selectData = tableData.find((cele) => value == cele[props.valueField]);
        if (selectData) {
          let selectLabelData = selectData[props.labelField];
          emits("update:select", selectData);
          emits("update:select-label", selectLabelData);
        } else {
          emits("update:select", void 0);
          emits("update:select-label", void 0);
        }
      }
      initSelect.value = true;
      if (props.onChange) {
        props.onChange(value);
      }
    }
    if (attrs["props"]) {
      dataProps.value = attrs["props"];
    } else {
      dataProps.value = {
        expandTrigger: props.expandTrigger,
        multiple: props.multiple,
        checkStrictly: props.checkStrictly,
        emitPath: props.emitPath,
        lazy: props.lazy,
        lazyLoad: props.lazyLoad,
        value: props.valueField,
        label: props.labelField,
        children: props.childrenField,
        disabled: props.disabledField,
        leaf: props.leafField
      };
    }
    return (_ctx, _cache) => {
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(componentName.value), {
              props: dataProps.value,
              modelValue: selectValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event),
              options: optionData
            }, {
              default: withCtx(({ node, data }) => [
                renderSlot(_ctx.$slots, "default", {
                  node,
                  data
                }, () => [
                  createTextVNode(toDisplayString(data[_ctx.labelField]), 1)
                ])
              ]),
              empty: withCtx(() => [
                renderSlot(_ctx.$slots, "empty")
              ]),
              _: 3
            }, 8, ["props", "modelValue", "options"]))
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
_sfc_main$F.install = (app) => {
  app.component(_sfc_main$F.__name, _sfc_main$F);
};
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsCascaderPanel" },
  __name: "CascaderPannel",
  props: {
    modelValue: {},
    labelField: { default: "label" },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const selectValue = ref();
    watch(selectValue, (val) => {
      emits("update:modelValue", val);
    });
    watch(() => props.modelValue, () => {
      selectValue.value = props.modelValue;
    });
    return (_ctx, _cache) => {
      const _component_els_cascader = resolveComponent("els-cascader");
      return openBlock(), createBlock(_component_els_cascader, {
        modelValue: selectValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event),
        isPanel: true
      }, {
        default: withCtx(({ node, data }) => [
          renderSlot(_ctx.$slots, "default", {
            node,
            data
          }, () => [
            createTextVNode(toDisplayString(data[_ctx.labelField]), 1)
          ])
        ]),
        empty: withCtx(() => [
          renderSlot(_ctx.$slots, "empty")
        ]),
        _: 3
      }, 8, ["modelValue"]);
    };
  }
});
_sfc_main$E.install = (app) => {
  app.component(_sfc_main$E.__name, _sfc_main$E);
};
const _hoisted_1$q = { class: "dialog-content" };
const _hoisted_2$c = ["src"];
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsDialog"
  },
  __name: "Dialog",
  props: {
    modelValue: { type: Boolean },
    url: {},
    contentWidth: { default: "100%" },
    contentHeight: { default: "60%" },
    loading: { type: Boolean },
    visible: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const slots = useSlots();
    const tagID = "less_dialog_" + lessCom$1.Guid32();
    const pageLoading = ref(false);
    const dialogUrl = ref();
    const dialogVisible = ref(false);
    const contentStyle = computed(() => {
      const currStyle = [];
      if (props.contentWidth) {
        currStyle.push({ width: props.contentWidth.appendPx() });
      }
      if (props.contentHeight && props.contentHeight.indexOf("%") > -1) {
        currStyle.push({ height: `calc(${props.contentHeight.replace("%", "")}vh)` });
      } else if (props.contentHeight) {
        currStyle.push({ height: props.contentHeight.appendPx() });
      }
      return currStyle;
    });
    watch(() => props.url, (val) => {
      if (val) {
        dialogUrl.value = val.addUrlParameter("Transfer_DialogTagID", tagID);
        handleRegistEvent();
      }
    }, { immediate: true });
    watch(() => props.modelValue, (val) => {
      dialogVisible.value = val;
      if (props.visible) {
        dialogVisible.value = props.visible;
      }
    }, { immediate: true });
    watch(dialogVisible, (val) => {
      emits("update:modelValue", val);
    });
    function handleRegistEvent() {
      window[tagID] = handleCloseLoading;
    }
    function handleCloseLoading() {
      pageLoading.value = false;
    }
    return (_ctx, _cache) => {
      const _component_el_dialog = resolveComponent("el-dialog");
      const _directive_loading = resolveDirective("loading");
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: dialogVisible.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogVisible.value = $event),
        class: normalizeClass(tagID),
        "destroy-on-close": true
      }, createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            withDirectives((openBlock(), createElementBlock("div", _hoisted_1$q, [
              _ctx.url ? (openBlock(), createElementBlock("iframe", {
                key: 0,
                src: dialogUrl.value,
                frameborder: "0",
                style: normalizeStyle(contentStyle.value)
              }, null, 12, _hoisted_2$c)) : createCommentVNode("", true)
            ])), [
              [_directive_loading, pageLoading.value]
            ])
          ])
        ]),
        _: 2
      }, [
        unref(slots).header ? {
          name: "header",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "header")
          ]),
          key: "0"
        } : void 0,
        unref(slots).footer ? {
          name: "footer",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "footer")
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["modelValue"]);
    };
  }
});
_sfc_main$D.install = (app) => {
  app.component(_sfc_main$D.__name, _sfc_main$D);
};
const _hoisted_1$p = ["src"];
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsDrawer"
  },
  __name: "Drawer",
  props: {
    modelValue: { type: Boolean },
    url: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const slots = useSlots();
    const tagID = "less_drawer_" + lessCom$1.Guid32();
    const pageLoading = ref(false);
    const drawerUrl = ref();
    const drawerVisible = ref(false);
    watch(() => props.url, (val) => {
      if (val) {
        drawerUrl.value = val.addUrlParameter("Transfer_DialogTagID", tagID);
        handleRegistEvent();
      }
    }, { immediate: true });
    watch(() => props.modelValue, (val) => {
      drawerVisible.value = val;
    }, { immediate: true });
    watch(drawerVisible, (val) => {
      emits("update:modelValue", val);
    });
    function handleRegistEvent() {
      window[tagID] = handleCloseLoading;
    }
    function handleCloseLoading() {
      pageLoading.value = false;
    }
    return (_ctx, _cache) => {
      const _component_el_drawer = resolveComponent("el-drawer");
      return openBlock(), createBlock(_component_el_drawer, {
        modelValue: drawerVisible.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => drawerVisible.value = $event),
        "custom-class": tagID
      }, createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            _ctx.url ? (openBlock(), createElementBlock("iframe", {
              key: 0,
              src: _ctx.url,
              frameborder: "0",
              style: { "height": "calc(100vh - 48px)", "width": "100%" }
            }, null, 8, _hoisted_1$p)) : createCommentVNode("", true)
          ])
        ]),
        _: 2
      }, [
        unref(slots).header ? {
          name: "header",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "header")
          ]),
          key: "0"
        } : void 0,
        unref(slots).footer ? {
          name: "footer",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "footer")
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["modelValue"]);
    };
  }
});
_sfc_main$C.install = (app) => {
  app.component(_sfc_main$C.__name, _sfc_main$C);
};
const _hoisted_1$o = { class: "el-dropdown-link" };
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsDropdown"
  },
  __name: "Dropdown",
  props: {
    labelField: { default: "label" },
    valueField: { default: "value" },
    disabledField: { default: "disabled" },
    iconField: { default: "iconField" },
    url: { default: "" },
    data: {},
    title: {}
  },
  setup(__props) {
    const props = __props;
    const { $codeField, $messageField, $dataField, $success } = lessCom$1.getApiConfig();
    provide("type", "dropdown");
    const options = reactive([]);
    watch(() => props.url, (val) => {
      if (val) {
        readData();
      }
    }, { immediate: true });
    watch(() => props.data, (val) => {
      options.length = 0;
      if (val) {
        options.push(...val);
      }
    }, { immediate: true });
    function readData() {
      var _a;
      let currUrl = ((_a = props.url) == null ? void 0 : _a.replacePowerUrl()) ?? "";
      return new Promise((resolve, reject) => {
        currUrl.post({}).then((res) => {
          if (res[$codeField] == $success) {
            options.length = 0;
            options.push(...res[$dataField]);
          } else {
            ElMessage.error(res[$messageField]);
          }
          resolve(true);
        }).catch((action) => {
          reject(action);
        });
      });
    }
    return (_ctx, _cache) => {
      const _component_arrow_down = resolveComponent("arrow-down");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_els_option = resolveComponent("els-option");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      return openBlock(), createBlock(_component_el_dropdown, null, {
        dropdown: withCtx(() => [
          createVNode(_component_el_dropdown_menu, null, {
            default: withCtx(() => [
              _ctx.url || _ctx.data && _ctx.data.length > 0 || options.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(options, (item, index) => {
                return openBlock(), createBlock(_component_els_option, {
                  type: "dropdown",
                  key: index,
                  value: item[_ctx.valueField],
                  icon: item[_ctx.iconField],
                  disabled: item[_ctx.disabledField] === true
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "item", { item }, () => [
                      createTextVNode(toDisplayString(item[_ctx.labelField]), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "icon", "disabled"]);
              }), 128)) : renderSlot(_ctx.$slots, "dropdown", { key: 1 })
            ]),
            _: 3
          })
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createElementVNode("span", _hoisted_1$o, [
              createTextVNode(toDisplayString(_ctx.title) + " ", 1),
              createVNode(_component_el_icon, { class: "el-icon--right" }, {
                default: withCtx(() => [
                  createVNode(_component_arrow_down)
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 3
      });
    };
  }
});
_sfc_main$B.install = (app) => {
  app.component(_sfc_main$B.__name, _sfc_main$B);
};
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsSlider" },
  __name: "Slider",
  props: {
    modelValue: {},
    range: { type: Boolean },
    valueSeparator: { default: "," },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const selectValue = ref();
    function handleReturnResult(value) {
      if (value === void 0) {
        value = "";
      }
      if (props.range) {
        emits("update:modelValue", value.toString());
      } else {
        emits("update:modelValue", value);
      }
    }
    onMounted(() => {
      if (props.range && props.modelValue) {
        selectValue.value = props.modelValue.toString().split(",").map((ele) => +ele);
      } else if (typeof props.modelValue == "string" && !props.range) {
        selectValue.value = parseFloat(props.modelValue);
      } else if (props.modelValue) {
        selectValue.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (val) => {
      if (props.range) {
        selectValue.value = val == null ? void 0 : val.toString().split(props.valueSeparator);
        return;
      }
      if (typeof val == "string") {
        selectValue.value = parseFloat(val);
        return;
      }
      selectValue.value = val;
    });
    watch(selectValue, (val) => {
      handleReturnResult(val);
    });
    return (_ctx, _cache) => {
      const _component_el_slider = resolveComponent("el-slider");
      return openBlock(), createBlock(_component_el_slider, {
        modelValue: selectValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectValue.value = $event),
        range: _ctx.range
      }, null, 8, ["modelValue", "range"]);
    };
  }
});
_sfc_main$A.install = (app) => {
  app.component(_sfc_main$A.__name, _sfc_main$A);
};
const _hoisted_1$n = { class: "els-node" };
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsInputNumber",
    inheritAttrs: false
  },
  __name: "InputNumber",
  props: {
    width: {},
    modelValue: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: { type: Function },
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const currValue = ref();
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      const val = initModelValue();
      currValue.value = val;
    });
    const setModelValue = inject("setModelValue", () => {
    });
    watch(currValue, (val) => {
      emits("update:modelValue", val);
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, val, props.aIndex);
      }
    });
    return (_ctx, _cache) => {
      const _component_el_input_number = resolveComponent("el-input-number");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => {
            var _a;
            return [
              createVNode(_component_el_input_number, mergeProps({
                modelValue: currValue.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currValue.value = $event),
                style: [{ width: (_a = _ctx.width) == null ? void 0 : _a.appendPx() }]
              }, unref(attrs)), null, 16, ["modelValue", "style"])
            ];
          }),
          _: 1
        }, 16)
      ]);
    };
  }
});
_sfc_main$z.install = (app) => {
  app.component(_sfc_main$z.__name, _sfc_main$z);
};
const _hoisted_1$m = { class: "els-node" };
const _hoisted_2$b = { class: "els_upload_container" };
const _hoisted_3$6 = { class: "elsupload-img" };
const _hoisted_4$3 = ["src"];
const _hoisted_5$3 = { class: "els_upload-menus" };
const _hoisted_6$3 = ["width", "height", "src"];
const _hoisted_7$3 = { class: "els_upload-menus" };
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsUpload",
    inheritAttrs: false
  },
  __name: "Upload",
  props: {
    modelValue: {},
    width: { default: "60" },
    height: { default: "60" },
    url: {},
    sizeLimit: {},
    picWidthLimit: {},
    picHeightLimit: {},
    picLimitType: {},
    fileTypes: {},
    resourceCode: {},
    restrictCode: {},
    showInput: { type: Boolean },
    inputPlaceholder: { default: "地址" },
    inputWidth: { default: "500" },
    hasMd5Parameter: {},
    isReturnSize: { type: Boolean },
    showFileList: { type: Boolean },
    type: {},
    valueSeparator: { default: "$" },
    buttonLabel: { default: "点击上传" },
    fileName: { default: "file" },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "uploaded", "completed"],
  setup(__props, { expose: __expose, emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const apiConfig = lessCom$1.getApiConfig();
    const { $dataField, $pathField, $uploadUrl, $md5Field } = lessCom$1.getUploadConfig();
    const currShowInput = ref(false);
    const fileList = ref([]);
    const showVisible = ref(false);
    const previewIndex = ref(0);
    const fileUrl = ref();
    const uploadLoading = ref(false);
    const currUploadUrl = ref("");
    const fileUpload = ref();
    const currShowFileList = ref(props.showFileList);
    const multiple = ref(false);
    watchEffect(() => {
      multiple.value = attrs["multiple"] === true || attrs["multiple"] === "";
      if (multiple.value) {
        currShowFileList.value = true;
      } else {
        currShowFileList.value = props.showFileList;
      }
    });
    function submitUpload() {
      fileUpload.value.submit();
    }
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    function initFileUrl() {
      fileUrl.value = initModelValue();
      if (fileUrl.value) {
        fileList.value = fileUrl.value.split(props.valueSeparator).map((ele) => {
          return { name: ele, status: "success", url: ele };
        });
      }
    }
    function initUrl() {
      currUploadUrl.value = $uploadUrl;
      if (props.url) {
        currUploadUrl.value = props.url;
      }
      if (props.resourceCode) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("ResourceCode", props.resourceCode);
      }
      if (props.restrictCode) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("RestrictCode", props.restrictCode);
      }
      if (props.picLimitType) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("ResourcePicLimitType", props.picLimitType);
      }
      if (props.picWidthLimit) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("ResourcePicWidth", props.picWidthLimit.toString());
      }
      if (props.picHeightLimit) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("ResourcePicHeight", props.picHeightLimit.toString());
      }
      if (props.isReturnSize) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("IsReturnSize", "1");
      }
      currUploadUrl.value = currUploadUrl.value.setPowerPublicQuery();
    }
    function handleError(err, file) {
      ElNotification.warning({
        title: "提示",
        dangerouslyUseHTMLString: true,
        message: `<strong class="txt-red">${file.name}-文件上传失败</strong>`,
        duration: 3e3
      });
      uploadLoading.value = false;
      console.log(err);
    }
    function handleRemove(file) {
      fileList.value.remove(file);
      setFileUrl();
    }
    function handleSuccess(res, file, fileList2) {
      if (res[apiConfig.$codeField] !== apiConfig.$success) {
        ElNotification.call({
          title: "文件上传失败",
          dangerouslyUseHTMLString: true,
          message: `<div><strong class="red">${file.name}-文件上传失败</strong></div><div>${res[apiConfig.$messageField]}</div>`,
          type: "error",
          duration: 0
        });
        uploadLoading.value = false;
        return;
      }
      let currUrl = "";
      let currRes = res[apiConfig.$dataField];
      if ($dataField) {
        currRes = res[apiConfig.$dataField][$dataField];
      }
      currUrl = currRes[$pathField];
      if (props.hasMd5Parameter) {
        currUrl = currUrl.addUrlParameter("Md5Value", currRes[$md5Field]);
      }
      file.url = currUrl;
      setFileUrl();
      uploadLoading.value = false;
      handleSortMutiPic();
      emits("uploaded", res);
      if (multiple.value) {
        if (fileList2.length) {
          const isSuccess = fileList2.map((ele) => ele.status).every((ele) => ele == "success");
          if (isSuccess) {
            emits("completed", fileList2.map((ele) => ele.url).join(props.valueSeparator));
          }
        }
      }
    }
    function handleSortMutiPic() {
      if (props.type != UploadType.Pic && !multiple.value) {
        return;
      }
      new Sortable(fileUpload.value.$el.querySelector(".el-upload-list"), {
        handle: ".el-upload-list__item",
        draggable: ".el-upload-list__item",
        // 允许拖拽的项目类名
        // 拖拽中 回调函数
        onMove() {
          console.info("----PicDragMove----");
        },
        onStart() {
          console.info("----PicDragStart----");
        },
        // 拖拽结束，调整位置
        onEnd({ newIndex, oldIndex }) {
          console.info("----PicDragEnd---");
          if (newIndex !== void 0 && oldIndex !== void 0) {
            const currRow = fileList.value.splice(oldIndex, 1)[0];
            fileList.value.splice(newIndex, 0, currRow);
            setFileUrl();
          }
        }
      });
    }
    function handleBeforeUpload(file) {
      var isLimit = false;
      let currFileTypes = props.fileTypes;
      if (!currFileTypes && props.type == UploadType.Pic) {
        currFileTypes = "jpeg,gif,bmp,jpg,png,svga,svg,webp,bundle,tif,pag";
      }
      if (currFileTypes && currFileTypes != "*") {
        currFileTypes.split(",").forEach((ele) => {
          if (file.name.indexOf(ele) > -1) {
            isLimit = true;
          }
        });
      } else {
        isLimit = true;
      }
      if (!isLimit) {
        ElMessage.error(`上传图片格式错误!只能上传【${currFileTypes}】类型`);
        return false;
      }
      if (props.sizeLimit) {
        isLimit = file.size / 1024 / 1024 < props.sizeLimit;
      } else {
        isLimit = true;
      }
      if (!isLimit) {
        ElMessage.error("上传大小不能超过 " + props.sizeLimit + "MB!");
        return false;
      }
      uploadLoading.value = true;
      return true;
    }
    function handlePreview(file) {
      previewIndex.value = fileList.value.findIndex((ele) => ele.url == file.url);
      showVisible.value = true;
    }
    function setFileUrl() {
      if (!fileList.value.length) {
        fileUrl.value = "";
      }
      if (!multiple.value) {
        let lastFile = fileList.value.filter((ele) => ele.status == "success").at(-1);
        if (lastFile) {
          fileUrl.value = lastFile.url;
        }
        return;
      }
      fileUrl.value = fileList.value.filter((ele) => ele.status == "success").map((ele) => ele.url).join(props.valueSeparator);
    }
    const setModelValue = inject("setModelValue", () => {
    });
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnResult() {
      if (!fileUrl.value) {
        fileUrl.value = "";
      }
      handleReturnModelValue(fileUrl.value);
    }
    const fontSize = parseFloat(props.width) / 3 + "px";
    watch(fileUrl, () => {
      handleReturnResult();
    }, { immediate: true });
    watch(() => props.url, () => {
      initUrl();
    }, { immediate: true });
    onMounted(() => {
      currShowInput.value = props.showInput;
      if (props.type == UploadType.File && !multiple.value) {
        currShowInput.value = true;
      }
      initFileUrl();
      initUrl();
    });
    __expose({
      submitUpload
    });
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_Plus = resolveComponent("Plus");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_progress = resolveComponent("el-progress");
      const _component_ZoomIn = resolveComponent("ZoomIn");
      const _component_Delete = resolveComponent("Delete");
      const _component_el_button = resolveComponent("el-button");
      const _component_zoom_in = resolveComponent("zoom-in");
      const _component_el_upload = resolveComponent("el-upload");
      const _component_els_image_viewer = resolveComponent("els-image-viewer");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$m, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_2$b, [
              createVNode(_component_el_upload, mergeProps({
                ref_key: "fileUpload",
                ref: fileUpload,
                "file-list": fileList.value,
                "onUpdate:fileList": _cache[3] || (_cache[3] = ($event) => fileList.value = $event),
                class: { "ele-uploader": _ctx.type == unref(UploadType).Pic },
                action: currUploadUrl.value,
                "on-success": handleSuccess,
                "on-error": handleError,
                "on-remove": handleRemove,
                "before-upload": handleBeforeUpload,
                "on-preview": handlePreview,
                "show-file-list": currShowFileList.value,
                "list-type": _ctx.type == unref(UploadType).Pic && multiple.value ? "picture-card" : "text",
                name: _ctx.fileName,
                disabled: uploadLoading.value
              }, unref(attrs)), createSlots({
                default: withCtx(() => [
                  currShowInput.value == true && unref(attrs)["list-type"] != "picture-card" ? (openBlock(), createBlock(_component_el_input, {
                    key: 0,
                    modelValue: fileUrl.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fileUrl.value = $event),
                    modelModifiers: { trim: true },
                    style: normalizeStyle([{ width: _ctx.inputWidth.appendPx() }, { "margin-right": "10px" }]),
                    class: "leo-upload-input",
                    clearable: "",
                    placeholder: _ctx.inputPlaceholder
                  }, null, 8, ["modelValue", "style", "placeholder"])) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    _ctx.type == unref(UploadType).Pic && !multiple.value ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "els_upload_pic",
                      style: normalizeStyle([{ width: _ctx.width.appendPx() }, { height: _ctx.height.appendPx() }])
                    }, [
                      !uploadLoading.value && !fileUrl.value ? (openBlock(), createBlock(_component_el_icon, {
                        key: 0,
                        class: "ele-uploader-icon",
                        style: normalizeStyle([{ "font-size": fontSize }])
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Plus)
                        ]),
                        _: 1
                      }, 8, ["style"])) : uploadLoading.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        fileList.value.at(-1).status != "success" ? (openBlock(), createBlock(_component_el_progress, {
                          key: 0,
                          type: "circle",
                          percentage: fileList.value.at(-1).percentage,
                          style: normalizeStyle([{ width: _ctx.width.appendPx() }, { height: _ctx.height.appendPx() }])
                        }, null, 8, ["percentage", "style"])) : createCommentVNode("", true)
                      ], 64)) : fileUrl.value ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                        createElementVNode("span", _hoisted_3$6, [
                          createElementVNode("img", {
                            src: fileUrl.value,
                            class: "avatar"
                          }, null, 8, _hoisted_4$3)
                        ]),
                        createElementVNode("div", _hoisted_5$3, [
                          createVNode(_component_el_icon, {
                            onClick: _cache[1] || (_cache[1] = withModifiers(($event) => showVisible.value = true, ["stop"]))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ZoomIn)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_icon, {
                            onClick: _cache[2] || (_cache[2] = withModifiers(($event) => fileUrl.value = "", ["stop"]))
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Delete)
                            ]),
                            _: 1
                          })
                        ])
                      ], 64)) : (openBlock(), createBlock(_component_el_icon, {
                        key: 3,
                        class: "ele-uploader-icon",
                        style: normalizeStyle([{ "font-size": fontSize }])
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Plus)
                        ]),
                        _: 1
                      }, 8, ["style"]))
                    ], 4)) : _ctx.type == unref(UploadType).File ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      unref(attrs)["auto-upload"] !== false ? (openBlock(), createBlock(_component_el_button, {
                        key: 0,
                        type: "primary",
                        loading: uploadLoading.value,
                        icon: "UploadFilled"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(uploadLoading.value ? "上传中" : _ctx.buttonLabel), 1)
                        ]),
                        _: 1
                      }, 8, ["loading"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createVNode(_component_el_button, {
                          type: "primary",
                          slot: "trigger",
                          loading: uploadLoading.value,
                          icon: "UploadFilled"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(uploadLoading.value ? "上传中" : "选择文件"), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"]),
                        createVNode(_component_el_button, {
                          style: { "margin-left": "10px" },
                          type: "success",
                          icon: "Select",
                          onClick: submitUpload
                        }, {
                          default: withCtx(() => [
                            createTextVNode("确认上传")
                          ]),
                          _: 1
                        })
                      ], 64))
                    ], 64)) : _ctx.type == unref(UploadType).Pic && multiple.value ? (openBlock(), createElementBlock("div", {
                      key: 2,
                      class: "els_upload_pic",
                      style: normalizeStyle([{ width: _ctx.width.appendPx() }, { height: _ctx.height.appendPx() }])
                    }, [
                      createVNode(_component_el_icon, {
                        style: normalizeStyle([{ "font-size": fontSize }])
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Plus)
                        ]),
                        _: 1
                      }, 8, ["style"])
                    ], 4)) : createCommentVNode("", true)
                  ])
                ]),
                file: withCtx(({ file }) => [
                  renderSlot(_ctx.$slots, "file", { file }, () => [
                    _ctx.type == unref(UploadType).Pic && multiple.value ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "els_upload_pic",
                      style: normalizeStyle([{ width: _ctx.width.appendPx() }, { height: _ctx.height.appendPx() }])
                    }, [
                      file.status != "success" ? (openBlock(), createBlock(_component_el_progress, {
                        key: 0,
                        type: "circle",
                        percentage: file.percentage,
                        style: normalizeStyle([{ width: _ctx.width.appendPx() }, { height: _ctx.height.appendPx() }])
                      }, null, 8, ["percentage", "style"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createElementVNode("img", {
                          class: "els-upload-list__item-thumbnail",
                          width: _ctx.width,
                          height: _ctx.height,
                          src: file.url
                        }, null, 8, _hoisted_6$3),
                        createElementVNode("span", _hoisted_7$3, [
                          createVNode(_component_el_icon, {
                            onClick: ($event) => handlePreview(file)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_zoom_in)
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          createVNode(_component_el_icon, {
                            onClick: ($event) => handleRemove(file)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_Delete)
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ], 64))
                    ], 4)) : createCommentVNode("", true)
                  ])
                ]),
                _: 2
              }, [
                _ctx.$slots["trigger"] ? {
                  name: "trigger",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "trigger")
                  ]),
                  key: "0"
                } : void 0,
                _ctx.$slots["tip"] ? {
                  name: "tip",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "tip")
                  ]),
                  key: "1"
                } : void 0
              ]), 1040, ["file-list", "class", "action", "show-file-list", "list-type", "name", "disabled"]),
              showVisible.value && fileList.value.length ? (openBlock(), createBlock(_component_els_image_viewer, {
                key: 0,
                url: fileList.value.map((ele) => ele.url),
                "initial-index": previewIndex.value,
                "hide-on-click-modal": true,
                onClose: _cache[4] || (_cache[4] = ($event) => showVisible.value = false)
              }, null, 8, ["url", "initial-index"])) : createCommentVNode("", true)
            ])
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
const Upload_vue_vue_type_style_index_0_lang = "";
_sfc_main$y.install = (app) => {
  app.component(_sfc_main$y.__name, _sfc_main$y);
};
const _hoisted_1$l = { class: "els-node" };
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsTimePicker",
    inheritAttrs: false
  },
  __name: "TimePicker",
  props: {
    type: { default: "date" },
    modelValue: {},
    start: {},
    end: {},
    greaterThan: {},
    lessThan: {},
    width: { default: "120" },
    isShortcuts: { type: Boolean },
    defaultValue: {},
    disabledHours: {},
    disabledMinutes: {},
    disabledSeconds: {},
    valueSeparator: { default: "," },
    valueFormat: { default: "HH:mm:ss" },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:start", "update:end", "visible-change"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const attrs = useAttrs();
    const timeValue = ref();
    const selectVisible = ref(false);
    const lessHour = ref(0);
    const lessMinute = ref(0);
    const lessSecond = ref(0);
    const greaterHour = ref(0);
    const greaterMinute = ref(0);
    const greaterSecond = ref(0);
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop !== void 0) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    function initStartModelValue() {
      if (props.start === void 0 && getModelValue && attrs.propStart !== void 0) {
        return getModelValue(attrs.propStart);
      }
      return props.start;
    }
    function initEndModelValue() {
      if (props.end === void 0 && getModelValue && attrs.propEnd !== void 0) {
        return getModelValue(attrs.propEnd);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      if (attrs["is-range"]) {
        const startValue = initStartModelValue();
        const endValue = initEndModelValue();
        timeValue.value = [startValue, endValue];
      }
    });
    watchEffect(() => {
      const val = initModelValue();
      if (val !== void 0) {
        if (attrs["is-range"]) {
          if (val) {
            timeValue.value = val.split(props.valueSeparator);
          }
        } else {
          timeValue.value = val;
        }
      }
    });
    watch(timeValue, (val) => {
      handleReturnResult(val);
    });
    function makeRange(start, end) {
      const result = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    }
    function initLessData() {
      if (props.lessThan) {
        lessHour.value = parseInt(props.lessThan.split(":")[0]);
        lessMinute.value = parseInt(props.lessThan.split(":")[1]);
        lessSecond.value = parseInt(props.lessThan.split(":")[2]);
      }
    }
    function initGreaterData() {
      if (props.greaterThan) {
        greaterHour.value = parseInt(props.greaterThan.split(":")[0]);
        greaterMinute.value = parseInt(props.greaterThan.split(":")[1]);
        greaterSecond.value = parseInt(props.greaterThan.split(":")[2]);
      }
    }
    function disabledHourFn() {
      if (!selectVisible) {
        return [];
      }
      initLessData();
      initGreaterData();
      if (attrs["is-range"] && !timeValue) {
        return [];
      }
      let hours = [];
      if (props.lessThan) {
        if (lessMinute.value == 0 && lessSecond.value == 0) {
          hours = makeRange(lessHour.value, 24);
        } else {
          hours = makeRange(lessHour.value + 1, 24);
        }
      }
      if (props.greaterThan) {
        if (greaterMinute.value == 59 && greaterSecond.value == 59) {
          hours = makeRange(0, greaterHour.value);
        } else {
          hours = makeRange(0, greaterHour.value - 1);
        }
      }
      if (typeof props.disabledHours === "function") {
        return props.disabledHours().concat(hours);
      }
      return (props.disabledHours ?? []).concat(hours);
    }
    function disabledMinutesFn(selectedHour) {
      if (!selectVisible.value) {
        return [];
      }
      initLessData();
      initGreaterData();
      if (attrs["is-range"] && !timeValue) {
        return [];
      }
      let minutes = [];
      if (props.lessThan) {
        if (selectedHour == lessHour.value && lessHour.value == 0) {
          minutes = makeRange(lessMinute.value, 60);
        } else if (selectedHour == lessHour.value) {
          minutes = makeRange(lessMinute.value + 1, 60);
        }
      }
      if (props.greaterThan) {
        if (selectedHour == greaterHour.value && greaterHour.value == 59) {
          minutes = minutes.concat(makeRange(0, greaterMinute.value));
        } else if (selectedHour == greaterHour.value) {
          minutes = minutes.concat(makeRange(0, greaterMinute.value - 1));
        }
      }
      if (typeof props.disabledMinutes === "function") {
        return props.disabledMinutes().concat(minutes);
      }
      return (props.disabledMinutes ?? []).concat(minutes);
    }
    function disabledSecondsFn(selectedHour, selectedMinute) {
      if (!selectVisible) {
        return [];
      }
      initLessData();
      initGreaterData();
      if (attrs["is-range"] && !timeValue.value) {
        return [];
      }
      let seconds = [];
      if (props.lessThan) {
        if (selectedHour == lessHour.value && selectedMinute == lessMinute.value) {
          seconds = makeRange(lessSecond.value, 60);
        }
      }
      if (props.greaterThan) {
        if (selectedHour == greaterHour.value && selectedMinute == greaterMinute.value) {
          seconds = seconds.concat(makeRange(0, greaterSecond.value));
        }
      }
      if (typeof props.disabledSeconds === "function") {
        return props.disabledSeconds().concat(seconds);
      }
      return (props.disabledSeconds ?? []).concat(seconds);
    }
    function handleVisible(visible) {
      selectVisible.value = visible;
      emits("visible-change", visible);
    }
    const setModelValue = inject("setModelValue", () => {
    });
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnStartValue(value) {
      emits("update:start", value);
      if (props.start === void 0 && setModelValue && attrs.propStart !== void 0) {
        setModelValue(attrs.propStart, value, props.aIndex);
      }
    }
    function handleReturnEndValue(value) {
      emits("update:end", value);
      if (props.end === void 0 && setModelValue && attrs.propEnd !== void 0) {
        setModelValue(attrs.propEnd, value, props.aIndex);
      }
    }
    function handleReturnResult(val) {
      if (!val) {
        handleReturnStartValue("");
        handleReturnEndValue("");
        handleReturnModelValue("");
      } else {
        if (attrs["is-range"] === true) {
          let startDate = val[0];
          let endDate = val[1];
          handleReturnStartValue(startDate);
          handleReturnEndValue(endDate);
          if (!startDate && !endDate) {
            handleReturnModelValue("");
          } else {
            handleReturnModelValue(startDate + props.valueSeparator + endDate);
          }
        } else if (val) {
          handleReturnModelValue(val);
        } else {
          handleReturnModelValue("");
        }
      }
    }
    if (attrs["is-range"]) {
      if (props.start || props.end) {
        if (props.end) {
          timeValue.value = [props.start, props.end];
        } else {
          timeValue.value = [props.start, props.start];
        }
      } else if (props.modelValue) {
        timeValue.value = props.modelValue.split(",");
      }
    } else if (props.modelValue) {
      timeValue.value = props.modelValue;
    }
    const currWidth = ref(props.width);
    const pickerStyle = ref([]);
    if (currWidth.value) {
      pickerStyle.value.push({ width: (_a = currWidth.value) == null ? void 0 : _a.appendPx() });
    }
    if (attrs["is-range"] !== void 0) {
      pickerStyle.value.push({ "flex-grow": 0 });
    }
    return (_ctx, _cache) => {
      const _component_el_time_picker = resolveComponent("el-time-picker");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createVNode(_component_el_time_picker, {
              modelValue: timeValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => timeValue.value = $event),
              "value-format": _ctx.valueFormat,
              style: normalizeStyle(pickerStyle.value),
              "disabled-hours": disabledHourFn,
              "disabled-minutes": disabledMinutesFn,
              "disabled-seconds": disabledSecondsFn,
              onVisibleChange: handleVisible
            }, null, 8, ["modelValue", "value-format", "style"])
          ]),
          _: 1
        }, 16)
      ]);
    };
  }
});
_sfc_main$x.install = (app) => {
  app.component(_sfc_main$x.__name, _sfc_main$x);
};
const _hoisted_1$k = { class: "els-node" };
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsTimePickerRange", inheritAttrs: false },
  __name: "TimePickerRange",
  props: {
    single: { type: Boolean, default: true },
    type: { default: "date" },
    modelValue: {},
    start: {},
    end: {},
    greaterThan: {},
    lessThan: {},
    width: {},
    isShortcuts: { type: Boolean },
    defaultValue: {},
    disabledHours: {},
    disabledMinutes: {},
    disabledSeconds: {},
    valueSeparator: { default: "," },
    valueFormat: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: { default: QueryDataType.Date },
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean, default: true },
    propStart: {},
    propEnd: {}
  },
  emits: ["update:modelValue", "update:start", "update:end"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const dateValue = ref();
    const dateStartValue = ref();
    const dateEndValue = ref();
    watch(dateValue, (val) => {
      emits("update:modelValue", val);
    });
    watch(() => props.start, (val) => {
      dateStartValue.value = val;
    });
    watch(() => props.end, (val) => {
      dateEndValue.value = val;
    }, { immediate: true });
    watch(dateStartValue, (val) => {
      if (!props.single) {
        if (!val && !dateStartValue.value) {
          dateValue.value = "";
        } else {
          dateValue.value = [val, dateEndValue.value ?? ""].join(props.valueSeparator);
        }
      }
      emits("update:start", val);
    });
    watch(dateEndValue, (val) => {
      if (!props.single) {
        if (!val && !dateStartValue.value) {
          dateValue.value = "";
        } else {
          dateValue.value = [dateStartValue.value ?? "", val].join(props.valueSeparator);
        }
      }
      emits("update:end", val);
    });
    watch(() => props.modelValue, (val) => {
      dateValue.value = val;
    }, { immediate: true });
    const startLessThanCpt = computed(() => {
      if (dateEndValue.value) {
        return dateEndValue.value;
      }
      if (props.lessThan) {
        return props.lessThan;
      }
      return "";
    });
    const endGreaterThanCpt = computed(() => {
      if (dateStartValue.value) {
        return dateStartValue.value;
      }
      if (props.greaterThan) {
        return props.greaterThan;
      }
      return "";
    });
    return (_ctx, _cache) => {
      const _component_els_time_picker = resolveComponent("els-time-picker");
      const _component_el_space = resolveComponent("el-space");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$k, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            _ctx.single ? (openBlock(), createBlock(_component_els_time_picker, mergeProps({
              key: 0,
              "is-range": true,
              modelValue: dateValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dateValue.value = $event)
            }, props, {
              width: "200",
              defaultValue: _ctx.defaultValue,
              start: dateStartValue.value,
              "onUpdate:start": _cache[1] || (_cache[1] = ($event) => dateStartValue.value = $event),
              end: dateEndValue.value,
              "onUpdate:end": _cache[2] || (_cache[2] = ($event) => dateEndValue.value = $event)
            }), {
              default: withCtx((cell) => [
                renderSlot(_ctx.$slots, "default", { cell })
              ]),
              "range-separator": withCtx(() => [
                renderSlot(_ctx.$slots, "range-separator")
              ]),
              _: 3
            }, 16, ["modelValue", "defaultValue", "start", "end"])) : (openBlock(), createBlock(_component_el_space, {
              key: 1,
              class: "els-range"
            }, {
              default: withCtx(() => [
                createVNode(_component_els_time_picker, mergeProps(unref(attrs), {
                  "less-than": startLessThanCpt.value,
                  placeholder: unref(attrs)["start-placeholder"],
                  defaultValue: _ctx.defaultValue ? _ctx.defaultValue[0] : "",
                  modelValue: dateStartValue.value,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dateStartValue.value = $event)
                }), null, 16, ["less-than", "placeholder", "defaultValue", "modelValue"]),
                renderSlot(_ctx.$slots, "range-separator", {}, () => [
                  createTextVNode("-")
                ]),
                createVNode(_component_els_time_picker, mergeProps(unref(attrs), {
                  "greater-than": endGreaterThanCpt.value,
                  placeholder: unref(attrs)["end-placeholder"],
                  defaultValue: _ctx.defaultValue ? _ctx.defaultValue[1] : "",
                  modelValue: dateEndValue.value,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dateEndValue.value = $event)
                }), null, 16, ["greater-than", "placeholder", "defaultValue", "modelValue"])
              ]),
              _: 3
            }))
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
_sfc_main$w.install = (app) => {
  app.component(_sfc_main$w.__name, _sfc_main$w);
};
const _hoisted_1$j = { class: "els-node" };
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsDatePicker", inheritAttrs: false },
  __name: "DatePicker",
  props: {
    type: { default: "date" },
    modelValue: {},
    start: {},
    end: {},
    valueFormat: {},
    greaterThan: {},
    lessThan: {},
    width: {},
    isShortcuts: { type: Boolean },
    disabledDate: {},
    shortcutsDate: {},
    shortcuts: {},
    valueSeparator: { default: "," },
    defaultTime: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:start", "update:end"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const currValueFormat = ref();
    const dateValue = ref();
    const currDefaultTime = ref();
    const currWidth = ref(props.width);
    if (props.defaultTime) {
      if (typeof props.defaultTime === "string") {
        currDefaultTime.value = /* @__PURE__ */ new Date("1991-08-28 " + props.defaultTime);
      } else if (Array.isArray(props.defaultTime)) {
        currDefaultTime.value = props.defaultTime.map((ele) => {
          return /* @__PURE__ */ new Date("1991-08-28 " + ele);
        });
      }
    }
    let pickerOptions = ref([]);
    function initValue() {
      if (props.type == "daterange" || props.type == "datetimerange" || props.type == "monthrange" || props.type == "dates") {
        if (props.start && props.end) {
          dateValue.value = [props.start.toString(), props.end.toString()];
        } else if (props.start) {
          dateValue.value = [props.start.toString(), props.start.toString()];
        } else if (props.modelValue) {
          dateValue.value = props.modelValue.toString().split(props.valueSeparator);
        }
      } else {
        dateValue.value = props.modelValue;
      }
    }
    function converToDate(val) {
      if (currValueFormat.value.indexOf("-") > -1 || currValueFormat.value == "x") {
        return new Date(val);
      } else {
        var pattern = /(\d{4})(\d{2})(\d{2})/;
        if (pattern.test(val)) {
          var formatedDate = val.replace(pattern, "$1-$2-$3");
          return new Date(formatedDate);
        }
        pattern = /(\d{4})(\d{2})/;
        if (pattern.test(val)) {
          var formatedDate = val.replace(pattern, "$1-$2");
          return new Date(formatedDate);
        }
        pattern = /(\d{4})/;
        if (pattern.test(val)) {
          var formatedDate = val.replace(pattern, "$1");
          return new Date(formatedDate);
        }
        return /* @__PURE__ */ new Date();
      }
    }
    function addDate(date, days) {
      if (days == void 0 || days == "") {
        days = 1;
      }
      const currDate = new Date(date);
      currDate.setDate(date.getDate() + days);
      var month = currDate.getMonth() + 1;
      var day = currDate.getDate();
      return /* @__PURE__ */ new Date(currDate.getFullYear() + "-" + getFormatDate(month) + "-" + getFormatDate(day));
    }
    function getFormatDate(arg) {
      if (arg == void 0 || arg == "") {
        return "";
      }
      var re = arg + "";
      if (re.length < 2) {
        re = "0" + re;
      }
      return re;
    }
    let currDisabledDate = function(time) {
      if (props.lessThan && props.greaterThan) {
        return time.getTime() >= converToDate(props.lessThan).getTime() || time.getTime() <= addDate(converToDate(props.greaterThan), -1).getTime();
      } else if (props.lessThan && !props.greaterThan) {
        return time.getTime() >= converToDate(props.lessThan).getTime();
      } else if (!props.lessThan && props.greaterThan) {
        return time.getTime() <= addDate(converToDate(props.greaterThan), -1).getTime();
      }
    };
    if (props.disabledDate) {
      currDisabledDate = props.disabledDate;
    }
    if (props.shortcuts) {
      pickerOptions.value = props.shortcuts;
    } else if (props.isShortcuts) {
      if (props.type.indexOf("range") == -1) {
        pickerOptions.value = [{
          text: "今天",
          value: /* @__PURE__ */ new Date()
        }, {
          text: "昨天",
          value: () => {
            const date = /* @__PURE__ */ new Date();
            date.setTime(date.getTime() - 3600 * 1e3 * 24);
            return date;
          }
        }, {
          text: "七天前  ",
          value: () => {
            const date = /* @__PURE__ */ new Date();
            date.setTime(date.getTime() - 3600 * 1e3 * 24 * 7);
            return date;
          }
        }];
      } else {
        let end = /* @__PURE__ */ new Date();
        let start = /* @__PURE__ */ new Date();
        if (props.shortcutsDate) {
          end = new Date(props.shortcutsDate);
          start = new Date(props.shortcutsDate);
        }
        pickerOptions.value = [
          {
            text: "今日",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              return [start, end];
            }
          },
          {
            text: "昨日",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              end.setTime(end.getTime() - 3600 * 1e3 * 24 * 1);
              start.setTime(start.getTime() - 3600 * 1e3 * 24 * 1);
              return [start, end];
            }
          },
          {
            text: "近7日",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              start.setTime(start.getTime() - 3600 * 1e3 * 24 * 6);
              return [start, end];
            }
          },
          {
            text: "近14日",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              start.setTime(start.getTime() - 3600 * 1e3 * 24 * 13);
              return [start, end];
            }
          },
          {
            text: "近30日",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              start.setTime(start.getTime() - 3600 * 1e3 * 24 * 29);
              return [start, end];
            }
          },
          {
            text: "近60日",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              start.setTime(start.getTime() - 3600 * 1e3 * 24 * 59);
              return [start, end];
            }
          },
          {
            text: "近90日",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              start.setTime(start.getTime() - 3600 * 1e3 * 24 * 89);
              return [start, end];
            }
          },
          {
            text: "本月",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              start = /* @__PURE__ */ new Date(end.getFullYear() + "-" + (end.getMonth() + 1) + "-01");
              return [start, end];
            }
          },
          {
            text: "上个月",
            value: () => {
              end = /* @__PURE__ */ new Date();
              start = /* @__PURE__ */ new Date();
              if (props.shortcutsDate) {
                end = new Date(props.shortcutsDate);
                start = new Date(props.shortcutsDate);
              }
              end = /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getFullYear() + "-" + ((/* @__PURE__ */ new Date()).getMonth() + 1) + "-01");
              end.setTime(end.getTime() - 3600 * 1e3 * 24 * 1);
              start = /* @__PURE__ */ new Date(end.getFullYear() + "-" + (end.getMonth() + 1) + "-01");
              return [start, end];
            }
          }
        ];
      }
    }
    const setModelValue = inject("setModelValue", () => {
    });
    function handleReturnModelValue(value) {
      emits("update:modelValue", value);
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, value, props.aIndex);
      }
    }
    function handleReturnStartValue(value) {
      emits("update:start", value);
      if (props.start === void 0 && setModelValue && attrs.propStart !== void 0) {
        setModelValue(attrs.propStart, value, props.aIndex);
      }
    }
    function handleReturnEndValue(value) {
      emits("update:end", value);
      if (props.end === void 0 && setModelValue && attrs.propEnd !== void 0) {
        setModelValue(attrs.propEnd, value, props.aIndex);
      }
    }
    function handleReturnResult(val) {
      if (!val) {
        handleReturnStartValue("");
        handleReturnEndValue("");
        handleReturnModelValue("");
      } else {
        if (props.type.indexOf("range") > -1) {
          handleReturnStartValue(val[0]);
          handleReturnEndValue(val[1]);
          if (!val[0] && !val[1]) {
            handleReturnModelValue("");
          } else {
            handleReturnModelValue(val.join(props.valueSeparator));
          }
        } else if (props.type == "dates" && Array.isArray(val)) {
          handleReturnModelValue(val.join(props.valueSeparator));
        } else {
          handleReturnModelValue(val);
        }
      }
    }
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    function initStartModelValue() {
      if (props.start === void 0 && getModelValue && attrs.propStart) {
        return getModelValue(attrs.propStart);
      }
      return props.start;
    }
    function initEndModelValue() {
      if (props.end === void 0 && getModelValue && attrs.propEnd) {
        return getModelValue(attrs.propEnd);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      if (props.type.indexOf("range") > -1 && (props.start !== void 0 && props.end !== void 0) || attrs.propStart && attrs.propEnd) {
        const startValue = initStartModelValue();
        const endValue = initEndModelValue();
        dateValue.value = [startValue, endValue];
      }
    });
    watchEffect(() => {
      const currValue = initModelValue();
      if (typeof currValue === "string" && (props.type.indexOf("range") > -1 || props.type == "dates")) {
        dateValue.value = currValue.split(props.valueSeparator);
      } else {
        dateValue.value = currValue;
      }
    });
    watch(() => props.modelValue, (val) => {
      if (typeof val === "string" && (props.type.indexOf("range") > -1 || props.type == "dates")) {
        dateValue.value = val.split(props.valueSeparator);
      } else {
        dateValue.value = val;
      }
    }, { immediate: true });
    watch(dateValue, (val) => {
      handleReturnResult(val);
    });
    const pickerStyle = ref([]);
    watchEffect(() => {
      var _a;
      currValueFormat.value = props.valueFormat;
      if (currValueFormat.value == "timestamp") {
        currValueFormat.value = "x";
      }
      currWidth.value = props.width;
      if (!currValueFormat.value) {
        switch (props.type) {
          case "year":
            currValueFormat.value = "YYYY";
            if (!currWidth.value) {
              currWidth.value = "100";
            }
            break;
          case "monthrange":
          case "month":
            currValueFormat.value = "YYYY-MM";
            if (!currWidth.value) {
              currWidth.value = "120";
            }
            break;
          case "daterange":
          case "dates":
          case "date":
            currValueFormat.value = "YYYY-MM-DD";
            if (!currWidth.value) {
              currWidth.value = "160";
            }
            if (props.defaultTime) {
              currValueFormat.value = "YYYY-MM-DD HH:mm:ss";
            }
            break;
          case "datetimerange":
            currValueFormat.value = "YYYY-MM-DD HH:mm:ss";
            if (!props.defaultTime) {
              currDefaultTime.value = [/* @__PURE__ */ new Date("1991-08-28 00:00:00"), /* @__PURE__ */ new Date("1991-08-28 23:59:59")];
            }
            if (!currWidth.value) {
              currWidth.value = "180";
            }
            break;
          case "datetime":
            currValueFormat.value = "YYYY-MM-DD HH:mm:ss";
            if (!currWidth.value) {
              currWidth.value = "200";
            }
            break;
          case "week":
            currValueFormat.value = "YYYY-MM-DD";
            if (!currWidth.value) {
              currWidth.value = "80";
            }
            break;
        }
        if (props.type.indexOf("range") > -1 && currWidth.value) {
          currWidth.value = (parseInt(currWidth.value) * 2).toString();
        }
      }
      if (currWidth.value) {
        pickerStyle.value.push({ width: (_a = currWidth.value) == null ? void 0 : _a.appendPx() });
      }
      if (props.type.indexOf("range") > -1) {
        pickerStyle.value.push({ "flex-grow": 0 });
      }
    });
    initValue();
    return (_ctx, _cache) => {
      const _component_el_date_picker = resolveComponent("el-date-picker");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$j, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createVNode(_component_el_date_picker, mergeProps({
              modelValue: dateValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dateValue.value = $event)
            }, unref(attrs), {
              type: _ctx.type,
              "value-format": currValueFormat.value,
              defaultTime: currDefaultTime.value,
              "disabled-date": unref(currDisabledDate),
              shortcuts: unref(pickerOptions),
              style: pickerStyle.value
            }), {
              default: withCtx((cell) => [
                renderSlot(_ctx.$slots, "default", { cell })
              ]),
              "range-separator": withCtx(() => [
                renderSlot(_ctx.$slots, "range-separator")
              ]),
              _: 3
            }, 16, ["modelValue", "type", "value-format", "defaultTime", "disabled-date", "shortcuts", "style"])
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
_sfc_main$v.install = (app) => {
  app.component(_sfc_main$v.__name, _sfc_main$v);
};
const _hoisted_1$i = { class: "els-node" };
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsDatePickerRange", inheritAttrs: false },
  __name: "DatePickerRange",
  props: {
    single: { type: Boolean, default: true },
    type: { default: "date" },
    modelValue: {},
    start: {},
    end: {},
    valueFormat: {},
    greaterThan: {},
    lessThan: {},
    width: {},
    isShortcuts: { type: Boolean },
    disabledDate: {},
    shortcutsDate: {},
    shortcuts: {},
    valueSeparator: { default: "," },
    defaultTime: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: { default: QueryDataType.Date },
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean, default: true },
    propStart: {},
    propEnd: {}
  },
  emits: ["update:modelValue", "update:start", "update:end"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const currDefaultTime = ref(props.defaultTime);
    if (props.type == "datetime" && !currDefaultTime.value) {
      currDefaultTime.value = ["00:00:00", "23:59:59"];
    }
    if (!currDefaultTime.value) {
      currDefaultTime.value = ["", ""];
    }
    const currType = props.single ? props.type + "range" : props.type;
    const dateValue = ref();
    const dateStartValue = ref();
    const dateEndValue = ref();
    watch(dateValue, (val) => {
      emits("update:modelValue", val);
    });
    watch(() => props.start, (val) => {
      dateStartValue.value = val;
    }, { immediate: true });
    watch(() => props.end, (val) => {
      dateEndValue.value = val;
    }, { immediate: true });
    watch(dateStartValue, (val) => {
      if (!props.single) {
        if (!val && !dateStartValue.value) {
          dateValue.value = "";
        } else {
          dateValue.value = [val, dateEndValue.value ?? ""].join(props.valueSeparator);
        }
      }
      emits("update:start", val);
    });
    watch(dateEndValue, (val) => {
      if (!props.single) {
        if (!val && !dateStartValue.value) {
          dateValue.value = "";
        } else {
          dateValue.value = [dateStartValue.value ?? "", val].join(props.valueSeparator);
        }
      }
      emits("update:end", val);
    });
    watch(() => props.modelValue, (val) => {
      dateValue.value = val;
    }, { immediate: true });
    return (_ctx, _cache) => {
      const _component_els_date_picker = resolveComponent("els-date-picker");
      const _component_el_space = resolveComponent("el-space");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", _hoisted_1$i, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            _ctx.single ? (openBlock(), createBlock(_component_els_date_picker, mergeProps({
              key: 0,
              modelValue: dateValue.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dateValue.value = $event)
            }, props, {
              defaultTime: currDefaultTime.value,
              type: unref(currType),
              start: dateStartValue.value,
              "onUpdate:start": _cache[1] || (_cache[1] = ($event) => dateStartValue.value = $event),
              end: dateEndValue.value,
              "onUpdate:end": _cache[2] || (_cache[2] = ($event) => dateEndValue.value = $event)
            }), {
              default: withCtx((cell) => [
                renderSlot(_ctx.$slots, "default", { cell })
              ]),
              "range-separator": withCtx(() => [
                renderSlot(_ctx.$slots, "range-separator")
              ]),
              _: 3
            }, 16, ["modelValue", "defaultTime", "type", "start", "end"])) : (openBlock(), createBlock(_component_el_space, {
              key: 1,
              class: "els-range"
            }, {
              default: withCtx(() => [
                createVNode(_component_els_date_picker, mergeProps(unref(attrs), {
                  type: unref(currType),
                  defaultTime: currDefaultTime.value ? currDefaultTime.value[0] : "",
                  modelValue: dateStartValue.value,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dateStartValue.value = $event)
                }), null, 16, ["type", "defaultTime", "modelValue"]),
                renderSlot(_ctx.$slots, "range-separator", {}, () => [
                  createTextVNode("-")
                ]),
                createVNode(_component_els_date_picker, mergeProps(unref(attrs), {
                  type: unref(currType),
                  defaultTime: currDefaultTime.value ? currDefaultTime.value[1] : "",
                  modelValue: dateEndValue.value,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dateEndValue.value = $event)
                }), null, 16, ["type", "defaultTime", "modelValue"])
              ]),
              _: 3
            }))
          ]),
          _: 3
        }, 16)
      ]);
    };
  }
});
_sfc_main$u.install = (app) => {
  app.component(_sfc_main$u.__name, _sfc_main$u);
};
const _hoisted_1$h = { key: 0 };
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsCollapseTransition" },
  __name: "CollapseTransition",
  props: {
    visible: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_el_collapse_transition = resolveComponent("el-collapse-transition");
      return openBlock(), createBlock(_component_el_collapse_transition, null, {
        default: withCtx(() => [
          _ctx.visible ? (openBlock(), createElementBlock("div", _hoisted_1$h, [
            renderSlot(_ctx.$slots, "default")
          ])) : createCommentVNode("", true)
        ]),
        _: 3
      });
    };
  }
});
_sfc_main$t.install = (app) => {
  app.component(_sfc_main$t.__name, _sfc_main$t);
};
const _hoisted_1$g = ["onClick"];
const _hoisted_2$a = { class: "air-table__context--info" };
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsMenuContext" },
  __name: "MenuContext",
  props: {
    menus: {},
    positionLeft: { default: 0 },
    positionTop: { default: 0 },
    visible: { type: Boolean, default: false },
    onSelect: {}
  },
  setup(__props) {
    var _a;
    const props = __props;
    const { proxy } = getCurrentInstance();
    const elsMenuCommand = inject("elsMenuCommand", () => null);
    const menuData = reactive([]);
    let idFieldname = "";
    let nameFieldname = "";
    let iconFieldname = "";
    if (proxy && ((_a = proxy.$lessConfig) == null ? void 0 : _a.menu)) {
      idFieldname = proxy.$lessConfig.menu.id;
      nameFieldname = proxy.$lessConfig.menu.name;
      iconFieldname = proxy.$lessConfig.menu.icon;
    }
    const isOutBottom = computed(() => {
      return props.positionTop + 30 * menuData.length + 30 > window.innerHeight;
    });
    const isOutScreen = computed(() => {
      return props.positionTop - 30 * menuData.length < 0 && isOutBottom.value;
    });
    const positionBottom = computed(() => {
      return window.innerHeight - props.positionTop;
    });
    watch(() => props.menus, (val) => {
      menuData.length = 0;
      if (val) {
        menuData.push(...val);
      }
    }, { immediate: true, deep: true });
    const triggerHideFn = clickDocumentHandler.bind(this);
    function clickDocumentHandler(e) {
      if (e.srcElement.className.indexOf && e.srcElement.className.indexOf("air-table__context") === -1 && e.srcElement.tagName !== "I") {
        proxy.$parent.contextMenuVisible = false;
      }
    }
    function menuCommand(menu) {
      if (!props.onSelect) {
        if (elsMenuCommand) {
          elsMenuCommand(menu);
        }
      } else {
        props.onSelect(menu);
      }
    }
    onMounted(() => {
      document.addEventListener("mousedown", triggerHideFn);
    });
    onUnmounted(() => {
      document.removeEventListener("mousedown", triggerHideFn);
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("ul", {
        class: normalizeClass(["air-table__context--menu", { "outscreen-menu": isOutScreen.value }]),
        style: normalizeStyle([{ left: _ctx.positionLeft + "px" }, { top: isOutBottom.value ? "auto" : _ctx.positionTop + "px" }, { bottom: !isOutBottom.value ? "auto" : positionBottom.value + "px" }])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(menuData, (item) => {
          return openBlock(), createElementBlock("li", {
            class: "air-table__context--list",
            key: item[unref(idFieldname)],
            onClick: ($event) => menuCommand(item)
          }, [
            createElementVNode("i", {
              class: normalizeClass(item[unref(iconFieldname)])
            }, null, 2),
            createElementVNode("span", _hoisted_2$a, toDisplayString(item[unref(nameFieldname)]), 1)
          ], 8, _hoisted_1$g);
        }), 128))
      ], 6)), [
        [vShow, _ctx.visible]
      ]);
    };
  }
});
const MenuContext_vue_vue_type_style_index_0_scoped_6cd6ce9d_lang = "";
const MenuContext = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-6cd6ce9d"]]);
MenuContext.install = (app) => {
  app.component(MenuContext.__name, MenuContext);
};
const _hoisted_1$f = {
  key: 0,
  class: "els-table-operate"
};
const _hoisted_2$9 = { class: "els-table-operate-link" };
const _hoisted_3$5 = ["onClick"];
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsMenuDropdown" },
  __name: "MenuDropdown",
  props: {
    menus: {},
    isFold: { type: Boolean },
    unFoldCount: { default: 0 },
    isMobile: { type: Boolean },
    onSelect: {}
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const { proxy } = getCurrentInstance();
    const dialogVisible = ref(false);
    const unFoldMenus = reactive([]);
    const menuData = reactive([]);
    if (!((_a = proxy.$lessConfig) == null ? void 0 : _a.menu)) {
      console.log("未设置全局配置$lessConfig，无法使用菜单");
    }
    const elsMenuCommand = inject("elsMenuCommand", () => null);
    let idFieldname = "";
    let nameFieldname = "";
    let iconFieldName = "";
    if (proxy && ((_b = proxy.$lessConfig) == null ? void 0 : _b.menu)) {
      idFieldname = proxy.$lessConfig.menu.id;
      nameFieldname = proxy.$lessConfig.menu.name;
      iconFieldName = proxy.$lessConfig.menu.icon;
    }
    watch(() => props.menus, (val) => {
      menuData.length = 0;
      unFoldMenus.length = 0;
      if (val) {
        menuData.push(...val);
        if (props.unFoldCount > 0) {
          unFoldMenus.push(...menuData.splice(0, props.unFoldCount));
        }
      }
    }, { immediate: true, deep: true });
    function menuCommand(menu) {
      if (!props.onSelect) {
        if (elsMenuCommand) {
          elsMenuCommand(menu);
        }
      } else {
        props.onSelect(menu);
      }
    }
    return (_ctx, _cache) => {
      const _component_el_link = resolveComponent("el-link");
      const _component_arrow_down = resolveComponent("arrow-down");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      const _component_el_dialog = resolveComponent("el-dialog");
      return unref(nameFieldname) ? (openBlock(), createElementBlock("div", _hoisted_1$f, [
        _ctx.isMobile ? (openBlock(), createBlock(_component_el_link, {
          key: 0,
          type: "primary",
          onClick: _cache[0] || (_cache[0] = ($event) => dialogVisible.value = !dialogVisible.value)
        }, {
          default: withCtx(() => [
            createTextVNode("操作")
          ]),
          _: 1
        })) : _ctx.isFold || _ctx.unFoldCount > 0 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unFoldMenus, (item) => {
            return openBlock(), createBlock(_component_el_link, {
              class: "els-table-operate-link",
              type: "primary",
              onClick: ($event) => menuCommand(item),
              key: item[unref(idFieldname)]
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(item[unref(nameFieldname)]), 1)
              ]),
              _: 2
            }, 1032, ["onClick"]);
          }), 128)),
          menuData.length ? (openBlock(), createBlock(_component_el_dropdown, {
            key: 0,
            onCommand: menuCommand
          }, {
            dropdown: withCtx(() => [
              createVNode(_component_el_dropdown_menu, null, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(menuData, (item) => {
                    return openBlock(), createBlock(_component_el_dropdown_item, {
                      key: item[unref(idFieldname)],
                      command: item
                    }, {
                      default: withCtx(() => [
                        createElementVNode("i", {
                          class: normalizeClass("el-icon " + item[unref(iconFieldName)])
                        }, null, 2),
                        createTextVNode(toDisplayString(item[unref(nameFieldname)]), 1)
                      ]),
                      _: 2
                    }, 1032, ["command"]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createElementVNode("span", _hoisted_2$9, [
                createTextVNode(toDisplayString(_ctx.unFoldCount > 0 ? "更多操作" : "操作") + " ", 1),
                createVNode(_component_el_icon, { class: "el-icon--right" }, {
                  default: withCtx(() => [
                    createVNode(_component_arrow_down)
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ], 64)) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(menuData, (item) => {
          return openBlock(), createBlock(_component_el_link, {
            class: "els-table-operate-link",
            type: "primary",
            onClick: ($event) => menuCommand(item),
            key: item[unref(idFieldname)]
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(item[unref(nameFieldname)]), 1)
            ]),
            _: 2
          }, 1032, ["onClick"]);
        }), 128)),
        createVNode(_component_el_dialog, {
          "align-center": true,
          "append-to-body": true,
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => dialogVisible.value = $event),
          class: "table-column-operate-dialog",
          "show-close": false,
          width: "50%"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(menuData, (item) => {
              return openBlock(), createElementBlock("div", {
                class: "center",
                onClick: ($event) => menuCommand(item),
                style: { "line-height": "50px", "border-bottom": "1px solid #dcdcdc" }
              }, toDisplayString(item.MenuName), 9, _hoisted_3$5);
            }), 256))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ])) : createCommentVNode("", true);
    };
  }
});
const MenuDropdown_vue_vue_type_style_index_0_scoped_3e5f0c8f_lang = "";
const MenuDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-3e5f0c8f"]]);
MenuDropdown.install = (app) => {
  app.component(MenuDropdown.__name, MenuDropdown);
};
const _hoisted_1$e = { class: "els-tool-menu" };
const _hoisted_2$8 = { class: "els-tool-menu-button" };
const _hoisted_3$4 = {
  key: 0,
  class: "operationlog"
};
const _hoisted_4$2 = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-s-operation" }, null, -1);
const _hoisted_5$2 = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-check" }, null, -1);
const _hoisted_6$2 = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-close" }, null, -1);
const _hoisted_7$2 = { style: { "text-align": "center", "margin-top": "20px" } };
const _hoisted_8$2 = /* @__PURE__ */ createElementVNode("i", { class: "el-icon-upload" }, null, -1);
const _hoisted_9$2 = /* @__PURE__ */ createElementVNode("div", { class: "el-upload__text" }, [
  /* @__PURE__ */ createTextVNode("将文件拖到此处，或"),
  /* @__PURE__ */ createElementVNode("em", null, "点击上传")
], -1);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsMenuTool" },
  __name: "MenuTool",
  props: {
    url: {},
    logUrl: {},
    docUrl: {},
    noteUrl: {},
    mutiSaveUrl: {},
    data: {},
    buttonType: {},
    showMenuName: { type: Boolean, default: true },
    command: {},
    onSelect: {},
    onUploaded: {}
  },
  setup(__props, { expose: __expose }) {
    var _a, _b;
    const props = __props;
    const { proxy } = getCurrentInstance();
    if (!((_a = proxy.$lessConfig) == null ? void 0 : _a.menu)) {
      console.log("未设置全局配置$lessConfig，无法使用菜单");
    }
    let idFieldname = "";
    let actionTypeFieldname = "";
    let actionFieldname = "";
    let nameFieldname = "";
    let iconFieldname = "";
    let buttonColorFieldname = "";
    let buttonTypeFieldname = "";
    let groupFieldname = "";
    if (proxy && ((_b = proxy.$lessConfig) == null ? void 0 : _b.menu)) {
      idFieldname = proxy.$lessConfig.menu.id;
      nameFieldname = proxy.$lessConfig.menu.name;
      iconFieldname = proxy.$lessConfig.menu.icon;
      actionFieldname = proxy.$lessConfig.menu.action;
      actionTypeFieldname = proxy.$lessConfig.menu.actionType;
      buttonColorFieldname = proxy.$lessConfig.menu.buttonColor;
      buttonTypeFieldname = proxy.$lessConfig.menu.buttonType;
      groupFieldname = proxy.$lessConfig.menu.group;
    }
    const elsMenuCommand = inject("elsMenuCommand", () => null);
    const elsSaveTable = inject("elsSaveTable", () => null);
    const elsApiResult = inject("elsApiResult", () => null);
    const saveDataLoading = ref(false);
    const isTableEdit = ref(false);
    const menuData = reactive([]);
    const foldMenuData = reactive([]);
    const lastMenuData = reactive([]);
    const isPlain = ref(false);
    const isRound = ref(false);
    const isCircle = ref(false);
    const dialogLogVisible = ref(false);
    const dialogDocVisible = ref(false);
    const dialogNoteVisible = ref(false);
    const dialogUploadVisible = ref(false);
    const uploadInfo = ref({
      previewImg: "",
      uploadUrl: ""
    });
    if (props.buttonType == "Plain") {
      isPlain.value = true;
    }
    if (props.buttonType == "Round") {
      isRound.value = true;
    }
    if (props.buttonType == "Circle") {
      isCircle.value = true;
    }
    watch(() => props.url, (val) => {
      if (val) {
        val.post({}).then((res) => {
          if (res.ResultCode == "0") {
            initData(res.Data);
          }
        });
      }
    });
    watch(() => props.data, (val) => {
      if (val) {
        initData(val);
      }
    }, { immediate: true });
    function initData(val) {
      menuData.length = 0;
      menuData.push(...val);
      menuData.forEach((ele) => ele.IsLoading = false);
      if (menuData.length && menuData.filter((ele) => ele[groupFieldname] !== "").length) {
        lastMenuData.length = 0;
        lastMenuData.push(...menuData.filter((ele) => ele[buttonTypeFieldname] == "Search" || ele[buttonTypeFieldname] == "Back"));
        foldMenuData.length = 0;
        foldMenuData.push(...lessCom$1.dtGroupBy(menuData.filter((ele) => ele[buttonTypeFieldname] != "Search" && ele[buttonTypeFieldname] != "Back"), "FoldName", "SortIndex"));
        let noFoldMenus = foldMenuData.find((ele) => ele.key == "");
        if (noFoldMenus) {
          menuData.length = 0;
          menuData.push(...noFoldMenus.value);
        } else {
          menuData.length = 0;
        }
        const currfoldMenuData = foldMenuData.filter((ele) => ele.key != "");
        foldMenuData.length = 0;
        foldMenuData.push(...currfoldMenuData);
      }
    }
    function handleEditTable() {
      isTableEdit.value = true;
    }
    function handleSaveTable() {
      saveDataLoading.value = true;
      if (elsSaveTable) {
        elsSaveTable().then((res) => {
          if (res) {
            saveDataLoading.value = false;
          }
        }).catch(() => {
          saveDataLoading.value = false;
        });
      }
    }
    function handleUnEditTable() {
      isTableEdit.value = false;
    }
    function handleCommandMore(type) {
      if (props.command) {
        props.command(type);
        return;
      }
      switch (type) {
        case "log":
          dialogLogVisible.value = true;
          break;
        case "doc":
          dialogDocVisible.value = true;
          break;
        case "note":
          dialogNoteVisible.value = true;
          break;
      }
    }
    function triggerPowerMenu(menuID) {
      if (props.data) {
        var currPowerMenu = props.data.find((ele) => ele[actionFieldname] === menuID || ele[idFieldname] == menuID);
        if (currPowerMenu && elsMenuCommand) {
          elsMenuCommand(currPowerMenu);
        }
      }
    }
    function menuCommand(menu) {
      if (props.onSelect) {
        props.onSelect(menu);
        return;
      }
      if (menu[actionTypeFieldname] == "Import") {
        dialogUploadVisible.value = true;
        uploadInfo.value = {
          previewImg: menu.ActionScript,
          uploadUrl: menu.TargetUrl
        };
      } else if (elsMenuCommand) {
        elsMenuCommand(menu);
      }
    }
    function uploadSuccess(res) {
      if (props.onUploaded) {
        props.onUploaded(res);
      } else if (elsApiResult) {
        elsApiResult(res);
      }
    }
    __expose({
      triggerPowerMenu
    });
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_ArrowDown = resolveComponent("ArrowDown");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      const _component_el_tooltip = resolveComponent("el-tooltip");
      const _component_els_image = resolveComponent("els-image");
      const _component_el_link = resolveComponent("el-link");
      const _component_el_upload = resolveComponent("el-upload");
      const _component_el_dialog = resolveComponent("el-dialog");
      const _component_els_dialog = resolveComponent("els-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        createElementVNode("div", _hoisted_2$8, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(menuData, (menu) => {
            return openBlock(), createBlock(_component_el_button, {
              type: menu[unref(buttonColorFieldname)],
              icon: menu[unref(iconFieldname)] ? menu[unref(iconFieldname)].replace("el-icon-", "") : "",
              key: menu[unref(idFieldname)],
              "native-type": menu[unref(actionFieldname)] == "Search" || menu[unref(actionFieldname)] == "Save" ? "submit" : "button",
              plain: isPlain.value,
              round: isRound.value,
              circle: isCircle.value,
              loading: menu.IsLoading,
              onClick: ($event) => menuCommand(menu)
            }, createSlots({
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(_ctx.showMenuName ? menu[unref(nameFieldname)] : ""), 1)
              ]),
              _: 2
            }, [
              menu[unref(iconFieldname)] && !menu[unref(iconFieldname)].startsWith("el-icon-") ? {
                name: "icon",
                fn: withCtx(() => [
                  menu[unref(iconFieldname)] ? (openBlock(), createElementBlock("i", {
                    key: 0,
                    class: normalizeClass(menu[unref(iconFieldname)])
                  }, null, 2)) : createCommentVNode("", true)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["type", "icon", "native-type", "plain", "round", "circle", "loading", "onClick"]);
          }), 128)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(foldMenuData, (foldData, cindex) => {
            return openBlock(), createBlock(_component_el_dropdown, {
              key: cindex,
              onCommand: menuCommand
            }, {
              dropdown: withCtx(() => [
                createVNode(_component_el_dropdown_menu, null, {
                  default: withCtx(() => [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(foldData.value, (item, index) => {
                      return openBlock(), createBlock(_component_el_dropdown_item, {
                        key: index,
                        command: item
                      }, {
                        default: withCtx(() => [
                          createElementVNode("i", {
                            class: normalizeClass(item.ImageUrl)
                          }, null, 2),
                          createTextVNode(toDisplayString(item[unref(nameFieldname)]), 1)
                        ]),
                        _: 2
                      }, 1032, ["command"]);
                    }), 128))
                  ]),
                  _: 2
                }, 1024)
              ]),
              default: withCtx(() => [
                createVNode(_component_el_button, {
                  type: "primary",
                  icon: "Menu"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(foldData.key), 1),
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_ArrowDown)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1024);
          }), 128)),
          renderSlot(_ctx.$slots, "default"),
          (openBlock(true), createElementBlock(Fragment, null, renderList(lastMenuData, (menu) => {
            return openBlock(), createBlock(_component_el_button, {
              type: menu[unref(buttonColorFieldname)],
              key: menu[unref(idFieldname)],
              icon: menu[unref(iconFieldname)] ? menu[unref(iconFieldname)].replace("el-icon-", "") : "",
              "native-type": menu[unref(actionFieldname)] == "Search" || menu[unref(actionFieldname)] == "Save" ? "submit" : "button",
              plain: isPlain.value,
              round: isRound.value,
              circle: isCircle.value,
              loading: menu.IsLoading,
              onClick: ($event) => menuCommand(menu)
            }, createSlots({
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(_ctx.showMenuName ? menu[unref(nameFieldname)] : ""), 1)
              ]),
              _: 2
            }, [
              menu[unref(iconFieldname)] && !menu[unref(iconFieldname)].startsWith("el-icon-") ? {
                name: "icon",
                fn: withCtx(() => [
                  menu[unref(iconFieldname)] ? (openBlock(), createElementBlock("i", {
                    key: 0,
                    class: normalizeClass(menu[unref(iconFieldname)])
                  }, null, 2)) : createCommentVNode("", true)
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["type", "icon", "native-type", "plain", "round", "circle", "loading", "onClick"]);
          }), 128))
        ]),
        _ctx.mutiSaveUrl || _ctx.logUrl || _ctx.docUrl || _ctx.noteUrl ? (openBlock(), createElementBlock("div", _hoisted_3$4, [
          _ctx.mutiSaveUrl && !isTableEdit.value ? (openBlock(), createBlock(_component_el_tooltip, {
            key: 0,
            placement: "bottom-end",
            content: "可以双击指定行单独编辑"
          }, {
            default: withCtx(() => [
              !isTableEdit.value ? (openBlock(), createBlock(_component_el_button, {
                key: 0,
                onClick: handleEditTable,
                type: "primary"
              }, {
                default: withCtx(() => [
                  _hoisted_4$2,
                  createTextVNode("批量编辑 ")
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })) : _ctx.mutiSaveUrl ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createVNode(_component_el_button, {
              onClick: handleSaveTable,
              type: "success",
              loading: saveDataLoading.value
            }, {
              default: withCtx(() => [
                _hoisted_5$2,
                createTextVNode("批量保存 ")
              ]),
              _: 1
            }, 8, ["loading"]),
            createVNode(_component_el_button, {
              onClick: handleUnEditTable,
              type: "info"
            }, {
              default: withCtx(() => [
                _hoisted_6$2,
                createTextVNode("取消批量 ")
              ]),
              _: 1
            })
          ], 64)) : createCommentVNode("", true),
          _ctx.logUrl || _ctx.docUrl || _ctx.noteUrl ? (openBlock(), createBlock(_component_el_dropdown, {
            key: 2,
            onCommand: handleCommandMore
          }, {
            dropdown: withCtx(() => [
              createVNode(_component_el_dropdown_menu, null, {
                default: withCtx(() => [
                  _ctx.logUrl ? (openBlock(), createBlock(_component_el_dropdown_item, {
                    key: 0,
                    command: "log"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("操作日志")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  _ctx.docUrl ? (openBlock(), createBlock(_component_el_dropdown_item, {
                    key: 1,
                    command: "doc"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("帮助文档")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  _ctx.noteUrl ? (openBlock(), createBlock(_component_el_dropdown_item, {
                    key: 2,
                    command: "note"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("帮助书签")
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createVNode(_component_el_button, {
                type: "primary",
                icon: "menu"
              }, {
                default: withCtx(() => [
                  createTextVNode("更多"),
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(_component_ArrowDown)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createVNode(_component_el_dialog, {
          title: "上传",
          width: "500px",
          modelValue: dialogUploadVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogUploadVisible.value = $event)
        }, {
          default: withCtx(() => [
            uploadInfo.value.previewImg.startsWith("http") && !uploadInfo.value.previewImg.endsWith("xlsx") ? (openBlock(), createBlock(_component_els_image, {
              key: 0,
              url: uploadInfo.value.previewImg,
              width: "480",
              "is-preview": true
            }, null, 8, ["url"])) : (openBlock(), createBlock(_component_el_link, {
              key: 1,
              href: uploadInfo.value.previewImg,
              type: "primary",
              target: "_blank"
            }, {
              default: withCtx(() => [
                createTextVNode("点击下载模板地址")
              ]),
              _: 1
            }, 8, ["href"])),
            createElementVNode("div", _hoisted_7$2, [
              createVNode(_component_el_upload, {
                multiple: "",
                drag: "",
                "on-success": uploadSuccess,
                action: uploadInfo.value.uploadUrl
              }, {
                default: withCtx(() => [
                  _hoisted_8$2,
                  _hoisted_9$2
                ]),
                _: 1
              }, 8, ["action"])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(_component_els_dialog, {
          title: "操作日志",
          width: "75%",
          height: "600px",
          modelValue: dialogLogVisible.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => dialogLogVisible.value = $event),
          url: _ctx.logUrl
        }, null, 8, ["modelValue", "url"]),
        createVNode(_component_els_dialog, {
          title: "帮助文档",
          width: "75%",
          height: "600px",
          modelValue: dialogDocVisible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialogDocVisible.value = $event),
          url: _ctx.docUrl
        }, null, 8, ["modelValue", "url"]),
        createVNode(_component_els_dialog, {
          title: "帮助书签",
          width: "75%",
          height: "600px",
          modelValue: dialogNoteVisible.value,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dialogNoteVisible.value = $event),
          url: _ctx.noteUrl
        }, null, 8, ["modelValue", "url"])
      ]);
    };
  }
});
const MenuTool_vue_vue_type_style_index_0_lang = "";
_sfc_main$q.install = (app) => {
  app.component(_sfc_main$q.__name, _sfc_main$q);
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsMdPreview" },
  __name: "ElsMdPreview",
  props: {
    modelValue: {}
  },
  setup(__props) {
    const props = __props;
    const markDownContent = ref();
    onMounted(() => {
      if (props.modelValue) {
        markDownContent.value = props.modelValue;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MdPreview), {
        modelValue: markDownContent.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => markDownContent.value = $event)
      }, null, 8, ["modelValue"]);
    };
  }
});
_sfc_main$p.install = (app) => {
  app.component(_sfc_main$p.__name, _sfc_main$p);
};
const _withScopeId = (n) => (pushScopeId("data-v-ba015752"), n = n(), popScopeId(), n);
const _hoisted_1$d = {
  key: 0,
  class: "els-caption-sub-header"
};
const _hoisted_2$7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("i", { class: "dec" }, null, -1));
const _hoisted_3$3 = [
  _hoisted_2$7
];
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsCaption" },
  __name: "Caption",
  props: {
    type: {},
    title: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["els-caption", { "els-left-caption": _ctx.type == "left" }])
      }, [
        _ctx.type == "left" ? (openBlock(), createElementBlock("span", _hoisted_1$d, _hoisted_3$3)) : createCommentVNode("", true),
        createElementVNode("span", null, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], true)
        ])
      ], 2);
    };
  }
});
const Caption_vue_vue_type_style_index_0_scoped_ba015752_lang = "";
const Caption = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-ba015752"]]);
Caption.install = (app) => {
  app.component(Caption.__name, Caption);
};
const _hoisted_1$c = { style: { "display": "flex" } };
const _hoisted_2$6 = { class: "dialog-footer" };
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsDataModal" },
  __name: "DataModal",
  props: {
    modelValue: {},
    selectLabel: {},
    select: {},
    inputWidth: { default: "200" },
    url: {},
    dataUrl: {},
    buttonLabel: { default: "选择" },
    hasInput: { type: Boolean, default: true },
    hasButton: { type: Boolean, default: true },
    title: {},
    width: { default: "50%" },
    height: { default: "500px" },
    labelField: {},
    valueField: {},
    multiple: { type: Boolean },
    open: {},
    close: {},
    confirm: {},
    componentName: { default: "el-button" },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:select", "update:modelValue", "update:select-label"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const tagID = ref("data-modal-" + lessCom$1.Guid32());
    const currSelectValue = ref("");
    const currSelectLabel = ref();
    const currSelectData = ref();
    const dialogVisible = ref(false);
    const attrs = useAttrs();
    const setModelValue = inject("setModelValue", () => null);
    const getModelValue = inject("getModelValue", () => null);
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    watchEffect(() => {
      const currValue = initModelValue();
      currSelectValue.value = currValue ?? "";
    });
    watch(() => props.selectLabel, (val) => {
      currSelectLabel.value = val;
    }, { immediate: true });
    watch(() => props.dataUrl, (val) => {
      if (val) {
        val.post({ idString: currSelectValue }).then((res) => {
          if (res.ResultCode == "0") {
            currSelectData.value = res.Data;
            handleReturnResult();
          }
        });
      }
    }, { immediate: true });
    function registEvent() {
      window[tagID.value] = handleSelect;
    }
    function handleOpenModal() {
      if (props.open) {
        props.open();
      }
      dialogVisible.value = true;
    }
    function handleCloseModal() {
      if (props.close) {
        props.close();
      }
    }
    const confirmLoading = ref(false);
    function handleConfirm() {
      confirmLoading.value = true;
      if (props.confirm) {
        props.confirm().then((res) => {
          if (res) {
            dialogVisible.value = false;
            confirmLoading.value = false;
          }
        });
      }
    }
    function handleReturnModelValue(val) {
      emits("update:modelValue", val);
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, val, props.aIndex);
      }
    }
    function handleReturnResult() {
      if (currSelectData.value) {
        if (props.valueField && props.labelField) {
          if (Array.isArray(currSelectData.value)) {
            currSelectValue.value = currSelectData.value.map((ele) => ele[props.valueField ?? ""]).toString();
            currSelectLabel.value = currSelectData.value.map((ele) => ele[props.labelField ?? ""]).toString();
          } else {
            currSelectValue.value = currSelectData.value[props.valueField];
            currSelectLabel.value = currSelectData.value[props.labelField];
          }
          handleReturnModelValue(currSelectValue.value);
          emits("update:select-label", currSelectLabel.value);
        } else {
          currSelectValue.value = currSelectData.value;
          handleReturnModelValue(currSelectValue.value);
        }
        emits("update:select", currSelectData.value);
      } else {
        currSelectValue.value = "";
        currSelectLabel.value = "";
        emits("update:select-label", "");
        handleReturnModelValue("");
        emits("update:select", null);
      }
    }
    function handleSelect(row) {
      currSelectData.value = row;
      handleReturnResult();
      dialogVisible.value = false;
    }
    const modalUrl = computed(() => {
      if (!props.url) {
        return "";
      }
      registEvent();
      let cUrl = props.url;
      let currFieldValue = encodeURIComponent(currSelectValue.value);
      return cUrl.addUrlParameter("Transfer_ModalFieldValue", currFieldValue).addUrlParameter("Transfer_SelectIds", currFieldValue).addUrlParameter("Transfer_Multiple", props.multiple ? "True" : "False").addUrlParameter("Transfer_SelectTagID", tagID.value);
    });
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_el_tag = resolveComponent("el-tag");
      const _component_el_button = resolveComponent("el-button");
      const _component_els_dialog = resolveComponent("els-dialog");
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("span", _hoisted_1$c, [
          _ctx.hasInput ? (openBlock(), createBlock(_component_el_input, {
            key: 0,
            modelValue: currSelectValue.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currSelectValue.value = $event),
            style: normalizeStyle(_ctx.inputWidth ? "width:" + _ctx.inputWidth.appendPx() : "")
          }, null, 8, ["modelValue", "style"])) : createCommentVNode("", true),
          _ctx.hasButton ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.componentName), mergeProps({
            key: 1,
            type: "primary"
          }, unref(attrs), { onClick: handleOpenModal }), {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.buttonLabel ? _ctx.buttonLabel : "选择"), 1)
            ]),
            _: 1
          }, 16)) : createCommentVNode("", true),
          currSelectLabel.value ? (openBlock(), createBlock(_component_el_tag, { key: 2 }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(currSelectLabel.value), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        createVNode(_component_els_dialog, {
          title: _ctx.title,
          width: _ctx.width,
          contentHeight: _ctx.height,
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => dialogVisible.value = $event),
          url: modalUrl.value,
          onClose: handleCloseModal
        }, createSlots({
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          _: 2
        }, [
          !modalUrl.value ? {
            name: "footer",
            fn: withCtx(() => [
              createElementVNode("span", _hoisted_2$6, [
                createVNode(_component_el_button, {
                  onClick: _cache[1] || (_cache[1] = ($event) => dialogVisible.value = false)
                }, {
                  default: withCtx(() => [
                    createTextVNode("取消")
                  ]),
                  _: 1
                }),
                createVNode(_component_el_button, {
                  type: "primary",
                  loading: confirmLoading.value,
                  onClick: handleConfirm
                }, {
                  default: withCtx(() => [
                    createTextVNode(" 提交 ")
                  ]),
                  _: 1
                }, 8, ["loading"])
              ])
            ]),
            key: "0"
          } : void 0
        ]), 1032, ["title", "width", "contentHeight", "modelValue", "url"])
      ], 64);
    };
  }
});
const DataModal_vue_vue_type_style_index_0_scoped_65d2efb5_lang = "";
const DataModal = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-65d2efb5"]]);
DataModal.install = (app) => {
  app.component(DataModal.__name, DataModal);
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsButtonSelect" },
  __name: "ButtonSelect",
  props: {
    checkRows: {}
  },
  setup(__props) {
    const props = __props;
    function handleSelect() {
      const currCheckRows = props.checkRows;
      let selectTagID = lessCom$1.getUrlParms("Transfer_SelectTagID");
      var parent = window.parent;
      if (!parent[selectTagID]) {
        ElMessage.error("父页面接收方法不存在");
      }
      parent[selectTagID](currCheckRows);
    }
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createBlock(_component_el_button, {
        type: "success",
        icon: "Check",
        onClick: handleSelect
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode("选择")
          ])
        ]),
        _: 3
      });
    };
  }
});
_sfc_main$m.install = (app) => {
  app.component(_sfc_main$m.__name, _sfc_main$m);
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsButtonSearch" },
  __name: "ButtonSearch",
  emits: ["search"],
  setup(__props, { emit: emits }) {
    const loading = ref(false);
    const tableRef = inject("queryTableRef", "");
    const elsQuery = inject("elsQuery", () => null);
    function handleSearch() {
      if (tableRef && elsQuery) {
        elsQuery(false, tableRef);
      } else if (elsQuery) {
        elsQuery();
      } else {
        emits("search");
      }
    }
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createBlock(_component_el_button, {
        type: "primary",
        icon: "Search",
        onClick: handleSearch,
        loading: loading.value
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode("查询")
          ])
        ]),
        _: 3
      }, 8, ["loading"]);
    };
  }
});
_sfc_main$l.install = (app) => {
  app.component(_sfc_main$l.__name, _sfc_main$l);
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsButtonExport" },
  __name: "ButtonExport",
  props: {
    tableRef: {}
  },
  setup(__props) {
    const props = __props;
    const elsExport = inject("elsExport", () => null);
    const elsExportAll = inject("elsExportAll", () => null);
    const loading = ref(false);
    function handleExport() {
      loading.value = true;
      if (!props.tableRef && elsExportAll) {
        elsExportAll();
      } else if (elsExport) {
        elsExport(props.tableRef);
      }
      loading.value = false;
    }
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createBlock(_component_el_button, {
        type: "danger",
        icon: "Download",
        onClick: handleExport,
        loading: loading.value
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode("导出")
          ])
        ]),
        _: 3
      }, 8, ["loading"]);
    };
  }
});
_sfc_main$k.install = (app) => {
  app.component(_sfc_main$k.__name, _sfc_main$k);
};
const _hoisted_1$b = {
  key: 2,
  class: "els-list-operate",
  style: { "margin-left": "10px" }
};
const _hoisted_2$5 = {
  key: 0,
  class: "leo-list-add"
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsList", inheritAttrs: false },
  __name: "List",
  props: {
    modelValue: {},
    sortable: { type: Boolean, default: true },
    isRemove: { type: Boolean, default: true },
    isAdd: { type: Boolean, default: true },
    isModify: { type: Boolean, default: true },
    isConfirmRemove: { type: Boolean, default: true },
    itemClassName: {},
    hasForm: { type: Boolean, default: true },
    onAdd: {},
    itemKey: { default: "" },
    labelWidth: {}
  },
  emits: ["add", "update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currData = useVModel(props, "modelValue", emits);
    const dropData = ref([]);
    const currItemKey = ref(props.itemKey);
    if (!props.itemKey) {
      currData.value.forEach((ele) => {
        dropData.value.push({ itemKey: lessCom$1.Guid32(), value: ele });
      });
      currItemKey.value = "itemKey";
      watch(dropData, (val) => {
        emits("update:modelValue", val.map((ele) => ele.value));
      }, { deep: true });
    } else {
      dropData.value = currData.value;
    }
    const attrs = useAttrs();
    function handleAdd() {
      if (props.onAdd) {
        if (!props.itemKey) {
          dropData.value.push({ itemKey: lessCom$1.Guid32(), value: props.onAdd(dropData.value) });
        } else {
          dropData.value.push(props.onAdd(dropData.value));
        }
      } else {
        dropData.value.push({});
      }
    }
    function handleRemove(item) {
      var index = dropData.value.indexOf(item);
      dropData.value.splice(index, 1);
    }
    let container = h("div");
    let outContainer = h("div");
    watchEffect(() => {
      if (props.hasForm && dropData.value.length) {
        if (typeof dropData[0] !== "object") {
          outContainer = h(_sfc_main$$, { modelValue: currData });
          container = h("div");
        } else {
          container = h(_sfc_main$$);
          outContainer = h("div");
        }
      }
    });
    return (_ctx, _cache) => {
      const _component_Rank = resolveComponent("Rank");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Remove = resolveComponent("Remove");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createBlock(resolveDynamicComponent(unref(outContainer)), {
        class: "els-list",
        labelWidth: _ctx.labelWidth
      }, {
        default: withCtx(() => [
          createVNode(unref(draggable), mergeProps({
            list: dropData.value,
            handle: ".el-icon-rank"
          }, unref(attrs), { "item-key": currItemKey.value }), {
            item: withCtx(({ element, index }) => [
              (openBlock(), createBlock(resolveDynamicComponent(unref(container)), {
                modelValue: dropData.value[index],
                "onUpdate:modelValue": ($event) => dropData.value[index] = $event,
                inline: "",
                labelWidth: _ctx.labelWidth
              }, {
                default: withCtx(() => [
                  createElementVNode("div", {
                    class: normalizeClass(["listitem flex", _ctx.itemClassName])
                  }, [
                    _ctx.itemKey ? renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 0 }, { item: element, index, $item: element, $index: index }))) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, { item: element.value, index, $item: element.value, $index: index }))),
                    _ctx.sortable || _ctx.isRemove ? (openBlock(), createElementBlock("span", _hoisted_1$b, [
                      _ctx.sortable && _ctx.isModify ? renderSlot(_ctx.$slots, "drag", { key: 0 }, () => [
                        createVNode(_component_el_icon, { class: "el-icon-rank" }, {
                          default: withCtx(() => [
                            createVNode(_component_Rank)
                          ]),
                          _: 1
                        })
                      ]) : createCommentVNode("", true),
                      _ctx.isModify && _ctx.isRemove ? renderSlot(_ctx.$slots, "remove", { key: 1 }, () => [
                        _ctx.isConfirmRemove ? (openBlock(), createBlock(_component_el_popconfirm, {
                          key: 0,
                          title: "确定删除吗？",
                          onConfirm: ($event) => handleRemove(element)
                        }, {
                          reference: withCtx(() => [
                            createVNode(_component_el_icon, { class: "el-icon-remove" }, {
                              default: withCtx(() => [
                                createVNode(_component_Remove)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["onConfirm"])) : (openBlock(), createBlock(_component_el_icon, {
                          key: 1,
                          class: "el-icon-remove",
                          onClick: ($event) => handleRemove(element)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Remove)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]))
                      ]) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ], 2)
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue", "labelWidth"]))
            ]),
            _: 3
          }, 16, ["list", "item-key"]),
          _ctx.isModify && _ctx.isAdd ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
            renderSlot(_ctx.$slots, "add", {}, () => [
              createVNode(_component_el_button, {
                type: "info",
                icon: "edit",
                onClick: handleAdd
              }, {
                default: withCtx(() => [
                  createTextVNode("添加")
                ]),
                _: 1
              })
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["labelWidth"]);
    };
  }
});
const List_vue_vue_type_style_index_0_lang = "";
_sfc_main$j.install = (app) => {
  app.component(_sfc_main$j.__name, _sfc_main$j);
};
const _hoisted_1$a = { class: "custom-block-title" };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsTip" },
  __name: "Tip",
  props: {
    title: {},
    type: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["custom-block", _ctx.type == "warning" ? "warning" : "tip"])
      }, [
        createElementVNode("p", _hoisted_1$a, [
          renderSlot(_ctx.$slots, "title", {}, () => [
            createTextVNode(toDisplayString(_ctx.title ?? (_ctx.type == "warning" ? "WARNING" : "TIP")), 1)
          ], true)
        ]),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 2);
    };
  }
});
const Tip_vue_vue_type_style_index_0_scoped_fafd2227_lang = "";
const Tip = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-fafd2227"]]);
Tip.install = (app) => {
  app.component(Tip.__name, Tip);
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsFormNode" },
  __name: "FormNode",
  props: {
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: { type: Function },
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const hasForm = ref(false);
    const container = inject("container", "");
    const layer = inject("layer", "");
    if (container == "form") {
      hasForm.value = true;
    }
    const attrs = useAttrs();
    return (_ctx, _cache) => {
      const _component_els_form_item = resolveComponent("els-form-item");
      const _component_ElsCol = resolveComponent("ElsCol");
      return unref(layer) == "row" ? (openBlock(), createBlock(_component_ElsCol, { key: 0 }, {
        default: withCtx(() => [
          hasForm.value ? (openBlock(), createBlock(_component_els_form_item, normalizeProps(mergeProps({ key: 0 }, props)), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(unref(attrs))))
            ]),
            _: 3
          }, 16)) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, unref(attrs))))
        ]),
        _: 3
      })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        hasForm.value ? (openBlock(), createBlock(_component_els_form_item, normalizeProps(mergeProps({ key: 0 }, props)), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(unref(attrs))))
          ]),
          _: 3
        }, 16)) : renderSlot(_ctx.$slots, "default", normalizeProps(mergeProps({ key: 1 }, unref(attrs))))
      ], 64));
    };
  }
});
_sfc_main$h.install = (app) => {
  app.component(_sfc_main$h.__name, _sfc_main$h);
};
const property_input = [
  {
    "keyID": "60bf4a26d64d17b6a3ea163a3b943e75",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "b74ea924c95546db4eee695f8435740d",
        "keyName": "宽度",
        "keyCode": "width",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "5035ac60096d1c2921b602b1b718dba9",
        "keyName": "占位文本",
        "keyCode": "placeholder",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "2044936212a1c0f8d532891fa3bf451c",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "82d11804c5e576417f66eb84a75ee1d5",
        "keyName": "开始图标",
        "keyCode": "prefixIcon",
        "data": [],
        "componentType": "Input",
        "dataType": "String",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      },
      {
        "keyID": "b969b9e494756bf702412cd6ce19d2da",
        "keyName": "末尾图标",
        "keyCode": "suffixIcon",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "2fa2b4039ae22a6c86c65a5b29be37e6",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "15fd0aef25983bb34d83a7ec8b28f88d",
        "keyName": "开始标签",
        "keyCode": "prefixTag",
        "data": [],
        "componentType": "Input",
        "dataType": "String",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      },
      {
        "keyID": "59e529d5077bbcb7f78f58491c86d7dd",
        "keyName": "末尾标签",
        "keyCode": "suffixTag",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "componentName": "ElsRow"
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "1325b3da1e90a5c3f3e776fcd20daee8",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "22dfb3b30a67173376365ecb9739b63b",
        "keyName": "最大长度",
        "keyCode": "maxlength",
        "data": [],
        "componentType": "Input",
        "dataType": "String",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Number",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      },
      {
        "keyID": "d9b1e919d3433933c28ed5dd4af12b0f",
        "keyName": "显示字数",
        "keyCode": "showWordLimit",
        "data": [],
        "dataType": "Bool",
        "componentType": "Switch",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      }
    ],
    "config": {
      "arrayConfig": {},
      "componentName": "ElsRow"
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "c5d440baf1db26a5dbe3b6190da5a7ed",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "3b91bea58458a51fbc8809be51881b29",
        "keyName": "显示清除",
        "keyCode": "clearable",
        "data": [],
        "componentType": "Switch",
        "dataType": "Bool",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "defaultValue": "true"
      },
      {
        "keyID": "a1d2f8181ccb54c494963d2bdbaf65af",
        "keyName": "密码框",
        "keyCode": "showPassword",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Switch",
        "dataType": "Bool"
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "1ef4e73659bba931a3dd811634c80a98",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "03a20ae3d70dd25afa8b07e95af9de78",
        "keyName": "清除前后空格",
        "keyCode": "isTrim",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Switch",
        "dataType": "Bool"
      },
      {
        "keyID": "c232677203ac847728c56baffe182660",
        "keyName": "Url编码",
        "keyCode": "encode",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Switch",
        "dataType": "Bool"
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_switch = [
  {
    "keyID": "938a5b5c1f1c4e0bd4118ab39648f2f8",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "650fe77fd07a628de83408204e01f9fb",
        "keyName": "打开文本",
        "keyCode": "active-text",
        "data": [],
        "componentType": "Input",
        "dataType": "String",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "clearable": false,
            "isPassword": false,
            "showWordLimit": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      },
      {
        "keyID": "48ead6ddb42e9c3a891f93808e1d2b6a",
        "keyName": "关闭文本",
        "keyCode": "inactive-text",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "clearable": false,
            "isPassword": false,
            "showWordLimit": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "45a75049e36ff499df10b614583a5ec0",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "aaa91e6e34c2d8f27fe5ad27456adf9d",
        "keyName": "打开值",
        "keyCode": "active-value",
        "data": [],
        "componentType": "Input",
        "dataType": "String",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "clearable": false,
            "isPassword": false,
            "showWordLimit": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      },
      {
        "keyID": "e5c98755d594ae59898a6d524dd81fc9",
        "keyName": "关闭值",
        "keyCode": "inactive-value",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "clearable": false,
            "isPassword": false,
            "showWordLimit": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_inputNumber = [
  {
    "keyID": "a5b1d96caf744c084e55faaf50fe6ca9",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "0617de43dd3d85138ceaeec3f84663ca",
        "keyName": "按钮位置",
        "keyCode": "controls-position",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "dataType": "String",
            "data": [
              {
                "label": "两侧",
                "value": ""
              },
              {
                "label": "右侧",
                "value": "right"
              }
            ],
            "url": "",
            "labelField": "",
            "valueField": "",
            "multiple": false,
            "clearable": false,
            "filterable": false,
            "allow-create": false,
            "width": "",
            "placeholder": "",
            "teleported": false,
            "remote": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Select",
        "dataType": "String"
      },
      {
        "keyID": "d9f0df9fd6c6f08f1f28a21d1ccd9b5d",
        "keyName": "宽度",
        "keyCode": "width",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "985a7032310af215d2c9d81dd772fc95",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "c9f44ef72fef38bc8af1d6769ab18ba9",
        "keyName": "步长",
        "keyCode": "step",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Float",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "da1d5bb5312c470f8aafe1b24393cb2b",
        "keyName": "精度",
        "keyCode": "precision",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Number",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "2ab3238e666f131cfed8e45ce011d14d",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "c14353bb00866f80739b8819a94c0360",
        "keyName": "最小值",
        "keyCode": "min",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Float",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "c2f434f74d12246bad8f4bffb7df7d56",
        "keyName": "最大值",
        "keyCode": "max",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Float",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_radio = [
  {
    "keyID": "bc2fec2427ddd08fe7598b05dacedf29",
    "keyName": "按钮样式",
    "keyCode": "type",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "radio",
            "value": "radio"
          },
          {
            "label": "按钮",
            "value": "button"
          }
        ],
        "url": "",
        "labelField": "label",
        "valueField": "value"
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "String",
    "defaultValue": "button"
  },
  {
    "keyID": "c22a17d687c1569a7fe2e7979b12e9a0",
    "keyName": "数据源",
    "keyCode": "dataType",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "数据列表",
            "value": 1
          },
          {
            "label": "接口读取",
            "value": 2
          }
        ],
        "url": "",
        "labelField": "label",
        "valueField": "value"
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "Number",
    "defaultValue": "1"
  },
  {
    "keyID": "31aec5af7c8512667d41fdc786abf868",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "0b03a97658d4d34efe23eb40baa11766",
        "keyName": "宽度",
        "keyCode": "width",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "a61c2f0caca98debc569b26c7d3b0c8c",
        "keyName": "选项宽度",
        "keyCode": "optionWidth",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "currNode['type'].value=='radio' ",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "67cecb440365abb61e4aace2d5686cb9",
    "keyName": "数据列表",
    "keyCode": "modelValue",
    "data": [
      {
        "keyID": "6f3b17406d7edb401dcecddcb764c7e4",
        "keyName": "",
        "keyCode": "label",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "显示文本",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "aa9af377f57b5b1c70ae39952200040f",
        "keyName": "",
        "keyCode": "value",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "值",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "0",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom"
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==1",
        "disabled": "",
        "eventChange": ""
      }
    },
    "dataType": "Array",
    "arrayDataType": "Object"
  },
  {
    "keyID": "4aa99ce37d6e0fbfb045f18c9faf397d",
    "keyName": "数据接口",
    "keyCode": "url",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==2",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "6ac45742d153533c89be8c38ea6a03ff",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "84f659e12c75e78abad11c3c31932c0e",
        "keyName": "显示字段",
        "keyCode": "labelField",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "3116242ce5345ebe9efa0a0e3169c247",
        "keyName": "值字段",
        "keyCode": "valueField",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==2",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_checkbox = [
  {
    "keyID": "bc2fec2427ddd08fe7598b05dacedf29",
    "keyName": "按钮样式",
    "keyCode": "type",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "checkbox",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "checkbox",
            "value": "checkbox"
          },
          {
            "label": "按钮",
            "value": "button"
          }
        ],
        "url": "",
        "labelField": "label",
        "valueField": "value"
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "String",
    "defaultValue": "checkbox"
  },
  {
    "keyID": "c22a17d687c1569a7fe2e7979b12e9a0",
    "keyName": "数据源",
    "keyCode": "dataType",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "数据列表",
            "value": 1
          },
          {
            "label": "接口读取",
            "value": 2
          }
        ],
        "url": "",
        "labelField": "label",
        "valueField": "value"
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "Number",
    "defaultValue": "1"
  },
  {
    "keyID": "31aec5af7c8512667d41fdc786abf868",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "0b03a97658d4d34efe23eb40baa11766",
        "keyName": "宽度",
        "keyCode": "width",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "a61c2f0caca98debc569b26c7d3b0c8c",
        "keyName": "选项宽度",
        "keyCode": "optionWidth",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "currNode['type'].value=='radio' ",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "67cecb440365abb61e4aace2d5686cb9",
    "keyName": "数据列表",
    "keyCode": "modelValue",
    "data": [
      {
        "keyID": "6f3b17406d7edb401dcecddcb764c7e4",
        "keyName": "",
        "keyCode": "label",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "显示文本",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "aa9af377f57b5b1c70ae39952200040f",
        "keyName": "",
        "keyCode": "value",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "值",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "0",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom"
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==1",
        "disabled": "",
        "eventChange": ""
      }
    },
    "dataType": "Array",
    "arrayDataType": "Object"
  },
  {
    "keyID": "4aa99ce37d6e0fbfb045f18c9faf397d",
    "keyName": "数据接口",
    "keyCode": "url",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==2",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "6ac45742d153533c89be8c38ea6a03ff",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "84f659e12c75e78abad11c3c31932c0e",
        "keyName": "显示字段",
        "keyCode": "labelField",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "3116242ce5345ebe9efa0a0e3169c247",
        "keyName": "值字段",
        "keyCode": "valueField",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==2",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_select = [
  {
    "keyID": "c22a17d687c1569a7fe2e7979b12e9a0",
    "keyName": "数据源",
    "keyCode": "dataType",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "数据列表",
            "value": 1
          },
          {
            "label": "接口读取",
            "value": 2
          }
        ],
        "url": "",
        "labelField": "label",
        "valueField": "value"
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "Number",
    "defaultValue": "1"
  },
  {
    "keyID": "67cecb440365abb61e4aace2d5686cb9",
    "keyName": "数据列表",
    "keyCode": "modelValue",
    "data": [
      {
        "keyID": "6f3b17406d7edb401dcecddcb764c7e4",
        "keyName": "",
        "keyCode": "label",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "显示文本",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "aa9af377f57b5b1c70ae39952200040f",
        "keyName": "",
        "keyCode": "value",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "值",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "0",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom"
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==1",
        "disabled": "",
        "eventChange": ""
      }
    },
    "dataType": "Array",
    "arrayDataType": "Object"
  },
  {
    "keyID": "4aa99ce37d6e0fbfb045f18c9faf397d",
    "keyName": "数据接口",
    "keyCode": "url",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==2",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "6ac45742d153533c89be8c38ea6a03ff",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "84f659e12c75e78abad11c3c31932c0e",
        "keyName": "显示字段",
        "keyCode": "labelField",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "3116242ce5345ebe9efa0a0e3169c247",
        "keyName": "值字段",
        "keyCode": "valueField",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "currNode['dataType'].value==2",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "f43219afd9c203f255bdca9a7060d8c2",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "5c703310ff0bb2e0813d72c109c2e11e",
        "keyName": "多选",
        "keyCode": "multiple",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      },
      {
        "keyID": "717bb3d97275644535b5314d957f1b7a",
        "keyName": "显示清除",
        "keyCode": "clearable",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool",
        "defaultValue": "true"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "850f1351229ab44321526e778bd89d7f",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "d9363d60122ee734a915d63607a072d1",
        "keyName": "是否筛选",
        "keyCode": "filterable",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      },
      {
        "keyID": "645dfc27b5e7fc8d70eed47c2bc868c4",
        "keyName": "允许创建",
        "keyCode": "allow-create",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "currNode['filterable'].value==true",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "546662ca44854844760cd0fc4898ed72",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "dee3c6c8402ca1fba8fe695c6dcacbc0",
        "keyName": "宽度",
        "keyCode": "width",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "0f273ad1e2f7cfde654ba61f8b7c7696",
        "keyName": "占位文本",
        "keyCode": "placeholder",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "365c62d24d6308cf925c4b12015ced92",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "af94f7071b16b8ec37b188ca79f98c3b",
        "keyName": "元素插入Body",
        "keyCode": "teleported",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool",
        "defaultValue": "true"
      },
      {
        "keyID": "050471fcd7085a37d8cefba26e3371ee",
        "keyName": "远程搜索",
        "keyCode": "remote",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "parentNode['dataType'].value==2",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool",
        "defaultValue": ""
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_pic = [
  {
    "keyID": "9116dba237f1b937269b287d469c0edb",
    "keyName": "上传地址",
    "keyCode": "url",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "d1dbb0e693a82a2e813338c4b5f7a8fe",
    "keyName": "大小限制M",
    "keyCode": "sizeLimit",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "Float",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "81704d07c46be9883f52fff36096c470",
    "keyName": "尺寸限制",
    "keyCode": "picLimitType",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "不限制",
            "value": ""
          },
          {
            "label": "最小",
            "value": "Min"
          },
          {
            "label": "最大",
            "value": "Max"
          },
          {
            "label": "固定",
            "value": "Fixed"
          },
          {
            "label": "等比",
            "value": "FixedProportion"
          }
        ],
        "url": "",
        "labelField": "",
        "valueField": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Radio",
    "dataType": "String"
  },
  {
    "keyID": "b0c58a556779de8a47657b5d3edef014",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "ff0df9e76d758379b9f8e8700511bfb5",
        "keyName": "限制宽度",
        "keyCode": "picWidthLimit",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Float",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "1941031bd3d8bdd983a7c61913ac3d5f",
        "keyName": "限制高度",
        "keyCode": "picHeightLimit",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Float",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {
        "vif": "currNode['picLimitType'].value!=''"
      },
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "6883b83615ea250e48565d57b2d35129",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "a3934e6fea5f41511c66c31a3f63007f",
        "keyName": "ResourceCode",
        "keyCode": "resourceCode",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "61f4392caabdb4e90c59c255cb086457",
        "keyName": "RestrictCode",
        "keyCode": "restrictCode",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "7a9f6a9ff34b9e589df040d2d2bf2767",
    "keyName": "文件类型",
    "keyCode": "fileTypes",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "e5041a10342b4f1a233398c4241c0450",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "302ea0f0796e7becdbd254d712f57132",
        "keyName": "返回MD5参数",
        "keyCode": "hasMd5Parameter",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      },
      {
        "keyID": "45821220bef3c5ef1ac3bfa11af3bb38",
        "keyName": "返回尺寸",
        "keyCode": "isReturnSize",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_file = [
  {
    "keyID": "9116dba237f1b937269b287d469c0edb",
    "keyName": "上传地址",
    "keyCode": "url",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "required": 0,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": 0,
        "clearable": 0,
        "isPassword": 0,
        "isTrim": 0,
        "encode": 0
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "d1dbb0e693a82a2e813338c4b5f7a8fe",
    "keyName": "大小限制M",
    "keyCode": "sizeLimit",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "required": 0,
        "requiredMessage": "",
        "validType": "Float",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": 0,
        "clearable": 0,
        "isPassword": 0,
        "isTrim": 0,
        "encode": 0
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "6883b83615ea250e48565d57b2d35129",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "a3934e6fea5f41511c66c31a3f63007f",
        "keyName": "ResourceCode",
        "keyCode": "resourceCode",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": 0,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": 0,
            "clearable": 0,
            "isPassword": 0,
            "isTrim": 0,
            "encode": 0
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "61f4392caabdb4e90c59c255cb086457",
        "keyName": "RestrictCode",
        "keyCode": "restrictCode",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": 0,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": 0,
            "clearable": 0,
            "isPassword": 0,
            "isTrim": 0,
            "encode": 0
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "7a9f6a9ff34b9e589df040d2d2bf2767",
    "keyName": "文件类型",
    "keyCode": "fileTypes",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "required": 0,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": 0,
        "clearable": 0,
        "isPassword": 0,
        "isTrim": 0,
        "encode": 0
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "8e919598c1c6dec8a810c374c3016cde",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "c94910ab0d713424101851dff9de13d7",
        "keyName": "多文件",
        "keyCode": "multiple",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": 0,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      },
      {
        "keyID": "84485b20c71735b2d9657f23878c88ef",
        "keyName": "限制数量",
        "keyCode": "limit",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": 0,
            "requiredMessage": "",
            "validType": "Number",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": 0,
            "clearable": 0,
            "isPassword": 0,
            "isTrim": 0,
            "encode": 0
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "4c677ddcf8d255b83e352de09cca5550",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "a19a0247f9c0f1cea8a61f0d6f07f657",
        "keyName": "上传文件历史",
        "keyCode": "showFileList",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": 0,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      },
      {
        "keyID": "302ea0f0796e7becdbd254d712f57132",
        "keyName": "返回MD5参数",
        "keyCode": "hasMd5Parameter",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": 0,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_textarea = [
  {
    "keyID": "60bf4a26d64d17b6a3ea163a3b943e75",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "b74ea924c95546db4eee695f8435740d",
        "keyName": "宽度",
        "keyCode": "width",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "5035ac60096d1c2921b602b1b718dba9",
        "keyName": "占位文本",
        "keyCode": "placeholder",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "1ef4e73659bba931a3dd811634c80a98",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "1e389ba8d8c039908ab9c01aba79412c",
        "keyName": "行数",
        "keyCode": "rows",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Number",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String",
        "defaultValue": "3"
      },
      {
        "keyID": "65727a4022f5d7626e84ddca19aa9a0a",
        "keyName": "高度自适应",
        "keyCode": "autosize",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "1325b3da1e90a5c3f3e776fcd20daee8",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "22dfb3b30a67173376365ecb9739b63b",
        "keyName": "最大长度",
        "keyCode": "maxlength",
        "data": [],
        "componentType": "Input",
        "dataType": "String",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Number",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      },
      {
        "keyID": "d9b1e919d3433933c28ed5dd4af12b0f",
        "keyName": "显示字数",
        "keyCode": "showWordLimit",
        "data": [],
        "dataType": "Bool",
        "componentType": "Switch",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      }
    ],
    "config": {
      "arrayConfig": {},
      "componentName": "ElsRow"
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "c5d440baf1db26a5dbe3b6190da5a7ed",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "c232677203ac847728c56baffe182660",
        "keyName": "Url编码",
        "keyCode": "encode",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Switch",
        "dataType": "Bool"
      },
      {
        "keyID": "3b91bea58458a51fbc8809be51881b29",
        "keyName": "显示清除",
        "keyCode": "clearable",
        "data": [],
        "componentType": "Switch",
        "dataType": "Bool",
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        }
      }
    ],
    "config": {
      "arrayConfig": {},
      "baseConfig": {},
      "formConfig": {},
      "advancedConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_datamodal = [
  {
    "keyID": "5e6a12e2af64c446f348f1e26c4ddc9c",
    "keyName": "按钮文本",
    "keyCode": "buttonLabel",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "d2835e6475ee0ed3d227451021029bd8",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "c1d53a89bba399d3a92d8c5da572eb9c",
        "keyName": "显示输入框",
        "keyCode": "hasInput",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool",
        "defaultValue": "true"
      },
      {
        "keyID": "e470d73c5920324862ec0b282b43a78c",
        "keyName": "输入框宽度",
        "keyCode": "inputWidth",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "currNode['hasInput'].value==true",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "833125df2e85a8dfcc45a41551c8f6b8",
    "keyName": "弹窗标题",
    "keyCode": "title",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "34e5d6d9d646cd77098f9b4f9b057422",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "e2389627302a5276b6dbc374e95da0fd",
        "keyName": "弹窗宽度",
        "keyCode": "width",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "464b8e722ef921cd4cf003b05200834b",
        "keyName": "弹窗高度",
        "keyCode": "height",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "9495b741e0a80d7c6a7ab0f5a2968016",
    "keyName": "跳转类型",
    "keyCode": "targetType",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "dataType": "String",
        "data": [
          {
            "label": "路由",
            "value": "route"
          },
          {
            "label": "链接",
            "value": "link"
          },
          {
            "label": "手动填写",
            "value": "normal"
          }
        ],
        "url": "",
        "labelField": "",
        "valueField": "",
        "multiple": false,
        "clearable": false,
        "filterable": false,
        "allow-create": false,
        "width": "",
        "placeholder": "",
        "teleported": true,
        "remote": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": "if(val==='route'){\ncurrNode['url'].value='/AppConfigManage/ReadData/SelectTemplateJsonData';\n}else if(val==='link'){\ncurrNode['url'].value='/AppConfigManage/ReadData/SelectRouteData';\n}else{\ncurrNode['url'].value=''\n}"
      },
      "arrayConfig": {}
    },
    "componentType": "Select",
    "dataType": "String"
  },
  {
    "keyID": "11495a7047412ffe5ad3afc18b4ca815",
    "keyName": "弹窗地址",
    "keyCode": "url",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "eaf764e8002b9bde9219cdc29e25be92",
    "keyName": "数据接口",
    "keyCode": "dataUrl",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  }
];
const property_date = [
  {
    "keyID": "3169c3c3186532321c4f0ac69cad4939",
    "keyName": "类型",
    "keyCode": "type",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "dataType": "String",
        "data": [
          {
            "label": "日期",
            "value": "date"
          },
          {
            "label": "日期范围",
            "value": "daterange"
          },
          {
            "label": "日期时间",
            "value": "datetime"
          },
          {
            "label": "日期时间范围",
            "value": "datetimerange"
          },
          {
            "label": "年",
            "value": "year"
          },
          {
            "label": "月",
            "value": "month"
          },
          {
            "label": "月范围",
            "value": "monthrange"
          },
          {
            "label": "周",
            "value": "week"
          },
          {
            "label": "多日期",
            "value": "dates"
          }
        ],
        "url": "",
        "labelField": "",
        "valueField": "",
        "multiple": false,
        "clearable": false,
        "filterable": false,
        "allow-create": false,
        "width": "",
        "placeholder": "",
        "teleported": true,
        "remote": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Select",
    "dataType": "String"
  },
  {
    "keyID": "54b51767d5823fedde4bf4d81161d56b",
    "keyName": "宽度",
    "keyCode": "width",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "7b0cb2c91ce84caa8130caab6e9c5b8f",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "d4d89b4984ee0d263b582c99872c06cd",
        "keyName": "显示格式",
        "keyCode": "format",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "d65abcb2dcfbcee1c8cc1c125b1f8c82",
        "keyName": "值格式",
        "keyCode": "valueFormat",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "eebed46cca84132e0d2da329e3b5b537",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "6ba1e2ef0f37b5c5d6926ade6cc90288",
        "keyName": "可输入",
        "keyCode": "editable",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool",
        "defaultValue": "true"
      },
      {
        "keyID": "c739beaf93387f2638fe67377db95dd7",
        "keyName": "可清除",
        "keyCode": "clearable",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool",
        "defaultValue": "true"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_time = [
  {
    "keyID": "88ed1cd7f350ca941f8dec6f0d5ed1bd",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "54b51767d5823fedde4bf4d81161d56b",
        "keyName": "宽度",
        "keyCode": "width",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "195338e3c039f3098b48bd92be056a3c",
        "keyName": "范围选择",
        "keyCode": "is-range",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "7b0cb2c91ce84caa8130caab6e9c5b8f",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "d4d89b4984ee0d263b582c99872c06cd",
        "keyName": "显示格式",
        "keyCode": "format",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "d65abcb2dcfbcee1c8cc1c125b1f8c82",
        "keyName": "值格式",
        "keyCode": "valueFormat",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "showWordLimit": false,
            "clearable": false,
            "isPassword": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "eebed46cca84132e0d2da329e3b5b537",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "6ba1e2ef0f37b5c5d6926ade6cc90288",
        "keyName": "可输入",
        "keyCode": "editable",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool",
        "defaultValue": "true"
      },
      {
        "keyID": "c739beaf93387f2638fe67377db95dd7",
        "keyName": "可清除",
        "keyCode": "clearable",
        "data": [],
        "config": {
          "formConfig": {
            "labelWidth": "",
            "tip": "",
            "tipPosition": "left",
            "suffixContent": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "active-text": "",
            "inactive-text": "",
            "active-value": true,
            "inactive-value": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          },
          "arrayConfig": {}
        },
        "componentType": "Switch",
        "dataType": "Bool",
        "defaultValue": "true"
      }
    ],
    "config": {
      "formConfig": {},
      "baseConfig": {},
      "advancedConfig": {},
      "arrayConfig": {}
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_caption = [
  {
    "keyID": "be4a36ad3dc655baa5d0eab3ae93a494",
    "keyName": "标题",
    "keyCode": "title",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "d95dcc72d437eb45e99b0b2207b1cf3e",
    "keyName": "显示类型",
    "keyCode": "type",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "底部",
            "value": "bottom"
          },
          {
            "label": "左侧",
            "value": "left"
          }
        ],
        "url": "",
        "labelField": "",
        "valueField": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "String",
    "defaultValue": "bottom"
  }
];
const property_row = [
  {
    "keyID": "key_70676",
    "keyName": "栅格间隔",
    "keyCode": "gutter",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "Number",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": true,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "key_84180",
    "keyName": "水平排列",
    "keyCode": "justify",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": true,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "key_9102",
    "keyName": "垂直排列",
    "keyCode": "align",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": true,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "key_35514",
    "keyName": "元素标签",
    "keyCode": "tag",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": true,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  }
];
const dynamicDataTypes = [
  { label: "无", value: "None", type: "None" },
  { label: "字符串", value: "String", type: "String" },
  { label: "数字", value: "Number", type: "Number" },
  { label: "Bool", value: "Bool", type: "Bool" },
  { label: "Object", value: "Object", type: "Object" },
  { label: "Array", value: "Array", type: "Array" }
];
const dynamicComponentTypes = [
  { componentName: "ElsInput", label: "输入框", value: "Input", type: "Input", dataTypes: ["String"], defaultPropertys: {}, propertys: property_input, group: DynamicComponentGroup.Form },
  { componentName: "ElsTextarea", label: "文本域", value: "Textarea", type: "Textarea", dataTypes: ["String"], defaultPropertys: {}, propertys: property_textarea, group: DynamicComponentGroup.Form },
  { componentName: "ElsInputNumber", label: "数字输入框", value: "InputNumber", type: "InputNumber", dataTypes: ["Number"], defaultPropertys: {}, propertys: property_inputNumber, group: DynamicComponentGroup.Form },
  { componentName: "ElsSwitch", label: "开关", value: "Switch", type: "Switch", dataTypes: ["Bool", "String", "Number"], defaultPropertys: {}, propertys: property_switch, group: DynamicComponentGroup.Form },
  { componentName: "ElsCheckbox", label: "多选列表", value: "Checkbox", type: "Checkbox", dataTypes: ["String"], defaultPropertys: {}, propertys: property_checkbox, group: DynamicComponentGroup.Form },
  { componentName: "ElsSelect", label: "下拉列表", value: "Select", type: "Select", dataTypes: ["String", "Number", "Bool"], defaultPropertys: {}, propertys: property_select, group: DynamicComponentGroup.Form },
  { componentName: "ElsRadio", label: "单选列表", value: "Radio", type: "Radio", dataTypes: ["String", "Number", "Bool"], defaultPropertys: {}, propertys: property_radio, group: DynamicComponentGroup.Form },
  { componentName: "ElsUpload", label: "图片", value: "UploadPic", type: "UploadPic", dataTypes: ["String"], defaultPropertys: { "type": "Pic" }, propertys: property_pic, group: DynamicComponentGroup.Form },
  { componentName: "ElsUpload", label: "图集", value: "UploadMutiPic", type: "UploadMutiPic", dataTypes: ["String"], defaultPropertys: { "type": "Pic", "multiple": true }, propertys: property_pic, group: DynamicComponentGroup.Form },
  { componentName: "ElsUpload", label: "文件", value: "UploadFile", type: "UploadFile", dataTypes: ["String"], defaultPropertys: { "type": "File" }, propertys: property_file, group: DynamicComponentGroup.Form },
  { componentName: "ElsDataModal", label: "弹窗", value: "DataModal", type: "DataModal", dataTypes: ["String"], defaultPropertys: {}, propertys: property_datamodal, group: DynamicComponentGroup.Form },
  { componentName: "ElsDatePicker", label: "日期选择器", value: "DatePicker", type: "DatePicker", dataTypes: ["String", "Number"], defaultPropertys: {}, propertys: property_date, group: DynamicComponentGroup.Form },
  { componentName: "ElsTimePicker", label: "时间选择器", value: "TimePicker", type: "TimePicker", dataTypes: ["String", "Number"], defaultPropertys: {}, propertys: property_time, group: DynamicComponentGroup.Form },
  { componentName: "ElsCaption", label: "分隔描述", value: "Caption", type: "Caption", dataTypes: ["None"], defaultPropertys: {}, propertys: property_caption, group: DynamicComponentGroup.Desc },
  { componentName: "ElsRow", label: "栅格", value: "Row", type: "Row", dataTypes: ["None"], defaultPropertys: {}, propertys: property_row, group: DynamicComponentGroup.Container }
];
class DynamicHandler {
  constructor(dataTypes, componentTypes, appendUrlParams = [], uploadUrl = "", resourceCode = "", restrictCode = "") {
    __publicField(this, "componentTypes", []);
    __publicField(this, "dataTypes", []);
    __publicField(this, "appendUrlParams", []);
    __publicField(this, "uploadUrl", "");
    __publicField(this, "resourceCode", "");
    __publicField(this, "restrictCode", "");
    if (componentTypes) {
      this.componentTypes = componentTypes;
    } else {
      this.componentTypes.push(...dynamicComponentTypes);
    }
    if (dataTypes) {
      this.dataTypes = dataTypes;
    } else {
      this.dataTypes.push(...dynamicDataTypes);
    }
    this.appendUrlParams = appendUrlParams;
    this.uploadUrl = uploadUrl;
    this.resourceCode = resourceCode;
    this.restrictCode = restrictCode;
  }
  initTypeName(item) {
    const currDataType = this.dataTypes.find((d) => d.value === item.dataType || d.type === item.dataType);
    const currArrayDataType = this.dataTypes.find((d) => d.value === item.arrayDataType || d.type === item.arrayDataType);
    const currcomponentType = this.componentTypes.find((d) => d.value === item.componentType || d.type === item.componentType);
    if ((currDataType == null ? void 0 : currDataType.type) === "Object" || (currDataType == null ? void 0 : currDataType.type) === "Array") {
      item.componentGroup = "Form";
    } else {
      item.componentGroup = currcomponentType == null ? void 0 : currcomponentType.group;
    }
    item.componentType = currcomponentType == null ? void 0 : currcomponentType.type;
    item.dataTypeName = currDataType == null ? void 0 : currDataType.type;
    item.arrayDataTypeName = currArrayDataType == null ? void 0 : currArrayDataType.type;
    item.componentName = currcomponentType == null ? void 0 : currcomponentType.componentName;
  }
  initConfigType(data) {
    data.forEach((ele) => {
      this.initTypeName(ele);
      if (ele.dataTypeName == "Object" || ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object") {
        this.initConfigType(ele.data);
      } else if (ele.dataTypeName == "None" && ele.componentType == "Row") {
        this.initConfigType(ele.data);
      } else {
        this.getDefaultValue(ele);
      }
    });
  }
  recoverConfig(data) {
    data.forEach((ele) => {
      if (ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object") {
        this.recoverArrayConfig(ele);
      } else if (ele.dataTypeName == "Object") {
        this.recoverConfig(ele.data);
      } else if (ele.dataTypeName == "None" && ele.componentName == "ElsRow") {
        this.recoverConfig(ele.data);
      }
      delete ele.componentGroup;
      delete ele.dataTypeName;
      delete ele.arrayDataTypeName;
      delete ele.componentName;
      delete ele.componentTypeName;
      delete ele.value;
    });
  }
  recoverArrayConfig(item) {
    delete item.arrayObjData;
    delete item.value;
    item.data.forEach((ele) => {
      if (ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object") {
        this.recoverArrayConfig(ele);
      } else if (ele.dataTypeName == "Object") {
        this.recoverConfig(ele.data);
      } else if (ele.dataTypeName == "None" && ele.componentName == "ElsRow") {
        this.recoverConfig(ele.data);
      }
    });
  }
  recoverData(data, valueData = null) {
    if (!valueData) {
      valueData = {};
    }
    data.forEach((ele) => {
      if (ele.keyCode) {
        const currVal = valueData[ele.keyCode];
        if (currVal === void 0) {
          this.getDefaultValue(ele);
        } else {
          ele.value = currVal;
        }
      } else {
        this.getDefaultValue(ele);
      }
      this.initTypeName(ele);
      if (ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object" && !ele.componentType) {
        this.recoverArrayData(ele, valueData[ele.keyCode]);
      } else if (ele.dataTypeName == "Object") {
        this.recoverData(ele.data, valueData[ele.keyCode]);
      } else if (ele.dataTypeName == "None" && ele.componentType == "Row") {
        this.recoverData(ele.data, valueData);
      }
      if (this.appendUrlParams && ["Checkbox", "Select", "Radio", "Upload", "DataModal"].includes(ele.componentType ?? "") && ele.config.baseConfig && (ele.config.baseConfig.url || ele.config.baseConfig.modalUrl)) {
        this.appendCommonParams(ele);
        if (ele.componentType === "Upload") {
          this.appendUploadParams(ele);
        }
      }
    });
  }
  appendUploadParams(item) {
    let currUrl = this.uploadUrl;
    if (item.config.baseConfig.url) {
      currUrl = item.config.baseConfig.url;
    }
    let uploadParms = `&ResourcePicLimitType=${item.config.baseConfig.picLimitType ?? ""}&ResourcePicWidth=${item.config.baseConfig.picWidthLimit ?? 0}&ResourcePicHeight=${item.config.baseConfig.picHeightLimit ?? 0}&HasMd5Parameter=${item.config.baseConfig.hasMd5Parameter ? 1 : 0}`;
    if (!item.config.baseConfig.resourceCode) {
      item.config.baseConfig.resourceCode = this.resourceCode;
    }
    if (!item.config.baseConfig.restrictCode) {
      item.config.baseConfig.restrictCode = this.restrictCode;
    }
    if (item.config.baseConfig.resourceCode) {
      currUrl = currUrl.addUrlParameter("ResourceCode", item.config.baseConfig.resourceCode);
    }
    if (item.config.baseConfig.restrictCode) {
      currUrl = currUrl.addUrlParameter("RestrictCode", item.config.baseConfig.restrictCode);
    }
    let uploadUrl = currUrl + uploadParms;
    return uploadUrl;
  }
  appendCommonParams(item) {
    if (!this.appendUrlParams) {
      return;
    }
    let currAppendQuery = this.appendUrlParams.find((ele) => ele.Key == item.keyCode);
    if (!currAppendQuery) {
      currAppendQuery = this.appendUrlParams.find((ele) => ele.Key === "");
    }
    let currUrl = item.config.baseConfig.url;
    if (currAppendQuery) {
      if (currUrl.indexOf("?") > -1) {
        currUrl += "&";
      } else {
        currUrl += "?";
      }
      currUrl += currAppendQuery.Value;
    }
    item.config.baseConfig.url = currUrl;
  }
  recoverArrayData(item, valueData = null) {
    if (!item["arrayObjData"]) {
      let currData = [];
      item.data.forEach((ele) => {
        this.initTypeName(ele);
        var currItem = Object.assign({}, ele);
        this.getDefaultValue(currItem);
        if (ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object") {
          this.recoverArrayData(currItem);
        } else if (ele.dataTypeName == "Object" || ele.componentType == "Row") {
          this.recoverData(currItem.data);
        }
        currData.push(currItem);
      });
      item["arrayObjData"] = currData;
    }
    if (valueData) {
      item.value = valueData;
      let arrayData = [];
      valueData.forEach((ele) => {
        let itemData = lessCom$1.cloneObj(item["arrayObjData"]);
        this.recoverData(itemData, ele);
        arrayData.push(itemData);
      });
      item.data = arrayData;
    } else {
      item.value = [];
      let defaultArrayData = [];
      if (item.config.baseConfig.arrayDefaultLength === void 0 || item.config.baseConfig.arrayDefaultLength === "") {
        defaultArrayData.push(lessCom$1.cloneObj(item["arrayObjData"]));
      } else {
        for (let i = 0; i < item.config.baseConfig.arrayDefaultLength; i++) {
          defaultArrayData.push(lessCom$1.cloneObj(item["arrayObjData"]));
        }
      }
      item.data = defaultArrayData;
    }
  }
  configResult(config) {
    const currConfig = lessCom$1.cloneObj(config);
    this.initConfigType(currConfig);
    return this.getConfigValue(currConfig);
  }
  getConfigValue(data) {
    let currData = {};
    data.forEach((ele) => {
      if (ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object") {
        currData[ele.keyCode] = this.getArrayConfigValue(ele);
      } else if (ele.dataTypeName == "Object") {
        currData[ele.keyCode] = this.getConfigValue(ele.data);
      } else if (ele.dataTypeName == "None" && ele.componentName == "ElsRow") {
        currData = Object.assign(currData, this.getConfigValue(ele.data));
      } else if (ele.keyCode) {
        currData[ele.keyCode] = ele.value;
      }
    });
    return currData;
  }
  getArrayConfigValue(item) {
    let currValue = {};
    item.data.forEach((ele) => {
      if (ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object") {
        currValue[ele.keyCode] = this.getArrayConfigValue(ele);
      } else if (ele.dataTypeName == "Object") {
        currValue[ele.keyCode] = this.getArrayConfigValue(ele.data);
      } else if (ele.dataTypeName == "None" && ele.componentName == "ElsRow") {
        currValue = Object.assign(currValue, this.getArrayConfigValue(ele.data));
      } else if (ele.keyCode) {
        currValue[ele.keyCode] = ele.value;
      }
    });
    return [currValue];
  }
  getDefaultValue(item) {
    var _a;
    const currDataType = this.dataTypes.find((ele) => ele.value === item.dataType || ele.type === item.dataType);
    if (currDataType) {
      switch (currDataType.type) {
        case "Number":
          if (item.defaultValue) {
            item.value = parseFloat(item.defaultValue);
          } else {
            item.value = 0;
          }
          break;
        case "Bool":
          if (((_a = item.defaultValue) == null ? void 0 : _a.toLowerCase()) === "true") {
            item.value = true;
          } else {
            item.value = false;
          }
          break;
        case "Object":
          item.value = {};
          break;
        default:
          if (item.defaultValue) {
            item.value = item.defaultValue.toString();
          } else {
            item.value = "";
          }
      }
    }
  }
  result(renderData) {
    var currData = {};
    renderData.forEach((ele) => {
      if (ele.componentGroup !== "Desc") {
        if (ele.dataTypeName == "Object" && ele.keyCode) {
          currData[ele.keyCode] = this.childResult(ele);
        } else if (ele.dataTypeName == "None" && ele.componentType == "Row") {
          Object.assign(currData, this.childResult(ele));
        } else if (ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object" && ele.keyCode) {
          currData[ele.keyCode] = this.childResultList(ele);
        } else if (ele.keyCode) {
          currData[ele.keyCode] = ele.value;
        }
      }
    });
    return currData;
  }
  childResult(item) {
    var currItem = {};
    var currData = item.data;
    if (currData === "" || !Array.isArray(currData)) {
      return "";
    }
    if (!currData || !currData.length) {
      if (item.value) {
        return item.value;
      }
      return {};
    }
    currData.forEach((ele) => {
      if (ele.componentType !== "Caption") {
        if (ele.dataTypeName == "Object" && ele.keyCode) {
          currItem[ele.keyCode] = this.childResult(ele);
        } else if (ele.dataTypeName == "None" && ele.componentType == "Row") {
          Object.assign(currItem, this.childResult(ele));
        } else if (ele.dataTypeName == "Array" && ele.arrayDataTypeName == "Object" && ele.keyCode) {
          currItem[ele.keyCode] = this.childResultList(ele);
        } else if (ele.keyCode) {
          currItem[ele.keyCode] = ele.value;
        }
      }
    });
    return currItem;
  }
  childResultList(item) {
    if (!item.data || !item.data.length) {
      if (item.value) {
        return item.value;
      }
      return [];
    }
    let currList = [];
    item.data.forEach((ele) => {
      if (Array.isArray(ele)) {
        let currData = {};
        ele.forEach((cele) => {
          if (cele.dataTypeName === "Array") {
            currData[cele.keyCode] = this.childResultList(cele);
          } else {
            currData[cele.keyCode] = this.childResult(cele);
          }
        });
        currList.push(currData);
      }
    });
    return currList;
  }
}
const _hoisted_1$9 = {
  key: 0,
  class: "tag-name"
};
const _hoisted_2$4 = {
  key: 1,
  class: "els-dynamicc-d-head"
};
const _hoisted_3$2 = /* @__PURE__ */ createElementVNode("span", { class: "keyName" }, "名称", -1);
const _hoisted_4$1 = /* @__PURE__ */ createElementVNode("span", { class: "keyCode" }, "编码", -1);
const _hoisted_5$1 = /* @__PURE__ */ createElementVNode("span", { class: "dataType" }, "类型", -1);
const _hoisted_6$1 = /* @__PURE__ */ createElementVNode("span", { class: "componentType" }, "组件", -1);
const _hoisted_7$1 = /* @__PURE__ */ createElementVNode("span", { class: "config" }, "配置", -1);
const _hoisted_8$1 = /* @__PURE__ */ createElementVNode("span", { class: "defaultValue" }, "默认值", -1);
const _hoisted_9$1 = /* @__PURE__ */ createElementVNode("span", { class: "oper" }, "操作", -1);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsDynamicDesigner"
  },
  __name: "DynamicDesignerInner",
  props: {
    isContainer: { type: Boolean },
    depath: { default: 0 },
    data: {},
    config: {}
  },
  emits: ["update:data", "removeItem"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const DynamicDesignerInnerItem = defineAsyncComponent(() => {
      return import("./DynamicDesignerInnerItem-383188bc.js");
    });
    const componentSettingVisible = inject("componentSettingVisible", true);
    const currData = useVModel(props, "data", emits);
    const currConfig = ref(props.config ?? {});
    function handleRemove() {
      emits("removeItem");
    }
    function handleAddItem() {
      return {
        keyID: "key_" + lessCom$1.randomNumber().toString(),
        keyName: "",
        keyCode: "",
        data: [],
        config: {
          formConfig: {},
          baseConfig: {},
          advancedConfig: {},
          arrayConfig: {}
        }
      };
    }
    const tagID = inject("tagID");
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      const _component_els_form_item = resolveComponent("els-form-item");
      const _component_el_popover = resolveComponent("el-popover");
      const _component_Rank = resolveComponent("Rank");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Remove = resolveComponent("Remove");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_el_skeleton_item = resolveComponent("el-skeleton-item");
      const _component_el_skeleton = resolveComponent("el-skeleton");
      const _component_els_list = resolveComponent("els-list");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([{ "els-dynamic-d-flat-item-child": _ctx.depath && _ctx.depath > 0 }])
      }, [
        _ctx.isContainer ? (openBlock(), createElementBlock("span", _hoisted_1$9, [
          createVNode(_component_el_popover, {
            placement: "top-start",
            width: "500",
            trigger: "click"
          }, {
            reference: withCtx(() => [
              createElementVNode("span", null, "(1行" + toDisplayString(unref(currData).length) + "列)", 1)
            ]),
            default: withCtx(() => [
              createVNode(_component_els_form_item, {
                label: "样式",
                "label-width": "60px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: currConfig.value.style,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currConfig.value.style = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_els_form_item, {
                label: "v-if",
                "label-width": "60px"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_input, {
                    modelValue: currConfig.value.vif,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => currConfig.value.vif = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_el_icon, { class: "el-icon-rank" }, {
            default: withCtx(() => [
              createVNode(_component_Rank)
            ]),
            _: 1
          }),
          createVNode(_component_el_popconfirm, {
            title: "确定删除吗？",
            onConfirm: handleRemove
          }, {
            reference: withCtx(() => [
              createVNode(_component_el_icon, { class: "el-icon-remove" }, {
                default: withCtx(() => [
                  createVNode(_component_Remove)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ])) : unref(currData).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$4, [
          _hoisted_3$2,
          _hoisted_4$1,
          _hoisted_5$1,
          unref(componentSettingVisible) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            _hoisted_6$1,
            _hoisted_7$1
          ], 64)) : createCommentVNode("", true),
          _hoisted_8$1,
          _hoisted_9$1
        ])) : createCommentVNode("", true),
        createVNode(_component_els_list, mergeProps({
          modelValue: unref(currData),
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(currData) ? currData.value = $event : null),
          onAdd: handleAddItem,
          sortable: false,
          "is-remove": false,
          item: "",
          hasForm: false,
          itemKey: "keyID"
        }, { group: unref(tagID), animation: 300 }), {
          default: withCtx(({ $item, $index }) => [
            (openBlock(), createBlock(Suspense, null, {
              default: withCtx(() => [
                (openBlock(), createBlock(unref(DynamicDesignerInnerItem), {
                  data: unref(currData),
                  item: $item,
                  depath: _ctx.depath,
                  key: $index
                }, null, 8, ["data", "item", "depath"]))
              ]),
              fallback: withCtx(() => [
                createVNode(_component_el_skeleton, { animated: "" }, {
                  template: withCtx(() => [
                    createVNode(_component_el_skeleton_item, {
                      variant: "text",
                      style: { "width": "100%" }
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 2
            }, 1024))
          ]),
          _: 1
        }, 16, ["modelValue"])
      ], 2);
    };
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DynamicDesignerViewInnerItem",
  props: {
    modelValue: {},
    item: {},
    currDepath: {},
    parentNode: {},
    currNode: {},
    nodeType: {}
  },
  emits: ["update:modelValue", "valueChange"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const controlData = inject("componentData", []);
    const attrs = useAttrs();
    const currValue = ref();
    watchEffect(() => {
      currValue.value = props.modelValue;
    });
    watch(currValue, (val) => {
      emits("update:modelValue", val);
      emits("valueChange", val);
    });
    function handleClear() {
      if (props.item.dataTypeName == "Number" || props.item.arrayDataTypeName == "Number") {
        currValue.value = 0;
      }
      if (props.item.dataTypeName == "Bool" || props.item.arrayDataTypeName == "Bool") {
        currValue.value = false;
      } else {
        currValue.value = "";
      }
    }
    const baseAttrs = computed(() => {
      let baseConfig = {};
      const currControl = controlData.find((ele) => ele.value == props.item.componentType);
      if (currControl == null ? void 0 : currControl.defaultPropertys) {
        const currBaseConfig = Object.assign({}, currControl == null ? void 0 : currControl.defaultPropertys, props.item.config.baseConfig);
        for (var key in currBaseConfig) {
          if (key) {
            if (currBaseConfig[key] === void 0 || currBaseConfig[key] === "") {
              delete currBaseConfig[key];
            }
          }
        }
        baseConfig = currBaseConfig;
      }
      const currAttrs = Object.assign(lessCom$1.cloneObj(baseConfig), { "style": props.item.config.advancedConfig.style }, attrs);
      const parseNumbers = ["max", "min", "precision", "step", "rows"];
      for (const name of parseNumbers) {
        if (currAttrs[name]) {
          currAttrs[name] = parseInt(currAttrs[name]);
        } else {
          delete currAttrs[name];
        }
      }
      if (["Select", "Radio", "CheckBox", "Cascader"].includes(props.item.componentType)) {
        if (props.item.dataTypeName == "String" || props.item.arrayDataTypeName == "Number") {
          currAttrs.valueType = "Number";
        } else if (props.item.dataTypeName == "Bool" || props.item.arrayDataTypeName == "Bool") {
          currAttrs.valueType = "Bool";
        }
      }
      return currAttrs;
    });
    const componentAttrs = ref(baseAttrs);
    const componentName = ref("");
    watchEffect(() => {
      componentName.value = props.item.componentName;
    });
    return (_ctx, _cache) => {
      return componentName.value ? (openBlock(), createBlock(resolveDynamicComponent(componentName.value), mergeProps({ key: 0 }, componentAttrs.value, {
        modelValue: currValue.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currValue.value = $event),
        onClear: handleClear
      }), null, 16, ["modelValue"])) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "DynamicDesignerViewInnerArray",
  props: {
    item: {},
    parentNode: {}
  },
  emits: ["update:data"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currData = useVModel(props, "item", emits);
    function handleDisabledExpress() {
      if (currData.value.config.advancedConfig && currData.value.config.advancedConfig.disabled) {
        let currEvent = new Function("parentNode,currNode", "return " + currData.value.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currData.value);
      }
      return false;
    }
    function handleValueChange(val) {
      if (currData.value.config.advancedConfig && currData.value.config.advancedConfig.eventChange) {
        let currEvent = new Function("val,parentNode,currNode", currData.value.config.advancedConfig.eventChange);
        currEvent(val, props.parentNode, currData.value);
      }
    }
    function getItemDefaultValue() {
      if (currData.value.arrayDataTypeName == "Bool") {
        if (currData.value.defaultValue === "true") {
          return true;
        } else {
          return false;
        }
      } else if (currData.value.arrayDataTypeName === "Number") {
        if (currData.value.defaultValue != void 0 && currData.value.defaultValue !== "") {
          return parseFloat(currData.value.defaultValue);
        } else {
          return 0;
        }
      }
      if (currData.value.defaultValue) {
        return currData.value.defaultValue;
      }
      return "";
    }
    function handleAddItem() {
      currData.value.value.push(getItemDefaultValue());
    }
    const formAttrs = computed(() => {
      const currFormConfig = lessCom$1.cloneObj(currData.value.config.formConfig);
      currFormConfig.labelWidth = "0px";
      if (currFormConfig) {
        if (currFormConfig.validMethod) {
          let currEvent = new Function("parentNode,currNode", "return " + currFormConfig.validMethod);
          currFormConfig.validMethod = currEvent(props.parentNode, currData.value);
        } else {
          delete currFormConfig.validMethod;
        }
      }
      return currFormConfig;
    });
    function initDefault(val) {
      var _a;
      let defaultArrayData = [];
      let defaultValue = (_a = currData.value) == null ? void 0 : _a.defaultValue;
      if (currData.value.arrayDataTypeName === "Number") {
        if (defaultValue && defaultValue !== "") {
          defaultValue = parseFloat(defaultValue);
        } else {
          defaultValue = 0;
        }
      } else if (currData.value.arrayDataTypeName === "Bool") {
        if (defaultValue && (defaultValue == null ? void 0 : defaultValue.toLowerCase()) === "true") {
          defaultValue = parseFloat(defaultValue);
        } else {
          defaultValue = false;
        }
      } else if (!defaultValue) {
        defaultValue = "";
      }
      if (val === void 0 || val === "") {
        defaultArrayData.push(defaultValue);
      } else {
        for (let i = 0; i < val; i++) {
          defaultArrayData.push(defaultValue);
        }
      }
      currData.value.value = defaultArrayData;
    }
    watch(() => currData.value, (val) => {
      if (!val || !Array.isArray(val)) {
        initDefault(currData.value.config.arrayConfig.arrayDefaultLength);
      }
    }, { immediate: true });
    watch(() => currData.value.config.arrayConfig.arrayDefaultLength, (val) => {
      initDefault(val);
    });
    return (_ctx, _cache) => {
      const _component_els_list = resolveComponent("els-list");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({ "horizontal": unref(currData).config.arrayConfig.arrangementType === "Horizontal" }),
        style: { "flex-grow": "1" }
      }, [
        createVNode(_component_els_list, {
          modelValue: unref(currData).value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(currData).value = $event),
          onAdd: handleAddItem,
          "item-key": "",
          style: normalizeStyle([
            { "max-width": unref(currData).config.arrayConfig.maxWidth ? unref(currData).config.arrayConfig.maxWidth + "px" : "" },
            { "max-height": unref(currData).config.arrayConfig.maxHeight ? unref(currData).config.arrayConfig.maxHeight + "px" : "" },
            { "display": unref(currData).config.arrayConfig.arrangementType === "Horizontal" ? "flex" : "" },
            { "flex-wrap": "wrap" },
            { "gap": "5px" }
          ])
        }, {
          default: withCtx(({ index }) => [
            createVNode(_sfc_main$f, mergeProps(formAttrs.value, {
              "parent-node": _ctx.parentNode,
              "curr-node": unref(currData),
              disabled: handleDisabledExpress(),
              prop: index.toString(),
              item: unref(currData),
              style: _ctx.item.config.advancedConfig.style,
              onValueChange: handleValueChange
            }), null, 16, ["parent-node", "curr-node", "disabled", "prop", "item", "style"])
          ]),
          _: 1
        }, 8, ["modelValue", "style"])
      ], 2);
    };
  }
});
const _hoisted_1$8 = ["onClick"];
const _hoisted_2$3 = {
  key: 0,
  class: "els-dynamic-d-v-item-type"
};
const _hoisted_3$1 = { class: "els-dynamic-d-v-item-move" };
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "DynamicDesignerViewInner",
  props: {
    nodeItem: {},
    data: {},
    depath: {},
    containerName: {},
    parentNode: {}
  },
  emits: ["update:data"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currData = useVModel(props, "data", emits);
    const defaultLabelWidth = inject("labelWidth", void 0);
    const labelWidth = ref();
    const currDepath = ref(0);
    const itemClassName = ref("");
    const currNode = computed(() => {
      let currData2 = {};
      props.data.forEach((ele) => {
        if (ele.componentType == "Row") {
          ele.data.forEach((cele) => {
            currData2[cele.keyCode] = cele;
          });
        } else {
          currData2[ele.keyCode] = ele;
        }
      });
      return currData2;
    });
    function handleDisabledExpress(item) {
      if (item.config.baseConfig && item.config.advancedConfig.disabled) {
        let currEvent = new Function("parentNode,currNode", "return " + item.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currNode.value);
      }
      return false;
    }
    function handleIfExpress(item) {
      try {
        if (item.config.advancedConfig && item.config.advancedConfig.vif) {
          let currEvent = new Function("parentNode,currNode", "return " + item.config.advancedConfig.vif);
          return currEvent(props.parentNode, currNode.value);
        }
      } catch (err) {
        console.error(err);
      }
      return true;
    }
    function handleValueChange(val, item) {
      if (item.config.advancedConfig && item.config.advancedConfig.eventChange) {
        let currEvent = new Function("val,parentNode,currNode", item.config.advancedConfig.eventChange);
        currEvent(val, props.parentNode, currNode.value);
      }
    }
    function getFormItemAttr(item) {
      var _a;
      const currFormConfig = lessCom$1.cloneObj(item.config.formConfig);
      if (item.dataTypeName == "None" || ((_a = item.config.baseConfig) == null ? void 0 : _a.componentName) == "ElsCaption" || item.componentType === "Row") {
        currFormConfig.labelWidth = "0px";
      } else if (item.dataTypeName == "Object" || item.arrayDataTypeName == "Object") {
        delete currFormConfig.labelWidth;
      }
      if (currFormConfig) {
        if (currFormConfig.validMethod) {
          let currEvent = new Function("parentNode,currNode", "return " + currFormConfig.validMethod);
          currFormConfig.validMethod = currEvent(props.parentNode, currNode.value);
        } else {
          delete currFormConfig.validMethod;
        }
      }
      return currFormConfig;
    }
    if (props.depath && props.depath > 0) {
      itemClassName.value = "els-dynamic-r-item-child";
    } else {
      itemClassName.value = "els-dynamic-r-item";
    }
    watchEffect(() => {
      var _a;
      const formConfig = (_a = props.nodeItem) == null ? void 0 : _a.config.formConfig;
      if (props.nodeItem && formConfig) {
        labelWidth.value = formConfig.labelWidth ? formConfig.labelWidth : void 0;
      }
      if (!labelWidth.value && defaultLabelWidth) {
        labelWidth.value = defaultLabelWidth.value;
      }
    });
    const setSelectItem = inject("setSelectItem", () => {
    });
    const getSelectItem = inject("getSelectItem", () => {
    });
    const recordComponent = inject("recordComponent", () => {
    });
    function handleSelectItem(item) {
      setSelectItem(item, currData.value);
    }
    function handleAddComponent(e) {
      recordComponent();
      setSelectItem(currData.value[e.newIndex], currData.value);
    }
    function initArrayChild(element) {
      if (element.data.length > 0) {
        const child = element.data[0];
        if (child.dataTypeName === "Array") {
          ElMessage.warning("数组不能嵌套数组");
          element.data.splice(0, 1);
          return;
        }
        if (child.dataTypeName == "None") {
          ElMessage.warning("数组中不能展示组件");
          element.data.splice(0, 1);
          return;
        }
        element.arrayDataType = child.dataType;
        element.arrayDataTypeName = child.dataTypeName;
        element.componentName = child.componentName;
        element.componentGroup = child.componentGroup;
        element.componentType = child.componentType;
        element.componentTypeName = child.componentTypeName;
        element.data = child.data;
        element.value = [];
      }
      recordComponent();
      return true;
    }
    function handleAddArrayComponent() {
      recordComponent();
    }
    function handleRemove(item) {
      var index = currData.value.indexOf(item);
      currData.value.splice(index, 1);
      setSelectItem(null);
      recordComponent();
    }
    currDepath.value += 1;
    return (_ctx, _cache) => {
      const _component_Hide = resolveComponent("Hide");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_Delete = resolveComponent("Delete");
      const _component_el_popconfirm = resolveComponent("el-popconfirm");
      const _component_Rank = resolveComponent("Rank");
      const _component_els_caption = resolveComponent("els-caption");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_els_form_item = resolveComponent("els-form-item");
      const _component_els_form = resolveComponent("els-form");
      return openBlock(), createBlock(_component_els_form, {
        modelValue: unref(currData),
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(currData) ? currData.value = $event : null),
        "label-width": labelWidth.value,
        style: { "width": "100%" }
      }, {
        default: withCtx(() => {
          var _a, _b, _c;
          return [
            (openBlock(), createBlock(resolveDynamicComponent(((_a = _ctx.nodeItem) == null ? void 0 : _a.componentType) == "Row" ? "ElsRow" : "div"), {
              gutter: 5,
              class: normalizeClass(itemClassName.value),
              style: normalizeStyle(((_b = _ctx.nodeItem) == null ? void 0 : _b.componentType) === "Row" ? _ctx.nodeItem ? (_c = _ctx.nodeItem.config.advancedConfig) == null ? void 0 : _c.style : "" : "")
            }, {
              default: withCtx(() => {
                var _a2;
                return [
                  createVNode(unref(draggable), mergeProps({
                    tag: "div",
                    class: ((_a2 = _ctx.nodeItem) == null ? void 0 : _a2.componentType) === "Row" ? "els-row-drag" : "",
                    style: [[{ "min-height": _ctx.depath ? "50px" : "650px" }], { "margin": "5px 0", "width": "100%" }],
                    list: unref(currData),
                    onAdd: handleAddComponent,
                    "item-key": "keyID"
                  }, { group: "dragGroup", ghostClass: "ghost", animation: 300 }, {
                    sort: true,
                    handle: ".els-view-move"
                  }), {
                    item: withCtx(({ element, index }) => {
                      var _a3;
                      return [
                        (openBlock(), createBlock(resolveDynamicComponent(((_a3 = _ctx.nodeItem) == null ? void 0 : _a3.componentType) === "Row" ? "els-col" : "div"), {
                          key: element.keyID
                        }, {
                          default: withCtx(() => {
                            var _a4, _b2, _c2, _d;
                            return [
                              createElementVNode("div", {
                                class: normalizeClass(["els-dynamic-d-v-item", { "selected": ((_a4 = unref(getSelectItem)()) == null ? void 0 : _a4.keyID) == element.keyID }]),
                                onClick: withModifiers(($event) => handleSelectItem(element), ["stop"])
                              }, [
                                element.componentGroup == "Form" ? (openBlock(), createElementBlock("span", _hoisted_2$3, [
                                  createElementVNode("span", null, toDisplayString(element.keyCode), 1),
                                  createElementVNode("span", null, toDisplayString(element.dataTypeName === "Array" ? `Array
                                    <${element.arrayDataTypeName ? element.arrayDataTypeName : "T"}>` : element.dataTypeName), 1)
                                ])) : createCommentVNode("", true),
                                createElementVNode("span", _hoisted_3$1, [
                                  !handleIfExpress(element) ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Hide)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode(_component_el_popconfirm, {
                                    title: "确定删除吗？",
                                    onConfirm: ($event) => handleRemove(element)
                                  }, {
                                    reference: withCtx(() => [
                                      createVNode(_component_el_icon, { class: "el-icon-remove" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Delete)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["onConfirm"]),
                                  createVNode(_component_el_icon, { class: "el-icon-rank els-view-move" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_Rank)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                element.componentType == "Row" ? (openBlock(), createBlock(_sfc_main$d, {
                                  key: 1,
                                  data: element.data,
                                  parentNode: currNode.value,
                                  "node-item": element,
                                  depath: currDepath.value
                                }, null, 8, ["data", "parentNode", "node-item", "depath"])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                                  ((_b2 = element.config.baseConfig) == null ? void 0 : _b2.componentName) == "ElsCaption" ? (openBlock(), createBlock(_component_els_caption, mergeProps({ key: 0 }, element.config.baseConfig, {
                                    title: !element.config.baseConfig.title ? element.keyName : element.config.baseConfig.title
                                  }), null, 16, ["title"])) : createCommentVNode("", true),
                                  element.componentGroup === "Form" || element.dataTypeName === "Array" || element.dataTypeName == "Object" ? (openBlock(), createBlock(_component_els_form_item, mergeProps({
                                    hasFormItem: false,
                                    key: element.keyID
                                  }, getFormItemAttr(element), {
                                    class: element.dataTypeName == "Object" ? "els-dynamic-obj" : "",
                                    style: ((_c2 = element.config.baseConfig) == null ? void 0 : _c2.componentName) == "ElsCaption" || element.dataTypeName == "Object" ? "margin-bottom:0 !important" : "",
                                    label: ((_d = element.config.baseConfig) == null ? void 0 : _d.componentName) == "ElsCaption" ? "" : element.keyName,
                                    prop: `[${index}].value`
                                  }), {
                                    default: withCtx(() => [
                                      element.dataTypeName === "Array" && !element.arrayDataTypeName ? (openBlock(), createBlock(unref(draggable), mergeProps({
                                        key: 0,
                                        tag: "div",
                                        style: { "min-height": "100px", "margin": "5px 0", "width": "100%", "z-index": "10" },
                                        list: element.data,
                                        onAdd: _cache[0] || (_cache[0] = ($event) => handleAddArrayComponent()),
                                        "item-key": "keyID"
                                      }, { group: "dragGroup", ghostClass: "ghost", animation: 300 }), {
                                        item: withCtx(() => [
                                          initArrayChild(element) ? (openBlock(), createBlock(_component_el_empty, { key: 0 })) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1040, ["list"])) : element.componentType && element.componentGroup === "Form" ? (openBlock(), createBlock(_sfc_main$f, {
                                        key: element.keyID,
                                        disabled: handleDisabledExpress(element),
                                        "parent-node": _ctx.parentNode,
                                        "curr-node": currNode.value,
                                        item: element,
                                        modelValue: element.value,
                                        "onUpdate:modelValue": ($event) => element.value = $event,
                                        style: normalizeStyle(element.config.advancedConfig.style),
                                        onValueChange: ($event) => handleValueChange($event, element)
                                      }, null, 8, ["disabled", "parent-node", "curr-node", "item", "modelValue", "onUpdate:modelValue", "style", "onValueChange"])) : element.dataTypeName == "Object" || element.dataTypeName == "Array" && element.arrayDataTypeName == "Object" ? (openBlock(), createBlock(_sfc_main$d, {
                                        key: 2,
                                        data: element.data,
                                        parentNode: currNode.value,
                                        "node-item": element,
                                        depath: currDepath.value
                                      }, null, 8, ["data", "parentNode", "node-item", "depath"])) : element.dataTypeName == "Array" && element.arrayDataType && element.arrayDataTypeName != "Object" ? (openBlock(), createBlock(_sfc_main$e, {
                                        key: 3,
                                        "parent-node": _ctx.parentNode,
                                        item: element,
                                        depath: currDepath.value
                                      }, null, 8, ["parent-node", "item", "depath"])) : createCommentVNode("", true)
                                    ]),
                                    _: 2
                                  }, 1040, ["class", "style", "label", "prop"])) : createCommentVNode("", true),
                                  element.componentGroup === "Desc" && element.componentType == "Caption" ? (openBlock(), createBlock(_component_els_caption, normalizeProps(mergeProps({ key: 2 }, element.config.baseConfig)), {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(element.config.baseConfig.title ?? "描述"), 1)
                                    ]),
                                    _: 2
                                  }, 1040)) : createCommentVNode("", true)
                                ], 64))
                              ], 10, _hoisted_1$8)
                            ];
                          }),
                          _: 2
                        }, 1024))
                      ];
                    }),
                    _: 1
                  }, 16, ["class", "style", "list"])
                ];
              }),
              _: 1
            }, 8, ["class", "style"]))
          ];
        }),
        _: 1
      }, 8, ["modelValue", "label-width"]);
    };
  }
});
const property_form = [
  {
    "keyID": "df00a4f076ce4e506722745d162e9376",
    "keyName": "标签宽度",
    "keyCode": "labelWidth",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "771af881f8915302c10fcea5f1312f63",
    "keyName": "提示",
    "keyCode": "tip",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "f1a38c4eaeb9bbe3b697c671d900497d",
    "keyName": "提示位置",
    "keyCode": "tipPosition",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "左侧",
            "value": "left"
          },
          {
            "label": "右侧",
            "value": "right"
          }
        ],
        "url": "",
        "labelField": "",
        "valueField": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Radio",
    "dataType": "String",
    "defaultValue": "left"
  },
  {
    "keyID": "a84e0da7179e1989fce69a6b1051d2c4",
    "keyName": "末尾文本",
    "keyCode": "suffixContent",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "9dd4009cc368dad04d55cbe8cb319da2",
    "keyName": "必填",
    "keyCode": "required",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "baseConfig": {
        "active-text": "",
        "inactive-text": "",
        "active-value": true,
        "inactive-value": false
      },
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Switch",
    "dataType": "Bool"
  },
  {
    "keyID": "9ab4327a9c9b957cf540c5e0f3a47c8a",
    "keyName": "必填提示",
    "keyCode": "requiredMessage",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "646142315e6fa3eec4419608c4e54a3a",
    "keyName": "验证类型",
    "keyCode": "validType",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "baseConfig": {
        "dataType": "String",
        "data": [
          {
            "label": "Number",
            "value": "Number"
          },
          {
            "label": "Float",
            "value": "Float"
          },
          {
            "label": "Price",
            "value": "Price"
          },
          {
            "label": "Date",
            "value": "Date"
          },
          {
            "label": "DateTime",
            "value": "DateTime"
          },
          {
            "label": "Time",
            "value": "Time"
          },
          {
            "label": "Url",
            "value": "Url"
          },
          {
            "label": "Email",
            "value": "Email"
          },
          {
            "label": "Phone",
            "value": "Phone"
          },
          {
            "label": "Character",
            "value": "Character"
          }
        ],
        "url": "",
        "labelField": "",
        "valueField": "",
        "multiple": false,
        "clearable": false,
        "filterable": true,
        "allow-create": false,
        "width": "",
        "placeholder": "",
        "teleported": false,
        "remote": false
      },
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Select",
    "dataType": "String"
  },
  {
    "keyID": "2af80b82fb30f321bae44c308323ee1c",
    "keyName": "正则验证",
    "keyCode": "validExpression",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "941bbb888a12ef04a65a1c55e3dfe39f",
    "keyName": "验证提示",
    "keyCode": "validMessage",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": false,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "a837c7ae457d6e715641397cc13963cd",
    "keyName": "验证方法",
    "keyCode": "validMethod",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "baseConfig": {},
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Textarea",
    "dataType": "String"
  }
];
const property_array = [
  {
    "keyID": "21495f7038e07647da73fe77bee26c5c",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "23094851a18f1b7ca349e5746a409b5f",
        "keyName": "初始化长度",
        "keyCode": "arrayDefaultLength",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "Number",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "clearable": false,
            "isPassword": false,
            "showWordLimit": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "edaf433262508ded4e1c74c5b49ada4f",
        "keyName": "排列方式",
        "keyCode": "arrangementType",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "type": "button",
            "dataType": "String",
            "width": "",
            "optionWidth": "",
            "data": [
              {
                "label": "竖向",
                "value": "Vertical"
              },
              {
                "label": "横向",
                "value": "Horizontal"
              }
            ],
            "url": "",
            "labelField": "",
            "valueField": ""
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Radio",
        "dataType": "String",
        "defaultValue": "Vertical"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  },
  {
    "keyID": "defc0de4b548d1bd1a6fcf696d5d2af0",
    "keyName": "",
    "keyCode": "",
    "data": [
      {
        "keyID": "363e3ca88e8ddbcff3c8804f2397832f",
        "keyName": "最大高度",
        "keyCode": "maxHeight",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "clearable": false,
            "isPassword": false,
            "showWordLimit": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      },
      {
        "keyID": "5cf5299550b805c06fd2dd49dab399c6",
        "keyName": "最大宽度",
        "keyCode": "maxWidth",
        "data": [],
        "config": {
          "arrayConfig": {
            "componentName": "ElsFormItem",
            "type": "bottom",
            "arrayDefaultLength": 0,
            "arrangementType": "Vertical",
            "maxHeight": "",
            "maxWidth": ""
          },
          "formConfig": {
            "labelWidth": "",
            "required": false,
            "requiredMessage": "",
            "validType": "",
            "validExpression": "",
            "validMessage": "",
            "validMethod": ""
          },
          "baseConfig": {
            "width": "",
            "placeholder": "",
            "prefixIcon": "",
            "suffixIcon": "",
            "prefixTag": "",
            "suffixTag": "",
            "maxlength": "",
            "clearable": false,
            "isPassword": false,
            "showWordLimit": false,
            "isTrim": false,
            "encode": false
          },
          "advancedConfig": {
            "style": "",
            "vif": "",
            "disabled": "",
            "eventChange": ""
          }
        },
        "componentType": "Input",
        "dataType": "String"
      }
    ],
    "config": {
      "arrayConfig": {},
      "formConfig": {
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Row",
    "dataType": "None"
  }
];
const property_advanced = [
  {
    "keyID": "4dad2b3589d6f8e5c71c1d9d32f3b09e",
    "keyName": "样式",
    "keyCode": "style",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "clearable": false,
        "isPassword": false,
        "showWordLimit": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "547a134a89e4db5901ca6e78562aeb82",
    "keyName": "v-if",
    "keyCode": "vif",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "clearable": false,
        "isPassword": false,
        "showWordLimit": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "ea340531c2311a6c0224fc377228b2b9",
    "keyName": "Disabled",
    "keyCode": "disabled",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "clearable": false,
        "isPassword": false,
        "showWordLimit": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "b910183c4d2efd6d5e2e314b33188e3a",
    "keyName": "OnChange",
    "keyCode": "eventChange",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {},
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Textarea",
    "dataType": "String"
  }
];
const property_arrayAndObject = [
  {
    "keyID": "e6b2986e1a5a954b6f2972791efe6d8c",
    "keyName": "标签类型",
    "keyCode": "componentName",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "FormItem",
            "value": "ElsFormItem"
          },
          {
            "label": "Caption",
            "value": "ElsCaption"
          }
        ],
        "url": "",
        "labelField": "",
        "valueField": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "String",
    "defaultValue": "ElsFormItem"
  },
  {
    "keyID": "key_99212",
    "keyName": "标题",
    "keyCode": "title",
    "data": [],
    "config": {
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "width": "",
        "placeholder": "",
        "prefixIcon": "",
        "suffixIcon": "",
        "prefixTag": "",
        "suffixTag": "",
        "maxlength": "",
        "showWordLimit": false,
        "clearable": true,
        "isPassword": false,
        "isTrim": false,
        "encode": false
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['componentName'].value=='ElsCaption'",
        "disabled": "",
        "eventChange": ""
      },
      "arrayConfig": {}
    },
    "componentType": "Input",
    "dataType": "String"
  },
  {
    "keyID": "d95dcc72d437eb45e99b0b2207b1cf3e",
    "keyName": "显示类型",
    "keyCode": "type",
    "data": [],
    "config": {
      "arrayConfig": {
        "componentName": "ElsFormItem",
        "type": "bottom",
        "arrayDefaultLength": 0,
        "arrangementType": "Vertical",
        "maxHeight": "",
        "maxWidth": ""
      },
      "formConfig": {
        "labelWidth": "",
        "tip": "",
        "tipPosition": "left",
        "suffixContent": "",
        "required": false,
        "requiredMessage": "",
        "validType": "",
        "validExpression": "",
        "validMessage": "",
        "validMethod": ""
      },
      "baseConfig": {
        "type": "button",
        "dataType": "String",
        "width": "",
        "optionWidth": "",
        "data": [
          {
            "label": "底部",
            "value": "bottom"
          },
          {
            "label": "左侧",
            "value": "left"
          }
        ],
        "url": "",
        "labelField": "",
        "valueField": ""
      },
      "advancedConfig": {
        "style": "",
        "vif": "currNode['componentName'].value=='ElsCaption'",
        "disabled": "",
        "eventChange": ""
      }
    },
    "componentType": "Radio",
    "dataType": "String",
    "defaultValue": "bottom"
  }
];
const useDesign = defineStore("design", () => {
  const queue = ref([]);
  const pointer = ref(-1);
  const LIMIT = 30;
  const record = (data) => {
    while (pointer.value < queue.value.length - 1) {
      queue.value.pop();
    }
    pointer.value++;
    queue.value.push(JSON.parse(JSON.stringify(data)));
    if (queue.value.length - 1 > LIMIT) {
      queue.value.shift();
    }
    return pointer;
  };
  const undo = () => {
    --pointer.value;
    if (pointer.value < 0) {
      return [];
    }
    return JSON.parse(JSON.stringify(queue.value[pointer.value]));
  };
  const redo = () => {
    ++pointer.value;
    if (queue.value.length > pointer.value) {
      return { data: JSON.parse(JSON.stringify(queue.value[pointer.value])), last: pointer.value == queue.value.length - 1 };
    } else {
      --pointer.value;
      return null;
    }
  };
  const clear = () => {
    queue.value.length = 0;
  };
  return {
    record,
    undo,
    redo,
    clear
  };
});
const _hoisted_1$7 = {
  style: { "display": "flex", "background": "#f8f8f8" },
  class: "els-dynamic-view"
};
const _hoisted_2$2 = {
  style: { "flex-basis": "260px", "flex-shrink": "0", "background": "#fff" },
  class: "els-dynamic-view-components"
};
const _hoisted_3 = { style: { "flex-grow": "1" } };
const _hoisted_4 = { class: "main-tool" };
const _hoisted_5 = { style: { "display": "flex", "align-items": "center", "cursor": "pointer" } };
const _hoisted_6 = /* @__PURE__ */ createElementVNode("svg", {
  t: "1697597294665",
  class: "icon",
  viewBox: "0 0 1137 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1473",
  width: "32",
  height: "32"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M489.244444 568.888889l60.681482 75.851852H265.481481l64.474075-265.481482 60.681481 72.05926c34.133333-30.340741 109.985185-68.266667 238.933333-68.266667 201.007407 0 280.651852 204.8 280.651852 204.8S792.651852 455.111111 663.703704 455.111111c-98.607407 0-155.496296 75.851852-174.45926 113.777778z",
    "p-id": "1474",
    fill: "#409eff"
  })
], -1);
const _hoisted_7 = /* @__PURE__ */ createElementVNode("svg", {
  t: "1697597431667",
  class: "icon",
  viewBox: "0 0 1137 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "980",
  width: "32",
  height: "32"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M611.783111 569.344L549.622519 644.740741h284.444444l-65.498074-265.481482-59.922963 72.666074c-35.422815-28.48237-108.278519-68.342519-238.667852-68.342518-202.827852 0-280.651852 206.01363-280.651852 206.013629s116.318815-132.778667 246.215111-132.778666c97.204148-0.037926 153.865481 74.827852 176.241778 112.526222z",
    "p-id": "981",
    fill: "#409eff"
  })
], -1);
const _hoisted_8 = { style: { "display": "flex", "align-items": "center", "gap": "5px" } };
const _hoisted_9 = { class: "main" };
const _hoisted_10 = /* @__PURE__ */ createElementVNode("span", { class: "txt-red" }, "左侧", -1);
const _hoisted_11 = {
  style: { "flex-basis": "400px", "width": "400px", "flex-shrink": "0", "background": "#fff", "padding": "0 5px" },
  class: "els-dynamic-view-propertys"
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsDynamicDesignerView"
  },
  __name: "DynamicDesignerView",
  props: {
    modelValue: {},
    camelCase: { type: Boolean },
    dataTypes: {},
    componentTypes: {},
    appendComponentTypes: {},
    componentRelateDataType: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    var _a, _b;
    const props = __props;
    const { debounce } = lodash;
    const useDesignStore = useDesign();
    const isDisabledUndo = ref(true);
    const isDisabledReDo = ref(true);
    const activeNames = ref(["1", "2"]);
    const viewPriview = ref(false);
    const formValue = ref();
    const controlData = ref([]);
    const currDynamicDataType = ref([]);
    if (props.dataTypes) {
      currDynamicDataType.value.push(...props.dataTypes);
    } else {
      currDynamicDataType.value.push(...dynamicDataTypes);
    }
    const currComponentTypes = ref([]);
    if (props.componentTypes) {
      currComponentTypes.value.push(...props.componentTypes);
    } else {
      currComponentTypes.value.push(...dynamicComponentTypes);
    }
    if (props.appendComponentTypes) {
      currComponentTypes.value.push(...props.appendComponentTypes);
    }
    if (props.componentRelateDataType) {
      currComponentTypes.value.forEach((ele) => {
        const currRelate = props.componentRelateDataType ? props.componentRelateDataType[ele.type] : void 0;
        if (currRelate) {
          ele.dataTypes = currRelate;
        }
      });
    }
    provide("dataTypeData", currDynamicDataType.value);
    provide("componentData", currComponentTypes.value);
    const objectData = ref([
      {
        keyID: "key_" + lessCom$1.randomNumber().toString(),
        keyName: "Object",
        keyCode: "object_" + (Math.random() * 1e5).toString().toInt(),
        data: [],
        dataType: (_a = currDynamicDataType.value.find((cele) => cele.type == "Object")) == null ? void 0 : _a.value,
        dataTypeName: "Object",
        arrayDataTypeName: "",
        arrayDataType: "",
        componentGroup: "Form",
        componentTypeName: "Object",
        componentName: "",
        componentType: 0,
        config: {
          formConfig: {},
          baseConfig: {},
          advancedConfig: {},
          arrayConfig: {}
        },
        value: {}
      },
      {
        keyID: "key_" + lessCom$1.randomNumber().toString(),
        keyName: "Array",
        keyCode: "array_" + (Math.random() * 1e5).toString().toInt(),
        data: [],
        dataType: (_b = currDynamicDataType.value.find((cele) => cele.type == "Array")) == null ? void 0 : _b.value,
        dataTypeName: "Array",
        componentGroup: "Form",
        componentTypeName: "Array<T>",
        componentName: "",
        componentType: 0,
        arrayDataTypeName: "",
        arrayDataType: "",
        config: {
          formConfig: {},
          baseConfig: {},
          advancedConfig: {},
          arrayConfig: {}
        },
        value: []
      }
    ]);
    const importJSON = ref();
    currComponentTypes.value.forEach((ele) => {
      const currType = currDynamicDataType.value.find((cele) => cele.type == ele.dataTypes[0]);
      controlData.value.push({
        keyID: "key_" + lessCom$1.randomNumber().toString(),
        keyName: ele.label,
        keyCode: "key_" + (Math.random() * 1e5).toString().toInt(),
        data: [],
        dataType: currType == null ? void 0 : currType.value,
        dataTypeName: ele.dataTypes[0],
        arrayDataTypeName: "",
        arrayDataType: "",
        componentGroup: ele.group,
        componentTypeName: ele.label,
        componentName: ele.componentName,
        componentType: ele.value,
        config: {
          formConfig: {},
          baseConfig: {},
          advancedConfig: {},
          arrayConfig: {}
        },
        value: initValue(currType == null ? void 0 : currType.type)
      });
    });
    function initValue(type) {
      switch (type) {
        case "Number":
          return 0;
        case "Bool":
          return false;
        case "Object":
          return {};
        case "Array":
          return [];
        default:
          return "";
      }
    }
    const dynamicHandler = new DynamicHandler(currDynamicDataType.value, currComponentTypes.value);
    const renderData = ref([]);
    function handleOpenImport() {
      const val = renderData.value;
      const currVal = lessCom$1.cloneObj(val);
      dynamicHandler.recoverConfig(currVal);
      importJSON.value = currVal;
    }
    function initData() {
      if (props.modelValue) {
        if (typeof props.modelValue === "object") {
          renderData.value = lessCom$1.cloneObj(props.modelValue);
        } else {
          renderData.value = lessCom$1.cloneObj(JSON.parse(props.modelValue));
        }
        dynamicHandler.initConfigType(renderData.value);
      }
    }
    initData();
    const debouncedReturnResult = computed(() => {
      return debounce(returnResult, 200);
    });
    function returnResult() {
      const val = renderData.value;
      if (val.length > 0) {
        const currVal = lessCom$1.cloneObj(val);
        dynamicHandler.recoverConfig(currVal);
        if (typeof val === "object") {
          emits("update:modelValue", currVal);
        } else {
          emits("update:modelValue", JSON.stringify(currVal));
        }
      } else {
        if (typeof val === "object") {
          emits("update:modelValue", {});
        } else {
          emits("update:modelValue", "");
        }
      }
    }
    watch(renderData, () => {
      debouncedReturnResult.value();
    }, { deep: true });
    const currSelectItem = ref();
    const currSelectData = ref();
    const showPropertys = ref(false);
    function setSelectItem(item, data = null) {
      currSelectData.value = data;
      if (!item) {
        currSelectItem.value = null;
        showPropertys.value = false;
        return;
      }
      if (!currSelectItem.value || currSelectItem.value.keyID != item.keyID) {
        showPropertys.value = false;
        currSelectItem.value = item;
        nextTick(() => {
          showPropertys.value = true;
        });
      }
    }
    function handleClone(item) {
      item = lessCom$1.cloneObj(item);
      item.keyID = "key_" + lessCom$1.randomNumber().toString(), item.keyCode = "key_" + lessCom$1.randomNumber();
      return item;
    }
    const currPropertys = computed(() => {
      if (currSelectItem.value) {
        if (currSelectItem.value.dataType !== void 0) {
          if (!currSelectItem.value.componentType) {
            const currVal = currDynamicDataType.value.find((ele) => ele.value == currSelectItem.value.dataType);
            const arrayVal = currDynamicDataType.value.find((ele) => ele.value == currSelectItem.value.arrayDataType);
            if ((currVal == null ? void 0 : currVal.type) == "Array" && (arrayVal == null ? void 0 : arrayVal.type) === "Object" || (currVal == null ? void 0 : currVal.type) == "Object") {
              return lessCom$1.cloneObj(property_arrayAndObject);
            }
          } else {
            if (currComponentTypes.value) {
              const currControlData = currComponentTypes.value.find((ele) => ele.value == currSelectItem.value.componentType);
              if (currControlData && currControlData.propertys && currControlData.propertys.length) {
                return currControlData.propertys;
              } else {
                const currVal = currDynamicDataType.value.find((ele) => ele.value == currSelectItem.value.dataType);
                const arrayVal = currDynamicDataType.value.find((ele) => ele.value == currSelectItem.value.arrayDataType);
                if ((currVal == null ? void 0 : currVal.type) == "Array" && (arrayVal == null ? void 0 : arrayVal.type) === "Object" || (currVal == null ? void 0 : currVal.type) == "Object")
                  return lessCom$1.cloneObj(property_arrayAndObject);
              }
            }
          }
        } else {
          if (!currSelectItem.value.componentType) {
            currSelectItem.value.config = {
              formConfig: {},
              baseConfig: {},
              advancedConfig: {},
              arrayConfig: {}
            };
          }
        }
        return null;
      }
    });
    function recordComponent() {
      setSelectItem(null);
      useDesignStore.record(renderData.value);
      isDisabledUndo.value = false;
      isDisabledReDo.value = true;
    }
    function unDoComponent() {
      setSelectItem(null);
      renderData.value = useDesignStore.undo();
      isDisabledReDo.value = false;
      if (renderData.value.length == 0) {
        isDisabledUndo.value = true;
      }
    }
    function reDoComponent() {
      const currValue = useDesignStore.redo();
      if (currValue) {
        renderData.value = currValue.data;
        isDisabledReDo.value = currValue.last;
      }
    }
    function getSelectItem() {
      return currSelectItem.value;
    }
    function getDataTypeData(componentType) {
      if (!componentType) {
        return [];
      }
      const currControl = currComponentTypes.value.find((ele) => ele.value === componentType || ele.type === componentType);
      if (!currControl) {
        return [];
      }
      return currDynamicDataType.value.filter((ele) => currControl.dataTypes.includes(ele.type));
    }
    function handleImportDesigner() {
      if (typeof importJSON.value === "string") {
        renderData.value = JSON.parse(importJSON.value);
      } else {
        renderData.value = importJSON.value;
      }
      dynamicHandler.initConfigType(renderData.value);
      recordComponent();
      return Promise.resolve(true);
    }
    function clearAll() {
      isDisabledReDo.value = true;
      isDisabledUndo.value = true;
      useDesignStore.clear();
      renderData.value = [];
      currSelectItem.value = null;
    }
    function validationCode(rule, value, callback) {
      console.log(rule);
      if (value === "") {
        callback(new Error("keyCode不能为空"));
      } else if (currSelectData.value && currSelectData.value.filter((ele) => ele.keyCode == value).length > 1) {
        ElMessage.warning(`[${value}]重复`);
        callback(new Error("keyCode重复"));
      } else {
        callback();
      }
    }
    function handleChangeKeyCode(keyCode) {
      if (props.camelCase) {
        currSelectItem.value.keyCode = keyCode.replace(keyCode[0], keyCode[0].toLowerCase());
      }
    }
    provide("setSelectItem", setSelectItem);
    provide("getSelectItem", getSelectItem);
    provide("recordComponent", recordComponent);
    return (_ctx, _cache) => {
      const _component_el_collapse_item = resolveComponent("el-collapse-item");
      const _component_el_collapse = resolveComponent("el-collapse");
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      const _component_el_tabs = resolveComponent("el-tabs");
      const _component_el_button = resolveComponent("el-button");
      const _component_Delete = resolveComponent("Delete");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_el_link = resolveComponent("el-link");
      const _component_ElsJsonEditor = resolveComponent("ElsJsonEditor");
      const _component_els_data_modal = resolveComponent("els-data-modal");
      const _component_View = resolveComponent("View");
      const _component_el_empty = resolveComponent("el-empty");
      const _component_els_input = resolveComponent("els-input");
      const _component_els_select = resolveComponent("els-select");
      const _component_els_form = resolveComponent("els-form");
      const _component_ElsDynamicRender = resolveComponent("ElsDynamicRender");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      const _component_ElsJsonViewer = resolveComponent("ElsJsonViewer");
      const _component_els_dialog = resolveComponent("els-dialog");
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("div", null, [
          createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
            default: withCtx(() => [
              createElementVNode("div", _hoisted_1$7, [
                createElementVNode("div", _hoisted_2$2, [
                  createVNode(_component_el_tabs, { stretch: "" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_tab_pane, { label: "表单组件" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_collapse, {
                            modelValue: activeNames.value,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => activeNames.value = $event)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_collapse_item, {
                                title: "基础类型",
                                name: "1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(draggable), {
                                    tag: "ul",
                                    list: controlData.value.filter((ele) => ele.componentGroup === "Form"),
                                    "item-key": "keyID",
                                    group: { name: "dragGroup", pull: "clone", put: false },
                                    clone: handleClone,
                                    sort: false
                                  }, {
                                    item: withCtx(({ element, index }) => [
                                      (openBlock(), createElementBlock("li", {
                                        class: "container-widget-item",
                                        key: index
                                      }, toDisplayString(element.componentTypeName), 1))
                                    ]),
                                    _: 1
                                  }, 8, ["list"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_collapse_item, {
                                title: "对象类型",
                                name: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(draggable), {
                                    tag: "ul",
                                    list: objectData.value,
                                    "item-key": "keyID",
                                    group: { name: "dragGroup", pull: "clone", put: false },
                                    clone: handleClone,
                                    sort: false
                                  }, {
                                    item: withCtx(({ element, index }) => [
                                      (openBlock(), createElementBlock("li", {
                                        class: "container-widget-item",
                                        key: index
                                      }, toDisplayString(element.componentTypeName), 1))
                                    ]),
                                    _: 1
                                  }, 8, ["list"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_tab_pane, { label: "展示组件" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_collapse, {
                            modelValue: activeNames.value,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => activeNames.value = $event)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_collapse_item, {
                                title: "容器",
                                name: "1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(draggable), {
                                    tag: "ul",
                                    list: controlData.value.filter((ele) => ele.componentGroup === "Container"),
                                    "item-key": "keyID",
                                    group: { name: "dragGroup", pull: "clone", put: false },
                                    clone: handleClone,
                                    sort: false
                                  }, {
                                    item: withCtx(({ element, index }) => [
                                      (openBlock(), createElementBlock("li", {
                                        class: "container-widget-item",
                                        key: index
                                      }, toDisplayString(element.componentTypeName), 1))
                                    ]),
                                    _: 1
                                  }, 8, ["list"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_el_collapse_item, {
                                title: "展示",
                                name: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(draggable), {
                                    tag: "ul",
                                    list: controlData.value.filter((ele) => ele.componentGroup === "Desc"),
                                    "item-key": "keyID",
                                    group: { name: "dragGroup", pull: "clone", put: false },
                                    clone: handleClone,
                                    sort: false
                                  }, {
                                    item: withCtx(({ element, index }) => [
                                      (openBlock(), createElementBlock("li", {
                                        class: "container-widget-item",
                                        key: index
                                      }, toDisplayString(element.componentTypeName), 1))
                                    ]),
                                    _: 1
                                  }, 8, ["list"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createElementVNode("div", _hoisted_3, [
                  createElementVNode("div", _hoisted_4, [
                    createElementVNode("span", _hoisted_5, [
                      createVNode(_component_el_button, {
                        link: "",
                        onClick: unDoComponent,
                        disabled: isDisabledUndo.value
                      }, {
                        default: withCtx(() => [
                          _hoisted_6
                        ]),
                        _: 1
                      }, 8, ["disabled"]),
                      createVNode(_component_el_button, {
                        link: "",
                        onClick: reDoComponent,
                        disabled: isDisabledReDo.value
                      }, {
                        default: withCtx(() => [
                          _hoisted_7
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    createElementVNode("span", _hoisted_8, [
                      createVNode(_component_el_link, {
                        type: "primary",
                        onClick: clearAll
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_Delete)
                            ]),
                            _: 1
                          }),
                          createTextVNode("清空 ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_els_data_modal, {
                        title: "导入配置",
                        open: handleOpenImport,
                        componentName: "el-link",
                        buttonLabel: "导入配置",
                        hasInput: false,
                        link: "",
                        confirm: handleImportDesigner,
                        icon: "DocumentAdd"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ElsJsonEditor, {
                            modelValue: importJSON.value,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => importJSON.value = $event),
                            style: { "height": "500px" }
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_link, {
                        type: "primary",
                        onClick: _cache[3] || (_cache[3] = ($event) => viewPriview.value = !viewPriview.value)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(_component_View)
                            ]),
                            _: 1
                          }),
                          createTextVNode("预览 ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createElementVNode("div", _hoisted_9, [
                    createVNode(_sfc_main$d, { data: renderData.value }, null, 8, ["data"]),
                    !renderData.value.length ? (openBlock(), createBlock(_component_el_empty, {
                      key: 0,
                      style: { "margin-top": "-650px" }
                    }, {
                      description: withCtx(() => [
                        createTextVNode("请点击拖动"),
                        _hoisted_10,
                        createTextVNode("组件到此处")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])
                ]),
                createElementVNode("div", _hoisted_11, [
                  currSelectItem.value && currPropertys.value && showPropertys.value ? (openBlock(), createBlock(_component_el_tabs, {
                    key: 0,
                    stretch: ""
                  }, {
                    default: withCtx(() => [
                      currSelectItem.value.dataType ? (openBlock(), createBlock(_component_el_tab_pane, {
                        key: 0,
                        label: "基础属性"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_els_form, {
                            modelValue: currSelectItem.value,
                            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => currSelectItem.value = $event)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_els_input, {
                                label: "名称",
                                prop: "keyName",
                                required: ""
                              }),
                              createVNode(_component_els_input, {
                                label: "字段名",
                                prop: "keyCode",
                                onInput: handleChangeKeyCode,
                                validMethod: validationCode,
                                required: ""
                              }),
                              currSelectItem.value.dataTypeName != "Array" && currSelectItem.value.dataTypeName != "Object" ? (openBlock(), createBlock(_component_els_select, {
                                key: 0,
                                label: "数据类型",
                                required: "",
                                data: getDataTypeData(currSelectItem.value.componentType),
                                onSelect: _cache[4] || (_cache[4] = (sitem) => {
                                  currSelectItem.value.dataTypeName = sitem.selectItem.type;
                                }),
                                valueField: "value",
                                labelField: "label",
                                placeholder: "值类型",
                                prop: "dataType"
                              }, null, 8, ["data"])) : createCommentVNode("", true),
                              currSelectItem.value.dataTypeName == "Array" && currSelectItem.value.componentType ? (openBlock(), createBlock(_component_els_select, {
                                key: 1,
                                label: "数据类型",
                                required: "",
                                data: getDataTypeData(currSelectItem.value.componentType),
                                onSelect: _cache[5] || (_cache[5] = (sitem) => {
                                  currSelectItem.value.arrayDataTypeName = sitem.selectItem.type;
                                }),
                                valueField: "value",
                                labelField: "label",
                                placeholder: "值类型",
                                prop: "arrayDataType"
                              }, null, 8, ["data"])) : createCommentVNode("", true),
                              createVNode(_component_els_input, {
                                label: "默认值",
                                prop: "defaultValue"
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_el_tab_pane, { label: "组件属性" }, {
                        default: withCtx(() => [
                          createVNode(_component_ElsDynamicRender, {
                            isAsyncComponent: "",
                            modelValue: currSelectItem.value.config.baseConfig,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => currSelectItem.value.config.baseConfig = $event),
                            nodeType: { dataType: currSelectItem.value.dataTypeName != "Array" ? currSelectItem.value.dataTypeName : currSelectItem.value.arrayDataTypeName, componentName: currSelectItem.value.componentName },
                            config: currPropertys.value,
                            inputWidth: "100%"
                          }, null, 8, ["modelValue", "nodeType", "config"])
                        ]),
                        _: 1
                      }),
                      currSelectItem.value.dataTypeName == "Array" ? (openBlock(), createBlock(_component_el_tab_pane, {
                        key: 1,
                        label: "数组属性",
                        isAsyncComponent: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ElsDynamicRender, {
                            modelValue: currSelectItem.value.config.arrayConfig,
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => currSelectItem.value.config.arrayConfig = $event),
                            config: unref(property_array),
                            inputWidth: "100%"
                          }, null, 8, ["modelValue", "config"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      currSelectItem.value.dataTypeName != "None" ? (openBlock(), createBlock(_component_el_tab_pane, {
                        key: 2,
                        label: "表单属性",
                        isAsyncComponent: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ElsDynamicRender, {
                            modelValue: currSelectItem.value.config.formConfig,
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => currSelectItem.value.config.formConfig = $event),
                            config: unref(property_form),
                            inputWidth: "100%"
                          }, null, 8, ["modelValue", "config"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_el_tab_pane, { label: "高级属性" }, {
                        default: withCtx(() => [
                          createVNode(_component_ElsDynamicRender, {
                            isAsyncComponent: "",
                            modelValue: currSelectItem.value.config.advancedConfig,
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => currSelectItem.value.config.advancedConfig = $event),
                            config: unref(property_advanced),
                            inputWidth: "100%"
                          }, null, 8, ["modelValue", "config"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ])
              ])
            ]),
            _: 1
          }, 16)
        ]),
        createVNode(_component_els_dialog, {
          modelValue: viewPriview.value,
          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => viewPriview.value = $event),
          width: "70%",
          title: "预览效果"
        }, {
          default: withCtx(() => [
            createVNode(_component_el_tabs, null, {
              default: withCtx(() => [
                createVNode(_component_el_tab_pane, { label: "预览" }, {
                  default: withCtx(() => [
                    createVNode(_component_ElsDynamicRender, {
                      modelValue: formValue.value,
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => formValue.value = $event),
                      config: renderData.value
                    }, null, 8, ["modelValue", "config"])
                  ]),
                  _: 1
                }),
                createVNode(_component_el_tab_pane, { label: "表单属性" }, {
                  default: withCtx(() => [
                    createVNode(_component_ElsJsonViewer, {
                      data: formValue.value,
                      expandDepth: 10
                    }, null, 8, ["data"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 64);
    };
  }
});
const DynamicDesignerView_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$6 = { class: "els-dynamic-create" };
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsDynamicCreate"
  },
  __name: "DynamicCreate",
  props: {
    modelValue: {},
    camelCase: { type: Boolean },
    dataTypes: {},
    componentTypes: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currData = useVModel(props, "modelValue", emits);
    if (!currData.value) {
      currData.value = {
        componentName: "ElsDynamicRender",
        label: "",
        value: "",
        type: "",
        dataTypes: [],
        defaultPropertys: { config: [] }
      };
    } else if (!currData.value.defaultPropertys) {
      currData.value.defaultPropertys = { config: [] };
    }
    watchEffect(() => {
      var _a, _b;
      if (currData.value) {
        currData.value.value = ((_a = currData.value) == null ? void 0 : _a.label) ?? "";
        currData.value.type = ((_b = currData.value) == null ? void 0 : _b.label) ?? "";
        currData.value.dataTypes = [currData.value.value];
      }
    });
    return (_ctx, _cache) => {
      const _component_els_input = resolveComponent("els-input");
      const _component_ElsDynamicDesigner = resolveComponent("ElsDynamicDesigner");
      const _component_els_form = resolveComponent("els-form");
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createVNode(_component_els_form, {
          modelValue: unref(currData),
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(currData) ? currData.value = $event : null)
        }, {
          default: withCtx(() => [
            createVNode(_component_els_input, {
              label: "名称",
              prop: "label",
              required: ""
            }),
            createVNode(_component_ElsDynamicDesigner, {
              label: "配置",
              modelValue: unref(currData).defaultPropertys.config,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(currData).defaultPropertys.config = $event),
              dataTypes: _ctx.dataTypes,
              componentTypes: _ctx.componentTypes,
              camelCase: _ctx.camelCase,
              componentSettingVisible: false
            }, null, 8, ["modelValue", "dataTypes", "componentTypes", "camelCase"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});
const _hoisted_1$5 = { class: "els-dynamic-config-tool" };
const _hoisted_2$1 = { class: "dialog-footer" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsDynamicDesigner"
  },
  __name: "DynamicDesigner",
  props: {
    modelValue: {},
    camelCase: { type: Boolean },
    dataTypes: {},
    componentTypes: {},
    appendComponentTypes: {},
    componentRelateDataType: {},
    componentSettingVisible: { type: Boolean, default: true },
    isReturnValueTemplate: { type: Boolean },
    initValue: {},
    allowCreateType: { type: Boolean },
    createTypeMethod: {},
    allowCreateComponent: { type: Boolean },
    createComponentMethod: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:initValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const designerJSON = ref();
    const importJSON = ref();
    const designerContainer = ref();
    const designerObj = ref([]);
    function initData() {
      if (props.modelValue && typeof props.modelValue === "string") {
        if (props.modelValue != JSON.stringify(designerObj.value)) {
          designerJSON.value = props.modelValue;
          designerObj.value = JSON.parse(props.modelValue);
        }
      } else if (props.modelValue && typeof props.modelValue === "object") {
        designerJSON.value = JSON.stringify(props.modelValue);
        designerObj.value = props.modelValue;
      }
    }
    initData();
    const currDynamicDataType = ref([]);
    if (props.dataTypes) {
      currDynamicDataType.value.push(...props.dataTypes);
    } else {
      currDynamicDataType.value.push(...dynamicDataTypes);
    }
    provide("tagID", "els-dynamic-designer-" + lessCom$1.Guid32());
    provide("dataTypeData", currDynamicDataType.value);
    provide("allowCreateType", props.allowCreateType);
    provide("allowCreateComponent", props.allowCreateComponent);
    const currComponentTypes = ref([]);
    if (props.componentTypes) {
      currComponentTypes.value.push(...props.componentTypes);
    } else {
      currComponentTypes.value.push(...dynamicComponentTypes);
    }
    if (props.appendComponentTypes) {
      currComponentTypes.value.push(...props.appendComponentTypes);
    }
    if (props.componentRelateDataType) {
      currComponentTypes.value.forEach((ele) => {
        const currRelate = props.componentRelateDataType ? props.componentRelateDataType[ele.type] : void 0;
        if (currRelate) {
          ele.dataTypes = currRelate;
        }
      });
    }
    const dynamicHandler = new DynamicHandler(currDynamicDataType.value, currComponentTypes.value);
    const createVisible = ref(false);
    provide("componentData", currComponentTypes.value);
    provide("componentSettingVisible", props.componentSettingVisible);
    provide("camelCase", props.camelCase);
    function handleImportDesigner() {
      if (typeof importJSON.value === "string") {
        designerObj.value = JSON.parse(importJSON.value);
      } else {
        designerObj.value = importJSON.value;
      }
      return Promise.resolve(true);
    }
    function handleOpenImport() {
      importJSON.value = designerObj.value;
    }
    function openCreateType(typeValue) {
      if (props.createTypeMethod) {
        props.createTypeMethod(typeValue);
      } else {
        dynamicNewType.value = { componentName: "ElsDynamicRender", config: {}, label: "名称", value: "Value", type: "Type", dataTypes: [], defaultPropertys: { config: [] }, propertys: [], group: "Form" };
        createVisible.value = true;
      }
    }
    function openCreateComponent(typeValue) {
      if (props.createComponentMethod) {
        props.createComponentMethod(typeValue);
      } else {
        dynamicNewType.value = { componentName: "ElsDynamicRender", config: {}, label: "名称", value: "Value", type: "Type", dataTypes: [], defaultPropertys: { config: [] }, propertys: [], group: "Form" };
      }
    }
    const createResult = ref();
    const createResultVisible = ref(false);
    const dynamicNewType = ref({});
    function handleSaveType() {
      createResultVisible.value = true;
      createResult.value = JSON.stringify(dynamicNewType.value);
    }
    provide("openCreateType", openCreateType);
    provide("openCreateComponent", openCreateComponent);
    watch(designerObj, (val) => {
      if (val) {
        if (props.isReturnValueTemplate) {
          emits("update:initValue", dynamicHandler.configResult(val));
        }
        if (typeof props.modelValue === "object") {
          emits("update:modelValue", val);
        } else {
          emits("update:modelValue", JSON.stringify(val));
        }
      }
    }, { deep: true });
    const designType = ref("精简模式");
    function closeViewDialog() {
      designType.value = "精简模式";
    }
    return (_ctx, _cache) => {
      const _component_MoreFilled = resolveComponent("MoreFilled");
      const _component_el_icon = resolveComponent("el-icon");
      const _component_ElsOption = resolveComponent("ElsOption");
      const _component_Grid = resolveComponent("Grid");
      const _component_ElsRadioButton = resolveComponent("ElsRadioButton");
      const _component_ElsJsonEditor = resolveComponent("ElsJsonEditor");
      const _component_els_data_modal = resolveComponent("els-data-modal");
      const _component_els_dialog = resolveComponent("els-dialog");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      const _component_els_ace_editor = resolveComponent("els-ace-editor");
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createElementVNode("div", {
              class: "els-dynamic-config",
              ref_key: "designerContainer",
              ref: designerContainer
            }, [
              createElementVNode("div", _hoisted_1$5, [
                createVNode(_component_ElsRadioButton, {
                  modelValue: designType.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => designType.value = $event)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_ElsOption, { value: "精简模式" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_MoreFilled)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_ElsOption, { value: "设计模式" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(_component_Grid)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                createVNode(_component_els_data_modal, {
                  style: { "margin-left": "5px", "margin-bottom": "5px" },
                  title: "导入配置",
                  buttonLabel: "导入配置",
                  icon: "Edit",
                  hasInput: false,
                  open: handleOpenImport,
                  confirm: handleImportDesigner
                }, {
                  default: withCtx(() => [
                    createVNode(_component_ElsJsonEditor, {
                      modelValue: importJSON.value,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => importJSON.value = $event),
                      style: { "height": "500px" }
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ]),
              designType.value === "精简模式" ? (openBlock(), createBlock(_sfc_main$g, {
                key: 0,
                data: designerObj.value
              }, null, 8, ["data"])) : createCommentVNode("", true)
            ], 512),
            designType.value !== "精简模式" ? (openBlock(), createBlock(_component_els_dialog, {
              key: 0,
              visible: true,
              onClose: closeViewDialog,
              width: "90%",
              "append-to-body": true
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$c, {
                  dataTypes: _ctx.dataTypes,
                  camelCase: _ctx.camelCase,
                  componentTypes: _ctx.componentTypes,
                  appendComponentTypes: _ctx.appendComponentTypes,
                  componentRelateDataType: _ctx.componentRelateDataType,
                  modelValue: designerObj.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => designerObj.value = $event)
                }, null, 8, ["dataTypes", "camelCase", "componentTypes", "appendComponentTypes", "componentRelateDataType", "modelValue"])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }, 16),
        createVNode(_component_els_dialog, {
          modelValue: createVisible.value,
          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => createVisible.value = $event),
          width: "60%",
          "append-to-body": true,
          title: "创建类型"
        }, {
          footer: withCtx(() => [
            createElementVNode("span", _hoisted_2$1, [
              createVNode(_component_el_button, {
                onClick: _cache[5] || (_cache[5] = ($event) => createVisible.value = false)
              }, {
                default: withCtx(() => [
                  createTextVNode("取消")
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: handleSaveType
              }, {
                default: withCtx(() => [
                  createTextVNode(" 提交 ")
                ]),
                _: 1
              })
            ])
          ]),
          default: withCtx(() => [
            createTextVNode(toDisplayString(createResult.value) + " ", 1),
            createVNode(_sfc_main$b, {
              dataTypes: _ctx.dataTypes,
              modelValue: dynamicNewType.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dynamicNewType.value = $event),
              camelCase: _ctx.camelCase,
              componentTypes: _ctx.componentTypes
            }, null, 8, ["dataTypes", "modelValue", "camelCase", "componentTypes"]),
            createVNode(_component_els_ace_editor, {
              modelValue: createResult.value,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => createResult.value = $event),
              language: "json"
            }, null, 8, ["modelValue"])
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});
const DynamicDesigner_vue_vue_type_style_index_0_lang = "";
_sfc_main$a.install = (app) => {
  app.component(_sfc_main$a.__name, _sfc_main$a);
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DynamicRenderInnerItem",
  props: {
    modelValue: {},
    item: {},
    currDepath: {},
    parentNode: {},
    currNode: {},
    nodeType: {}
  },
  emits: ["update:modelValue", "valueChange"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const controlData = inject("componentData", []);
    const dyProvideData = inject("dyProvideData", null);
    const attrs = useAttrs();
    const currValue = ref();
    watchEffect(() => {
      currValue.value = props.modelValue;
    });
    watch(currValue, (val) => {
      emits("update:modelValue", val);
      emits("valueChange", val);
    }, { deep: true });
    function handleClear() {
      if (props.item.dataTypeName == "Number" || props.item.arrayDataTypeName == "Number") {
        currValue.value = 0;
      }
      if (props.item.dataTypeName == "Bool" || props.item.arrayDataTypeName == "Bool") {
        currValue.value = false;
      } else {
        currValue.value = "";
      }
    }
    const baseAttrs = computed(() => {
      let baseConfig = {};
      const currControl = controlData.find((ele) => ele.value == props.item.componentType);
      if (currControl == null ? void 0 : currControl.defaultPropertys) {
        const currBaseConfig = Object.assign({}, currControl == null ? void 0 : currControl.defaultPropertys, props.item.config.baseConfig);
        for (var key in currBaseConfig) {
          if (key) {
            if (currBaseConfig[key] === void 0 || currBaseConfig[key] === "") {
              delete currBaseConfig[key];
            }
          }
        }
        baseConfig = currBaseConfig;
      }
      const currAttrs = Object.assign(lessCom$1.cloneObj(baseConfig), { "style": props.item.config.advancedConfig.style }, attrs);
      const parseNumbers = ["max", "min", "precision", "step", "rows"];
      for (const name of parseNumbers) {
        if (currAttrs[name]) {
          currAttrs[name] = parseInt(currAttrs[name]);
        } else {
          delete currAttrs[name];
        }
      }
      if (["ElsSelect", "ElsRadio", "ElsCheckBox", "ElsCascader"].includes(props.item.componentName)) {
        if (props.item.dataTypeName == "Number" || props.item.arrayDataTypeName == "Number") {
          currAttrs.valueType = "Number";
        } else if (props.item.dataTypeName == "Bool" || props.item.arrayDataTypeName == "Bool") {
          currAttrs.valueType = "Bool";
        }
      }
      return currAttrs;
    });
    const componentAttrs = ref(baseAttrs.value);
    const showText = ref("");
    const componentName = ref("");
    watchEffect(() => {
      componentName.value = props.item.componentName;
    });
    watch(dyProvideData, (val) => {
      if (val && ["active-value", "inactive-value", "multiple", "value"].includes(props.item.keyCode)) {
        const currNodeType = val.nodeType;
        showText.value = "";
        if (currNodeType && currNodeType.componentName == "ElsSwitch") {
          if (props.item.keyCode == "active-value" || props.item.keyCode == "inactive-value") {
            if (currNodeType.dataType == "Bool") {
              componentAttrs.value = Object.assign({}, baseAttrs.value, { "disabled": true });
              if (props.item.keyCode == "active-value") {
                currValue.value = true;
                showText.value = "true";
              } else {
                currValue.value = false;
                showText.value = "false";
              }
            } else if (currNodeType.dataType == "Number") {
              componentAttrs.value = Object.assign({}, baseAttrs.value, { "disabled": false });
              if (props.item.keyCode == "active-value") {
                showText.value = "1";
                currValue.value = 1;
              } else {
                currValue.value = 0;
                showText.value = "0";
              }
            } else {
              componentAttrs.value = Object.assign({}, baseAttrs.value, { "disabled": false });
              if (props.item.keyCode == "active-value") {
                if (typeof currValue.value !== "string") {
                  currValue.value = "true";
                }
              } else {
                if (typeof currValue.value !== "string") {
                  currValue.value = "false";
                }
              }
            }
          }
        } else if (currNodeType && ["ElsSelect", "ElsRadio", "ElsCheckBox", "ElsCascader"].includes(currNodeType.componentName)) {
          if (props.item.keyCode === "multiple" && currNodeType.dataType === "Number") {
            currValue.value = false;
            showText.value = "false";
          } else if (props.item.keyCode === "value") {
            if (currNodeType.dataType == "Bool") {
              if (typeof currValue.value !== "boolean") {
                currValue.value = false;
              }
              componentName.value = "ElsSelect";
              componentAttrs.value = Object.assign({ "teleported": false, "width": "80", "data": [{ label: "true", value: true }, { label: "false", value: false }], "type": "radio" }, baseAttrs.value);
            } else if (currNodeType.dataType === "Number") {
              if (typeof currValue.value !== "number") {
                currValue.value = 0;
              }
              componentName.value = "ElsInputNumber";
              componentAttrs.value = Object.assign({}, baseAttrs.value, { "controls-position": "right", "width": "80" });
            }
          }
        }
      }
    }, { immediate: true, deep: true });
    function getUrl() {
      let currUrl = props.item.config.baseConfig.url || props.item.config.baseConfig.modalUrl;
      if (currUrl) {
        if (currUrl.startsWith(":")) {
          currUrl = currUrl.substr(1);
          let currEvent = new Function("parentNode,currNode", "return " + currUrl);
          currUrl = currEvent(props.parentNode, props.currNode);
        }
        return currUrl.setPowerPublicQuery();
      }
    }
    return (_ctx, _cache) => {
      const _component_el_tag = resolveComponent("el-tag");
      return componentName.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        showText.value ? (openBlock(), createBlock(_component_el_tag, { key: 0 }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(showText.value), 1)
          ]),
          _: 1
        })) : (openBlock(), createBlock(resolveDynamicComponent(componentName.value), mergeProps({ key: 1 }, componentAttrs.value, {
          modelValue: currValue.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currValue.value = $event),
          url: getUrl(),
          onClear: handleClear
        }), null, 16, ["modelValue", "url"]))
      ], 64)) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DynamicRenderInnerArray",
  props: {
    item: {},
    parentNode: {}
  },
  emits: ["update:data"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currData = useVModel(props, "item", emits);
    function handleDisabledExpress() {
      if (currData.value.config.advancedConfig && currData.value.config.advancedConfig.disabled) {
        let currEvent = new Function("parentNode,currNode", "return " + currData.value.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currData.value);
      }
      return false;
    }
    function handleValueChange(val) {
      if (currData.value.config.advancedConfig && currData.value.config.advancedConfig.eventChange) {
        let currEvent = new Function("val,parentNode,currNode", currData.value.config.advancedConfig.eventChange);
        currEvent(val, props.parentNode, currData.value);
      }
    }
    function getItemDefaultValue() {
      if (currData.value.arrayDataTypeName == "Bool") {
        if (currData.value.defaultValue === "true") {
          return true;
        } else {
          return false;
        }
      } else if (currData.value.arrayDataTypeName === "Number") {
        if (currData.value.defaultValue != void 0 && currData.value.defaultValue !== "") {
          return parseFloat(currData.value.defaultValue);
        } else {
          return 0;
        }
      } else if (currData.value.arrayDataTypeName === "Object") {
        return {};
      } else if (currData.value.arrayDataTypeName === "Array") {
        return [];
      }
      if (currData.value.defaultValue) {
        return currData.value.defaultValue;
      }
      return "";
    }
    function handleAddItem() {
      return getItemDefaultValue();
    }
    const formAttrs = computed(() => {
      const currFormConfig = lessCom$1.cloneObj(currData.value.config.formConfig);
      currFormConfig.labelWidth = "0px";
      if (currFormConfig) {
        if (currFormConfig.validMethod) {
          let currEvent = new Function("parentNode,currNode", "return " + currFormConfig.validMethod);
          currFormConfig.validMethod = currEvent(props.parentNode, currData.value);
        } else {
          delete currFormConfig.validMethod;
        }
      }
      return currFormConfig;
    });
    function initDefault(val) {
      let defaultArrayData = [];
      let defaultValue = getItemDefaultValue();
      if (val === void 0 || val === "") {
        defaultArrayData.push(defaultValue);
      } else {
        for (let i = 0; i < val; i++) {
          defaultArrayData.push(defaultValue);
        }
      }
      currData.value.value = defaultArrayData;
    }
    watch(() => currData.value.value, (val) => {
      if (!val || !Array.isArray(val)) {
        initDefault(currData.value.config.arrayConfig.arrayDefaultLength);
      }
    }, { immediate: true });
    watch(() => currData.value.config.arrayConfig.arrayDefaultLength, (val) => {
      initDefault(val);
    });
    return (_ctx, _cache) => {
      const _component_els_list = resolveComponent("els-list");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({ "horizontal": unref(currData).config.arrayConfig.arrangementType === "Horizontal" }),
        style: { "flex-grow": "1" }
      }, [
        createVNode(_component_els_list, {
          modelValue: unref(currData).value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(currData).value = $event),
          onAdd: handleAddItem,
          "item-class-name": { "els-dynamic-r-array": _ctx.item.arrayDataTypeName === "Object" },
          style: normalizeStyle([
            { "max-width": unref(currData).config.arrayConfig.maxWidth ? unref(currData).config.arrayConfig.maxWidth + "px" : "" },
            { "max-height": unref(currData).config.arrayConfig.maxHeight ? unref(currData).config.arrayConfig.maxHeight + "px" : "" },
            { "display": unref(currData).config.arrayConfig.arrangementType === "Horizontal" ? "flex" : "" },
            { "flex-wrap": "wrap" },
            { "gap": "5px" },
            { "overflow": "scroll" },
            { "padding-right": "20px" }
          ])
        }, {
          default: withCtx(({ $item, index }) => [
            (openBlock(), createBlock(_sfc_main$9, mergeProps({ class: "els-dynamic-r-array-item" }, formAttrs.value, {
              key: index,
              "parent-node": _ctx.parentNode,
              "curr-node": unref(currData),
              disabled: handleDisabledExpress(),
              modelValue: $item.value,
              "onUpdate:modelValue": ($event) => $item.value = $event,
              item: unref(currData),
              style: _ctx.item.config.advancedConfig.style,
              onValueChange: handleValueChange
            }), null, 16, ["parent-node", "curr-node", "disabled", "modelValue", "onUpdate:modelValue", "item", "style"]))
          ]),
          _: 1
        }, 8, ["modelValue", "item-class-name", "style"])
      ], 2);
    };
  }
});
const _hoisted_1$4 = {
  key: 3,
  class: "els-dynamic-r-array-container"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DynamicRenderInner",
  props: {
    nodeItem: {},
    data: {},
    depath: {},
    containerName: {},
    parentNode: {}
  },
  emits: ["update:data"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const currData = useVModel(props, "data", emits);
    const defaultLabelWidth = inject("labelWidth", void 0);
    const labelWidth = ref();
    const currDepath = ref(0);
    const itemClassName = ref("");
    const currNode = computed(() => {
      let currData2 = {};
      props.data.forEach((ele) => {
        if (ele.componentType == "Row") {
          ele.data.forEach((cele) => {
            currData2[cele.keyCode] = cele;
          });
        } else {
          currData2[ele.keyCode] = ele;
        }
      });
      return currData2;
    });
    function handleDisabledExpress(item) {
      if (item.config.baseConfig && item.config.advancedConfig.disabled) {
        let currEvent = new Function("parentNode,currNode", "return " + item.config.advancedConfig.disabled);
        return currEvent(props.parentNode, currNode.value);
      }
      return false;
    }
    function handleIfExpress(item) {
      try {
        if (item.config.advancedConfig && item.config.advancedConfig.vif) {
          let currEvent = new Function("parentNode,currNode", "return " + item.config.advancedConfig.vif);
          return currEvent(props.parentNode, currNode.value);
        }
      } catch (err) {
        console.error(err);
        debugger;
      }
      return true;
    }
    function handleValueChange(val, item) {
      if (item.config.advancedConfig && item.config.advancedConfig.eventChange) {
        let currEvent = new Function("val,parentNode,currNode", item.config.advancedConfig.eventChange);
        currEvent(val, props.parentNode, currNode.value);
      }
    }
    function getFormItemAttr(item) {
      var _a;
      const currFormConfig = lessCom$1.cloneObj(item.config.formConfig);
      if (item.dataTypeName == "None" || ((_a = item.config.baseConfig) == null ? void 0 : _a.componentName) == "ElsCaption" || item.componentType === "Row") {
        currFormConfig.labelWidth = "0px";
      } else if (item.dataTypeName == "Array" && item.arrayDataTypeName == "Object") {
        delete currFormConfig.labelWidth;
      }
      if (currFormConfig) {
        if (currFormConfig.validMethod) {
          let currEvent = new Function("parentNode,currNode", "return " + currFormConfig.validMethod);
          currFormConfig.validMethod = currEvent(props.parentNode, currNode.value);
        } else {
          delete currFormConfig.validMethod;
        }
      }
      return currFormConfig;
    }
    function handleAddItem(item) {
      return lessCom$1.cloneObj(item.arrayObjData);
    }
    if (props.depath && props.depath > 0) {
      itemClassName.value = "els-dynamic-r-item-child";
    } else {
      itemClassName.value = "els-dynamic-r-item";
    }
    watchEffect(() => {
      var _a;
      const formConfig = (_a = props.nodeItem) == null ? void 0 : _a.config.formConfig;
      if (props.nodeItem && formConfig) {
        labelWidth.value = formConfig.labelWidth ? formConfig.labelWidth : void 0;
      }
      if (!labelWidth.value && defaultLabelWidth) {
        labelWidth.value = defaultLabelWidth.value;
      }
    });
    currDepath.value += 1;
    return (_ctx, _cache) => {
      const _component_els_caption = resolveComponent("els-caption");
      const _component_els_list = resolveComponent("els-list");
      const _component_els_form_item = resolveComponent("els-form-item");
      const _component_els_form = resolveComponent("els-form");
      return openBlock(), createBlock(_component_els_form, {
        modelValue: unref(currData),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(currData) ? currData.value = $event : null),
        "label-width": labelWidth.value
      }, {
        default: withCtx(() => {
          var _a, _b, _c;
          return [
            (openBlock(), createBlock(resolveDynamicComponent(((_a = _ctx.nodeItem) == null ? void 0 : _a.componentType) == "Row" ? "ElsRow" : "div"), {
              class: normalizeClass(itemClassName.value),
              style: normalizeStyle(((_b = _ctx.nodeItem) == null ? void 0 : _b.componentType) === "Row" ? _ctx.nodeItem ? (_c = _ctx.nodeItem.config.advancedConfig) == null ? void 0 : _c.style : "" : "")
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(currData), (item, index) => {
                  var _a2;
                  return openBlock(), createBlock(resolveDynamicComponent(((_a2 = _ctx.nodeItem) == null ? void 0 : _a2.componentType) === "Row" ? "els-col" : "div"), null, {
                    default: withCtx(() => {
                      var _a3, _b2, _c2;
                      return [
                        handleIfExpress(item) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          item.componentType == "Row" ? (openBlock(), createBlock(_sfc_main$7, {
                            key: 0,
                            data: item.data,
                            parentNode: currNode.value,
                            "node-item": item,
                            depath: currDepath.value
                          }, null, 8, ["data", "parentNode", "node-item", "depath"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            ((_a3 = item.config.baseConfig) == null ? void 0 : _a3.componentName) == "ElsCaption" ? (openBlock(), createBlock(_component_els_caption, mergeProps({ key: 0 }, item.config.baseConfig, {
                              title: !item.config.baseConfig.title ? item.keyName : item.config.baseConfig.title
                            }), null, 16, ["title"])) : createCommentVNode("", true),
                            item.componentGroup === "Form" || item.dataTypeName === "Array" || item.dataTypeName == "Object" ? (openBlock(), createBlock(_component_els_form_item, mergeProps({
                              hasFormItem: false,
                              key: item.keyID
                            }, getFormItemAttr(item), {
                              class: item.dataTypeName == "Object" ? "els-dynamic-obj" : "",
                              style: ((_b2 = item.config.baseConfig) == null ? void 0 : _b2.componentName) == "ElsCaption" || item.dataTypeName == "Object" ? "margin-bottom:0 !important" : "",
                              label: ((_c2 = item.config.baseConfig) == null ? void 0 : _c2.componentName) == "ElsCaption" ? "" : item.keyName,
                              prop: `[${index}].value`
                            }), {
                              default: withCtx(() => [
                                item.dataTypeName !== "Array" && item.componentType && item.componentGroup === "Form" ? (openBlock(), createBlock(_sfc_main$9, {
                                  key: item.keyID,
                                  disabled: handleDisabledExpress(item),
                                  "parent-node": _ctx.parentNode,
                                  "curr-node": currNode.value,
                                  item,
                                  modelValue: item.value,
                                  "onUpdate:modelValue": ($event) => item.value = $event,
                                  style: normalizeStyle(item.config.advancedConfig.style),
                                  onValueChange: ($event) => handleValueChange($event, item)
                                }, null, 8, ["disabled", "parent-node", "curr-node", "item", "modelValue", "onUpdate:modelValue", "style", "onValueChange"])) : item.dataTypeName == "Object" ? (openBlock(), createBlock(_sfc_main$7, {
                                  key: 1,
                                  data: item.data,
                                  parentNode: currNode.value,
                                  "node-item": item,
                                  depath: currDepath.value
                                }, null, 8, ["data", "parentNode", "node-item", "depath"])) : item.dataTypeName == "Array" && item.arrayDataType && item.componentType ? (openBlock(), createBlock(_sfc_main$8, {
                                  key: 2,
                                  "parent-node": _ctx.parentNode,
                                  item,
                                  depath: currDepath.value
                                }, null, 8, ["parent-node", "item", "depath"])) : item.dataTypeName == "Array" && item.arrayDataTypeName == "Object" ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
                                  createVNode(_component_els_list, {
                                    labelWidth: item.config.formConfig.labelWidth,
                                    modelValue: item.data,
                                    "onUpdate:modelValue": ($event) => item.data = $event,
                                    onAdd: ($event) => handleAddItem(item),
                                    "item-class-name": "els-dynamic-r-array",
                                    hasForm: false,
                                    style: normalizeStyle(item.config.advancedConfig.style ? item.config.advancedConfig.style : [
                                      { "max-width": item.config.arrayConfig.maxWidth ? item.config.arrayConfig.maxWidth + "px" : "" },
                                      { "max-height": item.config.arrayConfig.maxHeight ? item.config.arrayConfig.maxHeight + "px" : "" },
                                      { "display": item.config.arrayConfig.arrangementType === "Horizontal" ? "flex" : "" },
                                      { "flex-wrap": "wrap" },
                                      { "gap": "5px" },
                                      { "overflow": "scroll" },
                                      { "padding-right": "20px" }
                                    ])
                                  }, {
                                    default: withCtx(({ $item }) => [
                                      createVNode(_sfc_main$7, {
                                        "parent-node": currNode.value,
                                        "node-item": item,
                                        data: $item,
                                        depath: currDepath.value
                                      }, null, 8, ["parent-node", "node-item", "data", "depath"])
                                    ]),
                                    _: 2
                                  }, 1032, ["labelWidth", "modelValue", "onUpdate:modelValue", "onAdd", "style"])
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1040, ["class", "style", "label", "prop"])) : createCommentVNode("", true),
                            item.componentGroup === "Desc" && item.componentType == "Caption" ? (openBlock(), createBlock(_component_els_caption, normalizeProps(mergeProps({ key: 2 }, item.config.baseConfig)), null, 16)) : createCommentVNode("", true)
                          ], 64))
                        ], 64)) : createCommentVNode("", true)
                      ];
                    }),
                    _: 2
                  }, 1024);
                }), 256))
              ]),
              _: 1
            }, 8, ["class", "style"]))
          ];
        }),
        _: 1
      }, 8, ["modelValue", "label-width"]);
    };
  }
});
const _hoisted_1$3 = { class: "els-dynamic-render" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsDynamicRender"
  },
  __name: "DynamicRender",
  props: {
    modelValue: {},
    config: {},
    showConfig: {},
    uploadUrl: {},
    resourceCode: {},
    restrictCode: {},
    appendUrlParams: {},
    inputWidth: {},
    nodeType: {},
    dataTypes: {},
    componentTypes: {},
    appendComponentTypes: {},
    isAsyncComponent: { type: Boolean },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: { type: Function },
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const DynamicRenderInnerAsync = defineAsyncComponent(() => {
      return import("./DynamicRenderInner-809afa99.js");
    });
    const idataTypes = inject("dataTypeData", null);
    const icomponentTypes = inject("componentData", null);
    const renderData = reactive([]);
    const valueData = ref({});
    const provideData = ref({ nodeType: props.nodeType });
    const currDynamicDataType = ref([]);
    if (idataTypes) {
      currDynamicDataType.value.push(...idataTypes);
    } else if (props.dataTypes) {
      currDynamicDataType.value.push(...props.dataTypes);
    } else {
      currDynamicDataType.value.push(...dynamicDataTypes);
    }
    const currComponentTypes = ref([]);
    if (icomponentTypes) {
      currComponentTypes.value.push(...icomponentTypes);
    } else if (props.componentTypes) {
      currComponentTypes.value.push(...props.componentTypes);
    } else {
      currComponentTypes.value.push(...dynamicComponentTypes);
    }
    if (props.appendComponentTypes) {
      currComponentTypes.value.push(...props.appendComponentTypes);
    }
    const dynamicHandler = new DynamicHandler(currDynamicDataType.value, currComponentTypes.value, props.appendUrlParams, props.uploadUrl, props.resourceCode, props.restrictCode);
    provide("componentData", currComponentTypes.value);
    provide("dyProvideData", provideData);
    provide("inputWidth", props.inputWidth);
    provide("tagID", "els-dynamic-render-" + lessCom$1.Guid32());
    provide("dataTypeData", currDynamicDataType.value);
    watch(() => props.nodeType, (val, old) => {
      if (val != old) {
        provideData.value.nodeType = val;
      }
    });
    watch(renderData, () => {
      handleReturnResult();
    }, { deep: true });
    watch(() => props.config, (val) => {
      if (val) {
        initData();
      }
    }, { deep: true, immediate: true });
    function initData() {
      if (props.modelValue) {
        if (typeof props.modelValue == "string") {
          valueData.value = JSON.parse(props.modelValue);
        } else {
          valueData.value = props.modelValue;
        }
      }
      let currData = {};
      if (typeof props.config === "string") {
        currData = JSON.parse(props.config);
      } else {
        currData = lessCom$1.cloneObj(props.config);
      }
      initShowConfig(currData, props.showConfig);
      dynamicHandler.recoverData(currData, valueData.value);
      renderData.length = 0;
      renderData.push(...currData.filter((ele) => ele.isShow == 1));
    }
    function initShowConfig(data, showConfigData) {
      if (showConfigData) {
        if (typeof showConfigData === "string") {
          showConfigData = JSON.parse(showConfigData);
        }
        showConfigData.forEach((ele) => {
          let currData = data.find((cele) => cele["keyCode"] == ele["keyCode"]);
          if (currData) {
            currData.isShow = ele.isShow;
            if (currData.dataTypeName == "Object" || currData.arrayDataTypeName == "Object") {
              initShowConfig(currData.data, ele.data);
            }
          }
        });
      } else {
        data.forEach((ele) => {
          ele.isShow = true;
          initShowConfig(ele.data, null);
        });
      }
    }
    function handleReturnResult() {
      if (props.config) {
        const currData = dynamicHandler.result(renderData);
        if (typeof props.modelValue == "object") {
          emits("update:modelValue", currData);
          return;
        }
        emits("update:modelValue", JSON.stringify(currData));
      }
    }
    return (_ctx, _cache) => {
      const _component_el_skeleton = resolveComponent("el-skeleton");
      const _component_ElsFormNode = resolveComponent("ElsFormNode");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_ElsFormNode, normalizeProps(guardReactiveProps(unref(lessCom$1).getFormNodeProps(props))), {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_1$3, [
              _ctx.isAsyncComponent ? (openBlock(), createBlock(Suspense, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(unref(DynamicRenderInnerAsync), { data: renderData }, null, 8, ["data"])
                ]),
                fallback: withCtx(() => [
                  createVNode(_component_el_skeleton, { animated: "" })
                ]),
                _: 1
              })) : (openBlock(), createBlock(_sfc_main$7, {
                key: 1,
                data: renderData
              }, null, 8, ["data"]))
            ])
          ]),
          _: 1
        }, 16)
      ]);
    };
  }
});
const DynamicRender_vue_vue_type_style_index_0_lang = "";
_sfc_main$6.install = (app) => {
  app.component(_sfc_main$6.__name, _sfc_main$6);
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsContainer"
  },
  __name: "Container",
  props: {
    selectMenuPostQuery: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { ctx } = getCurrentInstance();
    const { $codeField, $messageField, $success, $eventData } = lessCom$1.getApiConfig();
    const { $actionField, $confirmField, $confirmPasswordField, $urlField } = lessCom$1.getMenuConfig();
    const elsPageStore = ref({
      validates: [],
      queryForms: [],
      dataTables: [],
      saveForms: []
    });
    const dialogVisible = ref(false);
    const dialogUrl = ref("");
    const drawerVisible = ref(false);
    const drawerUrl = ref("");
    const elsPathId = computed(() => {
      const path = location.host + location.pathname;
      if (location.search) {
        const parms = location.search.substring(1).split("&").filter((ele) => !ele.startsWith("Signature")).sort().toString();
        return (path + parms).md5();
      }
      return path.md5();
    });
    const completeReadTableIds = ref([]);
    function validate() {
      return new Promise((resolve) => {
        Promise.all(elsPageStore.value.validates.map((ele) => ele.validate())).then((res) => {
          if (res.every((ele) => ele == true)) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
    function save(url) {
      return new Promise((resolve, reject) => {
        if (elsPageStore.value.saveForms.length) {
          validate().then((res) => {
            if (res) {
              Promise.all(elsPageStore.value.saveForms.map((ele) => ele.save(url))).then(() => {
                resolve(true);
              }).catch((error) => {
                reject(error);
              });
            } else {
              resolve(false);
            }
          });
        } else {
          resolve(true);
        }
      });
    }
    async function query(initPage = false, tableRef = "") {
      const parentRefs = ctx._.parent.refs;
      completeReadTableIds.value.length = 0;
      return new Promise(async (resolve) => {
        if (tableRef) {
          const currForm = elsPageStore.value.queryForms.find((ele) => ele.tableRef == tableRef);
          if (currForm) {
            await currForm.query().then((res) => {
              if (res) {
                const currTable = parentRefs[currForm.tableRef];
                if (currTable && (currTable.initReadData || !initPage)) {
                  completeReadTableIds.value.push(currTable.tagID);
                  parentRefs[currForm.tableRef].query(initPage, res).then(() => {
                    resolve(true);
                  });
                }
              }
            });
          } else {
            resolve(false);
          }
          return;
        }
        if (elsPageStore.value.queryForms.length) {
          const queryAsyncs = [];
          for (const ele of elsPageStore.value.queryForms.filter((ele2) => ele2.tableRef)) {
            await ele.query().then((res) => {
              if (res) {
                const currTable = parentRefs[ele.tableRef];
                if (currTable && (currTable.initReadData || !initPage)) {
                  completeReadTableIds.value.push(currTable.tagID);
                  queryAsyncs.push(parentRefs[ele.tableRef].query(initPage, res));
                }
              }
            });
          }
          const allQuery = elsPageStore.value.queryForms.filter((ele) => !ele.tableRef);
          if (allQuery.length) {
            for (const ele of allQuery) {
              await ele.query().then((res) => {
                if (res) {
                  elsPageStore.value.dataTables.filter((cele) => !completeReadTableIds.value.includes(cele.tagID) && (cele.initReadData || !initPage)).forEach((item) => {
                    completeReadTableIds.value.push(item.tagID);
                    queryAsyncs.push(item.query(initPage, res));
                  });
                }
              });
            }
          } else {
            elsPageStore.value.dataTables.filter((cele) => !completeReadTableIds.value.includes(cele.tagID) && (cele.initReadData || !initPage)).forEach((item) => {
              completeReadTableIds.value.push(item.tagID);
              queryAsyncs.push(item.query(initPage, {}));
            });
          }
          Promise.all(queryAsyncs).then(() => {
            resolve(true);
          });
        } else if (elsPageStore.value.dataTables.length) {
          const queryAsyncs = [];
          elsPageStore.value.dataTables.filter((cele) => cele.initReadData || !initPage).forEach((item) => {
            queryAsyncs.push(item.query(initPage, {}));
          });
          Promise.all(queryAsyncs).then(() => {
            resolve(true);
          });
        } else {
          resolve(true);
        }
      });
    }
    function elsSaveTable() {
      return new Promise(async (resolve) => {
        const queryAsyncs = [];
        elsPageStore.dataTables.forEach((ele) => {
          queryAsyncs.push(ele.saveTableData());
        });
        if (queryAsyncs.length) {
          Promise.all(queryAsyncs).then(() => {
            resolve(true);
          }).catch(() => {
            resolve(false);
          });
        }
      });
    }
    function elsMenuCommand(menu) {
      switch (menu[$actionField]) {
        case "Save":
          menu.IsLoading = true;
          if (menu[$confirmField] && !menu[$confirmPasswordField]) {
            menu.IsLoading = true;
            ElMessageBox.confirm(menu[$confirmField]).then((_) => {
              save(menu[$urlField]).then(() => {
                menu.IsLoading = false;
              }).catch(() => {
                menu.IsLoading = false;
              });
            }).catch(() => {
              menu.IsLoading = false;
            });
          } else if (menu[$confirmField] && menu[$confirmPasswordField]) {
            ElMessageBox.prompt(`请输入密码${menu.IsShowPassword ? `【${menu[$confirmPasswordField]}】` : ""}`, menu[$confirmField], {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              closeOnHashChange: false,
              closeOnClickModal: false,
              inputValidator: (val) => {
                return val == menu[$confirmPasswordField];
              },
              inputErrorMessage: "密码错误"
            }).then(() => {
              save(menu[$urlField]).then(() => {
                menu.IsLoading = false;
              }).catch(() => {
                menu.IsLoading = false;
              });
            }).catch(() => {
            });
          } else {
            save(menu[$urlField]).then(() => {
              menu.IsLoading = false;
            }).catch(() => {
              menu.IsLoading = false;
            });
          }
          break;
        case "Drawer":
          drawerUrl.value = menu[$urlField];
          drawerVisible.value = true;
          break;
        case "Dialog":
          dialogUrl.value = menu[$urlField];
          dialogVisible.value = true;
          break;
        case "Target":
          menu.IsLoading = true;
          if (menu.IsQueryState == 1) {
            elsPageStore.queryForms.forEach((ele) => {
              ele.cacheQueryState();
            });
          }
          window.location.href = menu[$urlField];
          break;
        case "TargetBlank":
          window.open(menu[$urlField]);
          break;
        case "Select":
          const currSelectData = {};
          elsPageStore.value.dataTables.forEach((ele) => {
            let keyData = ele.getTableSelectionWithQuery(props.selectMenuPostQuery);
            Object.assign(currSelectData, keyData);
          });
          if (menu[$confirmField] && !menu[$confirmPasswordField]) {
            menu.IsLoading = true;
            ElMessageBox.confirm(menu[$confirmField]).then((_) => {
              menu[$urlField].post(currSelectData).then((res) => {
                menu.IsLoading = false;
                if (!res) {
                  return;
                }
                elsApiResult(res);
              }).catch((err) => {
                console.log(err);
                menu.IsLoading = false;
              });
            }).catch(() => {
              menu.IsLoading = false;
            });
          } else if (menu[$confirmField] && menu[$confirmPasswordField]) {
            ElMessageBox.prompt(`请输入密码${menu.IsShowPassword ? `【${menu[$confirmPasswordField]}】` : ""}`, menu[$confirmField], {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              closeOnHashChange: false,
              closeOnClickModal: false,
              inputValidator: (val) => {
                return val == menu[$confirmPasswordField];
              },
              inputErrorMessage: "密码错误"
            }).then(() => {
              menu.IsLoading = true;
              menu[$urlField].post(currSelectData).then((res) => {
                menu.IsLoading = false;
                if (!res) {
                  return;
                }
                elsApiResult(res);
              }).catch((err) => {
                console.log(err);
                menu.IsLoading = false;
              });
            }).catch(() => {
            });
          } else {
            menu.IsLoading = true;
            menu[$urlField].post(currSelectData).then((res) => {
              menu.IsLoading = false;
              if (!res) {
                return;
              }
              elsApiResult(res);
            }).catch((err) => {
              console.log(err);
              menu.IsLoading = false;
            });
          }
          break;
        case "Export":
          if (menu[$urlField] && menu[$urlField].split("?")[0]) {
            menu.IsLoading = true;
            menu[$urlField].post((res) => {
              menu.IsLoading = false;
              if (!res) {
                return;
              }
              if (res[$codeField] == "0") {
                var currUrl = res.Data;
                if (currUrl.indexOf("txt") > -1) {
                  lessCom$1.downLoadTxt(currUrl);
                } else {
                  window.location.href = currUrl;
                }
              } else {
                ElMessage.error(res[$messageField]);
              }
            });
          } else {
            elsExportAll();
            menu.IsLoading = false;
          }
          break;
        case "Search":
          menu.IsLoading = true;
          query().then(() => {
            menu.IsLoading = false;
          }).catch(() => {
            menu.IsLoading = false;
          });
          return false;
      }
    }
    function elsApiResult(res) {
      if (!res) {
        return;
      }
      if (!res[$eventData.data] && res[$codeField] == $success) {
        ElMessage.success(res[$messageField]);
        return;
      } else if (!res[$eventData.data] && res[$codeField] != $success) {
        ElMessage.error(res[$messageField]);
        return;
      }
      res[$eventData.data].forEach((action) => {
        switch (action[$eventData.data_key]) {
          case "Alert":
            ElMessage.success({ message: action[$eventData.data_value] });
            break;
          case "TargetUrl":
            window.location.href = action[$eventData.data_value];
            break;
          case "RefreshTable":
            elsPageStore.value.dataTables.forEach((item) => {
              item.query();
            });
            break;
          case "CloseDialog":
            dialogVisible.value = false;
            break;
          case "CloseDrawer":
            drawerVisible.value = false;
            break;
        }
      });
    }
    function elsExport(tableRef) {
      const parentRefs = ctx._.parent.refs;
      const dataTable = parentRefs[tableRef];
      if (!dataTable) {
        ElMessage.error("导出的表格不存在");
        return;
      }
      dataTable.exportTable();
    }
    function elsExportHtml() {
      return new Promise((resolve) => {
        if (!elsPageStore) {
          ElMessage.warning("页面未包含在els-container中无法使用默认导出");
          resolve(false);
          return;
        }
        const dataTables = elsPageStore.value.dataTables;
        let refDatas = [];
        let headerCounts = [];
        let sheetNames = [];
        let exportPageData = [];
        dataTables.forEach((ele, index) => {
          if (ele.isExport) {
            exportPageData[index] = ele.getPageInfo();
            ele.setPageInfo({ pageSize: 1e5, pageIndex: 0 });
            ele.changePageReadData();
          }
        });
        nextTick(() => {
          dataTables.forEach((ele, index) => {
            if (ele.isExport) {
              refDatas.push(ele.table.$el);
              sheetNames.push(ele.tableName ?? "表" + index);
              headerCounts.push(ele.table.$el.querySelector(".el-table__header").querySelectorAll("tr").length);
            }
          });
          lessCom$1.exportMuti(refDatas, sheetNames, [], headerCounts, {
            font: {
              bold: true
            },
            alignment: { horizontal: "center", vertical: "center", wrap_text: true },
            fill: { bgcolor: { rgb: "F5F7FA" }, fgColor: { rgb: "F5F7FA" } }
          }, window.document.title);
        });
        nextTick(() => {
          dataTables.forEach((ele, index) => {
            if (ele.isExport) {
              ele.setPageInfo(exportPageData[index]);
              ele.changePageReadData();
            }
          });
          resolve(true);
        });
      });
    }
    function elsExportAll() {
      const exportLoading = ElLoading.service({
        lock: true,
        text: "数据导出中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        elsExportHtml().then(() => {
          exportLoading.close();
        });
      }, 300);
    }
    provide("elsSaveTable", elsSaveTable);
    provide("elsExportAll", elsExportAll);
    provide("elsExport", elsExport);
    provide("elsPathID", elsPathId);
    provide("elsPageStore", elsPageStore);
    provide("elsQuery", query);
    provide("elsMenuCommand", elsMenuCommand);
    provide("elsApiResult", elsApiResult);
    const slots = useSlots();
    let componentName = h("div");
    const isVertical = ref(false);
    if (slots.default) {
      componentName = slots.default().some((i) => {
        var _a;
        return ["ElHeader", "ElContainer", "ElAside", "ElMain", "ElFooter"].includes((_a = i.type) == null ? void 0 : _a.name);
      }) ? ElContainer : h("div");
      isVertical.value = slots.default().some((i) => {
        var _a;
        return ["ElHeader", "ElFooter"].includes((_a = i.type) == null ? void 0 : _a.name);
      });
    }
    onMounted(() => {
      query(true);
    });
    return (_ctx, _cache) => {
      const _component_els_dialog = resolveComponent("els-dialog");
      const _component_els_drawer = resolveComponent("els-drawer");
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(), createBlock(resolveDynamicComponent(unref(componentName)), {
          class: normalizeClass(["page_container", { "is-vertical": isVertical.value }])
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["class"])),
        createVNode(_component_els_dialog, {
          url: dialogUrl.value,
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogVisible.value = $event),
          "destroy-on-close": true
        }, null, 8, ["url", "modelValue"]),
        createVNode(_component_els_drawer, {
          url: drawerUrl.value,
          modelValue: drawerVisible.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => drawerVisible.value = $event),
          "destroy-on-close": true
        }, null, 8, ["url", "modelValue"])
      ], 64);
    };
  }
});
_sfc_main$c.install = (app) => {
  app.component(_sfc_main$c.__name, _sfc_main$c);
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsUEditor" },
  __name: "UEditor",
  props: {
    modelValue: {},
    height: { default: "500" },
    width: { default: "100%" },
    serverUrl: {},
    resourceCode: {},
    restrictCode: {},
    restrictFileCode: {},
    restrictImgCode: {},
    restrictMediaCode: {},
    restrictRemoteImgCode: {},
    homeUrl: {},
    showXiumi: { type: Boolean },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:html"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { $serverUrl, $homeUrl } = lessCom$1.getUEditorConfig();
    const setModelValue = inject("setModelValue", () => null);
    const getModelValue = inject("getModelValue", () => null);
    const editorContent = ref();
    const currServerUrl = ref(props.serverUrl ?? $serverUrl);
    if (currServerUrl.value) {
      currServerUrl.value = currServerUrl.value.addUrlParameter("ResourceCode", props.resourceCode).addUrlParameter("RestrictImgCode", props.restrictImgCode).addUrlParameter("RestrictFileCode", props.restrictFileCode).addUrlParameter("RestrictMediaCode", props.restrictMediaCode).addUrlParameter("RestrictRemoteImgCode", props.restrictRemoteImgCode);
    }
    const configData = {
      serverUrl: currServerUrl.value,
      initialFrameWidth: props.width,
      initialFrameHeight: props.height,
      UEDITOR_HOME_URL: props.homeUrl ?? $homeUrl
    };
    function addXiumiDialog(editorId) {
      if (props.showXiumi) {
        window["UE"].registerUI(
          "xiumi-dialog",
          (editor, uiName) => {
            const dialog = new window["UE"].ui.Dialog({
              // 注意：这是 xiumi-ue-dialog-v5.html 文件的访问链接，这个页面会通过 iframe 的方式嵌入到弹窗里
              iframeUrl: props.homeUrl + "xiumi/xiumi-ue-dialog-v5.html",
              editor,
              name: uiName,
              title: "秀米图文消息助手",
              cssRules: "width: " + (window.innerWidth - 60) + "px; height: " + (window.innerHeight - 60) + "px;"
            });
            const btn = new window["UE"].ui.Button({
              name: "xiumi-connect",
              title: "秀米",
              cssRules: `background-image: url('//dl.xiumi.us/connect/ue/xiumi-connect-icon.png') !important; background-size: contain;`,
              onclick() {
                dialog.render();
                dialog.open();
              }
            });
            return btn;
          },
          0,
          editorId
          /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
        );
      }
    }
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    function handleReturnResult(val) {
      emits("update:modelValue", val);
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, val, props.aIndex);
      }
    }
    watch(editorContent, (val) => {
      handleReturnResult(val);
    });
    onMounted(() => {
      if (props.modelValue) {
        editorContent.value = initModelValue();
      }
    });
    return (_ctx, _cache) => {
      const _component_vue_ueditor_wrap = resolveComponent("vue-ueditor-wrap");
      return openBlock(), createBlock(_component_vue_ueditor_wrap, {
        modelValue: editorContent.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editorContent.value = $event),
        onBeforeInit: addXiumiDialog,
        config: configData
      }, null, 8, ["modelValue"]);
    };
  }
});
_sfc_main$4.install = (app) => {
  app.component(_sfc_main$4.__name, _sfc_main$4);
};
const _hoisted_1$2 = { class: "convertImage" };
const _hoisted_2 = { class: "content" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsAceEditor" },
  __name: "AceEditor",
  props: {
    modelValue: {},
    height: { default: "300" },
    width: { default: "100%" },
    theme: {},
    readonly: { type: Boolean },
    language: {},
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "formatter"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const setModelValue = inject("setModelValue", () => null);
    const getModelValue = inject("getModelValue", () => null);
    const editorValue = ref();
    const tagID = "els-ace-" + lessCom$1.Guid32();
    const editor = ref();
    watch(() => props.modelValue, (val) => {
      if (val != editorValue.value) {
        editor.value.setValue(val);
      }
    });
    function handleReturnResult(val) {
      emits("update:modelValue", val);
      if (props.modelValue === void 0 && setModelValue && props.prop !== void 0) {
        setModelValue(props.prop, val, props.aIndex);
      }
    }
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    onMounted(() => {
      if (props.language === "json") {
        const currModule = import("./mode-json-2bcb8c2a.js").then((n) => n.m);
        currModule.then((res) => {
          ace.config.setModuleUrl("ace/mode/json", res);
        });
      } else if (props.language === "javascript") {
        const currModule = import("./mode-javascript-9ce3a2c2.js").then((n) => n.m);
        currModule.then((res) => {
          ace.config.setModuleUrl("ace/mode/javascript", res);
        });
      } else if (props.language === "csharp") {
        const currModule = import("./mode-csharp-918d6b6c.js").then((n) => n.m);
        currModule.then((res) => {
          ace.config.setModuleUrl("ace/mode/csharp", res);
        });
      } else if (props.language === "mysql") {
        const currModule = import("./mode-mysql-a6065d0a.js").then((n) => n.m);
        currModule.then((res) => {
          ace.config.setModuleUrl("ace/mode/mysql", res);
        });
      } else if (props.language === "css") {
        const currModule = import("./mode-css-4dc29fac.js").then((n) => n.m);
        currModule.then((res) => {
          ace.config.setModuleUrl("ace/mode/css", res);
        });
      }
      let options = {
        theme: "ace/theme/" + (props.theme ? props.theme : "xcode"),
        mode: "ace/mode/" + (props.language ? props.language : "javascript"),
        tabSize: 2,
        maxLines: 25,
        minLines: 25,
        showPrintMargin: false,
        fontSize: 14,
        readOnly: props.readonly ? props.readonly : false,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true
      };
      editor.value = ace.edit(tagID, options);
      editor.value.getSession().setUseWrapMode(true);
      editor.value.commands.addCommand({
        name: "formatter",
        bindKey: { win: "Ctrl-Shift-F", mac: "Command-Shift-F" },
        exec: () => {
          emits("formatter", editor.value);
        }
      });
      const currValue = initModelValue();
      if (currValue) {
        editor.value.setValue(currValue);
      }
      editor.value.getSession().on("change", function() {
        editorValue.value = editor.value.getValue();
        handleReturnResult(editorValue.value);
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", {
            id: tagID,
            style: normalizeStyle([{ "width": _ctx.width }, { "height": _ctx.height }]),
            ref: "editorContainer"
          }, null, 4)
        ])
      ]);
    };
  }
});
_sfc_main$3.install = (app) => {
  app.component(_sfc_main$3.__name, _sfc_main$3);
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{ name: "ElsMdEditor" },
  __name: "ElsMdEditor",
  props: {
    modelValue: {},
    height: { default: "500" },
    width: { default: "100%" },
    url: {},
    resourceCode: {},
    restrictCode: {},
    fileTypes: { default: "jpeg,gif,bmp,jpg,png,svga,svg,webp,bundle,tif,pag" },
    prop: {},
    label: {},
    hasFormItem: { type: Boolean },
    span: {},
    aIndex: {},
    tip: {},
    tipPosition: {},
    suffixContent: {},
    required: { type: Boolean },
    requiredMessage: {},
    validType: {},
    validExpression: {},
    validMessage: {},
    validMethod: {},
    validTrigger: {},
    queryField: {},
    queryMethod: {},
    queryDataType: {},
    queryDefaultValue: {},
    queryAutoReadData: { type: Boolean },
    queryAroundComma: { type: Boolean },
    queryRange: { type: Boolean },
    queryRangeOrEqual: { type: Boolean }
  },
  emits: ["update:modelValue", "update:html"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { $uploadUrl } = lessCom$1.getUploadConfig();
    const setModelValue = inject("setModelValue", () => null);
    const getModelValue = inject("getModelValue", () => null);
    const htmlContent = ref();
    const markDownContent = ref();
    const uploadUrl = ref($uploadUrl);
    if (props.url) {
      uploadUrl.value = props.url;
    }
    if (props.resourceCode) {
      uploadUrl.value = uploadUrl.value.addUrlParameter("ResourceCode", props.resourceCode);
    }
    if (props.restrictCode) {
      uploadUrl.value = uploadUrl.value.addUrlParameter("RestrictCode", props.restrictCode);
    }
    function returnHtml(res) {
      htmlContent.value = res;
      emits("update:html", htmlContent.value);
    }
    function handleReturnResult(val) {
      emits("update:modelValue", val);
      if (props.modelValue === void 0 && setModelValue && props.prop) {
        setModelValue(props.prop, val, props.aIndex);
      }
    }
    watch(markDownContent, (val) => {
      handleReturnResult(val);
    });
    function initModelValue() {
      if (props.modelValue === void 0 && getModelValue && props.prop) {
        return getModelValue(props.prop, props.aIndex);
      }
      return props.modelValue;
    }
    onMounted(() => {
      if (props.modelValue) {
        markDownContent.value = initModelValue();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MdEditor), {
        modelValue: markDownContent.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => markDownContent.value = $event),
        onHtmlChanged: returnHtml
      }, null, 8, ["modelValue"]);
    };
  }
});
_sfc_main$2.install = (app) => {
  app.component(_sfc_main$2.__name, _sfc_main$2);
};
const _hoisted_1$1 = { class: "json-viewer" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsJsonViewer",
    inheritAttrs: false
  },
  __name: "JsonViewer",
  props: {
    data: {}
  },
  setup(__props) {
    const props = __props;
    const attrs = useAttrs();
    const currData = ref();
    const visible = ref(true);
    watch(() => props.data, (val) => {
      visible.value = false;
      if (val) {
        if (typeof val === "object") {
          currData.value = val;
        } else {
          currData.value = JSON.parse(val);
        }
      }
      nextTick(() => {
        visible.value = true;
      });
    }, { immediate: true, deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        currData.value && visible.value ? (openBlock(), createBlock(unref(VueJsonViewer), mergeProps({
          key: 0,
          value: currData.value,
          copyable: ""
        }, unref(attrs)), null, 16, ["value"])) : createCommentVNode("", true)
      ]);
    };
  }
});
_sfc_main$1.install = (app) => {
  app.component(_sfc_main$1.__name, _sfc_main$1);
};
const _hoisted_1 = { class: "els-jsoneditor" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ElsJsonEditor",
    inheritAttrs: false
  },
  __name: "JsonEditor",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const attrs = useAttrs();
    const currData = ref({});
    watch(() => props.modelValue, (val) => {
      if (val) {
        if (typeof val === "object") {
          currData.value = val;
        } else {
          currData.value = JSON.parse(val);
        }
      }
    }, { immediate: true, deep: true });
    watch(currData, (val) => {
      if (typeof props.modelValue === "object") {
        emits("update:modelValue", val);
        return;
      }
      emits("update:modelValue", JSON.stringify(val));
    }, { deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(unref(JsonEditorVue), mergeProps({
          modelValue: currData.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currData.value = $event)
        }, unref(attrs), { mode: "text" }), null, 16, ["modelValue"])
      ]);
    };
  }
});
const JsonEditor_vue_vue_type_style_index_0_lang = "";
_sfc_main.install = (app) => {
  app.component(_sfc_main.__name, _sfc_main);
};
const components = [
  _sfc_main$1b,
  Select,
  ElsRadio,
  _sfc_main$12,
  ElsCheckbox,
  _sfc_main$13,
  _sfc_main$17,
  OptionGroup,
  _sfc_main$11,
  _sfc_main$10,
  _sfc_main$$,
  FormQuery,
  _sfc_main$Z,
  _sfc_main$X,
  _sfc_main$Y,
  _sfc_main$W,
  _sfc_main$V,
  _sfc_main$U,
  _sfc_main$T,
  _sfc_main$S,
  _sfc_main$R,
  _sfc_main$Q,
  _sfc_main$P,
  _sfc_main$I,
  _sfc_main$H,
  _sfc_main$M,
  _sfc_main$L,
  _sfc_main$K,
  _sfc_main$G,
  _sfc_main$F,
  _sfc_main$E,
  _sfc_main$t,
  _sfc_main$D,
  _sfc_main$x,
  _sfc_main$w,
  _sfc_main$v,
  _sfc_main$u,
  _sfc_main$y,
  Tree,
  TreeSelect,
  _sfc_main$19,
  _sfc_main$1a,
  _sfc_main$C,
  _sfc_main$B,
  _sfc_main$A,
  _sfc_main$J,
  _sfc_main$a,
  MenuContext,
  MenuDropdown,
  DataModal,
  _sfc_main$q,
  _sfc_main$k,
  _sfc_main$l,
  _sfc_main$m,
  _sfc_main$j,
  Tip,
  _sfc_main$5,
  Caption,
  _sfc_main$h,
  _sfc_main$p,
  _sfc_main$4,
  _sfc_main$6,
  _sfc_main$z,
  _sfc_main$1,
  _sfc_main$2,
  _sfc_main$3,
  _sfc_main$c,
  _sfc_main
];
const ElementLess = {
  install(app) {
    components.forEach((item) => {
      app.component(item.name, item);
    });
  }
};
components.forEach((item) => {
  ElementLess[item.name] = item;
});
export {
  ElementLess as E,
  _sfc_main$7 as _,
  property_array as a,
  property_form as b,
  property_advanced as c,
  _sfc_main$g as d,
  lessCom$1 as l,
  property_arrayAndObject as p
};
