import React from 'react';
import P from '../paragraph';
import Util from '../../util';
import FlexGroup from '../flexGroup';
import H from '../heading';

class Study extends React.Component {
    render() {
        return (
            <div>
                <P className="text-center">
                    <a href={Util.manual(11)} target="_blank">
                        Manual
                    </a>
                </P>
                <P>
                    For Memory, the rules can refer to buttons by:
                    <ol>
                        <li>(P#) Position</li>
                        <li>(L4) Label = "4"</li>
                        <li>(S#P) Stage 1 &amp; 2 position</li>
                        <li>(S#L) Stage 1-4 label</li>
                    </ol>
                    D# = "display is #"
                </P>
                <P className="text-center">
                    <FlexGroup inline={true} minWidth={110} childClass="mb-2">
                        <div>
                            <H>Stage 1</H>
                            D1 → P2
                            <br />
                            D# → P#
                        </div>
                        <div>
                            <H>Stage 2</H>
                            D2, D4 → S1P
                            <br />
                            D1 → L4
                            <br />
                            D3 → P1
                        </div>
                        <div>
                            <H>Stage 3</H>
                            D1 → S2L
                            <br />
                            D2 → S1L
                            <br />
                            D3 → P3
                            <br />
                            D4 → L4
                        </div>
                        <div>
                            <H>Stage 4</H>
                            D1 → S1P
                            <br />
                            D2 → P1
                            <br />
                            D3, D4 → S2P
                        </div>
                        <div>
                            <H>Stage 5</H>
                            D1 → S1L
                            <br />
                            D2 → S2L
                            <br />
                            D3 → S4L
                            <br />
                            D4 → S3L
                        </div>
                    </FlexGroup>
                </P>
                <P>
                    <H n={1}>Memorizing</H>
                    <P>
                        Stage 1 is pretty straightforward to memorize since
                        display 2-4 → position 2-4. You just need to remember
                        display 1 → position 2.
                    </P>
                    <P>
                        For stage 2, I remember displays 2 and 4 as the "easy"
                        displays since it makes the in-game memorizing easier as
                        there is now only one position to memorize (since stages
                        1 and 2 will have the same position). For displays 3 and
                        1, I remember 314: display 3 → position 1, display 1 →
                        label 4. You can remember this by thinking of pi: 3.14.
                    </P>
                    <P>
                        For stage 3, I remember 3-3-3: stage 3, display 3,
                        position 3. You can then remember display 4, label 4.
                        Then displays 1 and 2 are the labels from 1 and 2, just
                        switched.
                    </P>
                    <P>
                        I remember stage 4 as mostly positions from other
                        stages. Everything before display 2 is stage 1 position,
                        everything after is stage 2 position, and display 2 →
                        position 1.
                    </P>
                    <P>
                        Stage 5 is only labels from other stages. Each display
                        corresponds to which stage the label is from, except 3
                        and 4 are switched
                    </P>
                </P>

                <P>
                    <H n={1}>In-game Memory</H>
                    <P>
                        When you're defusing this module in-game, you need to
                        remember the labels for stages 1-4 and the positions for
                        stages 1-2. I remember this as three 2-digit numbers:
                        <ol>
                            <li>Stage 1 position, stage 2 position</li>
                            <li>Stage 1 label, stage 2 label</li>
                            <li>Stage 4 label, stage 3 label</li>
                        </ol>
                        Notice that for the third number I put stage 4 before
                        stage 3. This makes stage 5 easier for me so I don't
                        have to flip the labels after the display shows. For you
                        it might be easier to remember all the labels
                        individually or as a 4-digit number. Experiment and see
                        what works best for you.
                    </P>
                    <P>
                        In stage 4, once you decide the position of the button
                        to click, you can immediately forget about stage 1 and 2
                        positions and just focus on the labels of the previous
                        stages, so you can complete stage 5 as fast as possible.
                    </P>
                    <P>
                        In stage 2, if you get display 2 or 4, you only have to
                        remember one position since stage 1 and 2 will have the
                        same position.
                    </P>
                </P>
            </div>
        );
    }
}

export default Study;
