spin = 0;
spinSpeed = 0;
frost = 0;
$( document ).ready(function() {
    frost = parseInt(localStorage.getItem('frost'));
    frost = isNaN(frost) ? 0 : frost;
    $('#frost').find('span').html(frost)


    const snowflake = $('.snowflake');
    snowflake.on('click', function() {
        spinSpeed = Math.min(spinSpeed + 1, 5);
        frost += 1;
        $("#frost").find("span").html(frost);

        localStorage.setItem("frost", frost);

        const snow = $("<div>").addClass("snow");
        snow.css("left", `${Math.floor(Math.random() * 100)}%`);

        var startLeft = Math.random() * 100;

        snow.css({
            top: '-10px',
            left: `${startLeft}%`,
            scale: randBetween(0.6, 1)
        });
        const duration = randBetween(8000, 10000);
        snow.animate(
            {
                top: "110vh",
                left: `${startLeft +  (10 - Math.random() * 20)}%`,
            },
            {
                duration: duration,
                easing: "linear",
            }
        ); 

        setTimeout(function() {
            snow.remove()
        }, duration)

        $(".snowfall").append(snow);
    })
    setInterval(function() {
        spin =( spin + spinSpeed ) % 360;
        spinSpeed = lerp(spinSpeed, 0, 0.01);
        snowflake.find('svg').css('rotate', `${spin}deg`)
    }, 10)

    houseSmoke();
    loadStars();
});

function loadStars() {
    const stars = $(".stars")
    for (let i = 0; i < 50; i++) {
        const star =$("<div>").addClass("star");
        star.css("left", `${Math.random() * 100}%`)
        star.css("top", `${Math.random() * 80}%`)
        const size = randBetween(5,10)
        star.css("width", `${size}px`)
        star.css("height", `${size}px`)
        star.css('animation-delay', `${Math.random() * -0.3}s`)
        stars.append(star);
    }
}

function houseSmoke() {
    const house = $(".house")
    setInterval(function() {
        const smoke =$("<div>").addClass("smoke");
        house.append(smoke);

        setTimeout(function() {
            smoke.remove()
        }, 10000)
    }, 1000)
}


function lerp (start, end, amt) {
    return (1-amt)*start+amt*end
}
function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}
  