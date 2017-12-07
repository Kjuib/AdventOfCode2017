const _ = require('lodash');
const fs = require('fs');

const inputFile = './testa.txt';
// const inputFile = './input.txt';

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

    let fullList = _.keys(main);
    let kidList = _.values(main).reduce((list, current) => {
        if (current.kids) {
            return _.concat(list, current.kids);
        }

        return list;
    }, []);

    let diff = _.difference(fullList, kidList);

    console.log('diff', diff);
}
calc();
