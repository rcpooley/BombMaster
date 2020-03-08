export const displayWords = {
    'Top Left': ['UR'],
    'Top Right': ['C', 'First', 'Okay'],
    'Middle Left': ['Led', 'Nothing', 'They are', 'Yes'],
    'Middle Right': ['Blank', 'Read', 'Red', 'Their', 'You', 'Your', "You're"],
    'Bottom Left': ['', 'Leed', 'Reed', "They're"],
    'Bottom Right': [
        'Cee',
        'See',
        'Display',
        'Hold on',
        'Lead',
        'No',
        'Says',
        'There',
        'You are'
    ]
};

export const displayPositions = [
    displayWords['Top Left'],
    displayWords['Top Right'],
    displayWords['Middle Left'],
    displayWords['Middle Right'],
    displayWords['Bottom Left'],
    displayWords['Bottom Right']
];

export const group1 = [
    'Ready',
    'First',
    'No',
    'Blank',
    'Nothing',
    'Yes',
    'What',
    'Uhhh',
    'Left',
    'Right',
    'Middle',
    'Okay',
    'Wait',
    'Press'
].sort();

export const group2 = [
    'You',
    'You are',
    'Your',
    "You're",
    'UR',
    'U',
    'Uh huh',
    'Uh uh',
    'What?',
    'Done',
    'Next',
    'Hold',
    'Sure',
    'Like'
].sort();

export const wordLists = {
    ready: [
        'yes',
        'okay',
        'what',
        'middle',
        'left',
        'press',
        'right',
        'blank',
        'ready'
    ],
    first: [
        'left',
        'okay',
        'yes',
        'middle',
        'no',
        'right',
        'nothing',
        'uhhh',
        'wait'
    ],
    no: [
        'blank',
        'uhhh',
        'wait',
        'first',
        'what',
        'ready',
        'right',
        'yes',
        'nothing'
    ],
    blank: ['wait', 'right', 'okay', 'middle', 'blank'],
    nothing: [
        'uhhh',
        'right',
        'okay',
        'middle',
        'yes',
        'blank',
        'no',
        'press',
        'left'
    ],
    yes: [
        'okay',
        'right',
        'uhhh',
        'middle',
        'first',
        'what',
        'press',
        'ready',
        'nothing'
    ],
    what: ['uhhh', 'what'],
    uhhh: [
        'ready',
        'nothing',
        'left',
        'what',
        'okay',
        'yes',
        'right',
        'no',
        'press'
    ],
    left: ['right', 'left'],
    right: ['yes', 'nothing', 'ready', 'press', 'no', 'wait', 'what', 'right'],
    middle: [
        'blank',
        'ready',
        'okay',
        'what',
        'nothing',
        'press',
        'no',
        'wait',
        'left'
    ],
    okay: ['middle', 'no', 'first', 'yes', 'uhhh', 'nothing', 'wait', 'okay'],
    wait: [
        'uhhh',
        'no',
        'blank',
        'okay',
        'yes',
        'left',
        'first',
        'press',
        'what'
    ],
    press: ['right', 'middle', 'yes', 'ready', 'press'],
    you: [
        'sure',
        'you are',
        'your',
        "you're",
        'next',
        'uh huh',
        'ur',
        'hold',
        'what?'
    ],
    'you are': [
        'your',
        'next',
        'like',
        'uh huh',
        'what?',
        'done',
        'uh uh',
        'hold',
        'you'
    ],
    your: ['uh uh', 'you are', 'uh huh', 'your'],
    "you're": ['you', "you're"],
    ur: ['done', 'u', 'ur'],
    u: [
        'uh huh',
        'sure',
        'next',
        'what?',
        "you're",
        'ur',
        'uh uh',
        'done',
        'u'
    ],
    'uh huh': ['uh huh'],
    'uh uh': ['ur', 'u', 'you are', "you're", 'next', 'uh uh'],
    'what?': [
        'you',
        'hold',
        "you're",
        'your',
        'u',
        'done',
        'uh uh',
        'like',
        'you are'
    ],
    done: [
        'sure',
        'uh huh',
        'next',
        'what?',
        'your',
        'ur',
        "you're",
        'hold',
        'like'
    ],
    next: ['what?', 'uh huh', 'uh uh', 'your', 'hold', 'sure', 'next'],
    hold: [
        'you are',
        'u',
        'done',
        'uh uh',
        'you',
        'ur',
        'sure',
        'what?',
        "you're"
    ],
    sure: [
        'you are',
        'done',
        'like',
        "you're",
        'you',
        'hold',
        'uh huh',
        'ur',
        'sure'
    ],
    like: [
        "you're",
        'next',
        'u',
        'ur',
        'hold',
        'done',
        'uh uh',
        'what?',
        'uh huh'
    ]
};

export default { displayWords, displayPositions, group1, group2, wordLists };
