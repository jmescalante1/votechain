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
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'

import CustomizedTextField from '../forms/textfield'
import SubmitButton from '../buttons/submit'
import CancelButton from '../buttons/cancel'
import FormValidator from '../forms/form-validator'

import { addPositionVotechain } from '../../../actions/position'

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

class AddPositionDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        hasAbstain: false,
      },
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
      fields: {
        hasAbstain: false
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

    let positionName = fields['positionName']

    if(FormValidator.isEmpty(positionName)){
      errors['positionName'] = 'The position name must not be empty'
      noOfErrors++
    } else if (!FormValidator.validLength(positionName, 1, 32)) {
      errors['positionName'] = 'The position name must contain 1 - 32 characters only'
      noOfErrors++
    }

    let maxNoOfCandidates = fields['maxNoOfCandidates']

    if(FormValidator.isEmpty(maxNoOfCandidates)){
      errors['maxNoOfCandidates'] = 'This should not be empty'
      noOfErrors++
    } else if(!FormValidator.inRange(maxNoOfCandidates, 1)){
      errors['maxNoOfCandidates'] = 'The max no of candidates that can be selected must be at least 1'
      noOfErrors++
    }
    
    this.setState({ errors })

    return noOfErrors
  }

  async onSubmit() {
    const { onClose, addPositionVotechain, votechain, account, electionId } = this.props
    const { fields } = this.state

    let position = {
      electionKey: electionId,
      name: fields['positionName'],
      maxNoOfCandidatesThatCanBeSelected: fields['maxNoOfCandidates'],
      hasAbstain: fields['hasAbstain'],
    }

    let noOfErrors = await this.validateInputs()

    if(noOfErrors === 0){
      addPositionVotechain(account, votechain, position)
      onClose()
    }
  }

  render() {
    const { classes, openDialog, onClose } = this.props
    const { fields, errors } = this.state
    return (
      <Dialog
        open={openDialog}
        onClose={onClose}
        onEntered={this.onEntered}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add Position</Typography>
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
                Fill out the form below and click submit to add a new position.
              </DialogContentText>
            </Grid>

            <Grid item className={classes.fullWidth}> 
              <CustomizedTextField 
                id='add-position'
                type='text'
                required
                label='Position Name'
                fullWidth
                variant='outlined'
                autoFocus
                onChange={(event) => this.handleFieldChange('positionName', event.target.value)}
                error={errors['positionName']}
              /> 
            </Grid>
            
            <Grid item className={classes.fullWidth}> 
              <CustomizedTextField 
                id='maxNoOfCandidates'
                type='number'
                required
                label='Max Number of Candidates that can be selected'
                fullWidth
                variant='outlined'
                onChange={(event) => this.handleFieldChange('maxNoOfCandidates', event.target.value)}
                error={errors['maxNoOfCandidates']}
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
                            <Checkbox checked={fields['hasAbstain']} onChange={() => this.handleFieldChange('hasAbstain', true)} value='Yes' />
                          }
                          label="Yes"
                        />

                        <FormControlLabel
                          control={
                            <Checkbox checked={!fields['hasAbstain']} onChange={() => this.handleFieldChange('hasAbstain', false)} value='No' />
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
    );
  }
}

AddPositionDialog.propTypes = {
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
  addPositionVotechain
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddPositionDialog))