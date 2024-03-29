import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    Keep Talking Handbook
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        {this.props.routes.map((r) => (
                            <li
                                key={r.path}
                                className={`nav-item`}
                                data-toggle="collapse"
                                data-target=".navbar-collapse.show"
                            >
                                <Link className="nav-link" to={r.path}>
                                    {r.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;
