import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import TableContainer from '../../customized/tables/table-container'
import AddCircle from '@material-ui/icons/AddCircle'

import AddElectionDialog from '../../customized/dialogs/add-election'

const styles = theme => ({
  actionIcon:{
    marginRight: theme.spacing.unit,
    color: '#006064'
  },

  fab: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffffff',
    color: '#006064'
  },
})

class ElectionTable extends Component {
  render() {
    const { classes, data, headers, handleClickCloseDialog, handleClickOpenDialog, openDialog } = this.props

    let tableTools =
      <Tooltip title='Add new election'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleClickOpenDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Election
        </Fab>
      </Tooltip>

    let tableDialogs = 
      <AddElectionDialog 
        openDialog={openDialog}
        handleClickCloseDialog={handleClickCloseDialog}
      />

    return (
      <TableContainer 
        headers={headers}
        data={data}

        tableTools={tableTools}
        tableDialogs={tableDialogs}

        rowsPerPageOptions={[8, 15, 25]}
        defaultOrder='asc'
        defaultOrderBy='id'
        defaultRowsPerPage={8}
      />
    )
  }
}

ElectionTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  openDialog: PropTypes.bool.isRequired,
  handleClickOpenDialog: PropTypes.func.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
}


export default withStyles(styles)(ElectionTable)