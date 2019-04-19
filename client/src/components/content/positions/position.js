import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import PositionTableContainer from './position-table-container'

const styles = theme => ({
  electionSelector: {
    marginTop: theme.spacing.unit * 4,
    margin: 'auto',
    width: '90%'
  }
})

class Position extends Component {

  render() {
    const { classes, electionId, handleElectionSelectChange, electionList } = this.props

    return (
      <div>
        <ElectionSelector 
          classes={{
            root: classes.electionSelector
          }}

          fontSize={18}
          electionId={electionId}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
        />

        <PositionTableContainer 
          electionId={electionId}
        />
      </div>
    )
  }
}

Position.propTypes = {
  classes: PropTypes.object.isRequired,
  
  electionId: PropTypes.string.isRequired,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withStyles(styles)(Position)