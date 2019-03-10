import React from 'react'

import Layout from './layout'
import { headerTabs } from './header/header-tabs'
import { sidebarMainOptions, sidebarSecondaryOptions } from './sidebar/sidebar-options'

class LayoutContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      openDrawer: false,
      selectedMenu: "",
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleSelectedMenu = this.handleSelectedMenu.bind(this)
  }

  handleDrawerToggle() {
    this.setState({openDrawer: !this.state.openDrawer})
  }

  handleSelectedMenu(selectedMenu) {
    this.setState({selectedMenu: selectedMenu})
  }

  render() {
    return(
      <Layout 
        handleDrawerToggle={this.handleDrawerToggle}
        handleSelectedMenu={this.handleSelectedMenu}
        selectedMenu={this.state.selectedMenu}
        openDrawer={this.state.openDrawer}
        headerTabs={headerTabs}
        sidebarMainOptions={sidebarMainOptions}
        sidebarSecondaryOptions={sidebarSecondaryOptions}
      />
    )
  }
  
}

export default LayoutContainer;