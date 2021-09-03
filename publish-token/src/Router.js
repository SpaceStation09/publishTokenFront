import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import App from './App';
import Publish from './Publish';
import Sell from './Sell';
import NFTInfo from './NFTInfo';

import SellSingle from './SellSingle';
import BuySingle from './BuySingle';
import Collections from './Collections';
import Spark from './NFTSpark';
const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/publish" component={Publish}/>
            <Route exact path="/sell" component={Sell}/>
            <Route exact path="/sellSingle/:NFTId" component={SellSingle} />
            <Route exact path="/buySingle/:NFTId" component={BuySingle} />
            <Route exact path="/collections" component={Collections}/>
            <Route exact path="/NFT/:id" component={NFTInfo} />
            <Route exact path="/NFT/spark/:id" component={Spark} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;