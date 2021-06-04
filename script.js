const notes = {
    "C": {
        "notes_in_key": ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        "vertical_fretboard_locations": [
            [1, 4],
            [3, 1],
            [5, 3],
            [8, 0],
            [8, 5],
            [10, 2]
        ]
    },
    "D": {}
}




const base_notes = ["F", "C", "G", "D", "A", "E", "B"];
var base_copy = base_notes.slice();

function key_change() {
    base_copy = base_notes.slice(); // copies base_notes
    var accidentals = document.querySelector('input[name="key"]:checked').value[0]; // grabs the # of accidentals in selected key
    
    for (var i = 0; i < accidentals; i++) { // adds appropriate sharps
        base_copy[i] = (base_copy[i] + "#");
    }
}

function change() {
    // document.getElementById("note").innerHTML = tones["C"]["notes_in_key"][0];
    document.getElementById("note").innerHTML = notes["C"]["vertical_fretboard_locations"][0];


    // document.getElementById("note").innerHTML = notes[Math.floor(Math.random() * notes.length)];
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        change();
    }
  })