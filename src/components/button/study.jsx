import React from 'react';
import Util from '../../util';
import P from '../paragraph';
import FlexGroup from '../flexGroup';

class Study extends React.Component {
    render() {
        return (
            <div>
                <P className="text-center">
                    <a href={Util.manual(6)} target="_blank">
                        Manual
                    </a>
                </P>
                <P className="text-center">
                    <FlexGroup inline={true} center={true}>
                        <div className="pl-2 pr-2">
                            <strong>Button colors</strong>
                            <ol>
                                <li>Black</li>
                                <li>Blue</li>
                                <li>Red</li>
                                <li>White</li>
                                <li>Yellow</li>
                            </ol>
                        </div>
                        <div className="pl-2 pr-2">
                            <strong>Strip colors</strong>
                            <ol>
                                <li>Blue</li>
                                <li>Red</li>
                                <li>White</li>
                                <li>Yellow</li>
                            </ol>
                        </div>
                        <div className="pl-2 pr-2">
                            <strong>Labels</strong>
                            <ol>
                                <li>Abort</li>
                                <li>Detonate</li>
                                <li>Hold</li>
                                <li>Press</li>
                            </ol>
                        </div>
                    </FlexGroup>
                </P>
                <P>
                    Similar to simple wires, I recommend memorizing the actions
                    and conditions separately.
                </P>
                <P>
                    <strong>Actions</strong>
                    <div>
                        To memorize the actions, just remember that the actions
                        alternate between hold and press/immediately release,
                        starting with hold.
                    </div>
                </P>
                <P>
                    <strong>Conditions</strong>
                    <div>
                        <ol>
                            <li>Blue, Abort</li>
                            <li>2+ batteries, Detonate</li>
                            <li>White, CAR</li>
                            <li>3+ batteries, FRK</li>
                            <li>Yellow</li>
                            <li>Red, Hold</li>
                        </ol>
                        I recommend coming up with a mnemonic to memorize the
                        conditions. I memorized:
                        <div className="text-center">
                            <strong>
                                "Blue abort, 2 det, white car, 3 fork, yellow,
                                red hold"
                            </strong>
                        </div>
                        After saying it enough times you won't need any tricks
                        to remember it, but at the beginning I imagined a car
                        blowing up for "det white car", and remembered that
                        after 2, you skip a condition and now you're at 3.
                    </div>
                </P>
                <P>
                    <strong>Color Strips</strong>
                    <div>
                        Remember:
                        <ol>
                            <li>Blue = 4</li>
                            <li>Yellow = 5</li>
                            <li>Other = 1</li>
                        </ol>
                    </div>
                </P>
                <P>
                    <strong>Shortcuts</strong>
                    <div>
                        Conditions 2, 4, and 6 result in pressing and
                        immediately releasing the button, while the others
                        result in holding. If you see that there are less than
                        two batteries on the bomb, the only thing you have to
                        check is if the button is "Red Hold". If yes,
                        press/immediately release; otherwise hold.
                    </div>
                </P>
            </div>
        );
    }
}

export default Study;
