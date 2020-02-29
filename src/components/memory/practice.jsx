import React from 'react';
import Util from '../../util';
import FlexGroup from '../flexGroup';
import P from '../paragraph';

class Practice extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        return {
            stage: 1,
            display: this.rndDisplay(),
            buttons: this.rndButtons(),
            history: [],
            incorrect: null,
            showHistory: false
        };
    }

    rndDisplay() {
        return Util.rnd(1, 5);
    }

    rndButtons() {
        const buttons = [1, 2, 3, 4];
        const shuffled = [];
        while (buttons.length > 0) {
            shuffled.push(buttons.splice(Util.rnd(buttons.length), 1)[0]);
        }
        return shuffled;
    }

    getExpected() {
        const { stage, display, buttons, history } = this.state;

        const pos = n => n;
        const lab = n => {
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i] === n) return i + 1;
            }
        };
        const spos = s => pos(history[s - 1].pos);
        const slab = s => lab(history[s - 1].lab);

        if (stage === 1) {
            if (display === 1) {
                return pos(2);
            } else {
                return pos(display);
            }
        } else if (stage === 2) {
            if (display === 2 || display === 4) {
                return spos(1);
            } else if (display === 1) {
                return lab(4);
            } else if (display === 3) {
                return pos(1);
            }
        } else if (stage === 3) {
            if (display === 1) {
                return slab(2);
            } else if (display === 2) {
                return slab(1);
            } else if (display === 3) {
                return pos(3);
            } else if (display === 4) {
                return lab(4);
            }
        } else if (stage === 4) {
            if (display === 1) {
                return spos(1);
            } else if (display === 2) {
                return pos(1);
            } else if (display === 3 || display === 4) {
                return spos(2);
            }
        } else if (stage === 5) {
            if (display === 3) {
                return slab(4);
            } else if (display === 4) {
                return slab(3);
            } else {
                return slab(display);
            }
        }
    }

    onClick(pos) {
        const { buttons, history, stage } = this.state;

        if (stage > 5) {
            return;
        }

        const expectedPos = this.getExpected();

        if (pos !== expectedPos) {
            this.setState({ incorrect: pos });
            return;
        }

        const lab = buttons[pos - 1];

        const newHistory = history.slice();
        newHistory.push({ pos, lab, buttons });

        let update = {
            stage: stage + 1,
            history: newHistory,
            incorrect: null
        };

        if (stage < 5) {
            update = {
                ...update,
                display: this.rndDisplay(),
                buttons: this.rndButtons()
            };
        }

        this.setState(update);
    }

    render() {
        const {
            stage,
            display,
            buttons,
            incorrect,
            showHistory,
            history
        } = this.state;

        const button = pos => (
            <div
                onClick={() => this.onClick(pos)}
                className={`button${pos === incorrect ? ' incorrect' : ''}`}
            >
                {buttons[pos - 1]}
                <div className="cover" />
            </div>
        );

        return (
            <div>
                <P className="text-center">
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            this.setState({
                                ...this.initState(),
                                showHistory
                            })
                        }
                    >
                        Reset
                    </button>
                </P>
                <P>
                    <div className="practice">
                        <div>
                            <div>
                                <div className="wrap">
                                    <div className="display">
                                        <div>{display}</div>
                                    </div>
                                </div>

                                <div className="wrap">
                                    <FlexGroup childClass="buttons">
                                        <FlexGroup inline={true}>
                                            {button(1)}
                                            {button(2)}
                                        </FlexGroup>
                                        <FlexGroup inline={true}>
                                            {button(3)}
                                            {button(4)}
                                        </FlexGroup>
                                    </FlexGroup>
                                </div>
                            </div>
                            <div className="stagesWrap">
                                <div>
                                    {[...Array(5).keys()].map(i => (
                                        <div
                                            key={i}
                                            className={
                                                5 - i < stage ? 'active' : ''
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </P>
                <P className="text-center">
                    <P>
                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                this.setState({ showHistory: !showHistory })
                            }
                        >
                            {showHistory ? 'Hide' : 'Show'} History
                        </button>
                    </P>
                    {showHistory && (
                        <P className="d-inline-block">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Stage</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Label</th>
                                        <th scope="col">Buttons</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map(
                                        ({ pos, lab, buttons }, idx) => (
                                            <tr key={idx}>
                                                <th scope="row">{idx + 1}</th>
                                                <td>{pos}</td>
                                                <td>{lab}</td>
                                                <td>{buttons.join('')}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </P>
                    )}
                </P>
            </div>
        );
    }
}

export default Practice;
