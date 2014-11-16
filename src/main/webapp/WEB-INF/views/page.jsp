<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<p>&nbsp;</p>
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td colspan="4">			
					<div align="center" >
							<a class="button_link" href="1.html" id="firstPage" title="First Page">&laquo; 首页</a>
							<a class="button_link" href="${PAGE_BEAN.currentPage-1<1?1:PAGE_BEAN.currentPage-1}.html" id="previousPage" title="Previous Page">&laquo; 前一页</a> 
							
							第 ${pages.pageNo} 页
							<a PAGE_BEAN="button_link" href="${PAGE_BEAN.currentPage+1}.html" id="nextPage" title="Next Page"><c:if test="${PAGE_BEAN.currentPage<PAGE_BEAN.pageCount}">后一页 &raquo;</c:if></a>
							<a class="button_link" href="${PAGE_BEAN.pageCount==0?1:PAGE_BEAN.pageCount}.html" id="endPage" title="Last Page">末页 &raquo;</a>
							共${PAGE_BEAN.recordCount} 记录
							共${PAGE_BEAN.pageCount}页
					</div>
				</td>
		</tr>
	</table>