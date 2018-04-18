function onResize() {
	
}

function onLoad() {
    $("#menuImage").click(function () {
        $("#menuImage").fadeOut();
        $(".navbar").animate({
            left: 0
        }, 1000, "easeOutBounce", function () {
            $("#menuWhiteImage").fadeIn();
        });
    });

    $("#menuWhiteImage").click(function () {
        $("#menuWhiteImage").fadeOut();
        $(".navbar").animate({
            left: "100%"
        }, 1000, "easeOutBounce", function () {
            $("#menuImage").fadeIn();
        });
    });
}

window.addEventListener("resize", onResize, false);
window.addEventListener("load", onLoad, false);