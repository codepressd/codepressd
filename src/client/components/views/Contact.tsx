import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import * as Styles from '../../styles';
import * as Types from '../../../shared/Types';

interface IContactProps {
    classes: any;
}

interface Injected extends ContactWithStyles {
    rootStore: Types.RootStore;
}

const styles = Styles.wrapStyles(Styles.contact);

type ContactWithStyles = IContactProps & WithStyles<typeof styles>;

@inject('rootStore')
@observer
class Contact extends React.Component<ContactWithStyles, any> {
    constructor(props: ContactWithStyles) {
        super(props);
    }

    get injected() {
        return this.props as Injected;
    }

    render() {
        return <div>Contacts</div>;
    }
}

export default withStyles(styles)(Contact);
