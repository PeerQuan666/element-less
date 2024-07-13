import {
    inject,
    provide,
    useAttrs,
    computed
} from 'vue';
import utils from '@/utils';

export function useContainer() {
    return inject<any>('elsContainer',null);
}
export function useForm() {
    return inject<any>('elsForm',null);
}
export function useParent() {
    return inject<any>('elsParent',null);
}


export function useProps(props:any={}){
    const setContainer=(value:Record<any,any>)=>{
        const attrs=useAttrs();
        provide('elsContainer', Object.assign({},utils.removeUndefinedOrWhiteSpaceProps(props),utils.removeUndefinedOrWhiteSpaceProps(attrs),utils.removeUndefinedOrWhiteSpaceProps(value)))
    }
    const setForm=(value:Record<any,any>)=>{
        const attrs=useAttrs();
        const parentValue=useForm()
        provide('elsForm', Object.assign({},parentValue??{},utils.removeUndefinedOrWhiteSpaceProps(props),utils.removeUndefinedOrWhiteSpaceProps(attrs),utils.removeUndefinedOrWhiteSpaceProps(value)))
    }
    const setValue=(value:Record<any,any>={})=>{
        const attrs=useAttrs();
        const parentValue=useParent()
        provide('elsParent', Object.assign({},parentValue??{},utils.removeUndefinedOrWhiteSpaceProps(props),utils.removeUndefinedOrWhiteSpaceProps(attrs),utils.removeUndefinedOrWhiteSpaceProps(value)))
       
    }
    const formNodeProps=computed(()=>{
      const param =  (({
              prop,
              label,
              placeholder,
              autoCreateFormItem,
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
              placeholder,
              autoCreateFormItem,
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

  })


    const getValue=<T>(key:string,defaultValue?:any):T=>{
        if (utils.isDef(props[key])) {
            return props[key];
          }
          const attrs=useAttrs();
          if (utils.isDef(attrs[key])) {
            return attrs[key] as T;
          }
          const parent=useParent()
          if(parent&&utils.isDef(parent[key])){
            return parent[key]
          }
          const form=useForm()
          if(form&&utils.isDef(form[key])){
            return form[key]
          }
          const container=useContainer()
          if(container&&utils.isDef(container[key])){
            return container[key]
          }
          return inject<T>(key,defaultValue)
    }
    return {setContainer,setForm,setValue,getValue,formNodeProps}
}