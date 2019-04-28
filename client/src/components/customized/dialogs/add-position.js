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
      hasAbstain: false,
      positionName: '',
      maxNoOfCandidatesThatCanBeSelected: 0,
    }

    this.handleAbstainCheckboxChange = this.handleAbstainCheckboxChange.bind(this)
    this.onChangePositionName = this.onChangePositionName.bind(this)
    this.onChangeMaxNoOfCandidatesThatCanBeSelected = this.onChangeMaxNoOfCandidatesThatCanBeSelected.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleAbstainCheckboxChange(hasAbstain) {
    this.setState({ hasAbstain })
  }

  onChangePositionName(event) {
    this.setState({ positionName: event.target.value })
  }

  onChangeMaxNoOfCandidatesThatCanBeSelected(event) {
    this.setState({ maxNoOfCandidatesThatCanBeSelected: event.target.value })
  }

  onSubmit() {
    const { onClose, addPositionVotechain, votechain, account, electionId } = this.props
    const { positionName, hasAbstain, maxNoOfCandidatesThatCanBeSelected } = this.state

    let position = {
      electionKey: electionId,
      name: positionName,
      maxNoOfCandidatesThatCanBeSelected,
      hasAbstain,
    }

    addPositionVotechain(account, votechain, position)
    onClose()
  }

  render() {
    const { classes, openDialog, onClose } = this.props
    const { hasAbstain } = this.state

    return (
      <Dialog
        open={openDialog}
        onClose={onClose}
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
                type='string'
                required
                label='Position Name'
                fullWidth
                variant='outlined'
                autoFocus
                onChange={this.onChangePositionName}
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
                onChange={this.onChangeMaxNoOfCandidatesThatCanBeSelected}
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