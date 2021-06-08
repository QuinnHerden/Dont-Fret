class Scale {
    constructor(notes, semitone) {
        this.notes = notes;
        this.semitone = semitone;
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
        return this.move_up_scale(current_note, this.semitone);
    }
    whole_step(current_note) {
        return this.move_up_scale(current_note, this.semitone * 2);
    }
}
class Chromatic extends Scale {
    constructor() {
        super(
        [
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
        1
        );
    }
}



class Instrument {
    constructor(type, tuning_of_runs) {
        this.type = type;
        this.tuning_of_runs = tuning_of_runs;
        this.steps_in_run = 22;
        this.num_of_runs = tuning_of_runs.length;
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
    constructor(tuning_of_runs) {
        super("fret", tuning_of_runs);
    }
}
class Piano extends Instrument {
    constructor(tuning_of_runs) {
        super("keys", tuning_of_runs);
    }
}



class Display {
    constructor() {
        this.instrument = new Guitar(['E', 'B', 'G', 'D']);
        this.display_notes = ['C'];
    }
    show_board(instrument, selected_notes) {
        var div;
        var id_string;
    
        for (var i = 0; i < 4; i++) {
            div = document.createElement('div');
            div.id = 'run' + i;
            div.className = 'run';
            document.getElementById('runs').appendChild(div);
    
            for (var j = 0; j < this.instrument.steps_in_run; j++) {
                div = document.createElement('div');
                div.id = '' + i + ',' + j;
                div.className = 'step';
                // div.innerHTML = '';
                id_string = 'run' + i;
                document.getElementById(id_string).appendChild(div);
            }
        }
        show_board_util(instrument, selected_notes);
    }
    show_board_util(instrument, selected_notes) {
        var to_fill;
        var id_string;
    
        for (var i = 0; i < selected_notes.length; i++) {
            to_fill = instrument.note_indexes[selected_notes[i]];
    
            for (var j = 0; j < to_fill.length; j++) {
                id_string = '' + to_fill[j][0] + ',' + to_fill[j][1];
                document.getElementById(id_string).innerHTML = selected_notes[i];
            }
        }
    }
}

disp = new Display();
disp.show_board();


// document.addEventListener('keyup', event => {
//     if (event.code === 'Digit1') {
//         var normiePiano = new Piano(['C']);
//         show_board(normiePiano, ['C', 'D', 'E', 'F', 'G', 'A', 'B'])
//     }
// })
// document.addEventListener('keyup', event => {
//     if (event.code === 'Digit2') {
//         var normieGuitar = new Guitar(['E', 'B', 'G', 'D', 'A', 'E']);
//         show_board(normieGuitar, ['C', 'G', 'E'])
//     }
// })