<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>验证凭证号</title>
<%@ include file="/WEB-INF/views/include.jsp"%>
<script type="text/javascript">
	
	/*保存企业*/
	function doSave() {
		if ($('#updateForm').form('validate')) {
			formSubmit("updateForm", null, null, true);
		}
	}
	
	
</script>
</head>
<body>
	<div class="form-container">
		<form id="updateForm" name="updateForm" method="post"
			action="${rootpath}/voucher/verify.json">
			
			<fieldset>
				<legend>验证凭证</legend>
				<div>
					<label for="voucher"> 凭证号：<em>*</em>
					</label> <input name="voucher" class="easyui-validatebox" type="text"
						required="true" />
				</div>
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