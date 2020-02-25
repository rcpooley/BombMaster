import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from './nav';
import Home from './components/home';
import SimpleWires from './components/simpleWires/index';
import Mazes from './components/mazes/index';
import ComplicatedWires from './components/complicatedWires/index';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [
                { path: '/', name: 'Home', exact: true, component: Home },
                {
                    path: '/simplewires',
                    name: 'Simple Wires',
                    component: SimpleWires
                },
                {
                    path: '/mazes',
                    name: 'Mazes',
                    component: Mazes
                },
                {
                    path: '/complicatedwires',
                    name: 'Complicated Wires',
                    component: ComplicatedWires
                }
            ]
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
                        {this.state.routes.map(r => (
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
