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

import CancelButton from '../buttons/cancel'
import SubmitButton from '../buttons/submit'
import CustomizedTextField from '../forms/textfield'

import { editCandidateVotechain } from '../../../actions/candidate'

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
  }
})

class EditCandidateDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      candidateName: ''
    }

    this.editCandidate = this.editCandidate.bind(this)
    this.onChangeCandidateName = this.onChangeCandidateName.bind(this)
  }
  
  editCandidate() {
    const { editCandidateVotechain, account, votechain, handleClickCloseDialog, candidateToBeEdited } = this.props
    const { candidateName } = this.state

    let candidate = {
      candidateKey: candidateToBeEdited.id,
      name: candidateName
    }

    // console.log(candidate)

    editCandidateVotechain(account, votechain, candidate)
    handleClickCloseDialog()
  }

  onChangeCandidateName(event) {
    this.setState({ candidateName: event.target.value })
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Edit Candidate</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Modify the fields below and click submit to apply changes.
          </DialogContentText>

          <CustomizedTextField
            classes={{
              root: classes.textField
            }}
            required
            fullWidth={true}
            type='string'
            id='candidate-name'
            label='Candidate Name'
            variant='outlined'
            onChange={this.onChangeCandidateName}
          />
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><CancelButton onClick={handleClickCloseDialog} /></Grid>

            <Grid item><SubmitButton onClick={this.editCandidate} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

EditCandidateDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  candidateToBeEdited: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  editCandidateVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditCandidateDialog))