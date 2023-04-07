let p = [];
window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d', {
        willReadFrequently: true
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const text = "JARVIS";

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = Math.random() * this.effect.canvasHeight;
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap - 1;
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.angle = 0;
            this.distance = 0;
            this.friction = Math.random() * 0.6 + .15;
            this.ease = Math.random() * .05 + .005;
        }
        draw() {
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.mouse.radius / this.distance;

            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx = this.force * Math.cos(this.angle);
                this.vy = this.force * Math.sin(this.angle);
            }

            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;

        }
    }

    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.fontsize = this.canvasWidth / 17;
            this.lineHeight = this.fontsize * .8;
            this.maxTextwidth = this.canvasWidth * .8;
            this.verticalOffset = 0;
            // this.textInput = document.getElementById('textInput');
            // this.textInput.addEventListener('keyup', (e) => {
            //     if (e.key !== " ") {
            //         this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            //         this.wrapText(e.target.value);
            //     }
            // });
            // particles text
            this.particles = [];
            this.gap = 3;
            this.mouse = {
                radius: this.fontsize * 100,
                x: 0,
                y: 0
            }
            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            })
        }
        wrapText(text) {
            const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
            gradient.addColorStop(.3, 'red');
            gradient.addColorStop(.5, 'fuchsia');
            gradient.addColorStop(.7, 'purple');
            this.context.fillStyle = "blue";
            this.context.lineWidth = 3;
            this.context.strokeStyle = "blue";
            this.context.font = this.fontsize + "px Orbitron"
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';

            // Arrangeing Text
            let linesArray = [];
            let linesCounter = 0;
            let line = "";
            let words = text.split(" ");
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + " ";
                if (this.context.measureText(testLine).width > this.maxTextwidth) {
                    line = words[i] + " ";
                    linesCounter++;
                } else {
                    line = testLine;
                }
                linesArray[linesCounter] = line;
            }
            let textHeight = this.lineHeight * linesCounter;
            this.textY = this.canvasHeight / 2 - textHeight / 2;

            linesArray.forEach((el, index) => {
                this.context.fillText(el.trim(), this.canvasWidth / 2, this.textY + index * this.lineHeight);
                this.context.strokeText(el.trim(), this.canvasWidth / 2, this.textY + index * this.lineHeight);
            });
            this.convertToPartricles();
        }
        convertToPartricles() {
            this.particles = [];
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            for (let y = 0; y < this.canvasHeight; y += this.gap) {
                for (let x = 0; x < this.canvasWidth; x += this.gap) {
                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];
                    if (alpha > 0) {
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = `rgb('${red}', '${green}', '${blue}')`;
                        this.particles.push(new Particle(this, x, y, color));
                        p.push(new Particle(this, x, y, color));
                    }
                }
            }
        }
        render() {
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
        }

        resize(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.maxTextwidth = this.canvasWidth * .8;
            this.fontsize = this.canvasWidth / 17;
        }
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText(text);
    effect.render();
    let limit = canvas.width * (.18);
    console.log(p);
    this.window.addEventListener('mousemove', function (e) {
        if (e.x <= canvas.width / 2 + limit && e.x >= canvas.width / 2 - limit && e.y <= canvas.height / 2 + limit && e.y >= canvas.height / 2 - limit) {
            for (let i = 0; i < p.length; i++) {
                let particle = p[i];
                if (i % 8 == 0) {
                    particle.effect.context.lineWidth = .2;
                    particle.effect.context.strokeStyle = 'blue';
                    particle.effect.context.beginPath();
                    particle.effect.context.moveTo(particle.originX, particle.originY)
                    particle.effect.context.lineTo(e.x, e.y);
                    particle.effect.context.stroke();
                }
            }

        }
    })


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        effect.render();
        requestAnimationFrame(animate);
    }

    animate();

    this.window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        effect.resize(canvas.width, canvas.height);
        effect.wrapText(text);
    })
});

