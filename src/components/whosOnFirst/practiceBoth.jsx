import React from 'react';
import iterate from '../iterate';
import P from '../paragraph';
import H from '../heading';
import Util from '../../util';
import OptionsBar from '../optionsBar';
import Module from './module';
import Words, { wordLists, posMap } from './words';

const group1 = Words.group1.map(w => w.toLowerCase());
const group2 = Words.group2.map(w => w.toLowerCase());

class Tester extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            incorrect: null,
            words: null,
            click: null,
            display: null
        };
    }

    componentDidMount() {
        this.updateWords();
    }

    updateWords() {
        const { item } = this.props;
        const list = wordLists[item];
        const idx = Util.rnd(list.length);
        const click = list[idx];
        const options = (group1.includes(click) ? group1 : group2).slice();
        list.slice(0, idx + 1).forEach(w => {
            options.splice(options.indexOf(w), 1);
        });
        options.splice(options.indexOf(item), 1);
        let words = [];
        if (click !== item) {
            words.push(click);
        }
        while (words.length < 5) {
            words.push(options.splice(Util.rnd(options.length), 1)[0]);
        }
        words = Util.randomize(words);

        const display = Util.randomItem(Object.keys(posMap));
        words.splice(posMap[display], 0, item);

        this.setState({ words, click, incorrect: null, display });
    }

    click(idx) {
        const { next } = this.props;
        const { words, click } = this.state;
        if (words[idx] === click) {
            next(() => this.updateWords());
        } else {
            this.setState({ incorrect: idx });
        }
    }

    render() {
        const { display, words, incorrect } = this.state;

        if (!words) {
            return null;
        }

        return (
            <div>
                <Module
                    display={display}
                    words={words}
                    onClick={idx => this.click(idx)}
                    incorrect={incorrect}
                />
            </div>
        );
    }
}

class PracticeBoth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: null
        };
    }

    render() {
        const { mode } = this.state;

        let group;
        if (mode === '1') {
            group = group1;
        } else if (mode === '2') {
            group = group2;
        } else {
            group = group1.concat(group2);
        }

        const C = iterate(Tester, group);

        return (
            <div>
                <P>
                    <H center={true}>Which group?</H>
                    <OptionsBar
                        options={[
                            { id: 'b', label: 'Both' },
                            { id: '1', label: 'Group 1' },
                            { id: '2', label: 'Group 2' }
                        ]}
                        selected={mode}
                        onSelect={mode => this.setState({ mode })}
                    />
                </P>
                <P>
                    <C />
                </P>
            </div>
        );
    }
}

export default PracticeBoth;
