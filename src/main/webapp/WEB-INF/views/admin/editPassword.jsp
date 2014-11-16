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

</script>
</head>
<body>
	<div class="form-container">
		<form id="updateForm" name="updateForm" method="post"
			action="${rootpath}/manager/editPwd.json">
			<fieldset>
				<legend> 基本信息 </legend>
				<div>
					<label for="password"> 旧密码：<em>*</em>
					</label> <input name="oldPassword" class="easyui-validatebox" type="text" 
					required="true" />
				</div>
				
				<div>
					<label for="newPassword"> 新密码：<em>*</em>
					</label> <input id="newPassword" name="newPassword" class="easyui-validatebox" type="text"
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