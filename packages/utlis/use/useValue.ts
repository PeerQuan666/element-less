import {
    inject,
    provide,
    useAttrs,
} from 'vue';
import { lessCom } from '../com';

export function useContainer() {
    return inject<any>('elsContainer',null);
}
export function useForm() {
    return inject<any>('elsForm',null);
}
export function useParent() {
    return inject<any>('elsParent',null);
}


export function useValue(props:any={}){
    const setContainer=(value:Record<any,any>)=>{
        const attrs=useAttrs();
        provide('elsContainer', Object.assign({},lessCom.removeUndefinedOrWhiteSpaceProps(props),lessCom.removeUndefinedOrWhiteSpaceProps(attrs),lessCom.removeUndefinedOrWhiteSpaceProps(value)))
    }
    const setForm=(value:Record<any,any>)=>{
        const attrs=useAttrs();
        const parentValue=useForm()
        provide('elsForm', Object.assign({},parentValue??{},lessCom.removeUndefinedOrWhiteSpaceProps(props),lessCom.removeUndefinedOrWhiteSpaceProps(attrs),lessCom.removeUndefinedOrWhiteSpaceProps(value)))
    }
    const setValue=(value:Record<any,any>={})=>{
        const attrs=useAttrs();
        const parentValue=useParent()
        provide('elsParent', Object.assign({},parentValue??{},lessCom.removeUndefinedOrWhiteSpaceProps(props),lessCom.removeUndefinedOrWhiteSpaceProps(attrs),lessCom.removeUndefinedOrWhiteSpaceProps(value)))
       
    }
    const getValue=<T>(key:string,defaultValue?:any):T=>{
        if (lessCom.isDef(props[key])) {
            return props[key];
          }
          const attrs=useAttrs();
          if (lessCom.isDef(attrs[key])) {
            return attrs[key] as T;
          }
          const parent=useParent()
          if(parent&&lessCom.isDef(parent[key])){
            return parent[key]
          }
          const form=useForm()
          if(form&&lessCom.isDef(form[key])){
            return form[key]
          }
          const container=useContainer()
          if(container&&lessCom.isDef(container[key])){
            return container[key]
          }
          return inject<T>(key,defaultValue)
    }
    return {setContainer,setForm,setValue,getValue}
}