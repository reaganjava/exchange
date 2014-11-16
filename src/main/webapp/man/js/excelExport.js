
(function($) {
	$.excelExport = {
		
		exports : function(eid,name) {
			
			var rootElenent = $("#"+eid);
			var tables = rootElenent.find("table");
			
			var dataStr = "";
			
			for ( var int = 0; int < tables.length; int++) 
			{
				var $table = $(tables[int]);
				var trs = $table.find("tr");
				for ( var int2 = 0; int2 < trs.length; int2++) 
				{
					var rowStr = "";
					var $tr = $(trs[int2]);
					
					var ths = $tr.find("th");
					var tds = $tr.find("td");
					
					for ( var int3 = 0; int3 < ths.length; int3++) 
					{
						var $td = $(ths[int3]);
						var tdJson = "text="+$td.text()+"A~!@#";
						tdJson+="colspan="+$td.attr("colspan")+"A~!@#";
						tdJson+="rowspan="+$td.attr("rowspan")+"A~!@#";
						tdJson+="align="+ $td.attr("align")+"A~!@#";
						tdJson+="width="+ $td.width()+"A~!@#";
						tdJson+="height="+ $td.height();
						
						if(int3!=0)
						{
							rowStr+="D~!@#";
						}
						rowStr+=tdJson;
					}
					
					if(ths.length>0 && tds.length>0)
					{
						rowStr+="D~!@#";
					}
					
					for ( var int3 = 0; int3 < tds.length; int3++) 
					{
						var $td = $(tds[int3]);
						var tdJson = "text="+check($td.text())+"A~!@#";
						tdJson+="colspan="+$td.attr("colspan")+"A~!@#";
						tdJson+="rowspan="+$td.attr("rowspan")+"A~!@#";
						tdJson+="align="+ $td.attr("align")+"A~!@#";
						tdJson+="width="+ $td.width()+"A~!@#";
						tdJson+="height="+ $td.height();
						
						if(int3!=0)
						{
							rowStr+="D~!@#";
						}
						rowStr+=tdJson;
					}
					if(int2!=0)
					{
						dataStr+="R~!@#";
					}
					dataStr += rowStr;
				}
				dataStr+="R~!@#";
			}
			
			//创建iframe
			var iframe = document.frames('eeport'); 
			iframe.document.getElementById('name').value=name; 
			iframe.document.getElementById('data').value=dataStr;
			iframe.window.subForm();
		}
	};
})(jQuery);

function check(val)
{
	if(val==null) return " ";
	if(val == "") return " ";
    return val;	
}