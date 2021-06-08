class Scale {
    constructor(notes, intervals) {
        this.notes = notes;
        this.intervals = intervals;
        this.scale_map = {};
        this.scale_map_create();
    }
    scale_map_create() {
        var current_note;
        for (var i = 0; i < this.notes.length; i++) {
            for (var j = 0; j < this.notes[0].length; j++) {
                current_note = this.notes[i][j];
                this.scale_map[current_note] = [i, j];
            }
        }
    }
    move_up_scale(current_note, amount) {
        return this.notes[(this.scale_map[current_note][0] + amount) % this.notes.length];
    }
    move_down_scale(current_note, amount) {
        return this.notes[(this.scale_map[current_note][0] - amount) % this.notes.length];
    }
    half_step(current_note) {
        return this.move_up_scale(current_note, this.intervals['half_step']);
    }
    whole_step(current_note) {
        return this.move_up_scale(current_note, this.intervals['whole_step']);
    }
}
class Chromatic extends Scale {
    constructor() {
        super([
            ['C', 'B#', 'Dbb'],
            ['C#', 'B##', 'Db'],
            ['D', 'C##', 'Ebb'],
            ['D#', 'Eb', 'Fbb'],
            ['E', 'D##', 'Fb'],
            ['F', 'E#', 'Gbb'],
            ['F#', 'E##', 'Gb'],
            ['G', 'F##', 'Abb'],
            ['G#', 'Ab'],
            ['A', 'G##', 'Bbb'],
            ['A#', 'Bb', 'Cbb'],
            ['B', 'A##', 'Cb']
        ],  
        {
            'half_step': 1,
            'whole_step': 2
        });

    }
}

class Instrument {
    constructor(type, num_of_runs, tuning_of_runs, steps_in_run) {
        this.type = type;
        this.num_of_runs = num_of_runs;
        this.tuning_of_runs = tuning_of_runs;
        this.steps_in_run = steps_in_run;
        this.scale = new Chromatic();
        this.note_indexes = {};
        this.note_indexs_skeleton();
        this.note_indexs_fill();
    }
    note_indexs_skeleton() {
        var current_note;
        for (var i = 0; i < this.scale.notes.length; i++) {
            for (var j = 0; j < this.scale.notes[0].length; j++) {
                current_note = this.scale.notes[i][j];
                this.note_indexes[current_note] = [];
            }
        }
    }
    note_indexs_fill() {
        var current_note;
        var current_notes;
        for (var i = 0; i < this.num_of_runs; i++) {
            current_note = this.tuning_of_runs[i];
            current_notes = this.scale.notes[this.scale.scale_map[current_note][0]];

            for (var j = 0; j < this.steps_in_run; j++) {
                for (var k = 0; k < current_notes.length; k++) {
                    this.note_indexes[current_notes[k]].push([i, j]);
                }
                current_notes = this.scale.move_up_scale(current_notes[0], 1);
            }
        }
    }
}
class Guitar extends Instrument {
    constructor(tuning_of_runs, steps_in_run) {
        super("fret", 6, tuning_of_runs, steps_in_run);  
    }
}
class Bass extends Instrument {
    constructor(tuning_of_runs, steps_in_run) {
        super("fret", 4, tuning_of_runs, steps_in_run);
    }
}
class Piano extends Instrument {
    constructor(tuning_of_runs, steps_in_run) {
        super("keys", 1, tuning_of_runs, steps_in_run);
    }
}

var openE = new Guitar(['E', 'B', 'G', 'D', 'A', 'E'], 22);
// console.log(openE.note_indexes['A']);

var normiePiano = new Piano(['C'], 25);
// console.log(normiePiano.note_indexes['C']);

var normieBass = new Bass(['G', 'D', 'A', 'E'], 22);
console.log(normieBass.note_indexes['E']);



// document.addEventListener('keyup', event => {
//     if (event.code === 'Space') {

//     }
//   })