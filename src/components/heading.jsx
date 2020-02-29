import React from 'react';

class Heading extends React.Component {
    render() {
        const { n, center } = this.props;
        return (
            <div
                className={`myHeading n${n || 4}${
                    center ? ' text-center' : ''
                }`}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Heading;
