<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户管理</title>
<%@ include file="/WEB-INF/views/include.jsp"%>
<script type="text/javascript">
	
	/*保存用户*/
	function doSave() {
		if ($('#updateForm').form('validate')) {
			formSubmit("updateForm", null, null, true);
		}
	}
	
	
	function init() {
		 if(document.updateForm.status != null) {
			 document.updateForm.status.value = ${MANAGER_DETAIL.MStatus};
		 }
	}

</script>
</head>
<body onload="init()">
	<div class="form-container">
		<form id="updateForm" name="updateForm" method="post"
			action="${rootpath}/manager/edit.json">
			<input type="hidden" value="${MANAGER_DETAIL.MId}" name="Mid">
			<fieldset>
				<legend> 基本信息 </legend>
			  	<div>
					<label for="status">状态：<em>*</em></label>
						 <select id="status" name="MStatus">
						 <option value="0">启用</option>
						 <option value="1">停用</option>
						 </select>
					
				</div>	、
				</fieldset>

				<div class="buttonrow">
					<input class="submitbtn" type="button" value="保存"
						onclick="doSave();" />
					&nbsp;&nbsp;
					<input class="submitbtn" type="button" value="关闭"
						onClick="self.parent.closeCurrTab();" />
				</div>
			</form>
		</div>
	</body>
</html>