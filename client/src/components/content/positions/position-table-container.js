import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import PositionTable from './position-table'

class PositionTableContainer extends Component {
  constructor() {
    super()
    
    this.state = {
      openAddPositionDialog: false,
    }

    this.handleCloseAddPositionDialog = this.handleCloseAddPositionDialog.bind(this)
    this.handleOpenAddPositionDialog = this.handleOpenAddPositionDialog.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(this.props.electionId !== prevProps.electionId) {
      
    }
  }

  handleCloseAddPositionDialog() {
    this.setState({ openAddPositionDialog: false })
  }
  
  handleOpenAddPositionDialog() {
    this.setState({ openAddPositionDialog: true })
  }

  render() {
    const { openAddPositionDialog } = this.state
    const { positionList, electionId } = this.props
    console.log(typeof electionId)

    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'position', label: 'Position'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <div>
        <PositionTable 
          headers={headers}
          positionList={positionList}
          openAddPositionDialog={openAddPositionDialog}
          handleOpenAddPositionDialog={this.handleOpenAddPositionDialog}
          handleCloseAddPositionDialog={this.handleCloseAddPositionDialog}
        />
      </div>
    )
  }
}

PositionTableContainer.propTypes = {
  electionId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  positionList: state.election.electionList
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PositionTableContainer)