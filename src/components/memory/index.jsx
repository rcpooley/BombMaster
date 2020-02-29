import React from 'react';
import MainContainer from '../mainContainer';
import Study from './study';
import Practice from './practice';

class Memory extends React.Component {
    render() {
        return (
            <MainContainer id="memory">
                <Study />
                <Practice />
            </MainContainer>
        );
    }
}

export default Memory;
