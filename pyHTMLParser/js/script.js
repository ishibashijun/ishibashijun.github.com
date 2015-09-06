function onResize() {
	
}

function onOrientationChange() {
	
}

function onLoad() {
    $("#sidebarParser").click(function () {
        if ($("#sidebarParser_list").is(":hidden")) $("#sidebarParser_list").slideDown("slow");
        else $("#sidebarParser_list").slideUp("slow");
    });
    $("#sidebarPyNodeList").click(function () {
        if ($("#sidebarPyNodeList_list").is(":hidden")) $("#sidebarPyNodeList_list").slideDown("slow");
        else $("#sidebarPyNodeList_list").slideUp("slow");
    });
    $("#sidebarPyNode").click(function() {
        if ($("#sidebarPyNode_list").is(":hidden")) $("#sidebarPyNode_list").slideDown("slow");
        else $("#sidebarPyNode_list").slideUp("slow");
    });
    $("#sidebarQuery").click(function() {
        if ($("#sidebarQuery_list").is(":hidden")) $("#sidebarQuery_list").slideDown("slow");
        else $("#sidebarQuery_list").slideUp("slow");
    });
}

window.addEventListener("resize", onResize, false);
window.addEventListener("orientationchange", onOrientationChange, false);
window.addEventListener("load", onLoad, false);