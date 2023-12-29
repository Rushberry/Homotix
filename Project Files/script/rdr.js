//Copying....

function copyText() {
    var textToCopy = document.querySelector('.outp');
    var range = document.createRange();
    range.selectNode(textToCopy);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}

//Speaking....

function speakText() {
const paragraph = document.querySelector('.outp');
const textToSpeak = paragraph.textContent;
if ('speechSynthesis' in window) {
const synthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance(textToSpeak);
synthesis.speak(utterance);
} else {
console.error('Your browser does not support the SpeechSynthesis API. Please use a modern browser.');
}
}

//Redirecting....
function bn() {
window.location.href = "P7.html";
}

function en() {
window.location.href = "P6.html";
}

function longen() {
window.location.href = "P8.html";
}

function longbn() {
window.location.href = "P9.html";
}

function shorten() {
window.location.href = "P6.html";
}

function shortbn() {
window.location.href = "P7.html";
}
