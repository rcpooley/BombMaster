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

        const { selected, onSelect } = this.props;

        return (
            <div className="mazeSelector">
                {[...Array(3).keys()].map(r => (
                    <div key={r}>
                        {[...Array(3).keys()].map(c => {
                            const idx = r * 3 + c;
                            return (
                                <div
                                    key={c}
                                    className="canvasWrap"
                                    onClick={() => {
                                        if (Array.isArray(selected)) {
                                            const clone = selected.slice();
                                            if (clone.includes(idx)) {
                                                clone.splice(
                                                    clone.indexOf(idx),
                                                    1
                                                );
                                            } else {
                                                clone.push(idx);
                                            }
                                            onSelect(clone);
                                        } else {
                                            onSelect(idx);
                                        }
                                    }}
                                >
                                    {mazes[idx]}
                                    <div
                                        className={
                                            Array.isArray(selected)
                                                ? selected.includes(idx)
                                                    ? 'sel active'
                                                    : 'sel'
                                                : 'cover'
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }
}

export default MazeSelector;
