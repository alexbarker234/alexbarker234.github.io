export function setupNav() {
    $("#nav-list").on("click", () => {
        const navList = $("#nav-list");
        navList.toggleClass("enabled");
    });
}

export function handleNavClick(event: JQuery.ClickEvent) {
    const navList = $("#nav-list");

    // This also closes the nav dropdown on click
    if (!$(event.target).closest("button").length && navList.hasClass("enabled")) {
        navList.removeClass("enabled");
    }
}
