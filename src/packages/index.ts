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


const components =[BbInput,BbSelect,BbRadio,BbRadioButton,BbOption,BbOptionGroup,BbRow,BbCol,BbForm,BbFormQuery,BbFormItem,BbCheckbox,BbCheckboxButton]


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