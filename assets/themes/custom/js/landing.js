var canvas, ctx;
var width, height;
var centerX, centerY;
var minSize, maxSize;
var imgWidth, imgHeight;
var imgTop;

function onResize() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    width = parseInt(w);
    height = parseInt(h);
    canvas.attr("width", width);
    canvas.attr("height", height);
    centerX = parseInt(width) >> 1;
    centerY = parseInt(height) >> 1;

    resizeLogo();
}

function onOrientationChange() {
    onResize();
}

function onLoad() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    canvas = $("#c");
    ctx = canvas.get(0).getContext("2d");
    width = parseInt(w);
    height = parseInt(h);
    canvas.attr("width", width);
    canvas.attr("height", height);
    centerX = parseInt(width) >> 1;
    centerY = parseInt(height) >> 1;
    near = width * 0.022388;
    mid = width * 0.014925;
    minSize = width * 0.022388;
    maxSize = width * 0.059701;
    
    $("#menuResponsiveImage").click(function () {
        if ($("#hiddenMenuResponsive").is(":hidden")) {
            $("#hiddenMenuResponsive").slideDown("slow");
        } else {
            $("#hiddenMenuResponsive").slideUp("slow");
        }
    });
    
    initLogo();
}

function initLogo() {
    imgWidth = parseInt($("#logo").width());
    imgHeight = parseInt($("#logo").height());

    var half = parseInt(imgHeight) >> 1;

    imgTop = (centerY - half) + "px";

    $("#logo").css("top", imgTop);
}

function resizeLogo() {
    initLogo();
}

window.addEventListener("resize", onResize, false);
window.addEventListener("orientationchange", onOrientationChange, false);
window.addEventListener("load", onLoad, false);