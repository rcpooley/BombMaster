import React from 'react';
import P from '../paragraph';
import H from '../heading';
import OptionsBar from '../optionsBar';
import rawSets from './sets';
import Util from '../../util';
import Symbol from './symbol';

const SETS = rawSets.map(([ids, _]) => ids);

class Practice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numSymbols: 4,
            currentSet: null,
            symbols: null,
            selected: null,
            incorrect: null
        };
    }

    componentDidMount() {
        this.nextQuestion();
    }

    onSelect(numSymbols) {
        this.setState({ numSymbols }, () => this.nextQuestion());
    }

    nextQuestion() {
        const { numSymbols } = this.state;

        const currentSet = Util.rnd(SETS.length);
        const available = SETS[currentSet].slice();
        const symbols = [];
        for (let i = 0; i < numSymbols; i++) {
            const idx = Util.rnd(available.length);
            symbols.push(available.splice(idx, 1)[0]);
        }

        this.setState({
            currentSet,
            symbols,
            selected: [],
            incorrect: null
        });
    }

    selectSymbol(id) {
        const { currentSet, symbols, selected, numSymbols } = this.state;
        if (selected.includes(id)) {
            return;
        }
        const set = SETS[currentSet];
        const lastIdx =
            selected.length > 0
                ? Math.max(...selected.map(id => set.indexOf(id)))
                : -1;
        let nextID = null;
        for (let i = lastIdx + 1; i < set.length; i++) {
            if (symbols.includes(set[i])) {
                nextID = set[i];
                break;
            }
        }

        if (id === nextID) {
            if (selected.length === numSymbols - 1) {
                this.nextQuestion();
            } else {
                const sel = selected.slice();
                sel.push(id);
                this.setState({ selected: sel, incorrect: null });
            }
        } else {
            this.setState({ incorrect: id });
        }
    }

    renderSymbols() {
        const { symbols, selected, incorrect } = this.state;
        if (!symbols) {
            return;
        }

        const row2 = symbols.slice(0, symbols.length / 2);
        const row1 = symbols.slice(symbols.length / 2);

        const Sym = id => (
            <Symbol
                key={id}
                id={id}
                selected={selected.includes(id)}
                incorrect={incorrect === id}
                onClick={() => this.selectSymbol(id)}
            />
        );

        return (
            <P className="text-center">
                <div className="symbolLine">{row1.map(sym => Sym(sym))}</div>
                <div className="symbolLine">{row2.map(sym => Sym(sym))}</div>
            </P>
        );
    }

    render() {
        const { numSymbols, incorrect } = this.state;
        return (
            <div>
                <P>
                    <H center={true}>How many symbols do you want to see?</H>
                    <OptionsBar
                        options={[
                            { id: 4, label: '4' },
                            { id: 5, label: '5' },
                            { id: 6, label: '6' },
                            { id: 7, label: '7' }
                        ]}
                        onSelect={numSymbols => this.onSelect(numSymbols)}
                        selected={numSymbols}
                    />
                </P>
                {this.renderSymbols()}
            </div>
        );
    }
}

export default Practice;
