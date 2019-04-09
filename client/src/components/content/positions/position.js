import React, { Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import PositionToolbar from './position-toolbar'
import PositionContent from './position-content'

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
      <Fragment>
        <PositionToolbar 
          election={election}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
          electionData={electionData}          
        />

        <PositionContent 
          election={election}
          electionData={electionData}
        />
      </Fragment>
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