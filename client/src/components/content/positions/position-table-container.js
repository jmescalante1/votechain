import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

import { fetchCurrentPositionList } from '../../../actions/position'

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
      const { web3, votechain, fetchCurrentPositionList, electionId } = this.props
      fetchCurrentPositionList(web3, votechain, electionId)
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

    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'max-no-of-candidates-to-be-elected', label: 'Max No. of Candidates to be Elected'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <div>
        <PositionTable 
          electionId={electionId}
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
  positionList: state.position.currentPositionList,
  web3: state.web3.web3,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  fetchCurrentPositionList
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionTableContainer)