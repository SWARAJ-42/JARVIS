const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d', {
    willReadFrequently: true
});
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

ctx2.strokeStyle = "aqua";
ctx2.fillStyle = "aqua";
for (let i = 1; i <= 13; i++) {
    ctx2.lineWidth = (10 - i / 13 * 10);
    ctx2.beginPath();
    ctx2.arc(canvas2.width / 2, canvas2.height / 2, canvas2.width * (.18 - i * .003), (i - 1) * Math.PI * .05, (2 - (i - 1) * .05) * Math.PI);
    ctx2.stroke();
}
