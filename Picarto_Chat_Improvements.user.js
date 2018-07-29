// ==UserScript==
// @name        Picarto Chat Improvements
// @namespace   http://www.furaffinity.net/user/Maloo
// @description Adds Spellcheck, reduces font size slightly, reduces padding around text, restores old font on page.
// @include     https://picarto.tv/*
// @include		https://picarto.tv/chatpopout/*
// @exclude		https://picarto.tv/settings/*
// @exclude		https://picarto.tv/site/*
// @version     1.1
// @grant       none
// ==/UserScript==

function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		while (document.getElementsByTagName('head')[0] === null)
		{
			/*var ms;
			ms = 10;
			ms += new Date().getTime();
			while (new Date() < ms){}*/
		}
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
	document.getElementById('msg').spellcheck = 'true';
}


addGlobalStyle(
'.infoContent, .my_infoContent {max-width: 100% !important; padding: 1px 4px !important; border-radius: 0px !important;}' +
'.messageli, .mymessageli {padding: 1px 0px !important; font-size: 12px !important;}' +
'.msgContentIdentifier, .my_msgContentIdentifier {font-size: 12px !important;}' +
'.theMsg, .theSndMsg {padding: 0px !important;}' + 
'body {font-family:"Helvetica Neue",Helvetica,Arial,sans-serif !important;}'




);
