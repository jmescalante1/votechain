import React, { Fragment } from 'react'
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

import Warning from '@material-ui/icons/WarningTwoTone'

import NoButton from '../buttons/no'
import YesButton from '../buttons/yes'
import BackButton from '../buttons/back'

import { startElectionVotechain, fetchElectionDetails } from '../../../actions/election'

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
  dialogContextTextIcon: {
    fontSize: 24, 
    color: '#b71c1c', 
    verticalAlign: -5, 
    marginRight: theme.spacing.unit
  },
  dialogContentText: {
    marginLeft: theme.spacing.unit
  },
})

class StartElectionDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validElection: false,
      hasValidated: false,
    }

    this.startElection = this.startElection.bind(this)
    this.validateElection = this.validateElection.bind(this)
    this.onEntered = this.onEntered.bind(this)
  }

  startElection() {
    const { startElectionVotechain, handleClickCloseDialog, electionToStart } = this.props
    const { account, votechain } = this.props
    const { validElection } = this.state
    
    if(validElection){
      startElectionVotechain(account, votechain, electionToStart.id)
      handleClickCloseDialog()
    } 
  }

  async onEntered() {
    const { votechain, electionToStart, fetchElectionDetails } = this.props
    await fetchElectionDetails(votechain, electionToStart.id)
    
    this.validateElection()
  }

  validateElection() {
    const { electionDetails } = this.props
    
    if(electionDetails.noOfPositions > 0 && electionDetails.noOfCandidates > 0 && electionDetails.noOfVoters > 1){
      this.setState({ validElection: true })
    } else {
      // this.setState({ validElection: false })
      
      this.setState({ validElection: true })
    }

    this.setState({ hasValidated: true })
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
    const { validElection, hasValidated } = this.state

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
        onEntered={this.onEntered}
      >
        {!hasValidated ? '' :
          <Fragment>
            <DialogTitle disableTypography>
              <Typography className={classes.label}>Start Election</Typography>
            </DialogTitle>
            
            <DialogContent 
              className={classes.content}
            >
              {validElection ?
                <DialogContentText>
                  Are you sure you want to start this election?
                  You can no longer make any changes to its details including positions, candidates, and voters.
                </DialogContentText>
                :
                <DialogContentText>    
                  <Warning className={classes.dialogContextTextIcon}/>
                  The election cannot be started. Make sure that the election has at least one position, one candidate, and two voters.
                </DialogContentText>
              }
            </DialogContent>
          
            <DialogActions className={classes.actions}>
              {validElection ? 
                <Grid
                  container
                  direction='row'
                  alignItems='center'
                  justify='space-between'
                >
                  <Grid item><YesButton onClick={this.startElection} /></Grid>
                  
                  <Grid item><NoButton onClick={handleClickCloseDialog} /></Grid>
                </Grid>
                :
                <Grid
                  container
                  direction='row'
                  alignItems='center'
                  justify='flex-start'
                >
                  <Grid item><BackButton onClick={handleClickCloseDialog} /></Grid>
                </Grid>
              }
            </DialogActions>
          </Fragment>
        }
      </Dialog>   
    )
  }
}

StartElectionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  electionToStart: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain,
  account: state.account.account,
  electionDetails: state.election.electionDetails
});

const mapDispatchToProps = {
  startElectionVotechain,
  fetchElectionDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StartElectionDialog))