import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'

import editPageRoute from './position-edit-page/edit-page-route'

const styles = theme => ({
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#006064'
  },
  content: {
    margin: 20,
  },
  positionName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  sectionLabel: {
    fontSize: 18
  },
  editButton: {
    color: 'orange',
  },
  deleteButton: {
    color: 'red'
  },
  section: {
    marginLeft: 20,
    fontSize: 18
  },
  list: {
    marginLeft: 10
  },
  verticalSpacer: {
    marginTop: theme.spacing.unit * 2
  }
})

class Position extends React.Component {
  render() {
    const { classes, election, electionData } = this.props

    return(
      <Fragment>
        {election && electionData[election].positions.map((position, index) =>{
          return(
            <div key={index}>
              <Divider className={classes.divider}/>
              
              <div className={classes.content}>
                <Grid 
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='flex-start'
                >
                  <Grid item xs={10}>
                    <Typography className={classes.positionName}>{position.name}</Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Link
                      to={editPageRoute.path}
                    >
                      <IconButton>
                        <Edit className={classes.editButton}/>
                      </IconButton>
                    </Link>

                    <IconButton>
                      <Delete className={classes.deleteButton}/>
                    </IconButton>
                  </Grid>
                </Grid>
                
                <div className={classes.section}>
                  <Typography className={classes.sectionLabel}>Candidates: </Typography> 
                  
                  <div className={classes.list}>
                    {position.candidates.map((value, index) => {
                      return (
                        <Typography key={index}>
                          {value}
                        </Typography>
                      )
                    })}
                  </div>
                </div>

                <div className={classes.verticalSpacer}></div>

                <div className={classes.section}>
                  <Typography className={classes.sectionLabel}>Other Info: </Typography> 
                
                  <div className={classes.list}>
                    <Typography>Max number of candidates to be elected: {position.maxNoOfCandidatesToBeElected}</Typography>
                    <Typography>The voter can cast abstain vote: {position.hasAbstain.toString()}</Typography>
                  </div>
                </div>    
              </div>  
            </div>         
          )
        })}
      </Fragment>
    )
  }
}

Position.propTypes = {
  classes: PropTypes.object.isRequired,
  
  election: PropTypes.string.isRequired,
  electionData: PropTypes.object.isRequired,
}

export default withStyles(styles)(Position)