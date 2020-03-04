import React from 'react';

class FlexGroup extends React.Component {
    render() {
        const {
            children,
            minWidth,
            childClass,
            className,
            inline,
            center
        } = this.props;
        return (
            <div
                className={`flexGroup${className ? ` ${className}` : ''}${
                    inline ? ' inline' : ''
                }`}
            >
                {children.map((c, idx) => (
                    <div
                        key={idx}
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
