
export enum ValueType {
    Auto = '',
    String='string',
    Number='number',
}

  
  export enum QueryMethod {
    Equal='Equal',
    GreaterThan='GreaterThan',
    GreaterThanOrEqual='GreaterThanOrEqual',
    LessThan='LessThan',
    LessThanOrEqual='LessThanOrEqual',
    NotEqual='NotEqual',
    StartsWith='StartsWith',
    EndsWith='EndsWith',
    Contains='Contains',
    Like='Like',
    StdIn='StdIn',
    In='In',
    ORLike='ORLike',
    NoAuto='NoAuto'
}  

export enum QueryDataType {
    String='String',
    Int='Int',
    Guid='Guid',
    Date='Date',
    Object='Object',
    TimeStamp='TimeStamp',
    SecondStamp='SecondStamp',
}  