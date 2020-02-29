import React from 'react';
import Util from '../../util';
import P from '../paragraph';
import FlexGroup from '../flexGroup';

class Study extends React.Component {
    render() {
        return (
            <div>
                <P className="text-center">
                    <a href={Util.manual(5)} target="_blank">
                        Manual
                    </a>
                </P>
                <P>
                    In simple wires, there are 5 wire colors
                    <ol>
                        <li>(B) Black</li>
                        <li>(U) Blue</li>
                        <li>(R) Red</li>
                        <li>(W) White</li>
                        <li>(Y) Yellow</li>
                    </ol>
                    And 5 condition types (where C specifies the color)
                    <ol>
                        <li>(0C) Zero wires of a certain color</li>
                        <li>(1C) One wire of a certain color</li>
                        <li>(2C) More than one wire of a certain color</li>
                        <li>(LC) Last wire is a certain color</li>
                        <li>Serial number is odd</li>
                    </ol>
                </P>
                <P>
                    When memorizing simple wires, it helped me to separate the
                    conditions from the cut sequences. You are only ever asked
                    to cut a wire in a specific position, or the last wire of a
                    certain color. Here are the cut sequences for each group:
                    <div className="pl-4">
                        {Util.bold('3 wires:')} 23 blue 3
                        <br />
                        {Util.bold('4 wires:')} red 1142
                        <br />
                        {Util.bold('5 wires:')} 4121
                        <br />
                        {Util.bold('6 wires:')} 3464
                    </div>
                    Note that the last cut of each group does not have an
                    associated condition since it only applies if none of the
                    other conditions are met.
                </P>
                <P>
                    Now for memorizing conditions, the first thing to note is
                    for 4-6 wires, the first condition always requires that the
                    serial number is odd, and serial number is odd isn't
                    required by any other conditions. The remaining conditions
                    can be encoded as follows:
                </P>
                <P className="text-center ol-left">
                    <FlexGroup inline={true}>
                        <FlexGroup inline={true} minWidth={100}>
                            <div>
                                {Util.bold('3 wires:')}
                                <ol>
                                    <li>0R</li>
                                    <li>LW</li>
                                    <li>2U</li>
                                </ol>
                            </div>
                            <div>
                                {Util.bold('4 wires:')}
                                <ol>
                                    <li>2R</li>
                                    <li>LY 0R</li>
                                    <li>1U</li>
                                    <li>2Y</li>
                                </ol>
                            </div>
                        </FlexGroup>
                        <FlexGroup inline={true} minWidth={100}>
                            <div>
                                {Util.bold('5 wires:')}
                                <ol>
                                    <li>LB</li>
                                    <li>1R 2Y</li>
                                    <li>0B</li>
                                </ol>
                            </div>
                            <div>
                                {Util.bold('6 wires:')}
                                <ol>
                                    <li>0Y</li>
                                    <li>1Y 2W</li>
                                    <li>0R</li>
                                </ol>
                            </div>
                        </FlexGroup>
                    </FlexGroup>
                </P>
                <P>
                    For 4-wires, you can optionally swap or combine conditions 2
                    and 3 since they both result in cutting the first wire:
                    <div className="pl-4">
                        {Util.bold('4 wires:')}
                        <ol>
                            <li>2R</li>
                            <li>LY 0R {Util.bold('or')} 1U</li>
                            <li>2Y</li>
                        </ol>
                        {Util.bold('Cut sequence:')} red 142
                    </div>
                </P>
                <P>
                    Finally, remember that B = black, U = blue, and 2C is two{' '}
                    {Util.bold('or more')} wires of a certain color.
                </P>
            </div>
        );
    }
}

export default Study;
