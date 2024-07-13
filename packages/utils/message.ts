import {ElMessage} from 'element-plus'
export const ElsMessage = {
    error:(msg:string)=>{
        ElMessage.error(msg)
    },
    success:(msg:string)=>{
        ElMessage.success(msg)
    },
    warning:(msg:string)=>{
        ElMessage.warning(msg)
    }
}