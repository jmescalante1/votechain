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

import { addVoterVotechain } from '../../../actions/voter'

const styles = theme => ({
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
  formFields: {
    marginTop: theme.spacing.unit * 2,
  },
  statusName: {
    fontSize: 15
  },
})

class AddVoterDialog extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      voterName: '',
      studentNo: '',
      voterKey: '',
    }

    this.onChangeVoterName = this.onChangeVoterName.bind(this)
    this.onChangeStudentNo = this.onChangeStudentNo.bind(this)
    this.onChangeVoterKey = this.onChangeVoterKey.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeVoterName(event) {
    this.setState({ voterName: event.target.value })
  }

  onChangeStudentNo(event) {
    this.setState({ studentNo: event.target.value })
  }

  onChangeVoterKey(event) {
    this.setState({ voterKey: event.target.value })
  }

  onSubmit() {
    const { handleClickCloseDialog, addVoterVotechain, votechain, web3, electionId } = this.props
    const { voterName, studentNo, voterKey } = this.state

    let voter = {
      electionKey: electionId,
      voterKey,
      studentNo,
      name: voterName,
    }

    addVoterVotechain(web3, votechain, voter)
    handleClickCloseDialog()
  }
  

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
    const {  } = this.props

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add New Voter</Typography>
        </DialogTitle>
        
        <DialogContent >
          <DialogContentText>
          Fill out the form below and click submit to add a new voter.
          </DialogContentText>

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='string'
            id='voter-key'
            label='Voter Key/Address'
            variant='outlined'
            onChange={this.onChangeVoterKey}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='string'
            id='voter-name'
            label='Voter Name'
            variant='outlined'
            onChange={this.onChangeVoterName}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='string'
            id='student-no'
            label="Voter's student number"
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

            <Grid item><SubmitButton onClick={this.onSubmit} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

AddVoterDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  
  electionId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  addVoterVotechain
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddVoterDialog))