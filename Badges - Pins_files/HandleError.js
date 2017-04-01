onerror = handleErr;
function handleErr(msg, url, l, title) {
	title = typeof(title) == "string" ? title : "";
	strParameter = typeof(strParameter) == "string" ? strParameter : "";
	
    
	var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
			this.appVersion = navigator.appVersion;
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
			},
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]

	};
	BrowserDetect.init();
	
		var xmlhttp;
		if (window.XMLHttpRequest) {
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		}
		else if (window.ActiveXObject) {
			// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	 
		engine = null;
		if (window.navigator.appName == "Microsoft Internet Explorer") {
			// This is an IE browser. What mode is the engine in?
			if (document.documentMode) // IE8
				engine = document.documentMode;
			else // IE 5-7
			{
				engine = 5; // Assume quirks mode unless proven otherwise
				if (document.compatMode) {
					if (document.compatMode == "CSS1Compat")
						engine = 7; // standards mode
				}
			}
			// the engine variable now contains the document compatibility mode.
		}
		xmlhttp.onreadystatechange = function() {
			var strTmp = "";
			switch (xmlhttp.readyState) {
				case 2:
					//The request has been sent
					
					break;
				case 3:
					// the Request is in process
					
					break;
				case 4:
					// the request is complete
					
				break;
			}

		}
		
		var params = "";
		params = "Msg=" + encodeURIComponent(msg) + "&Url=" + encodeURIComponent(url) + "&Line=" + l + "&Engine=" + engine + "&Title=" + encodeURIComponent(title);
		//if (typeof(document.body) == "object")
		//	params += "&WebContent=" + encodeURIComponent(document.body.innerHTML);
		params += "&JqueryEnabled=" + (typeof($) != "function");
		params += "&browserName=" + BrowserDetect.browser;
		params += "&browserVersion=" + BrowserDetect.version;
		params += "&os=" + BrowserDetect.OS;
		params += "&appVersion=" + encodeURIComponent(BrowserDetect.appVersion);
		
		xmlhttp.open("POST", "/CommonPages/Template/api/handleError/AjaxHandleError.asp" + strParameter, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(params);
	
	
    return false;
}