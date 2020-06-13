// chrome.runtime.sendMessage({"clipnote":"IDK what just happen"});

function handle_clipboard(data){

	scrape_note = document.getSelection();
	start = scrape_note.anchorOffset;
	end = scrape_note.extentOffset;

	clipnote = scrape_note.anchorNode.data.slice(start,end);

	chrome.storage.local.get("scrapeFull",function(data){
	
		chrome.storage.local.set({
			"scrapeFull":data.scrapeFull+" "+clipnote.trim();
		});
	
	});
	
}

// Call `handle_clipboard` when 
document.addEventListener("copy",handle_clipboard);
document.addEventListener("cut",handle_clipboard);


