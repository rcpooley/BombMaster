import React from 'react';

class MainContainer extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 offset-md-1 col-md-10 offset-sm-0 col-sm-12">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContainer;
