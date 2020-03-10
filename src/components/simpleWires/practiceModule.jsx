import React from 'react';
import P from '../paragraph';
import H from '../heading';
import OptionsBar from '../optionsBar';
import Util from '../../util';
import Gen from './gen';

class PracticeModule extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.initState(0);
    }

    initState(wireGroup) {
        const { wires, odd } = Gen.getConfig(wireGroup);
        const cut = Gen.getCut({ wires, odd });

        return {
            wireGroup,
            wires,
            odd,
            cut,
            incorrect: null,
            showSerial: false
        };
    }

    onCut(wire) {
        const { cut, wires, wireGroup } = this.state;

        let correct;
        if (typeof cut === 'string') {
            correct = wires.lastIndexOf(cut) === wire - 1;
        } else {
            correct = wire === cut;
        }

        if (correct) {
            this.setState(this.initState(wireGroup));
        } else {
            this.setState({ incorrect: wire - 1 });
        }
    }

    render() {
        const { wireGroup, wires, odd, incorrect, showSerial } = this.state;
        return (
            <div>
                <P>
                    <H center={true}>Choose a wire group to practice</H>
                    <OptionsBar
                        options={[
                            { id: 0, label: 'All' },
                            { id: 3, label: '3 wires' },
                            { id: 4, label: '4 wires' },
                            { id: 5, label: '5 wires' },
                            { id: 6, label: '6 wires' }
                        ]}
                        selected={wireGroup}
                        onSelect={wireGroup =>
                            this.setState(this.initState(wireGroup))
                        }
                    />
                </P>
                <P>
                    <div className="wiresPanel">
                        {wires.map((c, idx) => (
                            <div
                                key={idx}
                                className={`${c}${
                                    incorrect === idx ? ' incorrect' : ''
                                }`}
                                onClick={() => this.onCut(idx + 1)}
                            >
                                <div>Incorrect</div>
                            </div>
                        ))}
                    </div>
                </P>
                <P className="text-center">
                    {showSerial ? (
                        `Serial number is ${odd ? 'odd' : 'even'}`
                    ) : (
                        <button
                            onClick={() => this.setState({ showSerial: true })}
                        >
                            Check serial
                        </button>
                    )}
                </P>
            </div>
        );
    }
}

export default PracticeModule;
