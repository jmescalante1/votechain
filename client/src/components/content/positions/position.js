import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import PositionToolbar from './position-toolbar'

const styles = theme => ({
  root: {
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#006064',
    width: '90%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 4
  },
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
  candidateHeader: {
    fontSize: 18
  },
  editButton: {
    color: 'orange',
  },
  deleteButton: {
    color: 'red'
  },
  candidateContent: {
    marginLeft: 20,
    fontSize: 18
  },
  candidateList: {
    marginLeft: 10
  }
})

class Position extends React.Component {
  render() {
    const { classes, election, handleElectionSelectChange, electionList, electionData } = this.props

    return(
      <Paper className={classes.root}>
        <PositionToolbar 
          election={election}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
          electionData={electionData}          
        />

        {election && electionData[election].positions.map((position, index) =>{
          return(
            <div>
              <Divider className={classes.divider}/>
              
              <div key={index} className={classes.content}>
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
                    <IconButton><Edit className={classes.editButton}/></IconButton>
                    <IconButton><Delete className={classes.deleteButton}/></IconButton>
                  </Grid>
                </Grid>
                
                <div className={classes.candidateContent}>
                  <Typography className={classes.candidateHeader}>Candidates: </Typography> 
                  
                  <div className={classes.candidateList}>
                    {position.candidates.map((value, index) => {
                      return (
                        <Typography key={index}>
                          {value}
                        </Typography>
                      )
                    })}
                  </div>
                </div>    
              </div>  
            </div>         
          )
        })}
        
      </Paper>
    )
  }
}

Position.propTypes = {
  classes: PropTypes.object.isRequired,
  election: PropTypes.string.isRequired,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.array.isRequired,
  electionData: PropTypes.object.isRequired,
}

export default withStyles(styles)(Position)