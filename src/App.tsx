import React from 'react';

import {
    createStyles,
    withStyles,
    WithStyles
} from '@material-ui/core';

const styles = () => createStyles({
    root: {
    }
});

interface Props extends WithStyles<typeof styles> {
};
interface State {
};

class App extends React.Component<Props, State> {
    //constructor(props: Props) {
    //    super(props);
    //}
    
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                Test
            </div>
        );
    }
}

export default withStyles(styles)(App);
