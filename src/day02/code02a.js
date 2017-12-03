const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testa.txt';
// const dil = ' ';
const inputFile = './input.txt';
const dil = '\t';

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    const rowList = _.split(input, '\n');
    const checkSum = rowList.reduce((total, row) => {
        let newList = _.split(row, dil).map(_.parseInt);

        let max = _.max(row);
        let min = _.min(row);

        return total + max - min;
    }, 0);

    console.log('checkSum', checkSum);
}

calc();