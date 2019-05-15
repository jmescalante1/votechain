import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Loader from '../progress-bars/loader'

import SubmitButton from '../buttons/submit'
import BackButton from '../buttons/back'

import { castBulkVoteVotechain } from '../../../actions/ballot'

const styles = theme => ({
  content: {
    width: 500
  },
  textField: {
    marginTop: 20,
  },
  label: {
    color: theme.palette.highlight.main,
    fontWeight: 'bold',
    fontSize: 20
  },
  actions: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  errorText: {
    color: theme.palette.error.main,
    fontSize: 16
  },
  dialogContentText: {
    fontSize: 16
  },
  section: {
    marginTop: theme.spacing.unit * 2
  },
  columnTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  candidateName: {
    color: '#9e9e9e'
  }
})

class SubmitBallotDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: [],
      loading: true,
    }

    this.submitBallot = this.submitBallot.bind(this)
    this.validateVotes = this.validateVotes.bind(this)
    this.refreshErrorState = this.refreshErrorState.bind(this)
    this.onEntered = this.onEntered.bind(this)
    this.onExited = this.onExited.bind(this)

    this.getCandidateIds = this.getCandidateIds.bind(this)
    this.getVotedCandidatesOf = this.getVotedCandidatesOf.bind(this)
  }

  submitBallot() {
    const { castBulkVoteVotechain, handleClickCloseDialog, candidateKeyList, abstainKeyList } = this.props
    const { account, votechain } = this.props

    castBulkVoteVotechain(account, votechain, candidateKeyList, abstainKeyList)
    handleClickCloseDialog()
  }

  refreshErrorState() {
    this.setState({ errors: [] })
  }

  onEntered() {
    this.validateVotes()
  }

  onExited() {
    const { handleClickCloseDialog } = this.props
    
    this.setState({
      loading: true
    })

    this.refreshErrorState()
    
    handleClickCloseDialog()
  }

  getCandidateIds(position) {
    let candidateIds = []
    
    position.candidateList.forEach((candidate) => {
      candidateIds.push(candidate.id)  
    })

    return candidateIds
  }

  getVotedCandidatesOf(position) {
    const { candidateKeyList, abstainKeyList } = this.props
    let votedCandidates = []
    
    if(abstainKeyList.includes(position.abstainId)){
      votedCandidates.push('Abstain')
    } else {
      position.candidateList.forEach((candidate) => {
        if(candidateKeyList.includes(candidate.id)) {
          votedCandidates.push(candidate.name)
        }
      })
    }

    return votedCandidates
  }

  validateVotes() {
    const { election, candidateKeyList, abstainKeyList } = this.props
    
    let errors = [] 
    let unselectedPositions = []

    // check if there is a position that has not been casted a vote yet
    election.positionList.forEach((position) => {
      let candidateIds = this.getCandidateIds(position)

      if(!abstainKeyList.includes(position.abstainId) && !candidateIds.some(candidateId => candidateKeyList.includes(candidateId))){
        unselectedPositions.push(position)
      }
    })
    
    if(unselectedPositions.length > 0){
      let error = {
        type: 'unselectedPosition',
        unselectedPositions: unselectedPositions
      }
      errors.push(error)
    }

    this.setState({ errors, loading: false })

    return errors.length
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog , election} = this.props
    const { errors, loading } = this.state
    const hasError = errors.length > 0 ? true : false
    console.log(election)

    return (
      <Dialog
        open={openDialog}
        onExited={this.onExited}
        onEntered={this.onEntered}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Review Ballot</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          {loading 
            ? <Loader />
            : hasError 
            ? <div>
                {errors.map((error, index) => {
                  if(error.type === 'unselectedPosition'){
                    return ( 
                      <div key={index}>
                        <Typography key={index} className={classes.errorText}>
                          You have not voted yet for the following positions: 
                        </Typography>

                        {error.unselectedPositions.map((unselectedPosition, index) => {
                          return (
                            <Typography className={classes.errorText} key={unselectedPosition.id}>{'(' + (index + 1) + ') ' + unselectedPosition.name}</Typography>
                          )
                        })}
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
                
              </div>     
            : <div>
                <Typography className={classes.dialogContentText}>Are you sure you want to submit your votes? You can only submit once. Please review your votes.</Typography>
                
                <Grid
                  className={classes.section}
                  container
                  direction='column'
                  alignItems='flex-start'
                  justify='center'
                >
                  <Grid
                    container
                    direction='row'
                    alignItems='center'
                    justify='flex-start'
                  >
                    <Grid item xs={6}><Typography className={classes.columnTitle}>Positions</Typography></Grid>
                    <Grid item xs={6}><Typography className={classes.columnTitle}>Candidates</Typography></Grid>
                  </Grid>

                  {election.positionList.map((position) => {
                    let getVotedCandidates = this.getVotedCandidatesOf(position)
                    
                    return(
                      <Grid
                        key={position.id}
                        container
                        direction='row'
                        alignItems='center'
                        justify='flex-start'
                      >
                        <Grid item xs={6}><Typography>{position.name}</Typography></Grid>
                        
                        <Grid item xs={6}>
                          <Grid
                            container
                            direction='row'
                            alignItems='center'
                            justify='flex-start'
                          >
                            {getVotedCandidates.map((candidateName, index) => {
                              return(
                                <Grid key={index} item>
                                  <Typography className={classes.candidateName} >{candidateName}{index !== getVotedCandidates.length - 1 ? ', ' : ''}</Typography>
                                </Grid>
                              )
                            })}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </div>
          } 
        </DialogContent>

        {!loading && <DialogActions className={classes.actions}>
          {hasError ?
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='flex-start'
            >
              <Grid item><BackButton onClick={handleClickCloseDialog} /></Grid>
            </Grid>
            :
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='space-between'
            >
              <Grid item><BackButton onClick={handleClickCloseDialog} /></Grid>
                
              <Grid item><SubmitButton onClick={this.submitBallot} /></Grid>
            </Grid>
          }
        </DialogActions>}
      </Dialog>
    )
  }
}

SubmitBallotDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  candidateKeyList: PropTypes.arrayOf(PropTypes.number).isRequired,
  abstainKeyList: PropTypes.arrayOf(PropTypes.number).isRequired
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  castBulkVoteVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubmitBallotDialog))