const readline = require('linebyline');
const Ship = require('./ship');
const { States, Directions } = require('./constants');


processFile = (filename) => {
    let state = States.SeaSize;
    let maxX = 0, maxY = 0;
    let warnings = [];
    let ship;

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
                ship = new Ship(parseInt(data[0]), parseInt(data[1]), Directions[data[2]]);


                state = States.Instructions;
                break;
            case States.Instructions:
                for (let i = 0; i < line.length; i++) {
                    ship.move(line.charAt(i));
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
