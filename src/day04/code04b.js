const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testb.txt';
const inputFile = './input.txt';

function isGood(line) {
    let lineList = line.split(' ');
    lineList = _.map(lineList, (word) => {
        return _.chain(word)
            .countBy()
            .map((value, key) => {
                return key + value;
            })
            .sort()
            .reduce((total, current) => {
                return total + current;
            }, '')
            .value()
        ;
    });

    let isValid = lineList.length === _.uniq(lineList).length;
    console.log(line, isValid);

    return isValid;
}

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    const rowList = _.split(input, '\n');
    rowList.pop();
    const total = _.sumBy(rowList, isGood);
    console.log('total', total);
}
calc();
