import React from 'react';
import Util from '../../util';
import FlexGroup from '../flexGroup';
import H from '../heading';
import P from '../paragraph';

export default function Study() {
    return (
        <div id="morseCode">
            <P className="text-center">
                <a href={Util.manual(12)} target="_blank">
                    Manual
                </a>
            </P>
            <H n={1}>Morse Code</H>
            <P>
                The first step of memorizing the morse code module is to learn
                morse code. I'll try to update this page with a tool to help
                with learning morse code, but I just installed a few apps to
                help with learning it.
            </P>
            <H n={1}>Frequencies</H>
            <P>
                There are 16 words and each word corresponds to a frequency. At
                first I only memorized the words and not the frequencies they
                correspond to. As long as you know the words, you can say them
                in your head in order and click through the frequencies.
            </P>
            <P>
                To memorize the words, I grouped them into four groups of four.
            </P>
            <P className="text-center list-left">
                <FlexGroup inline={true}>
                    <FlexGroup inline={true} minWidth={100}>
                        <div>
                            <ul>
                                <li>shell</li>
                                <li>halls</li>
                                <li>slick</li>
                                <li>trick</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>boxes</li>
                                <li>leaks</li>
                                <li>strobe</li>
                                <li>bistro</li>
                            </ul>
                        </div>
                    </FlexGroup>
                    <FlexGroup inline={true} minWidth={100}>
                        <div>
                            <ul>
                                <li>flick</li>
                                <li>bombs</li>
                                <li>break</li>
                                <li>brick</li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>steak</li>
                                <li>sting</li>
                                <li>vector</li>
                                <li>beats</li>
                            </ul>
                        </div>
                    </FlexGroup>
                </FlexGroup>
            </P>
            <P>
                For the first group I memorized "she has slick trick", but for
                the rest of the groups I just memorized the words themselves. I
                also memorized that flick = 3.555 so if I get a word in the
                second set of 8 I don't have to step through the first 8 words
                and can jump directly to that frequency.
            </P>
        </div>
    );
}
