class Instrument {
    constructor(title, type, num_of_runs, run_tunings, num_of_steps) {
        this.western_scale = new Chromatic();

        this.title = title;
        this.type = type;
        this.num_of_runs = num_of_runs;
        this.run_tunings = run_tunings;
        this.num_of_steps = num_of_steps;
        this.locations = {};
        this.locations_skeleton();
        this.locations_fill();
    }
    locations_skeleton() {
        // adding skeleton entries
        var note_name;
        for (var i = 0; i < old_scale.scale_notes.length; i++) {
            for (var j = 0; j < old_scale.scale_notes[0].length; j++) {
                note_name = old_scale.scale_notes[i][j];
                this.locations[note_name] = [];
            }
        }
    }
    locations_fill() {
        // filling in entries        
        var note_name;
        for (var i = 0; i < this.num_of_runs; i++) {
            note_name = this.run_tunings[i];

            for (var j = 0; j <= this.num_of_steps; j++) {
                for (var k = 0; k < 3; k++) {
                    note_name = old_scale.equivalent_note_shift(note_name);
                    this.locations[note_name].push([i, j]);
                }
                note_name = old_scale.up_half_step(note_name);
            }
        }
    }
}
class Guitar extends Instrument {
    constructor(title, run_tunings, num_of_steps) {
        super(title, "fret", 6, run_tunings, num_of_steps);  
    }
}
class Bass extends Instrument {
    constructor(title, run_tunings, num_of_steps) {
        super(title, "fret", 4, run_tunings, num_of_steps);
    }
}
class Piano extends Instrument {
    constructor(title, num_of_steps) {
        super(title, "keys", 1, ['C'], num_of_steps);
    }
}

class Scale {
    constructor(included_notes) {
        this.included_notes = included_notes;
        this.scale_map = {};
        this.scale_map_fill();
    }
    scale_map_fill() {
        var note_name;
        for (var i = 0; i < this.included_notes.length; i++) {
            for (var j = 0; j < this.included_notes[0].length; j++) {
                note_name = this.included_notes[i][j];
                this.scale_map[note_name] = [i, j];
            }
        }
    }
}
class Chromatic extends Scale {
    constructor() {
        super([
            ['A', 'G##', 'Bbb'],
            ['A#', 'Bb', 'Cbb'],
            ['C', 'B#', 'Dbb'],
            ['B', 'A##', 'Cb'],
            ['C#', 'B##', 'Db'],
            ['D', 'C##', 'Ebb'],
            ['D#', 'Eb', 'Fbb'],
            ['E', 'D##', 'Fb'],
            ['F', 'E#', 'Gbb'],
            ['F#', 'E##', 'Gb'],
            ['G', 'F##', 'Abb'],
            ['G#', 'Ab']
            ]);
    }
}








var old_scale = {
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
    equivalent_note_shift: function(current_note) {
        var temp = this.find(current_note);
        if (temp[1] < 2) {
            temp[1]++;
        } else {
            temp[1] = 0;
        }
        return this.scale_notes[temp[0]][temp[1]];
    }
}

var openE = new Guitar("Open E", ['E', 'B', 'G', 'D', 'A', 'E'], 21);
console.log(openE.locations['E']);

var normiePiano = new Piano("Normie Piano", 24);
console.log(normiePiano.locations['C']);

var normieBass = new Bass("Normie Bass", ['G', 'D', 'A', 'E'], 21);
console.log(normieBass.locations['E']);




// var num_of_steps = standard_fretboard.num_of_steps;
// var num_of_strings = standard_fretboard.num_of_strings;

// function layout(string_num, string_tuning) {
//     // Setting fret_index to starting location in ordered_notes list, based on string tuning
//     for (var i = 0; i < num_of_steps - 1; i++) {
//         for (var j = 0; j < num_of_strings - 1; j++) {
//             if (string_tuning == ordered_notes[i][j]) {
//                 var fret_index = i;
//             }
//         }
//     }

//     // Updating all parts html grid to have note names listed
//     for (i = 0; i <= num_of_steps; i++) {
//         if (fret_index > num_of_steps - 1) {
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