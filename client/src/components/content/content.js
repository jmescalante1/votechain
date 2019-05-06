import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Switch, Route, Redirect } from 'react-router-dom'

import { headerTabs } from '../layout/header/header-tabs'
import { sidebarMainOptions } from '../layout/sidebar/sidebar-options'
import { sidebarSecondaryOptions } from '../layout/sidebar/sidebar-options'

import electionView from '../content/elections/election-view/election-view-route'
import ballotRoute from '../content/ballot/ballot-route'

import ElectionViewContainer from '../content/elections/election-view/election-view-container'
import BallotContainer from '../content/ballot/ballot-container'

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
            <Route exact key={props.label} path={props.path} render={() => props.component} />
          ))}
          {sidebarMainOptions.map((props) => (
            <Route exact key={props.label} path={props.path} render={() => props.component} />
          ))}
          {sidebarSecondaryOptions.map((props) => (
            <Route exact key={props.label} path={props.path} render={() => props.component} />
          ))}
          <Route exact key={electionView.label} path={electionView.path} render={(props) => <ElectionViewContainer location={this.props.location} {...props}/>} />
          <Route exact key={ballotRoute.label} path={ballotRoute.path} render={(props) => <BallotContainer location={this.props.location} {...props}/>} />
          <Redirect to='/home' />
        </Switch>
      </main>
    )
  }
}

export default withStyles(styles, { withTheme: true})(Content)