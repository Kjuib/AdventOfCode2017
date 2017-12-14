const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testa.txt';
const inputFile = './input.txt';

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    let rowList = _.split(input, '\n');
    rowList.pop();

    let calc2 = (input) => {
        let delay = 0;
        let layers = input.map(str => str.split(': '))
            .map(([depth, range]) => ({depth: +depth, range: (+range * 2) - 2}));
        while (!layers.every(layer => (delay + layer.depth) % layer.range)) {
            delay++;
        }
        return delay
    };
    console.log(calc2(rowList));
}

calc();
