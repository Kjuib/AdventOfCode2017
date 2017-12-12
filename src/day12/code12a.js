const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testa.txt';
const inputFile = './input.txt';

function populateKids(parent, motherList) {
    if (parent.doneKids) {
        return;
    }

    parent.doneKids = true;

    parent.kids = _.map(parent.kids, (kidName) => {
        if (parent.name !== kidName) {
            let kid = motherList[kidName];
            populateKids(kid, motherList);
            return kid;
        }
    });
}

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    let rowList = _.split(input, '\n');
    rowList.pop();

    let main = {};
    _.forEach(rowList, (row) => {
        let raw = row.split('<->');
        let data = {
            name: _.parseInt(raw[0]),
            kids: _.map(raw[1].split(', '), _.parseInt)
        };
        main[data.name] = data;
    });

    let zero = main[0];

    populateKids(zero, main);

    let count = _.countBy(main, 'doneKids');
    console.log('count', count);
}
calc();
