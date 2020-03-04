import React from 'react';
import P from '../paragraph';
import H from '../heading';
import OptionsBar from '../optionsBar';
import Util from '../../util';

const CONDITIONS = {
    3: [
        {
            R: { max: 0 },
            cut: 2
        },
        {
            W: { last: true },
            cut: 3
        },
        {
            U: { min: 2 },
            cut: 'U'
        },
        {
            cut: 3
        }
    ],
    4: [
        {
            R: { min: 2 },
            odd: true,
            cut: 'R'
        },
        {
            Y: { last: true },
            R: { max: 0 },
            cut: 1
        },
        {
            U: { one: true },
            cut: 1
        },
        {
            Y: { min: 2 },
            cut: 4
        },
        {
            cut: 2
        }
    ],
    5: [
        {
            B: { last: true },
            odd: true,
            cut: 4
        },
        {
            R: { one: true },
            Y: { min: 2 },
            cut: 1
        },
        {
            B: { max: 0 },
            cut: 2
        },
        {
            cut: 1
        }
    ],
    6: [
        {
            Y: { max: 0 },
            odd: true,
            cut: 3
        },
        {
            Y: { one: true },
            W: { min: 2 },
            cut: 4
        },
        {
            R: { max: 0 },
            cut: 6
        },
        {
            cut: 4
        }
    ]
};

const COLORS = 'BURWY'.split('');

class PracticeModule extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState(0);
    }

    initState(wireGroup) {
        const numWires = wireGroup === 0 ? Util.rnd(3, 7) : wireGroup;
        const conds = CONDITIONS[numWires];
        const condIdx = Util.rnd(conds.length);
        const { wires, odd } = this.genWires(numWires, conds, condIdx);

        return {
            wireGroup,
            wires,
            odd,
            cut: conds[condIdx].cut,
            incorrect: null,
            showSerial: false
        };
    }

    genWires(numWires, conds, idx) {
        const c = o => JSON.parse(JSON.stringify(o));
        const cond = {};
        for (let i = 0; i < idx; i++) {
            const neg = this.negate(conds[i]);
            this.merge(cond, neg);
        }
        Object.keys(conds[idx]).forEach(k => {
            if (k === 'cut') return;
            this.merge(cond, { [k]: conds[idx][k] });
        });

        // fix last
        COLORS.filter(c => c in cond).forEach(c => {
            const cc = cond[c];
            if (cc.last && !cc.one) {
                if (!('min' in cc) || cc.min < 1) {
                    cc.min = 1;
                }
                if (cc.min === 1 && cc.max === 1) {
                    cc.one = true;
                    delete cc.min;
                    delete cc.max;
                }
            }
            if (cc.last === false && !cc.one) {
                if (!('max' in cc) || cc.max > numWires - 1) {
                    cc.max = numWires - 1;
                }
            }
        });

        const allRange = [...Array(numWires + 1).keys()];
        const notOne = allRange.slice();
        notOne.splice(1, 1);
        const colorRanges = {};
        COLORS.forEach(c => {
            if (c in cond) {
                const cc = cond[c];
                if ('one' in cc) {
                    if (cc.one) {
                        colorRanges[c] = [1];
                    } else {
                        colorRanges[c] = notOne;
                    }
                } else if ('min' in cc || 'max' in cc) {
                    const min = 'min' in cc ? cc.min : 0;
                    const max = 'max' in cc ? cc.max : numWires;
                    colorRanges[c] = [...Array(max + 1 - min).keys()].map(
                        n => n + min
                    );
                }
            } else {
                colorRanges[c] = allRange;
            }
        });

        let numColors = null;
        while (numColors === null) {
            numColors = this.getNumColors(colorRanges, numWires);
        }

        const wires = [];
        Object.keys(numColors).forEach(c => {
            const n = numColors[c];
            for (let i = 0; i < n; i++) {
                wires.push(c);
            }
        });

        // randomize order
        const randomWires = [];
        while (wires.length > 0) {
            randomWires.push(wires.splice(Util.rnd(wires.length), 1)[0]);
        }

        // handle last
        COLORS.filter(c => c in cond).forEach(c => {
            const cc = cond[c];
            if (cc.last && randomWires[randomWires.length - 1] !== c) {
                const idx = randomWires.indexOf(c);
                randomWires[idx] = randomWires[randomWires.length - 1];
                randomWires[randomWires.length - 1] = c;
            }
            if (
                cc.last === false &&
                randomWires[randomWires.length - 1] === c
            ) {
                for (let i = 0; i < randomWires.length - 1; i++) {
                    if (randomWires[i] !== c) {
                        randomWires[randomWires.length - 1] = randomWires[i];
                        randomWires[i] = c;
                        break;
                    }
                }
            }
        });

        let odd = [true, false][Util.rnd(2)];
        if (cond.odd === true) odd = true;
        else if (cond.odd === false) odd = false;

        return { wires: randomWires, odd };
    }

    getNumColors(colorRanges, numWires) {
        const constrainedColors = Object.keys(colorRanges);
        const numColors = {};
        let remainingWires = numWires;
        while (constrainedColors.length > 0) {
            const ccIdx = Util.rnd(constrainedColors.length);
            const c = constrainedColors.splice(ccIdx, 1)[0];
            const range = colorRanges[c].slice();
            if (constrainedColors.length === 0) {
                if (!range.includes(remainingWires)) {
                    return null;
                } else {
                    numColors[c] = remainingWires;
                }
            } else {
                let n = null;
                while (range.length > 0 && n === null) {
                    const rIdx = Util.rnd(range.length);
                    const check = range.splice(rIdx, 1)[0];
                    if (check <= remainingWires) {
                        n = check;
                    }
                }
                if (n === null) {
                    return null;
                }
                numColors[c] = n;
                remainingWires -= n;
            }
        }
        return numColors;
    }

    negate(condition) {
        const negated = [];
        COLORS.filter(c => c in condition).forEach(c => {
            const cond = condition[c];
            const neg = {};
            if ('min' in cond) {
                neg.max = cond.min - 1;
            } else if ('max' in cond) {
                neg.min = cond.max + 1;
            } else if ('one' in cond) {
                neg.one = !cond.one;
            } else if ('last' in cond) {
                neg.last = !cond.last;
            }
            negated.push({ [c]: neg });
        });
        if ('odd' in condition) {
            negated.push({ odd: !condition.odd });
        }
        return negated[Util.rnd(negated.length)];
    }

    merge(a, b) {
        const key = Object.keys(b)[0];
        if (!(key in a)) {
            a[key] = JSON.parse(JSON.stringify(b[key]));
        } else {
            const aa = a[key];
            const bb = b[key];
            const bkey = Object.keys(bb)[0];
            if (!(bkey in aa)) {
                aa[bkey] = bb[bkey];
                if (aa.min === 1 && aa.max === 1) {
                    delete aa.min;
                    delete aa.max;
                    aa.one = true;
                }
                if (aa.one) {
                    delete aa.min;
                    delete aa.max;
                }
            } else {
                if (bkey === 'max') {
                    aa.max = Math.min(aa.max, bb.max);
                }
            }
        }
    }

    onCut(wire) {
        const { cut, wires, wireGroup } = this.state;

        let correct;
        if (typeof cut === 'string') {
            correct = wires.lastIndexOf(cut) === wire - 1;
        } else {
            correct = wire === cut;
        }

        if (correct) {
            this.setState(this.initState(wireGroup));
        } else {
            this.setState({ incorrect: wire - 1 });
        }
    }

    render() {
        const { wireGroup, wires, odd, incorrect, showSerial } = this.state;
        return (
            <div>
                <P>
                    <H center={true}>Choose a wire group to practice</H>
                    <OptionsBar
                        options={[
                            { id: 0, label: 'All' },
                            { id: 3, label: '3 wires' },
                            { id: 4, label: '4 wires' },
                            { id: 5, label: '5 wires' },
                            { id: 6, label: '6 wires' }
                        ]}
                        selected={wireGroup}
                        onSelect={wireGroup =>
                            this.setState(this.initState(wireGroup))
                        }
                    />
                </P>
                <P>
                    <div className="wiresPanel">
                        {wires.map((c, idx) => (
                            <div
                                key={idx}
                                className={`${c}${
                                    incorrect === idx ? ' incorrect' : ''
                                }`}
                                onClick={() => this.onCut(idx + 1)}
                            >
                                <div>Incorrect</div>
                            </div>
                        ))}
                    </div>
                </P>
                <P className="text-center">
                    {showSerial ? (
                        `Serial number is ${odd ? 'odd' : 'even'}`
                    ) : (
                        <button
                            onClick={() => this.setState({ showSerial: true })}
                        >
                            Check serial
                        </button>
                    )}
                </P>
            </div>
        );
    }
}

export default PracticeModule;
