import React from 'react';

function iterate(Component, list) {
    class C extends React.Component {
        constructor(props) {
            super(props);

            this.state = this.nextState();
        }

        nextState() {
            let remaining;
            if (this.state) {
                remaining = this.state.remaining;
            }
            if (remaining == null || remaining.length === 0) {
                remaining = list.slice();
            }

            const idx = Math.floor(Math.random() * remaining.length);
            const item = remaining.splice(idx, 1)[0];

            return {
                remaining,
                item
            };
        }

        render() {
            const { item, remaining } = this.state;

            return (
                <Component
                    item={item}
                    next={cb => this.setState(this.nextState(), cb)}
                    idx={list.length - remaining.length - 1}
                    list={list}
                    {...this.props}
                />
            );
        }
    }

    return C;
}

export default iterate;
