let text = document.getElementById("text");
let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

t = canvas.height / 2 + canvas.width / 40
w = canvas.width / 2 - canvas.width / 2 * .25
f = canvas.width / 55
text.style.top = `${t}px`
text.style.left = `${w}px`
text.style.textAlign = "center"
text.style.fontSize = `${f}px`

let resize = async (width, height) => {
    t = height / 2 + width / 40
    w = width / 2 - width / 2 * .25
    f = width / 55
    text.style.display = "none"
    text.style.top = `${t}px`
    text.style.left = `${w}px`
    text.style.textAlign = "center"
    text.style.fontSize = `${f}px`
    setTimeout(() => {
        text.style.display = "inline"
    }, 2000)
}

this.window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resize(canvas.width, canvas.height);
})