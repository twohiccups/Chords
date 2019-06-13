const xIncr = 55;
const yIncr = 70;
const width = 40;
const height = 40;
const offsetX = 10;
const offsetY = 200;
const textOffsetY = 180;

const onFill = 'rgb(100,160,160)'

function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) 
        el.setAttribute(k, attrs[k]);
    return el;
}

function makeSVGtext(str, attrs) {
    var text = makeSVG('text', attrs);
    var textNode = document.createTextNode(str);
    text.appendChild(textNode);
    return text;
    
} 



function Chord(mask,square) {
    this.mask = mask;
    this.square = square;
}


function createCanvas() {
    for (var i = 0; i < Object.keys(chords).length; i++) {
        var rotate = 'rotate(-60,' + (i * xIncr + offsetX + 30) + ', ' + textOffsetY + ')';
        var attrs = {
                x: i * xIncr + offsetX + 30,
                y: textOffsetY,
                class: "heavy",
                'font-size': 20,
                'font-weight': 800,
                transform:  rotate
        };

        var text = makeSVGtext(getChordName(i), attrs);
        $("#canvas").append(text);

        for (var j = 0; j < Object.keys(chords[Object.keys(chords)[i]]).length; j++) {
            attrs = {
                x: i * xIncr + offsetX,
                y: j * yIncr + offsetY,
                width: width,
                height: height,
                fill: onFill,
                i: i,
                j: j
            };
            
            var square = makeSVG('rect', attrs);
            $("#canvas").append(square);
        
            square.addEventListener("click", function() {
                playChord(chordByOrder(this.getAttribute('i'), this.getAttribute('j')));
            }); 
            square.isOn = false;
            
            //
            attrs = {
                x: i * xIncr + width + offsetX - 10,
                y: j * yIncr + height + offsetY - 10,
                width: 10,
                height: 10,
                fill: 'darkgrey',
            };
            
            var vol = makeSVG('rect', attrs);
            $("#canvas").append(vol);
            
            vol.square = square;
            
            vol.addEventListener("click", function() {
                console.log(this.square);
                if (this.square.isOn) {
                    this.square.isOn = false;
                    this.setAttribute('fill','darkgrey');
                }
                else {
                    this.square.isOn = true;
                    this.setAttribute('fill','lightgrey');   
                }                
            });   
            
        }
    }
    
}


createCanvas();




