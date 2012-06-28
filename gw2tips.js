// Needs tons of work and to be minimized for large scale use. But I really want to work for ArenaNet and only had a couple hours!

var appBaseURL = "http://www.ledgit.com/gw2tips/data/";
var tipJSON = {};

var currentTip;
var imageCache = [];

window.onload = function() {
	
	//Call slightly modified version of Dustin's getElementsByClass implimentation
	var tipElements = getTipElements();
	for(var i = 0; i < tipElements.length; i++) {
		tipElement = tipElements[i];
		tipElement.addEventListener("mouseover", displayTip);
		tipElement.addEventListener("mouseout", hideTip);
		var tipname = tipElement.getAttribute("tipname");
		
		// If this is the first time we've encountered this tipname in the document
		if(!tipJSON[tipname]) {
			tipJSON[tipname] = {};
			var script = document.createElement("script");
			
			// Call our Guild Wars 2 Tooltip CMS for some JSONP
			// Callback function is window.gw2tipJSONP(json)
			script.src = appBaseURL + tipname; //ALERT ADD THIS SHIZ
			document.head.appendChild(script);
		}	
	}
	
	//Preload the border image
	loadImg("http://www.ledgit.com/gw2tips/inverted-background.png");
	loadImg("http://www.ledgit.com/gw2tips/recharge.png");
	loadImg("http://www.ledgit.com/gw2tips/skill-point.png");
}

// Callback for on-demand-javascript
function gw2tipJSONP(json) {
	var name = json.name;
	//Will become gw2Tip.tipJSON once we put everything else into an object
	//Callback needs to be global scope
	//Or maybe it doesn't? Look into this
	tipJSON[name].data = json.data;
	console.log(tipJSON);
	loadImg(json.data.image);
}

function loadImg(url) {
	var img = document.createElement("img");
	img.src = url;
	imageCache.push(img);

}

function displayTip(e) {
		
	tipElement = e.target;
	var tipname = tipElement.getAttribute("tipname");
	
	if( tipJSON[tipname].data ) {
	
		var tip = document.createElement("span");
		var tipInfo = document.createElement("div");
		tip.appendChild(tipInfo);
		var data = tipJSON[tipname].data;
		
		//Fill in all the tip text / images with proper styling
		writeInfo(tip, data);
	
		styleTip(tip, tipInfo);
		



		tipElement.parentNode.appendChild(tip);
		tipElement.parentNode.style.position = "relative";
		tip.style.left = (tipElement.offsetLeft + (tipElement.offsetWidth/2) - (tip.offsetWidth/2)) + "px";
		tip.style.top = (tipElement.offsetTop - tip.offsetHeight - 5) + "px";
	
		currentTip = tip;
	}
}

function writeInfo(tip, data) {
	
	var h1Style = "font-size:33px; line-height:33px; padding-left:38px; font-family:\"cronos-pro\", sans-serif; font-weight:300; margin:0 0 5px 0; background-image:url(\"" + data.image + "\"); background-repeat:no-repeat;";
	var h2Style = "font-size:23px; line-height:23px; font-family:\"cronos-pro\", sans-serif; font-weight:300; margin:0 0 15px 0; text-transform:capitalize;";
	var pStyle = "font-size:20px; line-height:23px; font-family:\"cronos-pro\", sans-serif; font-weight:300; margin:0 0 5px 0;";
	var statStyle = "font-size:20px; line-height:20px; font-family:\"cronos-pro\", sans-serif; font-weight:300; position:absolute; bottom:0; left:0; right:0; height:20px; padding:10px;";
	var skillStyle = "background-image:url(\"http://www.ledgit.com/gw2tips/skill-point.png\"); background-repeat:no-repeat; padding:0 22px;";
	var rechargeStyle = "background-image:url(\"http://www.ledgit.com/gw2tips/recharge.png\"); background-repeat:no-repeat; padding-left:22px;";
	
	var tierString = "";
	if( data.skillTier != 0 )
		tierString = "Tier " + data.skillTier;
	tip.innerHTML = 
		"<hgroup>" +
		"<h1 style='" + h1Style + "'>" +
		data.nicename + 
		"</h1>" + 
		"<h2 style='" + h2Style + "'>" +
		data.profession + " " + tierString + " " + data.slot + " Skill" + 
		"</hgroup>" +
		"<p style='" + pStyle +"'>" + 
		data.description + 
		"</p>" +
		"<div style='" + statStyle + "'>" +
		"<span style='" + skillStyle + "'>" +
		data.skillPointCost + "</span>" +
		"<span style='" + rechargeStyle + "'>" +
		data.recharge + "</span></div>";
	
}

function styleTip(tip) {
	tip.style.display = "block";
	tip.style.backgroundColor = "white";
	tip.style.webkitBoxShadow = "0 0 20px 2px rgba(0,0,0,.4)";
	tip.style.position = "absolute";
	tip.style.padding = "15px";
	tip.style.width = "370px";
	tip.style.height = "270px";
	tip.style.backgroundImage = "url('http://www.ledgit.com/gw2tips/inverted-background.png')";
	
}


function hideTip(e) {
	currentTip.parentNode.removeChild(currentTip);
}

function getTipElements() {
	var searchClass = "gw2tip";
	var node = document;
	var tag = "span";
	
	// Native is 70x faster
	if(document.getElementsByClassName)
		return document.getElementsByClassName(searchClass);
		
	// Oh well
	else {
		var classElements = new Array();
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
	
		return classElements;
	}
}