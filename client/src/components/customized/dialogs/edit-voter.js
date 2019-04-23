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

import { editVoterVotechain } from '../../../actions/voter'

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

class EditVoterDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      voterName: '',
      studentNo: ''
    }

    this.editVoter = this.editVoter.bind(this)
    this.onChangeVoterName = this.onChangeVoterName.bind(this)
    this.onChangeStudentNo = this.onChangeStudentNo.bind(this)
  }
  
  editVoter() {
    const { editVoterVotechain, account, votechain, handleClickCloseDialog, voterToBeEdited } = this.props
    const { voterName, studentNo } = this.state

    let voter = {
      voterKey: voterToBeEdited.id,
      name: voterName,
      studentNo
    }

    editVoterVotechain(account, votechain, voter)
    handleClickCloseDialog()
  }

  onChangeVoterName(event) {
    this.setState({ voterName: event.target.value })
  }

  onChangeStudentNo(event){
    this.setState({ studentNo: event.target.value })
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Edit Voter</Typography>
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
            id='voter-name'
            label='Voter Name'
            variant='outlined'
            onChange={this.onChangeVoterName}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField
            }}
            required
            fullWidth={true}
            type='string'
            id='student-no'
            label="Voter's Student Number"
            variant='outlined'
            onChange={this.onChangeStudentNo}
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

            <Grid item><SubmitButton onClick={this.editVoter} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

EditVoterDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  voterToBeEdited: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  editVoterVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditVoterDialog))