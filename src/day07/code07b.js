const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testa.txt';
// const bottom = 'tknk';
const inputFile = './input.txt';
const bottom = 'uownj';

function calcWeight(current, list) {
    let weight = current.number;
    if (current.kids) {
        let weight2 = -1;
        let weightKid = null;
        _.forEach(current.kids, (kid) => {
            let kidWeight = calcWeight(list[kid], list);
            if (weight2 > 0 && kidWeight !== weight2) {
                console.log('FOUND!!!');
                console.log('list[kid]', list[kid]);
                console.log('weightKid', weightKid);
                console.log('kidWeight', kidWeight);
                console.log('weight2', weight2);
                console.log(weightKid.number + kidWeight - weight2);
            }
            weight2 = kidWeight;
            weightKid = list[kid];
            weight += kidWeight;
        });
    }

    return weight;
}

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    let rowList = _.split(input, '\n');
    rowList.pop();
    let main = {};
    _.forEach(rowList, (current) => {
        let mainSplit = current.split(' -> ');
        let nameSplit = mainSplit[0].split(' ');
        let item = {
            name: nameSplit[0],
            number: _.parseInt(nameSplit[1].replace(/[()]/g, ''))
        };
        if (mainSplit.length > 1) {
            item.kids = mainSplit[1].split(', ');
        }
        main[item.name] = item;
    });

    calcWeight(main[bottom], main);
}
calc();
