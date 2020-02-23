import React from 'react';

class KeyListener extends React.Component {
    constructor(props) {
        super(props);

        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyPress, false);
    }

    onKeyPress(e) {
        this.props.onKeyPress(e);
    }

    render() {
        return null;
    }
}

export default KeyListener;
