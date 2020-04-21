import React, { Component } from 'react'
import {render} from 'react-dom'
import {HashRouter as Router, Route, Switch,Redirect} from 'react-router-dom'
import App from './App'
import './index.less'

import {mainRoutes} from './routes'
import store from './store'
import {Provider} from 'react-redux'


render(
    <Provider store={store}>
    <Router>
        <Switch>
            <Route path="/admin" render={(routerProps)=>{
                //todo: need login first then access admin page
                return <App {...routerProps}/>
            }}></Route>
            {
                mainRoutes.map(route=>{
                    return <Route key={route.pathname} path={route.pathname} component={route.component} />
                })
            }
            <Redirect to="/admin" from="/" exact/>
            <Redirect to="/404" exact/>
        </Switch>
    </Router>
    </Provider>,
    document.querySelector('#root')
)

