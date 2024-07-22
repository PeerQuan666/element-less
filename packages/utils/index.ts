
import axios from 'axios'
import { getCurrentInstance} from 'vue'
import { exportJsonToExcel, exportTableToExcelEl, exportTableToExcelElMuti } from '../export/Export2Excel.js'
import { ElMessage } from 'element-plus'
import useClipboard from "vue-clipboard3";
import shortid from 'shortid'
const { toClipboard } = useClipboard()

export * from './message'
export * from './types'
export default {
    jsonFormatter(obj: string | undefined){
        if(!obj){return ''}
        return JSON.stringify(obj, null, "  ")
    },
    isDef(val:any){
        return val !== undefined && val !== null;
    },
    getApiConfig(){
        const { proxy } = getCurrentInstance() as any
        if(!proxy||!proxy.$lessConfig){
            return {}
        }
        return {
            $codeField : proxy.$lessConfig.api['code'],
            $messageField : proxy.$lessConfig.api['message'],
            $dataField : proxy.$lessConfig.api['data'],
            $eventData: proxy.$lessConfig.api['eventData'],
            $success:proxy.$lessConfig.api['successCode']
        }
    },
    getMenuConfig(){
        const { proxy } = getCurrentInstance() as any
        if(!proxy||!proxy.$lessConfig){
            return {}
        }
        return{
            $idField : proxy.$lessConfig.menu['id'],
            $actionField : proxy.$lessConfig.menu['action'],
            $nameField : proxy.$lessConfig.menu['name'],
            $actionNameField : proxy.$lessConfig.menu['actionName'],
            $areaField : proxy.$lessConfig.menu['areaName'],
            $controllerField : proxy.$lessConfig.menu['controllerName'],
            $iconField : proxy.$lessConfig.menu['icon'],
            $urlField : proxy.$lessConfig.menu['url'],
            $buttonColorField : proxy.$lessConfig.menu['buttonColor'],
            $buttonTypeField : proxy.$lessConfig.menu['buttonType'],
            $groupField:proxy.$lessConfig.menu['group'],
            $confirmField : proxy.$lessConfig.menu['confirmField'],
            $confirmPasswordField : proxy.$lessConfig.menu['confirmPasswordField'],

        }
    },
    getTableConfig(){
        const { proxy } = getCurrentInstance() as any
        if(!proxy||!proxy.$lessConfig){
            return {}
        }
        return {
            $menuField:proxy.$lessConfig.table['menu'],
            $avgDayField : proxy.$lessConfig.table['avgDay'],
            $pageDataField : proxy.$lessConfig.table.page['data'],
            $pageSizeField : proxy.$lessConfig.table.page['pageSize'],
            $currentPageField : proxy.$lessConfig.table.page['currentPage'],
            $totalField : proxy.$lessConfig.table.page['total'],
            $pageCountField : proxy.$lessConfig.table.page['pageCount']

        }
    },
    getUEditorConfig(){
        const { proxy } = getCurrentInstance() as any
        if(!proxy||!proxy.$lessConfig){
            return {}
        }
        return {
            $serverUrl:proxy.$lessConfig.uEditor['serverUrl'],
            $homeUrl:proxy.$lessConfig.uEditor['homeUrl'],
        }
    },
    getWangEditorConfig(){
        const { proxy } = getCurrentInstance() as any
        if(!proxy||!proxy.$lessConfig){
            return {}
        }
        return {
            $serverUrl:proxy.$lessConfig.wangEditor['serverUrl'],
        }
    },
    getUploadConfig(){
        const { proxy } = getCurrentInstance() as any
        if(!proxy||!proxy.$lessConfig){
            return {}
        }
        return {
            $uploadUrl:proxy.$lessConfig.upload['url'],
            $dataField: proxy.$lessConfig.upload['data'],
            $pathField : proxy.$lessConfig.upload['data_path'],
            $md5Field : proxy.$lessConfig.upload['data_md5']
        }
    },
    getCompareClass(val: string) {
        if (!val || val === '-') { return ''; }
        if (parseFloat(val) < 0) {
            return 'txt-color-green';
        }
        return 'txt-color-red';

    },
    getAvgDayResult(val: number, fixed = 2, dayCount = 1) {
        if (val) {
            return (val / dayCount).toFixed(fixed)
        }
        return "-";
    },
    getUrlParms(paramName: string) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == paramName) { return pair[1]; }
        }
        return "";
    },
    setDefaultPropertys(basePropertys:Record<string,any>,defaultPropertys:Record<string,any>){
        for(const key in  defaultPropertys){
            if(!this.isDef(basePropertys[key])||basePropertys[key]===''){
                basePropertys[key]=defaultPropertys[key]
            }
            else  if(typeof(defaultPropertys[key])==='object'){
                this.setDefaultPropertys(basePropertys[key],defaultPropertys[key])
            }
        }
    },
    removeEmptyProp(obj:any){
        for (const key in obj) {
            if (key) {
                if (obj[key] === undefined || obj[key] === '') {
                    delete obj[key]
                }
            }
        }
    },
    formatDate(date: string | number | Date, fmt: string) {
        if(typeof(date)==='string'||typeof(date)==='number'){
            date = new Date(date);
        }
      
        let ret: (string | any[])[] | null;
        const opt = {
            "Y+": date.getFullYear().toString(),
            "y+": date.getFullYear().toString(),         // 年
            "M+": (date.getMonth() + 1).toString(),     // 月
            "m+": date.getMinutes().toString(),         // 分
            "D+": date.getDate().toString(),            // 日
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "h+": date.getHours().toString(),
            "S+": date.getSeconds().toString(),          // 秒
            "s+": date.getSeconds().toString()          // 秒
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1].toString(), (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    },
    parseTime(time: string | number | Date, cFormat = '') {
        if (arguments.length === 0) {
            return null;
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
        let date: Date;
        if (typeof time == 'object') {
            date = time;
        } else {
            if (('' + time).length === 10) time = parseInt(time.toString()) * 1000;
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
            if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
            if (result.length > 0 && value < 10) {
                value = '0' + value;
            }
            return value || 0;
        });
        return time_str;
    },
    exportMuti(es: any, sheetNames: any, cellStyles: any = [], headerRowCounts: any = [1], headerCellStyle = {}, filename = "") {
        exportTableToExcelElMuti(es, sheetNames, cellStyles, headerRowCounts, headerCellStyle, filename)
    },

    exportTable(el: any, cellStyles = [], headerRowCount = 0, headerCellStyle = {}, filename = "") {
        exportTableToExcelEl(el, cellStyles, headerRowCount, headerCellStyle, filename)
    },
    exportJSON(data: any) {
        exportJsonToExcel(data)
    },
    getObjectKey(obj: Record<string, any>, fields: string, separator = '$') {
        let currValue: any = [];
        fields.split(',').forEach((ele: string | number) => {
            currValue.push(obj[ele])
        })
        return currValue.join(separator)
    },
    sumArray(arr: any[],fixed:number=2) {
        if (arr.length) {
            let currArr = arr.filter((ele: string) => this.isNumber(ele))
            if (currArr.length) {
                let sum = currArr.map((ele: string) => parseFloat(ele)).reduce(function (prev: number, curr: number) {
                    if (!prev) { prev = 0; }
                    if (!curr) { curr = 0; }
                    return prev + curr;
                });
                return parseFloat(sum.toFixed(2))
            }
            return 0;

        }
        return 0;

    },
    pageArray(arr: string | any[], pageIndex: number, pageSize: number) {
        var skipNum = pageIndex * pageSize;
        var newArr = (skipNum + pageSize >= arr.length) ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
        return newArr;
    },
    removeArrayItem(list: any[], item:any ) {
        let index = list.indexOf(item)
        if (index > -1) {
            list.splice(index, 1)
        }
    },
    orderBy(data: any[], fieldName: string) {
        const cthis=this
        if (data) {
            data.sort(function (obj1: { [x: string]: any; }, obj2: { [x: string]: any; }) {
                var val1 = !obj1[fieldName] ? 0 : obj1[fieldName];
                var val2 = !obj2[fieldName] ? 0 : obj2[fieldName];
                if (cthis.isNumber(val1) && cthis.isNumber(val2)) {
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
            })
        }

    },
    orderByDescending(data: any[], fieldName: string | number) {
        const cthis=this
        if (data) {
            data.sort(function (obj1: { [x: string]: any; }, obj2: { [x: string]: any; }) {
                var val1 = !obj2[fieldName] ? 0 : obj2[fieldName];
                var val2 = !obj1[fieldName] ? 0 : obj1[fieldName];
                if (cthis.isNumber(val1) && cthis.isNumber(val2)) {
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
            })
        }

    },
    randomNumber(len=100000){
        return parseInt((Math.random()*len).toString())
    },
    md5(val:string){
        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }
        function F(x, y, z) {
            return (x & y) | ((~x) & z);
        }
        function G(x, y, z) {
            return (x & z) | (y & (~z));
        }
        function H(x, y, z) {
            return (x ^ y ^ z);
        }
        function I(x, y, z) {
            return (y ^ (x | (~z)));
        }
        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }
        function ConvertToWordArray(sMessage) {
            var lWordCount;
            var lMessageLength = sMessage.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }
        function WordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        }
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        // Steps 1 and 2. Append padding bits and length and convert to words
        x = ConvertToWordArray(val);
        // Step 3. Initialise
        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
        // Step 4. Process the message in 16-word blocks
        for (k = 0; k < x.length; k += 16) {
            AA = a; BB = b; CC = c; DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA); b = AddUnsigned(b, BB); c = AddUnsigned(c, CC); d = AddUnsigned(d, DD);
        }
        // Step 5. Output the 128 bit digest
        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
        return temp.toLowerCase(); 
    },
    getQueryParameters(queryData: { [x: string]: any; }) {
        if (!queryData) {
            return {}
        }
        let queryParms = {};
        for (let key in queryData) {
            var item = queryData[key];
            if (item.QueryParameterType == 'NoPost') { continue; }
            if (key == "PageSize" || key == "PageIndex") {
                queryParms["Query_" + key] = item.Value
            }
            else if (item.QueryParameterType == 'Sort') {
                var parameterName = key.startsWith("Sort_") ? key : "Sort_" + key;
                var fieldName = item.QueryFieldName;
                var sortRank = item.Value;
                if (sortRank) {
                    var signatureMD5 = this.md5(fieldName + '_' + sortRank);
                    queryParms[parameterName] = fieldName + "$" + sortRank + "$" + signatureMD5;
                }
            }
            else {
              
                if (item.QueryParameterType !== undefined && item.QueryParameterType !== 'NoQuery' && item.QueryMethod !== 'NoAuto') {
                    if (item.IsRange || item.isRangeOrEqual) {
                        let fieldName = item.QueryFieldName;
                        let startQueryMethod = item.IsRangeOrEqual ? 'GreaterThanOrEqual' : 'GreaterThan';
                        let queryDataType = item.QueryDataType;
                        let startSignatureMD5 = this.md5(fieldName + '_' + startQueryMethod + '_' + queryDataType);
                        let startFieldValue = item.Value.split(',')[0];
                        if (startFieldValue || typeof (startFieldValue) == "number") {
                            queryParms["Query_Start_" + key] = fieldName + "$" + startQueryMethod + "$" + queryDataType + "$" + startSignatureMD5 + "$" + encodeURIComponent(startFieldValue);
                        }
                        let endQueryMethod = item.IsRangeOrEqual ? 'LessThanOrEqual' :'LessThan'
                        let endSignatureMD5 = this.md5(fieldName + '_' + startQueryMethod + '_' + queryDataType);
                        let endFieldValue = item.Value.split(',')[1];
                        if (endFieldValue || typeof (endFieldValue) == "number") {
                            queryParms["Query_End_" + key] = fieldName + "$" + endQueryMethod + "$" + queryDataType + "$" + endSignatureMD5 + "$" + encodeURIComponent(endFieldValue);
                        }
                    } else {
                        let parameterName = "Query_" + key;
                        let fieldName = item.QueryFieldName;
                        let queryMethod = item.QueryMethod;
                        let queryDataType = item.QueryDataType;
                        let signatureMD5 = this.md5(fieldName + '_' + queryMethod + '_' + queryDataType);
                        let fieldValue = item.Value;
                        if (item.IsAroundComma === true && fieldValue && !fieldValue.startsWith(',')) {
                            fieldValue = `,${fieldValue},`
                        }
                        if (fieldValue || typeof (fieldValue) == "number") {
                            queryParms[parameterName] = fieldName + "$" + queryMethod + "$" + queryDataType + "$" + signatureMD5 + "$" + encodeURIComponent(fieldValue);
                        }
                    }
                }
                else {
                    if (item.IsRange || item.IsRangeOrEqual) {
                        queryParms['Start_' + key] = item.Value.split(',')[0];
                        queryParms['End_' + key] = item.Value.split(',')[1];

                    } else {
                        queryParms[key] = item.Value;

                    }
                }
            }

        }
        return queryParms;
    },
    downLoadTxt(url: string) {
        if(!url){return;}
        var a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', url.split('/').pop()??""); //分割路径，取出最后一个元素
        a.setAttribute('target', '_blank');
        a.setAttribute('id', 'ElsDownloadFile');
        // 防止反复添加
        const eleFile=document.getElementById('LeoDownloadFile')
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
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    },
    Guid32() {
        return this.Guid().replace(/-/g, "")
    },
    shortid(){
        return shortid.generate();
    },
    cloneObj(obj: any) {
        if (!obj) { return {}; }
        return JSON.parse(JSON.stringify(obj))
    },
    isObject: (obj: any) => {
        return Object.prototype.toString.call(obj).indexOf('Object') > -1 || Object.prototype.toString.call(obj).indexOf('Array') > -1;
    },
    isNumber(val: string) {
        var regPos = /^\d+(\.\d+)?$/;
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
        if (regPos.test(val) || regNeg.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    dtGroupBy(data: Array<Record<string, any>>, fieldName: string, sortFieldName = '') {
        const groups: Record<string, any> = {};
        data.forEach(function (o) {
            const group = o[fieldName];
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        if (sortFieldName) {
            let sortGroupData = Object.keys(groups).map(function (group) {
                let groupsData = groups[group];
                let sort = groupsData[0][sortFieldName];
                return { key: group, sort: sort ? sort : 0, value: groupsData };
            });
            this.orderBy(sortGroupData, "sort")
            return sortGroupData;

        } else {
            return Object.keys(groups).map(function (group) {
                return { key: group, value: groups[group] };
            });
        }
    },
    upload(url,formData:FormData, alertCatchError = true){
        if(!formData){
            ElMessage.warning("请选择要上传的文件");
            return;
        }
        return new Promise((resolve, reject) => {
            axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }

            }).catch(action => {
                if (alertCatchError) {
                    ElMessage.error({ message: '接口调用异常' })
                }
                console.log(action)
                reject(action)
            });
        })
    },
    post(url: string, data: object, alertCatchError = true,header={'Content-Type': 'application/x-www-form-urlencoded' }) {
        if (!data) { data = []; }
        return new Promise((resolve, reject) => {
            axios.post(url, data, { headers: header }).then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }

            }).catch(action => {
                if (alertCatchError) {
                    ElMessage.error({ message: '接口调用异常' })
                }
                console.log(action)
                reject(action)
            });
        })
    },
    get(url: string, data: object, alertCatchError = true) {
        if (!data) { data = []; }
        return new Promise((resolve, reject) => {
            axios.get(url, { params: data }).then(res => {
                if (res.status == 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }).catch(action => {
                if (alertCatchError) {
                    ElMessage.error({ message: '接口调用异常' })
                }
                console.log(action)
                reject(action)
            });
        })
    },
    removeUndefinedOrWhiteSpaceProps(obj){
        return Object.keys(obj)
        .filter(key => obj[key] !== undefined&&obj[key]!==null&&obj[key]!=='')
        .reduce((result, key) => {
          result[key] = obj[key];
          return result;
        }, {});

    },
    clip(text) {
    
        toClipboard(text).then(res=>{
            ElMessage.success('复制成功')
        }).catch(err=>{
            ElMessage.error('复制失败')
        });
       
    },
    isEmptyObject(obj){
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    isSameObject(obj1: { [x: string]: any; }, obj2: { [x: string]: any; }) {
        // 检查对象类型
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
          return false;
        }
      
        // 获取对象的属性名
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
      
        // 检查属性数量是否相同
        if (keys1.length !== keys2.length) {
          return false;
        }
      
        // 逐个属性递归比较
        for (const key of keys1) {
          if (!keys2.includes(key)) {
            return false; // 对象2中缺少对象1的属性
          }
      
          const value1 = obj1[key];
          const value2 = obj2[key];
      
          if (typeof value1 === 'object' && typeof value2 === 'object') {
            if (!this.isSameObject(value1, value2)) {
              return false; // 递归比较子对象结构
            }
          } else if (typeof value1 !== typeof value2) {
            return false; // 属性类型不同
          }
        }
      
        return true; // 所有属性和子对象结构相同
      }

}

