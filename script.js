var order = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
var ordered_notes = [
    ['A', 'G##', 'Bbb'],
    ['A#', 'Bb', 'Cbb'],
    ['B', 'A##', 'Cb'],
    ['C', 'B#', 'Dbb'],
    ['C#', 'B##', 'Db'],
    ['D', 'C##', 'Ebb'],
    ['D#', 'C##', 'Eb'],
    ['E', 'D##', 'Fb'],
    ['F', 'E#', 'Gbb'],
    ['F#', 'E##', 'Gb'],
    ['G', 'F##', 'Abb'],
    ['G#', 'Ab', 'Bbb'],
];

var num_of_frets = 12;
var num_of_strings = 6;

function layout(string_num, string_tuning) {
    // Setting fret_index to starting location in ordered_notes list, based on string tuning
    for (var i = 0; i < num_of_frets - 1; i++) {
        for (var j = 0; j < num_of_strings - 1; j++) {
            if (string_tuning == ordered_notes[i][j]) {
                var fret_index = [i, j];
            }
        }
    }

    // Updating all parts grid to have note names listed
    for (i = 0; i <= 12; i++) {
        if (fret_index[0] > num_of_frets - 1) {
            fret_index[0] = 0;
        }
        var id = "" + i + "," + string_num
        document.getElementById(id).innerHTML= ordered_notes[fret_index[0]];
        
        fret_index[0] ++;
    }
}

// function layout(string_num, string_tuning) {
//     var fret_index = order.indexOf(string_tuning);

//     for (var i = 0; i <= 12; i++) {
//         if (fret_index > num_of_frets - 1) {
//             fret_index = 0;
//         }
//         var id = "" + i + "," + string_num
//         document.getElementById(id).innerHTML= order[fret_index];
        
//         fret_index ++;
//     }
// }

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        layout(0, 'F##');
        layout(1, 'A');
        layout(2, 'D');
        layout(3, 'G');
        layout(4, 'B');
        layout(5, 'E');
    }
  })