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

    let mainLength = _.size(main);
    let groupCount = 0;
    for(let i = 0; i < mainLength; i++) {
        let parent = main[i];
        if (parent) {
            groupCount++;
            populateKids(parent, main);
            main = _.pickBy(main, _.negate(_.iteratee('doneKids')));
        }
    }

    console.log('groupCount', groupCount);
}
calc();
