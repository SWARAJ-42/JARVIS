window.addEventListener('load', function () {
    const canvas2 = document.getElementById('canvas2');
    const ctx2 = canvas2.getContext('2d', {
        willReadFrequently: true
    });

    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = Math.random() * this.effect.canvasHeight;
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.angle = 0;
            this.distance = 0;
            this.friction = Math.random() * 0.6 + .15;
            this.ease = Math.random() * .05 + .005;
            this.size = this.effect.gap - .5;
            this.friction = Math.random() * 0.6 + .15;
            this.ease = Math.random() * .05 + .005;
            // this.Xwrt_centre = this.originX - this.effect.canvasWidth / 2;
            // this.Ywrt_centre = this.originY - this.effect.canvasHeight / 2;
            // this.angle = Math.atan2(this.Ywrt_centre / this.Xwrt_centre);
            // this.distance = Math.sqrt(this.Xwrt_centre * this.Xwrt_centre + this.Ywrt_centre * this.Ywrt_centre);
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

            if (this.distance < this.effect.mouse.radius / 15) {
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
            // particles
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
        drawFence() {
            this.context.strokeStyle = "blue";
            this.context.fillStyle = "blue";
            this.context.lineWidth = 1;
            this.context.beginPath();
            this.context.arc(canvas2.width / 2, canvas2.height / 2, canvas2.width * (.18), 0, 2 * Math.PI);
            this.context.stroke();
            for (let i = 1; i <= 10; i++) {
                this.context.lineWidth = 10 - i;
                this.context.beginPath();
                this.context.arc(canvas2.width / 2, canvas2.height / 2, canvas2.width * (.18 - i * .004), (i - 1) * Math.PI * .07, (1.6 - (i - 1) * .07) * Math.PI);
                this.context.stroke();
            }
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

    const effect1 = new Effect(ctx2, canvas2.width, canvas2.height);
    effect1.drawFence();
    effect1.convertToPartricles();
    effect1.render();

    function animate() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
        effect1.render();
        requestAnimationFrame(animate);
    }

    animate();

    this.window.addEventListener('resize', function () {
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight;
        effect1.drawFence();
        effect1.convertToPartricles();
        effect1.resize(canvas2.width, canvas2.height);
    })
});
