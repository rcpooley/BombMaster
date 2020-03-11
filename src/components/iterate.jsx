import React from 'react';
import P from './paragraph';

function iterate(Component, list) {
    class C extends React.Component {
        constructor(props) {
            super(props);

            this.state = this.nextState();
        }

        nextState(restart) {
            const state = this.state || {};
            let strikes = state.strikes || 0;

            let { remaining } = state;
            if (remaining == null) {
                remaining = list.slice();
            }

            if (remaining.length === 0) {
                if (!restart) {
                    return {
                        item: null
                    };
                }
                remaining = list.slice();
                strikes = 0;
            }

            const idx = Math.floor(Math.random() * remaining.length);
            const item = remaining.splice(idx, 1)[0];

            return {
                remaining,
                item,
                strikes
            };
        }

        render() {
            const { item, remaining, strikes } = this.state;

            return (
                <div className="iterate">
                    <P className="text-center">
                        <div className="headerBox">
                            Strikes: <span className="strikes">{strikes}</span>
                            <br />
                            {list.length - remaining.length}/{list.length}
                        </div>
                    </P>
                    {item === null ? (
                        <div className="text-center">
                            <button
                                onClick={() =>
                                    this.setState(this.nextState(true))
                                }
                            >
                                Restart
                            </button>
                        </div>
                    ) : (
                        <Component
                            item={item}
                            next={cb => {
                                const nState = this.nextState(false);
                                this.setState(
                                    nState,
                                    nState.item !== null ? cb : undefined
                                );
                            }}
                            onStrike={() =>
                                this.setState({ strikes: strikes + 1 })
                            }
                            list={list}
                            {...this.props}
                        />
                    )}
                </div>
            );
        }
    }

    return C;
}

export default iterate;
