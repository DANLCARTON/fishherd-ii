// - - - - - - - VARIABLES - - - - - - -

const WINDOW = {"width" : $("body").prop("clientWidth"), "height" : $(window).height()}
const SCREEN_COLOR = {"r": Math.random()*255,"g": Math.random()*255,"b": Math.random()*255}
const NBFISH = 20;
let SPEED = 2;
let TAIL_SIZE = 5;
let SEPARATION_RADIUS = 100;
let SEPARATION_STRENGTH = 1.5;
let MOUSE_FISH_SEPARATION_STRENGTH = 2;
let ALIGNMENT_RADIUS = 200;
let ALIGNMENT_STRENGTH = 1;
let TURN_FACTOR = 1;

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
        ellipse(this.position.x, this.position.y, 30, 30);
    }
    move() {
        let fishX = this.position.x + Math.cos(this.angle)*SPEED;
        let fishY = this.position.y + Math.sin(this.angle)*SPEED;
        this.position.x = fishX;
        this.position.y = fishY;
    }
    turn(dir) {
        let angle = this.angle + dir*TURN_FACTOR;
        this.angle = angle;
    }
    drawParams() {
        fill(0, 0);
        stroke(100, 0, 0)
        ellipse(this.position.x, this.position.y, SEPARATION_RADIUS, SEPARATION_RADIUS);
        stroke(0, 100, 0)
        ellipse(this.position.x, this.position.y, ALIGNMENT_RADIUS, ALIGNMENT_RADIUS);
        noStroke();
    }
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

// - - - - - - - FISH RULES - - - - - - -

function distance(fish, other) {
    let distX = fish.position.x - other.position.x;
    let distY = fish.position.y - other.position.y;
    let dist = Math.sqrt(distX*distX + distY*distY);
    return dist; 
}

function alignment(fish, other) {
    let dist = distance(fish, other);
    let dir = fish.angle - other.angle;
    if (SEPARATION_RADIUS < dist && dist < ALIGNMENT_RADIUS) other.turn((2/dist)*dir*ALIGNMENT_STRENGTH)
}

function separation(fish, other) {
    let dist = distance(fish, other);
    let dir = fish.angle - other.angle;
    if (dist < SEPARATION_RADIUS) {
        if (fish.id == -1) other.turn(-(1/(20*dist))*dir*MOUSE_FISH_SEPARATION_STRENGTH)
        else other.turn(-(1/(20*dist))*dir*SEPARATION_STRENGTH)
    }
}

// - - - - - - - FISH SETUP - - - - - - -

let fishherd = createHerd(NBFISH);
let mouseFish = new Fish(100, 100, 0, 0, -1)

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
        //fish.drawParams();
        fish.move();
        for (let other of fishherd) {
            if (fish.id != other.id) {
                alignment(fish, other);
                separation(fish, other);
            }
        }
    }
}