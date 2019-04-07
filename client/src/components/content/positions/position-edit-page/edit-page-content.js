import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },

  form: {
    marginTop: 20,
    width: '100%',
  },
  
  legend: {
    color: 'black',
  },
  fullWidth: {
    width: '100%'
  },
  candidateForm: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.palette.highlight.main,
    padding: theme.spacing.unit * 1
  },
  candidateListLabel: {
    fontSize: 16,
  },
  addIcon: {
    color: '#fafafa',
  },
  addButton: {
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#1b5e20'
    }
  },
  deleteButton: {
    color: 'red'
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
                  // className={classes.legend} 
                  classes={{
                    root: classes.legend,
                    // focused: classes.legendFocused
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
        
        <Grid item className={classNames(classes.form, classes.candidateForm)}>
          <Grid
            container
            direction='column'
            alignItems='flex-start'
            justify='flex-start'
          >
            <Grid item className={classes.fullWidth}>
              <Grid
                container
                direction='row'
                alignItems='center'
                justify='space-between'
              >
                <Grid item>
                  <Typography className={classes.candidateListLabel}>Candidates: </Typography>
                </Grid>

                <Grid item>
                  <Tooltip
                    title='Add new candidate'
                    placement='left'
                  >
                    <Fab 
                      size='small' 
                      className={classes.addButton}
                    >
                      <Add className={classes.addIcon} />
                    </Fab>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>

            {position.candidates.map((candidate, index) => {  
              return (
                <Grid item className={classes.fullWidth} key={index}>
                  <Grid
                    container
                    direction='row'
                    alignItems='center'
                    justify='flex-start'
                  >
                    <Grid item xs={2}></Grid>

                    <Grid item xs={5}>
                      <Typography>{candidate}</Typography>
                    </Grid>

                    <Grid item xs={5}>
                      <Tooltip 
                        title='Remove candidate'
                        placement='right'
                      >
                        <IconButton>
                          <Delete className={classes.deleteButton}/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>  
                </Grid>
              )
            })}
          </Grid>
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