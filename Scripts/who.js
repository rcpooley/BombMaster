const raw = `
"READY": YES, OKAY, WHAT, MIDDLE, LEFT, PRESS, RIGHT, BLANK, READY, NO, FIRST, UHHH, NOTHING, WAIT
"FIRST": LEFT, OKAY, YES, MIDDLE, NO, RIGHT, NOTHING, UHHH, WAIT, READY, BLANK, WHAT, PRESS, FIRST
"NO": BLANK, UHHH, WAIT, FIRST, WHAT, READY, RIGHT, YES, NOTHING, LEFT, PRESS, OKAY, NO, MIDDLE
"BLANK": WAIT, RIGHT, OKAY, MIDDLE, BLANK, PRESS, READY, NOTHING, NO, WHAT, LEFT, UHHH, YES, FIRST
"NOTHING": UHHH, RIGHT, OKAY, MIDDLE, YES, BLANK, NO, PRESS, LEFT, WHAT, WAIT, FIRST, NOTHING, READY
"YES": OKAY, RIGHT, UHHH, MIDDLE, FIRST, WHAT, PRESS, READY, NOTHING, YES, LEFT, BLANK, NO, WAIT
"WHAT": UHHH, WHAT, LEFT, NOTHING, READY, BLANK, MIDDLE, NO, OKAY, FIRST, WAIT, YES, PRESS, RIGHT
"UHHH": READY, NOTHING, LEFT, WHAT, OKAY, YES, RIGHT, NO, PRESS, BLANK, UHHH, MIDDLE, WAIT, FIRST
"LEFT": RIGHT, LEFT, FIRST, NO, MIDDLE, YES, BLANK, WHAT, UHHH, WAIT, PRESS, READY, OKAY, NOTHING
"RIGHT": YES, NOTHING, READY, PRESS, NO, WAIT, WHAT, RIGHT, MIDDLE, LEFT, UHHH, BLANK, OKAY, FIRST
"MIDDLE": BLANK, READY, OKAY, WHAT, NOTHING, PRESS, NO, WAIT, LEFT, MIDDLE, RIGHT, FIRST, UHHH, YES
"OKAY": MIDDLE, NO, FIRST, YES, UHHH, NOTHING, WAIT, OKAY, LEFT, READY, BLANK, PRESS, WHAT, RIGHT
"WAIT": UHHH, NO, BLANK, OKAY, YES, LEFT, FIRST, PRESS, WHAT, WAIT, NOTHING, READY, RIGHT, MIDDLE
"PRESS": RIGHT, MIDDLE, YES, READY, PRESS, OKAY, NOTHING, UHHH, BLANK, LEFT, FIRST, WHAT, NO, WAIT
"YOU": SURE, YOU ARE, YOUR, YOU'RE, NEXT, UH HUH, UR, HOLD, WHAT?, YOU, UH UH, LIKE, DONE, U
"YOU ARE": YOUR, NEXT, LIKE, UH HUH, WHAT?, DONE, UH UH, HOLD, YOU, U, YOU'RE, SURE, UR, YOU ARE
"YOUR": UH UH, YOU ARE, UH HUH, YOUR, NEXT, UR, SURE, U, YOU'RE, YOU, WHAT?, HOLD, LIKE, DONE
"YOU'RE": YOU, YOU'RE, UR, NEXT, UH UH, YOU ARE, U, YOUR, WHAT?, UH HUH, SURE, DONE, LIKE, HOLD
"UR": DONE, U, UR, UH HUH, WHAT?, SURE, YOUR, HOLD, YOU'RE, LIKE, NEXT, UH UH, YOU ARE, YOU
"U": UH HUH, SURE, NEXT, WHAT?, YOU'RE, UR, UH UH, DONE, U, YOU, LIKE, HOLD, YOU ARE, YOUR
"UH HUH": UH HUH, YOUR, YOU ARE, YOU, DONE, HOLD, UH UH, NEXT, SURE, LIKE, YOU'RE, UR, U, WHAT?
"UH UH": UR, U, YOU ARE, YOU'RE, NEXT, UH UH, DONE, YOU, UH HUH, LIKE, YOUR, SURE, HOLD, WHAT?
"WHAT?": YOU, HOLD, YOU'RE, YOUR, U, DONE, UH UH, LIKE, YOU ARE, UH HUH, UR, NEXT, WHAT?, SURE
"DONE": SURE, UH HUH, NEXT, WHAT?, YOUR, UR, YOU'RE, HOLD, LIKE, YOU, U, YOU ARE, UH UH, DONE
"NEXT": WHAT?, UH HUH, UH UH, YOUR, HOLD, SURE, NEXT, LIKE, DONE, YOU ARE, UR, YOU'RE, U, YOU
"HOLD": YOU ARE, U, DONE, UH UH, YOU, UR, SURE, WHAT?, YOU'RE, NEXT, HOLD, UH HUH, YOUR, LIKE
"SURE": YOU ARE, DONE, LIKE, YOU'RE, YOU, HOLD, UH HUH, UR, SURE, U, WHAT?, NEXT, YOUR, UH UH
"LIKE": YOU'RE, NEXT, U, UR, HOLD, DONE, UH UH, WHAT?, UH HUH, YOU, LIKE, SURE, YOU ARE, YOUR
`;

const lists = {};
const words = [];
raw.split('\n').forEach(line => {
    line = line.trim();
    if (line.length === 0) return;
    const [start, str] = line.split(': ');
    const word = start.substring(1, start.length - 1);
    const list = str.split(', ');
    lists[word] = list.slice(0, Math.min(9, list.indexOf(word) + 1));
    words.push(word);
});
const group1 = words.slice(0, 14);
const group2 = words.slice(14);

const lengths = {};
const g2len = {};
Object.keys(lists).forEach(word => {
    const list = lists[word];
    const len = list.length;
    lengths[len] = (lengths[len] || 0) + 1;
    if (group2.includes(word)) {
        g2len[len] = (g2len[len] || 0) + 1;
    }
});

words.forEach((word, idx) => {
    const slice = idx < 14 ? 14 : 0;
    const partial = words.slice(slice, slice + 14);
    const check = lists[word].filter(w => partial.includes(w));
    if (check.length > 0) {
        console.log(`FAIL ${word}`);
    }
});

function intersect(arr1, arr2) {
    return arr1.filter(w => arr2.includes(w));
}

const lookForU = group2.filter(w => w.startsWith('U'));
const lookForY = group2.filter(w => w.startsWith('Y'));
const lookFor = lookForU.concat(lookForY);

const group2Easy = group2.filter(w => lists[w].length <= 7);
const group2Hard = group2.filter(w => !group2Easy.includes(w));

const countList = {};
group2.forEach(w => {
    countList[w] = group2Hard.filter(t => lists[t].includes(w));
});

const order = group2.slice();
order.sort((a, b) => countList[a].length - countList[b].length);
order.forEach(w => {
    console.log(
        countList[w].length,
        w,
        ' '.repeat(10 - w.length),
        countList[w]
    );
});

console.log(group2Easy);
