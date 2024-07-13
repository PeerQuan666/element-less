
export type DynamicComponentGroup = 'Form' | 'Show' | 'Container'
export type QueryDataType = 'String' | 'Int' | 'Guid' | 'Date' | 'Object' | 'TimeStamp' | 'SecondStamp'
export type QueryMethod = 'Equal' | 'GreaterThan' | 'GreaterThanOrEqual' | 'LessThan' | 'LessThanOrEqual' | 'NotEqual' | 'StartsWith' | 'EndsWith' | 'Contains' | 'Like' | 'StdIn' | 'in' | 'ORLike' | 'NoAuto'

export type UploadType = 'Pic' | 'File' | 'MutiPic'
export type ValidTriggerType = 'blur' | 'change'
export type ValidType = 'Number' | 'Float' | 'Price' | 'Date' | 'Datetime' | 'Time' | 'Url' | 'Email' | 'Phone' | 'Character'

export type ValueType = 'String' | 'Number' | 'Bool'

export type ChildType = 'input' | 'picker'
export type TipPosition = 'left' | 'right'
export type SpaceSize = 'default' | 'small' | 'large'

export type ColumnType = 'default' | 'selection' | 'index' | 'expand' | 'bool' | 'enum' | 'image' | 'operate' | 'select'
export type SortExpress = 'desc' | 'asc'