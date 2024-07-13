
import { withInstall } from 'element-plus/es/utils/index'

import TableColumn from './src/tableColumn.vue'
import ColumnBool from './src/tableColumnBool.vue'
import ColumnCheckbox from './src/tableColumnCheckbox.vue'
import ColumnEnum from './src/tableColumnEnum.vue'
import ColumnExpand from './src/tableColumnExpand.vue'
import ColumnHeader from './src/tableColumnHeader.vue'
import ColumnImage from './src/tableColumnImage.vue'
import ColumnOperate from './src/tableColumnOperate.vue'
import ColumnSelect from './src/tableColumnSelect.vue'

export const ElsColumn = withInstall(TableColumn)
export const ElsColumnBool = withInstall(ColumnBool)
export const ElsColumnCheckbox = withInstall(ColumnCheckbox)
export const ElsColumnEnum = withInstall(ColumnEnum)
export const ElsColumnExpand = withInstall(ColumnExpand)
export const ElsColumnHeader = withInstall(ColumnHeader)
export const ElsColumnImage = withInstall(ColumnImage)
export const ElsColumnOperate = withInstall(ColumnOperate)
export const ElsColumnSelect = withInstall(ColumnSelect)

export default ElsColumn

export * from './src/tableColumn'