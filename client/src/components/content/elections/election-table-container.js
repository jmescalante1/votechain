import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import ElectionTable from '../elections/election-table'
import EditElectionDialog from '../../customized/dialogs/edit-election'

import { fetchElectionList } from '../../../actions/election'

class ElectionTableContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openAddElectionDialog: false,
      openEditElectionDialog: false,
      idOfElectionToBeEdited: null
    }

    this.handleOpenAddElectionDialog = this.handleOpenAddElectionDialog.bind(this)
    this.handleCloseAddElectionDialog = this.handleCloseAddElectionDialog.bind(this)
    
    this.handleOpenEditElectionDialog = this.handleOpenEditElectionDialog.bind(this)
    this.handleCloseEditElectionDialog = this.handleCloseEditElectionDialog.bind(this)
  }

  componentDidMount(){
    const { fetchElectionList, web3, votechain } = this.props
    if(web3 && votechain)
      fetchElectionList(web3, votechain)
  }

  handleOpenAddElectionDialog() {
    this.setState({ openAddElectionDialog: true })
  }

  handleCloseAddElectionDialog() {
    this.setState({ openAddElectionDialog: false })
  }

  handleOpenEditElectionDialog(electionId) {
    this.setState({ 
      openEditElectionDialog: true, 
      idOfElectionToBeEdited: electionId
    })
  }

  handleCloseEditElectionDialog() {
    this.setState({ openEditElectionDialog: false })
  }

  render() {
    const { openAddElectionDialog, openEditElectionDialog, idOfElectionToBeEdited } = this.state
    const { electionList } = this.props

    const headers = [
      {id: 'id', label: 'Election Key'},
      {id: 'name', label: 'Name'},
      {id: 'status', label: 'Status'},
      {id: 'action', label: 'Action'},
    ]

    return (
      <Fragment>
        <ElectionTable 
          headers={headers}
          data={electionList}
          
          openDialog={openAddElectionDialog}
          handleCloseAddElectionDialog={this.handleCloseAddElectionDialog}
          handleOpenAddElectionDialog={this.handleOpenAddElectionDialog}

          handleOpenEditElectionDialog={this.handleOpenEditElectionDialog}
        />
        <EditElectionDialog 
          openDialog={openEditElectionDialog}
          handleClickCloseDialog={this.handleCloseEditElectionDialog}
          idOfElectionToBeEdited={idOfElectionToBeEdited}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain,
  electionList: state.election.electionList 
});

const mapDispatchToProps = {
  fetchElectionList
}

export default connect(mapStateToProps, mapDispatchToProps)(ElectionTableContainer)