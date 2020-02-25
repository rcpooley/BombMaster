import React from 'react';
import MazeSelector from './mazeSelector';
import KeyListener from '../keyListener';
import MazeNavigator from './mazeNavigator';
import Util from '../../util';

class Study extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState(0);
    }

    initState(mazeIdx) {
        return {
            mazeIdx,
            displayWalls: false,
            selectingMaze: false
        };
    }

    onKeyPress(e) {
        const k = e.key.toLowerCase();

        if (k === ' ') {
            this.toggleWalls();
        }
    }

    toggleWalls() {
        if (this.state.selectingMaze) {
            return;
        }

        this.setState({ displayWalls: !this.state.displayWalls });
    }

    render() {
        const { mazeIdx, displayWalls, selectingMaze } = this.state;
        return (
            <div className="text-center">
                <div className="text-center">
                    <a href={Util.manual(15)} target="_blank">
                        Manual
                    </a>
                </div>
                <KeyListener onKeyPress={e => this.onKeyPress(e)} />
                <div className="mb-1">
                    <button
                        onClick={() =>
                            this.setState({
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
                    <MazeNavigator
                        mazeIdx={mazeIdx}
                        displayWalls={displayWalls}
                        disableInput={selectingMaze}
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
