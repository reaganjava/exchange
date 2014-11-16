// JavaScript Document
(function($){
	$.fn.tableScroll = function(options){
		var cfg = $.extend({
			xScroll:	false,
			yScroll:	false,
			width:	'auto',
			height:	'auto',
			theme:	'line-blue'
		},options);
		
		return this.each(function(i){
			var $this = $(this);
			var _this = this;

			//计算表格宽度
			var ownWidth = 0;
			$(this).find("th").each(function(){
				ownWidth += parseInt($(this).attr("width"));							 
			});
			
			//获取父级容器的宽度
			var pWidth = $(this).parent().width();

			
			//滚动条样式
			var theme = {
						'gray':'scrollbar-3dlight-color:#999; scrollbar-arrow-color:#FFFFFF; scrollbar-base-color:#CFCFCF; scrollbar-darkshadow-color:#FFFFFF; scrollbar-face-color:#CFCFCF; scrollbar-highlight-color:#FFFFFF; scrollbar-shadow-color:#999',
						'line-blue':'scrollbar-3dlight-color:#96beea; scrollbar-arrow-color:#6ea3df; scrollbar-base-color:#b1d4fd; scrollbar-darkshadow-color:#fff; scrollbar-face-color:#b1d4fd; scrollbar-highlight-color:#fff; scrollbar-shadow-color:#96beea'
						};
			
			//构造包含table的div
			var _div = $('<div style="'+theme[cfg.theme]+'"></div>').css({
						'width':cfg.width,
						'height':cfg.height,
						'zoom':1,
						'clear':'both',
						'oveflow':'hidden',
						//'overflow-y':function(){return cfg.yScroll?'scroll':'auto';},
						'overflow-x':function(){
										var _srcoll = cfg.xScroll?'scroll':'auto';
										if(ownWidth < pWidth){
											_srcoll = 'auto';	
											$this.css({'width':'100%'});
										}else{
											_srcoll = 'scroll';
										}
										return _srcoll;
									}
					});	
						
			$this.css({'width':ownWidth+'px'}).wrap(_div); 
	
		});
	}
})(jQuery);
