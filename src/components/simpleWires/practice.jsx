import React from 'react';
import Util from '../../util';
import OptionsBar from '../optionsBar';
import WireInput from './wireInput';
import ColorInput from './colorInput';

const CONDITIONS = [
    ['0R-2', 'LW-3', '2U-U', '_-3'],
    ['2R,X-R', 'LY,0R-1', '1U-1', '2Y-4', '_-2'],
    ['LB,X-4', '1R,2Y-1', '0B-2', '_-1'],
    ['0Y,X-3', '1Y,2W-4', '0R-6', '_-4']
];

const ADJS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

class Practice extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState(selected = null) {
        return {
            selected,
            activeConditions: ['0B'],
            activeCut: null,
            activeCutColor: null,
            submitted: [],
            incorrect: false
        };
    }

    onSelect(selected) {
        this.setState(this.initState(selected));
    }

    stringifyColor(col) {
        return ['black', 'blue', 'red', 'yellow', 'white'][
            'BURYW'.indexOf(col)
        ];
    }

    stringifyCondition(condition) {
        if (condition === 'X') {
            return 'serial number is odd';
        } else if (condition === '_') {
            return 'otherwise';
        } else if (condition[0] === 'L') {
            return 'last wire is ' + this.stringifyColor(condition[1]);
        }

        const spl = condition.split('');

        return (
            ['no', 'exactly one', 'two or more'][parseInt(spl[0])] +
            ' ' +
            this.stringifyColor(spl[1]) +
            ' wire' +
            (spl[0] === '1' ? '' : 's')
        );
    }

    stringifyCut(cut) {
        const num = parseInt(cut);
        if (isNaN(num)) {
            return 'cut the last ' + this.stringifyColor(cut) + ' wire';
        } else {
            return 'cut the ' + ADJS[num - 1] + ' wire';
        }
    }

    submit() {
        const {
            selected,
            submitted,
            activeConditions,
            activeCut,
            activeCutColor
        } = this.state;
        const expected = CONDITIONS[selected][submitted.length];
        const [expectedStr, expectedCut] = expected.split('-');
        const expectedConds = expectedStr.split(',');

        let actualCut = activeCut + 1 + '';
        if (activeCut === selected + 3) {
            actualCut = activeCutColor;
        }

        let valid = true;
        activeConditions.forEach(c => {
            if (expectedConds.includes(c)) {
                expectedConds.splice(expectedConds.indexOf(c), 1);
            } else {
                valid = false;
            }
        });

        if (expectedConds.length > 0 || actualCut !== expectedCut || !valid) {
            this.setState({ incorrect: true });
        } else {
            const sub = submitted.slice();
            const str =
                expectedStr
                    .split(',')
                    .map(c => this.stringifyCondition(c))
                    .join(' and ') +
                ' → ' +
                this.stringifyCut(expectedCut);
            sub.push(str);
            this.update({
                submitted: sub,
                activeConditions: ['0B'],
                activeCut: null,
                activeCutColor: null
            });
        }
    }

    update(update) {
        update.incorrect = false;
        this.setState(update);
    }

    render() {
        const {
            selected,
            activeConditions,
            activeCut,
            activeCutColor,
            submitted,
            incorrect
        } = this.state;

        let sel = (selected || 0) + 3;

        const wireOptions = ADJS.slice(0, sel).concat(['last']);

        return (
            <div className="text-center">
                {Util.bold('Choose a wire group to practice')}
                <OptionsBar
                    options={['3 wires', '4 wires', '5 wires', '6 wires']}
                    selected={selected}
                    onSelect={selected => this.onSelect(selected)}
                />
                {submitted.length > 0 && (
                    <div>
                        {Util.bold(`Submitted conditions`)}
                        <ol>
                            {submitted.map((str, idx) => (
                                <li key={idx}>{str}</li>
                            ))}
                        </ol>
                    </div>
                )}
                {submitted.length < CONDITIONS[selected || 0].length ? (
                    <div>
                        {Util.bold(`Condition ${submitted.length + 1}:`)}
                        <div>
                            <div>If</div>
                            {activeConditions.map((val, idx) => (
                                <div key={idx}>
                                    {idx > 0 && 'and'}
                                    <WireInput
                                        value={val}
                                        onChange={val => {
                                            const conds = activeConditions.slice();
                                            conds[idx] = val;
                                            this.update({
                                                activeConditions: conds
                                            });
                                        }}
                                        disableRemove={
                                            idx === 0 &&
                                            activeConditions.length === 1
                                        }
                                        onRemove={() => {
                                            const conds = activeConditions.slice();
                                            conds.splice(idx, 1);
                                            this.update({
                                                activeConditions: conds
                                            });
                                        }}
                                    />
                                </div>
                            ))}
                            <div>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        const conds = activeConditions.slice();
                                        conds.push(null);
                                        this.update({
                                            activeConditions: conds
                                        });
                                    }}
                                >
                                    Add Condition
                                </button>
                            </div>
                            <div>then cut the</div>
                            <div>
                                <div className="smallOpt">
                                    <OptionsBar
                                        options={wireOptions}
                                        selected={activeCut}
                                        onSelect={activeCut =>
                                            this.update({ activeCut })
                                        }
                                    />
                                </div>
                            </div>
                            {activeCut === wireOptions.length - 1 && (
                                <div className="smallOpt">
                                    <ColorInput
                                        value={activeCutColor}
                                        onChange={activeCutColor =>
                                            this.update({ activeCutColor })
                                        }
                                    />
                                </div>
                            )}
                            <div>wire</div>
                        </div>
                        <div>
                            <button
                                className="btn btn-success"
                                onClick={() => this.submit()}
                            >
                                Submit Condition
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-success">
                        {Util.bold('Well done!')} You successfully completed the
                        conditions for this wire group
                    </div>
                )}
                {incorrect && (
                    <div className="alert alert-danger mt-2">
                        That is incorrect
                    </div>
                )}
            </div>
        );
    }
}

export default Practice;
