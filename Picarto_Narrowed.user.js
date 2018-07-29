// ==UserScript==
// @name        Picarto Narrowed
// @namespace   http://www.furaffinity.net/user/maloo
// @description Updated 2018-06-04 - Restores buttons to manually move chat, reduces layout size and clutter, dramatically improves automatic chat position switching
// @license     MIT
// @include     https://picarto.tv/*
// @exclude		https://picarto.tv/
// @exclude		https://picarto.tv/settings/*
// @exclude		https://picarto.tv/site/*
// @exclude		https://picarto.tv/communities/explore
// @exclude		https://picarto.tv/chatpopout/*
// @exclude     https://picarto.tv/*/*
// @version     6.11
// @grant       none
// ==/UserScript==


window.versionString = "Picarto Narrowed 6.11";

console.log("Loading " + versionString);

var topMenu = document.querySelector('#menu_holder');
var isMultistream = document.querySelector('#playerHolder3');
var isDualstream = document.querySelector('#playerHolder2');

//Add in the manual chat position switcher buttons.
var insPoint = document.querySelector('#chatHeader span');
insPoint.insertAdjacentHTML('beforeend',
'<div class="headingBtns chatpositionswitcher chat_menu_btn" title="Move Chat Below"><i class="far fa-fw fa-caret-square-down headerTabBtn clickThru"></i></div>' + //style="margin-top: 5px;"
'<div class="headingBtns chatpositionswitcherON chat_menu_btn" title="Move Chat to Side"><i class="far fa-fw fa-caret-square-right headerTabBtn clickThru"></i></div>'); //style="margin-top: 5px;"

//Move the user bar below the video.
var tarElem = document.querySelector('user-bar');
insPoint = document.querySelector('block-channel-playerset');
insPoint.parentNode.insertBefore(tarElem, insPoint.nextSibling);

//Move the Top menu into the left column scroll area.
insPoint = document.querySelector('.player-container');
insPoint.insertBefore(topMenu, insPoint.firstChild);

//Move the Stream button to the video floater and change it into a X button, so we have a way to get back from videos.
var waitCounter = 0;
var waitForStreamBtn = setInterval(function() {
   if (document.querySelector('[data-i18n="channel.stream"]'))
     {
         clearInterval(waitForStreamBtn);
         tarElem = document.querySelector('[data-i18n="channel.stream"]');
         tarElem.innerHTML = 'X';
         tarElem = tarElem.parentNode;
         insPoint = document.querySelector('#video-container');
         insPoint.insertBefore(tarElem, insPoint.firstChild);
         tarElem.style = 'max-width: 1rem; margin-left: auto !important;';
     }
    waitCounter++;
    if (waitCounter > 50) clearInterval(waitForStreamBtn); //Let's not have this looping forever.
},100);


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


//Use this function to access the page's functions.
function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

//Add permanent window scope script. Now with less giant strings without syntax highlighting!
function addWindowScript(fn, ident)
{
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.setAttribute("id", ident);
    script.textContent = fn.toString().slice(fn.toString().indexOf("{") + 1,-2); //KLUUUUUUDGE.
    document.head.appendChild(script);
}


console.log("Functions Loaded");

//Add Tooltips to added buttons.
exec(function () {
    $('[title][title!=""]').tooltip();

	$('[data-tooltip][data-tooltip!=""]').each(function(idx, elem) {
		var e = $(elem);
		e.tooltip({
			title: e.data("tooltip")
		});
	});
	$(".chatpositionswitcher").click(function () {
        $(".chatpositionswitcherON").tooltip('hide');
    });
	$(".chatpositionswitcherON").click(function () {
        $(".chatpositionswitcherON").tooltip('hide');
    });
}
);


//Change layout dropdowns into dropups, make them easier to interact with while they're under the chat.
setTimeout(function () {
    var ddElems = document.querySelector('user-bar').querySelectorAll('.dropdown');
    ddElems.forEach(function(elem){
        try {
            elem.classList.remove("dropdown");
            elem.classList.add("dropup");
        }
        catch(error)
        {
            //console.error(error)
        }
        });
}, 5000);


/*T̶h̶i̶s̶ ̶s̶e̶c̶t̶i̶o̶n̶ ̶a̶d̶d̶s̶ ̶a̶ ̶s̶c̶r̶i̶p̶t̶ ̶t̶o̶ ̶t̶h̶e̶ ̶p̶a̶g̶e̶,̶ ̶w̶h̶i̶c̶h̶ ̶a̶d̶d̶s̶ ̶p̶r̶o̶x̶y̶ ̶f̶u̶n̶c̶t̶i̶o̶n̶s̶ ̶f̶o̶r̶ ̶t̶h̶e̶
c̶h̶a̶t̶ ̶p̶o̶s̶i̶t̶i̶o̶n̶ ̶a̶n̶d̶ ̶s̶i̶z̶i̶n̶g̶ ̶f̶u̶n̶c̶t̶i̶o̶n̶.̶ ̶I̶'̶m̶ ̶h̶o̶p̶i̶n̶g̶ ̶t̶h̶a̶t̶ ̶t̶h̶i̶s̶ ̶w̶i̶l̶l̶ ̶b̶e̶ ̶u̶l̶t̶i̶m̶a̶t̶e̶l̶y̶
m̶o̶r̶e̶ ̶r̶o̶b̶u̶s̶t̶,̶ ̶a̶s̶ ̶i̶t̶'̶s̶ ̶u̶n̶l̶i̶k̶e̶l̶y̶ ̶t̶h̶e̶ ̶f̶u̶n̶c̶t̶i̶o̶n̶s̶ ̶w̶i̶l̶l̶ ̶c̶h̶a̶n̶g̶e̶ ̶n̶a̶m̶e̶s̶,̶ ̶a̶n̶d̶ ̶i̶f̶ ̶t̶h̶e̶y̶
d̶o̶,̶ ̶t̶h̶e̶y̶'̶r̶e̶ ̶n̶o̶t̶ ̶l̶i̶k̶e̶l̶y̶ ̶t̶o̶ ̶c̶h̶a̶n̶g̶e̶ ̶i̶n̶ ̶h̶o̶w̶ ̶t̶h̶i̶n̶g̶s̶ ̶a̶r̶e̶ ̶p̶a̶s̶s̶e̶d̶ ̶t̶o̶ ̶t̶h̶e̶m̶.̶ ̶U̶n̶l̶i̶k̶e̶
m̶y̶ ̶p̶r̶e̶v̶i̶o̶u̶s̶ ̶s̶c̶r̶i̶p̶t̶ ̶w̶h̶i̶c̶h̶ ̶w̶a̶s̶ ̶v̶e̶r̶y̶ ̶d̶e̶p̶e̶n̶d̶a̶n̶t̶ ̶o̶n̶ ̶t̶h̶e̶ ̶D̶O̶M̶,̶ ̶t̶h̶i̶s̶ ̶s̶h̶o̶u̶l̶d̶ ̶r̶o̶l̶l̶
w̶i̶t̶h̶ ̶t̶h̶e̶ ̶c̶h̶a̶n̶g̶e̶s̶ ̶b̶e̶t̶t̶e̶r̶.̶*/

/*Nope that's broken. No more built-in functions. Time to get messy with CSS. I may automate pulling the correct CSS content to move the chat around,
but that's maybe not what will break this script. I'm going to guess they're going to change the id and class names (again) and that will kill it.
I need to clean up a lot of this*/

addWindowScript(function() {

    //This array contains CSS selectors for the different elements I want to add/remove tags from. In retrospect, I really only needed to apply those
    //tags to BODY for them to be effective, but eeeeh.
    var overrideElems = ["body.channel-page #chat_resizer", "body.channel-page #channel_chat .emojiPicker", "body.channel-page #channel_chat", "body.channel-page .frame", "body.channel-page .frame .left-column", "body.channel-page .frame .right-column", "body.channel-page .video-js", "body.channel-page #player-container"];

    //Variables that contain the page's current layout status.
    var currentMode = "single";
    var isOverUnder = window.innerWidth < 992;
    var isPortrait = ~document.querySelector("body").className.split(' ').indexOf('is-portrait');




    //Need to rename oSCB and oSCO. They were originally for holding the original chat movement functions that got overriden by my proxy functions.
    //They now just add/remove the classes that move chat between being below the video, and beside it.
    function moveChatBelow() {
        overrideElems.forEach(function(elem){
            document.querySelector(elem).classList.remove("swSide");
            document.querySelector(elem).classList.add("swBel");});
        $(".chatpositionswitcher").hide();
        $(".chatpositionswitcherON").show();
    }
    function moveChatSide() {
        overrideElems.forEach(function(elem){
            document.querySelector(elem).classList.remove("swBel");
            document.querySelector(elem).classList.add("swSide");});
        $(".chatpositionswitcher").show();
        $(".chatpositionswitcherON").hide();
    }

//TODO
//Move chat size speculation to its own function. It should be the final determiner of whether to move the chat or not.
//The ratio between chat height (and to a limited extend width) and video should be within a range for automatic switching. And have set minimums for manual switching.

    function switchChat(swMode) {
        var vHeight; //Contains the Calculated video height.
        var vWidth = window.innerWidth; //When chat is below, video width is just the window content width. Currently.
        isOverUnder = ((vWidth < 992) || (window.innerWidth < window.innerHeight)); //The Picarto CSS moves videos into the over/under mode when the width of the window is under 992, and the window isn't in portrait.
        isPortrait = ~document.querySelector("body").className.split(' ').indexOf('is-portrait'); //There's some other script on the picarto page that decides to add a is portrait tag that makes only a single video appear.

        //The names of the different modes, as pulled from the player container classes, are single duo triple quad

        if (currentMode == "duo") {
            if (isPortrait) vHeight = (vWidth / 16 * 9);
            else if (isOverUnder) vHeight = (vWidth / 16 * 18);
            else vHeight = (vWidth / 32 * 9);
            //document.querySelector("body.channel-page #channel_chat").classList.remove("pnSingle", "pnTriple", "pnQuad");
            //document.querySelector("body.channel-page #channel_chat").classList.add("pnDuo");
            overrideElems.forEach(function(elem){
                try {
                    document.querySelector(elem).classList.remove("pnSingle", "pnTriple", "pnQuad");
                    document.querySelector(elem).classList.add("pnDuo");
                }
                catch(error) {
                    //console.error(error);
                }
            });
        }
        else if (currentMode == "triple") {
            if (isPortrait) vHeight = (vWidth / 16 * 9);
            else if (isOverUnder) vHeight = (vWidth / 16 * 27);
            else vHeight = (vWidth / 16 * 13.5);
            overrideElems.forEach(function(elem){
                try {
                    document.querySelector(elem).classList.remove("pnSingle", "pnDuo", "pnQuad");
                    document.querySelector(elem).classList.add("pnTriple");
                }
                catch(error) {
                    //console.error(error);
                }
            });
        }
        else if (currentMode == "quad") {
            if (isPortrait) vHeight = (vWidth / 16 * 9);
            else if (isOverUnder) vHeight = (vWidth / 16 * 36);
            else vHeight = (vWidth / 16 * 9);
            overrideElems.forEach(function(elem){
                try {
                    document.querySelector(elem).classList.remove("pnSingle", "pnDuo", "pnTriple");
                    document.querySelector(elem).classList.add("pnQuad");
                }
                catch(error) {
                    //console.error(error);
                }
            });
        }
        else //Safe fallback to Single mode, in case things get broken in the future.
        {
            vHeight = (vWidth / 16 * 9);
            overrideElems.forEach(function(elem){
                try {
                    document.querySelector(elem).classList.remove("pnDuo", "pnTriple", "pnQuad");
                    document.querySelector(elem).classList.add("pnSingle");
                }
                catch(error) {
                    //console.error(error);
                }
            });
        }

        //Calculate chat dimensions
        var cHeight = (window.innerHeight - vHeight);
        var cWidth = window.innerWidth;
        if (cWidth > 1000) cWidth = 1000; //Chat width is capped in the CSS section below.


        //Now that we've done all that work, we can determine what the size of the chat would be, and see if it makes sense to move it!
        switch(swMode)
        {
            case 1: //Switch Below Manual Request
                if (cHeight >= 200) { //The requirements should be a lot less strenuous than an automatic switch.
                    moveChatBelow();
                    document.querySelector("#chatBottom").scrollIntoView(false);
                    document.querySelector("#player-container").scrollTop = 60;
                }
                else addMsg("Not enough room to move chat below"); //TODO: Add a response method that doesn't use my chat extender script for feedback. Nobody's installing that one :'3
                break;

            case 2: //Switch Original Manual Request
                moveChatSide(); //Just do it. The layout always will work, somewhat, with chat on the side.
                document.querySelector("#chatBottom").scrollIntoView(false);
                document.querySelector("#player-container").scrollTop = 0;
                break;

            default: //Automatic
                if ((cHeight >= 300) && ((cWidth / cHeight) < 2.4)) {
                    moveChatBelow();
                    document.querySelector("#chatBottom").scrollIntoView(false);
                    document.querySelector("#player-container").scrollTop = 60;
                }
                else {
                    moveChatSide();
                    document.querySelector("#chatBottom").scrollIntoView(false);
                    document.querySelector("#player-container").scrollTop = 0;
                }
                break;
        }

        //Scroll the Chat down to the most current messages. Would otherwise have annoying behavior when switching chat positions.
        var objDiv = document.querySelector(".scrollwrapperchat");
        objDiv.scrollTop = objDiv.scrollHeight - objDiv.clientHeight;
    }



    //Get the current multistream layout from the flexPlayerOuter div (or span or whatever it is,) and force an automatic layout update.
    function layoutUpdateHandler(){
        currentMode = document.querySelector(".flexPlayerOuter").className.split(' ')[1];
        switchChat();
    }



    //Picarto's debounce function on the page has changed a few times. Just using one specific to this script instead.
    function pnDebounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if ( !immediate ) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait || 200);
            if ( callNow ) {
                func.apply(context, args);
            }
        };
    }


//Final Initialization Stuff.
var strTypeWatcher = new MutationObserver(layoutUpdateHandler);
var waitForfPO = setInterval(function() {
   if (document.querySelector(".flexPlayerOuter"))
     {
         strTypeWatcher.observe(document.querySelector(".flexPlayerOuter"), {attributes: true});
         switchChat(0);
         setTimeout(layoutUpdateHandler, 100);
         clearInterval(waitForfPO);
     }
},100);

document.querySelector(".chatpositionswitcher").addEventListener("click", function(){switchChat(1); $(".chatpositionswitcher").tooltip("hide");}, false);
document.querySelector(".chatpositionswitcherON").addEventListener("click", function(){switchChat(2); $(".chatpositionswitcherON").tooltip("hide");}, false);
window.addEventListener("resize", pnDebounce(switchChat, 250), false);
window.addMsg(versionString + " Loaded");


}, "PicNar_Functions");

//Portrat is 0.838?
//Side by side minimum for duo is 992.
//TODO: Dynamically pull required CSS from website, may be more resillient.
addGlobalStyle(
//swBel features

'#menu_holder, #menu, .navbar {position: relative !important;}' +
'#menu_holder {min-width: 450px !important; z-index: 10 !important;}' +
//'.navbar {margin-bottom: 0px !important; box-shadow: none !important;}' +
'#usermenu, #newsflash, #menu_error, #menu_warn {position: absolute !important;}' +
'#menu_holder .search_results { position: absolute !important; width: 100% !important; top: 58.3333px !important;}'+
'#menu_holder .searchresults {position: static !important; top: auto !important; left: auto !important; right: auto !important; bottom: auto !important; width: 100% !important; height: calc(99.9vh - 58.3333px) !important;}'+

'body.channel-page #chat_resizer.swBel {display:none !important}'+
'body.channel-page #channel_chat .emojiPicker.swBel {height:calc(50vh - 9rem)!important}'+
'body.channel-page #channel_chat.swBel {max-width: 1000px;)}'+


'body.channel-page .frame.swBel {position:relative !important; display:block !important; width:100% !important; height:100vh !important;}' +
'body.channel-page .frame.swBel .left-column {overflow:hidden !important;}'+
//'body.channel-page .frame.swBel .right-column {transition:flex .3s ease-out}'+
//'body.channel-page .video-js.swBel {height:56.25vw; padding-top:0}'+
'body.channel-page .player-container.swBel {padding: 0px !important;}'+
'body.channel-page #channel_chat.swBel #chatHeader.chat_headding_on {min-height: 0px}'+

//Single Video
'body.channel-page #channel_chat.swBel.pnSingle, body.channel-page .right-column.swBel.pnSingle {height:calc(100vh - 56.25vw)}'+
'body.channel-page .left-column.swBel.pnSingle {height:56.25vw !important;}'+

'body.channel-page.is-portrait #channel_chat.swBel, body.channel-page.is-portrait .right-column.swBel {height:calc(100vh - 56.25vw) !important;}'+
'body.channel-page.is-portrait .left-column.swBel {height:56.25vw !important;}'+

'body.channel-page #player-container.swSide.pnSingle .flexPlayerOuter {padding: 0px calc(50% - 0.88885 * (100vh - 59.5px));}'+

//Duo Video
'body.channel-page #channel_chat.swBel.pnDuo, body.channel-page .right-column.swBel.pnDuo {height:calc(100vh - 112.5vw)}'+
'body.channel-page .left-column.swBel.pnDuo {height:112.5vw;}'+

'@media screen and (min-width:992px) and (orientation:landscape) {'+
'body.channel-page #channel_chat.swBel.pnDuo {height:calc(100vh - 28.125vw)}'+
'body.channel-page .left-column.swBel.pnDuo {height:28.125vw;}'+
'}'+

'body.channel-page #player-container.swSide.pnDuo .flexPlayerOuter {padding: 0px calc(50% - 1.7777 * (100vh - 59.5px));}'+

//Triple Video
'body.channel-page #channel_chat.swBel.pnTriple, body.channel-page .right-column.swBel.pnTriple {height:calc(100vh - 168.75vw)}'+
'body.channel-page .left-column.swBel.pnTriple {height:168.75vw !important;}'+

'@media screen and (min-width:992px) and (orientation:landscape) {'+
'body.channel-page #channel_chat.swBel.pnTriple {height:calc(100vh - 84.375vw)}'+
'body.channel-page .left-column.swBel.pnTriple {height:84.375vw !important;}'+
'}'+

'body.channel-page #player-container.swSide.pnTriple .flexPlayerOuter {padding: 0px calc(50% - 0.59225 * (100vh - 59.5px));}'+


//Quad Video
'body.channel-page #channel_chat.swBel.pnQuad, body.channel-page .right-column.swBel.pnQuad {height:calc(100vh - 225vw)}'+
'body.channel-page .left-column.swBel.pnQuad {height:225vw !important;}'+

'@media screen and (min-width:992px) and (orientation:landscape) {'+
'body.channel-page #channel_chat.swBel.pnQuad {height:calc(100vh - 56.25vw)}'+
'body.channel-page .left-column.swBel.pnQuad {height:56.25vw !important;}'+
'}'+

'body.channel-page #player-container.swSide.pnQuad .flexPlayerOuter {padding: 0px calc(50% - 0.88885 * (100vh - 59.5px));}'+

//swSide features
'body.channel-page .frame.swSide { position:relative !important; height:100% !important; display:flex !important; width:100% !important; flex-direction:row !important;}'+
'body.channel-page .frame.swSide .left-column {flex:1;overflow:hidden;height:100vh !important;}'+
'body.channel-page .frame.swSide .right-column {display:flex;height:auto;border-left:2px solid #2a2a2a}' +
'body.channel-page #chat_resizer.swSide {display:initial !important}' +

'body.channel-page .video-js {padding-top: 56.25% !important; height: auto !important;}'+
'body.channel-page #player-container {padding: 0 !important;}'+
'body.channel-page {padding-top:0px}'+
'div.d-md-block {padding: 10px}'+
'.right-column {justify-content: center;}' +
'.modal-backdrop {visibility: hidden;}'
//'.left-column, .right-column {height: 100vh !important;}'
);


/*addGlobalStyle(
'.scrollwrapper, #resizeable2, #resrenamed {top: 0px !important;}' +
'.scrollwrapper {padding: 0px !important;}' +
'#resizeable2 {max-width: 1200px; margin: 0px auto;}' +
'#menu_holder, #menu, .navbar {position: relative !important;}' +
'#menu_holder {min-width: 450px !important; z-index: 10 !important;}' +
'.navbar {margin-bottom: 0px !important; box-shadow: none !important;}' +
'#usermenu, #newsflash, #menu_error, #menu_warn {position: absolute !important;}' +
'.columnpadding {max-width: none !important;}' +

'@media only screen and (max-width: 1280px) {div.flexPlayerInner {width: 100% !important;}}'
);*/







