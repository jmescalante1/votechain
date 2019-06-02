import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Switch, Route, Redirect } from 'react-router-dom'

import { headerTabs } from '../layout/header/header-tabs'
import { sidebarMainOptions } from '../layout/sidebar/sidebar-options'
import { sidebarSecondaryOptions } from '../layout/sidebar/sidebar-options'
import ProtectedRoute from '../../routes/protected'

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
    padding: theme.spacing.unit * 4, 
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
            <Route exact key={props.label} path={props.path} render={(renderProps) => <props.component location={this.props.location} {...renderProps}/>} />
          ))}
          
          {sidebarMainOptions.map((props) => (
            <ProtectedRoute exact key={props.label} roles={props.roles} path={props.path} component={props.component} />
          ))}
          {sidebarSecondaryOptions.map((props) => (
            <ProtectedRoute exact key={props.label} roles={props.roles} path={props.path} component={props.component} />
          ))}
          
          <Redirect to='/home' />
        </Switch>
      </main>
    )
  }
}


export default withStyles(styles, { withTheme: true})(Content)