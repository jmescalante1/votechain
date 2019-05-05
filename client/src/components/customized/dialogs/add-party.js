import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import CustomizedTextField from '../forms/textfield'
import SubmitButton from '../buttons/submit'
import CancelButton from '../buttons/cancel'
import FormValidator from '../forms/form-validator'

import { addPartyVotechain } from '../../../actions/party'

const styles = theme => ({
  content: {
    width: 500
  },
  label: {
    color: theme.palette.highlight.main,
    fontWeight: 'bold',
    fontSize: 20
  },
  fullWidth: {
    width: '100%',
  },
  legend: {
    color: 'black'
  },
  actions: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})

class AddPartyDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {},
      errors: {},
    }

    this.onEntered = this.onEntered.bind(this)
    this.refreshErrorState = this.refreshErrorState.bind(this)
    this.initFieldState = this.initFieldState.bind(this)

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.validateInputs = this.validateInputs.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onEntered() {
    await this.refreshErrorState()
    await this.initFieldState()
  }

  async refreshErrorState() {
    await this.setState({ errors: {} })
  }

  async initFieldState() {
    await this.setState({ 
      fields: {}
    })
  }
  
  handleFieldChange(field, value) {
    let { fields } = this.state
    fields[field] = value
    this.setState( fields )
  }

  async validateInputs(){
    const { fields } = this.state
    await this.refreshErrorState()

    let { errors } = this.state

    let noOfErrors = 0

    let partyName = fields['partyName']

    if(FormValidator.isEmpty(partyName)){
      errors['partyName'] = 'The party name must not be empty'
      noOfErrors++
    } else if (!FormValidator.validLength(partyName, 1, 32)) {
      errors['partyName'] = 'The party name must contain 1 - 32 characters only'
      noOfErrors++
    }

    this.setState({ errors })

    return noOfErrors
  }

  async onSubmit() {
    const { onClose, addPartyVotechain, votechain, account, electionId } = this.props
    const { fields } = this.state

    let party = {
      electionKey: electionId,
      name: fields['partyName'],
    }

    let noOfErrors = await this.validateInputs()

    if(noOfErrors === 0){
      addPartyVotechain(account, votechain, party)
      onClose()
    }
  }

  render() {
    const { classes, openDialog, onClose } = this.props
    const { errors } = this.state

    return (
      <Dialog
        open={openDialog}
        onClose={onClose}
        onEntered={this.onEntered}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add Party</Typography>
        </DialogTitle>

        <DialogContent
          className={classes.content}
        >
          <Grid 
            container
            direction='column'
            alignItems='center'
            justify='flex-start'
            spacing={16}
          >
            <Grid item>
              <DialogContentText>
                Fill out the form below and click submit to add a new party.
              </DialogContentText>
            </Grid>

            <Grid item className={classes.fullWidth}> 
              <CustomizedTextField 
                id='add-party'
                type='text'
                required
                label='Party Name'
                fullWidth
                variant='outlined'
                autoFocus
                onChange={(event) => this.handleFieldChange('partyName', event.target.value)}
                error={errors['partyName']}
              /> 
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><CancelButton onClick={onClose} /></Grid>

            <Grid item><SubmitButton onClick={this.onSubmit} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  }
}

AddPartyDialog.propTypes = {
  classes: PropTypes.object.isRequired,

  openDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  electionId: PropTypes.number,
};

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  addPartyVotechain
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddPartyDialog))