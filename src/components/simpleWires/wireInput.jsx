import React from 'react';
import OptionsBar from '../optionsBar';
import ColorInput from './colorInput';

const DEFAULT_VALUE = '0B';

class WireInput extends React.Component {
    componentDidMount() {
        if (!this.props.value) {
            this.props.onChange(DEFAULT_VALUE);
        }
    }

    change(idx, val) {
        const curVal = this.props.value || DEFAULT_VALUE;
        const v = curVal.split('');
        v[idx] = val;

        if (idx === 0 && (val === 'X' || val === '_')) {
            this.props.onChange(val);
        } else {
            this.props.onChange(v.join(''));
        }
    }

    render() {
        const { onRemove, disableRemove, value } = this.props;

        const state = value || DEFAULT_VALUE;

        return (
            <div>
                <div className="d-inline-flex align-items-center hor-scroll">
                    <div>
                        <div>
                            <div className="smallOpt">
                                <OptionsBar
                                    options={[
                                        { id: '0', label: 'no' },
                                        { id: '1', label: 'exactly one' },
                                        { id: '2', label: 'two or more' },
                                        { id: 'L', label: 'last wire is' },
                                        { id: 'X', label: 'serial is odd' },
                                        { id: '_', label: 'otherwise' }
                                    ]}
                                    selected={state[0]}
                                    onSelect={val => this.change(0, val)}
                                />
                            </div>
                        </div>
                        {state[0] !== 'X' && state[0] !== '_' && (
                            <div className="smallOpt">
                                <ColorInput
                                    value={state[1]}
                                    onChange={val => this.change(1, val)}
                                />
                                {state[0] !== 'L' && (
                                    <div>wire{state[0] === '1' ? '' : 's'}</div>
                                )}
                            </div>
                        )}
                    </div>
                    {!disableRemove && (
                        <div className="pl-2">
                            <button
                                className="btn btn-primary"
                                onClick={onRemove}
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default WireInput;
