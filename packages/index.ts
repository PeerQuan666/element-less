import { App } from 'vue'
import  './utils/lessPrototype'
import utils,{ElsMessage} from  './utils'

// 导出所有组件
import ElsInput from './elementui/input'
import ElsTextarea from './elementui/textarea'
import ElsInputRange from './elementui/input-range'
import ElsSelect from './elementui/select'
import ElsRadio from './elementui/radio'
import ElsCheckbox from './elementui/checkbox'
import ElsCheckboxButton from './elementui/checkbox-button'
import ElsRadioButton from './elementui/radio-button'
import ElsOption from './elementui/option'
import ElsOptionGroup from './elementui/option-group'
import ElsRow from './elementui/row'
import ElsCol from './elementui/col'
import ElsForm from './elementui/form'
import ElsFormQuery from './elementui/form-query'
import ElsFormItem from './elementui/form-item'
import ElsTable from './elementui/table'
import {ElsColumn,ElsColumnBool,ElsColumnCheckbox,ElsColumnEnum,ElsColumnExpand,ElsColumnHeader,ElsColumnImage,ElsColumnOperate,ElsColumnSelect} from './elementui/table-column'
import ElsTreeSelect from './elementui/tree-select'
import ElsTree from './elementui/tree'
import ElsMenu from './elementui/menu'
import ElsMenuItem from './elementui/menu-item'
import ElsSubMenu from './elementui/menu-sub'
import ElsSwitch from './elementui/switch'
import ElsImage from './elementui/image'
import ElsImageViewer from './elementui/image-viewer'
import ElsAutocomplete from './elementui/autocomplete'
import ElsCascader from './elementui/cascader'
import ElsCascaderPanel from './elementui/cascader-panel'
import ElsDialog from './elementui/dialog'
import ElsDrawer from './elementui/drawer'
import {ElsDropdown,ElsDropdownGroup} from './elementui/dropdown'
import ElsSlider from './elementui/slider'
import ElsInputNumber from './elementui/input-number'
import ElsUpload from './elementui/upload'
import ElsTimePicker from './elementui/time-picker'
import ElsTimePickerRange from './elementui/time-picker-range'
import ElsDatePicker from './elementui/date-picker'
import ElsDatePickerRange from './elementui/date-picker-range'
import ElsCollapseTransition from './elementui/collapse-transition'
import ElsTabs from './elementui/tabs'
import ElsColorPicker from './elementui/color-picker'

import ElsMenuContext from './custom/menu-context'
import ElsMenuDropdown from './custom/menu-dropdown'
import ElsMenuTool from './custom/menu-tool'
import ElsMdPreview from './custom/mdPreview'
import ElsCaption from './custom/caption'
import ElsDataModal from './custom/data-modal'
import ElsButtonSelect from './custom/button-select'
import ElsButtonSearch from './custom/button-search'
import ElsButtonExport from './custom/button-export'
import ElsList from './custom/list'
import ElsTip from './custom/tip'
import ElsFormNode from './custom/form-node'
import ElsDynamicDesigner from './custom/dynamic/designer'
import ElsDynamicRender from './custom/dynamic/render'

import ElsContainer from './custom/container'
import ElsDynamicDesignerView  from './custom/dynamic/designerView'

import ElsHighlight from './custom/highlight'
import ElsUEditor from './custom/uEditor'
import ElsAceEditor from './custom/aceEditor'
import ElsMdEditor from './custom/mdEditor'
import ElsWangEditor from './custom/wangEditor'
import ElsJsonViewer from './custom/jsonViewer'
import ElsJsonEditor from './custom/jsonEditor'
import ElsWorkPlan from './custom/workPlan'
import ElsCron from './custom/cron'
import ElsWorkFlow from './custom/workFlow'
import ElsStampBadge from './custom/stampBadge'


const components = [
    ElsInput,
    ElsSelect,
    ElsRadio, ElsRadioButton,
    ElsCheckbox, ElsCheckboxButton,
    ElsOption, ElsOptionGroup,
    ElsRow, ElsCol,
    ElsForm, ElsFormQuery, ElsFormItem,
    ElsTable, ElsColumn, ElsColumnBool, ElsColumnCheckbox, ElsColumnEnum, ElsColumnExpand, ElsColumnHeader, ElsColumnImage, ElsColumnOperate, ElsColumnSelect,
    ElsImage,
    ElsImageViewer,
    ElsMenu,
    ElsMenuItem,
    ElsSubMenu,
    ElsAutocomplete,
    ElsCascader,
    ElsCascaderPanel,
    ElsCollapseTransition,
    ElsDialog,
    ElsTimePicker,
    ElsTimePickerRange,
    ElsDatePicker,
    ElsDatePickerRange,
    ElsUpload,
    ElsTree,
    ElsTreeSelect,
    ElsInputRange,
    ElsTextarea,
    ElsDrawer,
    ElsDropdownGroup,
    ElsDropdown,
    ElsSlider,
    ElsSwitch,
    ElsTabs,
    ElsColorPicker,


    ElsDynamicDesigner,
    ElsMenuContext,
    ElsMenuDropdown,
    ElsDataModal,
    ElsMenuTool,
    ElsButtonExport,
    ElsButtonSearch,
    ElsButtonSelect,
    ElsList,
    ElsTip,
    ElsContainer,
    ElsCaption,
    ElsFormNode,
    ElsMdPreview,
    ElsUEditor,
    ElsDynamicRender,
    ElsInputNumber,
    ElsJsonViewer,
    ElsMdEditor,
    ElsAceEditor,
    ElsWangEditor,
    ElsDynamicDesignerView,
    ElsJsonEditor,
    ElsHighlight,
    ElsWorkPlan,
    ElsCron,
    ElsWorkFlow,
    ElsStampBadge
]


const ElementLess = {
    install(app: App) {
        components.forEach((item) => {
            if(item.name){
                app.component(item.name, item);
            }
        });
    },
    utlis:utils,
    message:ElsMessage

};
components.forEach((item) => {
    if(item.name){
        ElementLess[item.name]=item
    }
});

export * from './elementui/input'
export default ElementLess;