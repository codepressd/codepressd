import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import * as Styles from '../../styles';
import * as Types from '../../../shared/Types';
import * as NewImage from '../../../shared/images/gift.png';

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
class Projects extends React.Component<ProjectWithStyles> {
    get injected() {
        return this.props as Injected;
    }

    render() {
        const { classes } = this.injected;
        return (
            <div className={classes.wrap}>
                <div className={classes.titleWrap}>
                    <p className='title'>Title Goes Here</p>
                    <p className='description'>
                        Description is going to be here. Here is a whole bunch of fake text so that
                        that I can see how I want this to look
                    </p>
                </div>
                <div className={classes.bottomBar}>
                    <div className='leftWrap'>
                        <p className='title'>Another Title</p>
                        <NewImage />
                        <div className='details'>
                            <Details
                                title='Technology Used:'
                                list={['Typescript', 'Javascript', 'React', 'JSS']}
                            />
                            <Details
                                title='Look At The Code:'
                                details={`Unfortunately this is a private repo and can't give external access.`}
                            />
                        </div>
                    </div>
                    <div className='rightWrap'>
                        <p className='title'>Another Title</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Projects);

interface IDetails {
    title: string;
    details?: string;
    github?: string;
    list?: string[];
    classes?: any;
}

type DetailWithStyles = IDetails & WithStyles<typeof styles>;

const Details = withStyles(styles)((props: DetailWithStyles) => {
    return (
        <div className={props.classes.details}>
            <p className='details-title'>{props.title}</p>
            {props.details && <p className='description-wrap'>{props.details}</p>}
            {props.list && (
                <div className='list-wrap'>
                    {props.list.map(listItem => (
                        <p className='list-item'>{`- ${listItem}`}</p>
                    ))}
                </div>
            )}
        </div>
    );
});
