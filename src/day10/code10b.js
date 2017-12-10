const _ = require('lodash');

// const input = 'AoC 2017';
// const length = 256;
const input = '106,118,236,1,130,0,235,254,59,205,2,87,129,25,255,118';
const length = 256;

function changeInput(line) {
    return _.reduce(line, (list, current) => {
        list.push(current.charCodeAt(0));
        return list;
    }, []).join(',');
}

function xor(items) {
    let mathStr = items.join('^');
    return eval(mathStr);
}

function hexify(num) {
    let str = num.toString(16);
    if (str.length < 2) {
        str = '0' + str;
    }
    return str;
}

function calc(line, length) {
    console.log('line', line);

    let sizes = line.split(',');
    sizes = _.map(sizes, _.parseInt);

    let list = new Array(length);
    list = _.keys(list);
    list = _.map(list, _.parseInt);

    let position = 0;
    let skip = 0;

    _.times(64, () => {
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
    });

    let chunks = _.chunk(list, 16);
    chunks = _.map(chunks, xor);
    chunks = _.map(chunks, hexify);

    console.log('HASH', chunks.join(''));
}

let newInput = changeInput(input);
newInput += ',17,31,73,47,23';
calc(newInput, length);
// SLOW AS BUTT
