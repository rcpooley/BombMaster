import React from 'react';
import P from '../paragraph';
import H from '../heading';
import FlexGroup from '../flexGroup';
import Util from '../../util';
import { displayWords, group1, group2 } from './words';

const empty = '<\u00A0\u00A0\u00A0>';

const group1Sentences = {
    Ready: 'Ready? Yes. Okay what makes little people right? Be ready.',
    First: "First let's order your meal: no- right, nothing. Uhhh wait.",
    No: "No- body understands waiting for what's really right: yes, nothing.",
    Blank: 'Blank wait right on my bike.',
    Nothing: "Nothing's up right on my yacht but no people left",
    Yes: 'Yes okay right: understand my friend what people read: nothing.',
    What: 'Uhhh what',
    Uhhh: "Under-read notes lack what's on your right, no pass",
    Left: 'Right left',
    Right: "Right, you're not readily prepared. No way: what right?",
    Middle: "Mid Brazil reads on what's not perfect, no wait left",
    Okay: 'Okay mom, no friends yelling until nothing waits on',
    Wait: "Wait until no-body's on your left, first press what",
    Press: 'Pressing right makes you ready please'
};

const group2Sentences = {
    You: 'You sure? Are your "you\'re next"\'s hu-urt hot water',
    'You are': 'You are your next live hundred weapons d-uh hold you',
    Your: 'Your [uh are huh]. (your). | Think of a uh sandwich',
    "You're": "You're you. (you're)",
    UR: 'UR-DU (ur)',
    U: "1(U) hundred sacrifices narrate when you're urging under duress",
    'Uh huh': 'Uh huh',
    'Uh uh': "UH: 2(ur), 1(u) 2(you are) 5(You're) next. (uh uh)",
    'What?': "When you hold 5(you're), your 1(u) decision un-leashes art",
    Done: "Down south hun needs what's [your ur you're] hidden leaf",
    Next: "Next what's hu-uh. Your hold sucks. (next)",
    Hold: "Holds are 1(u) & done under you 2(ur) soup water 5(you're)",
    Sure: "SAD (sure, are, done) -ly you're you. Holds hu-urt. (sure)",
    Like: "Like you're nice 1(u) 2(ur) happy dance [uh what huh]"
};

class Study extends React.Component {
    render() {
        return (
            <div>
                <P className="text-center">
                    <a href={Util.manual(9)} target="_blank">
                        Manual
                    </a>
                </P>
                <P>
                    <H n={1}>Step 1</H>
                    Here are the lists of words sorted by position. Note that{' '}
                    {empty} signifies when the display does not show a word.
                    <FlexGroup minWidth={120} center={true}>
                        {Object.keys(displayWords).map(p => (
                            <div key={p} className="list-left">
                                <H>{p}</H>
                                <ol>
                                    {displayWords[p].map(w => (
                                        <li key={w}>{w === '' ? empty : w}</li>
                                    ))}
                                </ol>
                            </div>
                        ))}
                    </FlexGroup>
                    To memorize them, I grouped similar words together and
                    created some rules:
                    <ol>
                        <li>
                            <FlexGroup inline={true}>
                                <table className="whoTable">
                                    <tbody>
                                        <tr>
                                            <td>UR</td>
                                            <td>CFO</td>
                                        </tr>
                                        <tr>
                                            <td>Yes, Led, Nothing</td>
                                            <td>red, you</td>
                                        </tr>
                                        <tr>
                                            <td>eed</td>
                                            <td />
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="pl-2">
                                    <div>
                                        <H>Bottom Left</H>
                                        eed → Leed/Reed
                                    </div>
                                    <div>
                                        <H>Middle Right</H>
                                        red → Red/Read
                                        <br />
                                        you (no spaces) → You/Your/You're (
                                        <strong>not</strong> You are)
                                    </div>
                                </div>
                            </FlexGroup>
                        </li>
                        <li>
                            They are/Their/They're form a triangle:
                            <table className="whoTable">
                                <tbody>
                                    <tr>
                                        <td />
                                        <td />
                                    </tr>
                                    <tr>
                                        <td className="bg">They are</td>
                                        <td className="bg">Their</td>
                                    </tr>
                                    <tr>
                                        <td className="bg">They're</td>
                                        <td />
                                    </tr>
                                </tbody>
                            </table>
                            You can optionally add <strong>There</strong> and
                            make it a square since it's in Bottom Right.
                        </li>
                        <li>
                            The "blanks" (Blank/{empty}):
                            <table className="whoTable">
                                <tbody>
                                    <tr>
                                        <td />
                                        <td />
                                    </tr>
                                    <tr>
                                        <td />
                                        <td className="bg">Blank</td>
                                    </tr>
                                    <tr>
                                        <td className="bg">{empty}</td>
                                        <td />
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                        <li>Everything else is Bottom Right</li>
                    </ol>
                </P>
                <P className="list-2c">
                    <H n={1}>Step 2</H>
                    <P>
                        There are 28 words that can be split in half into two
                        groups. The word lists for each group of 14 only pull
                        from those 14 words.
                    </P>
                    <P>
                        Also remember that you only have to memorize{' '}
                        <a
                            href="https://www.reddit.com/r/ktane/comments/3uirhw/update_on_whos_on_first_memorization_rediscovery/cxgaatu/"
                            target="_blank"
                        >
                            at most the first 9 words
                        </a>{' '}
                        in a word list, and you can also stop when you see the
                        step 1 word itself (For example, for Left only memorize
                        Right, Left).
                    </P>
                    <P>
                        <H>Group 1</H>
                        <div className="d-flex justify-content-center">
                            <ol>
                                {group1.map(w => (
                                    <li key={w}>{w}</li>
                                ))}
                            </ol>
                        </div>
                        For each word list, I made a sentence where the first
                        letter of each word corresponds to the first letter of
                        the word to press. The first word of the sentence
                        corresponds to the label from step 1. For no/nothing,
                        ready/right, and wait/what, I tried to use the actual
                        word or a similar sounding word in the sentence since it
                        could be ambiguous which one I'm referring to. I
                        recommend coming up with sentences that are the easiest
                        for you to memorize, here are the ones I use:
                        <table className="whoSentence">
                            <tbody>
                                {group1.map(w => (
                                    <tr key={w}>
                                        <td>{w}</td>
                                        <td>{group1Sentences[w]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </P>
                    <P>
                        <H>Group 2</H>
                        <div className="d-flex justify-content-center">
                            <ol>
                                {group2.map(w => (
                                    <li key={w}>{w}</li>
                                ))}
                            </ol>
                        </div>
                        For group 2, it is a little more challenging to come up
                        with sentences since there are four words that start
                        with U and four words that start with Y. The other 6
                        words start with different letters, so we have more
                        freedom when choosing words to represent those words.
                        <table className="whoSentence">
                            <tbody>
                                {group2.map(w => {
                                    const [sentence, desc] = group2Sentences[
                                        w
                                    ].split(' | ');
                                    return (
                                        <tr key={w}>
                                            <td>{w}</td>
                                            <td>
                                                {sentence}
                                                {desc && <i> {desc}</i>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </P>
                </P>
            </div>
        );
    }
}

export default Study;
