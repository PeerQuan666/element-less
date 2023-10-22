
import pkg from 'file-saver'
import * as XLSX from 'xlsx'
import './lessPrototype.js'
const { saveAs } = pkg;
function _toConsumableArray(e) {
	if (Array.isArray(e)) {
		for (var r = 0,
			t = Array(e.length); r < e.length; r++) t[r] = e[r];
		return t
	}
	return Array.from(e)
}
function generateArray(e) {
	var exportTr = e.querySelectorAll("tr");
	if (e.getElementsByClassName("els_stat_export_tr").length > 0) {
		exportTr = e.getElementsByClassName("els_stat_export_tr");
	} else if (e.getElementsByClassName("el-table__body-wrapper").length > 0) {
		exportTr = e.getElementsByClassName("el-table__header-wrapper")[0].querySelectorAll("tr");
		exportTr = Array.from(exportTr).concat(Array.from(e.getElementsByClassName("el-table__body-wrapper")[0].querySelectorAll("tr")));
	}

	for (var r:any = [], t = exportTr, n:any = [], o = 0; o < t.length; ++o) {
		for (var a:any = [], s = t[o], l = s.getElementsByClassName("els-isexport"), c = 0; c < l.length; ++c) {
			var h = l[c],
				i = (h.getAttribute("colspan") ? h.getAttribute("colspan")?.toInt() : 0),
				u = (h.getAttribute("rowspan") ? h.getAttribute("rowspan")?.toInt() : 0),
				f = h.innerText ? h.innerText.trim() : "";
			if (h.getElementsByClassName("isexport").length > 0) {
				f = h.getElementsByClassName("isexport")[0].textContent ? h.getElementsByClassName("isexport")[0].textContent : f;
			}
			if ("" !== f && f === +f && (f = +f), n.forEach(function (e:any) {
				if (o >= e.s.r && o <= e.e.r && a.length >= e.s.c && a.length <= e.e.c) for (var r = 0; r <= e.e.c - e.s.c; ++r) a.push(null)
			}), (u || i) && (u = u || 1, i = i || 1, n.push({
				s: {
					r: o,
					c: a.length
				},
				e: {
					r: o + u - 1,
					c: a.length + i - 1
				}
			})), a.push("" !== f ? f : null), i) for (var g = 0; g < i - 1; ++g) a.push(null)
		}
		r.push(a)
	}
	return [r, n]
}
function datenum(e, r=0) {
	return r && (e += 1462),
		(Date.parse(e) - Date.parse('1899-11-30')) / 864e5
}
function sheet_from_array_of_arrays(e) {
	for (var t = {},
		n = {
			s: {
				c: 1e7,
				r: 1e7
			},
			e: {
				c: 0,
				r: 0
			}
		},
		o = 0; o != e.length; ++o) for (var a = 0; a != e[o].length; ++a) {
			n.s.r > o && (n.s.r = o),
				n.s.c > a && (n.s.c = a),
				n.e.r < o && (n.e.r = o),
				n.e.c < a && (n.e.c = a);
			var s:any = {
				v: e[o][a]
			};
			if (null != s.v) {
				var l = XLSX.utils.encode_cell({
					c: a,
					r: o
				});

				if (typeof (s.v) === 'string' && /^-*[\d,]+\d*\.*\d*%*$/.test(s.v) && s.v.length<13) {
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
	return n.s.c < 1e7 && (t["!ref"] = XLSX.utils.encode_range(n)),
		t
}
class Workbook {
	SheetNames: any;
	Sheets: any;
  
	constructor(sheetNames=[], sheets={}) {
	  this.SheetNames = sheetNames;
	  this.Sheets = sheets;
	}
  }

function s2ab(e) {
	for (var r = new ArrayBuffer(e.length), t = new Uint8Array(r), n = 0; n != e.length; ++n) t[n] = 255 & e.charCodeAt(n);
	return r
}


export function exportTableToExcel(e, cellStyles:any = [], headerRowCount = 0, headerCellStyle = {}) {
	var r = document.getElementById(e),
		t = generateArray(r),
		n = t[1],
		o = t[0],
		a = new Workbook,
		s = sheet_from_array_of_arrays(o);
	s["!merges"] = n;
	for (let item of cellStyles) {
		s[item.cell].s = item.style
	}
	if (headerRowCount > 0) {
		Object.keys(s).map(ele => { if (ele.replace(/[^0-9]/ig, "") && parseInt(ele.replace(/[^0-9]/ig, "")) <= headerRowCount) { return ele } }).filter(ele => ele).forEach(ele => {
			if(ele){
				s[ele].s = headerCellStyle
			}
		})
	}
	a.SheetNames.push("Sheet1");
	a.Sheets.Sheet1 = s;

	var l = XLSX.write(a, {
		bookType: "xlsx",
		bookSST: !1,
		type: "binary"
	});
	saveAs(new Blob([s2ab(l)], {
		type: "application/octet-stream"
	}), "test.xlsx")
}

export function exportTableToExcelEl(e, cellStyles:any = [], headerRowCount = 0, headerCellStyle = {}, filename = "") {
	var r = e,
		t = generateArray(r),
		n = t[1],
		o = t[0],
		a = new Workbook,
		s = sheet_from_array_of_arrays(o);
	s["!merges"] = n;
	if (cellStyles.length > 0) {
		for (let item of cellStyles) {
			s[item.cell].s = item.style
		}
	}
	if (headerRowCount > 0) {
		Object.keys(s).map(ele => { if (ele.replace(/[^0-9]/ig, "")  && parseInt(ele.replace(/[^0-9]/ig, "")) <= headerRowCount) { return ele } }).filter(ele => ele).forEach(ele => {
			if(ele){
				s[ele].s = headerCellStyle
			}
		})
	}
	a.SheetNames.push("Sheet1");
	a.Sheets.Sheet1 = s;

	var l = XLSX.write(a, {
		bookType: "xlsx",
		bookSST: !1,
		type: "binary"
	});
	if (!filename) {
		if (window.document.title) {
			filename = window.document.title + "_" + new Date().getTime();
		} else {
			filename = "数据文件" + new Date().getTime();
		}
	}
	saveAs(new Blob([s2ab(l)], {
		type: "application/octet-stream"
	}), filename + ".xlsx")
}

export function exportTableToExcelElMuti(es, sheetNames, cellStyles:any = [], headerRowCounts:any = [1], headerCellStyle = {}, filename = "") {
	var a = new Workbook;
	for (var i = 0; i < es.length; i++) {
		var e = es[i];
		var r = e,
			t = generateArray(r),
			n = t[1],
			o = t[0],
			s = sheet_from_array_of_arrays(o);
		s["!merges"] = n;
		if (cellStyles.length > 0) {
			for (let item of cellStyles) {
				s[item.cell].s = item.style
			}
		}
		if (headerRowCounts[i] > 0) {
			Object.keys(s).map(ele => { if (ele.replace(/[^0-9]/ig, "") &&parseInt(ele.replace(/[^0-9]/ig, "")) <= headerRowCounts[i]) { return ele } }).filter(ele => ele).forEach(ele => {
				if(ele){
					s[ele].s = headerCellStyle
				}
			})
		}
		a.SheetNames.push(sheetNames[i]);
		a.Sheets[sheetNames[i]] = s;
	}

	var l = XLSX.write(a, {
		bookType: "xlsx",
		bookSST: !1,
		type: "binary"
	});
	if (!filename) {
		if (window.document.title) {
			filename = window.document.title+"_" + new Date().getTime();
		} else {
			filename = "数据文件" + new Date().getTime();
		}
		
	}
	saveAs(new Blob([s2ab(l)], {
		type: "application/octet-stream"
	}), filename + ".xlsx")
}


export function exportJsonToExcelMuti(data, filename) {
	if (data.length === 0) {
		return;
	}
	var g = new Workbook;
	data.forEach(ele => {
		var e = ele,
			r = e.multiHeader,
			t = void 0 === r ? [] : r,
			n = e.header,
			o = e.data,
			a = e.name,
			s = e.merges,
			l = void 0 === s ? [] : s,
			c = e.autoWidth,
			h = void 0 === c || c;
		o = [..._toConsumableArray(o)],
			o.unshift(n);
		for (var f = t.length - 1; f > -1; f--) o.unshift(t[f]);
		var v = sheet_from_array_of_arrays(o);
		if (l.length > 0 && (v["!merges"] || (v["!merges"] = []), l.forEach(function (e) {
			v["!merges"].push(XLSX.utils.decode_range(e))
		})), h) {
			for (var S = o.map(function (e) {
				return e.map(function (e) {
					return null == e ? {
						wch: 10
					} : e.toString().charCodeAt(0) > 255 ? {
						wch: 2 * e.toString().length
					} : {
								wch: e.toString().length
							}
				})
			}), y = S[0], p = 1; p < S.length; p++) for (var b = 0; b < S[p].length; b++) y[b].wch < S[p][b].wch && (y[b].wch = S[p][b].wch);
			v["!cols"] = y
		}
		g.SheetNames.push(a),
			g.Sheets[a] = v;
	})

	var m = XLSX.write(g, {
		bookType: 'xlsx',
		bookSST: !1,
		type: "binary"
	});
	if (!filename) {
		if (window.document.title) {
			filename = window.document.title + "_" + new Date().getTime();
		} else {
			filename = "数据文件" + new Date().getTime();
		}
	}
	saveAs(new Blob([s2ab(m)], {
		type: "application/octet-stream"
	}), filename + ".xlsx")
}

export function exportJsonToExcel(data) {
	var e = data.length > 0 && void 0 !== data[0] ? data[0] : {},
		r = e.multiHeader,
		t = void 0 === r ? [] : r,
		n = e.header,
		o = e.data,
		a = e.filename,
		s = e.merges,
		l = void 0 === s ? [] : s,
		c = e.autoWidth,
		h = void 0 === c || c,
		i = e.bookType,
		u = void 0 === i ? "xlsx" : i;
	a = a || "excel-list",
		o = [..._toConsumableArray(o)],
		o.unshift(n);
	for (var f = t.length - 1; f > -1; f--) o.unshift(t[f]);
	var g = new Workbook,
		v = sheet_from_array_of_arrays(o);
	if (l.length > 0 && (v["!merges"] || (v["!merges"] = []), l.forEach(function (e) {
		v["!merges"].push(XLSX.utils.decode_range(e))
	})), h) {
		for (var S = o.map(function (e) {
			return e.map(function (e) {
				return null == e ? {
					wch: 10
				} : e.toString().charCodeAt(0) > 255 ? {
					wch: 2 * e.toString().length
				} : {
							wch: e.toString().length
						}
			})
		}), y = S[0], p = 1; p < S.length; p++) for (var b = 0; b < S[p].length; b++) y[b].wch < S[p][b].wch && (y[b].wch = S[p][b].wch);
		v["!cols"] = y
	}
	g.SheetNames.push("SheetJS"),
		g.Sheets.SheetJS = v;
	var m = XLSX.write(g, {
		bookType: u,
		bookSST: !1,
		type: "binary"
	});
	saveAs(new Blob([s2ab(m)], {
		type: "application/octet-stream"
	}), a + "." + u)
}