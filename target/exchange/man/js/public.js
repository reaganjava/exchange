
/**
 * common javascript
 * 
 * 2008.11.04 增加  stringBuffer
 */
 
var isMinNS5 = (navigator.appName.indexOf("Netscape") >= 0 &&parseFloat(navigator.appVersion) >= 5) ? 1 : 0;
		
		if (isMinNS5){
		HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode){
		 switch (where){
		 case 'beforeBegin':
		  this.parentNode.insertBefore(parsedNode,this)
		  break;
		 case 'afterBegin':
		  this.insertBefore(parsedNode,this.firstChild);
		  break;
		 case 'beforeEnd':
		  this.appendChild(parsedNode);
		  break;
		 case 'afterEnd':
		  if(this.nextSibling){
		   this.parentNode.insertBefore(parsedNode,this.nextSibling);
		  }
		  else{
		   this.parentNode.appendChild(parsedNode)
		  }
		 break;
		 }
		}
		HTMLElement.prototype.insertAdjacentHTML = function(where,htmlStr){
		 var r = this.ownerDocument.createRange();
		 r.setStartBefore(this);
		 var parsedHTML = r.createContextualFragment(htmlStr);
		 this.appendChild(parsedHTML)
		}
		HTMLElement.prototype.insertAdjacentText = function(where,txtStr){
		 var parsedText = document.createTextNode(txtStr)
		 this.insertAdjacentElement(where,parsedText)
		}
		HTMLElement.prototype.__defineGetter__
		(
		 "innerText",
		 function(){
		  var anyString = "";
		  var childS = this.childNodes;
		  for(var i=0; i<childS.length; i++){
		   if(childS[i].nodeType==1)
		    anyString += childS[i].tagName=="BR" ? '\n' : childS[i].innerText;
		   else if(childS[i].nodeType==3)
		    anyString += childS[i].nodeValue;
		  }
		
		  return anyString;
		 }
		);
		}

 
SPLITER = ",";   //default splitor
/**
 *get radio box value
 */
function getRadioCheckedValue(radio) {
	if (radio != null) {
		if (radio.length == null) {
			if (radio.checked) {
				return radio.value;
			}
		}
		for (var i = 0; i < radio.length; i++) {
			if (radio[i].checked) {
				return radio[i].value;
			}
		}
	}
	return "";
}
/**
 * replace string
 */
function replace(str, sourstr, desstr) {
	var re = new RegExp(sourstr, "gi");
	var result = str.replace(re, desstr);
	return result;
}
/**
 * calculate string length, cn_zh as 2
 */
function strlen(str) {
	var ilen = 0;
	try {
		for (i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) < 0 || str.charCodeAt(i) > 127) {
				ilen += 2;
			} else {
				ilen++;
			}
		}
	}
	catch (e) {
		alert("\u5728\u65b9\u6cd5strlen()\u4e2d\u629b\u51fa\u5f02\u5e38\n\u5f02\u5e38\u5185\u5bb9:" + e.description);
	}
	return ilen;
}
/* get time duration (YYYY-MM-DD) return days */
function compareDate(asStartDate, asEndDate) {
	var miStart = Date.parse(asStartDate.replace(/\-/g, "/"));
	var miEnd = Date.parse(asEndDate.replace(/\-/g, "/"));
	return (miEnd - miStart) / (1000 * 24 * 3600);
}
/* get days of a month */
function getDayNum(aiYear, aiMonth) {
	var loDay = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (aiYear % 4 == 0) {
		loDay[2] = 29;
	}
	return loDay[aiMonth];
}
function initArray() {
	this.length = initArray.arguments.length;
	for (var i = 0; i < this.length; i++) {
		this[i + 1] = initArray.arguments[i];
	}
}
/**
*get today in format yyyy-MM-dd Wday
*/
function getDateDescription() {
	today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	var timeValue = "<FONT COLOR=black>" + ((hours > 12) ? hours - 12 : hours);
	timeValue += ((minutes < 10) ? "<BLINK><FONT COLOR=black>:</FONT></BLINK>0" : "<BLINK><FONT COLOR=black>:</FONT></BLINK>") + minutes + "</FONT></FONT>";
	timeValue += (hours >= 12) ? "<FONT COLOR=blue><I><B>pm</B></I></FONT>" : "<FONT COLOR=blue><B><I>am</I></B></FONT>";
	var d = new initArray("<font color='#ffffff'>\u661f\u671f\u65e5", "<font color='#ffffff'>\u661f\u671f\u4e00", "<font color='#ffffff'>\u661f\u671f\u4e8c", "<font color='#ffffff'>\u661f\u671f\u4e09", "<font color='#ffffff'>\u661f\u671f\u56db", "<font color='#ffffff'>\u661f\u671f\u4e94", "<font color='#ffffff'>\u661f\u671f\u516d");
	document.write("<font color='#ffffff'>", today.getYear(), "<font color='#ffffff'>\u5e74", "<font color='#ffffff'>", today.getMonth() + 1, "<font color='#ffffff'>\u6708", "<font color='#ffffff'>", today.getDate(), "<font color='#ffffff'>\u65e5 </FONT>", d[today.getDay() + 1]);
}
/**
*get today in format yyyy-MM-dd Wday
*/
function getDateDescription2() {
	var date = new Date();
	var week = new Array("\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d");
	var time = date.getYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + week[date.getDay()];
	return time;
}
function trim(str) {
	var strResult = str;
	while (strResult.charAt(0) == " ") {
		strResult = strResult.substring(1, strResult.length);
	}
	while (strResult.charAt(strResult.length - 1) == " ") {
		strResult = strResult.substring(0, strResult.length - 1);
	}
	return strResult;
}
function selectAll(checkbox, checked) {
	if (checkbox == null) {
		return;
	}
	var checkCount = checkbox.length;
	if (checkbox != null && checkCount == null) {
		checkbox.checked = checked;
	} else {
		for (i = 0; i < checkCount; i++) {
			checkbox[i].checked = checked;
		}
	}
}
function getSelected(checkbox, split) {
	if (split == null) {
		split = SPLITER;
	}
	var checkCount = checkbox.length;
	if (checkbox != null && checkCount == null) {
		//alert("只有一个checkbox!");
		if (checkbox.checked && trim(checkbox.value) != "") {
			return checkbox.value;
		} else {
			return "";
		}
	}
	var checkedList = "";
	for (i = 0; i < checkCount; i++) {
		if (checkbox[i].checked && trim(checkbox[i].value) != "") {
			checkedList += checkbox[i].value + split;
		}
	}
	if (checkedList.length != 0) {
		checkedList = checkedList.substring(0, checkedList.length - 1);
	}
	return checkedList;
}
function addOptions(fromList, toList) {
    //alert(deptList.value);
	var dept = fromList.value;
	if (dept == null || dept == "") {
		alert("\u672a\u9009\u4e2d\u9700\u8981\u79fb\u52a8\u7684\u9009\u9879!");
	} else {
		for (var i = fromList.length - 1; i >= 0; i--) {
			if (fromList.options[i].selected) {
				toList.options.length++;
				toList.options[toList.options.length - 1].value = fromList.options[i].value;
				toList.options[toList.options.length - 1].text = fromList.options[i].text;
				for (j = i; j < fromList.options.length - 1; j++) {
					fromList.options[j].value = fromList.options[j + 1].value;
					fromList.options[j].text = fromList.options[j + 1].text;
				}
				fromList.length--;
                //i++;
			}
		}
	}
}
/**
 * hide or show
 */
function spread(imgflag, obj) {
	if (obj.style.display == "none") {
		obj.style.display = "";
		imgflag.src = "public/images/common/minus.gif";
	} else {
		obj.style.display = "none";
		imgflag.src = "public/images/common/plus.gif";
	}
}
/**hide or show */
function setDisplay(obj, mode) {
	if (mode == 0) {
		obj.style.display = "none";
	} else {
		obj.style.display = "block";
	}
}
/**disabled*/
function setDisabled(obj, mode) {
	if (mode == 0) {
		obj.disabled = "";
	} else {
		obj.disabled = "true";
	}
}
/**readonly */
function setReadonly(obj, mode) {
	if (mode == 0) {
		obj.readOnly = "";
	} else {
		obj.readOnly = "true";
	}
}
/**all hide or show*/
function setAllDisplay(objlist, mode) {
	var len = objlist.length;
	for (var i = 0; i < len; i++) {
		var obj = objlist[i];
		if (mode == 0) {
			obj.style.display = "none";
		} else {
			obj.style.display = "block";
		}
	}
}
/**all disabled*/
function setAllDisabled(objlist, mode) {
	if (!objlist) {
		return;
	}
	var dmode = true;
	if (mode) {
		dmode = false;
	}
	var len = objlist.length;
	if (!len) {
		objlist.disabled = dmode;
	} else {
		for (var i = 0; i < len; i++) {
			objlist[i].disabled = dmode;
		}
	}
}
/** all readonly */
function setAllReadonly(objlist, mode) {
	var len = objlist.length;
	for (var i = 0; i < len; i++) {
		var obj = objlist[i];
		if (mode == 0) {
			obj.readOnly = "";
		} else {
			obj.readOnly = "true";
		}
	}
}
/**
 * select a row
 */
function selectRow(element, rowId, prefix) {
	var row, i;
	if (!prefix) {
		prefix = "tr";
	}
	var oldRowId = element.value;
	if (oldRowId == rowId) {
		return;
	}
	if (oldRowId != "" && document.getElementById(prefix + oldRowId)) {
		document.getElementById(prefix + oldRowId).className = "rowOut";
	}
	if (rowId != "" && document.getElementById(prefix + rowId)) {
		row = document.getElementById(prefix + rowId);
		revealTr(row);
		element.value = rowId;
	}
}

function revealTr(row) {
    if(!document.all) {
    	row.className = "rowSel";
    	return;
    }
    for (var i=0; i<row.cells.length; i++) {
    	row.cells[i].style.filter = "revealTrans(duration=0.4,transition=16)";
    	row.cells[i].filters[0].apply();
    }
    row.className = "rowSel";
    for (var i=0; i<row.cells.length; i++) {
    	row.cells[i].filters[0].play();
    }
} 

/**
 * add a value to enumer
 */
function addToEnumeration(enumer, value, spliter, unique) {
	if (!spliter) {
		spliter = ",";
	}
	if (unique == null) {
		unique = true;
	}
	if (enumer.length == 0) {
		return value;
	} else {
		if (unique && searchEnumeration(enumer, value, spliter)) {
			return enumer;
		}
	}
	return enumer + spliter + value;
}
function searchEnumeration(enumer, value, spliter) {
	if (!spliter) {
		spliter = ",";
	}
	var result = spliter + enumer + spliter;
	return result.indexOf(spliter + value + spliter) != -1;
}
/**
 * enumer : 'value1,value2,value3,...,valuen'
 * value : 'value2'/'v2'
 * spliter: ','
 * return 'value1,value3,...,valuen'/enumer
 */
function removeFromEnumeration(enumer, value, spliter, unique) {
	if (!value) {
		return enumer;
	}
	var array = [];
	array[0] = value;
	return doEnumerationMinus(enumer, array, spliter, unique);
}
/**
 * minuend : 'value1,value2,value3,...,valuen'
 * subtrahend : 'valuea,valueb,valuec,...,valuez'
 * spliter : ','
 * return minuend without elements in subtrahend
 */
function minusEnumeration(minuend, subtrahend, spliter, unique) {
	if (!subtrahend) {
		return minuend;
	}
	if (!spliter) {
		spliter = ",";
	}
	var values = subtrahend.split(spliter);
	return doEnumerationMinus(minuend, values, spliter, unique);
}
function doEnumerationMinus(minuend, values, spliter, unique) {
	if (!values || values.length == 0) {
		return minuend;
	}
	if (!spliter) {
		spliter = ",";
	}
	if (unique == null) {
		unique = true;
	}
	var mode = (unique) ? "gi" : "i";
	
	// spliters
	var spliterRegExp = new RegExp(spliter, "gi");
	var doubleSpliter = spliter + spliter;
	var doubleSpliterRegExp = new RegExp(doubleSpliter, "gi");
	// source
	var source = spliter + minuend.replace(spliterRegExp, doubleSpliter) + spliter;
	var regstr;
	var regExp;
	for (var i = 0; i < values.length; i++) {
		regstr = spliter + values[i].replace(spliterRegExp, doubleSpliter) + spliter;
		regExp = new RegExp(regstr, mode);
		source = source.replace(regExp, "");
	}
	source = source.replace(doubleSpliterRegExp, spliter);
	return source.slice(1, -1);
}

function filterEnumeration(enumer, prefix, spliter) {
	if (!enumer || enumer.length == 0) {
		return "";
	}
	if (!spliter) {
		spliter = ",";
	}
	// spliters
	var spliterRegExp = new RegExp(spliter, "gi");
	var doubleSpliter = spliter + spliter;
	var doubleSpliterRegExp = new RegExp(doubleSpliter, "gi");
	// source
	var source = spliter + enumer.replace(spliterRegExp, doubleSpliter) + spliter;
	var regExp;
	if (prefix) {
		regExp = new RegExp(spliter + "[^" + prefix + "][0-9]+" + spliter, "gi");
	} else {
		regExp = new RegExp(spliter + "[0-9]+" + spliter, "gi");
	}
	source = source.replace(regExp, "");
	// remove doublespliter, trim left and right spliter
	source = source.replace(doubleSpliterRegExp, spliter);
	return source.slice(1, -1);
}

// check if a number key is pressed
function checkKeyCode(intOnly) {
	var code = eval(event.keyCode);
	if (code < 48 || code > 57) {
		// dot
		//alert(code);
		if (code == 46 && !intOnly) {
			//alert('xxx:'+event.srcElement.value);
			var value = event.srcElement.value;
			if (value.indexOf(".") < 0) {
				return;
			}
		}
		event.returnValue = false;
	}
}

// check checkbox or radio is checked
function isChecked(selects) {
	for (var i = 0; i < selects.length; i++) {
		if (selects[i].checked == true) {
			return true;
		}
	}
	return false;
}

function setRadioValue(radios, value) {
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].value == value) {
			radios[i].checked = true;
		}
	}
}

function setCheckboxValue(checkboxs, value) {
	value = value.replace(/\s/gi, "");
	for (var i = 0; i < checkboxs.length; i++) {
		if (searchEnumeration(value, checkboxs[i].value)) {
			checkboxs[i].checked = true;
		}
	}
}

function collapse(td) {
	var row = td.parentElement;
	var elems = row.parentElement.children;
	for (var i = 0; i < elems.length; i++) {
		if (elems[i] != row) {
			elems[i].style.display = (elems[i].style.display != "none") ? "none" : "block";
		}
	}
	var innerText = td.innerText;
	if (innerText.indexOf("-") == 0 || innerText.indexOf("\uff0d") == 0) {
		//td.innerText = innerText.replace(/^－/i, "\uff0b").replace(/^\-/i, "+");
	} else {
		//td.innerText = innerText.replace(/^+/i, "\uff0d").replace(/^\+/i, "-");
	}
}

/**
 * 此函数需要Jquery的支持
 */
function checkRequired() {
	var inputs = $("input.required,select.required");
	for (i = 0; i < inputs.length; i++) {
		var l_input = inputs[i];
		// alert("l_input.value:"+l_input.value);
		if(l_input.value == "")
		{		var label = $("label[for='"+l_input.id+"']")[0];
				var txt_label = "";
				if(label)
				 txt_label = trim(label.innerText);
				 //去除空格
				 
				alert(txt_label+"不允许为空！");
				l_input.focus();
				return false;
		}
		}
	return true;
}


function noEncodeParam( a ) {
		var s = [];

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( a.constructor == Array || a.jquery )
			// Serialize the form elements
			jQuery.each( a, function(){
				s.push( (this.name) + "=" + ( this.value ) );
			});

		// Otherwise, assume that it's an object of key/value pairs
		else
			// Serialize the key/values
			for ( var j in a )
				// If the value is an array then the key names need to be repeated
				if ( a[j] && a[j].constructor == Array )
					jQuery.each( a[j], function(){
						s.push( (j) + "=" + ( this ) );
					});
				else
					s.push( (j) + "=" + ( jQuery.isFunction(a[j]) ? a[j]() : a[j] ) );

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}

/** StringBuffer Begin **/
function StringBuffer() {
	this._objArray = [];
	this._undoFlag = false;
};

StringBuffer.prototype.toString = function() {
	if(this._objArray.length==0) {
		return '';
	}
	var str = this._objArray.join('');
	if(this._objArray.length > 1) {
		this.clear();
		this.append(str);
	}
	this._undoFlag = false;
	return str;
};

StringBuffer.prototype.append = function(object) {
	this._objArray[this._objArray.length] = object;
	this._undoFlag = true;
	return this;
};

StringBuffer.prototype.clear = function() {
	this._objArray.length = 0;
	this._undoFlag = false;
};

StringBuffer.prototype.undoLastAppend = function() {
	if(this._undoFlag) {
		this._objArray.length = this._objArray.length -1;
		this._undoFlag = false;
	}
};

StringBuffer.prototype.setSize = function(size) {
	if(size==null || size<=0) {
		this.clear();
		return;
	}
	var str = this._objArray.join('');
	if(size < str.length) {
		str = str.substring(0, size);
		this.clear();
		this.append(str);
	} else if(this._objArray.length > 1) {
		this.clear();
		this.append(str);
	}
	this._undoFlag = false;
};

StringBuffer.prototype.getSize = function() {
	var str = this.toString();
	return str.length;
};
/** StringBuffer end **/



//调整iframe
function reinitIframe(iframeName){
	var iframe =  document.getElementById(iframeName);
try{
var bHeight = iframe.contentWindow.document.body.scrollHeight;
var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
var height = Math.max(bHeight, dHeight);
iframe.height =  height;
}catch (ex){}
}
/*
$(document).ready(function(){
	var iframes = document.getElementsByTagName("iframe");
	for(var i=0;i<iframes.length;i++)
	{
		var l_iframe = iframes[i].id;
		window.setInterval("reinitIframe('"+l_iframe+"')", 200);
	}
});
*/

