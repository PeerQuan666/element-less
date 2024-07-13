import '@vue/runtime-core'
declare module '@vue/runtime-core' {
    // GlobalComponents for Volar
    export interface GlobalComponents {
        ElsInput: typeof import('../')['ElInput']
    }
}