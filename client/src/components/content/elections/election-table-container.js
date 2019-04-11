import React, { Component } from 'react'

import ElectionTable from '../elections/election-table'

import electionData from '../elections/election-table/election-data'

class ElectionTableContainer extends Component {
  constructor(props) {
    super(props)

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
    const { openDialog } = this.state

    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'status', label: 'Status'},
      {id: 'action', label: 'Action'},
    ]

    return (
      <ElectionTable 
        headers={headers}
        data={electionData}
        
        openDialog={openDialog}
        handleClickCloseDialog={this.handleClickCloseDialog}
        handleClickOpenDialog={this.handleClickOpenDialog}
      />
    )
  }
}

export default ElectionTableContainer