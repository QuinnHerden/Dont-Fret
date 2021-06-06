var fretboard = {
    constructor(name_of_tuning, string_tunings) {
        this.name_of_tuning = name_of_tuning;
        this.string_tunings = ['E', 'A', 'D', 'G', 'B', 'E'];
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
        get string_tunings() {
            return this.string_tunings;
        }
    }

}