class fretboard {
    constructor(name_of_tunings) {
        this.name_of_tuning = name_of_tunings;
        this.num_of_frets = 12;
        this.num_of_strings = 6;
        this.note_locations = {
            'A': [],
            'G##': [],
            'Bbb': [],
    
            'A#': [],
            'Bb': [],
            'Cbb': [],
    
            'B': [],
            'A##': [],
            'Cb': [],
    
            'C': [],
            'B#': [],
            'Dbb': [],
            
            'C#': [],
            'B##': [],
            'Db': [],
    
            'D': [],
            'C##': [],
            'Ebb': [],
    
            'D#': [],
            'C##': [],
            'Eb': [],
            
            'E': [],
            'D##': [],
            'Fb': [],
    
            'F': [],
            'E#': [],
            'Gbb': [],
    
            'F#': [],
            'E##': [],
            'Gb': [],
    
            'G': [],
            'F##': [],
            'Abb': [],
            
            'G#': [],
            'Ab': [],
            'Bbb': []
        }
    }
}

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





var standard_fretboard = new fretboard("Open E");

var num_of_frets = standard_fretboard.num_of_frets;
var num_of_strings = standard_fretboard.num_of_strings;

function layout(string_num, string_tuning) {
    // Setting fret_index to starting location in ordered_notes list, based on string tuning
    for (var i = 0; i < num_of_frets - 1; i++) {
        for (var j = 0; j < num_of_strings - 1; j++) {
            if (string_tuning == ordered_notes[i][j]) {
                var fret_index = i;
            }
        }
    }

    // Updating all parts html grid to have note names listed
    for (i = 0; i <= num_of_frets; i++) {
        if (fret_index > num_of_frets - 1) {
            fret_index = 0;
        }
        var id = "" + i + "," + string_num
        document.getElementById(id).innerHTML= ordered_notes[fret_index];
        
        fret_index ++;
    }
}






function starter() {
    layout(0, 'E');
    layout(1, 'A');
    layout(2, 'D');
    layout(3, 'G');
    layout(4, 'B');
    layout(5, 'E');
}

// document.addEventListener('keyup', event => {
//     if (event.code === 'Space') {

//     }
//   })