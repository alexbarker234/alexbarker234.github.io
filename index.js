$(window).on("load", function () {
    handleMeteors()
    handleButtons()
    handleFadeIn()
});

const handleMeteors = () => {
    const meteorShower = $("#meteor-shower");
    console.log(meteorShower);
    setInterval(function () {
        if (Math.random() > 0.5) return;
        let meteor = $("<div>").addClass("meteor");

        const offset = window.innerWidth / 4;
        const startX = offset + Math.floor(Math.random() * (window.innerWidth - offset));
        const startY = -100;

        // Calculate random ending position
        const move = 800;

        const endX = startX - move;
        const endY = move;

        meteor.css("left", `${startX}px`);
        meteor.css("top", `${startY}px`);
        // start animation
        setTimeout(function () {
            meteor.css("left", `${endX}px`);
            meteor.css("top", `${endY}px`);
        }, 5);

        // remove
        setTimeout(function () {
            meteor.remove();
        }, 600);
        meteorShower.append(meteor);
    }, 200);
} 
const handleButtons = () => {
    const projectButtons = $(".selector");
    const projectsDiv = $(".projects");
    const projects = $(".project");
    const animLength = 700; // needs to sync up to css
    projectButtons.each(function (index) {
        $(this).on("click", function () {
            const id = $(this).attr("id");
            projectsDiv.addClass('fade')
            setTimeout(() => projectsDiv.removeClass('fade'), animLength)
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
            }, animLength / 2)
        });
    });
}
const handleFadeIn = () => {
    /** Fade in when bottom of screen is half down */
    function isElementInView(elem) {      
        var elementCentre = $(elem).offset().top + $(elem).outerHeight();
        var windowBottom = $(window).scrollTop() + $(window).height();

        // MOBILE - fade in appearing at top
        if ($(window).width() < 600) {
            return windowBottom > $(elem).offset().top + 200
        }

        return windowBottom > (elementCentre - elem.offsetHeight / 2)
    }

    const sections = $('.section');
    function handleScroll() {
        sections.each(function () {
            if (isElementInView(this)) {
                $(this).addClass("shown")
            }
        });
    }

    handleScroll();
    $(window).on('scroll', handleScroll);
}