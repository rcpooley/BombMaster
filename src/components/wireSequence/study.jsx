import React from 'react';
import Util from '../../util';
import P from '../paragraph';
import H from '../heading';

class Study extends React.Component {
    render() {
        return (
            <div id="wireSequence">
                <P className="text-center">
                    <a href={Util.manual(14)} target="_blank">
                        Manual
                    </a>
                </P>
                <H n={1}>Memorizing</H>
                <P>
                    <P>
                        For wire sequences, I split up each table into chunks to
                        make it easier to memorize.
                    </P>
                    <P>
                        <H>Red</H>
                        <ul>
                            <li>
                                <strong>C, B, A</strong>: Pretty
                                straightforward.
                            </li>
                            <li>
                                <strong>AC, B, AC</strong>: A sandwich, the
                                reverse of the first part of blue.
                            </li>
                            <li>
                                <strong>ABC, AB, B</strong>: I remember that the
                                last row is <strong>B</strong> and we need to
                                get there from the 6th row only changing one
                                letter at a time. So from <strong>AC</strong> we
                                add <strong>B</strong>, then remove{' '}
                                <strong>C</strong>, and finally remove{' '}
                                <strong>A</strong>.
                            </li>
                        </ul>
                    </P>
                    <P>
                        <H>Blue</H>
                        <ul>
                            <li>
                                <strong>B, AC, B</strong>: A sandwich, you can
                                remember that the outsides are{' '}
                                <strong>B</strong> and the inside is everything
                                except <strong>B</strong>.
                            </li>
                            <li>
                                <strong>A, B, BC, C</strong>: I remember{' '}
                                <strong>ABC</strong> except you have{' '}
                                <strong>BC</strong> between <strong>B</strong>{' '}
                                and <strong>C</strong>.
                            </li>
                            <li>
                                <strong>AC, A</strong>: I remember that the last
                                row is <strong>A</strong> and we need to get
                                there from the 7th row only changing one letter
                                at a time. So from <strong>C</strong> we add{' '}
                                <strong>A</strong>, then remove{' '}
                                <strong>C</strong>.
                            </li>
                        </ul>
                    </P>
                    <P>
                        <H>Black</H>
                        <ul>
                            <li>
                                <strong>ABC</strong>: First one is anything.
                            </li>
                            <li>
                                <strong>AC, B, AC, B</strong>: Remember that
                                it's <strong>AC, B</strong> twice.
                            </li>
                            <li>
                                <strong>BC, AB, C, C</strong>: I remember that
                                there were two options for Calc,{' '}
                                <strong>BC</strong> and <strong>AB</strong>, and
                                you get a <strong>C</strong> in both of them.
                            </li>
                        </ul>
                    </P>
                    <P>
                        <H>Observations</H>
                        <ul>
                            <li>
                                The 5th row across all colors is only{' '}
                                <strong>B</strong>.
                            </li>
                            <li>
                                Blue and Black share rows 2 and 3 while Red and
                                Black share rows 4 and 5.
                            </li>
                            <li>
                                The last row for each color is different:{' '}
                                <strong>B, A, C</strong>
                            </li>
                        </ul>
                    </P>
                </P>
                <H n={1}>In-game Memory</H>
                <P>
                    In game, I keep track of the number of occurrences of each
                    color by saying three numbers after each panel. I like to
                    say them in the order that I memorized the colors: Red,
                    Blue, Black. So if you see Blue, Red, Blue in the first
                    panel and click next, say 1, 2, 0 while the next panel is
                    loading.
                </P>
            </div>
        );
    }
}

export default Study;
