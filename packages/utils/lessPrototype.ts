
import utils from "./";
declare global {
    interface Number{
        appendPx():string,
        toFixedNumber():number
    }
    interface String {
    cutWord(value: number): string;
    trimQuotes():string,
    trimComma():string,
    replacePowerUrl():string;
    post(postdata:object,alertCatchError?:true):Promise<any>;
    get(postdata:object,alertCatchError?:true):Promise<any>;
    upload(formdata:FormData,alertCatchError?:true):Promise<any>;
    toList(valueSeparator:string):string[];
    toListNumber(valueSeparator:string):number[];
    appendPx():string,
    toCamel():string,
    toKebabCase():string,
    toBool():boolean,
    toInt():number,
    toFloat():number,
    addUrlParameter(param:string, value:string):string,
    setPowerPublicQuery():string
    md5():string
    }

}

Number.prototype.toFixedNumber = function toFixedNumber(digits=2) {
    return parseFloat(this.toFixed(digits))
};
Number.prototype.appendPx = function(){
    if(this){
        return this+'px';
    }
    return ''
    
}
String.prototype.setPowerPublicQuery=function() {
    if (!this) {
        return '';
    }
    let url=this;
    let currParms = location.href.split("?")[1];
    if (currParms) {
        let dtParms = currParms.split('&');
        dtParms.forEach(ele => {
            let parmKeyValue = ele.split('=');
            if (ele && (ele.includes("Power_") || ele.includes("Transfer_")) && !url.includes(parmKeyValue[0])) {
                url = ((url.indexOf("?") == -1) ? (url + "?" + parmKeyValue[0] + "=" + parmKeyValue[1]) : (url + "&" + parmKeyValue[0] + "=" + parmKeyValue[1]));
            }
        })
    }
    return url.toString();
},
String.prototype.toCamel=function(){
    return this.toString().replace(/-([a-z])/g, function (match, letter) {
        console.log(match)
        return letter.toUpperCase();
    });
}
String.prototype.toKebabCase=function(){
    const currVal= this.toString().replace(/([A-Z])/g, '-$1').toLowerCase();
    if(currVal.startsWith('-')){
       return currVal.substring(1)
    }
    return currVal;
}
String.prototype.appendPx = function(){
    if(!this){return ''}
    if(utils.isNumber(this.toString())){
        return this+'px';
    }
    return this.toString();
    
 }
String.prototype.toList = function (valueSeparator=','):string[] {
   if(this){
    return this.toString().split(valueSeparator)
   }
   return []
}
String.prototype.toListNumber = function (valueSeparator=','):number[] {
    if(this){
     return this.toString().split(valueSeparator).map(ele => parseFloat(ele))
    }
    return []
    
 }
 String.prototype.toBool = function toBool() {
    if (this.toLowerCase() === "true") {
        return true;
    } else if (this.toLowerCase() === "false") {
        return false
    }
    return false
};
String.prototype.toInt = function toInt() {
    if (utils.isNumber(this.toString())) {
        return parseInt(this.toString())
    }
    return 0;
};
String.prototype.toFloat = function toFloat(digits=2) {
    if (!digits) {
        return parseFloat(this.toString())
    }
    return parseFloat(parseFloat(this.toString()).toFixed(digits))
};
String.prototype.cutWord = function (len: number) {
    if (this) {
        if (this.length > len) {
            return this.substring(0, len) + "..."
        }
    }
    return this.toString();
}

String.prototype.replacePowerUrl = function replacePowerUrl() {
    try {
        if (this && this.indexOf("{Power_CoteID}") > -1 && location.host) {
            return this.replace('{Power_CoteID}', location.host.split('.')[0])
        }
    } catch (err) {
        console.log(err)
    }
    return this.toString();
};

String.prototype.addUrlParameter = function addUrlParameter(param, value:any) {
    if(value===undefined){return this.toString()}
    if (this.toString().indexOf(param) > -1) {
        var oUrl = this.toString();
        return oUrl.replace(new RegExp('/(' + param + '=)([^&]*)/gi'), param + '=' + value);
    } 
    let cSymbol = this.indexOf('?') > -1 ? '&' : '?'
    return `${this}${cSymbol}${param}=${value}`;
};

String.prototype.post = function post(postdata:object, alertCatchError=true,header={'Content-Type': 'application/x-www-form-urlencoded' }) {
    return utils.post(this.toString(), postdata, alertCatchError,header)
}
String.prototype.get = function get(postdata:object, alertCatchError=true) {
    return utils.get(this.toString(), postdata, alertCatchError)
}
String.prototype.upload = function upload(formdata:object, alertCatchError=true) {
    return utils.post(this.toString(), formdata, alertCatchError)
}
String.prototype.trimQuotes=function trimQuotes() {
    return this.toString().replace(/^['"]|['"]$/g, '');
  }
String.prototype.trimComma=function trimComma() {
    return this.toString().replace(/^,+/, "").replace(/,+$/, "");
}

String.prototype.md5=function md5(){
    return utils.md5(this.toString())
}


