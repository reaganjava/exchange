 function getCalTypeByChangeApp(calTypeId,appId){
				var calTypeObj = document.getElementById(calTypeId);
				calTypeObj.options.length=0;
				if(!appId||appId==''){
					calTypeObj.options.add(new Option('全部', ''));
					return;
				}
				
				 $.post('/manager/pub/index.do?tradeId=getCalTypeByChangeApp',{"appId":appId},function(responseText){
				 		var dataListStr = responseText;//根据appId 获取值
						var dataList = eval(dataListStr);
						calTypeObj.options.add(new Option('全部', ''));
						for(var j = 0; j < dataList.length; j++){
							calTypeObj.options.add(new Option(dataList[j].type_desc, dataList[j].cal_type_id));
						}
				 });
}


function getAppKeyByChangeClientId(appSelectId,clientValue){
				var clientIdSelect = document.getElementById(appSelectId);
				clientIdSelect.options.length=0;
				
				 $.post('/manager/pub/index.do?tradeId=getAppKeyByChangeClientId',{"clientId":clientValue},function(responseText){
				 		var dataListStr = responseText;//根据appId 获取值
						var dataList = eval(dataListStr);
						for(var j = 0; j < dataList.length; j++){
							clientIdSelect.options.add(new Option(dataList[j], dataList[j]));
						}
				 });
}
