let canvas3 = document.getElementById("canvas3")
let c = canvas3.getContext("2d")

canvas3.width = window.innerWidth;
canvas3.height = window.innerHeight;

mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

colorArray = [
    '#00bdff',
    '#4d39ce',
    '#888cff'
]

// window.addEventListener('mousemove',function(event) {
//     mouse.x=event.x
//     mouse.y=event.y
// })

addEventListener('resize', function () {
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
    mouse = {
        x: canvas3.width / 2,
        y: canvas3.height / 2
    }
    particles.forEach(particle => {
        particle.resize(canvas3.width);
    });
})

function randomInt(start, end) {
    return Math.floor(Math.random() * end + start)
}

class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.01 * Math.pow(-1, randomInt(1,2));
        this.a = randomInt(canvas3.width / 7, canvas3.width / 20);
        this.lastMouse = {
            x: x,
            y: y
        };

        this.draw = lastPoint => {
            c.beginPath();
            c.strokeStyle = this.color;
            c.lineWidth = this.radius;
            c.moveTo(lastPoint.x, lastPoint.y);
            c.lineTo(this.x, this.y);
            c.stroke();
        };
        this.resize = (width) => {
            this.a = randomInt(width / 7, width / 20);
        }
        this.update = () => {
            this.lastPoint = {
                x: this.x,
                y: this.y
            };

            this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
            this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

            this.radians += this.velocity;
            this.x = this.lastMouse.x + Math.cos(this.radians) * this.a;
            this.y = this.lastMouse.y + Math.sin(this.radians) * this.a;
            this.draw(this.lastPoint);
        };
    }
}

let particles = []
let color;
let radius;
for (let index = 0; index < 100; index++) {
    color = randomInt(0, 2);
    color = colorArray[color];
    radius = Math.random() * 10 + 1;
    particles.push(new Particle(innerWidth / 2, innerHeight / 2, radius, color));

}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.05)"
    c.fillRect(0, 0, innerWidth, innerHeight);
    particles.forEach(element => {
        element.update()
    });
}

animate();