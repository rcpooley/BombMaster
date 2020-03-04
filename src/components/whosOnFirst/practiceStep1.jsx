import React from 'react';
import Module from './module';

const WORDS = [
    ['UR'],
    ['C', 'First', 'Okay'],
    ['Led', 'Nothing', 'They are', 'Yes'],
    ['Blank', 'Read', 'Red', 'Their', 'You', 'Your', "You're"],
    [' ', 'Leed', 'Reed', "They're"],
    [
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
];
const posMap = {};
WORDS.forEach((list, idx) => {
    list.forEach(w => (posMap[w] = idx));
});

class PracticeStep1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState() {
        const words = Object.keys(posMap);
        const display = words[Math.floor(Math.random() * words.length)];
        return {
            display,
            incorrect: null
        };
    }

    click(pos) {
        const { display } = this.state;
        if (pos === posMap[display]) {
            this.setState(this.initState());
        } else {
            this.setState({ incorrect: pos });
        }
    }

    render() {
        const { display, incorrect } = this.state;
        return (
            <div>
                <Module
                    display={display}
                    words={['', '', '', '', '', '']}
                    onClick={idx => this.click(idx)}
                    incorrect={incorrect}
                />
            </div>
        );
    }
}

export default PracticeStep1;
