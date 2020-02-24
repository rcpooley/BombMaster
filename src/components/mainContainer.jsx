import React from 'react';
import OptionsBar from './optionsBar';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        };
    }

    renderNavBar() {
        const { selected } = this.state;
        return (
            <OptionsBar
                options={['Learn', 'Practice']}
                selected={selected}
                onSelect={selected => this.setState({ selected })}
                height={50}
            />
        );
    }

    render() {
        return (
            <div className="container" id={this.props.id}>
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-1 col-md-10 offset-sm-0 col-sm-12">
                        {Array.isArray(this.props.children) ? (
                            <div>
                                {this.renderNavBar()}
                                {this.props.children[this.state.selected]}
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
