import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import AdminTableContainer from './admin-table-container'

const styles = theme => ({

})

class Admin extends Component {

  render() {
    return (
      <AdminTableContainer />
    )
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Admin)