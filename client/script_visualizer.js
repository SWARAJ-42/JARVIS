function main() {
    const canvas = document.getElementById("audio_canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    class Bar {
        constructor (x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
        }
        update (micInput) { 
            this.height = micInput * 150;
        }
        draw (context) {
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = this.color;
        }
    }
    
    const microphone = new Microphone();
    let bars = []
    let bars1 = []
    let barwidth = (canvas.width / 2 - (canvas.width / 7 + canvas.width / 20)) / 128; 
    function createBars() {
        for (let i = 0; i < 128; i++) {
            bars.push(new Bar(i * barwidth, canvas.height / 2, barwidth / 2, 20, 'rgba(0, 0, 255)'))
        }
        let x = (canvas.width / 7 + canvas.width / 20) + canvas.width / 2
        for (let i = 0; i < 128; i++) {
            bars1.push(new Bar(x + i * barwidth, canvas.height / 2, barwidth / 2, 20, 'rgba(0, 0, 255)'))
        }
    }
    createBars();

    function animate() {
        if (microphone.initialized) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // generates audio samples from microphone
            const samples = microphone.getSamples();
            console.log(samples)
            // animate bars based on microphone data
            bars.forEach(function(bar, i) {
                bar.update(samples[i])
                bar.draw(ctx)
            })
            bars1.forEach(function(bar1, i) {
                bar1.update(samples[i])
                bar1.draw(ctx)
            })
        }
        requestAnimationFrame(animate);
        // console.log('animate');
    }
    animate()
}