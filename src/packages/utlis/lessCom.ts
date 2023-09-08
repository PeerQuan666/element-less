import axios from 'axios'
import {getCurrentInstance,ComponentInternalInstance } from 'vue'
import {exportJsonToExcel,exportTableToExcelEl} from './Export2Excel.js'
import { ElMessage } from 'element-plus'
const lessCom ={
    menuCommand(menu){
        const { proxy } = getCurrentInstance() as ComponentInternalInstance
    
        const $parent=proxy?.$parent as any;
        if($parent){
            $parent.gridMenuVisible = false
            switch (menu.ActionType) {
                case 'Modal':
                    break
                case 'Target':
                   
                
                    break;
                case 'DesktopTarget':

                    break;
                case 'Select':
                 
                    break
                case 'Export':
                  
                    break;
                default:
               
                    break
    
            }
        }
     
    },
    getCompareClass(val) {
        if (!val || val === '-') { return ''; }
        if (parseFloat(val) < 0) {
            return 'txt-color-green';
        }
        return 'txt-color-red';

    },
    getHBResult(row, fieldName) {
        let val1 = row[fieldName]
        let val2 = row.HBData[fieldName]
        if (!val1 || !val2) { return '-' }
        val1 = val1.toString().toFloat(4);
        val2 = val2.toString().toFloat(4);
        return !val1 || !val2 ? '-' : (((val1 - val2) / val2) * 100).toFixed(2) + "%";
    },
    getTBResult(row, fieldName) {
        let val1 = row[fieldName]
        let val2 = row.TBData[fieldName]
        if (!val1 || !val2) { return '-' }
        val1 = val1.toString().toFloat(4);
        val2 = val2.toString().toFloat(4);
        return !val1 || !val2 ? '-' : (((val1 - val2) / val2) * 100).toFixed(2) + "%"
    },
    getAvgDayResult(val, fixed=2, dayCount=1) {
        if (val) {
            return (val / dayCount).toFixed(fixed)
        }
        return "-";
    },
     getUrlParms(paramName) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == paramName) { return pair[1]; }
        }
        return "";
    },
    formatDate(date, fmt) {
        date = new Date(date);
        let ret;
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
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    },
     parseTime(time, cFormat='') {
        if (arguments.length === 0) {
          return null;
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
        let date;
        if (typeof time == 'object') {
          date = time;
        } else {
          if (('' + time).length === 10) time = parseInt(time) * 1000;
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
    exportTable(el, cellStyles = [], headerRowCount = 0, headerCellStyle = {}, filename = ""){
        exportTableToExcelEl(el,cellStyles,headerRowCount,headerCellStyle,filename)
    },
    exportJSON(data){
        exportJsonToExcel(data)
    },
    getObjectKey(obj, fields, separator = '$'){
        let currValue:any = [];
        fields.split(',').forEach(ele => {
            currValue.push(obj[ele])
        })
        return currValue.join(separator)
    },
    sumArray(arr) {
        if (arr.length) {
            let currArr = arr.filter(ele => this.isNumber(ele))
            if (currArr.length) {
                let sum = currArr.map(ele => parseFloat(ele)).reduce(function (prev, curr) {
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
    pageArray(arr, pageIndex, pageSize){
        var skipNum = pageIndex * pageSize;
        var newArr = (skipNum + pageSize >= arr.length) ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
        return newArr;
    },
    removeArrayItem(list,item) {
        let index = list.indexOf(item)
        if (index > -1) {
            list.splice(index, 1)
        }
    },
    orderBy(data, fieldName) {
        if(data){
            data.sort(function (obj1, obj2) {
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
    orderByDescending(data, fieldName) {
        if(data){
            data.sort(function (obj1, obj2) {
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
    getQueryData(queryData){
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
                    var signatureMD5 = item.SignatureMD5;
                    queryParms[parameterName] = fieldName + "$" + sortRank + "$" + signatureMD5;
                }
            }
            else {
                if (((item.QueryType !== undefined && item.QueryType == "Query") || (item.QueryParameterType !== undefined && item.QueryParameterType != 'NoQuery')) && item.QueryMethod !== 'NoAuto') {
                    let parameterName = "Query_" + key;
                    let fieldName = item.QueryFieldName;
                    let queryMethod = item.QueryMethod;
                    let queryDataType = item.QueryDataType;
                    let signatureMD5 = item.SignatureMD5;
                    let fieldValue = item.Value;
                    if (item.IsAroundComma === true && fieldValue && !fieldValue.startsWith(',')) {
                        fieldValue = `,${fieldValue},`
                    }
                    if (fieldValue || typeof (fieldValue) == "number") {
                        queryParms[parameterName] = fieldName + "$" + queryMethod + "$" + queryDataType + "$" + signatureMD5 + "$" + fieldValue;
                    }
                }
             
                else{
                    queryParms[key] = item.Value
                }
            }

        }
        return queryParms;
    },
    handleApiResult(res){
        if (!res.EventActionData && res.ResultCode == "0") {
            ElMessage.success(res.ResultMessage)
            return
        } else if (!res.EventActionData && res.ResultCode != "0") {
            ElMessage.error(res.ResultMessage)
            return;
        }
        res.EventActionData.forEach(action => {
            switch (action.Name) {
                case "Alert":
                    ElMessage.success({ message: action.Value })
                    break
                case "TargetUrl":
                    window.location.href = action.Value;
                    break
                case "RefreshGrid":
                   
                    break
                case "RefreshGridParent":
                   
                    break
                case "CloseModal":
                  
                    break
                case "RefreshFrame":
                   
                    break
                case "RefreshFrameParent":
                   
                    break
                case "Script":
                    
                    break;

            }


        })
    },
    getToolHeight(){
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
    cloneObj(obj:any) {
        if (!obj) { return {}; }
        return JSON.parse(JSON.stringify(obj))
    },
    isObject:(obj:any) =>{
        return Object.prototype.toString.call(obj).indexOf('Object') > -1 || Object.prototype.toString.call(obj).indexOf('Array') > -1;
    },
    isNumber(val:string) {
        var regPos = /^\d+(\.\d+)?$/;
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
        if (regPos.test(val) || regNeg.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    dtGroupBy(data:Array<Record<string,any>>, fieldName:string, sortFieldName='') {
        const groups:Record<string,any> = {};
        data.forEach(function (o) {
            const group = o[fieldName];
            groups[group] = groups[group] || [];
            groups[group].push(o);
        });
        if (sortFieldName) {
            let sortGroupData = Object.keys(groups).map(function (group) {
                let groupsData = groups[group];
                let sort = groupsData[0][sortFieldName];
                return { key: group, sort: sort ? sort:0, value: groupsData };
            });
            this.orderBy(sortGroupData, "sort")
            return sortGroupData;

        } else {
            return Object.keys(groups).map(function (group) {
                return { key: group, value: groups[group] };
            });
        } 
    },
    post(url:string, data:object,alertCatchError=true) {
        if (!data) { data = []; }
     
        return new Promise((resolve, reject) => {
            axios.post(url,data,{headers:{ 'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
                if(res.status==200){
                    resolve(res.data)
                }else {
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
    get(url:string, data:object,alertCatchError=true) {
        if (!data) { data = []; }
        return new Promise((resolve, reject) => {
            axios.get(url,{params:data}).then(res => {
                if(res.status==200){
                    resolve(res.data)
                }else {
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
    
}


export default lessCom