let text = document.getElementById("text");
let link = document.getElementById("link");
let canvas = document.getElementById("canvas1");
let stopBtn = document.getElementById("stop-btn");

stopBtn.style.display = "none"

let ctx = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

// Listening...
t = canvas.height / 2 + canvas.width / 40
w = canvas.width / 2 - canvas.width / 2 * .25
f = canvas.width / 80

text.style.top = `${t}px`
text.style.left = `${w}px`
text.style.textAlign = "center"
text.style.fontSize = `${f}px`

// start-btn-1
bt = canvas.height / 2 + canvas.width / 10
bw = canvas.width / 2 - canvas.width / 2 * .065
bf = canvas.width / 80

stopBtn.style.top = `${bt}px`
stopBtn.style.left = `${bw}px`
stopBtn.style.textAlign = "center"
stopBtn.style.fontSize = `${bf}px`

// text_mode link
lt = canvas.height / 2 + canvas.width / 20
lw = canvas.width / 2 + canvas.width / 3
lf = canvas.width / 50

link.style.top = `${lt}px`
link.style.left = `${lw}px`
link.style.textAlign = "center"
link.style.fontSize = `${lf}px`

let resize = async (width, height) => {
    t = height / 2 + width / 40
    w = width / 2 - width / 2 * .25
    f = width / 80

    text.style.display = "none"
    text.style.top = `${t}px`
    text.style.left = `${w}px`
    text.style.textAlign = "center"
    text.style.fontSize = `${f}px`

    lt = canvas.height / 2 + canvas.width / 20
    lw = canvas.width / 2 + canvas.width / 3
    lf = canvas.width / 50

    link.style.display = "none"
    link.style.top = `${lt}px`
    link.style.left = `${lw}px`
    link.style.textAlign = "center"
    link.style.fontSize = `${lf}px`

    bt = canvas.height / 2 + canvas.width / 10
    bw = canvas.width / 2 - canvas.width / 2 * .065
    bf = canvas.width / 80

    stopBtn.style.top = `${bt}px`
    stopBtn.style.left = `${bw}px`
    stopBtn.style.textAlign = "center"
    stopBtn.style.fontSize = `${bf}px`

    setTimeout(() => {
        text.style.display = "inline"
        link.style.display = "inline"
    }, 1000)
}

this.window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resize(canvas.width, canvas.height);
})