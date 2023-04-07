window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const text = "JARVIS";
    console.log(ctx);

    class Particle {
        constructor() {

        }
        draw() {

        }
        update() {

        }

    }

    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            this.fontsize = 100;
            this.lineHeight = this.fontsize * .8;
            this.maxTextwidth = this.canvasWidth * .8;
            this.textInput = document.getElementById('textInput');
            this.textInput.addEventListener('keyup',(e) => {
                if (e.key !== " ") {
                    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.wrapText(e.target.value);
                }
            });
            // particles text
            this.particles = [];
            this.gap = 3;
            this.mouse = {
                radius: 20000,
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
            this.context.fillStyle = gradient;
            this.context.lineWidth = 3;
            this.context.strokeStyle = "aqua";
            this.context.font = this.fontsize + "px Helvetica"
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
        }
        convertToPartricles() {

        }
        render() {

        }
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText(text);
    console.log(effect);

    function animate() {

    }
});