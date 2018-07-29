function(){
  var path = "https://rawgit.com/MalooMF9/Picarto-Userscripts/master/"; 
  var a=document.createElement("script");
  a.src=path+"Picarto_Chat_Improvements.user.js";
  document.head.appendChild(a); 
  
  var b = document.createElement("script");
  b.src=path+"Picarto_AdminHighlight.user.js";
  document.head.appendChild(a);
  
  var c = document.createElement("script");
  c.src=path+"Picarto_Narrowed.user.js";
  document.head.appendChild(a);
})();
