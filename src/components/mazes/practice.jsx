import React from 'react';
import MazeSelector from './mazeSelector';
import MazeNavigator from './mazeNavigator';

class Practice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            started: false,
            mazes: [...Array(9).keys()],
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

    nextMaze() {
        const { mazes, mazeIdx, key, completed } = this.state;
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
    }

    render() {
        const { started, mazes, mazeIdx, key, strikes, completed } = this.state;
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
                <MazeNavigator
                    key={key}
                    mazeIdx={mazeIdx}
                    displayWalls={false}
                    disableInput={false}
                    randomGoal={true}
                    onGoal={() => this.nextMaze()}
                    onHit={() => this.setState({ strikes: strikes + 1 })}
                />
                <div>Strikes: {strikes}</div>
                <div>Completed: {completed}</div>
            </div>
        );
    }
}

export default Practice;
