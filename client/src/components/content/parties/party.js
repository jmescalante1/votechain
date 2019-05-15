import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import PartyTableContainer from './party-table-container'
import Spacer from '../../customized/layout/spacer'

const styles = theme => ({
  electionSelector: {
    width: '100%'
  }
})

class Party extends Component {

  render() {
    const { classes, electionId, handleElectionSelectChange, electionList, theme } = this.props

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

        <Spacer width='100%' height={theme.spacing.unit * 4}/>

        <PartyTableContainer 
          electionId={electionId}
        />
      </div>
    )
  }
}

Party.propTypes = {
  classes: PropTypes.object.isRequired,
  
  electionId: PropTypes.number,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default  withTheme()(withStyles(styles)(Party))