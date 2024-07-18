import {
  inject,
  provide,
  useAttrs,
  computed
} from 'vue';
import utils from '@/utils';

export function useContainer() {
  return inject<any>('elsContainer', null);
}
export function useForm() {
  return inject<any>('elsForm', null);
}
export function useParent() {
  return inject<any>('elsParent', null);
}


export function useProps(props: any = {}) {
  const attrs = useAttrs();
  const setContainer = (value: Record<any, any>) => {
   
    provide('elsContainer', Object.assign({}, utils.removeUndefinedOrWhiteSpaceProps(props), utils.removeUndefinedOrWhiteSpaceProps(attrs), utils.removeUndefinedOrWhiteSpaceProps(value)))
  }
  const setForm = (value: Record<any, any>) => {
   
    const parentValue = useForm()
    provide('elsForm', Object.assign({}, parentValue ?? {}, utils.removeUndefinedOrWhiteSpaceProps(props), utils.removeUndefinedOrWhiteSpaceProps(attrs), utils.removeUndefinedOrWhiteSpaceProps(value)))
  }
  const setValue = (value: Record<any, any> = {}) => {
   
    const parentValue = useParent()
    provide('elsParent', Object.assign({}, parentValue ?? {}, utils.removeUndefinedOrWhiteSpaceProps(props), utils.removeUndefinedOrWhiteSpaceProps(attrs), utils.removeUndefinedOrWhiteSpaceProps(value)))

  }
  const formNodeAttrs = [
    'prop',
    'label',
    'placeholder',
    'childCreateFormItem',
    'createFormItem',
    'aIndex',
    'tip',
    'tipPosition',
    'suffixContent',
    'labelWidth',
    'required',
    'requiredMessage',
    'validType',
    'validExpression',
    'validMessage',
    'validMethod',
    'validTrigger',
    'queryField',
    'queryMethod',
    'queryDataType',
    'queryDefaultValue',
    'queryAutoReadData',
    'queryAroundComma',
    'queryRange',
    'queryRangeOrEqual',
    'propStart',
    'propEnd',
    'startPlaceholder',
    'endPlaceholder',
  ]
  const formNodeProps = computed(() => {
    const remainingProps = Object.keys(props).reduce((result, key) => {
      if (formNodeAttrs.includes(key) && props[key] !== undefined) {
        result[key] = props[key];
      }
      return result;
    }, {});
    return remainingProps;

  })

  const componentProps = computed(() => {
    const modelAttrs = ['modelValue']
    const remainingProps = Object.keys(props).reduce((result, key) => {
      if (!formNodeAttrs.includes(key) && !modelAttrs.includes(key) && props[key] !== undefined) {
        result[key] = props[key];
      }

      return result;
    }, {});

    for (const key in attrs) {
      if (attrs.hasOwnProperty(key) && !key.startsWith('onUpdate')) {
        remainingProps[key] = attrs[key];
      }
    }
    return remainingProps;
  });
  const attrProps = computed(() => {

    return Object.assign({}, attrs, props);
  });

  const getValue = <T>(key: string, defaultValue?: any): T => {
    if (utils.isDef(props[key])) {
      return props[key];
    }
    const attrs = useAttrs();
    if (utils.isDef(attrs[key])) {
      return attrs[key] as T;
    }
    const parent = useParent()
    if (parent && utils.isDef(parent[key])) {
      return parent[key]
    }
    const form = useForm()
    if (form && utils.isDef(form[key])) {
      return form[key]
    }
    const container = useContainer()
    if (container && utils.isDef(container[key])) {
      return container[key]
    }
    return inject<T>(key, defaultValue)
  }
  return { setContainer, setForm, setValue, getValue, formNodeProps, componentProps, attrProps }
}