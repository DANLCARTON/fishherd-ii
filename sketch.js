// - - - - - - - VARIABLES - - - - - - -

const WINDOW = {"width" : $("body").prop("clientWidth"), "height" : $(window).height()}
const SCREEN_COLOR = {"r": Math.random()*255,"g": Math.random()*255,"b": Math.random()*255}
const NBFISH = 20;
let SPEED = 1;
let TAIL_SIZE = 5;

class Fish {
    constructor(x, y, angle, speed, id) {
        this.position = {"x":x, "y":y}
        this.angle = angle;
        this.speed = speed;
        this.id = id;
    }
    draw() {
        let fishColorR = colorValue(this.angle, 0)*255;
        let fishColorG = colorValue(this.angle, (2*Math.PI)/3)*255;
        let fishColorB = colorValue(this.angle, (4*Math.PI)/3)*255;
        fill(fishColorR, fishColorG, fishColorB);
        ellipse(this.position.x-15, this.position.y-15, 30, 30);
    }
    move() {
        let fishX = this.position.x + Math.cos(this.angle)*SPEED;
        let fishY = this.position.y + Math.sin(this.angle)*SPEED;
        this.position.x = fishX;
        this.position.y = fishY;
    }
}

function drawParams(fish) {
    ;
}

function getInTheCircle(angle) {
    if (angle < 0) while (angle < 0) angle += 2*Math.PI;
    else if (angle > 2*Math.PI) while (angle > 2*Math.PI) angle -= 2*Math.PI;
    return angle;
}

function colorValue(angle, param) {
    let value = angle+param;
    value = getInTheCircle(value);
    if (value > (2*Math.PI)/2) value = 2*Math.PI-value;
    return value/((2*Math.PI)/2)
}

function createHerd(nbFish) {
    let herd = [];
    for (let i = 0; i < nbFish; ++i) {
        herd.push(new Fish(Math.random()*WINDOW.width, Math.random()*WINDOW.height, Math.random()*2*Math.PI, SPEED, i))
    }
    return herd;
}

// - - - - - - - FISH SETUP - - - - - - -

let fishherd = createHerd(NBFISH);
let mouseFish = new Fish(100, 100, 0, 0)

// - - - - - - - P5 - - - - - - -

function setup() {
    createCanvas(WINDOW.width, WINDOW.height);
    noStroke();
    background(0)
}
function draw() {
    mouseFish.position.x = mouseX;
    mouseFish.position.y = mouseY;
    mouseFish.angle = Math.random()*2*Math.PI;
    //mouseFish.draw();

    fill(SCREEN_COLOR.r, SCREEN_COLOR.g, SCREEN_COLOR.b, TAIL_SIZE)
    rect(0, 0, WINDOW.width, WINDOW.height)

    for (let fish of fishherd) {
        fish.draw();
        fish.move();
        for (let otherFish of fishherd) {
            if (fish.id != otherFish.id) {

            }
        }
    }
}