var curChord;

var polySynth = new Tone.PolySynth(4, 	Tone.MonoSynth).toMaster();


polySynth.set({
    oscillator: {
      type: 'sine2'
    },
    envelope: {
      attack: 1,
      decay: 1,
      release: 0.1
    }
});
var comp = new Tone.Compressor(-300,100);
polySynth.chain(comp);


const chords = {
    major: {
        root: [0, 4, 7],
        inv1: [-8,-5, 0],
        inv2: [-5, 0, 4],
        
    },
    minor: {
        root: [0, 3, 7],
        inv1: [-9,-5, 0],
        inv2: [-5, 0, 3]
    },
    diminished: {
        root: [0, 3, 6],
        inv1: [-9, -6, 0],
        inv2: [-6, 0, 3]
    },
    augmented: {
        root: [0, 4, 8],
    },
    
    'suspended 2nd': {
        root: [0, 2, 7]
    },
    'suspended 4th': {
        root: [0, 5, 7]
    },
    'major 6th': {
        root: [0, 4, 7, 9],
        inv1: [-8, -5, -3, 0],
        inv2: [-5, -3, 0, 4],
        inv3: [-3, 0, 4, 7]
    },
    'minor 6th': {
        root: [0, 3, 7, 9],
        inv1: [-9, -5, -3, 0],
        inv2: [-5, -3, 0, 3],
        inv3: [-3, 0, 3, 7]
        
    },
    'dominant 7th': {
        root: [0, 4, 7, 10],
        inv1: [-8, -5, -2, 0],
        inv2: [-5, -2, 0, 4],
        inv3: [-2, 0, 4, 7]
    },
    'major 7th': {
        root: [0, 4, 7, 11],
        inv1: [-8, -5, -1, 0],
        inv2: [-5, -1, 0, 4],
        inv3: [-1, 0, 4, 7]
    },
    'minor 7th': {
        root: [0, 3, 7, 10],
        inv1: [-9, -5, -2, 0],
        inv2: [-5, -2, 0, 3],
        inv3: [-2, 0, 3, 7]
    },
    'half diminished 7th': {
        root: [0, 3, 6, 10],
        inv1: [-9, -6, -2, 0],
        inv2: [-6, -2, 0, 3],
        inv3: [-2, 0, 3, 6]
    },
    'diminished 7th': {
        root: [0, 3, 6, 9],
        inv1: [-9, -6, -3, 0],
        inv2: [-6, -3, 0, 3],
        inv3: [-3, 0, 3, 6]
    },
    'minor major 7th': {
        root: [0, 3, 7, 11],
        inv1: [-9,-5, -1, 0],
        inv2: [-5, -1, 0, 3],
        inv3: [-1, 0, 3, 7]
    },
    'augmented 7th': {
        root: [0, 4, 8, 10],
        inv1: [-8, -4, -2, 0],
        inv2: [-4, -2, 0, 4],
        inv3: [-2, 0, 4, 8]
    },
    'augmented major 7th': {
        root: [0, 4, 8, 11],
        inv1: [-8, -4, -1, 0],
        inv2: [-4, -1, 0, 4],
        inv3: [-1, 0, 4, 8]
    }
}



function randomProperty (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
}


function randomMask() {
    return randomProperty(randomProperty(chords));
}

function maskToChord(base, mask) {
    var chord = [];
    for (var i = 0; i < mask.length; i++) {
        chord.push(Tone.Frequency(base + mask[i], "midi"));
    }
    return chord;
}

function randomChord() {
    var base = 47 + Math.floor(Math.random() * 30);
    var mask = randomMask();
    return maskToChord(base, mask);
}


function playChord(chord) {
//    polySynth.triggerRelease();
//    polySynth.triggerAttackRelease(
//        chord, "1n");
    
    piano.triggerRelease();
    piano.triggerAttackRelease(
        chord, "1n");
}

function replay() {
        polySynth.triggerAttackRelease(
        curChord, "1n");
}



function chordByOrder (x, inv) {
    var type = Object.keys(chords)[x];
    var voicing = Object.keys(chords[type])[inv];
    return maskToChord(50, chords[type][voicing]);
}

function chordByName (name, inv) {
   
    var voicing = Object.keys(chords[name])[inv];
    return maskToChord(45, chords[name][Object.keys(chords[name])[inv]]);
}

function getChordName(i) {
    return Object.keys(chords)[i];
}
 
function demand() {
    playChord(chordByOrder($("#type").val(), $("#inv").val()));
};


var piano = SampleLibrary.load({
      instruments: "piano",
      ext: ".wav",
      baseUrl: "https://raw.githubusercontent.com/spitlord/tonejs-instruments/master/samples/",
      onload: function () {
      }
  });





