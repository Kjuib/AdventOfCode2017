const _ = require('lodash');

let input = '10\t3\t15\t10\t5\t15\t5\t15\t9\t2\t5\t8\t5\t2\t3\t6';
// let input = '0\t2\t7\t0';

function calc(input) {
    let seenList = [];
    let count = 0;
    let list = _.split(input, '\t');
    list = _.map(list, _.parseInt);

    console.log('list', list);
    while (!_.includes(seenList, _.join(list, '|'))) {
        seenList.push(_.join(list, '|'));
        let max = _.max(list);
        let start = _.indexOf(list, max);
        list[start] = 0;

        for (let i = max; i > 0; i--) {
            start++;
            if (start >= list.length) {
                start = 0;
            }
            list[start]++;
        }

        count++;
        console.log('list', list);
    }

    console.log('count', count);
}

calc(input);
