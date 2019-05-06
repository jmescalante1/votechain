import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchBallotList } from '../../../actions/ballot'
import BulletinTable from './bulletin-table'
import ViewVotesDialog from '../../customized/dialogs/view-votes'

class BulletinTableContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      openViewVotesDialog: false,
      voterAddressToOpen: null
    }

    this.handleOpenViewVotesDialog = this.handleOpenViewVotesDialog.bind(this)
    this.handleCloseViewVotesDialog = this.handleCloseViewVotesDialog.bind(this)
    this.getVoteList = this.getVoteList.bind(this)
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.electionId !== this.props.electionId){
      const { electionId, fetchBallotList, votechain } = this.props
    
      fetchBallotList(votechain, electionId)
    }
  }

  componentDidMount(){
    const { electionId, fetchBallotList, votechain } = this.props
    
    if(electionId){
      fetchBallotList(votechain, electionId)
    }
  }

  handleCloseViewVotesDialog() {
    this.setState({ openViewVotesDialog: false })
  }
  
  handleOpenViewVotesDialog(voterAddress) {
    this.setState({
      openViewVotesDialog: true,
      voterAddressToOpen: voterAddress
    })
  }

  getVoteList(ballotList, voterAddress){
    if(ballotList[voterAddress]){
      return ballotList[voterAddress].voteList
    }
    return []
  }

  render() {
    const { ballotList, electionList, electionId } = this.props
    const { openViewVotesDialog, voterAddressToOpen } = this.state

    return (
      <div>
        <BulletinTable 
          electionList={electionList}
          electionId={electionId}
          ballotList={ballotList}
          handleOpenViewVotesDialog={this.handleOpenViewVotesDialog}
        />
        <ViewVotesDialog 
          openDialog={openViewVotesDialog}
          handleClickCloseDialog={this.handleCloseViewVotesDialog}
          voteList={this.getVoteList(ballotList, voterAddressToOpen)}
          voterAddress={voterAddressToOpen}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  ballotList: state.ballot.ballotList,
  electionList: state.election.electionList,
})

const mapDispatchToProps = {
  fetchBallotList
}

BulletinTableContainer.propTypes = {
  electionId: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(BulletinTableContainer)