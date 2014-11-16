<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%> 
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>凭证管理系统管理员登录</title>
		<link href="${rootpath}/man/css/login.css"
			type="text/css" rel="stylesheet" charset="utf-8">
	</head>

	<body onload='setFocus()'>
		<div id="login">
			<div class="loginMain">
				<form name="login" method="post"
					action="${rootpath}/manager/center.html">
					<div class="LoginHead">
						<img
							src="${rootpath}/man/images/login_logo.gif"
							alt="MOPON" class="logo">
						<div class="LoginFrom">
							<div>
								<label for="user">
									管理员：
								</label>
								<input id="userName" name="username" size="30" class="loginInput">
							</div>
							<div>
								<label for="pass">
									密码：
								</label>
								<input type="password" name="password" size="30" class="loginInput">
							</div>
							
							<div class="tips">
								${errMsg}
							</div>
							<div class="buttonrow">
								<input class="submitbtn" type="submit" value="" />
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="footer">
				版权所有 &copy;&nbsp;&nbsp;2014
			</div>
		</div>
	</body>
</html>
<script> function setFocus() { document.getElementById('userName').focus(); } </script>
