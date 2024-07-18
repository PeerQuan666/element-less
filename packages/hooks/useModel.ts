import { computed, getCurrentInstance, watch, watchEffect } from 'vue'
import { useProps } from './useProps'
import utils from '@/utils'

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
                const sVal= currValue.value.toString().split(props.valueSeparator)[0]
                const eVal=currValue.value.toString().split(props.valueSeparator)[1]
                if(props.isNumber===true){
                    if(sVal){
                        startValue.value =parseFloat(sVal)
                    }
                    if(eVal){
                        endValue.value =parseFloat(eVal)
                    }
                  
                }else{
                    startValue.value =sVal
                    endValue.value =eVal
                }
            }
        }
    }, { immediate: true })

    watchEffect(()=>{
        if (!props.single || !currModelValue.value) {
            if(!startValue.value&&!endValue.value){
                currValue.value = ""
            }else{
                currValue.value = [startValue.value, endValue.value ?? ''].join(props.valueSeparator)

            }
        }
        returnStartValue(startValue.value)
        returnEndValue(endValue.value)

    })



}

export const useModel = (props) => {
    const { emit } = getCurrentInstance()!
    const {getValue}=useProps()
    const setModelValue = getValue<Function>('setModelValue', () => { })
    const getModelValue = getValue<Function>('getModelValue', () => null)

    const startModelValue = computed(() => {
        if (props.start === undefined && getModelValue && props.propStart!==undefined) {
            return getModelValue(props.propStart, props.aIndex)
        }
        return props.start
    })
    const endModelValue = computed(() => {
        if (props.end === undefined && getModelValue && props.propEnd!==undefined) {
            return getModelValue(props.propEnd, props.aIndex)
        }
        return props.end
    })
    const currModelValue = computed(() => {
        if (props.modelValue === undefined && getModelValue && props.prop!==undefined) {
            return getModelValue(props.prop, props.aIndex)
        }
        return props.modelValue
    })
    const returnModelValue = (value) => {
        if (props.modelValue === undefined && setModelValue && props.prop !== undefined) {
            setModelValue(props.prop, value, props.aIndex)
        }
        emit('update:modelValue', value);

    }
    const returnStartValue = (value) => {
        let currValue = value
        if (props.isNumber && value) {
            currValue = utils.isNumber(value) ? parseFloat(value ?? '') : ''
        }
        emit('update:start', currValue);
        if (props.start === undefined && setModelValue && props.propStart !== undefined) {
            setModelValue(props.propStart, currValue, props.aIndex)
        }
    }
    const returnEndValue = (value) => {
        let currValue = value
        if (props.isNumber && value) {
            currValue = utils.isNumber(value) ? parseFloat(value ?? '') : ''
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
    const {getValue}=useProps()
    const isMobile = getValue<boolean>('isMobile', false)
    function onMobileConfirm(val){
        formNode.value&&formNode.value.confirmMobile(val)    
    }
    function onMobileHiddenPopup(){
        formNode.value&&formNode.value.hiddenMobile()    
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
                    case 'Number':
                        validExpression = "^-?\\d+$";
                        break;
                    case 'Float':
                        validExpression = "^([1-9]+\\d*(\\.\\d+)?|0\\.\\d+)$";
                        break;
                    case 'Price':
                        validExpression = "((^[1-9]\\d*)|^0)(\\.\\d{0,2}){0,1}$";
                        break;
                    case 'Date':
                        validExpression = "^(\\d{4})(-)(\\d{2})(-)(\\d{2})$";
                        break;
                    case 'Datetime':
                        validExpression = "^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$";
                        break;
                    case 'Time':
                        validExpression = "^(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]$";
                        break;
                    case 'Email':
                        validExpression = "^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$";
                        break;
                    case 'Phone':
                        validExpression = "^[1][0-9]{10}$";
                        break;
                    case 'Character':
                        validExpression = "^[\\u4e00-\\u9fa5]{0,}$";
                        break;
                    case 'Url':
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