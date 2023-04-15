const startBtn = document.querySelector("#start-btn")
const stopBtn_1 = document.querySelector("#stop-btn")
const indicator = document.querySelector("#text")

indicator.style.display = "none"
stopBtn.style.display = "none"

const recognition = new webkitSpeechRecognition();
const synth = speechSynthesis;

recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
let speechRec;

startBtn.addEventListener("click", () => {
    recognition.start();
    speechRec = true;
    indicator.style.display = "inline"
    startBtn.style.display = "none"
})
stopBtn.addEventListener("click", () => {
    synth.cancel()
    stopBtn_1.style.display = "none"
    recognition.start();
    speechRec = true;
})

let utter = new SpeechSynthesisUtterance("Hi there, I am Jarvis")
utter.onend = () => {
    recognition.start();
    speechRec = true;
    indicator.style.display = "inline"
    startBtn.style.display = "none"
    stopBtn_1.style.display = "none";
}


recognition.onresult = (e) => {
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    if (transcript === "hello") {
        recognition.stop();
        speechRec = false;
        indicator.style.display = "none"
        utter.text = "Aye Sir !";
        console.log(transcript);
        stopBtn_1.style.display = "inline"
        synth.speak(utter);
    }
    else {
        let istext_mode = (transcript === "Jarvis text mode on");
        recognition.stop();
        speechRec = false;
        indicator.style.display = "none"
        // fetch data from server -> bot's response
        let answer = async () => {
            const response = await fetch("http://localhost:5000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: transcript,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                const parseData = data.bot.trim();
                if (!istext_mode) {
                    utter.text = parseData;
                    stopBtn_1.style.display = "inline";
                    synth.speak(utter);
                }
            } else {
                const err = await response.text();
                if (!istext_mode) {
                    utter.text = "Oops... Something went wrong.";
                    stopBtn_1.style.display = "inline";
                    synth.speak(utter);
                    alert(err);
                }
            }
        }
        // if (transcript.split(" ").includes("jarvis") || transcript.split(" ").includes("Jarvis")) {
            answer();
            // }
        }
        console.log(transcript);
    }
    
    this.window.addEventListener('resize', function () {
        if(speechRec == true) {
            indicator.style.display = "inline"
        }
        else {
            indicator.style.display = "none"
        }

})