const readline = require('linebyline');

const States = {
    SeaSize: 0,
    StartPosition: 1,
    Instructions: 2
};

console.log(States);

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
                    direction: data[2]
                };

                state = States.Instructions;
                break;
            case States.Instructions:
                break;
        }
    });
};


let file = 2;

while (process.argv[file]) {
    processFile(process.argv[file]);
    file++;
};
