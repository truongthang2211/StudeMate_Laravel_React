import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from '../pages/Home/Home';
import My404 from './My404';

export default class RoutePath extends Component{
    render(){
        return(
            <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/test' component={ <Home linhvuc={"CNTTtét"} />}/>
                        <Route path='*' exact={true} component={My404} />
                    </Switch>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
    <RoutePath />
    , document.getElementById('root')
);