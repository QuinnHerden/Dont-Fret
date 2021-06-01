const base_notes = ["F", "C", "G", "D", "A", "E", "B"];

function change() {
    var notes = [base_notes];
    var accidentals = document.querySelector('input[name="key"]:checked').value;

    for (i = 0, i < accidentals; i++) {
        notes[i] = notes[i] + "#";
    }
    // var disp = document.querySelector('input[name="key"]:checked').value;
    // notes[1] = "L";
    // document.getElementById("test").innerHTML = notes[1];
    
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        change();
    }
  })