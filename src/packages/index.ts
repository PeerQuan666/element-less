import {App} from 'vue'
// 导出所有组件
import BbSelect from './elementui/select'
import BbRadio from './elementui/radio'
import BbRadioButton from './elementui/radio-button'
import BbOption from './elementui/option'
import BbOptionGroup from './elementui/option-group'
import BbForm from './elementui/form'
import BbFormQuery from './elementui/form-query'
import BbFormItem from './elementui/form-item'


const components =[BbSelect,BbRadio,BbRadioButton,BbOption,BbOptionGroup,BbForm,BbFormQuery,BbFormItem]


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