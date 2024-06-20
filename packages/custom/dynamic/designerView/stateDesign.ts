import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDesign = defineStore('design', () => {
    // 快照栈堆
    const queue = ref<any>([])
    // 栈堆下标
    const pointer = ref(-1)
    // 栈堆的限制
    const LIMIT = 30

    const record = (data) => {
        while (pointer.value < queue.value.length - 1) {
            queue.value.pop()
        }
        pointer.value++
        queue.value.push(JSON.parse(JSON.stringify(data)))
        if (queue.value.length - 1 > LIMIT) {
            queue.value.shift()
        }
        return pointer
    }

    // 撤销
    const undo = () => {
        --pointer.value
        if(pointer.value<0){
            return []
        }
        return JSON.parse(JSON.stringify(queue.value[pointer.value]))
    }

    // 重做
    const redo = () => {
        ++pointer.value
        if(queue.value.length>pointer.value){
            return {data:JSON.parse(JSON.stringify(queue.value[pointer.value])),last:pointer.value==queue.value.length-1} 

        }else{
            --pointer.value
            return null
        }
        
    }
    const clear=()=>{
        queue.value.length=0;
    }

    return {
        record,
        undo,
        redo,
        clear
    }
})