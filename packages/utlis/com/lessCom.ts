import axios from 'axios'
import { getCurrentInstance} from 'vue'
import { exportJsonToExcel, exportTableToExcelEl, exportTableToExcelElMuti } from '../Export2Excel.js'
import {  QueryMethod } from '../enums';
import { ElMessage } from 'element-plus'
import useClipboard from "vue-clipboard3";
import shortid from 'shortid'
const { toClipboard } = useClipboard()



export const lessCom = {

    jsonFormatter(obj: string | undefined){
        if(!obj){return ''}
        return JSON.stringify(obj, null, "  ")
    },
    getFormNodeProps(props){
        const param =  (({
            prop,label,
            hasFormItem,
            span,
            aIndex,
            tip,
            tipPosition,
            suffixContent,
            labelWidth,
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
        }) => ({  prop,label,
            hasFormItem,
            span,
            aIndex,
            tip,
            tipPosition,
            suffixContent,
            labelWidth,
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
            queryRangeOrEqual}))(props)
            
            for(const key in param){
                if(param[key]===undefined){
                    delete param[key]
                }
            }
            if(!props.prop&&props.propStart){
                param['prop']=props.propStart
            }
        return param;
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
    getHBResult(row: { [x: string]: any; HBData: { [x: string]: any; }; }, fieldName: string) {
        let val1 = row[fieldName]
        let val2 = row.HBData[fieldName]
        if (!val1 || !val2) { return '-' }
        val1 = val1.toString().toFloat(4);
        val2 = val2.toString().toFloat(4);
        return !val1 || !val2 ? '-' : (((val1 - val2) / val2) * 100).toFixed(2) + "%";
    },
    getTBResult(row: { [x: string]: any; TBData: { [x: string]: any; }; }, fieldName: string) {
        let val1 = row[fieldName]
        let val2 = row.TBData[fieldName]
        if (!val1 || !val2) { return '-' }
        val1 = val1.toString().toFloat(4);
        val2 = val2.toString().toFloat(4);
        return !val1 || !val2 ? '-' : (((val1 - val2) / val2) * 100).toFixed(2) + "%"
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
    sumArray(arr: any[]) {
        if (arr.length) {
            let currArr = arr.filter((ele: string) => this.isNumber(ele))
            if (currArr.length) {
                let sum = currArr.map((ele: string) => parseFloat(ele)).reduce(function (prev: number, curr: number) {
                    if (!prev) { prev = 0; }
                    if (!curr) { curr = 0; }
                    return prev + curr;
                });
                return sum.toFixedNumber()
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
        if (data) {
            data.sort(function (obj1: { [x: string]: any; }, obj2: { [x: string]: any; }) {
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
            })
        }

    },
    orderByDescending(data: any[], fieldName: string | number) {
        if (data) {
            data.sort(function (obj1: { [x: string]: any; }, obj2: { [x: string]: any; }) {
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
            })
        }

    },
    randomNumber(len=100000){
        return (Math.random()*len).toString().toInt()
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
                    var signatureMD5 = (fieldName + '_' + sortRank).md5();
                    queryParms[parameterName] = fieldName + "$" + sortRank + "$" + signatureMD5;
                }
            }
            else {
                if (item.QueryParameterType !== undefined && item.QueryParameterType !== 'NoQuery' && item.QueryMethod !== 'NoAuto') {
                    if (item.IsRange || item.isRangeOrEqual) {
                        let fieldName = item.QueryFieldName;
                        let startQueryMethod = item.IsRangeOrEqual ? QueryMethod.GreaterThanOrEqual : QueryMethod.GreaterThan;
                        let queryDataType = item.QueryDataType;
                        let startSignatureMD5 = (fieldName + '_' + startQueryMethod + '_' + queryDataType).md5();
                        let startFieldValue = item.Value.split(',')[0];
                        if (startFieldValue || typeof (startFieldValue) == "number") {
                            queryParms["Query_Start_" + key] = fieldName + "$" + startQueryMethod + "$" + queryDataType + "$" + startSignatureMD5 + "$" + encodeURIComponent(startFieldValue);
                        }
                        let endQueryMethod = item.IsRangeOrEqual ? QueryMethod.LessThanOrEqual : QueryMethod.LessThan
                        let endSignatureMD5 = (fieldName + '_' + startQueryMethod + '_' + queryDataType).md5();
                        let endFieldValue = item.Value.split(',')[1];
                        if (endFieldValue || typeof (endFieldValue) == "number") {
                            queryParms["Query_End_" + key] = fieldName + "$" + endQueryMethod + "$" + queryDataType + "$" + endSignatureMD5 + "$" + encodeURIComponent(endFieldValue);
                        }
                    } else {
                        let parameterName = "Query_" + key;
                        let fieldName = item.QueryFieldName;
                        let queryMethod = item.QueryMethod;
                        let queryDataType = item.QueryDataType;
                        let signatureMD5 = (fieldName + '_' + queryMethod + '_' + queryDataType).md5();
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
        return lessCom.Guid().replace(/-/g, "")
    },
    generateID(){
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
    post(url: string, data: object, alertCatchError = true) {
        if (!data) { data = []; }

        return new Promise((resolve, reject) => {
            axios.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
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
        return async () => {
            try {
              await toClipboard(text);
              ElMessage.success('复制成功')
            } catch (e) {
              console.error(e);
              ElMessage.error('复制失败')
            }
          };
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

