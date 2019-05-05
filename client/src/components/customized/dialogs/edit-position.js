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
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'

import CancelButton from '../buttons/cancel'
import SubmitButton from '../buttons/submit'
import CustomizedTextField from '../forms/textfield'
import FormValidator from '../forms/form-validator'

import { editPositionVotechain } from '../../../actions/position'

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

class EditPositionDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      maxNoCandidatesTextField: {
        value: '',
        errorMessage: null,
      },
      positionTextField: {
        value: '',
        errorMessage: null,
      },
      hasAbstain: props.positionToBeEdited.hasAbstain,
    }

    this.onChangePositionName = this.onChangePositionName.bind(this)
    this.onChangeMaxNoOfCandidatesThatCanBeSelected = this.onChangeMaxNoOfCandidatesThatCanBeSelected.bind(this)
    this.handleAbstainCheckboxChange = this.handleAbstainCheckboxChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidUpdate(prevProps){
    if(prevProps.positionToBeEdited !== this.props.positionToBeEdited){
      const { positionToBeEdited } = this.props

      let positionName = positionToBeEdited.name
      let maxNoOfCandidatesThatCanBeSelected = positionToBeEdited.maxNoOfCandidatesThatCanBeSelected 
      let hasAbstain =  positionToBeEdited.hasAbstain

      this.setState( prevState => ({ 
        positionTextField: {
          ...prevState.positionTextField,
          value: positionName,
        },
        maxNoCandidatesTextField: {
          ...prevState.positionTextField,
          value: maxNoOfCandidatesThatCanBeSelected, 
        },
        hasAbstain 
      }))
    }
  }

  onChangePositionName(event) {
    const value = event.target.value

    this.setState( prevState => ({ 
      positionTextField: {
        ...prevState.positionTextField,
        value: value,
      }
    }))
  }

  onChangeMaxNoOfCandidatesThatCanBeSelected(event) {
    const value = event.target.value

    this.setState( prevState => ({ 
      maxNoCandidatesTextField: {
        ...prevState.maxNoCandidatesTextField,
        value: value,
      }
    }))
  }

  handleAbstainCheckboxChange(hasAbstain) {
    this.setState({ hasAbstain })
  }

  async validateInput() {
    const { positionTextField, maxNoCandidatesTextField } = this.state

    // initialize
    await this.setState({ hasError: false })

    // Position Textfield
    if(FormValidator.isEmpty(positionTextField.value)){
      await this.setState( (prevState) => ({
        positionTextField: {
          ...prevState.positionTextField,
          errorMessage: 'The position must have a name',
        },
        hasError: true
      }))
    } else if (!FormValidator.validLength(positionTextField.value, 1, 32)) {
      await this.setState( (prevState) => ({
        positionTextField: {
          ...prevState.positionTextField,
          errorMessage: 'The position name must contain 1 to 32 characters only',
        },
        hasError: true
      }))
    } else {
      await this.setState( prevState => ({
        positionTextField: {
          ...prevState.positionTextField,
          errorMessage: null
        },
      }))
    }

    // max no of candidates text field
    if(FormValidator.isEmpty(maxNoCandidatesTextField.value)){
      await this.setState( (prevState) => ({
        maxNoCandidatesTextField: {
          ...prevState.maxNoCandidatesTextField,
          errorMessage: 'Specify the maximum no of candidates that can be selected',
        },
        hasError: true
      }))
    } else if (!FormValidator.inRange(maxNoCandidatesTextField.value, 1)) {
      await this.setState( (prevState) => ({
        maxNoCandidatesTextField: {
          ...prevState.maxNoCandidatesTextField,
          errorMessage: 'The maximum no of candidates that can be selected must be at least 1',
        },
        hasError: true
      }))
    } else {
      await this.setState( prevState => ({
        maxNoCandidatesTextField: {
          ...prevState.maxNoCandidatesTextField,
          errorMessage: null
        },
      }))
    }
  }

  async onEntered() {
    this.setState( prevState => ({
      positionTextField: {
        ...prevState.positionTextField,
        value: '',
        errorMessage: null,
      },
      maxNoCandidatesTextField: {
        ...prevState.maxNoCandidatesTextField,
        value: '',
        errorMessage: null,
      }
    }))
  }

  async onSubmit() {
    const { onClose, editPositionVotechain, votechain, account, positionToBeEdited } = this.props
    const { positionTextField, hasAbstain, maxNoCandidatesTextField } = this.state
  
    let editedPosition = {
      positionKey: positionToBeEdited.id,
      name: positionTextField.value,
      maxNoOfCandidatesThatCanBeSelected: maxNoCandidatesTextField.value,
      hasAbstain,
    }

    await this.validateInput()

    const { hasError } = this.state

    if(!hasError){
      editPositionVotechain(account, votechain, editedPosition)
      onClose()
    }
  }

  render() {
    const { classes, openDialog, onClose, positionToBeEdited } = this.props
    const { hasAbstain, positionTextField, maxNoCandidatesTextField } = this.state
    
    return (
      <Dialog
        open={openDialog}
        onClose={onClose}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Edit Position</Typography>
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
                Fill out the form below and click submit to edit a new position.
              </DialogContentText>
            </Grid>

            <Grid item className={classes.fullWidth}> 
              <CustomizedTextField 
                id='edit-position'
                type='text'
                required
                label='Position Name'
                fullWidth
                variant='outlined'
                autoFocus
                defaultValue={positionToBeEdited.name}
                onChange={this.onChangePositionName}
                errorMessage={positionTextField.errorMessage}

              /> 
            </Grid>
            
            <Grid item className={classes.fullWidth}> 
              <CustomizedTextField 
                id='max-no-of-candidates-to-be-elected'
                type='number'
                required
                label='Max Number of Candidates that can be selected'
                fullWidth
                variant='outlined'
                defaultValue={positionToBeEdited.maxNoOfCandidatesThatCanBeSelected}
                onChange={this.onChangeMaxNoOfCandidatesThatCanBeSelected}
                errorMessage={maxNoCandidatesTextField.errorMessage}
              /> 
            </Grid>

            <Grid item className={classes.fullWidth}> 
              <FormControl
                component="fieldset"
              > 
                <Grid 
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='center'
                  spacing={40}
                >
                  <Grid item>
                    <FormLabel 
                      classes={{
                        root: classes.legend,
                      }}
                      component="legend"
                    >
                      Voters can abstain: 
                    </FormLabel>
                  </Grid>

                  <Grid item>
                    <FormGroup>
                      <Grid 
                        container
                        direction='row'
                        justify='flex-start'
                        alignItems='center'
                      >  
                        <FormControlLabel
                          control={
                            <Checkbox checked={hasAbstain} onChange={() => this.handleAbstainCheckboxChange(true)} value='Yes' />
                          }
                          label="Yes"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox checked={!hasAbstain} onChange={() => this.handleAbstainCheckboxChange(false)} value='No' />
                          }
                          label="No"
                        />
                      </Grid>
                    </FormGroup>
                  </Grid>
                </Grid>
              </FormControl>
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
    )
  }
}

EditPositionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  positionToBeEdited: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  editPositionVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditPositionDialog))