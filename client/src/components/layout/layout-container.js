import React from 'react'

import Layout from './layout'

class LayoutContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      openDrawer: false,
      selectedDrawerItem: "",
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.handleSelectedDrawerItem = this.handleSelectedDrawerItem.bind(this)
  }

  handleDrawerToggle() {
    this.setState({openDrawer: !this.state.openDrawer})
  }

  handleSelectedDrawerItem(selectedDrawerItem) {
    this.setState({selectedDrawerItem: selectedDrawerItem})
  }

  render() {
    return(
      <Layout 
        handleDrawerToggle={this.handleDrawerToggle}
        handleSelectedDrawerItem={this.handleSelectedDrawerItem}
        selectedDrawerItem={this.state.selectedDrawerItem}
        openDrawer={this.state.openDrawer}
      />
    )
  }
  
}

export default LayoutContainer;