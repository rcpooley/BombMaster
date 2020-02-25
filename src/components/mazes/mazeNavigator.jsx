import React from 'react';
import Maze from './maze';
import KeyListener from '../keyListener';
import MazeState from '../../maze/maze';
import MU from '../../maze/mazeUtil';
import DIR from '../../maze/directions';

const SIZE = 300;

/**
 * props: {mazeIdx, displayWalls, disableInput, randomGoal, showVisited}
 */
class MazeNavigator extends React.Component {
    constructor(props) {
        super(props);

        const maze = new MazeState(props.mazeIdx, props.randomGoal);

        this.state = {
            maze,
            badWalls: [],
            visited: [maze.pos]
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
        const { disableInput, showVisited, onHit, onGoal } = this.props;
        if (disableInput) {
            return;
        }

        let { maze, badWalls, visited } = this.state;
        const oldGoal = maze.goal;
        const bw = maze.move(dir);

        if (!MU.contains(visited, maze.pos)) {
            visited = visited.slice();
            visited.push(maze.pos);
        }

        if (bw) {
            badWalls = badWalls.slice();
            if (badWalls.filter(w => MU.equal(w, bw)).length === 0) {
                badWalls.push(bw);
            }
            if (onHit) {
                onHit();
            }
        } else {
            badWalls = [];
        }
        this.setState({ badWalls, visited }, () => {
            if (onGoal) {
                if (!showVisited && !MU.equal(oldGoal, maze.goal)) {
                    onGoal();
                } else if (showVisited && visited.length === 36) {
                    onGoal();
                }
            }
        });
    }

    render() {
        const { badWalls, maze, visited } = this.state;
        const { mazeIdx, pos, goal } = maze;
        const { displayWalls, showVisited } = this.props;

        return (
            <div>
                <KeyListener onKeyPress={e => this.onKeyPress(e)} />
                <Maze
                    size={SIZE}
                    mazeIdx={mazeIdx}
                    pos={pos}
                    goal={showVisited ? null : goal}
                    badWalls={badWalls}
                    visited={showVisited ? visited : []}
                    displayWalls={displayWalls}
                    onMouseDown={e => this.onMouseDown(e)}
                />
            </div>
        );
    }
}

export default MazeNavigator;
