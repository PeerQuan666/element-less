
import babyCom from "./babyCom";
export { }
declare global {
    interface Number{
        appendPx():string
    }
    interface String {
    cutWord(value: number): string;
    replacePowerUrl():string;
    post(postdata:object,alertCatchError?:true):Promise<any>;
    get(postdata:object,alertCatchError?:true):Promise<any>;
    toList(valueSeparator:string):string[];
    toListNumber(valueSeparator:string):number[];
    appendPx():string,
    toCamel():string


    }
}
Number.prototype.appendPx = function(){
    if(this){
        return this+'px';
    }
    return ''
    
}
String.prototype.toCamel=function(){
    return this.replace(/-([a-z])/g, function (match, letter) {
        console.log(match)
        return letter.toUpperCase();
    });
}
String.prototype.appendPx = function(){
    if(!this){return ''}
    if(babyCom.isNumber(this.toString())){
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

String.prototype.post = function request(postdata:object, alertCatchError=true) {
    return babyCom.post(this.toString(), postdata, alertCatchError)
}
String.prototype.get = function request(postdata:object, alertCatchError=true) {
    return babyCom.get(this.toString(), postdata, alertCatchError)
}


