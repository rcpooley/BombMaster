import React from 'react';
import MainContainer from '../mainContainer';
import Study from './study';
import Practice from './practice';

class WhosOnFirst extends React.Component {
    render() {
        return (
            <MainContainer id="whosOnFirst">
                <Study />
                <Practice />
            </MainContainer>
        );
    }
}

export default WhosOnFirst;
