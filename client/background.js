const canvas3 = document.querySelector("#canvas3");
const ctx3 = canvas3.getContext("2d");

let w, h, particleArray = [];
let Mouse = {
	x: undefined,
	y: undefined
}
let rgb = [
	[0, 0, 255],
    [0, 0, 250],
	[0, 0, 240],
	[0, 0, 230],
	[0, 0, 220],
	[0, 0, 210],
	[0, 0, 200]
]

function init() {
	resizeReset();
	animationLoop();
}

function resizeReset() {
	w = canvas3.width = window.innerWidth;
	h = canvas3.height = window.innerHeight;
}

function animationLoop() {
	ctx3.clearRect(0, 0, w, h);
	drawBalls();
	requestAnimationFrame(animationLoop);
}

function drawBalls() {
    for (let a = 0; a < particleArray.length; a++) {
        particleArray[a].update();
        particleArray[a].draw();
        for (let b = a; b < particleArray.length; b++) {
            const dx = particleArray[a].x - particleArray[b].x;
            const dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 90) {
                opacity = .5;
                ctx3.beginPath();
                ctx3.strokeStyle = `rgb(0, 255, 255, ${opacity})`;
                ctx3.lineWidth = particleArray[a].size / 10;
                ctx3.moveTo(particleArray[a].x, particleArray[a].y);
                ctx3.lineTo(particleArray[b].x, particleArray[b].y);
                ctx3.stroke();
            }
        }
        if (particleArray[a].size == 0 ) {
            particleArray.slice(a, 1);
            a--;
        }
    }
}

function mousemove(e) {
	Mouse.x = e.x;
	Mouse.y = e.y;
    for (let i = 0; i < 3; i++) {
        particleArray.push(new Particle());
    }
}

function mouseout() {
	Mouse.x = undefined;
	Mouse.y = undefined;
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

class Particle {
	constructor() {
		this.x = Mouse.x ;
		this.y = Mouse.y ;
		this.size = Math.random() * 2 + .1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
		this.rgb = rgb[getRandomInt(0, rgb.length - 1)];
		this.style = "rgba("+this.rgb[0]+","+this.rgb[1]+","+this.rgb[2]+",.5)";
	}
	draw() {
		ctx3.fillStyle = this.style;
		ctx3.beginPath();
		ctx3.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx3.fill();
	}
	update() {
        this.x += this.speedX;
        this.y += this.speedY;
		if (this.size > 0.1) {
            this.size -= .03
		}
        
	}
}


window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);