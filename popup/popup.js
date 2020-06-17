scrapePad = document.getElementById('scrape_pad');
charLimit = 30000;
// To store state of Warning
isWarnShown = false;

function limitExceedWarn(){

	if(isWarnShown==false){

		isWarnShown = true;
		warn_div = document.createElement("div");
		warn_div.setAttribute("class","char-limit-warn");
		warn_div.innerHTML = "Max. Limit 30k Characters.";
		document.getElementById("ta-up-div").append( warn_div );

	}
	
}


// If user manually update `scrapePad`,
// Save that also.
scrapePad.addEventListener("input",function(){

	let scrapeValue = (scrapePad.value).trim();
	if(scrapeValue.length<charLimit){

		chrome.storage.local.set({
			"scrapeFull":(scrapePad.value).trim()
		});

	}else{
		limitExceedWarn();
	}
	
});

document.addEventListener("DOMContentLoaded",function(){

	chrome.storage.local.get("scrapeFull",function(data){
		
		if(data.scrapeFull.length>charLimit){
			limitExceedWarn();
		}
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

document.getElementsByClassName("warning-box")[0].addEventListener('click',function(e){
	e.stopPropagation();
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
		
		if(data.scrapeFull.trim().length>0){
			
			let blobData = data.scrapeFull + "\n\n"+
					       "[ References Links ]\n"

			let ref_list = data.references;
			for (var i = 0; i <=ref_list.length-1 ; i++) {
			   	blobData = blobData + " - "+ref_list[i] + "\n";
		    } 				   


			// Create file from scrapePad data
			var newBlob = new Blob([ blobData ],{type:"text/plain",endings:"native"});
			let temp_dwnld_link = document.createElement("a");

			dwnld_url = window.URL.createObjectURL(newBlob);

			// Set href as blob's url
			temp_dwnld_link.setAttribute("href",dwnld_url);
			// Set downloaded file name
			temp_dwnld_link.setAttribute("download","ScrapePad.txt");

			// execute a click on temporary link
			temp_dwnld_link.click();
		}	

	});
	
});




