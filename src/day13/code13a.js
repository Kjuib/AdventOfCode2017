const _ = require('lodash');
const fs = require('fs');

const inputFile = './testa.txt';
// const inputFile = './input.txt';

function process(road) {
    _.forEach(road, (cam) => {
        if (cam.cam) {
            if (cam.current === cam.size || cam.current === 1) {
                cam.direction *= -1;
            }

            cam.current += cam.direction
        }
    });
}

function calc() {
    const input = fs.readFileSync(inputFile, 'utf8');
    let rowList = _.split(input, '\n');
    rowList.pop();

    let rawData = _.map(rowList, (row) => {
        let data = row.split(': ');
        return {
            key: _.parseInt(data[0]),
            size: _.parseInt(data[1]),
            cam: true,
            current: 1,
            direction: -1
        }
    });
    let max = _.maxBy(rawData, 'key').key;

    let road = [];
    _.times(max + 1, (i) => {
        let cam = _.find(rawData, { key: i });
        if (!cam) {
            cam = {
                key: i,
                cam: false
            }
        }
        road[i] = cam;
    });

    let damage = 0;
    _.forEach(road, (cam) => {
        if (cam.cam && cam.current === 1) {
            console.log('CAUGHT!');
            damage += (cam.key * cam.size);
        }
        process(road);
    });

    console.log('damage', damage);
}
calc();
