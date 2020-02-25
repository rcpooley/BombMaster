import React from 'react';
import MazeSelector from './mazeSelector';
import MazeNavigator from './mazeNavigator';
import OptionsBar from '../optionsBar';
import Util from '../../util';

class Practice extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        return {
            started: false,
            finished: false,
            mazes: [...Array(9).keys()],
            mode: null,
            mazeIdx: -1,
            key: 0,
            strikes: 0,
            completed: -1
        };
    }

    randomMaze() {
        const { mazes } = this.state;
        return mazes[Math.floor(Math.random() * mazes.length)];
    }

    isFull() {
        return this.state.mode === 1;
    }

    nextMaze() {
        const { mazes, mazeIdx, key, completed } = this.state;

        const setNewIdx = () => {
            const { mazes } = this.state;
            let newIdx = this.randomMaze();
            while (newIdx === mazeIdx && mazes.length > 1) {
                newIdx = this.randomMaze();
            }
            this.setState({
                mazeIdx: newIdx,
                key: 1 - key,
                started: true,
                completed: completed + 1
            });
        };

        if (this.isFull() && mazeIdx >= 0) {
            if (mazes.length === 1) {
                this.setState({ finished: true, completed: completed + 1 });
            } else {
                const newMazes = mazes.slice();
                newMazes.splice(newMazes.indexOf(mazeIdx), 1);
                this.setState({ mazes: newMazes }, setNewIdx);
            }
        } else {
            setNewIdx();
        }
    }

    render() {
        const {
            started,
            mazes,
            mazeIdx,
            key,
            strikes,
            completed,
            mode,
            finished
        } = this.state;
        if (!started) {
            return (
                <div className="text-center">
                    <div>Which mazes do you want to be tested on?</div>
                    <div className="mb-1">
                        <button
                            onClick={() =>
                                this.setState({ mazes: [...Array(9).keys()] })
                            }
                        >
                            All
                        </button>
                        <span className="p-1" />
                        <button onClick={() => this.setState({ mazes: [] })}>
                            None
                        </button>
                    </div>
                    <MazeSelector
                        selected={mazes}
                        onSelect={mazes => this.setState({ mazes })}
                    />
                    <div className="mazeMode mt-1">
                        Mode:
                        <div className="ml-1">
                            <OptionsBar
                                options={['Normal', 'Full']}
                                selected={mode}
                                onSelect={mode => this.setState({ mode })}
                            />
                        </div>
                    </div>
                    <div>
                        {Util.bold('Normal:')} Navigate to the goal
                        <br />
                        {Util.bold('Full:')} Fully navigate the maze
                    </div>
                    <div className="mt-1">
                        <button
                            disabled={mazes.length === 0}
                            onClick={() => this.nextMaze()}
                        >
                            Start
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="text-center">
                {finished ? (
                    <div>
                        <button onClick={() => this.setState(this.initState())}>
                            Start Over
                        </button>
                    </div>
                ) : (
                    <MazeNavigator
                        key={key}
                        mazeIdx={mazeIdx}
                        displayWalls={false}
                        disableInput={false}
                        randomGoal={true}
                        showVisited={this.isFull()}
                        onGoal={() => this.nextMaze()}
                        onHit={() => this.setState({ strikes: strikes + 1 })}
                    />
                )}
                <div>Strikes: {strikes}</div>
                <div>Completed: {completed}</div>
            </div>
        );
    }
}

export default Practice;
