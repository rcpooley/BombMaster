import React from 'react';
import Maze from './maze';
import MazeSelector from './mazeSelector';
import KeyListener from '../keyListener';
import MazeState from '../../maze/maze';
import MU from '../../maze/mazeUtil';
import DIR from '../../maze/directions';

const SIZE = 300;

class Study extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState(0);
    }

    initState(mazeIdx) {
        return {
            maze: new MazeState(mazeIdx),
            badWalls: [],
            displayWalls: false,
            selectingMaze: false
        };
    }

    onKeyPress(e) {
        const k = e.key.toLowerCase();

        if (k === ' ') {
            this.toggleWalls();
            return;
        }

        let dir = null;
        if (k === 'w' || k === 'arrowup') {
            dir = DIR.UP;
        } else if (k === 'a' || k === 'arrowleft') {
            dir = DIR.LEFT;
        } else if (k === 's' || k === 'arrowdown') {
            dir = DIR.DOWN;
        } else if (k === 'd' || k === 'arrowright') {
            dir = DIR.RIGHT;
        }
        if (dir) {
            this.move(dir);
        }
    }

    onMouseDown(e) {
        const x = e.offsetX - SIZE / 2;
        const y = e.offsetY - SIZE / 2;
        let dir = null;
        if (Math.abs(x) > Math.abs(y)) {
            dir = x > 0 ? DIR.RIGHT : DIR.LEFT;
        } else {
            dir = y > 0 ? DIR.DOWN : DIR.UP;
        }
        this.move(dir);
    }

    move(dir) {
        if (this.state.selectingMaze) {
            return;
        }

        let { maze, badWalls } = this.state;
        const bw = maze.move(dir);
        if (bw) {
            badWalls = badWalls.slice();
            if (badWalls.filter(w => MU.equal(w, bw)).length === 0) {
                badWalls.push(bw);
            }
        } else {
            badWalls = [];
        }
        this.update({ badWalls });
    }

    toggleWalls() {
        if (this.state.selectingMaze) {
            return;
        }

        this.update({ displayWalls: !this.state.displayWalls });
    }

    update(update) {
        this.setState({ maze: this.state.maze, ...(update || {}) });
    }

    render() {
        const { badWalls, displayWalls, maze, selectingMaze } = this.state;
        const { mazeIdx, pos, goal } = maze;
        return (
            <div className="text-center">
                <KeyListener onKeyPress={e => this.onKeyPress(e)} />
                <div className="mb-1">
                    <button
                        onClick={() =>
                            this.update({
                                selectingMaze: !this.state.selectingMaze
                            })
                        }
                    >
                        Change Maze
                    </button>
                </div>
                {selectingMaze ? (
                    <MazeSelector
                        onSelect={mazeIdx => {
                            this.setState(this.initState(mazeIdx));
                        }}
                    />
                ) : (
                    <Maze
                        size={SIZE}
                        mazeIdx={mazeIdx}
                        pos={pos}
                        goal={goal}
                        badWalls={badWalls}
                        displayWalls={displayWalls}
                        onMouseDown={e => this.onMouseDown(e)}
                    />
                )}
                <div>
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

export default Study;
