import React from 'react';
import MainContainer from '../mainContainer';
import Study from './study';

class SimpleWires extends React.Component {
    render() {
        return (
            <MainContainer id="thebutton">
                <Study />
            </MainContainer>
        );
    }
}

export default SimpleWires;
