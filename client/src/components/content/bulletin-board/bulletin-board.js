import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, withTheme } from '@material-ui/core/styles'

import ElectionSelector from '../../customized/selectors/election-selector'
import BulletinTableContainer from './bulletin-table-container'
import Spacer from '../../customized/layout/spacer'

const styles = theme => ({
  electionSelector: {
    width: '100%'
  },
})

class BulletinBoard extends Component {
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

        <BulletinTableContainer 
          electionId={electionId}
        />
      </div>
    )
  }
}

BulletinBoard.propTypes = {
  electionId: PropTypes.number,
  handleElectionSelectChange: PropTypes.func.isRequired,
  electionList: PropTypes.array.isRequired,
}

export default withTheme()(withStyles(styles)(BulletinBoard))