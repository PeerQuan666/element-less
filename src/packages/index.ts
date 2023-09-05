import {App} from 'vue'
// 导出所有组件
import BbInput from './elementui/input'
import BbSelect from './elementui/select'
import BbRadio from './elementui/radio'
import BbCheckbox from './elementui/checkbox'
import BbCheckboxButton from './elementui/checkbox-button'
import BbRadioButton from './elementui/radio-button'
import BbOption from './elementui/option'
import BbOptionGroup from './elementui/option-group'

import BbRow from './elementui/row'
import BbCol from './elementui/col'

import BbForm from './elementui/form'
import BbFormQuery from './elementui/form-query'
import BbFormItem from './elementui/form-item'

import BbTable from './elementui/table'
import BbColumn from './elementui/table-column'
import BbColumnBool from './elementui/table-column-bool'
import BbColumnCheckbox from './elementui/table-column-checkbox'
import BbColumnEnum from './elementui/table-column-enum'
import BbColumnExpand from './elementui/table-column-expand'
import BbColumnHeader from './elementui/table-column-header'
import BbColumnImage from './elementui/table-column-image'
import BbColumnOperate from './elementui/table-column-operate'
import BbColumnSelect from './elementui/table-column-select'


const components =[
    BbInput,
    BbSelect,
    BbRadio,BbRadioButton,
    BbCheckbox,BbCheckboxButton,
    BbOption,BbOptionGroup,
    BbRow,BbCol,
    BbForm,BbFormQuery,BbFormItem,
    BbTable,BbColumn,BbColumnBool,BbColumnCheckbox,BbColumnEnum,BbColumnExpand,BbColumnHeader,BbColumnImage,BbColumnOperate,BbColumnSelect]


const BabyUI = {
    install(app:App) {
        components.forEach((item) => {
            app.component(item.name, item);
        });
    },
};
components.forEach((item) => {
    BabyUI[item.name]=item;
});

export  {BabyUI};