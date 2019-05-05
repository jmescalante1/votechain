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
import FormValidator from '../forms/form-validator'

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
      fields: {},
      errors: {},
    }

    this.onEntered = this.onEntered.bind(this)
    this.refreshErrorState = this.refreshErrorState.bind(this)
    this.refreshFieldState = this.refreshFieldState.bind(this)

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

  }

  async onEntered() {
    await this.refreshErrorState()
    await this.refreshFieldState()
  }

  async refreshErrorState() {
    await this.setState({ errors: {} })
  }

  async refreshFieldState() {
    await this.setState({ fields: {} })
  }
  
  handleFieldChange(field, value) {
    let { fields } = this.state
    fields[field] = value
    this.setState( fields )
  }

  async validateInputs(){
    const { fields } = this.state
    const { web3, votechain, electionId } = this.props
    await this.refreshErrorState()

    let { errors } = this.state

    let noOfErrors = 0

    let voterKey = fields['voterKey']

    if(!web3.utils.isAddress(voterKey)){
      errors['voterKey'] = 'Invalid account address'
      noOfErrors++
    } else if ((await votechain.methods.isVoterAt(electionId, voterKey).call())) {
      errors['voterKey'] = 'Already registered as a voter in this election'
      noOfErrors++;
    } else if ((await votechain.methods.isOfficial(voterKey).call())) {
      errors['voterKey'] = 'Already registered as an official'
      noOfErrors++;
    } else if ((await votechain.methods.isAdmin(voterKey).call())) {
      errors['voterKey'] = 'Already registered as an admin'
      noOfErrors++;
    }

    let voterName = fields['voterName']

    if(FormValidator.isEmpty(voterName)){
      errors['voterName'] = 'The voter name must not be empty'
      noOfErrors++
    } else if (!FormValidator.validLength(voterName, 1, 32)) {
      errors['voterName'] = 'The voter name must contain 1 - 32 characters only'
      noOfErrors++
    }
 
    let studentNo = fields['studentNo']

    if(FormValidator.isEmpty(studentNo)){
      errors['studentNo'] = 'The student no must not be empty'
      noOfErrors++
    } else if (!FormValidator.validLength(studentNo, 1, 32)) {
      errors['studentNo'] = 'The student no must contain 1 - 32 characters only'
      noOfErrors++
    }   
    this.setState({ errors })

    return noOfErrors
  }

  async onSubmit() {
    const { handleClickCloseDialog, addVoterVotechain, votechain, account, electionId } = this.props
    const { fields } = this.state

    let voter = {
      electionKey: electionId,
      voterKey: fields['voterKey'],
      studentNo: fields['studentNo'],
      name: fields['voterName'],
    }

    let noOfErrors = await this.validateInputs()

    if(noOfErrors === 0){
      addVoterVotechain(account, votechain, voter)
      handleClickCloseDialog()
    }
  }
  

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
    const { errors } = this.state

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
        onEntered={this.onEntered}
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
            type='text'
            id='voter-key'
            label='Voter Key/Address'
            variant='outlined'
            onChange={(event) => this.handleFieldChange('voterKey', event.target.value)}
            error={errors['voterKey']}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='text'
            id='voter-name'
            label='Voter Name'
            variant='outlined'
            onChange={(event) => this.handleFieldChange('voterName', event.target.value)}
            error={errors['voterName']}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='text'
            id='student-no'
            label="Voter's student number"
            variant='outlined'
            onChange={(event) => this.handleFieldChange('studentNo', event.target.value)}
            error={errors['studentNo']}
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
  
  electionId: PropTypes.number
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain,
  web3: state.web3.web3,
})

const mapDispatchToProps = {
  addVoterVotechain
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddVoterDialog))