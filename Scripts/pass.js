const raw = `about after again below could
every first found great house
large learn never other place
plant point right small sound
spell still study their there
these thing think three water
where which world would write`;

const words = raw
    .replace(/\n/g, ' ')
    .split(' ')
    .map(w => w.trim());

const starts = [];

const second = {};
words.forEach(w => {
    const c = w[1];
    if (!(c in second)) {
        second[c] = [];
    }
    const a = w[0];
    if (!second[c].includes(a)) {
        second[c].push(a);
    }
    if (!starts.includes(a)) {
        starts.push(a);
    }
});

console.log(starts);
console.log(second);
