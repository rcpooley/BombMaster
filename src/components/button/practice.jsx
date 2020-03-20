import React from 'react';
import Util from '../../util';
import P from '../paragraph';

class Practice extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.nextState();
    }

    nextState() {
        const condIdx = Util.rnd(7);
        const { config, indicators, batteries } = this.getConfig(condIdx);

        const ind = [];
        if (indicators.includes('C')) {
            ind.push('CAR');
        }
        if (indicators.includes('F')) {
            ind.push('FRK');
        }

        if (Math.random() < 0.3) {
            ind.push('FRQ');
        }

        const labels = {
            A: 'Abort',
            D: 'Detonate',
            H: 'Hold',
            P: 'Press'
        };

        return {
            color: config[0],
            label: labels[config[1]],
            indicators: ind,
            batteries,
            showIndicators: false,
            showBatteries: false,
            click: condIdx % 2 === 1,
            incorrect: false,
            stripColor: null
        };
    }

    getConfig(cond) {
        let options = [];
        'BURWY'.split('').forEach(c => {
            'ADHP'.split('').forEach(l => options.push(`${c}${l}`));
        });
        let maxBatteries = null;

        let indicators = ['CF', 'C', 'F', ''];

        const h = () => Math.random() < 0.5;
        const f = func => (options = options.filter(func));
        const fi = func => (indicators = indicators.filter(func));

        const ret = minBatteries => {
            const min = minBatteries || 0;
            return {
                config: Util.randomItem(options),
                indicators: Util.randomItem(indicators),
                batteries: Util.rnd(min, maxBatteries || 4)
            };
        };

        // Blue, Abort
        if (cond > 0) {
            f(o => o !== 'UA');
        } else {
            f(o => o === 'UA');
            return ret();
        }

        // 2B+, Detonate
        if (cond > 1) {
            if (cond !== 3 && h()) {
                maxBatteries = 1;
            } else {
                f(o => o[1] !== 'D');
            }
        } else {
            f(o => o[1] === 'D');
            return ret(2);
        }

        // White, CAR
        if (cond > 2) {
            if (h()) {
                f(o => o[0] !== 'W');
            } else {
                fi(o => !o.includes('C'));
            }
        } else {
            f(o => o[0] === 'W');
            fi(o => o.includes('C'));
            return ret();
        }

        // 3B+, FRK
        if (cond > 3) {
            if (h()) {
                if (maxBatteries != null) {
                    maxBatteries = Math.min(2, maxBatteries);
                } else {
                    maxBatteries = 2;
                }
            } else {
                fi(o => !o.includes('F'));
            }
        } else {
            fi(o => o.includes('F'));
            return ret(3);
        }

        // Yellow
        if (cond > 4) {
            f(o => o[0] !== 'Y');
        } else {
            f(o => o[0] === 'Y');
            return ret();
        }

        // Red, Hold
        if (cond > 5) {
            f(o => o !== 'RH');
        } else {
            f(o => o === 'RH');
            return ret();
        }

        return ret();
    }

    onClick(click) {
        if (click === this.state.click) {
            if (click) {
                this.setState(this.nextState());
            } else {
                this.setState({
                    stripColor: Util.randomItem([
                        'Blue',
                        'Red',
                        'White',
                        'Yellow'
                    ])
                });
            }
        } else {
            this.setState({ incorrect: true });
        }
    }

    onRelease(num) {
        const { stripColor } = this.state;
        const map = {
            Red: 1,
            White: 1,
            Blue: 4,
            Yellow: 5
        };
        if (map[stripColor] === num) {
            this.setState(this.nextState());
        } else {
            this.setState({ incorrect: true });
        }
    }

    render() {
        const {
            color,
            label,
            incorrect,
            showBatteries,
            batteries,
            showIndicators,
            indicators,
            stripColor
        } = this.state;

        return (
            <div className="text-center">
                <P>
                    <div className={`buttonRender ${color}`}>{label}</div>
                </P>
                <P>
                    {showBatteries ? (
                        <span>
                            {batteries} batter{batteries === 1 ? 'y' : 'ies'}
                        </span>
                    ) : (
                        <button
                            className="btn btn-info"
                            onClick={() =>
                                this.setState({ showBatteries: true })
                            }
                        >
                            Count batteries
                        </button>
                    )}
                    <span className="p-2" />
                    {showIndicators ? (
                        <span>
                            {indicators.length > 0
                                ? indicators.join(', ')
                                : 'No indicators'}
                        </span>
                    ) : (
                        <button
                            className="btn btn-info"
                            onClick={() =>
                                this.setState({ showIndicators: true })
                            }
                        >
                            Check indicators
                        </button>
                    )}
                </P>
                <P>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.onClick(true)}
                        disabled={stripColor !== null}
                    >
                        Click
                    </button>
                    <span className="p-2" />
                    <button
                        className="btn btn-primary"
                        onClick={() => this.onClick(false)}
                        disabled={stripColor !== null}
                    >
                        Hold
                    </button>
                </P>
                {stripColor && (
                    <P>
                        <div className={`strip ${stripColor}`}>
                            {stripColor} strip
                        </div>
                        <div>
                            Release on
                            <div className="buttonRow">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => this.onRelease(1)}
                                >
                                    1
                                </button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => this.onRelease(4)}
                                >
                                    4
                                </button>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => this.onRelease(5)}
                                >
                                    5
                                </button>
                            </div>
                        </div>
                    </P>
                )}
                {incorrect && (
                    <P>
                        <div className="alert alert-danger mt-2">
                            That is incorrect
                        </div>
                    </P>
                )}
            </div>
        );
    }
}

export default Practice;
