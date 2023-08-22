import axios from 'axios'
import { ElMessage } from 'element-plus'
const babyCom ={
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
        return babyCom.Guid().replace(/-/g, "")
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
    orderBy(data:Array<Record<string,any>>, fieldName:string) {
        data.sort(function (obj1, obj2) {
            var val1 = !obj1[fieldName] ? 0 : obj1[fieldName];
            var val2 = !obj2[fieldName] ? 0 : obj2[fieldName];
            if (babyCom.isNumber(val1) && babyCom.isNumber(val2)) {
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
            axios.post(url,data).then(res => {
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


export default babyCom