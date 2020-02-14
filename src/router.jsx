import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from './nav';
import Home from './components/home';
import Mazes from './components/mazes';
import ComplicatedWires from './components/complicatedWires';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: [
                { path: '/', name: 'Home', exact: true, component: Home },
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
            <div>
                <Nav routes={this.state.routes} />
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
        );
    }
}

export default Router;
