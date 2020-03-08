import React from 'react';
import PracticeStep1 from './practiceStep1';
import PracticeStep2 from './practiceStep2';
import OptionsBar from '../optionsBar';
import P from '../paragraph';
import H from '../heading';

class Practice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: null
        };
    }

    render() {
        const { mode } = this.state;

        let step;
        if (mode === '1') {
            step = <PracticeStep1 />;
        } else if (mode === '2') {
            step = <PracticeStep2 />;
        }

        return (
            <div>
                <P>
                    <H center={true}>Which step do you want to practice?</H>
                    <OptionsBar
                        options={[
                            { id: '1', label: 'Step 1' },
                            { id: '2', label: 'Step 2' }
                        ]}
                        selected={mode}
                        onSelect={mode => this.setState({ mode })}
                    />
                </P>
                <P>{step}</P>
            </div>
        );
    }
}

export default Practice;
