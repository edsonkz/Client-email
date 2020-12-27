import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import UserEmails from './pages/user_emails';
import SendEmail from './pages/send_email';
import Email from './pages/email_info';
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/user/:username" component={UserEmails}/>
            <Route exact path="/user/:username/sendmail" component={SendEmail}/>
            <Route exact path="/user/:username/:id" component={Email}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;