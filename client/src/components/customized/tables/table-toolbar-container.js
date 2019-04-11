import React, { Fragment } from 'react'

import TableToolbar from './table-toolbar'
import AddElectionDialog from '../../content/elections/dialog/add-election-dialog'

class TableToolbarContainer extends React.Component {
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
        <TableToolbar
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

export default TableToolbarContainer