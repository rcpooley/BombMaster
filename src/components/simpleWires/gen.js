import Util from '../../util';

const c_zero = 'zero';
const c_one = 'one';
const c_two = 'two';
const c_last = 'last';

const CONDITIONS = {
    3: [
        {
            R: c_zero,
            cut: 2
        },
        {
            W: c_last,
            cut: 3
        },
        {
            U: c_two,
            cut: 'U'
        },
        {
            cut: 3
        }
    ],
    4: [
        {
            R: c_two,
            odd: true,
            cut: 'R'
        },
        {
            Y: c_last,
            R: c_zero,
            cut: 1
        },
        {
            U: c_one,
            cut: 1
        },
        {
            Y: c_two,
            cut: 4
        },
        {
            cut: 2
        }
    ],
    5: [
        {
            B: c_last,
            odd: true,
            cut: 4
        },
        {
            R: c_one,
            Y: c_two,
            cut: 1
        },
        {
            B: c_zero,
            cut: 2
        },
        {
            cut: 1
        }
    ],
    6: [
        {
            Y: c_zero,
            odd: true,
            cut: 3
        },
        {
            Y: c_one,
            W: c_two,
            cut: 4
        },
        {
            R: c_zero,
            cut: 6
        },
        {
            cut: 4
        }
    ]
};

const COLORS = 'BURWY'.split('');

class Gen {
    static getConfig(numWires) {
        if (!numWires) {
            numWires = Util.rnd(3, 7);
        }

        const conds = CONDITIONS[numWires];
        const trueIdx = Util.rnd(conds.length);

        const constraints = Gen.getConstraints(numWires, conds, trueIdx);

        return Gen.getConfigForConstraints(constraints, numWires);
    }

    static getConfigForConstraints(constraints, numWires) {
        const colorRanges = Util.randomize(
            Gen.getColorRanges(constraints, numWires)
        );

        const colors = Gen.findColors({}, colorRanges, numWires);
        if (!colors) {
            throw new Error('colors cannot be null');
        }

        let wires = [];
        COLORS.forEach(c => {
            wires = wires.concat(Array(colors[c]).fill(c));
        });
        wires = Util.randomize(wires);

        let lastYes;
        const lastNo = [];
        COLORS.forEach(c => {
            if (c in constraints) {
                const cc = constraints[c];
                if ('last' in cc) {
                    if (cc.last) {
                        if (lastYes) {
                            throw new Error(
                                'There can be at most one last=true wire'
                            );
                        }
                        lastYes = c;
                    } else {
                        lastNo.push(c);
                    }
                }
            }
        });

        if (lastYes && wires[wires.length - 1] !== lastYes) {
            const idx = wires.indexOf(lastYes);
            if (idx < 0) {
                console.log(constraints, colorRanges, colors);
                throw new Error(
                    `${lastYes} must be present to be the last wire`
                );
            }
            wires[idx] = wires[wires.length - 1];
            wires[wires.length - 1] = lastYes;
        }

        if (lastNo.includes(wires[wires.length - 1])) {
            for (let i = 0; i < wires.length; i++) {
                if (!lastNo.includes(wires[i])) {
                    const tmp = wires[i];
                    wires[i] = wires[wires.length - 1];
                    wires[wires.length - 1] = tmp;
                    break;
                }
            }

            if (lastNo.includes(wires[wires.length - 1])) {
                throw new Error('Cannot match last wire');
            }
        }

        const odd =
            'odd' in constraints ? constraints.odd : [true, false][Util.rnd(2)];

        return {
            odd,
            wires
        };
    }

    static findColors(base, remaining, numWires) {
        if (remaining.length === 0) {
            return base;
        }
        let [c, min, max] = remaining[0];
        const curCount = Gen.count(base);
        max = Math.min(max, numWires - curCount);
        if (remaining.length === 1) {
            const newMin = numWires - curCount;
            if (min <= newMin) {
                min = newMin;
            } else {
                return null;
            }
        }
        if (min > max) {
            return null;
        }

        const nums = Util.randomize([...Array(max + 1).keys()].slice(min));
        for (let i = 0; i < nums.length; i++) {
            const newBase = JSON.parse(JSON.stringify(base));
            newBase[c] = nums[i];
            if (Gen.count(newBase) > numWires) {
                continue;
            }

            const check = Gen.findColors(newBase, remaining.slice(1), numWires);
            if (check) {
                return check;
            }
        }

        return null;
    }

    static count(colors) {
        let count = 0;
        Object.keys(colors).forEach(c => (count += colors[c]));
        return count;
    }

    static getColorRanges(constraints, numWires) {
        const ranges = [];
        COLORS.forEach(c => {
            const cc = constraints[c] || {};
            const min = 'min' in cc ? cc.min : 0;
            const max = 'max' in cc ? cc.max : numWires;
            ranges.push([c, min, max]);
        });
        return ranges;
    }

    static getConstraints(numWires, rawConds, trueIdx) {
        let base = {};
        Gen.convertCond(rawConds[trueIdx], numWires, false).forEach(cond => {
            base = Gen.merge(base, cond);
        });

        const negateConds = Util.randomize(
            rawConds
                .slice(0, trueIdx)
                .map(cond => Gen.convertCond(cond, numWires, true))
        );

        base = Gen.negateMerge(base, negateConds, numWires);
        if (!base) {
            throw new Error(
                `Base cannot be null (numWires=${numWires}; trueIdx=${trueIdx})`
            );
        }

        return base;
    }

    static negateMerge(base, conds, numWires) {
        if (conds.length === 0) {
            return base;
        }

        const cond = Util.randomize(conds[0]);
        for (let i = 0; i < cond.length; i++) {
            const newBase = Gen.merge(base, cond[i]);
            if (!newBase) {
                continue;
            }

            const minWires = Gen.getMinWires(newBase);
            if (minWires > numWires) {
                continue;
            }

            const check = this.negateMerge(newBase, conds.slice(1), numWires);
            if (check) {
                return check;
            }
        }

        return null;
    }

    static getMinWires(constraints) {
        let minWires = 0;

        COLORS.forEach(c => {
            const cc = constraints[c];
            if (!(c in constraints)) return;
            if ('min' in cc) {
                minWires += cc.min;
            }
        });

        return minWires;
    }

    static convertCond(cond, numWires, negate) {
        const converted = [];

        if (cond.odd) {
            converted.push({ odd: !negate });
        }

        COLORS.forEach(c => {
            if (!(c in cond)) return;
            const d = cond[c];

            const col = { color: c };
            let secondary;

            if (!negate) {
                if (d === c_zero) {
                    col.max = 0;
                } else if (d === c_one) {
                    col.min = 1;
                    col.max = 1;
                } else if (d === c_two) {
                    col.min = 2;
                } else if (d === c_last) {
                    col.last = true;
                    col.min = 1;
                } else {
                    throw new Error(`Invalid color condition: ${d}`);
                }
            } else {
                if (d === c_zero) {
                    col.min = 1;
                } else if (d === c_one) {
                    col.min = 2;
                    secondary = { color: c, max: 0 };
                } else if (d === c_two) {
                    col.max = 1;
                } else if (d === c_last) {
                    col.last = false;
                    col.max = numWires - 1;
                } else {
                    throw new Error(`Invalid color condition: ${d}`);
                }
            }

            converted.push(col);
            if (secondary) {
                converted.push(secondary);
            }
        });

        return converted;
    }

    static merge(base, cond) {
        if (!base || !cond) {
            throw new Error('base and cond must not be null');
        }

        base = JSON.parse(JSON.stringify(base));

        if ('odd' in cond) {
            if ('odd' in base) {
                throw new Error('Odd should not already be in base');
            }
            base.odd = cond.odd;
        } else if ('color' in cond) {
            const c = cond.color;
            if (!(c in base)) {
                const clone = JSON.parse(JSON.stringify(cond));
                delete clone.color;
                base[c] = clone;
            } else {
                const baseC = base[c];
                const baseMin = 'min' in baseC ? baseC.min : -1;
                const baseMax = 'max' in baseC ? baseC.max : 7;

                // Last
                if ('last' in cond) {
                    if ('last' in baseC) {
                        throw new Error('last should not already be in baseC');
                    }
                    baseC.last = cond.last;
                }

                // Min
                if ('min' in cond) {
                    if (cond.min > baseMax) {
                        return null;
                    }
                    if (cond.min >= baseMin) {
                        baseC.min = cond.min;
                    }
                }

                // Max
                if ('max' in cond) {
                    if (cond.max < baseMin) {
                        return null;
                    }
                    if (cond.max <= baseMax) {
                        baseC.max = cond.max;
                    }
                }
            }
        } else {
            throw new Error('One of odd or color must be in cond');
        }

        return base;
    }

    static getCut(config) {
        const idx = Gen.getConditionIdx(config);
        return CONDITIONS[config.wires.length][idx].cut;
    }

    static getConditionIdx({ wires, odd }) {
        const conds = CONDITIONS[wires.length];
        const count = {};
        COLORS.forEach(c => (count[c] = 0));
        wires.forEach(c => (count[c] += 1));

        for (let i = 0; i < conds.length; i++) {
            const cond = conds[i];
            const invalid = Object.keys(cond).filter(c => {
                if (c === 'cut') {
                    return false;
                }

                if (c === 'odd') {
                    return cond.odd !== odd;
                }

                const isLast = wires[wires.length - 1] === c;

                const cc = cond[c];
                const num = count[c];
                if (cc === c_zero && num !== 0) {
                    return true;
                }

                if (cc === c_one && num !== 1) {
                    return true;
                }

                if (cc === c_two && num < 2) {
                    return true;
                }

                if (cc === c_last && !isLast) {
                    return true;
                }

                return false;
            });
            if (invalid.length === 0) {
                return i;
            }
        }

        throw new Error('One of the conditions should pass');
    }
}

export default Gen;
