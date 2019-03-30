import React, { Fragment } from 'react'

import ElectionTableToolbar from './election-table-toolbar'
import AddElectionDialog from '../../dialog/add-election-dialog'

class ElectionTableToolbarContainer extends React.Component {
  constructor(){
    super()

    this.state = {
      openDialog: false,
    }

    this.handleClickOpenDialog = this.handleClickOpenDialog.bind(this)
    this.handleClickCloseDialog = this.handleClickCloseDialog.bind(this)
  }

  handleClickOpenDialog() {
    this.setState({ openDialog: true })
  }

  handleClickCloseDialog() {
    this.setState({ openDialog: false })
  }

  render() {
    return(
      <Fragment>
        <ElectionTableToolbar
          handleClickOpenDialog={this.handleClickOpenDialog}
        />
        <AddElectionDialog 
          openDialog={this.state.openDialog}
          handleClickCloseDialog={this.handleClickCloseDialog}
        />
      </Fragment>
    )
  }
}

export default ElectionTableToolbarContainer