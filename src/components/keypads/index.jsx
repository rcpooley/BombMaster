import React from 'react';
import MainContainer from '../mainContainer';
import Study from './study';
import Practice from './practice';

class Keypads extends React.Component {
    render() {
        return (
            <MainContainer id="keypads">
                <Study />
            </MainContainer>
        );
    }
}

export default Keypads;
