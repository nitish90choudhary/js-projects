const {
    World,
    Render,
    Engine,
    Runner,
    Bodies,
    Body,
    Events
} = Matter;
const width = window.innerWidth;
const height = window.innerHeight;
const rows = 10;
const cols = 13;
const unitLengthX = width / cols;
const unitLengthY = height / rows;
const engine = Engine.create();
engine.world.gravity.y = 0;
const {
    world
} = engine;

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }

});

Render.run(render);
Runner.run(Runner.create(), engine);


//walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 2, {
        isStatic: true
    }), Bodies.rectangle(width / 2, height, width, 2, {
        isStatic: true
    }), Bodies.rectangle(0, height / 2, 2, height, {
        isStatic: true
    }), Bodies.rectangle(width, height / 2, 2, height, {
        isStatic: true
    })
];

World.add(world, walls);

//Maze generation logic
const shuffle = (arr) => {
    let counter = arr.length;
    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);

        counter--;
        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr;
};
const grid = Array(rows).fill(null).map(() => Array(cols).fill(false));
const vertical = Array(rows).fill(null).map(() => Array(cols - 1).fill(false));
const horizontal = Array(rows - 1).fill(null).map(() => Array(cols).fill(false));

// console.log('GRID', grid)
// console.log('Vertical', vertical)
// console.log('Horizontal', horizontal)

const startRow = Math.floor(Math.random() * rows);
const startCol = Math.floor(Math.random() * cols);

console.log(startRow, startCol);

const stepThroughCells = (row, col) => {
    // If [row,col] cell is visited, return
    if (grid[row][col])
        return;

    //Mark this cell visited
    grid[row][col] = true;

    //Assemble randomly ordered list of neighbour and check if the neighbout is out of bound
    const neighbours = [];
    if (row - 1 >= 0)
        neighbours.push([row - 1, col, 'up']) //above
    if (row + 1 <= rows - 1)
        neighbours.push([row + 1, col, 'down']) //below
    if (col - 1 >= 0)
        neighbours.push([row, col - 1, 'left']) //left
    if (col + 1 <= cols - 1)
        neighbours.push([row, col + 1, 'right']) //right

    console.log('Shuffle :', shuffle(neighbours));

    //For Each neighbour
    for (const neighbour of neighbours) {
        const [nextRow, nextCol, direction] = neighbour;
        //If neighbour is already visited, go to next neighbour
        if (grid[nextRow][nextCol])
            continue;
        // remove wall from vertical or horizontals
        //left or right =horizontals
        if (direction === 'left')
            vertical[row][col - 1] = true;
        if (direction === 'right')
            vertical[row][col] = true;

        //up or down verticals
        if (direction === 'up')
            horizontal[row - 1][col] = true;
        if (direction === 'down')
            horizontal[row][col] = true;

        //Visit next cell   
        stepThroughCells(nextRow, nextCol);
    }


};

stepThroughCells(startRow, startCol);
console.log('Final Grid:', grid)
console.log('Vertical', vertical)
console.log('Horizontal', horizontal)

//Drawing on canvas

horizontal.forEach((row, rowIndex) => {
    row.forEach((open, colIndex) => {
        if (open)
            return;

        const wall = Bodies.rectangle(
            colIndex * unitLengthX + unitLengthX / 2,
            rowIndex * unitLengthY + unitLengthY,
            unitLengthX,
            10, {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            });
        World.add(world, wall);

    });
});

vertical.forEach((row, rowIndex) => {
    row.forEach((open, colIndex) => {
        if (open)
            return;

        const wall = Bodies.rectangle(
            colIndex * unitLengthX + unitLengthX,
            rowIndex * unitLengthY + unitLengthY / 2,
            10,
            unitLengthY, {
                label: 'wall',
                isStatic: true,
                render: {
                    fillStyle: 'red'
                }
            });
        World.add(world, wall);

    });
});

//Goal
const goal = Bodies.rectangle(
    width - unitLengthX / 2,
    height - unitLengthY / 2,
    unitLengthX * 0.7,
    unitLengthY * 0.7, {
        isStatic: true,
        label: 'goal',
        render: {
            fillStyle: 'green'
        }
    });
World.add(world, goal);

//Ball

const ball = Bodies.circle(
    unitLengthX / 2,
    unitLengthY / 2,
    Math.min(unitLengthX, unitLengthY) * 0.35, {
        label: 'ball'
    });
World.add(world, ball);

//event listeeners

document.addEventListener('keydown', event => {
    const {
        x,
        y
    } = ball.velocity;

    if (event.keyCode === 38) {
        //console.log('up')
        Body.setVelocity(ball, {
            x,
            y: y - 5
        });
    }

    if (event.keyCode === 40) {
        //console.log('down')
        Body.setVelocity(ball, {
            x,
            y: y + 5
        });
    }
    if (event.keyCode === 37) {
        // console.log('left')
        Body.setVelocity(ball, {
            x: x - 5,
            y
        });
    }
    if (event.keyCode === 39) {
        //console.log('right')
        Body.setVelocity(ball, {
            x: x + 5,
            y
        });
    }
});

//Wins
Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(collision => {
        const labels = ['goal', 'ball'];
        if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y = 1;
            world.bodies.forEach(body => {
                if (body.label === 'wall') {
                    Body.setStatic(body, false);
                }
            });
        }
    })
});