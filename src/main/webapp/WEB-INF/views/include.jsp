<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="${rootpath}/man/js/jquery/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="${rootpath}/man/css/pagination.css"  charset="utf-8" />
<link rel="stylesheet" type="text/css" href="${rootpath}/man/css/basic.css" charset="utf-8" />
<link rel="stylesheet" type="text/css" href="${rootpath}/man/css/detailPage.css" charset="utf-8" />
<link rel="stylesheet" type="text/css" href="${rootpath}/man/css/dataList.css" charset="utf-8" />
<link rel="stylesheet" type="text/css" href="${rootpath}/man/css/error.css" charset="utf-8" />
<link rel="stylesheet" type="text/css" href="${rootpath}/man/css/tablecloth/tablecloth.css" charset="utf-8" />

<script type="text/javascript" src='${rootpath}/man/js/pagination.js'> </script>
<script type="text/javascript" src='${rootpath}/man/js/check.js'> </script>

<script type="text/javascript" src='${rootpath}/man/js/jquery/jquery-1.7.2.min.js'> </script>
<script type="text/javascript" src="${rootpath}/man/js/jquery-easyui-1.3.3/jquery.easyui.min.js" charset="utf-8"></script>
<script type="text/javascript" src="${rootpath}/man/js/jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js" charset="utf-8"></script>
<link rel="stylesheet" href="${rootpath}/man/js/jquery-easyui-1.3.3/themes/bootstrap/easyui.css" type="text/css">
<script type="text/javascript" src="${rootpath}/man/js/jquery-easyui-1.3.3/extEasyUI.js?v=201305241044" charset="utf-8"></script>

<link rel="stylesheet" href="${rootpath}/man/js/jquery-easyui-1.3.3/extEasyUIIcon.css?v=201305301906" type="text/css">

<script type="text/javascript" src="${rootpath}/man/js/jquery-easyui-1.3.3/extJquery.js?v=201305301341" charset="utf-8"></script>


<script type="text/javascript" src='${rootpath}/man/js/jquery/jQuery.tableScroll.js'> </script>
<script type="text/javascript" src='${rootpath}/man/js/jquery/jqueryform.js'> </script>
<script type="text/javascript" src='${rootpath}/man/js/jquery/ajaxupload.js'> </script>
<script type="text/javascript" src='${rootpath}/man/js/cm_DatePicker/WdatePicker.js'></script>
<script type="text/javascript" src='${rootpath}/man/js/listPage.js'></script>
<script type="text/javascript" src="${rootpath}/man/js/easyui/dialog.js"></script>
<script type="text/javascript" src="${rootpath}/man/js/validateExt.js"></script>
<script type="text/javascript" src="${rootpath}/man/js/cm_ajax.js"></script>
<script type="text/javascript" src="${rootpath}/man/css/tablecloth/tablecloth.js"></script>
<script type="text/javascript" src="${rootpath}/man/js/biz.js"></script>
<script type="text/javascript" src="${rootpath}/man/js/autoCompletion.js"></script>
<script type="text/javascript" src="${rootpath}/man/js/date.js"></script>
<script type="text/javascript" src="${rootpath}/man/js/util.js"></script>

<script type="text/javascript" src='${rootpath}/man/js/checkIsNull.js'> </script>
<script type="text/javascript" src='${rootpath}/man/js/dicInfo.js'> </script>

<script type="text/javascript" src='${rootpath}/man/js/ctablehead.js'> </script>
<%-- <script type="text/javascript" src='${rootpath}/man/js/public.js'> </script> --%>
<link rel="stylesheet" type="text/css" href="${rootpath}/man/css/ctab.css" charset="utf-8" />

<script type="text/javascript">

function inputNoEnter(){
  $("input[type=text]").not("#inputPageNum").keydown(function(event){if(event.keyCode==13){return false;}});
}
$(document).ready(function(){
  inputNoEnter();
});
var autoNumber =20;
</script>