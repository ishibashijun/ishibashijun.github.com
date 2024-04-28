function onResize() {
	
}

function onLoad() {
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
window.addEventListener("load", onLoad, false);