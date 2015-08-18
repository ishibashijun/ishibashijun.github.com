var sidebar = document.getElementById("sidebar");

function onResize() {
	sidebar.style.height = window.innerHeight + "px";
}

function onOrientationChange() {
	sidebar.style.height = window.innerHeight + "px";
}

function onLoad() {
    sidebar.style.height = window.innerHeight + "px";
}

window.addEventListener("resize", onResize, false);
window.addEventListener("orientationchange", onOrientationChange, false);
window.addEventListener("load", onLoad, false);