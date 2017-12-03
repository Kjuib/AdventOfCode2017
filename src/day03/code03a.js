const _ = require('lodash');

function draw(input) {
    let map = [[1]];

    let direction = 'r';
    let currentX = 1;
    let currentY = 0;


    for (let i = 2; i <= input; i++) {
        switch(direction) {
            case 'r': {
                _.set(map, `[${currentY}][${currentX}]`, i);

                currentX++;
                if (currentX > _.get(map, `[${currentY - 1}].length`, -1)) {
                    direction = 'u';
                    currentX--;
                    currentY--;
                }
                break;
            }
            case 'u': {
                if (currentY < 0) {
                    map.unshift([]);
                    currentY = 0;
                    direction = 'l';
                }

                _.set(map, `[${currentY}][${currentX}]`, i);

                if (direction !== 'l') {
                    currentY--;
                } else {
                    currentX--;
                }
                break;
            }
            case 'l': {
                if (currentX < 0) {
                    map.forEach((row) => {
                        row.unshift('');
                    });
                    currentX = 0;
                    direction = 'd';
                }

                _.set(map, `[${currentY}][${currentX}]`, i);

                if (direction !== 'd') {
                    currentX--;
                } else {
                    currentY++;
                }
                break;
            }
            case 'd': {
                _.set(map, `[${currentY}][${currentX}]`, i);

                currentY++;
                if (!_.get(map, `[${currentY - 1}][${currentX + 1}]`)) {
                    direction = 'r';
                    currentX++;
                    currentY--;
                }
                break;
            }
        }
    }

    map.forEach((row) => {
        console.log(row.join('\t'));
    });
}

draw(49);


function findClosestSquare(input) {
    for (let i = input; i > 1; i--) {
        let square = Math.sqrt(i);
        if (_.isInteger(square) && square % 2 === 1) {
            return square;
        }
    }
    return 1;
}

function findDistance(input, closeSquare) {
    let squared = Math.pow(closeSquare, 2);
    if (input === squared) {
        return closeSquare - 1;
    } else {
        let otherSquared = Math.pow(closeSquare + 2, 2);
        let totalSize = otherSquared - squared;
        let segmentSize = totalSize / 4;
        let position = input - squared;
        let mod = position % segmentSize;
        let halfSize = segmentSize / 2;

        console.log('totalSize', totalSize);
        console.log('segmentSize', segmentSize);
        console.log('position', position);
        console.log('mod', mod);

        // console.log(mod /);


        if (mod === 0) {
            return closeSquare + 1;
        } else if (mod <= halfSize) {
            return closeSquare + 1 - mod;
        } else {
            return closeSquare + 1 - (segmentSize - mod);
        }
    }
}

let input = 312051;
let closeSquare = findClosestSquare(input);
let distance = findDistance(input, closeSquare);

console.log('distance', distance);
