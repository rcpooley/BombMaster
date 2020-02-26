import React from 'react';
import P from '../paragraph';
import Symbol from './symbol';
import Util from '../../util';
import SETS from './sets';

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
                <P className="text-center">
                    <a href={Util.manual(7)} target="_blank">
                        Manual
                    </a>
                </P>
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
                            <div key={idx}>
                                <strong>Set {idx + 1}</strong>
                                {this.renderSymbols(ids, labs)}
                            </div>
                        ))}
                    </div>
                </P>
            </div>
        );
    }
}

export default Study;
