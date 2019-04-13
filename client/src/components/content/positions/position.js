import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import PositionContent from './position-content/position-content'

const styles = theme => ({
  positionToolbar: {
    marginTop: theme.spacing.unit * 4,
    margin: 'auto',
    width: '90%'
  }, 
  positionContent: {
    marginTop: theme.spacing.unit * 4,
    width: '90%',
    margin: 'auto',
  },
})

class Position extends React.Component {
  render() {
    const { classes, election, handleElectionSelectChange, electionList, electionData } = this.props
    
    return(
      <Fragment>
        <ElectionSelector 
          classes={{
            root: classes.positionToolbar
          }}

          election={election}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
          electionData={electionData}          
        />

        <PositionContent 
          classes={{
            root: classes.positionContent
          }}
          
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