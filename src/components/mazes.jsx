import React from 'react';

function p(x, y) {
    return { x, y };
}

function w(x1, y1, x2, y2) {
    return [p(x1, y1), p(x2, y2)];
}

function rnd(max) {
    return parseInt(Math.random() * max);
}

function rp() {
    return p(rnd(6), rnd(6));
}

function bound(x, min = 0, max = 5) {
    return Math.min(Math.max(x, min), max);
}

function intersects(w, x, y, z) {
    let a = w.x,
        b = w.y,
        c = x.x,
        d = x.y,
        p = y.x,
        q = y.y,
        r = z.x,
        s = z.y;
    let det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
}

function randomGoal(maze) {
    return maze.goals[rnd(maze.goals.length)];
}

const MAZES = [
    {
        circles: [p(0, 1), p(5, 2)],
        walls: [
            w(1, 1, 2, 1),
            w(4, 1, 6, 1),
            w(2, 2, 5, 2),
            w(1, 3, 2, 3),
            w(4, 3, 5, 3),
            w(1, 4, 5, 4),
            w(1, 5, 2, 5),
            w(4, 5, 5, 5),
            w(1, 1, 1, 4),
            w(2, 5, 2, 6),
            w(3, 0, 3, 3),
            w(3, 4, 3, 5),
            w(4, 5, 4, 6),
            w(5, 4, 5, 5),
            w(4, 3, 4, 4)
        ],
        goals: [p(1, 5), p(4, 4), p(1, 3), p(5, 0), p(4, 3), p(4, 5)]
    },
    {
        circles: [p(4, 1), p(1, 3)],
        walls: [
            w(0, 1, 1, 1),
            w(2, 1, 3, 1),
            w(3, 0, 3, 1),
            w(2, 1, 2, 2),
            w(1, 2, 2, 2),
            w(1, 2, 1, 3),
            w(1, 4, 1, 6),
            w(1, 4, 2, 4),
            w(2, 3, 2, 5),
            w(2, 3, 3, 3),
            w(3, 2, 3, 3),
            w(3, 2, 5, 2),
            w(4, 1, 4, 2),
            w(5, 1, 6, 1),
            w(5, 3, 5, 5),
            w(4, 3, 5, 3),
            w(4, 3, 4, 4),
            w(3, 4, 4, 4),
            w(3, 4, 3, 6),
            w(4, 5, 5, 5)
        ],
        goals: [p(0, 0), p(2, 0), p(0, 5), p(5, 0), p(4, 3), p(1, 4)]
    },
    {
        circles: [p(3, 3), p(5, 3)],
        walls: [
            w(0, 2, 1, 2),
            w(1, 1, 1, 2),
            w(1, 1, 2, 1),
            w(2, 1, 2, 4),
            w(1, 3, 1, 5),
            w(1, 5, 3, 5),
            w(3, 0, 3, 5),
            w(3, 2, 5, 2),
            w(4, 0, 4, 1),
            w(5, 1, 5, 5),
            w(4, 3, 4, 6)
        ],
        goals: [p(0, 1), p(1, 1), p(3, 0)]
    },
    {
        circles: [p(0, 0), p(0, 3)],
        walls: [
            w(1, 1, 1, 4),
            w(2, 0, 2, 2),
            w(2, 1, 5, 1),
            w(1, 3, 3, 3),
            w(3, 2, 3, 3),
            w(3, 2, 5, 2),
            w(5, 2, 5, 3),
            w(4, 3, 5, 3),
            w(1, 4, 5, 4),
            w(1, 5, 4, 5),
            w(5, 4, 5, 6),
            w(3, 5, 3, 6)
        ],
        goals: [p(2, 5), p(3, 5), p(2, 0), p(5, 5), p(1, 3), p(4, 2)]
    },
    {
        circles: [p(4, 2), p(3, 5)],
        walls: [
            w(0, 1, 4, 1),
            w(5, 1, 5, 2),
            w(1, 2, 3, 2),
            w(2, 2, 2, 3),
            w(2, 3, 4, 3),
            w(4, 2, 6, 2),
            w(4, 2, 4, 4),
            w(4, 4, 5, 4),
            w(5, 3, 5, 5),
            w(2, 5, 5, 5),
            w(1, 3, 1, 6),
            w(1, 4, 3, 4)
        ],
        goals: [p(0, 0), p(5, 1), p(2, 2), p(0, 5), p(4, 4), p(4, 3)]
    }
];

class Mazes extends React.Component {
    static getWallBetween(start, end) {
        const { x, y } = start;
        const xc = end.x - x;
        const yc = end.y - y;
        if (yc === -1) {
            return w(x, y, x + 1, y);
        } else if (yc === 1) {
            return w(x, y + 1, x + 1, y + 1);
        } else if (xc === -1) {
            return w(x, y, x, y + 1);
        } else if (xc === 1) {
            return w(x + 1, y, x + 1, y + 1);
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            currentMaze: 0,
            pos: rp(),
            displayWalls: false,
            badWalls: []
        };

        this.state.goal = randomGoal(MAZES[this.state.currentMaze]);

        this.onKeyPress = this.onKeyPress.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyPress, false);
        document
            .getElementById('mazeCanvas')
            .addEventListener('mousedown', this.onMouseDown, false);

        this.drawMaze();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyPress, false);
        document
            .getElementById('mazeCanvas')
            .removeEventListener('mousedown', this.onMouseDown, false);
    }

    onKeyPress(e) {
        const k = e.key.toLowerCase();

        if (k === ' ') {
            this.toggleWalls();
            return;
        }

        let xc = 0,
            yc = 0;

        if (k === 'w' || k === 'arrowup') {
            yc = -1;
        } else if (k === 'a' || k === 'arrowleft') {
            xc = -1;
        } else if (k === 's' || k === 'arrowdown') {
            yc = 1;
        } else if (k === 'd' || k === 'arrowright') {
            xc = 1;
        }

        this.move(xc, yc);
    }

    onMouseDown(e) {
        const c = document.getElementById('mazeCanvas');
        const x = e.offsetX - c.width / 2;
        const y = e.offsetY - c.height / 2;
        let xc = 0,
            yc = 0;
        if (Math.abs(x) > Math.abs(y)) {
            xc = x / Math.abs(x);
        } else {
            yc = y / Math.abs(y);
        }
        this.move(xc, yc);
    }

    getMaze(mazeIdx) {
        return MAZES[mazeIdx || this.state.currentMaze];
    }

    isValidMove(start, end) {
        const shift = p => ({ x: p.x + 0.5, y: p.y + 0.5 });
        const sStart = shift(start);
        const sEnd = shift(end);
        const { walls } = this.getMaze();
        for (let i = 0; i < walls.length; i++) {
            const [a, b] = walls[i];
            if (intersects(sStart, sEnd, a, b)) return false;
        }
        return true;
    }

    update(update) {
        this.setState(update, () => this.drawMaze());
    }

    move(xc, yc) {
        if (xc + yc === 0) {
            return;
        }

        const { pos, goal, badWalls } = this.state;
        const newPos = {
            x: bound(pos.x + xc),
            y: bound(pos.y + yc)
        };

        if (!this.isValidMove(pos, newPos)) {
            this.update({
                badWalls: [...badWalls, Mazes.getWallBetween(pos, newPos)]
            });
            return;
        }

        const maze = this.getMaze();
        const update = {
            pos: newPos,
            goal,
            badWalls: []
        };
        while (
            update.pos.x === update.goal.x &&
            update.pos.y === update.goal.y
        ) {
            update.goal = randomGoal(maze);
        }
        this.update(update);
    }

    toggleWalls() {
        this.update({ displayWalls: !this.state.displayWalls });
    }

    selectMaze(currentMaze) {
        this.update(({ pos }) => {
            const update = { currentMaze };
            const maze = this.getMaze(currentMaze);
            while (
                !update.goal ||
                (pos.x === update.goal.x && pos.y === update.goal.y)
            ) {
                update.goal = randomGoal(maze);
            }
            return update;
        });
    }

    drawMaze() {
        const padding = 20;
        const gridSize = 14;
        const mazeSize = 6;
        const circleRadius = 16;
        const circleThickness = 5;
        const triangleSize = 18;
        const wallThickness = 4;

        const maze = this.getMaze();
        const loc = this.state.pos;
        const goal = this.state.goal;

        const c = document.getElementById('mazeCanvas');
        const s = c.width;
        const ctx = c.getContext('2d');
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, s, s);

        const innerSize = s - padding * 2;
        ctx.translate(padding, padding);
        ctx.fillStyle = '#040C1E';
        ctx.fillRect(0, 0, innerSize, innerSize);

        const pos = x => (x * innerSize) / mazeSize + innerSize / mazeSize / 2;

        // draw grid
        for (let i = 0; i < mazeSize; i++) {
            for (let j = 0; j < mazeSize; j++) {
                ctx.fillStyle =
                    i === loc.x && j === loc.y ? 'white' : '#2C4551';
                ctx.fillRect(
                    pos(i) - gridSize / 2,
                    pos(j) - gridSize / 2,
                    gridSize,
                    gridSize
                );
            }
        }

        // draw circles
        ctx.strokeStyle = '#78B764';
        ctx.lineWidth = circleThickness;
        maze.circles.forEach(({ x, y }) => {
            ctx.beginPath();
            ctx.arc(pos(x), pos(y), circleRadius, 0, 2 * Math.PI);
            ctx.stroke();
        });

        // draw goal
        ctx.beginPath();
        const g = { x: pos(goal.x), y: pos(goal.y) };
        ctx.moveTo(g.x - triangleSize / 2, g.y + triangleSize / 2);
        ctx.lineTo(g.x + triangleSize / 2, g.y + triangleSize / 2);
        ctx.lineTo(g.x, g.y - triangleSize / 2);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();

        // draw walls
        const cpos = x => (x * innerSize) / mazeSize;
        const drawWalls = walls => {
            walls.forEach(([a, b]) => {
                ctx.beginPath();
                ctx.moveTo(cpos(a.x), cpos(a.y));
                ctx.lineTo(cpos(b.x), cpos(b.y));
                ctx.stroke();
            });
        };
        if (this.state.displayWalls) {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = wallThickness;
            drawWalls(maze.walls);
        }
        ctx.strokeStyle = 'red';
        ctx.lineWidth = wallThickness;
        drawWalls(this.state.badWalls);

        ctx.restore();
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    Select a maze:{' '}
                    <select
                        value={this.state.currentMaze}
                        onChange={e => this.selectMaze(e.target.value)}
                    >
                        {MAZES.map((m, idx) => (
                            <option key={idx} value={idx}>
                                Maze {idx + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <canvas id="mazeCanvas" width={300} height={300}></canvas>
                </div>
                <div className="text-center">
                    Use WASD or arrow keys to move and SPACE to toggle walls.
                    <br />
                    On mobile, click on the sides of the maze to move.
                    <br />
                    <button onClick={() => this.toggleWalls()}>Toggle</button>
                </div>
            </div>
        );
    }
}

export default Mazes;
