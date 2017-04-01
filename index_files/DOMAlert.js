document.write('<link rel="Stylesheet" href="/CommonPages/Alert/default.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/winLike.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/orange.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/silver.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/catsa.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/austrianpost.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/parks.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/ClothingOnline.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/telus.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/ottawa.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/vista.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/ottawa.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/stm.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/sepaq.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/catalogue.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/saq.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/pc.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/saaq.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/cpc.css" type="text/css" media="screen" />');
document.write('<link rel="Stylesheet" href="/CommonPages/Alert/md.css" type="text/css" media="screen" />');
var PreviousTopPosition, PreviousLeftPosition;
/*jslint browser: true */

//Copyright (c) 2008 Lewis Linn White Jr.
//Author: Lewis Linn White Jr.

//Permission is hereby granted, free of charge, to any person
//obtaining a copy of this software and associated documentation
//files (the "Software"), to deal in the Software without
//restriction, including without limitation the rights to use,
//copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the
//Software is furnished to do so, subject to the following
//conditions:

//The above copyright notice and this permission notice shall be
//included in all copies or substantial portions of the Software.
//Except as contained in this notice, the name(s) of the above 
//copyright holders shall not be used in advertising or otherwise 
//to promote the sale, use or other dealings in this Software without 
//prior written authorization.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
//OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
//HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
//WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
//OTHER DEALINGS IN THE SOFTWARE.

//Icons used in this project are graciously provided by the Silk icons set:
//http://www.famfamfam.com/lab/icons/silk/
var MainZIndex = 9999;
var AddedResized = false;
function DOMAlert(settings) {
	var that, modalWindow, iframe, alertWindow, titleBar, title, ricon, licon, contentArea, buttonArea, okButton, cancelButton, defaultCallback, okCallback, cancelCallback;
	//create version of ourself for use in closures
	that = this;

	//Create our settings
	if(! settings) settings = {};
	
	this.settings = settings;
		
	//Create a namespae object to hold our html elements
	this.html = {};

	//ie6 test.  what a crappy browser
	this.isIE6 = (document.all && window.external && (typeof document.documentElement.style.maxHeight === 'undefined')) ? true : false;
	// use the Default skin if none was provided

	this.settings.skin = this.settings.skin ? this.settings.skin : typeof( DOMAlertSetDefaultSkin ) != "undefined" ? DOMAlertSetDefaultSkin : 'vista';


if (this.settings.buttonarea == undefined) this.settings.buttonarea = true;
if (this.settings.imageDisplay == undefined) this.settings.imageDisplay = false;


	
	// Set up a default for OK setting
	if (!this.settings.ok)	{
		defaultCallback = function ()
		{
			that.close();
		};
		this.settings.ok = {text: 'Ok', value: true, onclick: defaultCallback };
}

	if (!this.settings.close) {
	    if (this.settings.cancel) {
	        this.settings.close = this.settings.cancel;
	    } else {
	        defaultCloseCallback = function() {
	            that.close();
	        };
	        this.settings.close = { value: false, onclick: defaultCloseCallback };
	    }
	}


	
	//Create our modal background
	modalWindow = document.createElement('div');
	modalWindow.style.height = ((document.documentElement.clientHeight > document.documentElement.scrollHeight) ? document.documentElement.clientHeight : document.documentElement.scrollHeight) + 'px';
	modalWindow.style.width = ((document.documentElement.clientWidth > document.documentElement.scrollWidth) ? document.documentElement.clientWidth : document.documentElement.scrollWidth) + 'px';


	modalWindow.className = "BgColor"; //transparent png with low opacity.  Provides a similar effect as opacy/filter settings, but without the memory leaks
	modalWindow.className += " NoPrint";
	modalWindow.style.position = "absolute";
	modalWindow.style.left = "0px";
	modalWindow.style.top = "0px";
	modalWindow.style.zIndex = MainZIndex + 1;
	modalWindow.style.visibility = "hidden";
	document.body.appendChild(modalWindow);

	this.html.modalWindow = modalWindow;

	//shoehorn a iframe to cover our select elemtns for ie6.  what a crappy browser....
	if (this.isIE6)
	{
		iframe = document.createElement('iframe');
		iframe.style.position = 'absolute';
		iframe.style.visibility = 'hidden';
		iframe.style.zIndex = MainZIndex;
		iframe.frameBorder = 0;
		iframe.style.position = 'absolute';
		iframe.src = "/CommonPages/template/images/msg_error2.gif";
		document.body.appendChild(iframe);
		this.html.iframe = iframe;
		modalWindow.className = "BgColorIE6";
	}
	

	//Create our alert window
	alertWindow = document.createElement('div');
	alertWindow.className = this.settings.skin + '_alertWindow';
	alertWindow.style.position = this.isIE6 ? 'absolute' : 'fixed';
	alertWindow.style.zIndex = MainZIndex +2 ;
	MainZIndex += 2;
	if (this.settings.width) {
		if (this.settings.width > 0)
		{
			alertWindow.style.width = this.settings.width + 'px';
		}
	}
	document.body.appendChild(alertWindow);
	alertWindow.style.visibility = 'hidden';
	this.html.alertWindow = alertWindow;

	//Create our title bar
	titleBar = document.createElement('div');
	titleBar.className = this.settings.skin + '_titleBar';
	alertWindow.appendChild(titleBar);
	this.html.titleBar = titleBar;
	
	//Create our table title bar
	topTable = document.createElement('table');
	topTable.className = this.settings.skin + '_titleBarTable';
	titleBar.appendChild(topTable);
	this.html.topTable = topTable;
	
	//Create our tbody
	topTBody = document.createElement('tbody');
	topTable.appendChild(topTBody);
	this.html.topTBody = topTBody;
	
	//Create our tr
	topTR = document.createElement('tr');
	topTR.className = this.settings.skin + '_titleBarTr';
	topTBody.appendChild(topTR);
	this.html.topTR = topTR;
	
	//Create our left td
	topLeftTD = document.createElement('td');
	topLeftTD.className = this.settings.skin + '_titleBarLeftTd';
	topTR.appendChild(topLeftTD);
	this.html.topLeftTD = topLeftTD;
	
	//Create our middle td
	topMiddleTD = document.createElement('td');
	topMiddleTD.className = this.settings.skin + '_titleBarMiddleTd';
	
	topTR.appendChild(topMiddleTD);
	this.html.topMiddleTD = topMiddleTD;

	topMiddleTDIcon = document.createElement('td');
	topMiddleTDIcon.className = this.settings.skin + '_titleBarMiddleTdIcon';
	topTR.appendChild(topMiddleTDIcon);
	this.html.topMiddleTDIcon = topMiddleTDIcon;

    
	/********************************************************************/

	//Create our right Icon
	ricon = document.createElement('div');
	ricon.className = this.settings.skin + '_titleBarRightIcon';
	closeCallback = function() {
		
	    that.settings.close.onclick(that, that.settings.close.value);
	};
	ricon.onclick = closeCallback;
	if (this.settings.skin == "vista") {
		ricon.onmousedown = function () {
			ricon.className = that.settings.skin + '_titleBarRightIcon_Down';
			topRightTD.className = that.settings.skin + '_titleBarRightTd_Down';
		}
		ricon.onmouseup = function () {
			ricon.className = that.settings.skin + '_titleBarRightIcon';
			topRightTD.className = that.settings.skin + '_titleBarRightTd';
		}
		ricon.onmouseout = function () {
			if (typeof(that.settings) == "object") {
				ricon.className = that.settings.skin + '_titleBarRightIcon';
				topRightTD.className = that.settings.skin + '_titleBarRightTd';
			}
		}
	}
	//ricon.innerHTML = '&nbsp;';
	topMiddleTDIcon.appendChild(ricon);
	this.html.ricon = ricon;
    
    
    
	//Create our span that goes in our title
	title = document.createElement('div');
	title.className = this.settings.skin + '_titleBarLeftIcon';
	if (!this.settings.title)
	    title.innerHTML = '&nbsp;';
	else
	    title.innerHTML = this.settings.title;
	topMiddleTD.appendChild(title);
	this.html.title = title;


    /****************************************************************************/
	
	//Create our right td
	topRightTD = document.createElement('td');
	topRightTD.className = this.settings.skin + '_titleBarRightTd';
	topTR.appendChild(topRightTD);
	this.html.topRightTD = topRightTD;
	

	
	//Create our main content area
	contentArea = document.createElement('div');
	if (this.settings.height) {
		if (this.settings.height > 0) {


			if (this.settings.buttonarea) {
				contentArea.style.height = (this.settings.height + 30) + 'px';
			} else if(!this.settings.imageDisplay) {
				if (this.settings.skin.toLowerCase() == "saaq") {
					contentArea.style.height = (this.settings.height + 15) + 'px';
				} else {
					contentArea.style.height = (this.settings.height + 20) + 'px';
				}
			}
		}
	}
	if(this.settings.padding) {
		contentArea.style.padding = this.settings.padding + 'px';
	}
	alertWindow.appendChild(contentArea);
	this.html.contentArea = contentArea;
	
	//Create our content table
	contentTable = document.createElement('table');
	contentTable.className = this.settings.skin + '_ContentTable';
	contentArea.appendChild(contentTable);
	this.html.contentTable = contentTable;
	
	//Create our tbody
	contentTBody = document.createElement('tbody');
	contentTable.appendChild(contentTBody);
	this.html.contentTBody = contentTBody;
	
	//Create our content tr
	contentTR = document.createElement('tr');
	contentTR.className = this.settings.skin + '_ContentTr';
	contentTBody.appendChild(contentTR);
	this.html.contentTR = contentTR;
	
	//Create our left td
	contentLeftTD = document.createElement('td');
	contentLeftTD.className = this.settings.skin + '_ContentLeftTd';
	contentTR.appendChild(contentLeftTD);
	this.html.contentLeftTD = contentLeftTD;
	
	//Create our middle td
	contentMiddleTD = document.createElement('td');
	contentMiddleTD.className = this.settings.skin + '_ContentMiddleTd';
	contentTR.appendChild(contentMiddleTD);
	this.html.contentMiddleTD = contentMiddleTD;
	
	//Create our middle div
	contentMiddleDiv = document.createElement('div');
	contentMiddleDiv.className = this.settings.skin + '_ContentMiddleDiv';
	contentMiddleDiv.id = 'idContentMiddleDiv';
	contentMiddleDiv.innerHTML = this.settings.text;
	if (this.settings.height) {
		if (this.settings.height > 0) {
			contentMiddleDiv.style.height = this.settings.height + 'px';
		}
	}
	if (this.settings.width) {
		if (this.settings.width > 0) 
		{
			contentMiddleDiv.style.width = (this.settings.width -35) + 'px';
		}
	}
	contentMiddleTD.appendChild(contentMiddleDiv);
	this.html.contentMiddleDiv = contentMiddleDiv;
	
	//Create our right td
	contentRightTD = document.createElement('td');
	contentRightTD.className = this.settings.skin + '_ContentRightTd';
	contentTR.appendChild(contentRightTD);
	this.html.contentRightTD = contentRightTD;
	
	//Create our main content area
	buttonArea = document.createElement('div');
	buttonArea.className = this.settings.skin + '_ButtonArea';
	alertWindow.appendChild(buttonArea);
	this.html.buttonArea = buttonArea;
	
	//Create our content table
	buttonTable = document.createElement('table');
	buttonTable.className = this.settings.skin + '_ButtonTable';
	buttonArea.appendChild(buttonTable);
	this.html.buttonTable = buttonTable;
	
	//Create our tbody
	buttonTBody = document.createElement('tbody');
	buttonTable.appendChild(buttonTBody);
	this.html.buttonTBody = buttonTBody;
	
	//Create our content tr
	buttonTR = document.createElement('tr');
	buttonTR.className = this.settings.skin + '_ButtonTr';
	if (this.settings.buttonarea)buttonTBody.appendChild(buttonTR);
	this.html.buttonTR = buttonTR;
	
	//Create our left td
	buttonLeftTD = document.createElement('td');
	buttonLeftTD.className = this.settings.skin + '_ButtonLeftTd';
	buttonTR.appendChild(buttonLeftTD);
	this.html.buttonLeftTD = buttonLeftTD;
	
	//Create our middle td
	buttonMiddleTD = document.createElement('td');
	buttonMiddleTD.className = this.settings.skin + '_ButtonMiddleTd';
	buttonTR.appendChild(buttonMiddleTD);
	this.html.buttonMiddleTD = buttonMiddleTD;
	
	//Draw an OK button
	okButton = document.createElement('input');
	okButton.id = "AlertOkButton"
	okButton.type = 'button';
	okButton.className = this.settings.skin + '_okButton';
	okButton.value = this.settings.ok.text;
	okButton.onclick = function () {
		that.settings.ok.onclick(that, that.settings.ok.value);
	};
	okButton.onmouseover = function () {
		okButton.className = that.settings.skin + '_okButtonOver';
	};	
	okButton.onmouseout = function () {
		if (typeof(that.settings) == "object")
			okButton.className = that.settings.skin + '_okButton';
	};
	
	buttonMiddleTD.appendChild(okButton);
	this.html.okButton = okButton;
		
	//Draw an OTHER button, if present 
	if (this.settings.other) {
		otherButton = document.createElement('input');
		otherButton.id = "AlertOtherButton"
		otherButton.type = 'button';
		otherButton.className = this.settings.skin + '_cancelButton';
		otherButton.value = this.settings.other.text || 'Other';
		otherButton.onclick = function () {
			that.settings.other.onclick(that, that.settings.other.value);
		};
		otherButton.onmouseover = function () {
			otherButton.className = that.settings.skin + '_cancelButtonOver';
		};	
		otherButton.onmouseout = function () {
			if (typeof(that.settings) == "object")
				otherButton.className = that.settings.skin + '_cancelButton';
		};
		
		buttonMiddleTD.appendChild(otherButton);
		this.html.otherButton = otherButton;
	}
	//Draw a cancel button, if present
	if (this.settings.cancel)
	{
		cancelButton = document.createElement('input');
		cancelButton.type = 'button';
		cancelButton.className = this.settings.skin + '_cancelButton';
		cancelButton.value = this.settings.cancel.text || 'Cancel';
		cancelButton.onclick = function ()
		{
			that.settings.cancel.onclick(that, that.settings.cancel.value);
		};
		cancelButton.onmouseover = function ()
		{
			cancelButton.className = that.settings.skin + '_cancelButtonOver';
		};
		cancelButton.onmouseout = function ()
		{
			if (typeof(that.settings) == "object")
				cancelButton.className = that.settings.skin + '_cancelButton';
		};
		buttonMiddleTD.appendChild(cancelButton);
		this.html.cancelButton = cancelButton;
	}
	
	//Create our right td
	buttonRightTD = document.createElement('td');
	buttonRightTD.className = this.settings.skin + '_ButtonRightTd';
	buttonTR.appendChild(buttonRightTD);
	this.html.buttonRightTD = buttonRightTD;
	
	//Create our main content area
	bottomArea = document.createElement('div');
	bottomArea.className = this.settings.skin + '_BottomArea';
	alertWindow.appendChild(bottomArea);
	this.html.bottomArea = bottomArea;
	
	//Create our content table
	bottomTable = document.createElement('table');
	bottomTable.className = this.settings.skin + '_BottomTable';
	bottomArea.appendChild(bottomTable);
	this.html.bottomTable = bottomTable;
	
	//Create our tbody
	bottomTBody = document.createElement('tbody');
	bottomTable.appendChild(bottomTBody);
	this.html.bottomTBody = bottomTBody;
	
	//Create our content tr
	bottomTR = document.createElement('tr');
	bottomTR.className = this.settings.skin + '_BottomTr';
	bottomTBody.appendChild(bottomTR);
	this.html.bottomTR = bottomTR;
	
	//Create our left td
	bottomLeftTD = document.createElement('td');
	bottomLeftTD.className = this.settings.skin + '_BottomLeftTd';
	bottomTR.appendChild(bottomLeftTD);
	this.html.bottomLeftTD = bottomLeftTD;
	
	//Create our middle td
	bottomMiddleTD = document.createElement('td');
	bottomMiddleTD.className = this.settings.skin + '_BottomMiddleTd';
	bottomTR.appendChild(bottomMiddleTD);
	this.html.bottomMiddleTD = bottomMiddleTD;
	
	//Create our right td
	bottomRightTD = document.createElement('td');
	bottomRightTD.className = this.settings.skin + '_BottomRightTd';
	bottomTR.appendChild(bottomRightTD);
	this.html.bottomRightTD = bottomRightTD;

	//Center our alert box on the screen
	existingOnScroll = window.onscroll || function() { };
    existingOnResize = window.onresize || function() {that.center() };
	if (this.isIE6) {
	    window.onscroll = function() {
	        that.center();
	        existingOnScroll();
	    };
	}
	window.onresize = function() {
		that.center();
	};
	this.center();
}

var existingOnScroll;
var existingOnResize;

DOMAlert.prototype.show = function (titleText, contentText)
{
	PreviousTopPosition = document.getElementsByTagName("html")[0].scrollTop==0 ? document.getElementsByTagName("body")[0].scrollTop : document.getElementsByTagName("html")[0].scrollTop;
	PreviousLeftPosition = document.getElementsByTagName("html")[0].scrollLeft==0 ? document.getElementsByTagName("body")[0].scrollLeft : document.getElementsByTagName("html")[0].scrollLeft;
	if (contentText)
	{
		this.html.title.innerHTML = titleText;
		this.html.contentMiddleDiv.innerHTML = contentText;
	}
	if (titleText && !contentText)
	{
		this.html.contentMiddleDiv.innerHTML = titleText;
	}
	
	this.html.modalWindow.style.visibility = 'visible';
	this.html.alertWindow.style.visibility = 'visible';
	if (this.html.iframe)
	{
		this.html.iframe.style.height = this.html.alertWindow.offsetHeight;
		this.html.iframe.style.width = this.html.alertWindow.offsetWidth;
		this.html.iframe.style.visibility = 'visible';
	}
	if (this.html.cancelButton)
	{
		this.html.cancelButton.focus();
	}
	else
	{
		this.html.okButton.focus();
	}	
	

	this.closeOnEscapeProxyFunc = $.proxy(this.closeOnEscape, this)
	$(document).keyup(this.closeOnEscapeProxyFunc)


	// Remove the event handler from the document
	

	this.showed = true
	
};

DOMAlert.prototype.closeOnEscape = function (e) {
	var carCode = e.which
	if ((carCode == 9 ))
	  return false;
	else if (carCode == 27 && !document.getElementById("DivBgLoading")) {
		this.html.ricon.click()
	}
}

DOMAlert.prototype.hide = function ()
{
	window.scrollTo(PreviousLeftPosition, PreviousTopPosition);
	this.html.modalWindow.style.visibility = 'hidden';
	this.html.alertWindow.style.visibility = 'hidden';
	if (this.html.iframe)
	{
		this.html.iframe.style.visibility = 'hidden';
	}
	document.onkeydown = "";
	if (this.showed) {
		MainZIndex = MainZIndex - 2;
		this.showed = false;
	}
	
};
DOMAlert.prototype.fixedHeader = function ()
{
	var $t_fixed
	var offset = $("table.FixedHeader").position().top
	var offsetLeft = $("table.FixedHeader").offset().left
	var posBottomTable = offset + $("table.FixedHeader").height()

	$t_fixed = $("table.FixedHeader").clone();
	$t_fixed.find('tbody').remove().end().addClass('fixed_table_header').removeClass('FixedHeader').insertBefore($("table.FixedHeader"));
	$t_fixed.css("top", $("#idContentMiddleDiv").offset().top)
	$t_fixed.css("left", $("#idContentMiddleDiv").offset().left + 5)

	$t_fixed.find("th").each(function(index) {
		$(this).css("min-width", $("table.FixedHeader").find("th").eq(index).width()+"px");
	})
	
	var intScrollMax = parseInt($("table.FixedHeader").position().top, 10) - parseInt($("#idContentMiddleDiv").position().top, 10)
	
	$("#idContentMiddleDiv").scroll(function(){
		if($(this).scrollTop() >= intScrollMax){
			$t_fixed.show()
		}else{
			$t_fixed.hide()
		}
	})
};
DOMAlert.prototype.close = function() {
	$(document).unbind("keyup", this.closeOnEscapeProxyFunc)
	window.scrollTo(PreviousLeftPosition, PreviousTopPosition);
    var obj, prop;

    //make sure our DOM objects are deleted and our onclick statements are nulled
    var isIE6 = (document.all && window.external && (typeof document.documentElement.style.maxHeight === 'undefined')) ? true : false;
    if (isIE6) {
        window.onscroll = existingOnScroll;
        window.onresize = existingOnResize;
    }
    for (obj in this.html) {
        if (this.html[obj].parentNode) {
            if (this.html[obj].onclick) {
                this.html[obj].onclick = null;
            }
            this.html[obj].parentNode.removeChild(this.html[obj]);
            delete this.html[obj];
        }
    }

    //remove object properties
    for (prop in this) {
        if (this[prop]) {
            this[prop] = null;
            delete this[prop];
        }
    }

    document.onkeydown = "";
	if (this.showed) {
		MainZIndex = MainZIndex - 2;
		this.showed = false;
	}
};
DOMAlert.prototype.center = function() {
    var alertWindow, scrollT, scrollL, iframe;
    if (this.html){
	alertWindow = this.html.alertWindow;
	modalWindow = this.html.modalWindow;

    if (alertWindow.style.position === 'absolute') {
        scrollT = window.pageYOffset || document.documentElement.scrollTop;
        scrollL = window.pageXOffset || document.documentElement.scrollLeft;

        alertWindow.style.left = (self.innerWidth || (document.documentElement.clientWidth || document.body.clientWidth)) / 2 + scrollL - alertWindow.offsetWidth / 2 + 'px';
        alertWindow.style.top = (self.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight)) / 2 + scrollT - alertWindow.offsetHeight / 2 + 'px';
        if (this.html.iframe) {
            this.html.iframe.style.left = alertWindow.style.left;
            this.html.iframe.style.top = alertWindow.style.top;
        }
    }
    else {
			var intLeft = 0;
			intLeft	= (self.innerWidth || (document.documentElement.clientWidth || document.body.clientWidth)) / 2 - alertWindow.offsetWidth / 2;
			var intTop = 0;
			intTop 	= (self.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight)) / 2 - alertWindow.offsetHeight / 2;
			if (this.settings.adjustTop) {
				intTop +=  this.settings.adjustTop;
			}
			alertWindow.style.left = intLeft + 'px';
			alertWindow.style.top  = intTop + 'px';
    }
	modalWindow.style.height = ((document.documentElement.clientHeight > document.documentElement.scrollHeight) ? document.documentElement.clientHeight : document.documentElement.scrollHeight) + 'px';
	modalWindow.style.width = document.documentElement.scrollWidth + 'px';
	}
};
