<script setup lang="ts">
import { ref, useAttrs, onMounted, watch } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
import { UploadType } from '../../utlis/enumCom'
import lessCom from '../../utlis/lessCom.js'
import Sortable from 'sortablejs'
import { ElNotification, ElMessage } from 'element-plus'
import '../../utlis/lessPrototype'
defineOptions({
    name: 'ElsUpload',
})
const attrs = useAttrs()
const emits = defineEmits(['update:modelValue', 'uploaded', 'completed'])

interface Props extends FormItemProps {
    modelValue?: string,
    width?: string,
    height?: string,
    url?: string,
    sizeLimit?: number,
    picWidthLimit?: number,
    picHeightLimit?: number,
    picLimitType?: string,
    fileTypes?: string,
    resourceCode?: string,
    restrictCode?: string,
    showInput?: boolean,
    inputPlaceholder?: string,
    inputWidth?: string,
    hasMd5Parameter?: string,
    isReturnSize?: boolean,
    showFileList?: boolean,
    type?: UploadType,
    valueSeparator?: string,
    buttonLabel?: string,
    fileName?: string
}

const props = withDefaults(defineProps<Props>(), {
    width: '60',
    height: '60',
    inputPlaceholder: '地址',
    inputWidth: '500',
    buttonLabel: '点击上传',
    valueSeparator: '$',
    fileName: 'file'
})

const apiConfig = lessCom.getApiConfig()
const { $dataField, $pathField, $uploadUrl, $md5Field } = lessCom.getUploadConfig()
const multiple = attrs['multiple'] == true || attrs['multiple'] == ''
const currShowInput = ref(false)
const fileList = ref<Array<any>>([])
const showVisible = ref(false)
const previewIndex = ref(0)
const fileUrl = ref()
const uploadLoading = ref(false)
const currUploadUrl = ref('')
const fileUpload = ref()
const currShowFileList = ref(props.showFileList)
if (multiple) {
    currShowFileList.value = true
}
function submitUpload() {
    fileUpload.value.submit();
}
function initFileUrl() {
    fileUrl.value = props.modelValue;
    if (fileUrl.value) {
        fileList.value = fileUrl.value.split(props.valueSeparator).map(ele => {
            return { name: ele, status: "success", url: ele }
        })
    }

}
function initUrl() {
    currUploadUrl.value = $uploadUrl
    if (props.url) {
        currUploadUrl.value = props.url;
    }
    if (props.resourceCode) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("ResourceCode", props.resourceCode)
    }
    if (props.restrictCode) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("RestrictCode", props.restrictCode)
    }
    if (props.picLimitType) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("ResourcePicLimitType", props.picLimitType)
    }
    if (props.picWidthLimit) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("ResourcePicWidth", props.picWidthLimit.toString())
    }
    if (props.picHeightLimit) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("ResourcePicHeight", props.picHeightLimit.toString())
    }
    if (props.isReturnSize) {
        currUploadUrl.value = currUploadUrl.value.addUrlParameter("IsReturnSize", "1")
    }
    currUploadUrl.value = currUploadUrl.value.setPowerPublicQuery()

}
function handleError(err, file) {
    ElNotification.warning({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: `<strong class="txt-red">${file.name}-文件上传失败</strong>`,
        duration: 3000
    });
    uploadLoading.value = false
    console.log(err)
}
function handleRemove(file) {
    fileList.value.remove(file)
    setFileUrl();
}
function handleSuccess(res, file, fileList) {
    if (res[apiConfig.$codeField] !== apiConfig.$success) {
        ElNotification.call({
            title: '文件上传失败',
            dangerouslyUseHTMLString: true,
            message: `<div><strong class="red">${file.name}-文件上传失败</strong></div><div>${res[apiConfig.$messageField]}</div>`,
            type: 'error',
            duration: 0
        });
        uploadLoading.value = false
        return;
    }
    let currUrl = ''
    let currRes = res[apiConfig.$dataField]
    if ($dataField) {
        currRes = res[apiConfig.$dataField][$dataField];
    }
    currUrl = currRes[$pathField]
    if (props.hasMd5Parameter) {
        currUrl = currUrl.addUrlParameter("Md5Value", currRes[$md5Field])
    }

    file.url = currUrl;
    setFileUrl();
    uploadLoading.value = false
    handleSortMutiPic();
    emits('uploaded', res)
    if (multiple) {
        if (fileList.length) {
            const isSuccess = fileList.map(ele => ele.status).every(ele => ele == 'success')
            if (isSuccess) {
                emits('completed', fileList.map(ele => ele.url).join(props.valueSeparator))
            }
        }

    }

}
function handleSortMutiPic() {
    if (props.type != UploadType.Pic && !multiple) { return; }
    new Sortable(fileUpload.value.$el.querySelector(".el-upload-list"), {
        handle: '.el-upload-list__item',
        draggable: '.el-upload-list__item', // 允许拖拽的项目类名
        // 拖拽中 回调函数
        onMove() {
            console.info("----PicDragMove----")

        },
        onStart() {
            console.info("----PicDragStart----")

        },
        // 拖拽结束，调整位置
        onEnd({ newIndex, oldIndex }) {
            console.info("----PicDragEnd---")
            if (newIndex !== undefined && oldIndex !== undefined) {
                const currRow = fileList.value.splice(oldIndex, 1)[0];
                fileList.value.splice(newIndex, 0, currRow);
                setFileUrl();
            }

        },
    })

}
function handleBeforeUpload(file) {
    var isLimit = false
    let currFileTypes = props.fileTypes;
    if (!currFileTypes && props.type == UploadType.Pic) {
        currFileTypes = "jpeg,gif,bmp,jpg,png,svga,svg,webp,bundle,tif,pag"
    }
    if (currFileTypes && currFileTypes != "*") {
        currFileTypes.split(',').forEach(ele => {
            if (file.name.indexOf(ele) > -1) {
                isLimit = true
            }
        })
    } else { isLimit = true; }

    if (!isLimit) {
        ElMessage.error(`上传图片格式错误!只能上传【${currFileTypes}】类型`);
        return false;
    }
    if (props.sizeLimit) {
        isLimit = file.size / 1024 / 1024 < props.sizeLimit;
    } else {
        isLimit = true;
    }
    if (!isLimit) {
        ElMessage.error('上传大小不能超过 ' + props.sizeLimit + 'MB!');
        return false
    }
    uploadLoading.value = true
    return true;
}
function handlePreview(file) {
    previewIndex.value = fileList.value.findIndex(ele => ele.url == file.url)
    showVisible.value = true;
}
function setFileUrl() {
    if (!fileList.value.length) {
        fileUrl.value = "";
    }

    if (!multiple) {
        let lastFile = fileList.value.filter(ele => ele.status == 'success').at(-1);
        if (lastFile) {
            fileUrl.value = lastFile.url
        }

        return
    }
    fileUrl.value = fileList.value.filter(ele => ele.status == 'success').map(ele => ele.url).join(props.valueSeparator)

}
function handleReturnResult() {
    if (!fileUrl.value) {
        fileUrl.value = ''
    }
    emits('update:modelValue', fileUrl.value)
}
const fontSize = parseFloat(props.width) / 3 + "px";



watch(fileUrl, () => {
    handleReturnResult()
}, { immediate: true })

watch(() => props.url, () => {
    initUrl()
}, { immediate: true })

onMounted(() => {
    currShowInput.value = props.showInput
    if (props.type == UploadType.File && !multiple) {
        currShowInput.value = true;
    }

    initFileUrl()
    initUrl()
})
defineExpose({
    submitUpload
})
</script>
<template>
    <div class="els_upload_container">
        <el-upload ref="fileUpload" v-model:file-list="fileList" :class="{ 'ele-uploader': type == UploadType.Pic }"
            :action="currUploadUrl" :on-success="handleSuccess" :on-error="handleError" :on-remove="handleRemove"
            :before-upload="handleBeforeUpload" :on-preview="handlePreview" :show-file-list="currShowFileList"
            :list-type="(type == UploadType.Pic && multiple) ? 'picture-card' : 'text'" :name="fileName"
            :disabled="uploadLoading" v-bind="attrs">
            <template #default>
                <el-input v-model.trim="fileUrl" :style="[{ width: inputWidth.appendPx() }, { 'margin-right': '10px' }]"
                    v-if="currShowInput == true && attrs['list-type'] != 'picture-card'" class="leo-upload-input" clearable
                    :placeholder="inputPlaceholder"></el-input>
                <slot name="default">
                    <template v-if="type == UploadType.Pic && !multiple">

                        <div class="els_upload_pic" :style="[{ width: width.appendPx() }, { height: height.appendPx() }]">
                            <el-icon v-if="!uploadLoading && !fileUrl" class="ele-uploader-icon"
                                :style="[{ 'font-size': fontSize }]">
                                <Plus />
                            </el-icon>
                            <el-progress type="circle" v-else-if="uploadLoading" :percentage="fileList.at(-1).percentage"
                                :style="[{ width: width.appendPx() }, { height: height.appendPx() }]"
                                v-if="fileList.at(-1).status != 'success'"></el-progress>

                            <template v-else-if="fileUrl" @mouseover="showMenus = true" @mouseout="showMenus = false">
                                <span class="elsupload-img"> <img :src="fileUrl" class="avatar" /></span>
                                <div class="els_upload-menus">
                                    <el-icon @click.stop="showVisible = true">
                                        <ZoomIn />
                                    </el-icon>
                                    <el-icon @click.stop="fileUrl = ''">
                                        <Delete />
                                    </el-icon>
                                </div>
                            </template>
                            <el-icon v-else class="ele-uploader-icon" :style="[{ 'font-size': fontSize }]">
                                <Plus />
                            </el-icon>
                        </div>

                    </template>
                    <template v-else-if="type == UploadType.File">
                        <template v-if="attrs['auto-upload'] !== false">
                            <el-button type="primary" :loading="uploadLoading" icon="UploadFilled">{{ uploadLoading ? "上传中"
                                : buttonLabel }}</el-button>
                        </template>
                        <template v-else>
                            <el-button type="primary" slot="trigger" :loading="uploadLoading" icon="UploadFilled">{{
                                uploadLoading ? "上传中" : "选择文件" }}</el-button>
                            <el-button style="margin-left: 10px;" type="success" icon="Select"
                                @click="submitUpload">确认上传</el-button>
                        </template>
                    </template>
                    <template v-else-if="type == UploadType.Pic && multiple">
                        <div class="els_upload_pic" :style="[{ width: width.appendPx() }, { height: height.appendPx() }]">
                            <el-icon :style="[{ 'font-size': fontSize }]">
                                <Plus />
                            </el-icon>
                        </div>

                    </template>
                </slot>
            </template>
            <template #trigger v-if="$slots['trigger']">
                <slot name="trigger"></slot>
            </template>
            <template #tip v-if="$slots['tip']">
                <slot name="tip"></slot>
            </template>
            <template #file="{ file }">

                <slot name="file" :file="file">

                    <div v-if="type == UploadType.Pic && multiple" class="els_upload_pic"
                        :style="[{ width: width.appendPx() }, { height: height.appendPx() }]">
                        <el-progress type="circle" :percentage="file.percentage"
                            :style="[{ width: width.appendPx() }, { height: height.appendPx() }]"
                            v-if="file.status != 'success'"></el-progress>
                        <template v-else>
                            <img class="els-upload-list__item-thumbnail" :width="width" :height="height" :src="file.url" />
                            <span class="els_upload-menus">
                                <el-icon @click="handlePreview(file)"><zoom-in /></el-icon>
                                <el-icon @click="handleRemove(file)">
                                    <Delete />
                                </el-icon>
                            </span>
                        </template>

                    </div>

                </slot>
            </template>
        </el-upload>
        <els-image-viewer v-if="showVisible && fileList.length" :url="fileList.map(ele => ele.url)"
            :initial-index="previewIndex" :hide-on-click-modal="true" @close="showVisible = false"></els-image-viewer>
    </div>
</template>
<style  lang="less">
.els_upload_container {

    .el-upload-list--picture-card {
        width: auto;
        height: auto;
        gap: 5px;

        .el-upload-list__item {
            width: auto;
            height: auto;
            margin: 0;
            border: none;
        }

        .els-upload-list__item-thumbnail {
            border-radius: 6px;
            object-fit: contain;
        }
    }

    .el-upload--picture-card {
        width: auto;
        height: auto;
        border: none;
    }

    .els_upload_pic {

        border: 1px dashed var(--el-border-color-darker);
        border-radius: 6px;
        box-sizing: border-box;

        cursor: pointer;
        vertical-align: top;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .el-progress-circle {
            height: auto !important;
            width: auto !important;
        }

        .elsupload-img {
            width: 100%;
            height: 100%;

            img {
                border-radius: 6px;
            }
        }

        .flex {
            display: flex;
        }

        .els_upload-menus {
            width: 100%;
            height: 100%;
            display: none;
            justify-content: space-evenly;
            align-items: center;
            border-radius: 6px;
            background-color: #00000080;
            position: absolute;
            font-size: 16px;

            .el-icon {
                color: #fff !important;
            }
        }
    }

    .els_upload_pic:hover {
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);

        .els_upload-menus {
            display: flex;
        }
    }

}</style>