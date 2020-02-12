import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className="text-center">
                Let's memorize the{' '}
                <a
                    href="http://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf"
                    target="_blank"
                >
                    Bomb Defusal Manual
                </a>
                !
                <br />
                More modules will be added over time
            </div>
        );
    }
}

export default Home;
