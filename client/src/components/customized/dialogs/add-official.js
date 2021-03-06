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

import { addOfficialVotechain } from '../../../actions/official'

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

class AddOfficialDialog extends React.Component {
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
    const { votechain, web3 } = this.props
    await this.refreshErrorState()

    let { errors } = this.state

    let noOfErrors = 0

    let officialKey = fields['officialKey']

    if(!web3.utils.isAddress(officialKey)){
      errors['officialKey'] = 'Invalid account address'
      noOfErrors++
    } else if ((await votechain.methods.isVoter(officialKey).call())) {
      errors['officialKey'] = 'Already registered as a voter'
      noOfErrors++;
    } else if ((await votechain.methods.isOfficial(officialKey).call())) {
      errors['officialKey'] = 'Already registered as an official'
      noOfErrors++;
    } else if ((await votechain.methods.isAdmin(officialKey).call())) {
      errors['officialKey'] = 'Already registered as an admin'
      noOfErrors++;
    }

    let officialName = fields['officialName']

    if(FormValidator.isEmpty(officialName)){
      errors['officialName'] = 'The official name must not be empty'
      noOfErrors++
    } else if (!FormValidator.validLength(officialName, 1, 32)) {
      errors['officialName'] = 'The official name must contain 1 - 32 characters only'
      noOfErrors++
    }
    
    this.setState({ errors })

    return noOfErrors
  }
  

  async onSubmit() {
    const { handleClickCloseDialog, addOfficialVotechain, votechain, account } = this.props
    const { fields } = this.state

    let official = {
      officialKey: fields['officialKey'],
      name: fields['officialName'],
    }

    let noOfErrors = await this.validateInputs()

    if(noOfErrors === 0){
      addOfficialVotechain(account, votechain, official)
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
          <Typography className={classes.label}>Add New Official</Typography>
        </DialogTitle>
        
        <DialogContent >
          <DialogContentText>
          Fill out the form below and click submit to add a new official.
          </DialogContentText>

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='text'
            id='official-key'
            label='Official Key/Address'
            variant='outlined'
            onChange={(event) => this.handleFieldChange('officialKey', event.target.value)}
            error={errors['officialKey']}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='text'
            id='official-name'
            label='Official Name'
            variant='outlined'
            onChange={(event) => this.handleFieldChange('officialName', event.target.value)}
            error={errors['officialName']}
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

AddOfficialDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain,
  web3: state.web3.web3
})

const mapDispatchToProps = {
  addOfficialVotechain
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddOfficialDialog))