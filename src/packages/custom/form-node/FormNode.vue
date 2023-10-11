<script setup lang="ts">
import { ref, inject, useAttrs } from 'vue'
import { FormItemProps } from '../../utlis/interfaceCom'
defineOptions({ name: "ElsFormNode" })

const props = defineProps<FormItemProps>()
const hasForm = ref(false)
const container = inject<string>('container','')

if (container == 'form') {
    hasForm.value = true
}
const attrs = useAttrs()

</script>
<template >
    <els-form-item v-if="hasForm" v-bind="props">
        <slot v-bind="attrs"></slot>
    </els-form-item>
    <slot v-bind="attrs" v-else></slot>
</template>
