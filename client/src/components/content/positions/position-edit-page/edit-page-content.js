import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },

  form: {
    marginTop: 20,
    width: '50%',
  },
  legend: {
    color: 'black'
  },

  cssFocused: {},
  notchedOutline: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#006064',
    },
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#006064',
    },
  },
})

class EditPageContent extends React.Component {
  render() {
    const { classes, position, hasAbstain, handleAbstainCheckboxChange } = this.props

    return(
      <Grid
        className={classes.root}
        container
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        <Grid item className={classes.form}>
          <TextField
            type='string'
            autoFocus
            required
            id="name"
            label="Position Name"
            fullWidth
            variant='outlined'
            defaultValue={position.name}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{
              classes:{
                root: classes.cssLabel,
                focused: classes.cssFocused,
              }
            }}
          />
        </Grid>
        
        <Grid item className={classes.form}>
          <TextField
            type='number'
            autoFocus
            required
            id="name"
            label="Max No. of Candidates to be Elected"
            fullWidth
            variant='outlined'
            defaultValue={position.maxNoOfCandidatesToBeElected}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline
              }
            }}
            InputLabelProps={{
              classes:{
                root: classes.cssLabel,
                focused: classes.cssFocused
              }
            }}
          />
        </Grid>
     
        <Grid item className={classes.form}>
          <FormControl component="fieldset"> 
            <Grid 
              container
              direction='row'
              justify='flex-start'
              alignItems='center'
              spacing={40}
            >
              <Grid item>
                <FormLabel className={classes.legend} component="legend">Voters can abstain: </FormLabel>
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
    )
  }
} 

EditPageContent.propTypes = {
  classes: PropTypes.object.isRequired,

  position: PropTypes.object.isRequired,
  hasAbstain: PropTypes.bool.isRequired,
  handleAbstainCheckboxChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(EditPageContent)