import initHeader from "./header";
import { handleNavClick, setupNav } from "./nav";
import initSkills from "./skills";

$(window).on("load", function () {
    initHeader();
    initSkills();
    initBackToTop();

    setupNav();

    handleFadeIn();
    handleButtons();
});

$(document).on("click", function (event) {
    handleNavClick(event);
});
$(document).on("scroll", function (event) {
    const backToTopButton = $("#back-to-top");
    const enabled = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;
    backToTopButton.toggleClass("enabled", enabled);
});

function initBackToTop() {
    $("#back-to-top").on("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

const handleFadeIn = (): void => {
    /** Fade in when bottom of screen is half down */
    function isElementInView(elem: HTMLElement): boolean {
        const $elem = $(elem);
        const elementCentre = $elem.offset()!.top + $elem.outerHeight()!;
        const windowBottom = $(window).scrollTop()! + $(window).height()!;

        // MOBILE - fade in appearing at top
        if ($(window).width()! < 600) {
            return windowBottom > $elem.offset()!.top + 200;
        }

        return windowBottom > elementCentre - elem.offsetHeight / 2;
    }

    const sections = $(".section");
    function handleScroll(): void {
        sections.each(function () {
            if (isElementInView(this as HTMLElement)) {
                $(this).addClass("shown");
            }
        });
    }

    handleScroll();
    $(window).on("scroll", handleScroll);
};

const handleButtons = () => {
    const projectButtons = $(".selector");
    const projectsDiv = $(".projects");
    const projects = $(".project");
    const animLength = 700; // needs to sync up to css
    projectButtons.each(function (index) {
        $(this).on("click", function () {
            const id = $(this).attr("id");
            projectsDiv.addClass("fade");
            setTimeout(() => projectsDiv.removeClass("fade"), animLength);
            setTimeout(() => {
                // show all
                if (!id) {
                    projects.each(function () {
                        $(this).removeClass("disabled");
                    });
                }
                // show as specified by id
                else {
                    const selected = id.substring(1, id.length);
                    projects.each(function () {
                        const project = $(this);
                        if (project.hasClass(selected)) project.removeClass("disabled");
                        else project.addClass("disabled");
                    });
                }
            }, animLength / 2);
        });
    });
};
