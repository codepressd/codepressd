import { AppBar, Button, Toolbar } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { observer, inject } from 'mobx-react'

import * as Styles from '../../styles';
import * as Types from '../../../shared/Types';

interface IHeaderProps {
  classes: any;
}

interface Injected extends IHeaderProps {
  rootStore: Types.RootStore
}

const styles = Styles.wrapStyles(Styles.header)

type HeaderWithStyles = IHeaderProps & WithStyles<typeof styles>;

@inject('rootStore')
@observer
class Header extends React.Component<HeaderWithStyles>{
  uiState = this.injected.rootStore.uiState;

  constructor(props: HeaderWithStyles) {
    super(props)
  }

  get injected() {
    return this.props as Injected;
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.wrap} position='static' color='default'>
        <Toolbar className={classes.toolBar}>
          <Button onClick={this.uiState.toggleMenu} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon /> Menu
          </Button>
          <div className={classes.socialIcons}>
            <a href="https://www.instagram.com/little_pappy" target="_blank" className="fa fa-instagram" />
            <a href="https://www.linkedin.com/in/chris-reeder/" target="_blank" className="fa fa-linkedin" />
            <a href="https://github.com/codepressd" target="_blank" className="fa fa-github" />
          </div>
        </Toolbar>
      </AppBar>)
  }
};

export default withStyles(styles)(Header);