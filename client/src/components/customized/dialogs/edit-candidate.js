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

import PartySelector from '../selectors/party-selector'
import CancelButton from '../buttons/cancel'
import SubmitButton from '../buttons/submit'
import CustomizedTextField from '../forms/textfield'
import FormValidator from '../forms/form-validator'

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
  },
  selector: {
    width: '100%',
    marginTop: 20,
  }
})

class EditCandidateDialog extends React.Component {
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
    const { candidateToBeEdited } = this.props

    await this.setState({ 
      fields: {
        partyId: candidateToBeEdited.partyId,
        candidateName: candidateToBeEdited.name
      } 
    })
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
    const { editCandidateVotechain, account, votechain, handleClickCloseDialog, candidateToBeEdited } = this.props
    const { fields } = this.state

    let candidate = {
      candidateKey: candidateToBeEdited.id,
      name: fields['candidateName'],
      partyKey: fields['partyId']
    }

    let noOfErrors = await this.validateInputs()
    
    if(noOfErrors === 0) {
      editCandidateVotechain(account, votechain, candidate)
      handleClickCloseDialog()
    }
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog, currentPartyList, candidateToBeEdited } = this.props
    const { errors } = this.state
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
        onEntered={this.onEntered}
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
            placeholder={candidateToBeEdited.partyName}
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
            defaultValue={candidateToBeEdited.name}
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

EditCandidateDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  candidateToBeEdited: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain,
  currentPartyList: state.candidate.currentPartyList,
});

const mapDispatchToProps = {
  editCandidateVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditCandidateDialog))