import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import InitiativeDisplay from './InitiativeDisplay';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={ Root } />
            <Route path="/dm/:gameid" component={ DMApp } />
            <Route path="/pc/:pcname/:gameid" component={ PCApp } />
            <Route path="/initiative/:gameid" component={ Initiative } />
        </div>
    </Router>
    ,
    document.getElementById('root')
);

function Root() {
    return <h1>Welcome</h1>;
}

function DMApp( {match} ) {
    return <App gameid={match.params.gameid}/>;
}

function PCApp( {match} ) {
    return <h1>PC {match.params.pcname} {match.params.gameid}</h1>;
}

function Initiative( {match} ) {
    return <InitiativeDisplay gameid={match.params.gameid} />;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
