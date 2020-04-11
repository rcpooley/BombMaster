import React from 'react';
import Util from '../../util';
import P from '../paragraph';
import H from '../heading';

class Study extends React.Component {
    render() {
        return (
            <div id="simonSays">
                <P className="text-center">
                    <a href={Util.manual(8)} target="_blank">
                        Manual
                    </a>
                </P>
                <P>
                    For simon says, the color mapping depends on how many
                    strikes you have and whether or not there's a vowel in the
                    serial number. Starting out you really only have to memorize
                    the two mappings for when there are no strikes.
                </P>
                <P>
                    <H n={1}>Vowel, No Strikes</H>
                    Red and Blue are flipped
                    <br />
                    Green and Yellow are flipped
                </P>
                <P>
                    <H n={1}>No Vowel, No Strikes</H>
                    Red, Blue, and Yellow rotate
                    <br />
                    Green is Green
                </P>
                <P>
                    <H n={1}>No Vowel, 1 Strike</H>
                    Blue, Yellow, and Green rotate
                    <br />
                    Red is Red
                </P>
                <P>
                    <H n={1}>Vowel, 1 Strike &amp; No Vowel, 2 Strikes</H>
                    Red and Yellow are flipped
                    <br />
                    Blue and Green are flipped
                </P>
                <P>
                    <H n={1}>Vowel, 2 Strikes</H>
                    Rotate counter-clockwise
                </P>
            </div>
        );
    }
}

export default Study;
