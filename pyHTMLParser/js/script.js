var body = document.body;
var sideBar = document.getElementById("sidebar");
var width = window.innerWidth;
var height = window.innerHeight;

function onResize() {
	sideBar.style.height = window.innerHeight + "px";
}

function onOrientationChange() {
	sideBar.style.height = window.innerHeight + "px";
}

sideBar.style.height = height + "px";

window.addEventListener("resize", onResize, false);
window.addEventListener("orientationchange", onOrientationChange, false);