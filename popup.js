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

let warn_container = document.getElementsByClassName("warning-clear")[0];

function close_warn(){

	if(warn_container.classList.contains( "warn-notice-open" )){
		warn_container.classList.remove("warn-notice-open");
		warn_container.classList.add("warn-notice-close");
	}

}

document.getElementById("clear_yes").addEventListener("click",function(){
	
	close_warn();
	
	scrapePad.value = "";

	chrome.storage.local.set({
		"scrapeFull":"",
		"references":[]
	});

});

document.getElementById("clear_no").addEventListener("click",function(){
	close_warn();
});

warn_container.addEventListener("click",function(){
	close_warn();
});

document.getElementById("clear_btn").addEventListener("click",function(){

	if(warn_container.classList.contains( "warn-notice-open" )){
		warn_container.classList.remove("warn-notice-open");
		warn_container.classList.add("warn-notice-close");
	}
	else {
		warn_container.classList.remove("warn-notice-close");
		warn_container.classList.add("warn-notice-open");
	}

});

document.getElementById("download_btn").addEventListener("click",function(){

	chrome.storage.local.get(["scrapeFull","references"],function(data){
		
		let blobData = data.scrapeFull + "\n\n"+
				       "[ References Links ]\n"

		let ref_list = data.references;
		for (var i = 0; i <=ref_list.length-1 ; i++) {
		   	blobData = blobData + " - "+ref_list[i] + "\n";
	    } 				   

		// Create file from scrapePad data
		var newBlob = new Blob([ blobData ],{type:"text/plain"});
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




