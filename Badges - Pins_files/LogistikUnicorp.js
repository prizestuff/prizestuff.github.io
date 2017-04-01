function ValidQtyOnly(objInput)
{
  if (chrLang == "E")
  {
    strEnterGreaterThanZero = "You must enter a number equal or greater than zero (0)."
  }
  else
  {
    strEnterGreaterThanZero = "Vous devez entrer un nombre plus grand ou égale à zéro (0)."
  }


  intValue = trim(objInput.value)


  if(intValue.length == 0)
  {
    objInput.value = "0"
    return true;
  }

  if (isNaN(intValue))
  {
    alert(strEnterGreaterThanZero)
    return false
  }
  
  if(intValue < 0)
  {
    alert(strEnterGreaterThanZero)
    return false
  }

  for(i = 0; i < intValue.length; i++)
    if(!(intValue.charAt(i) >= 0 && intValue.charAt(i) <= 9))
    {
      alert(strEnterGreaterThanZero)
      return false;
    }
  
  objInput.value = parseInt(intValue,10)
  return true;
}


function trim(str)
{
  return str.replace(/^\s*|\s*$/g,"");
}


function BlurFld(objTextField)
{
 // if (objTextField.value.length == 0)
    objTextField.style.background="#ffffff"
//  else
//    objTextField.style.background="#accce4"
}


function FocusFld(objTextField)
{
  objTextField.style.background="#ffffd0"//"#ffffd0"
}


//******************************************************
//   Change the background color of input with values
//******************************************************
function StartPage()
{
var i = 0;

//  for (i=0;i<document.forms[0].length;i++)
//    if (document.forms[0].elements[i].type == "text")
//      if (document.forms[0].elements[i].value.length > 0)
//        document.forms[0].elements[i].style.background="#accce4"

}




//******************************************************
//   Waiting window
//******************************************************

  var WinProcess
  var WinProccesIsOpen = false

  function OpenWinProcess()
  {
    try {
		WinProcess = window.open("/CommonPages/waiting" + chrLang + ".html","LogistikUnicorp","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=no,copyhistory=no,width=280,height=120,top=" + (screen.height - 120) / 2 + ",left=" +  (screen.width - 280) / 2)
	} catch (err) {
	
	}
    WinProccesIsOpen = true;
  }


  function CloseWinProcess()
  {
	try {
		if (WinProccesIsOpen && typeof(WinProcess) == "object")
			WinProcess.close();
	} catch (err) {
	
	}
	WinProccesIsOpen = false
	WinProcess = "";
  }


//******************************************************
//   Show a larger image
//******************************************************
var newWindow 
function PopUpImg(settings) 
{
	chrLang = typeof(chrLang) != "undefined" ? chrLang : "F";
	if ( typeof(settings) != "string" ) {
		settings.title = settings.title ? settings.title : settings.img;
		settings.skin = settings.skin ? settings.skin : "vista";
	} else {
		var tmpIMGtoOpen = settings;
		var settings = {};
		settings.img = tmpIMGtoOpen;
		settings.title = tmpIMGtoOpen;
		settings.skin = "vista";
	}
	
	settings.contract = settings.contract ? settings.contract : typeof(strContract) != "undefined" ? strContract : "";
	var strImgPath = getImagePath(settings.contract);
	if (strImgPath != "") {
		var myImg = document.createElement("img");
		if ( settings.img != "notfound")
			myImg.src = strImgPath + settings.img + ".jpg";
		else
			myImg.src = "/images/notfound.jpg";
		
		myImg.alt = "";
		//myImg.style.display="none";
		myImg.style.visibility="hidden";
		myImg.style.position = "absolute";
		myImg.style.top = "0px";
		myImg.style.left = "0px";
		document.body.appendChild(myImg);
		var intHeight = 0
		var intWidth = 0
		if (myImg.offsetWidth > 0)intWidth = myImg.offsetWidth+25;
		if (myImg.offsetHeight > (self.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight)) - 100) {
			intHeight = (self.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight)) - 100
			intWidth += 15
		}
		myImg.onload = function () {
			newWindow.center();
			if (! settings.loaded) {
				settings.loaded = true;
				newWindow.close();
				PopUpImg(settings) ;
			}
			return;		
		};
		myImg.onclick = function () {
			newWindow.close();
		}
		myImg.style.cursor = "pointer";
		//document.body.removeChild(myImg);
		newWindow = null
		newWindow = new DOMAlert({
			title: settings.title,
			text: "",
			skin:settings.skin,
			buttonarea:false,
			/*height:intHeight,*/
			/*width:intWidth,*/
			imageDisplay:true
		});
		newWindow.html.contentMiddleDiv.style.padding = "0";
		newWindow.html.contentMiddleDiv.appendChild(myImg);
		myImg.style.visibility="visible";
		myImg.style.position = "static";
		newWindow.show();
		newWindow.center();
	} else {
		newWindow=window.open("/CommonPages/ShowPhoto.asp?img=" + settings.img + "&contract=" + settings.contract + "&chrLang=" + chrLang ,"","width=100,height=100,scrollbars=yes,resizable=yes,top=0,left=0");
		if (newWindow == null) {
			// POP-up blocker ?
		} else {
			newWindow.focus();
		}	
	}
	 
}


//******************************************************
//   Validation for the password page
//******************************************************
function ValidatePassword()
{
  if (chrLang == "E")
  {
    strEmptyFields	= "All fields are mandatory."
    strNotSameEntered	= "The new password entries do not match."
    strSamePassword	= "The new password must be different than the current password."
    strNotEnoughtLong	= "Your password must contain at least 5 characters."
  }
  else
  {
    strEmptyFields	= "Tous les champs sont obligatoires."
    strNotSameEntered	= "Les entrées du nouveau mot de passe ne correspondent pas."
    strSamePassword	= "Le nouveau mot de passe doit être différent du mot de passe actuel."
    strNotEnoughtLong	= "Votre mot de passe doit contenir au minimum 5 caractères."
  }

  if(document.forms[0].PasswordNew1.value != document.forms[0].PasswordNew2.value)
  {
    alert(strNotSameEntered)
    return false;
  }
     
  if(document.forms[0].PasswordNew1.value == "" || document.forms[0].PasswordNew2.value == "" || document.forms[0].Password.value == "")
  {
    alert(strEmptyFields)
    return false;  
  }

  if(document.forms[0].PasswordNew1.value == document.forms[0].Password.value)
  {
    alert(strSamePassword)
    return false;  
  }

  if(document.forms[0].PasswordNew1.value.length < 5 || document.forms[0].PasswordNew2.value.length < 5)
  {
    alert(strNotEnoughtLong)
    return false;  
  }

  return true;
}


//******************************************************
//   Validation for the personal questions page
//******************************************************
function ValidateQuestions()
{
  if (chrLang == "E")
  {
    strEmptyFields	= "All fields are mandatory."
    strEmptyPassword	= "You must provide your password to change your personal questions."
  }
  else
  {
    strEmptyFields	= "Tous les champs sont obligatoires."
    strEmptyPassword	= "Vous devez fournir votre mot de passe afin de modifier vos questions personnelles."
  }


  if(document.forms[0].TB_Question1.value == "" || document.forms[0].TB_Question2.value == "" || document.forms[0].TB_Answer1.value == "" || document.forms[0].TB_Answer2.value == "")
  {
    alert(strEmptyFields)
    return false;  
  }

  if(document.forms[0].Password.value == "")
  {
    alert(strEmptyPassword)
    return false;  
  }

  return true;

}

//******************************************************
//   PopUp measurements descriptions
//******************************************************
function PopUpMeasurement(settings)
{
    if (typeof(settings) == "string") {
		var URLtoOpen = settings
		newWindow=window.open("/images/park/" + chrLang + URLtoOpen + ".htm?c","","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,copyhistory=no,width=790,height=530,top=0,left=0");
	} else {
		settings.clientUniqueKey = settings.clientUniqueKey ? settings.clientUniqueKey : "";
		settings.user = settings.user ? settings.user : "";
		settings.contractCode = settings.contractCode ? settings.contractCode : "";
		settings.type = settings.type.toUpperCase() == "HIPS" ? "HIP" : settings.type;
		newWindow=window.open("/CommonPages/MeasurementsVideo/Measurement.asp?Lang=" + chrLang + "&P_User=" + settings.user + "&user=" + settings.clientUniqueKey + "&Page=" + settings.type +"&Contract="+ settings.contractCode ,"","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,history=no,width=950,height=680,top=50,left=50");
	}
	if (newWindow)
		newWindow.focus();
}

//******************************************************
//   PopUp the new measurements descriptions
//******************************************************
function PopUpMeasurementNew(URLtoOpen)
{
	newWindow=window.open("/CommonPages/Measurements/Measurement.asp?Lang=" + chrLang + "&Page=" +URLtoOpen ,"","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,copyhistory=no,width=750,height=580,top=0,left=0");
	if (newWindow)
		newWindow.focus();
}

//******************************************************
//   PopUp the new measurements video descriptions
//******************************************************
function PopUpMeasurementNewVideo(EmpId, URLtoOpen, ContractId)
{
	if(URLtoOpen=="HIPS")
	{
		URLtoOpen = "hip"
	}
	
	var newWindow = window.open("/CommonPages/MeasurementsVideo/Measurement.asp?P_User=" + EmpId + "&Lang=" + chrLang + "&Page=" + URLtoOpen + "&Contract=" + ContractId ,"","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes,copyhistory=no,width=950,height=580,top=0,left=0");
	if (newWindow)
		newWindow.focus();
}



//******************************************************
//   Change field of phone number
//******************************************************
function NextInputPhone(objInput,IDNext)
{
  if (objInput.value.length >= 3)
	if (document.getElementById(IDNext)) {
		document.getElementById(IDNext).select()
		document.getElementById(IDNext).focus()
	}
}

//******************************************************
//   Validate Date  yyyy-mm-dd
//		Error Code 
//			-1. Please enter date as either yyyy-mm-dd.
//			-2.	Month must be between 1 and 12.
//			-3.	Day must be between 1 and 31.
//			-4. Month "+month+" doesn`t have 31 days!
//			-5. February doesn`t have > 28-29 days!
//******************************************************

function isDate(dateStr) {
	var datePat = /^(\d{4})(-)(\d{1,2})(-)(\d{1,2})$/;
	var matchArray = dateStr.match(datePat); // is the format ok?

	if (matchArray == null) {
		return -1;
	}

	year = matchArray[1];
	month = matchArray[3]; // p@rse date into variables
	day = matchArray[5];

	if (month < 1 || month > 12) { // check month range
		return -2;
	}

	if (day < 1 || day > 31) {
		return -3;
	}

	if ((month==4 || month==6 || month==9 || month==11) && day==31) {
		return -4;
	}

	if (month == 2) { // check for february 29th
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day > 29 || (day==29 && !isleap)) {
			return -5;
		}
	}
	return 1; // date is valid
}


//******************************************************
//   Validate the phone number  ###-###-####
//******************************************************
function ValidatePhone()
{

  if (chrLang == "E")
    strFieldsNotAllCompleted = "To indicate a valid phone number, please complete the area code and phone number fields using numbers only (no letters or other characters). If you do not wish to indicate your phone number, click CLEAR to clear the fields."
  else
    strFieldsNotAllCompleted = "Afin d'indiquer un numéro de téléphone valide, SVP complétez les champs du code régional et de numéro de téléphone en utilisant seulement des numéros (aucune lettre ou autre caractère). Si vous ne désirez pas indiquer de numéro de téléphone, cliquez sur EFFACER pour effacer le contenu des champ."
	if ((typeof(document.forms[0].TB_Phone1)).toLowerCase() != "undefined") {
	  intNbChars = document.forms[0].TB_Phone1.value.length + document.forms[0].TB_Phone2.value.length + document.forms[0].TB_Phone3.value.length
	  boolNotNumber = isNaN(document.forms[0].TB_Phone1.value) || isNaN(document.forms[0].TB_Phone2.value) || isNaN(document.forms[0].TB_Phone3.value)

	  if((intNbChars != 0 && intNbChars != 10) || boolNotNumber)
	  {
		alert(strFieldsNotAllCompleted)
		return false;
	  }
	}
  return true;
}





//******************************************************
//   Validate the phone number  ###-###-####
//******************************************************
function ValidateMultiplePhone(strTB1,strTB2,strTB3,strExt)
{

  strValue1   = eval("document.forms[0]."+strTB1+".value")
  strValue2   = eval("document.forms[0]."+strTB2+".value")
  strValue3   = eval("document.forms[0]."+strTB3+".value")
  strValueExt = ""

  if(strExt != "")
    strValueExt = eval("document.forms[0]."+strExt+".value")


  intNbChars = strValue1.length + strValue2.length + strValue3.length

  strPhone = strValue1 + strValue2 + strValue3 + strValueExt

  boolNotNumber = false

  for(ValidateMultiplePhoneIteration = 0; ValidateMultiplePhoneIteration < strPhone.length; ValidateMultiplePhoneIteration++)
    if(!(strPhone.charAt(ValidateMultiplePhoneIteration) >= 0 && strPhone.charAt(ValidateMultiplePhoneIteration) <= 9))
      boolNotNumber = true

  if((intNbChars != 0 && intNbChars != 10) || boolNotNumber)
    return false;

  return true;
}


function ClearPhone()
{
  document.forms[0].TB_Phone1.value=""
  document.forms[0].TB_Phone2.value=""
  document.forms[0].TB_Phone3.value=""
  return false;
}


function ClearPhoneMultiple(strTB1,strTB2,strTB3,strExt)
{
  eval("document.forms[0]."+strTB1+".value=''")
  eval("document.forms[0]."+strTB2+".value=''")
  eval("document.forms[0]."+strTB3+".value=''")

  if(strExt.length > 0)
    eval("document.forms[0]."+strExt+".value=''")

  return false;
}


//******************************************************
//   Display a specific section in the help side guide
//******************************************************
function PopUpGuide(UserKey,SectionToOpen) 
{
  newWindow=window.open("SPU-HelpSiteGuide-F.asp?User=" + UserKey+ "&Section=" + SectionToOpen,"","width=" + eval(window.screen.width-150) + ",height=" + eval(window.screen.height-150) + ",scrollbars=yes,resizable=yes,top=0,left=0");
  newWindow.focus()
}
//**************************************
//	Display Calandar
//**************************************
function CallCalandar(intMinYear,intMaxYear,strValue)
{
  if (intMinYear == null) intMinYear = 0;
  if (intMaxYear == null) intMaxYear = 0;
  if (strValue == null)	strValue = 'TB_DateTimeExpected'
  x=window.open("/CommonPages/Calandar/Calendar.asp?intMinYear="+ intMinYear +"&intMaxYear="+ intMaxYear + "&TextBox=" + strValue + "&Date="+(document.getElementById(strValue).value),"","toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=no,copyhistory=no,width=250,height=340,top=" + (screen.height - 170) / 2 + ",left=" +  (screen.width - 380) / 2)
  x.focus();

}
// ********************************************
//		Display CurrencyFormat
// ********************************************
function LU_DisplayCurrency(fltNumber,chrLanguage) 
{
	var strNumber,Price,PriceLength,strPrice,intLength, strCents, strInteger;
	strNumber = "";
	Price = Math.round(fltNumber * 100)
	Price = Math.abs(Price)
	strNumber = Price.toString();
	PriceLength  = strNumber.length;
	switch(PriceLength) {
	    case 1:
			strPrice = "0.0" + Price.toString();
			break;
	   
		case 2:
			strPrice = "0." + strNumber;
			break;
		
		default:
			strCents = "." + strNumber.substring( PriceLength - 2, PriceLength );
			strInteger = strNumber.substring(0, PriceLength - 2 );
			if (PriceLength > 5) {	
				var i = 0
				var arrIntPart = new Array();
				intLength = strInteger.length;
				do {
					arrIntPart[i] = strInteger.substring( intLength - 3, intLength );
					strInteger = strInteger.substring( 0, intLength - 3 );
					intLength = strInteger.length;
					i++;
				} while (intLength > 3);
				
				strPrice = "";
				for (x in arrIntPart) {
					strPrice = arrIntPart[x] + " " + strPrice;
				}
				strPrice = strInteger + " " + strPrice;
			} else {
				strPrice = strInteger;
			}
			strPrice += strCents;
			break;
	}  
	
	
	switch(chrLanguage) {
		case 'E':
			strPrice = "$" + strPrice
			break;
		case 'F':
			strPrice = strPrice.replace('.',',')
			strPrice += " $"
			break;
	}
	
	
	if (fltNumber < 0) strPrice = "-" + strPrice
		return strPrice;
}

function LU_SwitchLang(strClientUniqueKey)
{
	newWindow=self.open("/CommonPages/SwitchLang.asp?user=" + strClientUniqueKey , '', 'scrollbars=no,resizable=no,top=00, left=00, width=100,height=100');
	newWindow.focus();
}

function getImagePath(intContract) {
	switch(intContract) {
		case "CPC" :
			//intContract = 3;
			break;
	}
	
	switch( parseInt(intContract,10)) {
		case 1 :
			return "/images/cnxs/";
			break;
		case 3 :
			return "/images/CPC/";
			break;
		case 4 :
			return "/images/Park/";
			break;
		case 6 :
			return "/images/Catsa/";
			break;
		case 7 :
			return "/images/olgc/";
			break;
		case 9 :
			return "/images/BCFerries/";
			break;
		case 25 :
			return "/images/saq/";
			break;
		case 29 :
			return "/images/telus/";
			break;
		case 31 :
			return "/images/COO/";
			break;
		case 32 :
			return "/images/stm/";
			break;
		case 33 :
			return "/images/Sepaq/";
			break;
		case 34 :
			return "/images/AirCanada/";
			break;
		case 36 :
			return "/images/SAAQ/";
			break;
		default :
			return "";
	}
}

function lu_dbDateFormat(p_Date) {
	return p_Date.getFullYear()  + "-" + ((p_Date.getMonth()+1) <10 ? "0"+(p_Date.getMonth()+1) : (p_Date.getMonth()+1) ) + "-" + (p_Date.getDate()<10?"0"+p_Date.getDate():p_Date.getDate());
}
function lu_On2Digit(intNumber) {
	return ((intNumber) <10 ? "0"+(intNumber) : (intNumber) )
}
function lu_alert(strTitle, strMsg){
	if (! strMsg) {
		strMsg = strTitle;
		if ( typeof( chrLang ) == "undefined"  ) { 
			strTitle = "Web Message! / Message du site!";
		} else {
			if ( chrLang == "E" ) {
				strTitle = "Web Message!";
			} else {
				strTitle = "Message du site!";
			}
		}
	}
	if (typeof(jQuery) != "function") {
		alert(strMsg.replace(/<br \/>/g,"\n"));
	} else {
		var myDiv = $(document.createElement("div"));
			myDiv.attr("title",strTitle);
				myDiv.html("<p>" + strMsg.replace(/\n/g,"<br />") + "</p>");
			myDiv.appendTo(document.body);
			$( "#dialog:ui-dialog" ).dialog( "destroy" );
			myDiv.dialog({
				resizable: false,
				modal: true,
				buttons: {
					Ok: function() {
						$( this ).dialog( "close" );
					}
				},
				width:400
			});
	}
}

function dom_alert(strTitle, strMsg) {
	if (! strMsg) {
		strMsg = strTitle;
		if ( typeof( chrLang ) == "undefined"  ) { 
			strTitle = "Web Message! / Message du site!";
		} else {
			if ( chrLang == "E" ) {
				strTitle = "Web Message!";
			} else {
				strTitle = "Message du site!";
			}
		}
	}
	var myAlert = new DOMAlert({
		text: strMsg.replace(/\n/g,"<br />"),
		title: strTitle ,
		width: 550
	}).show();
}

function DumpObjectIndented(obj, indent)
{
  var result = "";
  if (indent == null) indent = "";

  for (var property in obj)
  {
    var value = obj[property];
    if (typeof value == 'string')
      value = "'" + value + "'";
    else if (typeof value == 'object')
    {
      if (value instanceof Array)
      {
        // Just let JS convert the Array to a string!
        value = "[ " + value + " ]";
      }
      else
      {
        // Recursive dump
        // (replace "  " by "\t" or something else if you prefer)
        var od = DumpObjectIndented(value, indent + "  ");
        // If you like { on the same line as the key
        //value = "{\n" + od + "\n" + indent + "}";
        // If you prefer { and } to be aligned
        value = "\n" + indent + "{\n" + od + "\n" + indent + "}";
      }
    }
    result += indent + "'" + property + "' : " + value + ",\n";
  }
  return result.replace(/,\n$/, "");
}

// address = { // all optional
//     address1: ...,
//     address2: ...,
//     address3: ...,
//     city: ...,
//     province: ...,
//     postalcode: ...,
//     country: ...,
//	   phone: ...,
//	   shippingcode: ...
// }
// strSessionParam =
//		either user=XFJKH)*XF... or P_User=xxxxxx&contract=x
function ValidateAddressPuro(address, strSessionParam) {
	return true; // Désactivation
	var success = false,
		url = "/validateaddresspuro.asp?" + strSessionParam,
		onajaxdone = function (msg) {
			var json;
			if (window.JSON) {
				json = JSON.parse(msg)
			}
			else {
				json = eval ("(" + msg + ")")
			}
			
			if (json.error == 0) {
				success = true
			}
			else {
				chrLang = (typeof(chrLang) != "undefined" ? chrLang : "E");
				skin = (typeof(skin) != "undefined" ? skin : "");
				popupPuroHeight = (typeof(popupPuroHeight) != "undefined" ? popupPuroHeight : "");
				strErrorMsg = ""
				if (json.error == 7) {
					if (json.lang == "E") {
						strErrorMsg = "<p>In order to continue shipment of our uniform items during the Canada Post strike, Logistik Unicorp has retained the shipping services of Purolator.</p><p>The shipping address indicated is not a standard Purolator delivery address. The combination of Postal Code and Province is not valid.</p><p>For information on valid addresses, visit <a href=\"https://www.purolator.com/en/ship-track/find-location.page\" target=\"_blank\">https://www.purolator.com/en/ship-track/find-location.page</a>.</p><p>For any questions, please contact Logistik Unicorp customer service (by phone : 1 (888) 326-8688 or by email : info@logistikunicorp.com. Please include your user number, if applicable).</p>"
					}
					else {
						strErrorMsg = "<p>Dans un souci de poursuivre la livraison de nos articles d&#39;uniformes lors de la gr&egrave;ve chez Postes Canada, Logistik Unicorp a retenu les services d&#39;exp&eacute;dition de Purolator.</p><p>L&#39;adresse de livraison indiqu&eacute;e ne correspond pas aux standards d&#39;adresse de livraison de Purolator. La combinaison code postal et province n&#39;est pas valide.</p><p>Pour des informations sur la validit&eacute; des adresses, consulter le <a href=\"https://www.purolator.com/fr/ship-track/find-location.page?location=valider une adresse\" target=\"_blank\">https://www.purolator.com/fr/ship-track/find-location.page?location=valider une adresse</a>.</p><p>Pour toute question, veuillez communiquer avec le service &agrave; la client&egrave;le de Logistik Unicorp (par t&eacute;l&eacute;phone : 1 (888) 326-8688 ou par courriel : info@logistikunicorp.com. SVP inclure votre num&eacute;ro d'usager, s'il y a lieu).</p>"
					}
				}
				else {
					if (json.error == 8) {
						if (json.lang == "E") {
							strErrorMsg = "<p>In order to continue shipment of our uniform items during the Canada Post strike, Logistik Unicorp has retained the shipping services of Purolator.</p><p>The shipping address indicated contains a Postal box, but no phone number is associated with this shipping address. Please ensure that you have a phone number in your profile so that Purolator can contact you for delivery. Alternatively, please enter a complete civic address (no postal box) with civic number, street, city and postal code.</p><p>For information on valid addresses, visit <a href=\"https://www.purolator.com/en/ship-track/find-location.page\" target=\"_blank\">https://www.purolator.com/en/ship-track/find-location.page</a>.</p><p>For any questions, please contact Logistik Unicorp customer service (by phone : 1 (888) 326-8688 or by email : info@logistikunicorp.com. Please include your user number, if applicable).</p>"
						}
						else {
							strErrorMsg = "<p>Dans un souci de poursuivre la livraison de nos articles d&#39;uniformes lors de la gr&egrave;ve chez Postes Canada, Logistik Unicorp a retenu les services d&#39;exp&eacute;dition de Purolator.</p><p>L&#39;adresse de livraison indiqu&eacute;e contient un casier postal, mais aucun num&eacute;ro de t&eacute;l&eacute;phone n&#39;est associ&eacute; pour cette adresse de livraison. Assurez-vous d&#39;avoir un num&eacute;ro de t&eacute;l&eacute;phone &agrave; votre profil afin que Purolator puisse vous contacter pour la livraison. Sinon, veuillez entrer une adresse civique compl&egrave;te (pas de casier postal) : num&eacute;ro civique, rue, ville et code postal.</p><p>Pour des informations sur la validit&eacute; des adresses, consulter le <a href=\"https://www.purolator.com/fr/ship-track/find-location.page?location=valider une adresse\" target=\"_blank\">https://www.purolator.com/fr/ship-track/find-location.page?location=valider une adresse</a>.</p><p>Pour toute question, veuillez communiquer avec le service &agrave; la client&egrave;le de Logistik Unicorp (par t&eacute;l&eacute;phone : 1 (888) 326-8688 ou par courriel : info@logistikunicorp.com. SVP inclure votre num&eacute;ro d'usager, s'il y a lieu).</p>"
						}
					}
					else {
						if (json.lang == "E") {
							strErrorMsg = "<p>An error occurred, please try again.</p><p>For any questions, please contact Logistik Unicorp customer service (by phone : 1 (888) 326-8688 or by email : info@logistikunicorp.com. Please include your user number, if applicable).</p>"
						}
						else {
							strErrorMsg = "<p>Une erreur s&#39;est produite, veuillez r&eacute;essayer.</p><p>Pour toute question, veuillez communiquer avec le service &agrave; la client&egrave;le de Logistik Unicorp (par t&eacute;l&eacute;phone : 1 (888) 326-8688 ou par courriel : info@logistikunicorp.com. SVP inclure votre num&eacute;ro d'usager, s'il y a lieu).</a>"
						}
					}
				}
				new DOMAlert({
					title: "",
					text: strErrorMsg,
					skin:skin,
					buttonarea:false,
					width:550,
					height:popupPuroHeight,
					imageDisplay:false
				}).show();
			}
		},
		dorequest = function (servermethod, calltype, callback) {
			this.servermethod = servermethod;
			this.dorequest = function (clientobject) {
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.open(calltype, this.servermethod, false);
				xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlHttp.setRequestHeader("Charset", "UTF-8");
				xmlHttp.onreadystatechange = function ParseResult(ReturnVal) {
					if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
						callback(xmlHttp.responseText);
					}
				}
				if (typeof clientobject === 'undefined') {
					xmlHttp.send();
				} else {
					var strPostBody = ""
					for (key in clientobject) {
						if (strPostBody.length > 0)
							strPostBody += "&"
						strPostBody += key + "=" + clientobject[key]
					}
					xmlHttp.send(strPostBody);
				}
			};
			return this
		};
	//console.log(address)
	new dorequest(url, "POST", onajaxdone).dorequest(address)
	return success	
}

document.write('<script type="text/javascript" src="/CommonPages/template/api/handleError/HandleError.js"></scr' + 'ipt>');
document.write('<script type="text/javascript" src="/CommonPages/Loading/loading.js"></scr' + 'ipt>');
document.write('<script type="text/javascript" src="/CommonPages/Bubble/bubble.js"></scr'+'ipt>');
document.write('<script type="text/javascript" src="/CommonPages/Alert/DOMAlert.js"></scr' + 'ipt>');


