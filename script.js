var strings = ["?", "E lo ", "B", "G", "D", "A", "E hi"];
var notes = ["?", "A", "B", "C", "D", "E", "F", "G"];
var mod = ["?", " ", "#", "b"];
var fingers = ["?", "1st", "2nd", "3rd", "4th"];
function change() {
    document.getElementById("string").innerHTML = strings[Math.floor(Math.random() * (strings.length-1)) + 1];
    document.getElementById("note").innerHTML =
        notes[Math.floor(Math.random() * (notes.length-1)) + 1] + mod[Math.floor(Math.random() * (mod.length-1)) + 1];
    document.getElementById("finger").innerHTML = fingers[Math.floor(Math.random() * (fingers.length-1)) + 1];
}

function selectAll() {
    document.getElementsByClassName("")
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
     change()
    }
  })