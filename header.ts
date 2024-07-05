import { randBetween } from "./utils";

export default function initHeader() {
    initStars();
    handleMeteors();
}

const initStars = () => {
    const stars = $("#stars-bg");
    const numStars = 50;

    for (let i = 0; i < numStars; i++) {
        const star = $("<div>").addClass("star");
        star.css("left", `${Math.random() * 100}%`);
        star.css("top", `${Math.random() * 100}%`);
        const size = randBetween(5, 10);
        star.css("width", `${size}px`);
        star.css("height", `${size}px`);
        star.css("animation-delay", `${Math.random() * -0.3}s`);
        stars.append(star);
    }
};
const handleMeteors = () => {
    const meteorShower = $("#meteor-shower");
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
};
