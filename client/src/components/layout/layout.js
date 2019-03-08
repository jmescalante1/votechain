import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles';

import Header from './header'
import SideBar from './sidebar'

const styles = theme => ({
  root: {
    display: 'flex'
  }
})

class Layout extends React.Component {
  render() {
    const { classes }  = this.props

    return(
      <div className={classes.root}>
        <Header handleDrawerToggle={this.props.handleDrawerToggle}/>
        <Divider />
        <SideBar openDrawer={this.props.openDrawer} />
      </div>
    )
  }
  
}

Layout.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(Layout);


