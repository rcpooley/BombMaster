import React from 'react';

/**
 * Props: {options: [{id, label}], selected, onSelect, height, inline}
 */
class OptionsBar extends React.Component {
    componentDidMount() {
        const { options, selected, onSelect } = this.props;
        if (!selected) {
            onSelect(this.parseOption(options[0], 0).id);
        }
    }

    parseOption(opt, idx) {
        let id, label;
        if (typeof opt === 'object') {
            id = opt.id;
            label = opt.label;
        } else {
            id = idx;
            label = opt;
        }
        return { id, label };
    }

    render() {
        let { options, selected, onSelect, height, inline } = this.props;

        if (!selected) {
            selected = this.parseOption(options[0], 0).id;
        }

        return (
            <div className={`optionsBar${inline ? ' inline' : ''}`}>
                {options.map((o, idx) => {
                    const { id, label } = this.parseOption(o, idx);
                    return (
                        <div
                            key={id}
                            onClick={() => onSelect(id)}
                            className={id === selected ? 'active' : ''}
                            style={{
                                height: height ? `${height}px` : undefined
                            }}
                        >
                            {label}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default OptionsBar;
