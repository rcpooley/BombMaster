import React from 'react';
import P from '../paragraph';
import Symbol from './symbol';

const SETS = [
    [
        ['magnify', 'at', 'lambda', 'lightning', 'yield', 'hj', 'revc'],
        ['Look', 'at', 'lamb', 'light,', 'stop', 'his', 'cat']
    ],
    [
        [
            'reve',
            'magnify',
            'revc',
            'loopty',
            'emptystar',
            'hj',
            'questionmark'
        ],
        ['Ey', 'look', 'see', 'shooting', 'star', 'huh', '?']
    ]
];

class Study extends React.Component {
    renderSymbols(symbols, labels = []) {
        return (
            <div className="symbolContainer">
                {symbols.map((sym, idx) => (
                    <Symbol key={sym} id={sym} label={labels[idx] || true} />
                ))}
            </div>
        );
    }

    render() {
        return (
            <div>
                <P>
                    There are 6 columns with 7 symbols in each column. In total
                    there are 27 unique symbols.
                </P>
                <P>
                    <strong>12 symbols occur once:</strong>
                    {this.renderSymbols([
                        'at',
                        'copy',
                        'threefizzle',
                        'threeears',
                        'notequals',
                        'revn',
                        'lightning',
                        'comma',
                        'cdot',
                        'filledstar',
                        'ae',
                        'omega'
                    ])}
                    If you see any of these, you can immediately know which set
                    of symbols you're working with.
                </P>
                <P>
                    <strong>The other 15 occur twice:</strong>
                    {this.renderSymbols([
                        'magnify',
                        'yield',
                        'revc',
                        'loopty',
                        'questionmark',
                        'six',
                        'bt',
                        'trident',
                        'lambda',
                        'hj',
                        'reve',
                        'emptystar',
                        'mirroredk',
                        'paragraph',
                        'smiley'
                    ])}
                </P>
                <P>
                    <strong>Memorizing</strong>
                    <p>
                        I recommend comming up with a mnemonic to help memorize
                        the symbols in each set. Here are the ones I use:
                    </p>
                    <div>
                        {SETS.map(([ids, labs], idx) => (
                            <div>
                                <strong>Set {idx + 1}</strong>
                                {this.renderSymbols(ids, labs)}
                            </div>
                        ))}
                    </div>
                    <div>
                        <strong>Sets 3-6</strong>
                        <br />
                        Coming soon
                    </div>
                </P>
            </div>
        );
    }
}

export default Study;
