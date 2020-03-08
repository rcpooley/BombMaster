import React from 'react';
import Words, { wordLists } from './words';
import P from '../paragraph';
import H from '../heading';
import OptionsBar from '../optionsBar';
import iterate from '../iterate';
import Util from '../../util';

const group1 = Words.group1.map(w => w.toLowerCase());
const group2 = Words.group2.map(w => w.toLowerCase());

class Tester extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            incorrect: null,
            clicked: [],
            group: this.getGroup()
        };
    }

    onNewWord() {
        this.setState({ group: this.getGroup() });
    }

    getGroup() {
        return Util.randomize(
            group1.includes(this.props.item) ? group1 : group2
        );
    }

    clickWord(click) {
        const { item, next } = this.props;
        const { clicked } = this.state;
        const list = wordLists[item];
        if (click === list[clicked.length]) {
            const newClicked = clicked.slice();
            newClicked.push(click);
            if (newClicked.length === 9 || item === click) {
                this.setState({ incorrect: null, clicked: [] }, () =>
                    next(() => this.onNewWord())
                );
            } else {
                this.setState({ clicked: newClicked, incorrect: null });
            }
        } else {
            this.setState({ incorrect: click });
        }
    }

    render() {
        const { item, idx, list } = this.props;
        const { incorrect, clicked, group } = this.state;
        return (
            <P>
                <P className="text-center">
                    {idx + 1}/{list.length}
                </P>
                <P className="displayWord">{item.toUpperCase()}</P>
                <P>
                    <div className="words">
                        {group.map(w => (
                            <div key={w}>
                                <div
                                    className={`whoButton${
                                        w === incorrect ? ' incorrect' : ''
                                    }${clicked.includes(w) ? ' correct' : ''}`}
                                    onClick={() => this.clickWord(w)}
                                >
                                    {w.toUpperCase()}
                                </div>
                            </div>
                        ))}
                        {[...Array(5).keys()].map(i => (
                            <div key={i} className="empty" />
                        ))}
                    </div>
                    <div className="text-center">Click the words in order</div>
                </P>
            </P>
        );
    }
}

class PracticeStep2 extends React.Component {
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
            <div className="practicestep2">
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
                <C />
            </div>
        );
    }
}

export default PracticeStep2;
