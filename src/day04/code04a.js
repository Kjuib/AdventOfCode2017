const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testa.txt';
const inputFile = './input.txt';

function isGood(line) {
    const lineList = line.split(' ');
    return lineList.length === _.uniq(lineList).length;
}

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    const rowList = _.split(input, '\n');
    rowList.pop();
    const total = _.sumBy(rowList, isGood);
    console.log('total', total);
}
calc();
