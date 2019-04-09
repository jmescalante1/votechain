import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import PositionToolbar from './position-toolbar'
import PositionContent from './position-content'

const styles = theme => ({
 
})

class Position extends React.Component {
  render() {
    const { election, handleElectionSelectChange, electionList, electionData } = this.props
    
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