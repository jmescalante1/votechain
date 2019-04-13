import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import TableHeader from '../tables/table-header'
import TableToolbar from '../tables/table-toolbar'

const styles = theme => ({
  root: {
    width: '90%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 4,
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  action: {
    width: 300
  },
})

class CustomizedTable extends Component {
  render() {
    const { classes, data, headers, order, orderBy, rowsPerPage, page, rowsPerPageOptions, tableTools, tableDialogs, tableName } = this.props
    const { handleRequestSort, handleChangePage, handleChangeRowsPerPage, stableSort, getSorting } = this.props
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
    const sortedData = stableSort(data, getSorting(order, orderBy))

    return (
      <Paper className={classes.root}>
        <TableToolbar 
          tableTools={tableTools}
          tableName={tableName}
        />
          
        <div className={classes.tableWrapper}>
          <Table className={classes.table} >
            <TableHeader
              headers={headers}
              order={order}
              orderBy={orderBy}
              
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      {Object.keys(row).map(key => { 
                        return (
                          <TableCell key={key} align='left'>{row[key]}</TableCell>
                        )
                      })}    
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
    
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        {tableDialogs}
      </Paper>
    )
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  tableName: PropTypes.string,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,


  handleRequestSort: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  stableSort: PropTypes.func.isRequired,
  getSorting: PropTypes.func.isRequired,
}

export default withStyles(styles)(CustomizedTable)