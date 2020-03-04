import React from 'react';

class Module extends React.Component {
    render() {
        const { display, words, onClick, incorrect } = this.props;

        const rows = [];
        for (let i = 0; i < words.length; i += 2) {
            rows.push(words.slice(i, i + 2));
        }

        return (
            <div className="module">
                <div className="display">{display.toUpperCase()}</div>
                <div className="words">
                    {rows.map((r, idx1) => (
                        <div key={idx1} className="wordRow">
                            {r.map((w, idx2) => {
                                const pos = idx1 * 2 + idx2;
                                return (
                                    <div key={idx2} className="wordWrap">
                                        <div
                                            className={
                                                pos === incorrect
                                                    ? 'incorrect'
                                                    : ''
                                            }
                                            onClick={() => onClick(pos)}
                                        >
                                            {w.toUpperCase()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Module;
