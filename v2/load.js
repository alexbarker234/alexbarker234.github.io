$(window).on("load", function () {
    rotateCircles();

    mainAngle = 0;
    rotateSpeed = 3;
    // rotate circle
    setInterval(function () {
        $(".main").css("transform", `rotate(${mainAngle}deg)`);
        const innerCircles = $(".main").find(".circle-inner");

        angle = 360 / innerCircles.length;
        innerCircles.each(function (index) {
            $(this).css("transform", `rotate(-${mainAngle + angle * index}deg)`);
        }); // make image straight

        mainAngle = (mainAngle + rotateSpeed) % 360;
        rotateSpeed = Math.max(0.1, rotateSpeed - 0.03);
    }, 20);

    // handle meteors
    const meteorShower = $("#meteor-shower");
    setInterval(function () {
        if (Math.random() > 0.5) return;
        let meteor = $('<div>').addClass('meteor')

        const offset = window.innerWidth / 4;
        const startX = offset + Math.floor(Math.random() * (window.innerWidth - offset));
        const startY = -100;
        
        // Calculate random ending position
        const move = (window.innerHeight + 300)

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
        }, 300)
        meteorShower.append(meteor)
    }, 200);

    $(window).on("resize", function () {
        rotateCircles();
    });
});



function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
}

function rotateCircles() {
    const main = $(".main")
    const circles = $(".circle");
    angle = 360 / circles.length;


    dist = main.width() / 2

    circles.each(function (index) {
        $(this).css("transform", `rotate(${angle * index}deg) translateX(${dist}px)`);
    });
}

$(document).mousemove(function (e) {
    if ($(window).width() < 800) return
    circles = $(".circle");
    angle = 360 / circles.length;
    const main = $(".main")
    dist = main.width() / 2

    circles.each(function (index) {
        var rect1 = this.getBoundingClientRect();
        var x = rect1.left + rect1.width * 0.5;
        var y = rect1.top + rect1.height * 0.5;

        var scaleDist = 400;
        scale = 1 + (1 - Math.min(getDistance(e.pageX, e.pageY, x, y), scaleDist) / scaleDist);

        $(this).css("transform", `rotate(${angle * index}deg) translateX(${dist}px) scale(${scale * 0.75})`);
    });

    $('#mouse-glow').css({
        'left': e.pageX,
        'top': e.pageY
      });
});
