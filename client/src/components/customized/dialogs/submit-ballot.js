import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Loader from '../progress-bars/loader'

import NoButton from '../buttons/no'
import YesButton from '../buttons/yes'
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
    color: theme.palette.error.main
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
    const { classes, openDialog, handleClickCloseDialog } = this.props
    const { errors, loading } = this.state
    const hasError = errors.length > 0 ? true : false

    return (
      <Dialog
        open={openDialog}
        onExited={this.onExited}
        onEntered={this.onEntered}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Submit Ballot</Typography>
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
                        <div key={index} className={classes.errorText}>
                          You have not voted yet for the following positions: 
                        </div>

                        {error.unselectedPositions.map((unselectedPosition) => {
                          return (
                            <div className={classes.errorText} key={unselectedPosition.id}>{unselectedPosition.name}</div>
                          )
                        })}
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
                
              </div>     
            : <DialogContentText>
                Are you sure you want to submit this ballot? You can only vote once. Please review your ballot.
              </DialogContentText>
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
              <Grid item><YesButton onClick={this.submitBallot} /></Grid>
              
              <Grid item><NoButton onClick={handleClickCloseDialog} /></Grid>
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