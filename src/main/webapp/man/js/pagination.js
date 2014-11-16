function gotoPage(pageNum){
  if (checkNUM(pageNum) == 0){
    pageNum = 1;
  }
  document.paginationForm.currPage.value = pageNum;
  document.getElementById('paginationForm').submit();
}

function gotoInputPage(){
  var inputPageNum = document.getElementById('inputPageNum').value;
  if (checkNUM(inputPageNum) == 0){
	alert('错误的分页数，请输入正确的数字');
	return false;
  }
  gotoPage(inputPageNum);
}