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
    if(prevProps.election !== this.props.election){
      const { election, fetchBallotList, votechain } = this.props
    
      fetchBallotList(votechain, election.id)
    }
  }

  componentDidMount(){
    const { election, fetchBallotList, votechain } = this.props
    
    if(election){
      fetchBallotList(votechain, election.id)
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
    const { ballotList, electionList, election } = this.props
    const { openViewVotesDialog, voterAddressToOpen } = this.state

    return (
      <div>
        <BulletinTable 
          electionList={electionList}
          election={election}
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
  election: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(BulletinTableContainer)