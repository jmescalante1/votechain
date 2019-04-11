import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import CustomizedTextField from '../../../customized/forms/textfield'
import CancelButton from '../../../customized/buttons/cancel'
import SubmitButton from '../../../customized/buttons/submit'
import AddButton from '../../../customized/buttons/add'
import EditButton from '../../../customized/buttons/edit'
import DeleteButton from '../../../customized/buttons/delete'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  formItem: {
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
  deleteButton: {
    color: '#f44336',
  },
  deleteIcon: {
    '&:hover': {
      color: '#b71c1c'
    }
  },
  noTextDecoration: {
    textDecoration: 'none'
  }
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
        <Grid item className={classes.formItem}>
          <CustomizedTextField 
            fullWidth
            required
            type='string'
            id='position-name'
            label='Position Name'
            variant='outlined'
            defaultValue={position.name}
          />
        </Grid>
        
        <Grid item className={classes.formItem}>
          <CustomizedTextField 
            fullWidth
            required
            type='number'
            id='max-no-of-candidates-to-be-elected'
            label='Max No. of Candidates to be Elected'
            variant='outlined'
            defaultValue={position.maxNoOfCandidatesToBeElected}
          />
        </Grid>
     
        <Grid item className={classes.formItem}>
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
        
        <Grid
          className={classNames(classes.formItem, classes.candidateForm)}
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
                <AddButton 
                  tooltipTitle='Add new candidate'
                  placement='left'
                  size='small'
                  onClick={() => {}}
                />
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
                    <EditButton
                      tooltipTitle='Edit candidate details'
                      placement='left'
                      size='small'
                    />
                    <DeleteButton
                      tooltipTitle={'Remove ' + candidate}
                      placement='right'
                      size='small'
                    />
                  </Grid>
                </Grid>  
              </Grid>
            )
          })}
        </Grid>

        <Grid
          className={classes.formItem}
          container
          direction='row'
          alignItems='center'
          justify='space-between'
        >
          <Grid item>
            {/* <Link
              className={classes.noTextDecoration}
              to={{
                pathname: editPageRoute.path,
                state: {
                  position: position
                }
              }}
            > */}
              <CancelButton 
                size='medium'
              />
            {/* </Link> */}
          </Grid>
          
          <Grid item>
            <SubmitButton 
              size='medium'
            />
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