var deleteUrl = '';
var checkUrl = '';

jQuery(document).ready( function($) {
	// 信息列表滚动条控制
		$('.scrollTable table').tableScroll( {
			xScroll :true,
			width :'100%',
			theme :'line-blue'
		});

		// showSearchContainer
		$('#showSearchContainer').click( function() {
			$("#searchContainer").toggle();
			return false;
		});
	});

/**
 * queryForm提交submit
 * @return void
 */
function refreshList() {
	formQuery();
}




/**
 * deleteForm提交submit，删除选中记录
 * @return
 */
function deleteFormSubmit(url) {
	deleteUrl = url;
	msgConfirm("删除记录", "您确定要删除选中的记录吗？", doDelete);
}

/**
 * msgConfirm确认信息框回调删除操作
 * @param b 回调参数，true:选择确认 false：选择取消
 * @return
 */
function doDelete(b){
	if(!b) {
		return;
	}
	$.ajax({
        type: "GET",
        url: deleteUrl,
        dataType: "json",
        success: function(data){
        	if(data != null) {
        		msgAlert('消息提示',data.message,'info',null);
        	} else {
        		msgAlert('消息提示',"操作失败！ SESSION已过期，请重新登录！",'error',null);
        	}
        }
    });
}



/**
 * form提交ajax包装
 * @param formName 需要提交的form名称，必填
 * @param afterFunction 提交通讯成功后，被回调的函数
 * @param succsseMessage 自定义消息提示
 * @return
 */
function formSubmit(formName,afterFunction,succsseMessage,processStatus){
	var urlstr = $("#"+formName).attr("action");
	var options = {   
			beforeSubmit : function(){
	    		 if (processStatus){
	  					pop_waiting_info("请稍候...");
	 				 }
	    		 return true;
		    },
            url : urlstr,   
            iframe : false,
            success : function(data) {  
		    	if (processStatus){
		    		pop_waiting_close();
		    	}
				if(data.success==true){
					if(data.message==null){
						msgAlert('消息提示','操作成功','info',afterFunction);
					}else{
						msgAlert('消息提示',data.message,'info',afterFunction);	
					}
				}else{
					if(data.message==null){
						msgAlert('消息提示',"操作失败！ SESSION已过期，请重新登录！",'error',null);
					}else{
						msgAlert('消息提示',data.message,'error',null);
					}
				}
                
            }   
        };  
	formName = '#'+formName;
	$(formName).ajaxSubmit(options);   
}

/**
 * 私有方法
 * @return
 */
function nullCheck(){
  return true;
}

/**
 * 私有方法
 * @param data
 * @param tabName
 * @param notClose
 * @return
 */
function defaultSuccess(data,tabName, notClose){
  var ret = "FAIL";
  if (data == "OK") {
    ret = "OK";
    if (!isEmpty(tabName)){
      self.parent.refreshTab(tabName);
    }
    if (true != notClose){
      self.parent.closeCurrTab();
    }
  } else {
    showErrorInfomation(data);
  }
  return ret;
}
function defaultSuccessTip(data,tabName, notClose,params){
  var ret = "FAIL";
  if (data == "OK") {
    ret = "OK";
    msgAlert(params[0],params[1],'info', null);
    if (!isEmpty(tabName)){
      self.parent.refreshTab(tabName);
    }
    if (true != notClose){
      self.parent.closeCurrTab();
    }
  } else {
    showErrorInfomation(data);
  }
  return ret;
}
/**
 * 提示ajax返回的错误信息。
 * 如果返回的是错误页面，跳转到错误页面；
 * 如果不是错误页面，无回调函数的，提示返回内容；否则调用回调函数
 * @param data 返回内容
 * @param fn 非错误页面时回调的函数。函数形式：fn(data)
 * @return
 */
function showErrorInfomation(data, fn){
  if (isEmpty(data)){
    msgAlert('操作失败',data,'info', null);
  }else if (data.indexOf("<input type='hidden' name='ajax_respone_ctrl' />") < 0){
    if (fn == null){
      msgAlert('操作失败',data,'info', null);
    }else{
    	var temp = [data];
      fn.apply(window,temp);
    }
  }else{
    document.write(data);
  }
}

/**
 * 清空查询表单
 */
function queryFormClear() {
	$('#queryForm').form('clear');
	$('#queryFormTradeId').val("manMerchantList");
	$('#tmpCurrPage').val('1');
}

/*ajaxPost提交*/
function ajaxPost(url,param,callBackFun){
	if(!param){
		param = {};
	}
  $.post(url,param,function(data){
 		if (callBackFun instanceof Function){
 			callBackFun.call(this,data);
 		}
  });
}

/*ajaxGet提交*/
function ajaxGet(url,param,callBackFun){
	if(!param){
		param = {};
	}
  $.get(url,param,function(data){
 		if (callBackFun instanceof Function){
 			callBackFun.call(this,data);
 		}
  });
}

function formQuery() {
	$('#ifExport').val('false');
	$('#queryForm').submit();
}
function formExport() {
	$('#ifExport').val('true');
	$('#queryForm').submit();
}