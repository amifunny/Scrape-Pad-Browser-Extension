scrapePad = document.getElementById('scrape_pad');

scrapePad.addEventListener("change",function(){

	chrome.storage.local.set({
		"scrapeFull":(scrapePad.value).trim()
	});

});

chrome.storage.local.get("scrapeFull",function(data){
	
	scrapePad.value = data.scrapeFull;

});



