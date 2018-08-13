import { Grid } from '@material-ui/core';
import * as React from 'react';
import { Provider } from 'mobx-react';
import { rootStore } from './stores/RootStore';
import { Router } from './router';
// Pages
import Header from './components/Header/Header';
import Menu from './components/Header/Menu';

export const App = () => (
  <Provider rootStore={rootStore}>
    <div>
      <Grid container spacing={24}>
        <Header />
        <Menu />
        <Router />
      </Grid>
    </div>
  </Provider>
);
