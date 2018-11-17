import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import * as Styles from '../../styles';
import * as Types from '../../../shared/Types';

interface IAboutProps {
    classes: any;
}

interface Injected extends AboutWithStyles {
    rootStore: Types.RootStore;
}

const styles = Styles.wrapStyles(Styles.about);

type AboutWithStyles = IAboutProps & WithStyles<typeof styles>;

@inject('rootStore')
@observer
class About extends React.Component<AboutWithStyles, any> {
    constructor(props: AboutWithStyles) {
        super(props);
    }

    get injected() {
        return this.props as Injected;
    }

    render() {
        return <div>Abouts</div>;
    }
}

export default withStyles(styles)(About);
