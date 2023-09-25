<script setup lang="ts">
import { watch, reactive, provide } from 'vue'
import { ElMessage } from 'element-plus'
import lessCom from '../../utlis/lessCom.js'
const { $codeField, $messageField, $dataField, $success } = lessCom.getApiConfig()
defineOptions({
    name: 'ElsDropdown',
})
provide('type', 'dropdown')
interface Props {
    labelField?: string,
    valueField?: string,
    disabledField?: string,
    iconField?: string,
    url?: string,
    data?: Array<any>,
    title?: string,

}

const props = withDefaults(defineProps<Props>(), {
    labelField: 'label',
    valueField: 'value',
    disabledField: 'disabled',
    iconField: 'iconField',
    url: '',
})

const options = reactive<Array<Record<string, any>>>([])

watch(() => props.url, (val) => {
    if (val) {
        readData();
    }
}, { immediate: true })

watch(() => props.data, (val) => {
    options.length = 0;
    if (val) {
        options.push(...val)

    }
}, { immediate: true })

function readData() {
    let currUrl = props.url?.replacePowerUrl() ?? '';
    return new Promise((resolve, reject) => {
        currUrl.post({}).then(res => {
            if (res[$codeField] == $success) {
                options.length = 0;
                options.push(...res[$dataField])
            }
            else {
                ElMessage.error(res[$messageField])
            }
            resolve(true)
        }).catch(action => {
            reject(action)
        })
    })
}

</script>
<template>
    <el-dropdown>
        <slot>
            <span class="el-dropdown-link">
                {{ title }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
        </slot>
        <template #dropdown>
            <el-dropdown-menu>
                <template v-if="(url || data && data.length > 0 || options.length)">
                    <els-option type="dropdown" v-for="(item, index) in options" :key="index" :value="item[valueField]"
                        :icon="item[iconField]" :disabled="item[disabledField] === true" >
                        <slot name="item" :item="item">
                            {{ item[labelField] }}
                        </slot>
                    </els-option>
                </template>
                <template v-else>
                    <slot name="dropdown"></slot>
                </template>
            </el-dropdown-menu>
        </template>

    </el-dropdown>
</template>