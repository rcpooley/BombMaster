import React from 'react';
import MAZES from '../../maze/mazes';

/**
 * Props: {mazeIdx, size, pos, goal, displayWalls, badWalls}
 */

class Maze extends React.Component {
    static renderMaze(ctx, size, maze, loc, goal, displayWalls, badWalls) {
        const padding = 20;
        const gridSize = 14;
        const mazeSize = 6;
        const circleRadius = 16;
        const circleThickness = 5;
        const triangleSize = 18;
        const wallThickness = 4;

        const s = size;
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
                    loc != null && i === loc.x && j === loc.y
                        ? 'white'
                        : '#2C4551';
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
        if (goal != null) {
            ctx.beginPath();
            const g = { x: pos(goal.x), y: pos(goal.y) };
            ctx.moveTo(g.x - triangleSize / 2, g.y + triangleSize / 2);
            ctx.lineTo(g.x + triangleSize / 2, g.y + triangleSize / 2);
            ctx.lineTo(g.x, g.y - triangleSize / 2);
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
        }

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
        if (displayWalls) {
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = wallThickness;
            drawWalls(maze.walls);
        }
        ctx.strokeStyle = 'red';
        ctx.lineWidth = wallThickness;
        drawWalls(badWalls);

        ctx.restore();
    }

    constructor(props) {
        super(props);
        this.mazeRef = React.createRef();

        this.onMouseDown = this.onMouseDown.bind(this);
    }

    componentDidMount() {
        this.mazeRef.current.addEventListener(
            'mousedown',
            this.onMouseDown,
            false
        );

        this.drawMaze();
    }

    componentWillUnmount() {
        this.mazeRef.current.removeEventListener(
            'mousedown',
            this.onMouseDown,
            false
        );
    }

    onMouseDown(e) {
        if (this.props.onMouseDown) {
            this.props.onMouseDown(e);
        }
    }

    drawMaze() {
        const c = this.mazeRef.current;
        const ctx = c.getContext('2d');
        const { pos, goal, displayWalls, badWalls, mazeIdx, size } = this.props;

        const fakeCanvas = document.createElement('canvas');
        fakeCanvas.width = 300;
        fakeCanvas.height = 300;
        const fakeCtx = fakeCanvas.getContext('2d');

        Maze.renderMaze(
            fakeCtx,
            fakeCanvas.width,
            MAZES[mazeIdx],
            pos,
            goal,
            displayWalls,
            badWalls
        );

        ctx.drawImage(fakeCanvas, 0, 0, size, size);
    }

    render() {
        const { size } = this.props;
        return <canvas ref={this.mazeRef} width={size} height={size}></canvas>;
    }

    componentDidUpdate() {
        this.drawMaze();
    }
}

export default Maze;
