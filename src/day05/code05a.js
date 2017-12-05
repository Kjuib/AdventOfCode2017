const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testa.txt';
const inputFile = './input.txt';

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    let rowList = _.split(input, '\n');
    rowList.pop();
    rowList = _.map(rowList, _.parseInt);

    let current = 0;
    let count = 0;
    while (current > -1) {
        count++;
        current += rowList[current]++;
    }

    console.log('count', count - 1);
}
calc();
