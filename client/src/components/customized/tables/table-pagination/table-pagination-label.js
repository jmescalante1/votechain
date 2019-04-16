import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    color: '#fafafa'
  }
})

class TablePaginationLabel extends Component {
  render() {
    const { classes, page, rowsPerPage, count } = this.props
    const from = Math.min(count, page * rowsPerPage + 1)
    const to = Math.min((page + 1) * rowsPerPage, count)

    return (
      <Typography className={classes.root}>Showing {from} - {to} of {count}</Typography>
    )
  }
}

TablePaginationLabel.propTypes = {
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
}

export default withStyles(styles)(TablePaginationLabel)