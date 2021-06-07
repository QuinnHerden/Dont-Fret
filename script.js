class fretboard {
    constructor(name_of_tunings) {
        this.name_of_tuning = name_of_tunings;
        this.num_of_frets = 21;
        this.num_of_strings = 6;
        this.tuning = ['E', 'B', 'G', 'D', 'A', 'E'];
        this.locations = {
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
            'Eb': [],
            'Fbb': [],
            
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
            'n/a': []
        };
        this.mapNotes();    
    }

    mapNotes() {
        var scale_starting_index = -1;
        var note_name = "";
        
        for (var i = 0; i < this.num_of_strings; i++) {
            note_name = this.tuning[i];
            scale_starting_index = scale.find(note_name)[0];

            for (var j = 0; j < this.num_of_frets + 1; j++) {
                for (var k = 0; k < 3; k++) {
                    note_name = scale.shift_name(note_name);
                    this.locations[note_name].push([i, j]);
                }
                note_name = scale.up_half_step(note_name);
            }
        }
    }
}
var scale = {
    scale_notes: [
        ['A', 'G##', 'Bbb'],
        ['A#', 'Bb', 'Cbb'],
        ['B', 'A##', 'Cb'],
        ['C', 'B#', 'Dbb'],
        ['C#', 'B##', 'Db'],
        ['D', 'C##', 'Ebb'],
        ['D#', 'Eb', 'Fbb'],
        ['E', 'D##', 'Fb'],
        ['F', 'E#', 'Gbb'],
        ['F#', 'E##', 'Gb'],
        ['G', 'F##', 'Abb'],
        ['G#', 'Ab', 'n/a'],
    ],

    find: function(search_note) {
        var location = [-1, -1];
        for (var i = 0; i < this.scale_notes.length; i++) {
            for (var j = 0; j < this.scale_notes[0].length; j++) {
                if (search_note == this.scale_notes[i][j]) {
                    location[0] = i;
                    location[1] = j;
                }
            }
        }
        return location;
    },
    up_half_step: function(current_note) {
        var temp = this.find(current_note);
        if (temp[0] < 11) {
            temp[0]++;
        } else {
            temp[0] = 0;
        }
        return this.scale_notes[temp[0]][temp[1]];
    },
    shift_name: function(current_note) {
        var temp = this.find(current_note);
        if (temp[1] < 2) {
            temp[1]++;
        } else {
            temp[1] = 0;
        }
        return this.scale_notes[temp[0]][temp[1]];
    }
}

var guitar = new fretboard("Open E");

console.log(guitar.locations['E']);




// var num_of_frets = standard_fretboard.num_of_frets;
// var num_of_strings = standard_fretboard.num_of_strings;

// function layout(string_num, string_tuning) {
//     // Setting fret_index to starting location in ordered_notes list, based on string tuning
//     for (var i = 0; i < num_of_frets - 1; i++) {
//         for (var j = 0; j < num_of_strings - 1; j++) {
//             if (string_tuning == ordered_notes[i][j]) {
//                 var fret_index = i;
//             }
//         }
//     }

//     // Updating all parts html grid to have note names listed
//     for (i = 0; i <= num_of_frets; i++) {
//         if (fret_index > num_of_frets - 1) {
//             fret_index = 0;
//         }
//         var id = "" + i + "," + string_num
//         document.getElementById(id).innerHTML= ordered_notes[fret_index];
        
//         fret_index ++;
//     }
// }


// document.addEventListener('keyup', event => {
//     if (event.code === 'Space') {

//     }
//   })