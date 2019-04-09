import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
  }
})

class AddPositionDialog extends Component {
  render() {
    const { classes, openDialog, onClose, hasAbstain, handleAbstainCheckboxChange } = this.props

    return (
      <div>
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
                /> 
              </Grid>
              
              <Grid item className={classes.fullWidth}> 
                <CustomizedTextField 
                  id='max-no-of-candidates-to-be-elected'
                  type='number'
                  required
                  label='Max Number of Candidates to be Elected'
                  fullWidth
                  variant='outlined'
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
                              <Checkbox checked={hasAbstain} onChange={() => handleAbstainCheckboxChange(true)} value='Yes' />
                            }
                            label="Yes"
                          />

                          <FormControlLabel
                            control={
                              <Checkbox checked={!hasAbstain} onChange={() => handleAbstainCheckboxChange(false)} value='No' />
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

          <DialogActions>
            <Grid
              container
              direction='row'
              alignItems='center'
              justify='flex-end'
              spacing={16}
            >
              <Grid item><CancelButton onClick={onClose} /></Grid>

              <Grid item><SubmitButton onClick={onClose} /></Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddPositionDialog.propTypes = {
  classes: PropTypes.object.isRequired,

  openDialog: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  hasAbstain: PropTypes.bool.isRequired,
  handleAbstainCheckboxChange: PropTypes.func.isRequired

};

export default withStyles(styles)(AddPositionDialog)