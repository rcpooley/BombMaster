import React from 'react';
import Maze from './maze';

class MazeSelector extends React.Component {
    render() {
        const mazes = [...Array(10).keys()].map(n => (
            <Maze
                size={100}
                mazeIdx={n}
                mazepos={null}
                goal={null}
                displayWalls={false}
                badWalls={[]}
            />
        ));

        return (
            <div className="mazeSelector">
                {[...Array(3).keys()].map(r => (
                    <div key={r}>
                        {[...Array(3).keys()].map(c => (
                            <div
                                key={c}
                                className="canvasWrap"
                                onClick={() => this.props.onSelect(r * 3 + c)}
                            >
                                {mazes[r * 3 + c]}
                                <div className="cover" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default MazeSelector;
