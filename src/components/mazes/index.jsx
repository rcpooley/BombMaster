import React from 'react';
import MainContainer from '../mainContainer';
import Study from './study';
import Practice from './practice';

class Mazes extends React.Component {
    render() {
        return (
            <MainContainer id="mazes">
                <Study />
                <Practice />
            </MainContainer>
        );
    }
}

export default Mazes;
