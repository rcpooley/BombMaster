const oLine = 'oLine';
const at = 'at';
const lambda = 'lambda';
const lightning = 'lightning';
const yieldTrident = 'yieldTrident';
const hj = 'hj';
const revCdot = 'revCdot';
const revEdots = 'revEdots';
const loopty = 'loopty';
const emptyStar = 'emptyStar';
const qMark = 'qMark';
const copy = 'copy';
const w = 'w';
const mirK = 'mirK';
const fiz3 = 'fiz3';
const six = 'six';
const paragraph = 'paragraph';
const bt = 'bt';
const smily = 'smily';
const trident = 'trident';
const cDot = 'cDot';
const ears3 = 'ears3';
const fillStar = 'fillStar';
const notEqual = 'notEqual';
const ae = 'ae';
const revN = 'revN';
const omega = 'omega';

const pads = [
    [oLine, at, lambda, lightning, yieldTrident, hj, revCdot],
    [revEdots, oLine, revCdot, loopty, emptyStar, hj, qMark],
    [copy, w, loopty, mirK, fiz3, lambda, emptyStar],
    [six, paragraph, bt, yieldTrident, mirK, qMark, smily],
    [trident, smily, bt, cDot, paragraph, ears3, fillStar],
    [six, revEdots, notEqual, ae, trident, revN, omega]
];

const all = [];
pads.forEach(p => {
    p.forEach(key => {
        if (!all.includes(key)) {
            all.push(key);
        }
    });
});

const multi = [];

// Iterate over all pairs of symbols
for (let i = 0; i < all.length - 1; i++) {
    const a = all[i];
    for (let j = i + 1; j < all.length; j++) {
        const b = all[j];

        const inc = [...Array(6).keys()].filter(
            k => pads[k].includes(a) && pads[k].includes(b)
        );

        if (inc.length >= 2) {
            multi.push({ a, b, inc });
        }
    }
}

console.log(multi);

// look at lamb in yield his backseat
// E look backseat shooting star his question
// copy comma loop k
