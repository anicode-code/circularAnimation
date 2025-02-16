const canvas = document.querySelector("canvas");
const info = document.querySelector(".info");

const ctx = canvas.getContext("2d");
let width, height;
preInit();

const myOrigin = new Origin(canvas);
const particles = [];
// const colors = ["#FFEBB2", "#E9A89B", "#D875C7", "#912BBC", "#40bfbf"];
// const colors = [
//     "#ff1c1cb3",
//     "#e73f1db3",
//     "#d9ff1eb3",
//     "#ff1c51b3",
//     "#ffff1db3",
// ];
const colors = [
"#31d331b3",
"#38ffffb3",
"#d9ff1eb3",
"#2bff1cb3",
"#1d1dffb3"
]
const start = Date.now();

function getTime() {
    return Date.now() - start;
}

function init() {
    initialBackground();
    const numberOfParticles = 80;
    for (let i = 0; i < numberOfParticles; i++) {
        const prop = {
            radius: random(5, 110),
            rate: Math.random() * 1 + 0.9,
            startPos: Math.random() * 100,
        };
        particles.push(
            new Particle(
                width / 2,
                height / 2,
                Math.random() * 2 + 4,
                colors[random(0, colors.length - 1)],
                canvas,
                prop
            )
        );
    }
}

function circularMotion(particle) {
    const { rate, radius, startPos } = particle.prop;
    const t = getTime() * 0.001 * rate;
    myOrigin.setPosition(
        particle,
        radius * Math.cos(t + startPos),
        radius * Math.sin(t + startPos)
    );
    particle.draw();
}

function eachFrame() {
    myOrigin.update();
    for (let i = 0; i < particles.length; i++) {
        circularMotion(particles[i]);
    }
    const backgroundParticle = new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 5,
        colors[random(0, colors.length - 1)],
        canvas
    );
    backgroundParticle.draw();
    delete backgroundParticle;
}

function initialBackground() {
    ctx.fillStyle = `rgb(30, 30, 30)`;
    ctx.fillRect(0, 0, width, height);
}

function animateFast() {
    setInterval(() => {
        ctx.fillStyle = `rgba(0, 0, 0, 0.02)`;
        ctx.fillRect(0, 0, width, height);
        ctx.beginPath();
        eachFrame();
    }, 10);
}

function animate() {
    ctx.fillStyle = `hsla(0, 0%, 0%, 0.02)`;
    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    eachFrame();
    requestAnimationFrame(animate);
}

function preInit() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

addEventListener("resize", () => {
    preInit();
    initialBackground();
});

addEventListener("mousemove", (e) => {
    myOrigin.x = e.x;
    myOrigin.y = e.y;
});

addEventListener("mouseover", () => {
    myOrigin.isMouseInside = true;
});

addEventListener("mouseout", () => {
    myOrigin.isMouseInside = false;
});

init();
animateFast();
