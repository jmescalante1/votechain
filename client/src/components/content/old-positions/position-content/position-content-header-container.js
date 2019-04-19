import React, { Component } from 'react';

import PositionContentHeader from './position-content-header'

class PositionContentHeaderContainer extends Component {
  constructor(){
    super()
    
    this.state = {
      openAddPositionDialog: false,
      hasAbstain: false,
    }

    this.handleCloseAddPositionDialog = this.handleCloseAddPositionDialog.bind(this)
    this.handleOpenAddPositionDialog = this.handleOpenAddPositionDialog.bind(this)
    this.handleAbstainCheckboxChange = this.handleAbstainCheckboxChange.bind(this)
  }

  handleCloseAddPositionDialog(){
    this.setState({ openAddPositionDialog: false })
  }

  handleOpenAddPositionDialog() {
    this.setState({ openAddPositionDialog: true })
  }

  handleAbstainCheckboxChange(hasAbstain) {
    this.setState({ hasAbstain })
  }

  render() {
    const { openAddPositionDialog, hasAbstain } = this.state

    return (
      <div>
        <PositionContentHeader 
          openAddPositionDialog={openAddPositionDialog}
          hasAbstain={hasAbstain}

          handleOpenAddPositionDialog={this.handleOpenAddPositionDialog}
          handleCloseAddPositionDialog={this.handleCloseAddPositionDialog}
          handleAbstainCheckboxChange={this.handleAbstainCheckboxChange}
        />
      </div>
    );
  }
}

PositionContentHeaderContainer.propTypes = {
  
};

export default PositionContentHeaderContainer;