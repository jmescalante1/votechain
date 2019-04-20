import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import OfficialTableContainer from './official-table-container'

const styles = theme => ({
  // electionSelector: {
  //   marginTop: theme.spacing.unit * 4,
  //   margin: 'auto',
  //   width: '90%'
  // }
})

class Official extends Component {

  render() {
    return (
      <OfficialTableContainer />
    )
  }
}

Official.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Official)