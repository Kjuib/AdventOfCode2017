const _ = require('lodash');

function getValue(map, x, y) {
    let value = 0;
    value += _.get(map, `[${y - 1}][${x - 1}]`, 0);
    value += _.get(map, `[${y}][${x - 1}]`, 0);
    value += _.get(map, `[${y + 1}][${x - 1}]`, 0);
    value += _.get(map, `[${y - 1}][${x}]`, 0);
    value += _.get(map, `[${y + 1}][${x}]`, 0);
    value += _.get(map, `[${y - 1}][${x + 1}]`, 0);
    value += _.get(map, `[${y}][${x + 1}]`, 0);
    value += _.get(map, `[${y + 1}][${x + 1}]`, 0);

    console.log('value', value);


    return value;
}

function draw(input) {
    let map = [[1]];

    let direction = 'r';
    let currentX = 1;
    let currentY = 0;

    let newValue = 0;
    for (let i = 2; i <= input; i++) {
        if (newValue > input) {
            i = input;
            console.log('Final Answer', newValue);
        }

        switch(direction) {
            case 'r': {
                newValue = getValue(map, currentX, currentY);
                _.set(map, `[${currentY}][${currentX}]`, newValue);

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

                newValue = getValue(map, currentX, currentY);
                _.set(map, `[${currentY}][${currentX}]`, newValue);

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
                        row.unshift(null);
                    });
                    currentX = 0;
                    direction = 'd';
                }

                newValue = getValue(map, currentX, currentY);
                _.set(map, `[${currentY}][${currentX}]`, newValue);

                if (direction !== 'd') {
                    currentX--;
                } else {
                    currentY++;
                }
                break;
            }
            case 'd': {
                newValue = getValue(map, currentX, currentY);
                _.set(map, `[${currentY}][${currentX}]`, newValue);

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

draw(312051);
