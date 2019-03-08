import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

import Header from './header'
import SideBar from './sidebar'
import Content from './content'

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
        <Header handleDrawerToggle={this.props.handleDrawerToggle}/>
        <Divider />
        <SideBar 
          openDrawer={this.props.openDrawer} 
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
}

export default withStyles(styles, { withTheme: true })(Layout);


