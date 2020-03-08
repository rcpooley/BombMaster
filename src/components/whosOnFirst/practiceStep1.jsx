import React from 'react';
import Module from './module';
import iterate from '../iterate';
import P from '../paragraph';
import { displayPositions } from './words';

const posMap = {};
displayPositions.forEach((list, idx) => {
    list.forEach(w => (posMap[w] = idx));
});

class PracticeStep1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            incorrect: null
        };
    }

    click(pos) {
        const { item, next } = this.props;
        if (pos === posMap[item]) {
            this.setState({ incorrect: null }, next);
        } else {
            this.setState({ incorrect: pos });
        }
    }

    render() {
        const { item, idx, list } = this.props;
        const { incorrect } = this.state;
        return (
            <div>
                <P className="text-center">
                    {idx + 1}/{list.length}
                </P>
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
