import React from 'react';

class FlexGroup extends React.Component {
    render() {
        const {
            children,
            minWidth,
            childClass,
            className,
            inline,
            center,
            space
        } = this.props;
        return (
            <div
                className={`flexGroup${className ? ` ${className}` : ''}${
                    inline ? ' inline' : ''
                }`}
            >
                {children.map(c => (
                    <div
                        className={`${center ? 'flexCenter' : ''}${
                            childClass ? ` ${childClass}` : ''
                        }`}
                        style={{ minWidth }}
                    >
                        {c}
                    </div>
                ))}
            </div>
        );
    }
}

export default FlexGroup;
