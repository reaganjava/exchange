	
/*
 **************** 主要是验证那些必填项是否为空*******************
 *add by zhouqing 2013-9-23
 */

function checkNull(){
	var flag = true;
	$.each($("input[required]"),function(i,n){
		var $thisI = $("input[required]:eq("+i+")");
		var val = $thisI.val();
		var content = $thisI.prev("label").text();
		if(val=="" || val == null){
			flag = false;
			msgAlert('信息提示','"'+content+'"不能为空！','warning',null);
		}
	});
	return flag;
}
/**
 * 结算给商户的时候
 * 用于判断是否选择了一条记录，不能选择多条记录
 * @returns 所选择的记录ID
 */

function checkBoxDate() {
    	var items = document.getElementsByName("listCheckbox");  //获取name为channelName的一组元素(checkbox)
 		var sCheck = 0;
    	var str = '';
 		for(var i=0; i < items.length; i++){  //循环这组数据
 			if(items[i].checked){      //判断是否选中
 				sCheck++;
 				str += items[i].value + ",";  //把符合条件的 添加到str中
 			}
 		}
 		if(sCheck == 0 ){//目前只能选择一条记录
				$.messager.alert('提示', '请选择一条记录');
				return false;
			}
 		if(sCheck >= 2){//目前只能选择一条记录
			$.messager.alert('提示', '您只能选择一条记录');
			return false;
		}
 		str = str.substring(0,str.length-1)	; 
         return str;
     }

/**
 * 检查查询条件中的开始时间和结束时间
 * 开始时间不能大于结束时间
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @return true 检查通过 false 检查不通过
 */
function checkQueryTime(sTime,eTime){
	var startTime = parseInt($("#"+sTime).val()) ;
	var endTime = parseInt($("#"+eTime).val());
	if(startTime!="" && endTime!=""){
		if(startTime>endTime){
			$.messager.alert('提示',"开始时间不能大于结束时间！");
			return false;
		}
	}
	return true;
}
/**
 * 清空查询条件
 * formId 页面表单ID
 */
function clearForm(formId){
	  $('#'+formId).form("clear");
}
/*
 **************** 主要是去掉字符串最后一个,*******************
 *由于在拼接str时候，最后会多一个,
 *11,22,33,  返回：11,22,33
 *add by zhouqing 2013-9-23
 */
function setString(str){
	var len = str.length-2;alert(len);
	return str.substring(0,len);
}
/*
 **************** 表单异步提交*******************
 *formId 表单ID
 *url 地址
 *afterFun 保存成功之后的操作，用于关闭此页面，刷新列表页面
 *add by zhouqing 2013-10-28
 */
function formPost(formId,url,afterFun){
	var options = $("#"+formId).serialize();
	var isValid = $("#"+formId).form('validate');
		if (isValid) {		
			 $.post(url, options, function(data){
							 if(data.success){
								 	$.messager.alert('消息提示',data.msg,'info',afterFun);
								}else{
									$.messager.alert('消息提示',data.msg,'error');
								}
					   }); 
		}
}


