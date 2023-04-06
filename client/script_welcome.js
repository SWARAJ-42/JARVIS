window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const text = "JARVIS";
    const textX = canvas.width / 2;
    const textY = canvas.height / 2;
    console.log(ctx);
    ctx.fillStyle = 'aqua';
    ctx.strokeStyle = "blue";

    ctx.font = "80px Helvetica"
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, textX, textY);
    ctx.strokeText(text, textX, textY);

    function wrapText(text) {
        
    }
})