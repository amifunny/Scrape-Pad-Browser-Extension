scrapePad = document.getElementById('scrape_pad');

// If user manually update `scrapePad`,
// Save that also.
scrapePad.addEventListener("input",function(){

	chrome.storage.local.set({
		"scrapeFull":(scrapePad.value).trim()
	});

});

document.addEventListener("DOMContentLoaded",function(){

	chrome.storage.local.get("scrapeFull",function(data){
		
		scrapePad.value = data.scrapeFull;

	});

});

document.getElementById("clear_btn").addEventListener("click",function(){

	scrapePad.value = "";

});

document.getElementById("download_btn").addEventListener("click",function(){

	chrome.storage.local.get("scrapeFull",function(data){
		
		// Create file from scrapePad data
		var newBlob = new Blob([data.scrapeFull],{type:"text/plain"});
		let temp_dwnld_link = document.createElement("a");

		dwnld_url = window.URL.createObjectURL(newBlob);

		// Set href as blob's url
		temp_dwnld_link.setAttribute("href",dwnld_url);
		// Set downloaded file name
		temp_dwnld_link.setAttribute("download","abra_cadabra.txt");

		// execute a click on temporary link
		temp_dwnld_link.click();

	});
	
});




