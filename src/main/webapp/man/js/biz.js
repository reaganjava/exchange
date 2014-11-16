	/**
	应用平台改变后重新加载结算方式下拉列表框
	@param: appId 应用平台ID
	@param: toObjName 下级选择框组件ID
		*/	
	function getCalTypeListByAppId(appId, toObjName){
		$.post('/manager/pub/channel/select.do?tradeId=getCalTypeListByAppId',{"appId":appId},function(responseText){
				var obj = document.getElementById(toObjName);
				var len = obj.options.length;
				for(var i = len-1; i >= 1; i--){
					obj.removeChild(obj.options[i]);
				}
				var list = eval(responseText);
				for(var j = 0; j < list.length; j++){
					obj.options.add(new Option(list[j].cal_type_name, list[j].cal_type_id));
				}
			}
		);
	}
	
	

	function addRow(){
	  	var table=document.getElementById("carcSeqTable");
	  	var rowlen=table.rows.length;
	    var collen=table.rows[0].cells.length;
	    var newRow=table.insertRow(rowlen);
	    for(var i=0;i<collen;i++){
	    var inText;
	    	if(i==0){
	    			inText="<td><input name=\"card_seq_start\" class=\"easyui-validatebox\" required=\"true\" type=\"text\" value=\"\" /></td>";
	    		}else if(i==1){
	    				inText="<td ><input name=\"card_seq_end\" class=\"easyui-validatebox\" required=\"true\" type=\"text\" value=\"\" /></td>";
	    			}else if(i==2){
	    					inText="<td><a href=\"#\" onclick=\"delRow(this.parentNode.parentNode)\">删除</a></td>";
	    		}
		     var newTd=document.createElement("td");
		     newTd.innerHTML=inText;
		     newRow.appendChild(newTd);
		   }
		   $.parser.parse(table);
	  }

	   
	   function addRowByParam(paramStart,paramEnd){
		  	var table=document.getElementById("carcSeqTable");
		  	var rowlen=table.rows.length;
		    var collen=table.rows[0].cells.length;
		    var newRow=table.insertRow(rowlen);
		    for(var i=0;i<collen;i++){
			    var inText;
			    if(i==0){
			    	inText="<td><input  name=\"card_seq_start\" class=\"easyui-validatebox\" required=\"true\" type=\"text\" value=\""+paramStart+"\" /></td>";
			    }else if(i==1){
			    	inText="<td ><input name=\"card_seq_end\" class=\"easyui-validatebox\" required=\"true\" type=\"text\" value=\""+paramEnd+"\" /></td>";
			    }else if(i==2){
			    	inText="<td><a href=\"#\" onclick=\"delRow(this.parentNode.parentNode)\">删除</a></td>";
			    }
				var newTd=document.createElement("td");
				newTd.innerHTML=inText;
				newRow.appendChild(newTd);
		   }
		  $.parser.parse(table);
	   }
		  
	function delRow(tr){
		var index=tr.rowIndex;
		document.getElementById("carcSeqTable").deleteRow(index);
	}
