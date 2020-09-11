$.ajaxSetup({
	contentType: "application/json; charset=utf-8",
});

var host = window.location.hostname;
var pageContent;
var urlTest = /^http?:\/\//i;
var useSPA = false;

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loadPage(page, back) {
	if (!urlTest.test(page) && page != null) {
		$.ajax({
			url: page,
			type: 'GET',
			success: function (data) {
				useSPA = true;
				var content = $(data).filter("main").html();

				//clear existing data
				$("main > *").remove();

				//add new data
				$("main").html(content);

				//update the render time
				$("#page-render-time").html($(data).find("#page-render-time").html())

				arrangePage();

				$('html, body').animate({
					scrollTop: 0
				}, 0);

				if (back == null) {
					history.pushState(null, null, page);
				}
			},
			complete: function () {
				if(useSPA){
					try {
						pageReady();
					} catch {}
				}
			},
			statusCode: {
				500: function () {
					alert("Error 500 - Sorry about that, looks like something tripped up. Try reloading the page?");
				},
				504: function () {
					alert("Error 504 - Gateway error");
				}
			}
		});
	} else {
		window.open(page, "_blank");
	}
}

function arrangePage() {
	var pageStyles = $("style.custom-styles").html();
	var bottom = $("section#append-to-bottom").html();
	var title = $("span#page-title").html();

	$("section#page-append").remove();
	$("body > *").not("header, main, footer").remove();
	$("style#page-styles").html("");

	if(title != undefined) {
		var currentTitle = $("title").html();
		var updatedTitle = currentTitle.substring(0, currentTitle.indexOf("-") + 2) + title;
	}

	$("title").html(updatedTitle);
	$("body").append(bottom);
	$("style#page-styles").html(pageStyles);
}

$(document).on('click', 'a', function (e) {
	if ($(this).attr("href") == "#top") {
		e.preventDefault();
		$("html, body").animate({
			scrollTop: 0
		}, "slow");
	} else if ((typeof $(this).data('external') !== 'undefined') || (typeof $(this).data('internal') !== 'undefined')) {
		//if it's an internal link, aka one that calls js, or an external link, like www.google.com, do nothing
		//console.log("Internal page link clicked")
	} else if ($(this).attr("href") === undefined) {
		// Do nothing
	} else {
		e.preventDefault();
		showPace = true;
		loadPage($(this).attr("href"));
	}
});

window.addEventListener('popstate', function (e) {
	loadPage("/" + location.href.replace(/^(?:\/\/|[^\/]+)*\//, ""), "1");
});

document.addEventListener("DOMContentLoaded", function () {
	arrangePage();
});

$(document).ready(function () {
	if(!useSPA) {
		try {
			pageReady();
		} catch {}
	}
});