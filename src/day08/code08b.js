const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testa.txt';
const inputFile = './input.txt';

const checks = {
    '>': _.gt,
    '<': _.lt,
    '>=': _.gte,
    '<=': _.lte,
    '==': _.eq,
    '!=': _.negate(_.eq)
};

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    let rowList = _.split(input, '\n');
    rowList.pop();

    let max = 0;
    let reg = {};
    _.forEach(rowList, (row) => {
        let data = row.split(' ');
        if (checks[data[5]](reg[data[4]] || 0, _.parseInt(data[6]))) {
            if (data[1] === 'inc') {
                reg[data[0]] = (reg[data[0]] || 0) + _.parseInt(data[2])
            } else {
                reg[data[0]] = (reg[data[0]] || 0) - _.parseInt(data[2])
            }
        }

        let calcMax = _.max(_.values(reg));
        if (max < calcMax) {
            max = calcMax;
        }
    });

    console.log('max', max);
}
calc();
