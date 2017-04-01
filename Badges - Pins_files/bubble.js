var intZIndex=900;
document.write('<link rel="stylesheet" type="text/css" href="/CommonPages/Bubble/bubble.css" />');

function Bubble (settings) {
//intWidth = 50;
	//ClearAllBubbles();
	var opacity = 50;
	var strTitle, strClose, strMessage
	strTitle = strClose = strMessage = "";
	var BubbleMsg,BubbleClose,iWidth,iHeight,scrollT,scrollL,BubbleFrame;
	var BubbleTopLeft,BubbleTop,BubbleTopRight,BubbleLeft,BubbleRight;
	var BubbleBottomLeft,BubbleBottom,BubbleBottomRight,BubbleContent;
	var BubbleBody,BubbleArrow,BubbleFolder="",BubbleHeader,BubbleX;
	var intHeight,intWidth;
	var curleft = 0
	var curtop = 0;
   	
	var NS = (navigator.appName=="Netscape")?true:false; 
	
	//create version of ourself for use in closures
	that = this;
	
	//Create our settings
	this.settings = settings;
	
	//Create a namespace object to hold our html elements
	this.html = {};
	
	//ie6 test.  what a crappy browser
	this.isIE6 = (document.all && window.external && (typeof document.documentElement.style.maxHeight === 'undefined')) ? true : false;

	// use the Default skin if none was provided
    this.settings.closeinutile = this.settings.closeinutile ? this.settings.closeinutile : false;
	this.settings.skin = this.settings.skin ? this.settings.skin : '';
	BubbleSkin = this.settings.skin;
	if(this.settings.text)
		strMessage = this.settings.text;
	Element = this.settings.element;
	var ObjElement = Element;
	boolClose = true;
	if(this.settings.close) {
		strClose = this.settings.close + " ";
		if (this.settings.close.toUpperCase() == "NO" || this.settings.close.toUpperCase() == "NONE")
			boolClose = false;
	}
	if(this.settings.title)
		strTitle = this.settings.title;
	if(BubbleSkin != "")BubbleFolder = "Bubble"+BubbleSkin + "/";
	
    var iWidth = iHeight = 0; 
	  if( typeof( window.innerWidth ) == 'number' ) {
	    //Non-IE
	    iWidth = window.innerWidth;
	    iHeight = window.innerHeight;
	  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
	    //IE 6+ in 'standards compliant mode'
	    iWidth = document.documentElement.clientWidth;
	    iHeight = document.documentElement.clientHeight;
	  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
	    //IE 4 compatible
	    iWidth = document.body.clientWidth;
	    iHeight = document.body.clientHeight;
	  }

	scrollT = window.pageYOffset || document.documentElement.scrollTop;
	scrollL = window.pageXOffset || document.documentElement.scrollLeft;



	var isIE6 = (document.all && window.external && (typeof document.documentElement.style.maxHeight === 'undefined')) ? true : false;
	if(isIE6) {
		BubbleFrame = document.createElement('iframe');
		BubbleFrame.style.position = 'absolute';
		BubbleFrame.style.zIndex = (intZIndex + 1);
		BubbleFrame.id = "Frame_Bubble_"+Element.id;
	}
	
	//** Créer la flèche.
	BubbleArrow = document.createElement('img');
	BubbleArrow.style.zIndex = parseInt((intZIndex + 9),10) ;
	BubbleArrow.className = "Bubble " + BubbleSkin ;
	BubbleArrow.id = "Arrow_Bubble_" + Element.id;
	document.body.appendChild(BubbleArrow);

	BubbleArrow.opacity = (opacity / 100);
	BubbleArrow.MozOpacity = (opacity / 100);
	BubbleArrow.KhtmlOpacity = (opacity / 100);
	BubbleArrow.filter = "alpha(opacity=" + opacity + ")";
	
	//** Créer l'élément du message.
	BubbleBody = document.createElement('tbody');
	BubbleMsg = document.createElement('table');
	BubbleMsg.border = '0';
	BubbleMsg.cellSpacing = '0';
	BubbleMsg.cellPadding = '0';
	BubbleMsg.className = 'Bubble '+ BubbleSkin;
	BubbleMsg.id = "Bubble_"+Element.id;
	BubbleMsg.style.zIndex = (intZIndex + 5);
	document.body.appendChild(BubbleMsg);
	
		//** Créer La bulle
		BubbleTopLeft = document.createElement('td');
		BubbleTop	= document.createElement('td');
		BubbleTopRight = document.createElement('td');
	var tr = document.createElement('tr');
		tr.appendChild(BubbleTopLeft);
		tr.appendChild(BubbleTop);
		tr.appendChild(BubbleTopRight);
		BubbleBody.appendChild(tr);
			BubbleTopLeft.className = "TopLeft " + BubbleSkin;
			BubbleTop.className = "Top " + BubbleSkin;
			BubbleTopRight.className = "TopRight " + BubbleSkin;

		//** Créer le Header de la bulle
		BubbleLeft = document.createElement('td');	
		BubbleTitle = document.createElement('td');
		BubbleClose = document.createElement('td');
		BubbleRight = document.createElement('td');	
		
	var tr = document.createElement('tr');

		BubbleTitle.innerHTML = strTitle ;
		tr.appendChild(BubbleLeft);
		tr.appendChild(BubbleTitle);
		tr.appendChild(BubbleClose);
		tr.appendChild(BubbleRight);
			BubbleLeft.className = "Left " + BubbleSkin;
				BubbleLeft.rowSpan = "2";

			BubbleTitle.className = "Title " + BubbleSkin;
			BubbleClose.className = "Close " + BubbleSkin;

			BubbleRight.className = "Right " + BubbleSkin;
				BubbleRight.rowSpan = "2";
		BubbleBody.appendChild(tr);		
		

//		BubbleLeft = document.createElement('td');	
		BubbleContent = document.createElement('td');
	//	BubbleRight = document.createElement('td');	

		
	var tr = document.createElement('tr');

		//tr.appendChild(BubbleLeft);
		tr.appendChild(BubbleContent);
		//tr.appendChild(BubbleRight);

		BubbleBody.appendChild(tr);
			//BubbleLeft.className = "Left " + BubbleSkin;
			BubbleContent.className = "Content " + BubbleSkin
			//BubbleRight.className = "Right " + BubbleSkin;
			BubbleContent.innerHTML = strMessage;
			
		BubbleBottomLeft = document.createElement('td');
		BubbleBottom = document.createElement('td');
		BubbleBottomRight = document.createElement('td');
	var tr2 = document.createElement('tr');
		tr2.appendChild(BubbleBottomLeft);
		tr2.appendChild(BubbleBottom);
		tr2.appendChild(BubbleBottomRight);
		BubbleBody.appendChild(tr2);
			BubbleBottomLeft.className = "BottomLeft  " + BubbleSkin;
			BubbleBottom.className = "Bottom " + BubbleSkin;
			BubbleBottomRight.className = "BottomRight " + BubbleSkin;
	BubbleMsg.appendChild(BubbleBody);


	BubbleTop.colSpan = "2";
	BubbleContent.colSpan = "2";
	BubbleBottom.colSpan = "2";

	//Créer le X
	if (boolClose) {
	    var strBubbleCloseFunction = ""; 
        BubbleX = document.createElement('a');
		BubbleX.className = 'Bubble';
		BubbleX.innerHTML = strClose + "<img src=\"/CommonPages/Bubble/images/"+ BubbleFolder+ "X.gif\" />";
		
		BubbleClose.appendChild(BubbleX);

		if (this.settings.closefunction) {
		    strBubbleCloseFunction = this.settings.closefunction;
		}
		strBubbleCloseFunction += "ClearBubble(document.getElementById('" + BubbleMsg.id + "'));";
		if (this.settings.closeinutile) strBubbleCloseFunction = ""
		    BubbleX.href = "javascript:"+strBubbleCloseFunction+";";
	}
	intElementWidth = Element.offsetWidth;
	intElementHeight= Element.offsetHeight;
	if(!this.settings.width) 
		intWidth = BubbleMsg.offsetWidth+1;
	else
		intWidth = this.settings.width;
		
	
	//** Trouver la position de l'élément.
	if (Element.offsetParent)
    {
        curleft = Element.offsetLeft;
        curtop = Element.offsetTop;
        while (Element = Element.offsetParent)
        {
            curleft += Element.offsetLeft;
            curtop += Element.offsetTop;
        }
    }

	BoolCenter = false;
    
	//** Ajuster la position du message.
		//** Modifier la position left
	var IntPositionIndex = -1;
	var strArrow = "";
	if ( ((curleft-intElementWidth) - (intWidth/2)) <= scrollL ) {
		//** Ne peut être positionné à gauche :
		
		if( curleft + intWidth >= iWidth ){
			// ne peux être positionné à droite

			if (intWidth >= (iWidth - curleft - (intElementWidth/2))) {
				// La bulle serais plus grande que l'écran
				intWidth = iWidth - 50;
				intNewLeft = (scrollL + 25);
				intArrowLeft = curleft + (intElementWidth / 2);
			}
			else {
				//La bulle peut rentrer dans l'écran
				if ((parseInt((curleft + intWidth + 10),10) > parseInt(iWidth,10)) || (parseInt(intWidth,10) <= parseInt(intElementWidth,10))) {
					if (intElementWidth < 50) 
						intWidth = 50;
					else {
						intWidth = intElementWidth-20;
					}
				}
				intNewLeft = parseInt((curleft + 10),10);
				intArrowLeft = curleft + (intWidth / 2);
			}
			BoolCenter = true;
			
		} 
		else {
			/// *** la bulle est à droite
			if (intWidth < intElementWidth) {
				intNewLeft = (curleft + (intElementWidth-intWidth));
				intArrowLeft = (curleft + ((intElementWidth- (intWidth/3)) )  );
			} else {
				intNewLeft = (curleft );
				intArrowLeft = (curleft + ((intElementWidth/4) *3 )  );
			}
			strArrow = "droite";
		}
	}
	else {
		///*** Peut aller à Gauche ...
		if( curleft + (intWidth/2) >= iWidth){
			//*** Mais pas à droite ...
            intNewLeft = (curleft - intWidth + intElementWidth+5);
            intArrowLeft = (curleft);
		} else {
        /// *** Position Initiale.
		intNewLeft = (curleft - (intWidth / 2));
		intArrowLeft = (curleft + intElementWidth / 4);
		if ((intArrowLeft + 19) > (curleft + (intWidth / 2)))
			intArrowLeft = curleft;
		}
		strArrow	= "gauche";
	}

	BubbleMsg.style.width = intWidth + "px";
	if (intWidth <= BubbleMsg.offsetWidth) intWidth = BubbleMsg.offsetWidth;
	BubbleMsg.style.width = intWidth + "px";
	
		if(!this.settings.height) 
			intHeight = (BubbleContent.offsetHeight+26);
		else
			intHeight = this.settings.height;
		
	if (  parseInt((BubbleContent.offsetHeight+26),10) >= parseInt(intHeight,10)) {
		intHeight = BubbleMsg.offsetHeight;
	}
		
					//*****************************
					//** Modifier la positer Top **
					//*****************************

	if ( parseInt(scrollT,10) > parseInt((curtop - intHeight -12),10) ) {
		//** Ne peux être afficher en haut.
		if ((!BoolCenter) && (intElementHeight > 100)) {
			//** Vérifier la hauteur de l'élément si > 100 
			if ( ( (curleft - intWidth - 9) <= -1 ) || ( (curleft-intWidth -9 ) <= scrollL) ) {
				// ** Ne peut être positionné à gauche.
				if (curleft + intElementWidth + intWidth + 13 > iWidth) {
					//** Ne peut Être positioné à droite
					intNewTop = (curtop + intElementHeight + 13 );
					intArrowTop = (curtop + intElementHeight);
					if (!BubbleArrow.src)BubbleArrow.src = "/CommonPages/Bubble/images/"+ BubbleFolder+ "haut.png"
				}
				else {
					intNewTop = (curtop  +13) ;
					intNewLeft = (curleft + intElementWidth + 13 );
					intArrowLeft = (curleft + intElementWidth)
					intArrowTop = (curtop + 23);
					if (!BubbleArrow.src)BubbleArrow.src = "/CommonPages/Bubble/images/"+ BubbleFolder+ "gauche.png"
				}
			}
			else
			{
				intNewTop = (curtop  +13) ;
				intNewLeft = (curleft - intWidth - 9 );
				intArrowLeft = (curleft - 15)
				intArrowTop = (curtop + 25);
				if (!BubbleArrow.src)BubbleArrow.src = "/CommonPages/Bubble/images/"+ BubbleFolder+ "droite.png"
			}
			
			
		}
		else {
			//** la bulle sera en bas.
			intNewTop = (curtop + intElementHeight +13) ;
	
			if (!BubbleArrow.src)BubbleArrow.src = "/CommonPages/Bubble/images/"+ BubbleFolder+ "" + strArrow + "haut.png"
			intArrowTop = (curtop + intElementHeight);
		}
	}
	else {
		/// Position Initiale en Haut.
		intNewTop = (curtop - intHeight) - 12 ;

		if (!BubbleArrow.src)BubbleArrow.src = "/CommonPages/Bubble/images/"+ BubbleFolder+ "" + strArrow + "bas.png"
		intArrowTop = curtop - 14;
	}
	

	BubbleMsg.style.height  = intHeight +"px";
    
    BubbleMsg.style.top  = intNewTop + "px";
    BubbleMsg.style.left = intNewLeft + "px";

    this.myTop = BubbleMsg.style.top;
    this.myLeft = BubbleMsg.style.left;
    
	BubbleArrow.style.top = intArrowTop + "px";
	BubbleArrow.style.left = intArrowLeft + "px";

	BubbleContent.style.height = (intHeight - 37) + "px";
	
	if(isIE6) {
		BubbleFrame.style.height  = intHeight + "px";
	    BubbleFrame.style.width = intWidth +"px";
	    BubbleFrame.style.top  = intNewTop + "px";
	    BubbleFrame.style.left = intNewLeft + "px";
	    BubbleFrame.src = "/CommonPages/template/images/msg_error2.gif";
		document.body.appendChild(BubbleFrame);
	}
	intZIndex += 10;
	if(this.settings.focus) {
	    if (this.settings.focus.toUpperCase() == "ELEMENT") {
	        setTimeout(function () { eval("document.getElementsByName('"+ObjElement.name+"')[0].focus()")}, 1);
	        //ObjElement.focus();
	    } else if (this.settings.focus.toUpperCase() == "NONE") {
			
		} else {
	        //BubbleMsg.focus();
	        //setTimeout('BubbleMsg.focus();', 5);
	        //PBO 3 sept Retrait bug dans dnd item list
			//setTimeout(function () { eval("document.getElementById('" + BubbleMsg.id + "').focus()") }, 1);
	    }
	}
}


// function par défault à créer pour faire une nouvelle bulle
// les 2 valeur nécessaire sont : le text et l' "element"
function CreateBubble(strMessage,Element) {
			var ObjBubble = new Bubble(
			{
				title: 'irlazy.com',
				text: '<h2>Announcement</h2>Test' + strMessage,
				skin: 'Error',
				width: 200,
				height: 100,
				element: Element,
				focus: 'bulle',
				close: 'Close'
			});
			//ObjBubble.show();
}

function ClearAllBubbles() {
	var x = document.getElementsByTagName("table");
	for(i=x.length-1;i>=0;i--) {
		if(x[i].id.match("Bubble_")) {
			var isIE6 = (document.all && window.external && (typeof document.documentElement.style.maxHeight === 'undefined')) ? true : false;
			if(isIE6) { document.body.removeChild(document.getElementById("Frame_" + x[i].id))}
			document.body.removeChild(document.getElementById("Arrow_" + x[i].id));
			document.body.removeChild(x[i]);
		}
	}
	intZIndex = 900;
}

function ClearBubble(Element){
	if ((Element != null)) {
		if (! Element.id.match("Bubble_"))
			Element = document.getElementById("Bubble_" + Element.id);
		if ((Element != null)) {
			var isIE6 = (document.all && window.external && (typeof document.documentElement.style.maxHeight === 'undefined')) ? true : false;
			if(isIE6) {document.body.removeChild(document.getElementById("Frame_" + Element.id))}	
			document.body.removeChild(document.getElementById("Arrow_" + Element.id));
			document.body.removeChild(Element);
		}
	}
}
