import React from 'react';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            learn: true
        };
    }

    renderNavBar() {
        const { learn } = this.state;
        return (
            <div className="learnPracticeBar">
                <div
                    onClick={() => this.setState({ learn: true })}
                    className={learn ? 'active' : ''}
                >
                    Learn
                </div>
                <div
                    onClick={() => this.setState({ learn: false })}
                    className={learn ? '' : 'active'}
                >
                    Practice
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-1 col-md-10 offset-sm-0 col-sm-12">
                        {Array.isArray(this.props.children) ? (
                            <div>
                                {this.renderNavBar()}
                                {this.props.children[this.state.learn ? 0 : 1]}
                            </div>
                        ) : (
                            this.props.children
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContainer;
