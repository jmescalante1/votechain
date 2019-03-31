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
  },
  divider: {
    height: 2,
    width: '100%',
    backgroundColor: '#006064'
  },
  content: {
    margin: 40,
  },
  positionName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  candidateHeader: {
    marginLeft: 20,
    fontSize: 16
  },
  editButton: {
    color: 'orange',
  },
  deleteButton: {
    color: 'red'
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

        {election && <Divider className={classes.divider}/>}
                
        {election && electionData[election].positions.map((position, index) =>{
          return(
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
              <Typography className={classes.candidateHeader}>Candidates: </Typography> 
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