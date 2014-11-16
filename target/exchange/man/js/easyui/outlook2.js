/***********************************************************************

* 作者：疯狂秀才 QQ：1055818239
* 讨论群：112044258、32994605、36534121、56271061
* 创建日期：2011/1/17

* 广告：本人承接各类大中小型管理系统的软件的设计与开发，有需要的朋友联系我啦~~~~

**********************************************************/

$(function(){
	InitLeftMenu();
	tabClose();
	tabCloseEven();
})

//初始化左侧
function InitLeftMenu() {

	$('.easyui-accordion li a').click(function(){
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
	}).hover(function(){
		$(this).parent().addClass("hover");
	},function(){
		$(this).parent().removeClass("hover");
	});

}

//获取左侧导航的图标
function getIcon(menuid){
	var icon = 'icon ';
	$.each(_menus.menus, function(i, n) {
		 $.each(n.menus, function(j, o) {
		 	if(o.menuid==menuid){
				icon += o.icon;
			}
		 })
	})

	return icon;
}

function refreshTab(subtitle){
  if($('#tabs').tabs('exists',subtitle)){
    var currTab = $('#tabs').tabs('getTab',subtitle);;
    var url = $(currTab.panel('options').content).attr('src');
    $('#tabs').tabs('update',{
      tab:currTab,
      options:{
        content:createFrame(url,subtitle)
      }
    })
  }
}

function refreshCurrTab(){
	  var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		var subtitle = currTab.panel('options').title;
		$('#tabs').tabs('update',{
			tab:currTab,
			options:{
				content:createFrame(url,subtitle)
			}
		})
}

function closeCurrTab(){
  var currTab = $('#tabs').tabs('getSelected');
  var currtab_title = currTab.panel('options').title;
  $('#tabs').tabs('close',currtab_title);
}

function addTab(subtitle,url,icon,isSubmit){
	if(!$('#tabs').tabs('exists',subtitle)){
		$('#tabs').tabs('add',{
			title:subtitle,
			content:createFrame(url,subtitle),
			closable:true,
			cache:false,
			icon:icon
		});
	}else{
	  $('#tabs').tabs('select',subtitle);
	  refreshTab(subtitle);//点击菜单时刷新
	  if (isSubmit){
  	  var currTab = $('#tabs').tabs('getTab',subtitle);;
  	  $('#tabs').tabs('update',{
        tab:currTab,
        options:{
          content:createFrame(url,subtitle),
          cache:false
        }
      })
	  }
	}
	tabClose();
}

function createFrame(url,subtitle)
{
  //为url增加提交参数addTabFlag，说明当前请求是新打开的一个页签
  if (url.indexOf("?") >= 0){
    url = url + "&addTabFlag=1";
  }else{
    url = url + "?addTabFlag=1";
  }
  url = url+"&t="+Math.random();
	var s = '<iframe scrolling="auto" frameborder="0" name="'+subtitle+'" src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}

function tabClose()
{
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close',subtitle);
	})
	/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle =$(this).children(".tabs-closable").text();

		$('#mm').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}
//绑定右键菜单事件
function tabCloseEven()
{
	//刷新
	$('#mm-tabupdate').click(function(){
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		$('#tabs').tabs('update',{
			tab:currTab,
			options:{
				content:createFrame(url)
			}
		})
	})
	//关闭当前
	$('#mm-tabclose').click(function(){
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close',currtab_title);
	})
	//全部关闭
	$('#mm-tabcloseall').click(function(){
		$('.tabs-inner span').each(function(i,n){
			var t = $(n).text();
			$('#tabs').tabs('close',t);
		});
	});
	//关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function(){
		$('#mm-tabcloseright').click();
		$('#mm-tabcloseleft').click();
	});
	//关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		if(nextall.length==0){
			return false;
		}
		nextall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});
	//关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function(){
		var prevall = $('.tabs-selected').prevAll();
		if(prevall.length==0){
			return false;
		}
		prevall.each(function(i,n){
			var t=$('a:eq(0) span',$(n)).text();
			$('#tabs').tabs('close',t);
		});
		return false;
	});

	//退出
	$("#mm-exit").click(function(){
		$('#mm').menu('hide');
	})
}

