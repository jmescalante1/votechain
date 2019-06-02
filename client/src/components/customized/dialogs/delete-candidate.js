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

import NoButton from '../buttons/no'
import YesButton from '../buttons/yes'

import { deleteCandidateVotechain } from '../../../actions/candidate'

const styles = theme => ({
  content: {
    width: 500
  },
  section: {
    marginTop: theme.spacing.unit * 2,
  },
  label: {
    color: theme.palette.highlight.main,
    fontWeight: 'bold',
    fontSize: 20
  },
  fieldValue: {
    color: 'black'
  },
  fieldLabel: {
    fontWeight: 'bold'
  },
  actions: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})

class DeleteElectionDialog extends React.Component {
  constructor(props) {
    super(props)

    this.deleteCandidate = this.deleteCandidate.bind(this)
  }

  deleteCandidate() {
    const { deleteCandidateVotechain, handleClickCloseDialog, candidate } = this.props
    const { account, votechain } = this.props
  
    deleteCandidateVotechain(account, votechain, candidate.id)
    handleClickCloseDialog()
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog, candidate } = this.props
    const fieldsToDisplay = [
      {
        label: 'Candidate',
        field: 'name',
      },
      {
        label: 'Position',
        field: 'positionName'
      },
      {
        label: 'Party',
        field: 'partyName'
      },
    ]
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Delete Candidate</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Are you sure you want to delete this candidate?
          </DialogContentText>

          <Grid
            container
            direction='column'
            justify='center'
            alignItems='flex-start'
            className={classes.section}
          >
            {fieldsToDisplay.map((field) => {
              return (
                <Grid item key={field.field} style={{width: '100%'}}> 
                  <Grid 
                    container
                    direction='row'
                    justify='flex-start'
                    alignItems='center'
                  >
                    <Grid item xs={3}><Typography className={classes.fieldLabel}>{field.label}</Typography></Grid>
                    <Grid item xs={9}><Typography className={classes.fieldValue}>{candidate[field.field]}</Typography></Grid>
                  </Grid>
                </Grid>
              )  
            })}
          </Grid>

        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><YesButton onClick={this.deleteCandidate} /></Grid>
            
            <Grid item><NoButton onClick={handleClickCloseDialog} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

DeleteElectionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  candidate: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  deleteCandidateVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeleteElectionDialog))