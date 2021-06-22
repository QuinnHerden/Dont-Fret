class Scale {
    constructor(notes) {
        this.notes = notes;
        this.size = notes.length;
        this.scale_map = {};
        this.scale_map_create();
    }

    // Create a dictionary that relates note name to location in 2D notes array
    scale_map_create() { 
        var current_note;
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.notes[i].length; j++) {
                current_note = this.notes[i][j];
                this.scale_map[current_note] = [i, j];
            }
        }
    }
    getCoordinates(note) {
        return this.scale_map[note];
    }
    move_up_scale(current_note, amount) {
        return this.notes[(this.getCoordinates(current_note)[0] + amount) % this.size];
    }
    move_down_scale(current_note, amount) {
        return this.notes[(this.getCoordinates(current_note)[0] - amount) % this.size];
    }
}
class Chromatic extends Scale {
    constructor() {
        super(
        [
            ['C', 'B#', 'Dbb'],
            ['C#', 'Db', 'B##'],
            ['D', 'C##', 'Ebb'],
            ['D#', 'Eb', 'Fbb'],
            ['E', 'Fb', 'D##'],
            ['F', 'E#', 'Gbb'],
            ['F#', 'Gb', 'E##'],
            ['G', 'F##', 'Abb'],
            ['G#', 'Ab'],
            ['A', 'G##', 'Bbb'],
            ['A#', 'Bb', 'Cbb'],
            ['B', 'Cb', 'A##']
        ]
        );
    }
}


class Instrument {
    constructor(type, tuning_of_runs) {
        this.type = type;
        this.tuning_of_runs = tuning_of_runs;
        this.steps_in_run = 14;
        this.num_of_runs = tuning_of_runs.length;
        this.scale = new Chromatic();
        this.note_indexes = {};
        this.note_indexs_skeleton();
        this.note_indexs_fill();
    }

    note_indexs_skeleton() {
        var current_note;
        for (var i = 0; i < this.scale.size; i++) {
            for (var j = 0; j < this.scale.notes[i].length; j++) {
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
            current_notes = this.scale.notes[this.scale.getCoordinates(current_note)[0]];

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


class Display_Guitar {
    constructor() {
        this.instrument = new Guitar(['E', 'B', 'G', 'D', 'A', 'E']);
        this.display_notes = [];
    }

    // Insert HTML elements for user to select notes
    create_user_selection() {
        var element;
        var id_string;
        
        for (var i = 0; i < this.instrument.scale.size; i++) {
            id_string = 'notes[' + i + ']';
            
            element = document.createElement('div');
            element.id = 'notes[' + i + ']';
            document.getElementById('note_selection').appendChild(element);

            for (var j = 0; j < this.instrument.scale.notes[i].length; j++) {
                // Create note radio buttons
                element = document.createElement('input');
                element.type = 'radio';
                element.id = '' + this.instrument.scale.notes[i][j];
                element.name = i;
                document.getElementById(id_string).appendChild(element);

                // Create note label
                element = document.createElement('label')
                element.innerHTML = '' + this.instrument.scale.notes[i][j];
                document.getElementById(id_string).appendChild(element);
            }

            // Create none radio button
            element = document.createElement('input');
            element.type = 'radio';
            element.id = 'None';
            element.name = i;
            element.checked = true;
            document.getElementById(id_string).appendChild(element);

            // Create none label
            element = document.createElement('label')
            element.innerHTML = 'None';
            document.getElementById(id_string).appendChild(element);

            // Create line breaks
            element = document.createElement('br');
            document.getElementById(id_string).appendChild(element);
            document.getElementById(id_string).appendChild(element);
        }
        
    }
    change_display_notes(selected_notes) {
        this.display_notes = selected_notes;
    }
    get_selected_notes() {
        var current_note;
        var ret_array = [];
        for (var i = 0; i < this.instrument.scale.size; i++) {
            for (var j = 0; j < this.instrument.scale.notes[i].length; j++) {
                current_note = this.instrument.scale.notes[i][j];
                if (document.getElementById(current_note).checked) {
                    ret_array.push(current_note);
                }
            }
        }
        return ret_array;
    }
    show_board() {
        this.change_display_notes(this.get_selected_notes());
        if(this.shown == true) {
            this.clear_board();
        }
        this.shown = true;
        
        var div;
        var img;
        var id_string;
        for (var i = 0; i < this.instrument.num_of_runs; i++) {
            div = document.createElement('div');
            div.id = 'run' + i;
            div.className = 'run';
            document.getElementById('runs').appendChild(div);
    
            for (var j = 0; j < this.instrument.steps_in_run; j++) {
                id_string = '' + i + ',' + j;

                div = document.createElement('div');
                div.id = id_string;
                div.className = 'step';
                document.getElementById('run' + i).appendChild(div);
                
                img = document.createElement('img');
                if (j == 0) {
                    img.src = './res/open_fret.svg';

                } else if (j % 12 == 1 || j % 12 == 11) {
                    img.src = './res/fret.svg';

                } else if ((j % 12 == 0) && (i == 1 || i == 3)) {
                    img.src = './res/fret_top.svg';

                } else if ((j % 12 == 0) && (i == 2 || i == 4)) {
                    img.src = './res/fret_bottom.svg';

                } else if ((j % 2 != 0) && (i == 2)) {
                    img.src = './res/fret_top.svg';

                } else if ((j % 2 != 0) && (i == 3)) {
                    img.src = './res/fret_bottom.svg';

                } else {

                    img.src = './res/fret.svg';
                }
                document.getElementById(id_string).appendChild(img);
                
                div = document.createElement('div');
                div.id = 't' + id_string;
                div.className = 'fret';
                document.getElementById(id_string).appendChild(div);
            }
        }
        this.show_board_util();
    }
    show_board_util() {
        var to_fill;
        var id_string;
    
        for (var i = 0; i < this.display_notes.length; i++) {
            to_fill = this.instrument.note_indexes[this.display_notes[i]];
    
            for (var j = 0; j < to_fill.length; j++) {
                id_string = '' + to_fill[j][0] + ',' + to_fill[j][1];
                document.getElementById('t' + id_string).innerHTML = this.display_notes[i];
            }
        }
    }
    clear_board() {
        var id_string;

        for (var i = 0; i < this.instrument.num_of_runs; i++) {
            id_string = 'run' + i;
            document.getElementById(id_string).remove();
        }
    }
}


// Driver code
var disp = new Display_Guitar();
function start() {
    disp.create_user_selection();
    disp.show_board();
}