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

    $("#menuImage").click(function () {
        $("#menuImage").fadeOut();
        $(".navbar").animate({
            left: 0
        }, 1000, "easeInExpo", function () {
            $("#menuWhiteImage").fadeIn();
        });
    });

    $("#menuWhiteImage").click(function () {
        $("#menuWhiteImage").fadeOut();
        $(".navbar").animate({
            left: "100%"
        }, 700, "easeOutExpo", function () {
            $("#menuImage").fadeIn();
        });
    });
}

window.addEventListener("resize", onResize, false);
window.addEventListener("orientationchange", onOrientationChange, false);
window.addEventListener("load", onLoad, false);