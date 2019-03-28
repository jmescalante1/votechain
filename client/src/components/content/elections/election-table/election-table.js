import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import DeleteIcon from "@material-ui/icons/Delete"
import FilterListIcon from "@material-ui/icons/FilterList"
import { lighten } from "@material-ui/core/styles/colorManipulator"

import electionData from './election-data'
import ElectionTableToolbar from './election-table-toolbar'
import ElectionTableHeader from './election-table-header'

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
})

class ElectionTable extends React.Component {
  constructor() {
    super()

    this.state = {
      order: "asc",
      orderBy: "name",
      data: electionData,
      page: 0,
      rowsPerPage: 5
    }

    this.handleRequestSort = this.handleRequestSort.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.stableSort = this.stableSort.bind(this)
    this.desc = this.desc.bind(this)
    this.getSorting = this.getSorting.bind(this)
  }

  handleRequestSort(event, property) {
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }

    this.setState({ order, orderBy })
  }

  handleChangePage(event, page) {
    this.setState({ page })
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value })
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])

    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })

    return stabilizedThis.map(el => el[0])
  }

  getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy)
  }

  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  render() {
    const { classes } = this.props
    const { data, order, orderBy, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
   
    return (
      <Paper className={classes.root}>
        <ElectionTableToolbar />
        
        <div className={classes.tableWrapper}>
          <Table className={classes.table} >
            <ElectionTableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />

            <TableBody>
              {this.stableSort(data, this.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.action}</TableCell>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
    
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}


ElectionTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ElectionTable);