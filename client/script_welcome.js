window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
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

    function wrapText(text) {
        let linesArray = [];
        let linesCounter = 0;
        let line = "";
        let words = text.split(" ");
        for (let i = 0; i < words.length; i++) {
            let testLine = words[i] + " ";
            if (ctx.measureText(testLine).width > maxTextwidth) {
                line = words[i] + " ";
                linesCounter++;
            } else {
                line = testLine;
            }
            linesArray[linesCounter] = line;
        }
        linesArray.forEach((el, index) => {
            ctx.filltext(element, canvas.width / 2, canvas.height / 2 * 70);
        });
        console.log(linesArray);
    }
    wrapText("JARVIS");
})