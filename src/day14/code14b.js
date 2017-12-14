const _ = require('lodash');
const fs = require('fs');

// const inputFile = './testa.txt';
const inputFile = './input.txt';

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

function move(road, wait) {
    _.times(wait, () => {
        process(road);
    });

    for (let i = 0; i < road.length; i++) {
        let cam = road[i];
        if (cam.cam && cam.current === 1) {
            // console.log('DEAD ON', cam.key, wait);
            return true;
        }
        process(road);
    }

    return false;
}

function getNext(current) {
    if ((current % 4 === 0)
        || ((current - 10) % 12 === 0)  // Only for live
    ) {
        return getNext(current + 2);
    }

    return current;
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
        let cam = _.find(rawData, {key: i});
        if (!cam) {
            cam = {
                key: i,
                cam: false
            }
        }
        road[i] = cam;
    });

    let count = 1000000;
    let tempRoad = _.cloneDeep(road);
    do {
        tempRoad = _.cloneDeep(road);
        count = getNext(count + 2);
    } while (move(tempRoad, count));
    console.log('done', count);
}

calc();
