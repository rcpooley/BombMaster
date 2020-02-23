import React from 'react';
import Maze from './maze';
import KeyListener from '../keyListener';
import MazeState from '../../maze/maze';
import MU from '../../maze/mazeUtil';
import DIR from '../../maze/directions';

const SIZE = 300;

/**
 * props: {mazeIdx, displayWalls, disableInput, randomGoal}
 */
class MazeNavigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maze: new MazeState(props.mazeIdx, props.randomGoal),
            badWalls: []
        };
    }

    onKeyPress(e) {
        const k = e.key.toLowerCase();

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
        if (this.props.disableInput) {
            return;
        }

        let { maze, badWalls } = this.state;
        const oldGoal = maze.goal;
        const bw = maze.move(dir);

        if (!MU.equal(oldGoal, maze.goal) && this.props.onGoal) {
            this.props.onGoal();
        }

        if (bw) {
            badWalls = badWalls.slice();
            if (badWalls.filter(w => MU.equal(w, bw)).length === 0) {
                badWalls.push(bw);
            }
            if (this.props.onHit) {
                this.props.onHit();
            }
        } else {
            badWalls = [];
        }
        this.setState({ badWalls });
    }

    render() {
        const { badWalls, maze } = this.state;
        const { mazeIdx, pos, goal } = maze;
        const { displayWalls } = this.props;

        return (
            <div>
                <KeyListener onKeyPress={e => this.onKeyPress(e)} />
                <Maze
                    size={SIZE}
                    mazeIdx={mazeIdx}
                    pos={pos}
                    goal={goal}
                    badWalls={badWalls}
                    displayWalls={displayWalls}
                    onMouseDown={e => this.onMouseDown(e)}
                />
            </div>
        );
    }
}

export default MazeNavigator;
