const seaInfo = require('./sea-info');


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
        this.direction = direction;
    }

    /*
     * Returns true if the ship is safe; false if it has been lost
     */
    move(instruction) {
        switch (instruction) {
            case "R":
                this.direction = (this.direction + 1 + 4) % 4;
                break;
            case "L":
                this.direction = (this.direction - 1 + 4) % 4;
                break;
            case "F":
                if (seaInfo.warnings[this.x + ' ' + this.y] === this.direction) {
                    // That way lies the abyss, ignore!
                    return true;
                }

                let { x, y } = moveForward[this.direction](this.x, this.y);

                if (x < 0 || x > seaInfo.maxX || y < 0 || y > seaInfo.maxY) {
                    seaInfo.warnings[this.x + ' ' + this.y] = this.direction;
                    return false;
                } else {
                    this.x = x;
                    this.y = y;
                }
                break;
        }
        return true;
    };
}

module.exports = Ship;