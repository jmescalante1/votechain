import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

import Header from './header/header'
import SideBar from './sidebar/sidebar'
import Content from '../content/content'

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
        <CssBaseline />
        <Header 
          handleDrawerToggle={this.props.handleDrawerToggle}
          headerTabs={this.props.headerTabs}
        />
        <Divider />
        <SideBar 
          openDrawer={this.props.openDrawer} 
          sidebarMainOptions={this.props.sidebarMainOptions}
          sidebarSecondaryOptions={this.props.sidebarSecondaryOptions}
          handleSelectedDrawerItem={this.props.handleSelectedDrawerItem}
          selectedDrawerItem={this.props.selectedDrawerItem}
        />
        <Content />
      </div>
    )
  }
  
}

Layout.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  handleSelectedDrawerItem: PropTypes.func.isRequired,
  selectedDrawerItem: PropTypes.string.isRequired,
  headerTabs: PropTypes.arrayOf(PropTypes.object),
  sidebarMainOptions: PropTypes.arrayOf(PropTypes.object),
  sidebarSecondaryOptions: PropTypes.arrayOf(PropTypes.object)
}

export default withStyles(styles, { withTheme: true })(Layout);


