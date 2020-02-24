import React from 'react';
import OptionsBar from '../optionsBar';

class ColorInput extends React.Component {
    render() {
        return (
            <OptionsBar
                options={[
                    { id: 'B', label: 'black' },
                    { id: 'U', label: 'blue' },
                    { id: 'R', label: 'red' },
                    { id: 'W', label: 'white' },
                    { id: 'Y', label: 'yellow' }
                ]}
                selected={this.props.value}
                onSelect={this.props.onChange}
            />
        );
    }
}

export default ColorInput;
