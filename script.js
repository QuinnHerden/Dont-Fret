const base_notes = ["F", "C", "G", "D", "A", "E", "B"];
var notes = base_notes.slice();

function key_change() {
    notes = base_notes.slice(); // copies base_notes
    var accidentals = document.querySelector('input[name="key"]:checked').value[0]; // grabs the # of accidentals in selected key
    
    for (var i = 0; i < accidentals; i++) { // adds appropriate sharps
        notes[i] = (notes[i] + "#");
    }
}

function change() {
    document.getElementById("note").innerHTML = notes[Math.floor(Math.random() * notes.length)];
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        change();
    }
  })