
//是否是数字格式的字符串
function isDigit(str)
{
    return /^\d+$/.test(str);
}

//是否是整数
function isInt(str)
{
    return /^[+-]?\d+$/.test(str);
}

//是否是浮点数
function isFloat(str)
{
   return /^[+-]?(0\.\d+|0|[1-9]\d*(\.\d+)?)$/.test(str);
}

