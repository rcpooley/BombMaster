import React from 'react';
import P from '../paragraph';
import H from '../heading';
import FlexGroup from '../flexGroup';
import Util from '../../util';

class Study extends React.Component {
    render() {
        const words = {
            'Top Left': ['UR'],
            'Top Right': ['C', 'First', 'Okay'],
            'Middle Left': ['Led', 'Nothing', 'They are', 'Yes'],
            'Middle Right': [
                'Blank',
                'Read',
                'Red',
                'Their',
                'You',
                'Your',
                "You're"
            ],
            'Bottom Left': ['<   >', 'Leed', 'Reed', "They're"],
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

        const group1 = [
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
        const group2 = [
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

        return (
            <div>
                <P className="text-center">
                    <a href={Util.manual(9)} target="_blank">
                        Manual
                    </a>
                </P>
                <P>
                    <H n={1}>Step 1</H>
                    Here are the lists of words sorted by position:
                    <FlexGroup minWidth={120} center={true}>
                        {Object.keys(words).map(p => (
                            <div key={p} className="list-left">
                                <H>{p}</H>
                                <ol>
                                    {words[p].map(w => (
                                        <li key={w}>{w}</li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </FlexGroup>
                    I recommend memorizing the shorter ones first since once you
                    memorize everything except for Bottom Right, you know the
                    words you don't recognize are Bottom Right.
                </P>
                <P className="list-2c">
                    <H n={1}>Step 2</H>
                    There are 28 words that can be split in half into two
                    groups. The word lists for each group of 14 only pull from
                    those 14 words.
                    <P>
                        <H>Group 1</H>
                        <div className="d-flex justify-content-center">
                            <ol>
                                {group1.map(w => (
                                    <li key={w}>{w}</li>
                                ))}
                            </ol>
                        </div>
                        For each word list, I made a sentence where the first
                        letter of each word corresponds to the first letter of
                        the word to press. The first word of the sentence
                        corresponds to the label from step 1. For no/nothing,
                        ready/right, and wait/what, I tried to use the actual
                        word in the sentence since it could be ambiguous for
                        which one to press. I recommend coming up with sentences
                        that are the easiest for you to memorize, here are the
                        ones I use:
                    </P>
                </P>
            </div>
        );
    }
}

export default Study;
