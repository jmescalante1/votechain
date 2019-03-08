import React from 'react'

import Layout from './layout'

class LayoutContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      openDrawer: false
    }

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  handleDrawerToggle() {
    this.setState({openDrawer: !this.state.openDrawer})
    console.log('toggle drawer')
  }

  render() {
    return(
      <Layout 
        handleDrawerToggle={this.handleDrawerToggle}
        openDrawer={this.state.openDrawer}
      />
    )
  }
  
}

export default LayoutContainer;