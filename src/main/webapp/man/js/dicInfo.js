	
/*
 **************** 主要是异步获取数据字典*******************
 *add by zhouqing 2013-9-23
 */

	/**
	*异步获取数据字典，查询的时候，把值回显到该选择项
	*id:该列的ID
	*keys：该数据字典的key
	*values：该列之前选择的值
	*/
	function setDicInfo(url, id, keys, values){
		$("#"+id).append("<option value=''>全部</option>");
		$.get(url, {key:keys},function (r) {
            for (var i = 0; i < r.length; i++) {
            	if(values == r[i].value){//查询之后默认给页面回显
        			$("#"+id).append("<option value='" + r[i].value + "' selected='selected'>" + r[i].valueDesc + "</option>");
        		}else{
        			$("#"+id).append("<option value='" + r[i].value + "'>" + r[i].valueDesc + "</option>");
        		}
            }
        });
	}
  	
	/**
	*异步获取渠道信息，查询的时候，把值回显到该选择项
	*id:该列的ID
	*keys：该数据字典的key
	*values：该列之前选择的值
	*/
	function setChanneInfo(url, id, keys, values){
		
		$("#"+id).append("<option value=''>全部</option>");
		$.get(url, {key:keys},function (r) {
            for (var i = 0; i < r.length; i++) {
            	if(values == r[i].channelID){//查询之后默认给页面回显
        			$("#"+id).append("<option value='" + r[i].channelID + "' selected='selected'>" + r[i].channelName + "</option>");
        		}else{
        			 $("#"+id).append("<option value='" + r[i].channelID + "'>" + r[i].channelName + "</option>");
        		}
            }
        });
	}
	
	
	/**
	* 报表导出功能
	*url:处理的controller
	*/
	 function formExport( url){ 
		//开始时间不能大于结束时间
		if(checkQueryTime("startTime","endTime")){
			$('#queryForm').attr("target", "_blank");
			$('#queryForm').attr("action", url).submit();
		}
  	 }
	