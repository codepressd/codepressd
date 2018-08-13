import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Logo } from '../svg/Logo';

import * as Styles from '../../styles';

interface IHomePageProps {
    classes: any;
}

interface Injected extends IHomePageProps {
    location: Location;
    history: any;
    match: any;
}

const styles = Styles.wrapStyles(Styles.homePage);

type HomePageWithStyles = IHomePageProps & WithStyles<typeof styles>;

@withRouter
@observer
class HomePage extends React.Component<HomePageWithStyles, any>{

    @observable opacity: boolean = false;

    constructor(props: HomePageWithStyles) {
        super(props);
    }

    get injected() {
        return this.props as Injected
    }

    navigate = (location: string) => (e) => {
        this.opacity = !this.opacity;
        setTimeout(() => {
            this.injected.history.push(location);
        }, 800)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={`${classes.wrap} ${this.opacity && classes.fade}`}>
                <Logo fontSize="74" />
                <div className={classes.navButtons}>
                    <Button onClick={this.navigate('/project')}>Projects</Button>
                    <Button onClick={this.navigate('/about')}>About</Button>
                    <Button onClick={this.navigate('/contact')}>Contact</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(HomePage);