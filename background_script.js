chrome.runtime.onInstalled.addListener(function(){
	
	chrome.storage.local.set({
		"scrapeFull":"",
		"references":[],
	});

});

// chrome.runtime.onMessage.addListener(function(message){

// 	console.log( message.clipnote );
// 	chrome.storage.sync.set({"clipnote":message.clipnote});
// 	chrome.notifications.create({

// 		"type":"basic",
// 		"iconUrl":chrome.extension.getURL("hello_extensions.png"),
// 		"title":"Dr. WHO",
// 		"message":message.clipnote

// 	},function(){
// 		console.log("SEnd notif");
// 	});

// });
