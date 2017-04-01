var intNbCell = 0;
var intMaxNbCell = 20;
var boolPageLoaded = false;
document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"/CommonPages/Loading/loading.css\" />");
var H = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
if (!window.onload) {
	window.onload = function() {CloseLoading();}
} else {
	try {
		var OldWindowOnload = typeof(window.onload) == "object" ? window.onload : function() { };
		window.onload = function() {OldWindowOnload();CloseLoading();}
	} catch (err) {
		alert('oups');
	}
}

function hexToInt( hexNumber )
{
    intNumber = parseInt( hexNumber, 16 );
    return intNumber
}

function intToHex( intNumber )
{
    var nbSeizene = Math.floor( intNumber/16 );
    if ( nbSeizene > 15 )
    {
        hexNumber = intToHex( nbSeizene ) + H[intNumber - nbSeizene * 16];
    }
    else
    {
        hexNumber = H[nbSeizene] + H[intNumber - nbSeizene * 16];
    }
    return hexNumber;
}
function rgb( r, g, b )
{
    return r * 65536 + g * 256 + b;
}
/*				*\
	Loading Div 
\*				*/

function Center(intBlock) {
    if (!document.getElementById("DivBgLoading")) return
	var alertWindow, scrollT, scrollL, iframe;
	var iWidth = iHeight = 0;
	var modalWindow = document.getElementById("DivBgLoading")
	var isIE6 = (document.all && window.external && (typeof document.documentElement.style.maxHeight === 'undefined')) ? true : false;
	if (isIE6) {
	  if( typeof( window.innerWidth ) == 'number' ) {
	        //Non-IE
	        iWidth = window.innerWidth;
	        iHeight = window.innerHeight;
	    } else {
	        iWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	        iHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	    }
	    strTmp = ""
	    scrollT = window.pageYOffset || document.documentElement.scrollTop;
	    scrollL = window.pageXOffset || document.documentElement.scrollLeft;

	    if (intBlock == 1) {alertWindow = document.getElementById("DivLoading");}
	    else {alertWindow = document.getElementById("DivBgLoading");}

	    document.getElementById("DivBgLoading").style.width = iWidth + "px";
	    document.getElementById("DivBgLoading").style.height = iHeight + "px";
	    document.getElementById("DivBgLoading").style.top = scrollT + "px";
	    document.getElementById("DivBgLoading").style.left = scrollL + "px";

	    alertWindow.style.left = (iWidth / 2 + scrollL - alertWindow.offsetWidth / 2) + "px";
	    alertWindow.style.top = (iHeight / 2 + scrollT - alertWindow.offsetHeight / 2) + "px";
	}

}

var ImageLoadingEn = new Image();
ImageLoadingEn.src = "/CommonPages/Loading/pleaseWaitE.gif"
var ImageLoadingFr = new Image();
ImageLoadingFr.src = "/CommonPages/Loading/pleaseWaitF.gif"

function OpenLoading(strLoading) {
    if (document.getElementById("DivBgLoading")) return;
	var strLoadingImg =""
	var isIE6 = (document.all && window.external && (typeof document.documentElement.style.maxHeight === 'undefined')) ? true : false;

	if (chrLang == "E")
	    strLoadingImg = ImageLoadingEn.src;
	else
	    strLoadingImg = ImageLoadingFr.src;
	
	var iWidth = iHeight = 0; 
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    iWidth = window.innerWidth;
	    iHeight = window.innerHeight;
	  } else {
	    iWidth = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
	    iHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	  }
	  if (document.getElementById("DivBgLoading")) {
		var BgLoading = document.getElementById("DivBgLoading");
	  } else if (!boolPageLoaded){
	    document.write("<div id=\"DivBgLoading\"></div>");
        var BgLoading = document.getElementById("DivBgLoading");
	  } else {
	    var BgLoading = document.createElement("div");
        BgLoading.id="DivBgLoading";
        document.body.appendChild(BgLoading);
      }
	  BgLoading.className = "BgLoading";
	  BgLoading.style.width=iWidth;
	  BgLoading.style.height=iHeight;

	  var LoadingDiv = document.createElement("div");
	  LoadingDiv.id = "DivLoading";
	  LoadingDiv.className = "loading";
	  if (!isIE6) LoadingDiv.style.position = "fixed";
	  BgLoading.appendChild(LoadingDiv);
	  if (strLoading) {
	      var LoadingMsg = document.createElement("font");
	      LoadingMsg.style.color = "#000000";
	      LoadingMsg.innerHTML = strLoading;
	      LoadingDiv.appendChild(LoadingMsg);
	      var LoadingBr = document.createElement("br");
	      LoadingDiv.appendChild(LoadingBr);
	  }
	  var LoadingImg = document.createElement("img");
	  LoadingImg.src = strLoadingImg;
	  LoadingImg.className = "LoadingImg";
	  LoadingImg.alt = strLoading;
	  LoadingDiv.appendChild(LoadingImg);

	var modalWindow = document.getElementById("DivBgLoading")
	modalWindow.style.display = "block";  
		modalWindow.style.height = ((document.documentElement.clientHeight > document.documentElement.scrollHeight) ? document.documentElement.clientHeight : document.documentElement.scrollHeight) + 'px';
	modalWindow.style.width = document.documentElement.scrollWidth + 'px';
	
	if (isIE6) {
	    modalWindow.style.background = "url(/CommonPages/loading/bg.gif)"
		var existingOnScroll = window.onscroll || function() { };
		var existingOnResize = window.onresize || function() { };

		window.onscroll = function() {
		    Center(2);
		    existingOnScroll();
		}
		window.onresize = function() {
		    Center(2); 
		    Center(1);
		    existingOnResize();
		}
		    //Center(1);
		    Center(2);
    } else {
        modalWindow.style.background = "url(/CommonPages/loading/bg.png)";
        modalWindow.style.position = "fixed";
	}

	document.onkeydown = function(event) {
	    if(window.event) 
    	  carCode = window.event.keyCode;
	    else
	      if(event)
    	    carCode = event.which;
		if ((carCode == 9 ) || (carCode == 8 ))
		  return false;
	}
}

function CloseLoading(intDelay)  {	
	if(!intDelay) intDelay = 500; 
	var y = setTimeout ('RemoveLoading();',intDelay);
}
function RemoveLoading() {
	var x;
	if(document.getElementById("DivBgLoading")) {
		x = document.getElementById("DivBgLoading").parentNode;
		document.getElementById("DivBgLoading").innerHTML ="";
		//document.getElementById("DivBgLoading").style.display="none";
		x.removeChild(document.getElementById("DivBgLoading"));
		document.onkeydown ="";
	}
	boolPageLoaded = true;
}
/****************/
