import React from 'react';
import Module from './module';
import iterate from '../iterate';
import { posMap } from './words';

class PracticeStep1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            incorrect: null
        };
    }

    click(pos) {
        const { item, next, onStrike } = this.props;
        if (pos === posMap[item]) {
            this.setState({ incorrect: null }, next);
        } else {
            this.setState({ incorrect: pos }, onStrike);
        }
    }

    render() {
        const { item, list } = this.props;
        const { incorrect } = this.state;
        return (
            <div>
                <Module
                    display={item}
                    words={['', '', '', '', '', '']}
                    onClick={idx => this.click(idx)}
                    incorrect={incorrect}
                />
            </div>
        );
    }
}

export default iterate(PracticeStep1, Object.keys(posMap));
