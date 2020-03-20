import React from 'react';
import MainContainer from '../mainContainer';
import Study from './study';
import Practice from './practice';

class SimpleWires extends React.Component {
    render() {
        return (
            <MainContainer id="thebutton">
                <Study />
                <Practice />
            </MainContainer>
        );
    }
}

export default SimpleWires;
