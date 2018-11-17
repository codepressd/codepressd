import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import * as Styles from '../../styles';
import * as Types from '../../../shared/Types';

const styles = Styles.wrapStyles(Styles.projects);

interface IProjectProps {
    classes: any;
}

interface Injected extends ProjectWithStyles {
    rootStore: Types.RootStore;
}

type ProjectWithStyles = IProjectProps & WithStyles<typeof styles>;

@inject('rootStore')
@observer
class Projects extends React.Component<ProjectWithStyles, any> {
    constructor(props: ProjectWithStyles) {
        super(props);
    }

    get injected() {
        return this.props as Injected;
    }

    render() {
        const { classes } = this.injected;
        return <div className={classes.wrap}>Projects</div>;
    }
}

export default withStyles(styles)(Projects);
