spin = 0;
spinSpeed = 0;
frost = 0;

autoClickers = [];

snowfallCanvas = undefined;

$( document ).ready(function() {
    frost = parseInt(localStorage.getItem('frost'));
    frost = isNaN(frost) ? 0 : frost;
    $('#frost').find('span').html(frost)
    snowfallCanvas = $("#snowfall").get(0)

    const snowflake = $('.snowflake');
    snowflake.on('click', function() {
        snowList.push({x: Math.random() * snowfallCanvas.width, y: -10, size: randBetween(2, 8), yVel: randBetween(0.7, 1), xVel: randBetween(-0.1, 0.1)})

        spinSpeed = Math.min(spinSpeed + 1, 5);
        frost += 1;
        $("#frost").find("span").html(frost);

        localStorage.setItem("frost", frost);

        /*const snow = $("<div>").addClass("snow");
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

        $(".snowfall").append(snow);*/
    })
    setInterval(function() {
        spin =( spin + spinSpeed ) % 360;
        spinSpeed = lerp(spinSpeed, 0, 0.01);
        snowflake.find('svg').css('rotate', `${spin}deg`)
    }, 10)

    snowfallCanvas.width = window.innerWidth;
    snowfallCanvas.height = window.innerHeight;

    $( window ).on( "resize", function() {
        snowfallCanvas.width = window.innerWidth;
        snowfallCanvas.height = window.innerHeight;
    } );

    houseSmoke();
    loadStars();
    store();
    initCanvas();
});

let snowList = []

function initCanvas() {
    window.requestAnimationFrame(drawCanvas);
}
function drawCanvas(){
    const ctx = document.getElementById("snowfall").getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

    let remaining = [];
    for (let i = 0; i < snowList.length; i++) {
        const snow = snowList[i];
        
        ctx.beginPath();
        ctx.arc(snow.x, snow.y, snow.size, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        snow.y += snow.yVel;
        snow.x += snow.xVel;
        if (snow.y < ctx.canvas.height + 20) remaining.push(snow)
    }
    snowList = remaining;
    window.requestAnimationFrame(drawCanvas);
 }
function store() {
    const store = $(".store")
    const upgrades = store.find(".upgrade");
    upgrades.each(function (index) {
        autoClickers[index] ??= 0;
        $(this).on("click", function () {
            autoClickers[index]++;
            console.log(autoClickers)
        });
    });    
}

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
  