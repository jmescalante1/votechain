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

import { editElectionVotechain } from '../../../actions/election'

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

class EditElectionDialog extends React.Component {
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
    const { electionToBeEdited } = this.props

    await this.setState({ 
      fields: {
        electionName: electionToBeEdited.name
      } 
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

    let electionName = fields['electionName']

    if(FormValidator.isEmpty(electionName)){
      errors['electionName'] = 'The election name must not be empty'
      noOfErrors++
    } else if (!FormValidator.validLength(electionName, 1, 32)) {
      errors['electionName'] = 'The election name must contain 1 - 32 characters only'
      noOfErrors++
    }
    
    this.setState({ errors })

    return noOfErrors
  }

  async onSubmit() {
    const { editElectionVotechain, account, votechain, handleClickCloseDialog, electionToBeEdited } = this.props
    const { fields } = this.state
    
    let noOfErrors = await this.validateInputs()
    
    if(noOfErrors === 0){
      editElectionVotechain(account, votechain, {id: electionToBeEdited.id, name: fields['electionName']})
      handleClickCloseDialog()
    }
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog, electionToBeEdited } = this.props
    const { errors } = this.state
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
        onEntered={this.onEntered}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Edit Election</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Modify the fields below and click submit to apply changes.
          </DialogContentText>

          <CustomizedTextField
            defaultValue={electionToBeEdited.name}
            classes={{
              root: classes.textField
            }}
            required
            fullWidth={true}
            type='text'
            id='electionName'
            label='Election Name'
            variant='outlined'
            onChange={(event) => this.handleFieldChange('electionName', event.target.value)}
            error={errors['electionName']}
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

EditElectionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  electionToBeEdited: PropTypes.object
}

const mapStateToProps = state => ({
  votechain: state.contract.votechain,
  account: state.account.account
});

const mapDispatchToProps = {
  editElectionVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditElectionDialog))