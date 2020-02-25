import React from 'react';

class Paragraph extends React.Component {
    render() {
        const className = (this.props.className || '') + ' myParagraph';
        return <div className={className}>{this.props.children}</div>;
    }
}

export default Paragraph;
