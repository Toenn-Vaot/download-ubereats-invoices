let months = {
	"janv.": "-01-2024",
	"fév.": "-02-2023",
	"mar.": "-03-2023",
	"avr.": "-04-2023",
	"mai": "-05-2023",
	"juin": "-06-2023",
	"juil.": "-07-2023",
	"août": "-08-2023",
	"sept.": "-09-2023",
	"oct.": "-10-2023",
	"nov.": "-11-2023",
	"déc.": "-12-2023",
};

function downloadFile(url, fileName) {
	fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
	.then(res => { if(res.ok) { res.blob() } })
	.then(res => {
		if(res !== undefined) {
			const aElement = document.createElement('a');
			aElement.setAttribute('download', fileName);
			const href = URL.createObjectURL(res);
			aElement.href = href;
			aElement.setAttribute('target', '_blank');
			aElement.click();
			URL.revokeObjectURL(href);
		} else {
			console.log("No download");
		}
	});
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let items = new Array();
document.querySelectorAll("a[href^='/fr/orders?mod=orderReceipt']").forEach(function(element, i){
	let pdfUrl = ("https://www.ubereats.com/orders/" + element.href.match(".+modctx=(.+)\&.+$")[1] + "/download-receipt?contentType=PDF");
	
	let price = element.parentElement.innerText.match(".+pour[  ](.+).+€")[1].replace(",", "-");
	let dateMonth = element.parentElement.innerHTML.match("\/span\>(.+) à")[1];
	let dateMonthParts = dateMonth.match("(.+) (.+)");
	let day = dateMonthParts[1];
	let monthName = dateMonthParts[2];
	let pdfName = day + months[monthName] + "_UberEats_" + price + ".pdf"
	
	sleep(500 + i * 500)
	.then(() => {
		if(i == 0) {
			console.log(i, pdfUrl, pdfName);
			downloadFile(pdfUrl, pdfName);
		}
	});
})
