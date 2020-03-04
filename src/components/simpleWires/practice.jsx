import React from 'react';
import OptionsBar from '../optionsBar';
import P from '../paragraph';
import H from '../heading';
import PracticeModule from './practiceModule';
import PracticeConditions from './practiceConditions';

class Practice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: null
        };
    }

    render() {
        const { mode } = this.state;
        return (
            <div>
                <P className="text-center">
                    <H>Mode</H>
                    <OptionsBar
                        options={['Module', 'Conditions']}
                        selected={mode}
                        onSelect={mode => this.setState({ mode })}
                    />
                </P>
                <P>
                    {mode === 0 ? <PracticeModule /> : <PracticeConditions />}
                </P>
            </div>
        );
    }
}

export default Practice;
