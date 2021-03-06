import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import PositionTableContainer from './position-table-container'
import Spacer from '../../customized/layout/spacer'

const styles = theme => ({
  electionSelector: {
    width: '100%'
  },
})

class Position extends Component {

  render() {
    const { classes, election, handleElectionSelectChange, electionList, theme } = this.props

    return (
      <div>
        <ElectionSelector 
          classes={{
            root: classes.electionSelector
          }}

          fontSize={18}
          election={election}
          handleElectionSelectChange={handleElectionSelectChange}
          electionList={electionList}
        />

        <Spacer width='100%' height={theme.spacing.unit * 4}/>

        <PositionTableContainer 
          election={election}
          electionList={electionList}
        />
      </div>
    )
  }
}

Position.propTypes = {
  classes: PropTypes.object.isRequired,
  
  election: PropTypes.object,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withTheme()(withStyles(styles)(Position))