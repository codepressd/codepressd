import * as React from 'react'
import { Button } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Logo } from '../svg/Logo';

import * as Styles from '../../styles';

interface ISplashPageProps {
    classes: any;
}

const styles = Styles.wrapStyles(Styles.homePage);

type HomePageWithStyles = ISplashPageProps & WithStyles<typeof styles>;

class HomePage extends React.Component<HomePageWithStyles, any>{
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.wrap}>
                <Logo fontSize="74" />
                <div className={classes.navButtons}>
                    <Button>Projects</Button>
                    <Button>About</Button>
                    <Button>Contact</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);