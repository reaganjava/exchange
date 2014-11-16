/**
 * CTableHead version 1.0 | colinlin1982@hotmail.com
 * Copyright (c) 2007 Nicholas Lin @ XHDZ
 * This script can be use freely as long as all copyright message are intact
 * Updated: 22.11.2007
*/

var CONST_COL_ID = /%C/g;

var CONST_ROW_ID = /%R/g;

var CONST_VALUE = /%V/g;

var DEFAULT_PROPERTIES = {
	isCol			: true,
	spanLayer		: -1,
	defaultValue	: "",
	thProperty		: "",
	align			: "",
	split			: false,
	smartWrap		: false
};

// complete properties to default
DEFAULT_PROPERTIES.setDefault = function(target) {
	for (var property in this) {
		if (typeof target[property] == "undefined" || !_EC(target[property])) {
			target[property] = this[property];
		}
	}
};

// TH object
function C_TH(id, pid, name, properties) {
	this.id = id;
	this.pid = pid;
	this.name = name;					//html tag allowed
	this.isCol = properties.isCol;		//true:  each C_TH indicate a column; else row;
	this._split = properties.split;		//true:  special style be used for this th and following td
	this.sl = properties.spanLayer;		//spanLayer
	this.defaultValue = properties.defaultValue;	//defaultValue: col has priority
	this.align = properties.align;					//align: when col, indicate date of this col; when row, indicate this th
	this.thProperty = properties.thProperty;		//width;nowrap; e.g. ' width="10%" nowrap'
	this.smartWrap = properties.smartWrap;			//if wrapped by rowspan
	this._fs = false;					//is first sibling
	this._ls = false;					//is last sibling
	this._hc = false;					//has child?
	this._fcp = -1;						//first child position
	this._lcp = -2;						//last child position
	this._ai = -1;						//position in list
	this._p = null;						//parent node
	this._ancestor = null;				//ancestor node, for filtrate only
	// properties of cell in table
	this._layer = 1;					//layer number, increase from bottom to top(from 1)
	this._rowindex = 0;					//rowindex
	this._colindex = 0;					//colindex
	this._rowspan = 1;					//rowspan
	this._colspan = 1;					//colspan
}

/**
 * get property value by property name
 */
C_TH.prototype.g = function(propName, isCol) {
	return this[propName];
};

/**
 * set property value by property name
 */
C_TH.prototype.s = function(propName, value, isCol) {
	this[propName] = value;
};

C_TH.prototype.getWrappedHTML = function() {
	var tagReg = /<([^>])*>/gi;
	var texts = this.name.replace(/<br(\s)+(\/)?>/gi, "").replace(tagReg, "#split#$&#split#").split("#split#");
	var buv = new StringBuffer();
	var textLength = 0;
	var text;
	// calculate text length
	for (var i in texts) {
		text = texts[i];
		if (text.length > 0 && !text.match(tagReg)) {
			textLength += text.length;
		}
	}
	// calculate how many char in each row
	var eachRow = Math.ceil(textLength / this._rowspan);
	var wrapReg = new RegExp(".{" + eachRow + "}", "gi");
	for (var j in texts) {
		text = texts[j];
		if (text.length > 0) {
			if (text.match(tagReg)) {
				buv.append(text);
			} else {
				buv.append(text.replace(wrapReg, "$&<br>"));
			}
		}
	}
	return buv.toString();
};

C_TH.prototype.toString = function() {
	var buv = new StringBuffer();
	buv.append('<th class="').append(this.isCol ? ((this._split) ? 'thColSplit' : 'thCol') : ((this._split) ? 'thRowSplit' : 'thRow'));
	buv.append('" colspan="').append(this._colspan).append('" rowspan="').append(this._rowspan);
	if (this.align && !this.isCol) {
		buv.append('" align="').append(this.align);
	}
	buv.append('" ');
	if (this.thProperty) {
		buv.append(this.thProperty);
	}
	var inner = this.name;
	if (this.smartWrap && this._rowspan > 1) {
		inner = this.getWrappedHTML();		
	}
	buv.append('>').append(inner).append('</th>');
	return buv.toString();
};

// ROOT object
function C_ROOT(id, name) {
	this.id = id;
	this.name = name;
	// properties of cell in table
	this._rowspan = 1;					//rowspan
	this._colspan = 1;					//colspan
	this._col = new C_TH(this.id, this.id, this.name, true);
	this._row = new C_TH(this.id, this.id, this.name, false);
}

C_ROOT.prototype._cal = function() {
	this._rowspan = this._col._layer - 1;
	this._col._layer = -1;
	this._colspan = this._row._layer - 1;
	this._row._layer = -1;
};

/**
 * get property value by property name and isCol
 */
C_ROOT.prototype.g = function(propName, isCol) {
	if (isCol) {
		return this._col.g(propName);
	} else {
		return this._row.g(propName);
	}
};

/**
 * set property value by property name and isCol
 */
C_ROOT.prototype.s = function(propName, value, isCol) {
	if (isCol) {
		this._col.s(propName, value);
	} else {
		this._row.s(propName, value);
	}
};

C_ROOT.prototype.toString = function() {
	var buv = new StringBuffer();
	buv.append('<th class="thRoot" colspan="').append(this._colspan).append('" rowspan="').append(this._rowspan);
	buv.append('">').append(this.name).append('</th>');
	return buv.toString();
};

// TABLE object
function C_TAB(objName, rootName) {
	this.config = {
		showBadNodes		: true,		// whether show parent not in tree
		defaultValue		: 0,
		showRowLevel		: 0,		// from which level will be show
		showColLevel		: 0,
		rejectValue			: null
	};

	this.obj = objName;
	this.SPLITOR = ',';
	this._cols = [];
	this._rows = [];
	this._leafCols = [];
	this._leafRows = [];
	this._root = new C_ROOT(-1, rootName);
	this._initialized = false;
}

C_TAB.prototype.toString = function() {
	
	this._initialize();
	var buv = new StringBuffer();
	buv.append('<tr>');
	// does root need to be printed?
	var b_col = this._root.g('_hc', true);
	var b_row = this._root.g('_hc', false);
	if (b_col && b_row) {
		buv.append(this._root);
	}
	// add cols
	if (b_col) {
		// array to save th temp
		var array = [];
		for (var n=0; n < this._root._rowspan; n=n+1) {
			array[array.length] = new StringBuffer();
		}
		// use C_TH
		this._THC(this._root._col, true, array);
		buv.append(array.join('</tr><tr>'));
	}
	// add rows
	if (b_row) {
		if (b_col) {
			buv.append('</tr><tr>');
		}
		// array to save th temp
		var array = [];
		// how many rows
		for (var n=0; n < this._root._row._rowspan; n=n+1) {
			array[array.length] = new StringBuffer();
		}
		// user C_TH
		this._THC(this._root._row, false, array);
		buv.append(array.join('</tr><tr>'));
	}
	buv.append('</tr>');
	return buv.toString();
	
}

/*add th*/
C_TAB.prototype._THC = function(pth, isCol, array)  {
	var th;
	var ths = (isCol) ? this._cols : this._rows;
	var idx = 0;
	for (var n=pth._fcp; n<=pth._lcp; n=n+1) {
		th = ths[n];
		if (th.pid == pth.id) {
			// is pth's child
			th._layer = pth._layer + 1;
			if (th._fs && pth._split) {
				th._split = pth._split;
			}
			if (isCol) {
				// if has child, rowspan=1; else rowspan?
				th._rowspan = (th._hc && (th._layer + 1 != this.config.showColLevel)) ? 1 : (this._root._rowspan - th._layer);
				// col index
				th._colindex = pth._colindex + idx;
				idx += th._colspan;
				// add to top head by layer
				if (this.config.showColLevel == 0 || th._layer < this.config.showColLevel) {
					array[th._layer].append(th);
				}
				if (!th._hc) {
					//this._leafCols.length == th._colindex
					this._leafCols[this._leafCols.length] = th;
				}
			} else {
				th._colspan = (th._hc && (th._layer + 1 != this.config.showRowLevel)) ? 1 : (this._root._colspan - th._layer);
				// row index
				th._rowindex = pth._rowindex + idx;
				idx += th._rowspan;
				// add to side head by row index
				if (this.config.showRowLevel == 0 ||  th._layer < this.config.showRowLevel) {
					array[th._rowindex].append(th);
				}
				if (!th._hc) {
					//this._leafRows.length == th._rowindex
					this._leafRows[this._leafRows.length] = th;
					// get each th from top head
					for (var i=0; i<this._leafCols.length;) {
						cth = this._leafCols[i];
						cth = this._ancestorOfLayer(cth, th.sl);
						rth = this._ancestorOfLayer(th, cth.sl);
						if (this._isFirstLeaf(th, rth)) {
							// default value: col first, then row, then table
							var dv = _NVL(cth.defaultValue, _NVL(rth.defaultValue, this.config.defaultValue));
							if (dv != null && typeof(dv) == "string") {
								dv = dv.replace(CONST_COL_ID, cth.id).replace(CONST_ROW_ID, rth.id).replace(CONST_VALUE, "");
							}
							array[th._rowindex].append('<td class="tcr').append((cth._split) ? 'C' : '').append((rth._split) ? 'R' : '');
							array[th._rowindex].append('" id="').append(cth.id).append('_').append(rth.id);
							array[th._rowindex].append('" colspan="').append(cth._colspan);
							array[th._rowindex].append('" rowspan="').append(rth._rowspan);
							if (cth.align) {
								array[th._rowindex].append('" align="').append(cth.align);
							}
							array[th._rowindex].append('">').append(dv).append('</td>');
							//array[th._rowindex].append('"></td>');
						}
						i += cth._colspan;
					}
				}
			}
			if (th._hc) {
				this._THC(th, isCol, array);
			}
		}
	}
};

C_TAB.prototype.add = function(id, pid, name, isCol, spanLayer, defaultValue, thProperty, align, split) {
	var properties = {};
	properties.isCol = isCol;
	properties.spanLayer = spanLayer;
	properties.defaultValue = defaultValue;
	properties.thProperty = thProperty;
	properties.align = align;
	properties.split = split;
	this.push(id, pid, name, properties);
};

C_TAB.prototype.push = function(id, pid, name, properties) {
	// if no properties in parameters
	if (typeof properties != "undefined") {
		DEFAULT_PROPERTIES.setDefault(properties);
	} else {
		properties = DEFAULT_PROPERTIES;
	}
	if (this._gth(id, properties.isCol)) return;
	var th = new C_TH(id, pid, name, properties);
	if (th.isCol) {
		this._cols[this._cols.length] = th;
	} else {
		this._rows[this._rows.length] = th;
	}
}

/**
 * add a data to td specified by colId and rowId
 * the original data will be removed
 */
C_TAB.prototype.addData = function(colId, rowId, data) {
	var elem = this._gtd(colId, rowId);
	if (elem) {
		this.config.rejectValue.test("");
		if (this.config.rejectValue == null || !this.config.rejectValue.test(data)) {
			elem.innerHTML = data;
		}
	}
};

/**
 * add a value to td specified by colId and rowId
 * the original data will be remained
 * if isNumber is true, will add value to original data as number
 * else will add value sperate by spliter
 */
C_TAB.prototype.addValue = function(colId, rowId, value, fixed, isNumber, spliter) {
	var elem = this._gtd(colId, rowId);
	if (elem) {
		// cannot use innerHTML
		var data = elem.innerText;
		// todo get rowId and colId
		// todo get default value
		if (isNumber == null) {
			isNumber = true;
		}
		if (isNumber) {
			if(fixed) { //
				elem.innerText = (_NVL(eval(data), 0) + _NVL(eval(value), 0)).toFixed(fixed);
			}else {
				elem.innerText = _NVL(eval(data), 0) + _NVL(eval(value), 0);
			}
		} else {
			if (spliter == null) {
				spliter = '';
			}
			elem.innerText = data + ((data.length==0) ? '' : spliter) + value;
		}
	}
};

/*
 * find td by colId and rowId
 * return null if not find
 */
C_TAB.prototype._gtd = function(colId, rowId) {
	var elem = null;
	// can find td only when row head and col head all exists.
	if (this._leafCols.length != 0 && this._leafRows.length != 0) {
		elem = _GI(colId + '_' + rowId);
		if (elem == null) {
			var cth = this._gth(colId, true);
			var rth = this._gth(rowId, false);
			if (cth != null && rth != null && cth._p != null && rth._p != null) {
				// find leaf row and col
				var leafCol = this._leafCols[cth._colindex];
				var leafRow = this._leafRows[rth._rowindex];
				cth = this._ancestorOfLayer(leafCol, leafRow.sl);
				rth = this._ancestorOfLayer(leafRow, cth.sl);
				elem = _GI(cth.id + '_' + rth.id);
			}
		}
	}
	return elem;
};

/*
 * find th by id
 */
C_TAB.prototype._gth = function(id, isCol) {
	var ths = (isCol) ? this._cols : this._rows;
	for (var n=0; n < ths.length; n=n+1) {
		if (ths[n].id == id) {
			return ths[n];
		} else if (ths[n].pid == id && ths[n]._p) {
			return ths[n]._p;
		}
	}
	return null;
};

// update ancestor
C_TAB.prototype._updateAncestor = function(th, span) {
	if (th._p) {
		if (th.isCol) {
			th._p._colspan += span;
		} else {
			th._p._rowspan += span;
		}
		th._p._layer = _MAX(th._p._layer, th._layer + 1);
		// if parent is root, update layer to opposite span(row to colspan, col to rowspan) and return
		if (th.pid == this._root.id) {
			return;
		} else {
		// if parent is not root, add layer to parent, add span to span
			this._updateAncestor(th._p, span);
		}
	}
};

// Checks if a node has any children and if it is the last sibling
C_TAB.prototype._initializeTH = function(ths, isCol) {
	// root for col or row
	var rootTH = (isCol) ? this._root._col : this._root._row;
	// check each th in array
	if (ths && ths.length) {
		var th, pth;
		for (var n=0; n < ths.length; n=n+1) {
			pth = null;
			th = ths[n];
			th._ai = n;
			// find parent
			if (th.pid == rootTH.id) {
				pth = rootTH;
			} else {
				// find in front
				for (var m=n-1; m>=0; m=m-1) {
					if (ths[m].id == th.pid) {
						pth = ths[m];
						break;
					} else if (ths[m].pid == th.pid) {
						pth = ths[m]._p;
						break;
					}
				}
				if (!pth) {
					// find in behind
					for (var k=n+1; k<ths.length; k=k+1) {
						if (ths[k].id == th.pid) {
							pth = ths[k];
							break;
						}
					}
				}
			}
			// parent not find, assign node to root
			if (!pth && this.config.showBadNodes) {
				th.pid = rootTH.id;
				pth = rootTH;
			}
			// update parent status
			if (pth) {
				// set _p to parent
				th._p = pth;
				// update parent status
				if (pth._hc) {
					ths[pth._lcp]._ls = false;
					this._updateAncestor(th, ((isCol) ? th._colspan : th._rowspan));
				} else {
					pth._hc = true;
					pth._fcp = n;
					th._fs = true;
					// add rowspan/colspan to parent
					this._updateAncestor(th, ((isCol) ? th._colspan : th._rowspan)-1);
				}
				th._ls = true;
				pth._lcp = n;
			}
		}
	}
};

// Checks if a node has any children and if it is the last sibling
C_TAB.prototype._initialize = function() {
	if (this._initialized) return;
	if (this._cols.length) {
		this._initializeTH(this._cols, true);
	}
	if (this._rows.length) {
		this._initializeTH(this._rows, false);
	}
	this._root._cal();
	// reset layer
	this._initialized = true;
};

// load parent
C_TAB.prototype._ancestorOfLayer = function(th, layer) {
	// does layer specified
	if ((layer == -1) || (th._layer <= layer)) {
		return th;
	} else {
		var pth = th._p;
		while (pth.id != this._root.id) {
			if (pth._layer == layer) {
				break;
			} else {
				pth = pth._p;
			}
		}
		return pth;
	}
};

// if th is first leaf of ancestor
C_TAB.prototype._isFirstLeaf = function(th, ancestor) {
	var ths = (th.isCol) ? this._cols : this._rows;
	var leaf = ancestor;
	while(leaf._hc) {
		leaf = ths[leaf._fcp];
	}
	return (leaf.id == th.id);
};

/**
 * return leaf columns from table
 */
C_TAB.prototype.getLeafCols = function() {
	return this._leafCols;
};

/**
 * return leaf rows from table
 */
C_TAB.prototype.getLeafRows = function() {
	return this._leafRows;
};

/*
 * tree must be instance of ctreetable or dtree
 */
C_TAB.prototype.copyFromTree = function(tree) {
	if (tree && tree.aNodes && tree.aNodes.length) {
		for (var n=0; n<tree.aNodes.length; n=n+1) {
			var node = tree.aNodes[n];
			this.add(node.id, node.pid, node.name);
		}
	}
};

/*
 * empty check
 * return false if null, '', no value assigned
 * return ture if any other
 */
function _EC(value) {
	return (value==null) ? false:((''+value).length ? true : false);
}

/**
 * return exp1 if exp1 not null, '', or no value
 */
function _NVL(exp1, exp2) {
	return _EC(exp1) ? exp1 : exp2;
}

/**
 * return max value
 */
function _MAX(exp1, exp2) {
	return (exp1 > exp2) ? exp1 : exp2;
}

/**
 * return min value
 */
function _MIN(exp1, exp2) {
	return (exp1 > exp2) ? exp2 : exp1;
}

function _GI(id) {
	return document.getElementById(id);
}

function _GN(name) {
	return document.getElementsByName(name);
}
