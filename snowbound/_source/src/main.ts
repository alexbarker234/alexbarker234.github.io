import $ from "jquery";

import { randBetween, lerp } from "./mathUtils";
import './scssLoad.ts'
import { SaveData, getGameData, load, save } from "./gameData";
import { initialiseStore } from "./economy";

let spin = 0;
let spinSpeed = 0;


let snowfallCanvas: HTMLCanvasElement = undefined;
let snowList: SnowParticle[] = []

interface SnowParticle {
    x: number;
    y: number;
    size: number;
    vel: {
        x: number;
        y: number;
    };
}

let saveData: SaveData = undefined;

$( document ).ready(function() {
    
    load();
    initialiseStore();
    houseSmoke();
    loadStars();
    initCanvas();

    saveData = getGameData();
    
    // save every 2 seconds
    setInterval(function() {
        save();
    }, 2000)

    let counter = 0;
    const interval = 50; 

    // setInterval is not super accurate, work with time deltas 
    var lastCheck = Date.now();
    setInterval(function() {
        const perSecond = 0.2;
        const perInterval = (perSecond / 1000) * interval;
        
        var delta = Date.now() - lastCheck;
        if (delta > interval * 5) delta = interval; // no cheating by changing date thanks
        lastCheck = Date.now();

        var frostThisInterval = (delta / interval) * perInterval

        addFrost(frostThisInterval)
    }, interval);

    $('#frost').find('span').html(saveData.frost.toString())
    snowfallCanvas = $("#snowfall").get(0) as HTMLCanvasElement

    const snowflake = $('.snowflake');
    snowflake.on('click', function() {
        snowList.push({x: Math.random() * snowfallCanvas.width, y: -10, size: randBetween(2, 8), vel: {y: randBetween(0.7, 1), x: randBetween(-0.1, 0.1)}})

        spinSpeed = Math.min(spinSpeed + 1, 5);
        addFrost(1)
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
});

function addFrost(amount: number) {
    saveData.frost += amount;
    $("#frost").find("span").html(Math.floor(saveData.frost).toString());
}

function initCanvas() {
    window.requestAnimationFrame(drawCanvas);
}
function drawCanvas(){
    const ctx = snowfallCanvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

    let remaining = [];
    for (let i = 0; i < snowList.length; i++) {
        const snow = snowList[i];

        ctx.beginPath();
        ctx.arc(snow.x, snow.y, snow.size, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        snow.y += snow.vel.y;
        snow.x += snow.vel.x;
        if (snow.y < ctx.canvas.height + 20) remaining.push(snow);
    }
    snowList = remaining;
    window.requestAnimationFrame(drawCanvas);
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
