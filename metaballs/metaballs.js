const colors = ["#ff9aa2", "#ffb7b2", "#ffdac1", "#e2f0cb", "#b5ead7", "#c7ceea"];

let circleInterval = null;
let container = null;

$(window).on("load", function () {
    $("svg circle").each(function (i) {
        $(this).css({
            "animation-delay": i * -4 + "s",
            "animation-duration": 14 + i * 0.5 + "s",
        });
    });
    container = $("#circle-container");

    circleInterval = setInterval(function () {
        createCircle(container);
    }, 100 / getWindowRatio());
});

$(window).resize(function () {
    if (circleInterval) {
        clearInterval(circleInterval);
        circleInterval = setInterval(function () {
            createCircle(container);
        }, 100 / getWindowRatio());
    }
    $("#log").append("<div>Handler for .resize() called.</div>");
});

// get ratio compared to 1920x967
function getWindowRatio() {
    return (document.body.clientWidth * document.body.clientHeight) / 1856640;
}

function createCircle(container) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    let startX = Math.random() * 100;
    let startY = Math.random() * 100;

    circle.setAttribute("cx", startX + "%");
    circle.setAttribute("cy", startY + "%");
    circle.setAttribute("r", 1);
    circle.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);

    let maxRadius = 20 + Math.random() * 90;

    let animation = setInterval(() => {
        let curRadius = parseInt(circle.getAttribute("r"));
        circle.setAttribute("r", curRadius + maxRadius / 60);
        if (curRadius >= maxRadius) {
            clearInterval(animation);
        }
    }, 10);

    // why no worki
    /*let animation = document.createElement('animate')
    animation.setAttribute('attributeName', 'r');
    animation.setAttribute('dur', '10s');
    animation.setAttribute('values','0;90');
    animation.setAttribute('repeatCount', 'indefinite');*/
    container.append(circle);

    let translationVal = null;
    // this SUCKS
    switch (Math.floor(Math.random() * 4)) {
        // off up
        case 0:
            translationVal = `${Math.random() * 200}%, -150%`
            break;
        // off down
        case 2:
            translationVal = `${Math.random() * 200}%, 250%`
            break;
        // off left
        case 3:
            translationVal = `-150%, ${Math.random() * 200}%`
            break;
        // off right
        default:
            translationVal = `250%, ${Math.random() * 200}%`
            break;
    }

    let translation = { 
        'transform': `translate(${translationVal})`,
        '-webkit-transform': `translate(${translationVal})`,
        '-moz-transform': `translate(${translationVal})`,
        '-ms-transform': `translate(${translationVal})`,
        '-o-transform': `translate(${translationVal})`,
     };

    let speed = 20000 + Math.random() * 20000;

    circle.animate([translation], speed);
    setTimeout(() => {
        circle.remove();
    }, speed - 500);
}
