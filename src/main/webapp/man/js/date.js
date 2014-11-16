/**
 * 获取当前日期
 * @return
 */
function getNowDate(){
	var today = new Date();
	var vYear = today.getFullYear();
	var vMon = today.getMonth() + 1;
	var vDay = today.getDate();
	var now_date =vYear+(vMon<10 ? "0" + vMon : vMon)+(vDay<10 ? "0"+ vDay : vDay);
	return now_date;
}

/**
 * 检查查询条件中的开始时间和结束时间
 * 开始时间、结束时间不能大于当前时间，开始时间不能大于结束时间
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @return true 检查通过 false 检查不通过
 */
function checkTime(startTime,endTime){
	var nowDate = getNowDate();

	if(startTime!=""){
		if(startTime>nowDate){
			alert("增加时间开始时间不能大于当前时间！");
			return false;
		}
	}
	if(endTime!=""){
		if(endTime>nowDate){
			alert("增加时间结束时间不能大于当前时间！");
			return false;
		}
	}
	if(startTime!="" && endTime!=""){
		if(startTime>endTime){
			alert("增加时间的开始时间不能大于结束时间！");
			return false;
		}
	}
	return true;
}

