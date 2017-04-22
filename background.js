function getDomainFromUrl(url){
	var host = "null";
	if(typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match)
		host = match[1];
	return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
	
	if(getDomainFromUrl(tab.url).toLowerCase()=="acm.hdu.edu.cn"){
		chrome.pageAction.show(tabId);
	}

};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

var info = {}
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	// if(message.type == 'progress'){
	// 	info.title = message.payload.title
	// 	info.count = message.payload.count
	// 	info.complate = message.payload.complate
	// }
	console.log(message)
})
