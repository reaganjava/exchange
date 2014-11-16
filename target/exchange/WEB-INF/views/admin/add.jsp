<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>管理员管理</title>
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
			action="${rootpath}/manager/add.json">
			
			<fieldset>
				<legend> 基本信息 </legend>
				<div>
					<label for="username"> 管理员名：<em>*</em>
					</label> <input name="MUsername" class="easyui-validatebox" type="text"
						required="true" />
				</div>
				
				<div>
					<label for="password"> 密码：<em>*</em>
					</label> <input name="MPassword" class="easyui-validatebox" type="text"
						required="true" />
				</div>
				
				<c:if test="${ROLE_LIST != null}">
			  	<div>
					<label for="role">所属角色：<em>*</em></label>
					
						 <select id="roleId" name="roleId">
						 <option value="0">请选择</option>
						 	<c:forEach var="role" items="${ROLE_LIST}">
						 		<option value="${role.RId }">${role.RName}</option>
						 	</c:forEach>
						 </select>
					
				</div>	、
				</c:if>
				<div>
					<label for="organization">所属机构：<em>*</em></label>
					
						 <select id="organizationId" name="organizationId">
						 <option value="0">请选择</option>
						 	<c:forEach var="organization" items="${ORGANIZATION_LIST}">
						 		<option value="${organization.OId}">${organization.OName}</option>
						 	</c:forEach>
						 </select>
					
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