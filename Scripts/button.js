class Util {
    static manual(page) {
        return (
            'http://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf#page=' +
            page
        );
    }

    /**
     * Optionally exclude min
     *
     * @param {*} min Min (inclusive)
     * @param {*} max Max (exclusive)
     */
    static rnd(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static randomize(arr) {
        const a = arr.slice();
        const r = [];
        while (a.length > 0) {
            r.push(a.splice(Math.floor(Math.random() * a.length), 1)[0]);
        }
        return r;
    }

    static randomItem(arr) {
        return arr[Util.rnd(arr.length)];
    }
}

function getConfig(cond) {
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

function getClick({ config, indicators, batteries }) {
    if (config === 'UA') {
        return false;
    }

    if (batteries >= 2 && config[1] === 'D') {
        return true;
    }

    if (config[0] === 'W' && indicators.includes('C')) {
        return false;
    }

    if (batteries >= 3 && indicators.includes('F')) {
        return true;
    }

    if (config[0] === 'Y') {
        return false;
    }

    if (config === 'RH') {
        return true;
    }

    return false;
}

for (let i = 0; i < 7; i++) {
    const expected = i % 2 === 1;
    for (let j = 0; j < 1000; j++) {
        const config = getConfig(i);
        const actual = getClick(config);
        if (expected !== actual) {
            console.log('MISMATCH', i, config);
            process.exit();
        }
    }
}
