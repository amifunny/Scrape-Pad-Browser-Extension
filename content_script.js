var charLimit = 30000;

function handle_clipboard(data){

	scrape_note = document.getSelection();
	
	clipnote = scrape_note.toString();

	if(clipnote!=""){

		let url = (window.location.href).toString();

		chrome.storage.local.get(["scrapeFull","references"],function(data){
		
			let ref_list = data.references;

			let newData = {};
			newData.scrapeFull = data.scrapeFull+" "+clipnote.trim();

			if(data.scrapeFull.length<charLimit){

				if( ref_list.indexOf(url)==-1 ){
					ref_list.push( url );
					newData.references = ref_list;
				}

				chrome.storage.local.set( newData );


			}

		
		});
	}
}

// Call `handle_clipboard` when 
// document.addEventListener("copy",handle_clipboard);
// document.addEventListener("cut",handle_clipboard);

// To allow user to use normal `Copy & Paste`` differently,
// than pasting to Scarpe Pad, we allow `Ctrl + Up` to
// act as our shortcut
document.addEventListener("keyup",function(event){

	// When `Ctrl+UpArrrow` is pressed
	if(event.key=="ArrowUp" && event.ctrlKey){

		handle_clipboard()

	}

});




















