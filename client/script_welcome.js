window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const textInput = document.getElementById('textInput');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const text = "JARVIS";
    console.log(ctx);
    ctx.fillStyle = 'aqua';
    ctx.strokeStyle = "blue";

    ctx.font = "80px Helvetica"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const maxTextwidth = canvas.width * .8;
    const lineHeight = 80;

    function wrapText(text) {
        let linesArray = [];
        let linesCounter = 0;
        let line = "";
        let words = text.split(" ");
        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + " ";
            if (ctx.measureText(testLine).width > maxTextwidth) {
                line = words[i] + " ";
                linesCounter++;
            } else {
                line = testLine;
            }
            linesArray[linesCounter] = line;
        }
        let textHeight = lineHeight * linesCounter;
        let textY = canvas.height / 2 - textHeight / 2;

        linesArray.forEach((el, index) => {
            ctx.fillText(el, canvas.width / 2, textY + index * lineHeight);
            ctx.strokeText(el, canvas.width / 2, textY + index * lineHeight);
        });
        // console.log(linesArray);
    }
    wrapText(text);

    textInput.addEventListener('keyup', function (e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        wrapText(e.target.value);
    })
});