import React from 'react';

class Paragraph extends React.Component {
    render() {
        let className = this.props.className || '';
        className += (className.length > 0 ? ' ' : '') + 'myParagraph';
        return <div className={className}>{this.props.children}</div>;
    }
}

export default Paragraph;
