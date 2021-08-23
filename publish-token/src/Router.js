import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import App from './App';
import Publish from './Publish';
import Buy from './Buy';
import Sell from './Sell';
import NFTInfo from './NFTInfo';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/publish" component={Publish}/>
            <Route exact path="/buy" component={Buy}/>
            <Route exact path="/sell" component={Sell}/>
            <Route exact path="/NFT" component={NFTInfo} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;