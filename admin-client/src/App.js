import React,{ Component } from 'react';
import '../styles/index.scss';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Layout from './components/layout';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Courses from './components/courses';

import reducers from './reducers';

import reduxThunk from 'redux-thunk';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import {AUTH_USER} from "./actions/types";

export default class App extends Component {

    render() {

        const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
        const store = createStoreWithMiddleware(reducers);

        const token = localStorage.getItem('token');
//if we have a token, consider the user to be signd in
        if (token) {
            //we need to update application state
            store.dispatch({type: AUTH_USER});
        }

        return (

            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={Layout}>
                        <IndexRoute component={Welcome}/>
                        <Route path="signin" component={Signin}/>
                        <Route path="signout" component={Signout}/>
                        <Route path="signup" component={Signup}/>
                        <Route path="courses" component={RequireAuth(Courses)}/>
                    </Route>
                </Router>
            </Provider>
        )
    }
}
