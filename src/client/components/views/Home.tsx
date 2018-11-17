import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Button } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Logo } from '../svg/Logo';

import * as Styles from '../../styles';
import * as Types from '../../../shared/Types';

interface IHomePageProps {
    classes: any;
}

interface Injected extends IHomePageProps {
    rootStore: Types.RootStore;
}

const styles = Styles.wrapStyles(Styles.homePage);

type HomePageWithStyles = IHomePageProps & WithStyles<typeof styles>;

@inject('rootStore')
@observer
class HomePage extends React.Component<HomePageWithStyles, any> {
    @observable opacity: boolean = true;

    constructor(props: HomePageWithStyles) {
        super(props);
    }

    get injected() {
        return this.props as Injected;
    }

    componentDidMount() {
        setTimeout(() => {
            this.opacity = false;
        }, 300);
    }

    navigate = (location: string) => () => {
        this.opacity = !this.opacity;
        setTimeout(() => {
            this.injected.rootStore.routerStore.push(location);
        }, 800);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={`${classes.wrap} ${this.opacity && classes.fade}`}>
                <Logo />
                <div className={classes.navButtons}>
                    <Button onClick={this.navigate('/projects')}>Projects</Button>
                    <Button onClick={this.navigate('/about')}>About</Button>
                    <Button onClick={this.navigate('/contact')}>Contact</Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HomePage);
