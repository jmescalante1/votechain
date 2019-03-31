import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Switch, Route } from 'react-router-dom'

import { headerTabs } from '../layout/header/header-tabs'
import { sidebarMainOptions } from '../layout/sidebar/sidebar-options'
import { sidebarSecondaryOptions } from '../layout/sidebar/sidebar-options'


const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Content extends React.Component {
  render() {
    const { classes } = this.props

    return(
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {headerTabs.map((props) => (
            <Route key={props.label} path={props.path} render={() => props.component} />
          ))}
          {sidebarMainOptions.map((props) => (
            <Route key={props.label} path={props.path} render={() => props.component} />
          ))}
          {sidebarSecondaryOptions.map((props) => (
            <Route key={props.label} path={props.path} render={() => props.component} />
          ))}
        </Switch>
      </main>
    )
  }
}

export default withStyles(styles, { withTheme: true})(Content)