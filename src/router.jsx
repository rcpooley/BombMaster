import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from './nav';
import Home from './components/home';
import SimpleWires from './components/simpleWires/index';
import Button from './components/button/index';
import Keypads from './components/keypads/index';
import SimonSays from './components/simonSays/index';
import WhosOnFirst from './components/whosOnFirst/index';
import Memory from './components/memory/index';
import ComplicatedWires from './components/complicatedWires/index';
import WireSequence from './components/wireSequence/index';
import Mazes from './components/mazes/index';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [
                { path: '/', name: 'Home', exact: true, component: Home },
                {
                    path: '/simplewires',
                    name: 'Simple Wires',
                    component: SimpleWires,
                },
                {
                    path: '/button',
                    name: 'Button',
                    component: Button,
                },
                {
                    path: '/keypads',
                    name: 'Keypads',
                    component: Keypads,
                },
                {
                    path: '/simonsays',
                    name: 'Simon Says',
                    component: SimonSays,
                },
                {
                    path: '/whosonfirst',
                    name: "Who's on First",
                    component: WhosOnFirst,
                },
                {
                    path: '/memory',
                    name: 'Memory',
                    component: Memory,
                },
                {
                    path: '/complicatedwires',
                    name: 'Complicated Wires',
                    component: ComplicatedWires,
                },
                {
                    path: '/wiresequences',
                    name: 'Wire Sequences',
                    component: WireSequence,
                },
                {
                    path: '/mazes',
                    name: 'Mazes',
                    component: Mazes,
                },
            ],
        };
    }

    render() {
        return (
            <div id="router" className="d-flex flex-column">
                <div>
                    <Nav routes={this.state.routes} />
                </div>
                <div className="flex-grow-1 overflow-auto">
                    <Switch>
                        {this.state.routes.map((r) => (
                            <Route
                                key={r.path}
                                path={r.path}
                                exact={r.exact}
                                component={r.component}
                            />
                        ))}
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Router;
