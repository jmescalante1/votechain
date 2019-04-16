import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import RowsPerPageOptions from './rows-per-page-options'
import TablePaginationLabel from './table-pagination-label'
import ChangePage from './change-page'

const styles = theme => ({
  root: {
    backgroundColor: '#004d40',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
})

class TablePagination extends Component {
  render() {
    const { classes, rowsPerPageDisplayLabel, rowsPerPage, rowsPerPageOptions, onChangeRowsPerPage, count, page, onChangePage } = this.props

    return (
      <Grid
        container
        direction='row'
        alignItems='center'
        justify='space-between'
        className={classes.root}
      >
        <Grid item>
          <RowsPerPageOptions 
            label={rowsPerPageDisplayLabel}
            rowsPerPage={rowsPerPage}
            options={rowsPerPageOptions}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </Grid>
        
        <Grid item>
          <TablePaginationLabel 
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Grid>
        
        <Grid item>
          <ChangePage 
            onChangePage={onChangePage}
            page={page}
            count={count}
            rowsPerPage={rowsPerPage}
          />
        </Grid>
      </Grid>
    )
  }
}

TablePagination.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rowsPerPageDisplayLabel: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,

  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
}

export default withStyles(styles)(TablePagination)