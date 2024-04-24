import { computed, getCurrentInstance, watch } from 'vue'
import { useValue } from './useValue'
import {lessCom} from '../com'
import { ValidType } from '../enums'

export const useRangeModel = (props, currValue, startValue, endValue) => {

    const {
        startModelValue,
        endModelValue,
        currModelValue,
        returnModelValue,
        returnStartValue,
        returnEndValue
    } = useModel(props)

    watch(currValue, (val) => {
        returnModelValue(val)
    })

    watch(startModelValue, (val) => {
        startValue.value = val
    }, { immediate: true })

    watch(endModelValue, (val) => {
        endValue.value = val
    }, { immediate: true })



    watch(currModelValue, (val) => {
        if (val) {
            currValue.value = val
            if (!props.single && !startModelValue.value && !endModelValue.value) {
                startValue.value = currValue.value.toString().split(props.valueSeparator)[0]
                endValue.value = currValue.value.toString().split(props.valueSeparator)[1]
            }
        }
    }, { immediate: true })

    watch(startValue, (val) => {
        if (!props.single || !currModelValue.value) {
            currValue.value = [val, endValue.value ?? ''].join(props.valueSeparator)
        }
        returnStartValue(val)
    })

    watch(endValue, (val) => {
        if (!props.single || !currModelValue.value) {
            currValue.value = [startValue.value ?? '', val].join(props.valueSeparator)

        }
        returnEndValue(val)
    })



}

export const useModel = (props) => {
    const { emit } = getCurrentInstance()!
    const {getValue}=useValue()
    const setModelValue = getValue<Function>('setModelValue', () => { })
    const getModelValue = getValue<Function>('getModelValue', () => null)

    const startModelValue = computed(() => {
        if (props.start === undefined && getModelValue && props.propStart) {
            return getModelValue(props.propStart, props.aIndex)
        }
        return props.start
    })
    const endModelValue = computed(() => {
        if (props.end === undefined && getModelValue && props.propEnd) {
            return getModelValue(props.propEnd, props.aIndex)
        }
        return props.end
    })
    const currModelValue = computed(() => {
        if (props.modelValue === undefined && getModelValue && props.prop) {
            return getModelValue(props.prop, props.aIndex)
        }
        return props.modelValue
    })
    const returnModelValue = (value) => {
        emit('update:modelValue', value);
        if (props.modelValue === undefined && setModelValue && props.prop !== undefined) {
            setModelValue(props.prop, value, props.aIndex)
        }
    }
    const returnStartValue = (value) => {
        let currValue = value
        if (props.isNumber && value) {
            currValue = lessCom.isNumber(value) ? parseFloat(value ?? '') : ''
        }
        emit('update:start', currValue);
        if (props.start === undefined && setModelValue && props.propStart !== undefined) {
            setModelValue(props.propStart, currValue, props.aIndex)
        }
    }
    const returnEndValue = (value) => {
        let currValue = value
        if (props.isNumber && value) {
            currValue = lessCom.isNumber(value) ? parseFloat(value ?? '') : ''
        }
        emit('update:end', currValue);
        if (props.end === undefined && setModelValue && props.propEnd !== undefined) {
            setModelValue(props.propEnd, currValue, props.aIndex)
        }
    }

    return {
        startModelValue,
        endModelValue,
        currModelValue,
        returnModelValue,
        returnStartValue,
        returnEndValue
    }

}

export const useMobile=(formNode)=>{
    const {getValue}=useValue()
    const isMobile = getValue<boolean>('isMobile', false)
    function onMobileConfirm(val){
        formNode.value.confirmMobile(val)    
    }
    function onMobileHiddenPopup(){
        formNode.value.hiddenMobile()    
    }
    
    return {
        onMobileConfirm,
        onMobileHiddenPopup,
        isMobile,
    }
}

export const useFormValidation=(props,attrs)=>{
    function initRules() {

        let currItemRules: any = [];
        let currLabel = props.label ? props.label : '';
        if (attrs.rules) {
            return attrs.rules;
        } else {
            if (props.required) {
                currItemRules.push({ required: true, message: props.requiredMessage ? props.requiredMessage : (props.validTrigger == 'change' ? '请选择' : '请输入') + currLabel, trigger: props.validTrigger });
            }
            let validExpression = props.validExpression
            if (!validExpression) {
                switch (props.validType) {
                    case ValidType.Number:
                        validExpression = "^-?\\d+$";
                        break;
                    case ValidType.Float:
                        validExpression = "^([1-9]+\\d*(\\.\\d+)?|0\\.\\d+)$";
                        break;
                    case ValidType.Price:
                        validExpression = "((^[1-9]\\d*)|^0)(\\.\\d{0,2}){0,1}$";
                        break;
                    case ValidType.Date:
                        validExpression = "^(\\d{4})(-)(\\d{2})(-)(\\d{2})$";
                        break;
                    case ValidType.DateTime:
                        validExpression = "^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$";
                        break;
                    case ValidType.Time:
                        validExpression = "^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$";
                        break;
                    case ValidType.Email:
                        validExpression = "^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$";
                        break;
                    case ValidType.Phone:
                        validExpression = "^[1][0-9]{10}$";
                        break;
                    case ValidType.Character:
                        validExpression = "^[\\u4e00-\\u9fa5]{0,}$";
                        break;
                    case ValidType.Url:
                        validExpression = "^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$";
                        break;
                }
            }
            if (validExpression) {
                currItemRules.push({ pattern: new RegExp(validExpression), message: props.validMessage ? props.validMessage : currLabel + '格式错误' })
    
            }
            if (props.validMethod) {
                currItemRules.push({ validator: props.validMethod, trigger: props.validTrigger })
            }
        }
        return currItemRules;
    }
    return {
        initRules
    }

}