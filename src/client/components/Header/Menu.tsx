import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import * as Styles from '../../styles';

interface IMenuProps {
    classes: any;
}

const styles = Styles.wrapStyles(Styles.Menu);

type MenuWithStyles = IMenuProps & WithStyles<typeof styles>;

const Menu: React.SFC<MenuWithStyles> = inject('rootStore')(observer(props => {
    const { classes } = props;
    return (
        <Drawer
            className={classes.wrap}
            open={props.rootStore.uiState.menuOpen}
            anchor='left'
            variant='persistent'
        >
            <a className={classes.menuItem} href='/about'> About </a>
            <a className={classes.menuItem} href='/projects'> Projects </a>
            <a className={classes.menuItem} href='/contact'> Contact </a>
        </Drawer>
    )
}));

export default withStyles(styles)(Menu);
