<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import ElementLess from '../../element-less/element-less.js'
import {getResumeComponents,getResumeComponentTypes,getResumeDetail} from '../utlis/http.js'
defineProps<{ msg: string }>()
const preview = ref()
const baseConfig = ref({ themeColor: '' })
const colorPicker = ref()
const colorPickerVisible = ref(false)
const componentData =ref<any>([])
const dataTypes = ref<any>([])

const resumeValue = ref<any>([])
const templateResumeData = ref<any>({})
const templateResumeConfig=ref<any>([])
const resumeComponents=ref<any>([])


const resumeData = ref<any>([])
const previewConfig = ref<any>()


function getConfigData(item: any) {
  const data: any = resumeComponents.value.find((ele:any) => ele.value == item.componentType)?.propertys
  if (!data) {
    return []
  }
  try {
    const formData = ElementLess.utlis.cloneObj(data)

    if (data[0].data) {
      formData[0].data = data[0].data[0].data[0].data;
    }
    else if (data[0].children) {
      formData[0].children = data[0].children[0].children[0].children;

    }
    return formData
  }
  catch {
    return data
  }

}





function handleColorPicker() {
  colorPickerVisible.value = !colorPickerVisible.value
  if (colorPickerVisible.value) {
    colorPicker.value.show()

  } else {
    colorPicker.value.hide()
  }
}



watchEffect(() => {
  if(resumeValue.value&&resumeValue.value.length){
    resumeValue.value.forEach((ele: any, index: number) => {
    Object.assign(previewConfig.value[index].config.baseConfig.modelData, ele)
    })

  }

})


const isInit=ref(false)

async function initData(){

  await  getResumeComponentTypes().then((data:any)=>{
      data.forEach((ele:any) => {
        if(ele.Config){
            dataTypes.value.push({
                label: ele.Name,
                type: ele.ComponentID,
                value: ele.ComponentID
            })
            resumeComponents.value.push({
                componentName: ele.ComponentName,
                dataTypes: [ele.ComponentID],
                propertys: JSON.parse(ele.Config),
                defaultPropertys:JSON.parse(ele.DefaultValue),
                group: 'Show',
                isCustom:true,
                formItem:false,
                label: ele.Name,
                value: ele.ComponentID,
                type: ele.ComponentID,
                preview: ele.PreviewUrl
            })
        }
          
    })
  })
  await getResumeDetail('173014bd8be844faae24549e0176b8b5').then((data:any)=>{
    if(data.TemplateConfig){
      templateResumeData.value=data

      templateResumeConfig.value=JSON.parse(data.TemplateConfig)
      previewConfig.value =ElementLess.utlis.cloneObj(templateResumeConfig.value)
      templateResumeConfig.value.forEach((ele:any) => {
        resumeData.value.push(getConfigData(ele))
        resumeValue.value.push(ElementLess.utlis.cloneObj(ele.config.baseConfig.modelData))
      })
      isInit.value=true
    }
  })


}


initData()


</script>

<template>
<div>
  <els-work-flow 
  configUrl="http://localhost:5000/WorkflowManage/SearchAuto/StepReadData"
    userUrl="http://localhost:5000/WorkflowManage/SearchAuto/PowerUserNameReadData"
    userTaskTemplateUrl="http://localhost:5000/WorkflowManage/SearchAuto/UserTaskDataTemplateReadData"
  ></els-work-flow>
</div>

</template>

<style scoped lang="less">
.hide {
  display: none;
}

.flex {
  display: flex;
  align-items: center;
}

.nav-bar {
  display: flex;
  height: 64px;
  font-size: 15px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 0 20px;
  font-size: 13px;

  .nav-btn {
    background: #f8f8f8;
    border-radius: 10px;
    color: #585858;
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
    height: 28px;
    line-height: 28px;
    padding: 0 10px;
    position: relative;

    &:hover {
      background: var(--el-color-primary);
      color: #fff;
    }

    &.active {
      background: var(--el-color-primary);
      color: #fff;
    }
  }

  .nav-bar-left:deep {
    align-items: center;
    padding-left: 15px;
    display: flex;
    column-gap: 10px;

    .nav-picker {
      position: relative;
    }

    .el-color-picker {
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
    }

    .flex {
      column-gap: 20px;
    }

  }

  .resume-name {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }
}





.resume-main {
  display: flex;

  .resume-body {
    overflow-y: scroll;
    height: calc(100vh - 64px);
  }

  .resume-content {
    .nav-bar {
      background: #f2f5fa;
      font-size: 13px;
    }

    .resume-inner {
      display: flex;
      background: #f2f5fa;
      justify-content: center;
      padding: 30px 0;


      .preview-container:deep {
        overflow-y: scroll;

        .els-dynamic-render {
          background: #fff;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        }

      }
    }

  }

}



.resume-content {
  width: 50%;

}

.resume-config:deep {

  width: 50%;
  background: #fff;
  box-shadow: 0 5px 20px 0 rgba(17, 30, 54, .08);

  min-height: 100vh;
  position: relative;

  .nav-bar-left {
    font-size: 15px;
  }

  .resume-config-list {

    padding: 30px;
  }

  .el-input__wrapper,
  .el-textarea__inner {
    background: #f8f9fa;
    box-shadow: unset;
    border-radius: 5px;

    &.is-focus,
    &:hover {
      box-shadow: 0 0 0 1px var(--el-color-primary) !important;
    }
  }

}

.pc-width {
  width: 826px;
}
</style>
