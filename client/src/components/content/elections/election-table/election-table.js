import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Pageview from '@material-ui/icons/Pageview'
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled'
import Stop from '@material-ui/icons/Stop'

import ElectionTableToolbar from './election-table-toolbar'
import ElectionTableHeader from './election-table-header'

const styles = theme => ({
  root: {
    width: "90%",
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  actionIcon: {
    margin: theme.spacing.unit * 2
  },
  playButton: {
    color: 'green'
  },
  viewButton: {
    color: '#2196f3'
  },
  deleteButton: {
    color: 'red'
  },
  editButton: {
    color: 'orange'
  },
  stopButton: {
    color: 'blue'
  }
})

class ElectionTable extends React.Component {
  constructor() {
    super()

    this.getActionsAllowed = this.getActionsAllowed.bind(this)

  }

  getActionsAllowed(status) {
    const { classes } = this.props

    let play = 
      <Grid item>
        <IconButton className={classes.playButton}>
          <PlayCircleFilled />
        </IconButton>
      </Grid>
    let view = 
      <Grid item>
        <IconButton className={classes.viewButton}>
          <Pageview />
        </IconButton>
      </Grid>
    let edit = 
      <Grid item>
        <IconButton className={classes.editButton}>
          <Edit />
        </IconButton>
      </Grid>
    let remove = 
      <Grid item>
        <IconButton className={classes.deleteButton}>
          <Delete />
        </IconButton>
      </Grid>
    let stop = 
      <Grid item>
        <IconButton className={classes.stopButton}>
          <Stop />
        </IconButton>
      </Grid>

    let spacing = 0

    switch(status) {
      case 'Pending':
        return ( 
          <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={spacing}
          >
            {view}
            {play}
            {edit}
            {remove}
          </Grid>
        )
      case 'Ongoing':
        return (
          <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={spacing}
          >
            {view}
            {stop}
          </Grid>
        )
      case 'Finished':
        return (
          <Grid 
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={spacing}
          >
            {view}
          </Grid>
        )
      default:
        return <div></div>
    }
  }

  render() {
    const { classes, data, headers, order, orderBy, rowsPerPage, page } = this.props
    const { handleRequestSort, handleChangePage, handleChangeRowsPerPage, stableSort, getSorting } = this.props
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
   
    return (
      <Paper className={classes.root}>
        <ElectionTableToolbar />
        
        <div className={classes.tableWrapper}>
          <Table className={classes.table} >
            <ElectionTableHeader
              headers={headers}
              order={order}
              orderBy={orderBy}
              
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">
                        {this.getActionsAllowed(row.status)} 
                      </TableCell>
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
    
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}


ElectionTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,

  handleRequestSort: PropTypes.func.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  stableSort: PropTypes.func.isRequired,
  getSorting: PropTypes.func.isRequired
}

export default withStyles(styles)(ElectionTable)