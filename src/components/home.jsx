import React from 'react';
import MainContainer from './mainContainer';
import Util from '../util';
import P from './paragraph';

class Home extends React.Component {
    render() {
        return (
            <MainContainer>
                <div>
                    <P>
                        Let's memorize the{' '}
                        <a
                            href="http://www.bombmanual.com/print/KeepTalkingAndNobodyExplodes-BombDefusalManual-v1.pdf"
                            target="_blank"
                        >
                            Bomb Defusal Manual
                        </a>
                        ! On this website I'll describe the techniques I used to
                        help me memorize the modules. Keep in mind that people
                        memorize things in different ways, so use this as a
                        guide but come up with a method that works best for you.
                    </P>
                    <P>
                        {Util.bold('External Resources')}
                        <br />
                        Here's a list of other resources and guides you may find
                        useful.
                        <ul>
                            <li>
                                <a
                                    href="https://www.speedrun.com/ktane/guide/og1el"
                                    target="_blank"
                                >
                                    Narwhal's silly memorization tricks
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.reddit.com/r/ktane/comments/465x6w/how_to_learn_complex_modules_wire_sequences_whos/"
                                    target="_blank"
                                >
                                    How to learn complex modules
                                </a>
                            </li>
                        </ul>
                    </P>
                    <P>
                        {Util.bold('Contact')}
                        <br />
                        Have comments, questions, or feature requests? Send me
                        an email at{' '}
                        <a href="mailto:keeptalkinghandbook@gmail.com">
                            keeptalkinghandbook@gmail.com
                        </a>
                        !
                    </P>
                </div>
            </MainContainer>
        );
    }
}

export default Home;
