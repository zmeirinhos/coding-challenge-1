const { States, Directions } = require('./constants');

const moveForward = [
    (x, y) => { return { x: x,   y: y+1 }; }, // North
    (x, y) => { return { x: x+1, y: y };   }, // East
    (x, y) => { return { x: x,   y: y-1 }; }, // South
    (x, y) => { return { x: x-1, y: y };   }  // West
];

class Ship {

    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        console.log({x, y});
        this.direction = direction;
    }

    seaInfo(maxX, maxY, warnings) {

    }

    move(instruction) {
        switch (instruction) {
            case "R":
                this.direction = (this.direction + 1) % 4;
                break;
            case "L":
                this.direction = (this.direction - 1) % 4;
                break;
            case "F":
                let { direction } = this;
                let { x, y } = moveForward[direction](this.x, this.y);

                break;
        }
    };
}

module.exports = Ship;