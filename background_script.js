chrome.runtime.onInstalled.addListener(function(){
	
	// Initial storage
	chrome.storage.local.set({
		"scrapeFull":"",
		"references":[],
	});

	// Send welcome notification
	chrome.notifications.create({

		"type":"basic",
		"iconUrl":chrome.extension.getURL("icons/scrape_pad_icon.png"),
		"title":"Scrape Pad",
		"message":"Thanks for installing Scrape Pad. Use Ctrl + Up Arrow to paste selection to Pad."

	});

});
