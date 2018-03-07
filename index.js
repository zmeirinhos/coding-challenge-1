const readline = require('linebyline');


processFile = (filename) => {
    const rl = readline(filename);
    let maxX = 0, maxY = 0;
    rl.on('line', (line, lineCount, byteCount) => {
        console.log(line);
    });
};


let file = 2;

while (process.argv[file]) {
    processFile(process.argv[file]);
    file++;
};
