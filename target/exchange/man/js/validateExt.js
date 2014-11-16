$.extend($.fn.validatebox.defaults.rules, {
    /* 实例 */
    minLength: {
        validator: function(value, param){
            return value.length >= param[0];
        },
        message: '至少{0}字符.'
    },
    
    /* 实例 */
    maxLength: {
        validator: function(value, param){
            return value.length <= param[0];
        },
        message: '不能超过{0}字符.'
    },
    
    /* 数字校验：number[min,max] */
    number: {
        validator: function(value, param){
            if(checkNUM(value) == 0) {
            	return false;
            }
            if(value < param[0] || value > param[1]) {
            	return false;
            }
            return true;
        },
        message: '请输入{0}~{1}的整数'
    },
    
    /* 数字校验2：isNumber */
    isNumber: {
        validator: function(value){
            if(checkNUM(value) == 0) {
            	return false;
            }
            return true;
        },
        message: '请输入整数'
    },
    
    /* 金额校验：amount[min,max] */
    amount: {
    	validator: function(value, param) {
        	 if (isAmount(value) == 0) {  
        	 		return false;
        	 }
            if(value < param[0] || value > param[1]) {
            	return false;
            }
            return true;
    	},
    	message: '请输入{0}~{1}的金额，不超过两位小数'
    },
    
    /* 金额校验：isAmount */
    isAmount: {
        validator: function(value){      
        	 if (isAmount(value) == 0) {  
        	 		return false;
        	 }
        	 return true;
        },
        message: '请输入金额，不超过两位小数'
    },
    
    /* 字符校验：string[min,max]*/
    string: {
        validator: function(value, param){
			var str = ATrim(value);
            if(str.length < param[0] || str.length > param[1]) {
            	return false;
            }
            return true;
        },
        message: '请输入{0}~{1}个字符'
    },
    
    /* 手机校验：mobile */
    mobile: {
        validator: function(value){
            return isMobile(value);
        },
        message: '手机格式不正确'
    },
    
    /* Email校验：email */
    email: {
        validator: function(value){
            return isEmail(value);
        },
        message: '邮箱格式不正确'
    },
    
    /* 金额校验：number[min,max] */
    money: {
        validator: function(value){
        	 var patrn = /^-?\d+\.{0,}\d{0,}$/;       
        	 if (!patrn.exec(value)) {  
        	 		return false;
        	 }
            return true;
        },
        message: '请正确输入金额'
    },
    /* 包含两位小数点的小数校验：floatNumber */
    floatNumber: {
        validator: function(value){
			// var regu = /(^([1-9]\d*|[0])\.\d{1,2}$|^[1-9]\d*$)/;
			var regu=/^\d+(\.\d{1,2})?$/ ;
			var re = new RegExp(regu);
			return re.test(value);
        },
        message: '请输入正确的折扣'
    },
    
    CHS: {  
        validator: function (value, param) {  
            return /^[\u0391-\uFFE5]+$/.test(value);  
        },  
        message: '请输入汉字'  
    },  
    ZIP: {  
        validator: function (value, param) {  
            return /^[1-9]\d{5}$/.test(value);  
        },  
        message: '邮政编码不存在'  
    },  
    QQ: {  
        validator: function (value, param) {  
            return /^[1-9]\d{4,10}$/.test(value);  
        },  
        message: 'QQ号码不正确'  
    },  
    mobile: {  
        validator: function (value, param) {  
            return /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/.test(value);  
        },  
        message: '手机号码不正确'  
    },  
    loginName: {  
        validator: function (value, param) {  
            return /^[\u0391-\uFFE5\w]+$/.test(value);  
        },  
        message: '登录名称只允许汉字、英文字母、数字及下划线。'  
    },  
    safepass: {  
        validator: function (value, param) {  
            return safePassword(value);  
        },  
        message: '密码由字母和数字组成，至少6位'  
    },  
    equalTo: {  
        validator: function (value, param) {  
            return value == $(param[0]).val();  
        },  
        message: '两次输入的字符不一至'  
    },  
    number: {  
        validator: function (value, param) {  
            return /^\d+$/.test(value);  
        },  
        message: '请输入数字'  
    },  
    idcard: {  
        validator: function (value, param) {  
            return idCard(value);  
        },  
        message:'请输入正确的身份证号码'  
    },  
    IP: {  
        validator: function (value, param) {  
            return /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/.test(value);  
        },  
        message: '请输入正确的IP地址'  
    }  
    
});