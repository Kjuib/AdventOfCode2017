const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testb.txt';
// const dil = ' ';
const inputFile = './input.txt';
const dil = '\t';

function findRowValue(row) {
    row = row.sort((a, b) => a - b);
    for (let i = row.length - 1; i >= 0; i--) {
        let bigNum = row[i];
        for (let j = i - 1; j >= 0; j--) {
            let smallNum = row[j];

            let d = bigNum / smallNum;
            if (_.isInteger(d)) {
                return d;
            }

        }
    }
    console.log('NONE FOUND');
}

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    const rowList = _.split(input, '\n');
    const checkSum = rowList.reduce((total, row) => {
        let newList = _.split(row, dil).map(_.parseInt);
        let rowValue = findRowValue(newList);
        return total + rowValue;
    }, 0);

    console.log('checkSum', checkSum);
}

calc();