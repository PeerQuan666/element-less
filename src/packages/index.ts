import {App} from 'vue'
// 导出所有组件
import ElsInput from './elementui/input'
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
import ElsColumn from './elementui/table-column'
import ElsColumnBool from './elementui/table-column-bool'
import ElsColumnCheckbox from './elementui/table-column-checkbox'
import ElsColumnEnum from './elementui/table-column-enum'
import ElsColumnExpand from './elementui/table-column-expand'
import ElsColumnHeader from './elementui/table-column-header'
import ElsColumnImage from './elementui/table-column-image'
import ElsColumnOperate from './elementui/table-column-operate'
import ElsColumnSelect from './elementui/table-column-select'


import ElsMenu from './elementui/menu'
import ElsMenuItem from './elementui/menu-item'
import ElsSubMenu from './elementui/menu-sub'

import ElsImage from './elementui/image'
import ElsImageViewer from './elementui/image-viewer'

import ElsMenuContext from './custom/menu-context'
import ElsMenuDropdown from './custom/menu-dropdown'
import ElsMenuTool from './custom/menu-tool'

import ElsAutocomplete from './elementui/autocomplete'
import ElsCascader from './elementui/cascader'
import ElsDialog from './elementui/dialog'
import ElsDatePicker from './elementui/date-picker'
import ElsDatePickerRange from './elementui/date-picker-range'

import ElsCollapseTransition from './elementui/collapse-transition'
import ElsDataModal from './custom/data-modal'
import ElsButtonSelect from './custom/button-select'
import ElsButtonSearch from './custom/button-search'
import ElsList from './custom/list'
import ElsTip from './custom/tip'

import ElsContainer from './elementui/Container'
const components =[
    ElsInput,
    ElsSelect,
    ElsRadio,ElsRadioButton,
    ElsCheckbox,ElsCheckboxButton,
    ElsOption,ElsOptionGroup,
    ElsRow,ElsCol,
    ElsForm,ElsFormQuery,ElsFormItem,
    ElsTable,ElsColumn,ElsColumnBool,ElsColumnCheckbox,ElsColumnEnum,ElsColumnExpand,ElsColumnHeader,ElsColumnImage,ElsColumnOperate,ElsColumnSelect,
    ElsImage,
    ElsImageViewer,
    ElsMenuContext,
    ElsMenuDropdown,
    ElsMenu,
    ElsMenuItem,
    ElsSubMenu,
    ElsAutocomplete,
    ElsCascader,
    ElsCollapseTransition,
    ElsDialog,
    ElsDataModal,
    ElsMenuTool,
    ElsButtonSearch,
    ElsButtonSelect,
    ElsList,
    ElsTip,
    ElsDatePicker,
    ElsDatePickerRange,
    ElsContainer

]


const ElementLess = {
    install(app:App) {
        components.forEach((item) => {
            app.component(item.name, item);
        });
    },
};
components.forEach((item) => {
    ElementLess[item.name]=item;
});

export  {ElementLess};