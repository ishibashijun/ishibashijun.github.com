function onResize() {
	
}

function onOrientationChange() {
	
}

function onLoad() {
    $("#menuResponsiveImage").click(function () {
        if ($("#hiddenMenuResponsive").is(":hidden")) {
            $("#hiddenMenuResponsive").slideDown("slow");
        } else {
            $("#hiddenMenuResponsive").slideUp("slow");
        }
    });
}

window.addEventListener("resize", onResize, false);
window.addEventListener("orientationchange", onOrientationChange, false);
window.addEventListener("load", onLoad, false);