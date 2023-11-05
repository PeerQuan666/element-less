import { computed, getCurrentInstance, inject, watch } from 'vue'
import lessCom from './lessCom'

export const useRangeModel = (props, currValue, startValue, endValue) => {

    const {
        startModelValue,
        endModelValue,
        currModelValue,
        returnModelValue,
        returnStartValue,
        returnEndValue
    } = useModel(props, currValue, startValue, endValue)

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
    const setModelValue = inject<Function>('setModelValue', () => { })
    const getModelValue = inject<Function>('getModelValue', () => null)

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