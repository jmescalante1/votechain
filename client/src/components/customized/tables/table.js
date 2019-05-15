import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import TableHeader from '../tables/table-header'
import TableToolbar from '../tables/table-toolbar'

import TablePagination from '../tables/table-pagination/table-pagination'

const styles = theme => ({
  root: {
    width: '100%',
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
  tablePaginationSelectIcon: {
    color: 'red'
  }
})

class CustomizedTable extends Component {
  constructor(props) {
    super(props)
    
    this.generateEmptyRows = this.generateEmptyRows.bind(this)
  }

  generateEmptyRows(noOfEmptyRows, noOfColumns) {
    const { rowHeight } = this.props

    let emptyRow = []
    for(var cell = 0; cell < noOfColumns; cell++){
      emptyRow.push(<TableCell key={cell}></TableCell>)
    }

    let emptyRows = []
    for(var row = 0; row < noOfEmptyRows; row++){
      emptyRows.push(
        <TableRow style={{height: rowHeight}} key={row}>
          {emptyRow.map((cell) => {
            return (
              cell
            )
          })}  
        </TableRow>
      )
    }

    return emptyRows
  }
  
  render() {
    const { classes, data, headers, order, orderBy, rowsPerPage, page, rowsPerPageOptions, tableTools, tableDialogs, tableName } = this.props
    const { handleRequestSort, handleChangePage, handleChangeRowsPerPage, stableSort, getSorting } = this.props
    const { rowHeight } = this.props
    const sortedData = stableSort(data, getSorting(order, orderBy))
  
    const noOfEmptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

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
                    <TableRow style={{height: rowHeight}} hover tabIndex={-1} key={row.id}>
                      {Object.keys(row).map(key => { 
                        return (  
                          <TableCell key={key} align='left'>{row[key]}</TableCell>
                        )
                      })}    
                    </TableRow>
                  )
                })}
                
              { noOfEmptyRows > 0 &&
                this.generateEmptyRows(noOfEmptyRows, headers.length).map((row) => {
                  return (
                    row
                  )
                })
              }

            </TableBody>
          </Table>
        </div>

        {tableDialogs} 

        <TablePagination 
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPageDisplayLabel='Rows per page'
          rowsPerPage={rowsPerPage}
          count={data.length}
          page={page}

          onChangeRowsPerPage={handleChangeRowsPerPage}
          onChangePage={handleChangePage}
        />

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
  rowHeight: PropTypes.number
}

export default withStyles(styles)(CustomizedTable)