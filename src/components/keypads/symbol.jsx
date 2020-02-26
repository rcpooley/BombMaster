import React from 'react';
import Symbols from '../../res/symbols/index';

class Symbol extends React.Component {
    render() {
        let { id, label, selected, incorrect, onClick } = this.props;
        const sym = Symbols[id];
        if (typeof label === 'boolean' && label) {
            label = sym.label;
        }

        return (
            <div className="symbol" onClick={onClick}>
                <div
                    className={`cover${selected ? ' good' : ''}${
                        incorrect ? ' bad' : ''
                    }`}
                />
                <img src={sym.url} />
                {label && <div>{label}</div>}
            </div>
        );
    }
}

export default Symbol;
