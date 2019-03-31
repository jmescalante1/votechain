import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import PositionToolbar from './position-toolbar'

const styles = theme => ({
  paper: {
    padding: 20
  }
})

class Position extends React.Component {
  render() {
    const { classes, electionList, electionData } = this.props

    return(
      <Paper className={classes.paper}>
        <PositionToolbar 
          className={classes.positionToolbar}
          electionList={electionList}
          electionData={electionData}          
        />
      </Paper>
    )
  }
}

Position.propTypes = {
  electionList: PropTypes.array.isRequired,
  electionData: PropTypes.object.isRequired
}

export default withStyles(styles)(Position)