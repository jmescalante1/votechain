import React, { Fragment } from 'react'

import TableToolbar from './table-toolbar'
import AddElectionDialog from '../dialogs/add-election'

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
    const { children } = this.props

    return(
      <TableToolbar
        handleClickOpenDialog={this.handleClickOpenDialog}
      />
    )
  }
}


export default TableToolbarContainer