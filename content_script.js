// chrome.runtime.sendMessage({"clipnote":"IDK what just happen"});

function handle_clipboard(data){

	scrape_note = document.getSelection();
	start = scrape_note.anchorOffset;
	end = scrape_note.extentOffset;

	clipnote = scrape_note.anchorNode.data.slice(start,end);
	
	url = toString(window.location.href);

	chrome.storage.local.get(["scrapeFull","references"],function(data){
	
		let ref_list = data.references;

		let newData = {};
		newData.scrapeFull = data.scrapeFull+" "+clipnote.trim();

		if( ref_list.indexOf(url)!=-1 ){
			ref_list.push( url );
			newData.references = ref_list;
		}

		chrome.storage.local.set( newData );
	
	});
	
}

// Call `handle_clipboard` when 
document.addEventListener("copy",handle_clipboard);
document.addEventListener("cut",handle_clipboard);


