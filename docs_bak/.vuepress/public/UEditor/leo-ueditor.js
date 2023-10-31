
const leoUeditor = {
    name: 'LeoUeditor',
    template: `
            <vue-ueditor-wrap v-model="currValue"  @before-init="addXiumiDialog" :config="configData"></vue-ueditor-wrap>
        `
    ,
    props: {
        modelValue: {},
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: Number,
            default: 500
        },
        url: {
            type: String,
            default: "/UEditor/Upload"
        },
        resourceCode: {
            type: String,
            default: ""
        },
        restrictFileCode: {
            type: String,
            default: ""
        },
        restrictImgCode: {
            type: String,
            default: ""
        },
        restrictMediaCode: {
            type: String,
            default: ""
        },
        restrictRemoteImgCode: {
            type: String,
            default: ""
        },
        ueEditorHomeUrl: {
            type: String,
            default: "/UEditor/"
        },
        showXiumi: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currValue: '',
            configData: {
                serverUrl: '',
                initialFrameWidth: '',
                initialFrameHeight: 500,
                UEDITOR_HOME_URL:'/UEditor/',
            },
        }
    },
    watch: {
        currValue(val) {
            this.$emit("update:modelValue",val)
        },
    },
    created() {
        this.currValue = this.modelValue;
        this.configData.serverUrl = this.url.addUrlParameter("ResourceCode", this.resourceCode)
            .addUrlParameter("RestrictImgCode", this.restrictImgCode)
            .addUrlParameter("RestrictFileCode", this.restrictFileCode)
            .addUrlParameter("RestrictMediaCode", this.restrictMediaCode)
            .addUrlParameter("RestrictRemoteImgCode", this.restrictRemoteImgCode)
        this.configData.initialFrameWidth = this.width;
        this.configData.initialFrameHeight = this.height;
        this.configData["UEDITOR_HOME_URL"] = this.ueEditorHomeUrl

    },
    methods: {
        addXiumiDialog(editorId) {
            if (this.showXiumi) {
                window.UE.registerUI(
                    'xiumi-dialog',
                    (editor, uiName) => {
                        // 创建 “秀米弹窗”
                        const dialog = new window.UE.ui.Dialog({
                            // 注意：这是 xiumi-ue-dialog-v5.html 文件的访问链接，这个页面会通过 iframe 的方式嵌入到弹窗里
                            iframeUrl: '/UEditor/xiumi-ue-dialog-v5.html',
                            editor,
                            name: uiName,
                            title: '秀米图文消息助手',
                            cssRules: 'width: ' + (window.innerWidth - 60) + 'px; height: ' + (window.innerHeight - 60) + 'px;',
                        });

                        // 添加自定义按钮用于唤起“秀米弹窗”
                        const btn = new window.UE.ui.Button({
                            name: 'xiumi-connect',
                            title: '秀米',
                            cssRules: `background-image: url('//dl.xiumi.us/connect/ue/xiumi-connect-icon.png') !important; background-size: contain;`,
                            onclick() {
                                dialog.render();
                                dialog.open();
                            },
                        });

                        return btn;
                    },
                    0 /* 指定添加到工具栏上的那个位置，默认时追加到最后 */,
                    editorId /* 指定这个UI是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */
                );
            }

        },
    }
}
