// ==UserScript==
// @name        Picarto AdminHighlight
// @namespace   http://www.furaffinity.net/user/Maloo
// @description Highlights anyone's messages in chat that has admin capabilities. Updated for 5/8/18's update.
// @include     https://picarto.tv/*
// @version     2.0
// @grant       none
// @license MIT
// @updateURL https://openuserjs.org/meta/maloomf9/Picarto_AdminHighlight.meta.js
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
}



addGlobalStyle(".modMsg, .streamerMsg {color: #FFFFFF !important; border-radius: 8px !important; padding: 2px !important;}" +
".modMsg {background: #5d85d0 !important;}" + //.msgModContent
".streamerMsg {background: #ca4b4b !important;"); //.msgAdminContent

var tarEl = document.querySelector("#msgs");

var updateHighlights = function(mutList)
{
    mutList.forEach(function(mutati) {
        mutati.addedNodes.forEach(function(node) {
            if (node.querySelector("[title=\"Streamer\"]"))
            {
                node.querySelector(".msgContent:not(.modMsg):not(.streamerMsg)").classList.add("streamerMsg");
            }
            else if (node.querySelector("[title=\"Moderator\"]"))
            {
                node.querySelector(".msgContent:not(.modMsg):not(.streamerMsg)").classList.add("modMsg");
            }
        });
    });
}

var mutObserver = new MutationObserver(updateHighlights);

mutObserver.observe(tarEl, {childList: true});

