import React from 'react';
import LedOn from '../../res/led_on.png';
import LedOff from '../../res/led_off.png';
import Star from '../../res/star.png';
import Util from '../../util';
import P from '../paragraph';
import H from '../heading';

class Study extends React.Component {
    renderLegend() {
        return (
            <P>
                <H n={1}>Legend</H>
                <div>
                    <table className="mx-auto">
                        <tbody>
                            <tr>
                                <td>C =</td>
                                <td>Cut</td>
                            </tr>
                            <tr>
                                <td>D =</td>
                                <td>Don't cut</td>
                            </tr>
                            <tr>
                                <td>B =</td>
                                <td>Cut if 2+ batteries</td>
                            </tr>
                            <tr>
                                <td>P =</td>
                                <td>Cut if parallel port</td>
                            </tr>
                            <tr>
                                <td>S =</td>
                                <td>Cut if serial number is even</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </P>
        );
    }

    renderChart() {
        const rows = [
            {
                name: 'White',
                data: 'CCDB'
            },
            {
                name: 'Red',
                data: 'SCBB'
            },
            {
                name: 'Blue',
                data: 'SDPP'
            },
            {
                name: 'RedBlue',
                data: 'SPSD'
            }
        ];

        return (
            <P>
                <table className="wireChart">
                    <tbody>
                        <tr>
                            <td>
                                <div className="placeholder" />
                            </td>
                            <td>
                                <img src={LedOff} />
                                <img className="off" src={Star} />
                            </td>
                            <td>
                                <img src={LedOff} />
                                <img src={Star} />
                            </td>
                            <td>
                                <img src={LedOn} />
                                <img className="off" src={Star} />
                            </td>
                            <td>
                                <img src={LedOn} />
                                <img src={Star} />
                            </td>
                        </tr>
                        {rows.map((r, idx) => (
                            <tr key={idx}>
                                <td>{r.name}</td>
                                {r.data.split('').map((d, idx) => (
                                    <td key={idx}>{d}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </P>
        );
    }

    renderCutList(items) {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6 offset-sm-2 col-sm-8 offset-1 col-10">
                        <ol className="border border-dark text-center">
                            {items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

    renderMemorizing() {
        const sections = [
            {
                name: 'Cut',
                data: this.renderCutList(['White', 'White Star', 'Red Star'])
            },
            {
                name: 'Serial Even',
                data: this.renderCutList([
                    'Red',
                    'Blue',
                    'Red Blue',
                    'LED Red Blue'
                ])
            },
            {
                name: 'Parallel Port',
                data: this.renderCutList([
                    'LED Blue',
                    'LED Blue Star',
                    'Red Blue Star'
                ])
            },
            {
                name: 'Batteries',
                data: this.renderCutList([
                    'LED Red',
                    'LED Red Star',
                    'LED White Star'
                ])
            },
            {
                name: "Don't Cut",
                data: this.renderCutList([
                    'LED White',
                    'Blue Star',
                    'LED Red Blue Star'
                ])
            }
        ];
        return (
            <P>
                <H n={1}>Wires</H>
                {sections.map(s => (
                    <div key={s.name}>
                        <H center={true}>{s.name}</H>
                        {s.data}
                    </div>
                ))}
            </P>
        );
    }

    renderRules() {
        const rules = [
            {
                name: "Cut & Don't Cut",
                data: (
                    <div>
                        It's pretty much just straight memorization, but the two
                        wires that can be memorized together are
                        <div className="text-center">
                            Red Star = Cut
                            <br />
                            Blue Star = Don't Cut
                        </div>
                        Other than that make sure you memorize that White and
                        White Star are cut. It's not as important to memorize
                        the other Don't Cuts since you shouldn't cut a wire if
                        none of the other rules apply, but another easy one to
                        memorize is don't cut when everything is true (LED Red
                        Blue Star).
                    </div>
                )
            },
            {
                name: 'Serial Even',
                data: (
                    <div>
                        This rule applies for wires 1-3. Cut when the color is
                        not white (red, blue, or both) and there is no LED and
                        no star. The Red Blue rule covers the 4th wire.
                    </div>
                )
            },
            {
                name: 'Red Blue',
                data: (
                    <div>
                        From the Serial Even rule we know to cut the Red Blue
                        wire if the serial is even. If the LED is on (with no
                        Star), still cut if the serial is even. Otherwise if
                        there is a Star (with no LED), cut if there's a parallel
                        port.
                    </div>
                )
            },
            {
                name: 'Parallel Port & Batteries',
                data: (
                    <div>
                        I found it easiest to memorize these together. For this
                        rule, the LED must be on and the Star is optional. Just
                        remember:
                        <div className="text-center">
                            Blue = Parallel Port
                            <br />
                            Red = Batteries
                        </div>
                        This covers wires 1-2 for Parallel Port and Batteries.
                        Wire 3 of Parallel Port is covered by the Red Blue rule,
                        and wire 3 of Batteries is an exception that must be
                        memorized.
                    </div>
                )
            }
        ];

        return (
            <P>
                <H n={1}>Memorizing Rules</H>
                {rules.map(s => (
                    <P key={s.name}>
                        <H center={true}>{s.name}</H>
                        {s.data}
                    </P>
                ))}
            </P>
        );
    }

    render() {
        return (
            <div id="complicatedWires">
                <P className="text-center">
                    <a href={Util.manual(13)} target="_blank">
                        Manual
                    </a>
                </P>
                <P>
                    Here is a chart that simplifies the Venn diagram from the
                    manual.
                </P>
                {this.renderChart()}
                {this.renderLegend()}
                {this.renderMemorizing()}
                {this.renderRules()}
            </div>
        );
    }
}

export default Study;
