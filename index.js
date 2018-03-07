const readline = require('linebyline');

const States = {
    SeaSize: 0,
    StartPosition: 1,
    Instructions: 2
};

const Directions = {
    N: 0,
    E: 1,
    S: 2,
    W: 3
};
//const Directions = ['N', 'E', 'S', 'W'];

console.log(States);

moveShip = (ship, instruction) => {
    switch (instruction) {
        case "R":
            ship.direction = (ship.direction + 1) % 4;
            break;
        case "L":
            ship.direction = (ship.direction - 1) % 4;
            break;
        case "F":
            break;
    }
}
processFile = (filename) => {
    let state = States.SeaSize;
    let maxX = 0, maxY = 0;
    let warnings = [];
    let ship = {};

    const rl = readline(filename);
    rl.on('line', (line, lineCount, byteCount) => {
        line = line.trim();
        console.log(line);

        if (line === '') { // New ship data
            state = States.StartPosition;
            return;
        }
        let data = line.split(' ');
        switch (state) {
            case States.SeaSize:
                maxX = parseInt(data[0]);
                maxY = parseInt(data[1]);

                state = States.StartPosition;
                break;
            case States.StartPosition:
                ship = {
                    x: parseInt(data[0]),
                    y: parseInt(data[1]),
                    direction: Directions[data[2]]
                };

                state = States.Instructions;
                break;
            case States.Instructions:
                for (let i = 0; i < line.length; i++) {
                    moveShip(ship, line.charAt(i));
                }

                state = States.StartPosition;
                break;
        }
    });
};


let file = 2;

while (process.argv[file]) {
    processFile(process.argv[file]);
    file++;
};
