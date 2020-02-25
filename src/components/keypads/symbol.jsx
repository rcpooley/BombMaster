import React from 'react';
import Symbols from '../../res/symbols/index';

class Symbol extends React.Component {
    render() {
        let { id, label } = this.props;
        const sym = Symbols[id];
        if (typeof label === 'boolean' && label) {
            label = sym.label;
        }
        return (
            <div className="symbol">
                <img src={sym.url} />
                {label && <div>{label}</div>}
            </div>
        );
    }
}

export default Symbol;
