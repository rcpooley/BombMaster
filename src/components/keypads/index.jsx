import React from 'react';
import MainContainer from '../mainContainer';
import Study from './study';
import Practice from './practice';

class Keypads extends React.Component {
    render() {
        return (
            <MainContainer id="keypads">
                <Study />
                <Practice />
            </MainContainer>
        );
    }
}

export default Keypads;
