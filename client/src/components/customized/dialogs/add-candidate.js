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
import PositionSelector from '../selectors/position-selector'
import PartySelector from '../selectors/party-selector'
import FormValidator from '../forms/form-validator'

import { addCandidateVotechain } from '../../../actions/candidate'

const styles = theme => ({
  content: {
    width: 500,
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
  selector: {
    width: '100%',
    marginTop: 20,
  }
})

class AddCandidateDialog extends React.Component {
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
    let{ fields } = this.state
    fields[field] = value
    this.setState( fields )
  }

  async validateInputs() {
    const { fields } = this.state
    await this.refreshErrorState()

    let { errors } = this.state

    let noOfErrors = 0

    let positionId = fields['positionId']

    if(FormValidator.isEmpty(positionId)){
      errors['positionId'] = 'A position must be selected'
      noOfErrors++
    } 

    let partyId = fields['partyId']

    if(FormValidator.isEmpty(partyId)){
      errors['partyId'] = 'A party must be selected'
      noOfErrors++
    }

    let candidateName = fields['candidateName']
    
    if(FormValidator.isEmpty(candidateName)) {
      errors['candidateName'] = 'The candidate name must not be empty'
      noOfErrors++
    } else if (!FormValidator.validLength(candidateName, 1, 32)) {
      errors['candidateName'] = 'The candidate name must contain 1 - 32 characters only'
      noOfErrors++
    }

    this.setState({ errors })

    return noOfErrors
  }

  async onSubmit() {
    const { handleClickCloseDialog, addCandidateVotechain, votechain, account } = this.props
    const { fields } = this.state

    let candidate = {
      positionKey: fields['positionId'],
      name: fields['candidateName'],
      partyKey: fields['partyId'],
    }

    let noOfErrors = await this.validateInputs()
    
    if(noOfErrors === 0) {
      addCandidateVotechain(account, votechain, candidate)
      handleClickCloseDialog()
    }
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog, currentPositionList, currentPartyList } = this.props
    const { fields, errors } = this.state

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
        onEntered={this.onEntered}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add New Candidate</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Add new candidate by specifying the name.
          </DialogContentText>

          <PositionSelector 
            classes={{
              root: classes.selector
            }}
            width='85%'
            handlePositionSelectChange={(option) => {
              if(option)
                this.handleFieldChange('positionId', option.value)
              else 
                this.handleFieldChange('positionId', null)
            }}
            positionList={currentPositionList}
            selectedPositionId={fields['positionId']}
            error={errors['positionId']}
          />

          <PartySelector 
            classes={{
              root: classes.selector
            }}
            width='85%'
            handlePartySelectChange={(option) => {
              if(option)
                this.handleFieldChange('partyId', option.value)
              else 
                this.handleFieldChange('partyId', null)
            }}
            partyList={currentPartyList}
            selectedPartyId={fields['partyId']}
            error={errors['partyId']}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField
            }}
            required
            fullWidth
            type='text'
            id='candidateName'
            label='Candidate Name'
            variant='outlined'
            onChange={(event) => this.handleFieldChange('candidateName', event.target.value)}
            error={errors['candidateName']}
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

AddCandidateDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain,
  currentPositionList: state.candidate.currentPositionList,
  currentPartyList: state.candidate.currentPartyList,
})

const mapDispatchToProps = {
  addCandidateVotechain
}

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddCandidateDialog))