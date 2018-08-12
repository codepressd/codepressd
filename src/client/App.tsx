import { Grid } from '@material-ui/core';
import * as React from 'react';
import { Provider } from 'mobx-react';
import { rootStore } from './stores/RootStore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from './components/About/About';
// Pages
import Header from './components/Header/Header';
import Menu from './components/Header/Menu';
import HomePage from './components/views/Home';
import { UsersList } from './components/UsersList/UsersList';

export const App = () => (
  <Provider rootStore={rootStore}>
    <BrowserRouter>
      <div>
        <Grid container spacing={24}>
          <Header />
          <Menu />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/about' component={About} />
            <Route path='/users-list' component={UsersList} />
          </Switch>
        </Grid>
      </div>
    </BrowserRouter>
  </Provider>
);
