<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted, watch, useAttrs } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { FormItemProps } from '../../utlis/interfaces'
import { useModel } from '../../utlis/use'
import { lessCom } from "../../utlis/com";
const { $serverUrl } = lessCom.getWangEditorConfig()
const { $codeField, $success, $dataField: apiDataField } = lessCom.getApiConfig()
const { $dataField, $pathField } = lessCom.getUploadConfig()

defineOptions({ name: "ElsWangEditor" })

const emits = defineEmits(['update:modelValue'])

interface Props extends FormItemProps {
  modelValue?: string,
  height?: string,
  mode?: string,
  serverUrl?: string,
  resourceCode?: string,
  restrictCode?: string,
  toolbarKeys?:string,
  config?:Record<string,any>
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
  height:'300px'
})

const {
  currModelValue,
  returnModelValue,
} = useModel(props)
const attrs = useAttrs()
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const editorContent = ref('')
const currServerUrl = ref<any>(props.serverUrl ?? $serverUrl)
if (currServerUrl.value) {
  currServerUrl.value = currServerUrl.value.addUrlParameter("ResourceCode", props.resourceCode)
    .addUrlParameter("RestrictCode", props.restrictCode)
}
watch(editorContent, (val) => {
  returnModelValue(val)
})
if (props.modelValue) {
  editorContent.value = currModelValue.value
}
type InsertFnType = (url: string, poster: string) => void
const toolbarConfig:any = {}
const editorConfig: any = {
  placeholder: props.placeholder,
  MENU_CONF: {
    'uploadImage': {
      server: currServerUrl.value,
      // 上传之前触发
      onBeforeUpload(file: File) { // TS 语法
        // onBeforeUpload(file) {    // JS 语法
        // file 选中的文件，格式如 { key: file }
        return file

        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },

      // 上传进度的回调函数
      onProgress(progress: number) {  // TS 语法
        // onProgress(progress) {       // JS 语法
        // progress 是 0-100 的数字
        console.log('progress', progress)
      },

      // 单个文件上传成功之后
      onSuccess(file: File, res: any) {  // TS 语法
        // onSuccess(file, res) {          // JS 语法
        console.log(`${file.name} 上传成功`, res)
      },

      // 单个文件上传失败
      onFailed(file: File, res: any) {   // TS 语法
        // onFailed(file, res) {           // JS 语法
        console.log(`${file.name} 上传失败`, res)
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: File, err: any, res: any) {  // TS 语法
        // onError(file, err, res) {               // JS 语法
        console.log(`${file.name} 上传出错`, err, res)
      },
      customInsert(res: any, insertFn: InsertFnType) {  // TS 语法
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插入图片
        if (res[$codeField] === $success) {
          insertFn(res[apiDataField][$dataField][$pathField], '')
        }

      },
    }


  }
}
if(props.config){
  Object.assign(editorConfig,props.config)
}
if(props.toolbarKeys){
  toolbarConfig.toolbarKeys=props.toolbarKeys.split(',')
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>
<template>
  <div class="els-node">
    <ElsFormNode v-bind="lessCom.getFormNodeProps(props)">
      <div style="border: 1px solid #ccc;flex-grow: 1;">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
          :mode="mode" />
        <Editor v-bind="attrs" v-model="editorContent" :style="[{ height: height?.appendPx() }]"
          :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
      </div>
    </ElsFormNode>
  </div>
</template>
<style scoped lang="less">
.els-node{flex-grow: 1;}
</style>