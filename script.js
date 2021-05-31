var strings = ["E (high)", "B", "G", "D", "A", "E (low)"];
var notes = ["A", "B", "C", "D", "E", "F", "G"];
var mod = [" ", "#", "b"];
var fingers = ["1st", "2nd", "3rd", "4th"];
function change() {
    document.getElementById("string").innerHTML = strings[Math.floor(Math.random() * strings.length)];
    document.getElementById("note").innerHTML =
        notes[Math.floor(Math.random() * notes.length)] + mod[Math.floor(Math.random() * mod.length)];
    document.getElementById("finger").innerHTML = fingers[Math.floor(Math.random() * fingers.length)];
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
     change()
    }
  })