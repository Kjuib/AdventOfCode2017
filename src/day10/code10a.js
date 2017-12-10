const _ = require('lodash');

// const input = '3,4,1,5';
// const length = 5;
const input = '106,118,236,1,130,0,235,254,59,205,2,87,129,25,255,118';
const length = 256;

function calc(line, length) {
    let sizes = line.split(',');
    sizes = _.map(sizes, _.parseInt);

    let list = new Array(length);
    list = _.keys(list);
    list = _.map(list, _.parseInt);

    let position = 0;
    let skip = 0;

    console.log('list', list.join(','));

    _.forEach(sizes, (size) => {
        _.times(position, () => {
            list.push(list.shift());
        });

        let subList = _.take(list, size);
        subList = _.reverse(subList);

        list = _.concat(subList, _.slice(list, size));

        _.times(position, () => {
            list.unshift(list.pop());
        });

        position += size + skip;
        if (position >= length) {
            position -= length;
        }
        skip++;
    });

    console.log('Score', list[0] * list[1]);
}

calc(input, length);
