import React from 'react';
import P from '../paragraph';
import H from '../heading';
import FlexGroup from '../flexGroup';

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
        return (
            <div>
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
            </div>
        );
    }
}

export default Study;
