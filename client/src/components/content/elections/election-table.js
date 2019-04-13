import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import AddCircle from '@material-ui/icons/AddCircle'

import TableContainer from '../../customized/tables/table-container'
import AddElectionDialog from '../../customized/dialogs/add-election'

import EditButton from '../../customized/buttons/edit'
import DeleteButton from '../../customized/buttons/delete'
import StopButton from '../../customized/buttons/stop'
import PlayButton from '../../customized/buttons/play'
import ViewButton from '../../customized/buttons/view'

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
  constructor() {
    super()

    this.getActionsAllowed = this.getActionsAllowed.bind(this)
    this.createTableTools = this.createTableTools.bind(this)
    this.createTableDialogs = this.createTableDialogs.bind(this)
    this.createTableData = this.createTableData.bind(this)
  }

  getActionsAllowed(status) {
    let view = 
      <ViewButton 
        placement='bottom-start'
        tooltipTitle='View election details'
        size='small'
      />

    let play = 
      <PlayButton 
        placement='bottom-start'
        tooltipTitle='Start this election'
        size='small'
      />

    let edit = 
      <EditButton 
        placement='bottom-start'
        tooltipTitle='Edit election details'
        size='small'
      />

    let remove = 
      <DeleteButton 
        placement='bottom-start'
        tooltipTitle='Remove this election'
        size='small'
      />

    let stop = 
      <StopButton 
        placement='bottom-start'
        tooltipTitle='Stop this election'
        size='small'
      />

    const actionButtons = {
      Pending: [view, play, edit, remove],
      Ongoing: [view, stop],
      Finished: [view]
    }

    let actionsAllowed = actionButtons[status].map((action, index) => {
      return(
        <Grid item key={index}>
          {action}
        </Grid>
      )      
    })
    
    return (
      <Grid 
        container
        direction='row'
        justify='flex-start'
        alignItems='center'
        spacing={0}
      >
        {actionsAllowed}
      </Grid>    
    )
  }

  createTableTools() {
    const { classes, handleClickOpenDialog } = this.props

    return (
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
    )
  }

  createTableDialogs() {
    const { openDialog, handleClickCloseDialog } = this.props

    return (
      <AddElectionDialog 
        openDialog={openDialog}
        handleClickCloseDialog={handleClickCloseDialog}
      />
    )
  }

  createTableData(electionList) {
    electionList.forEach((election) => {
      election.action = this.getActionsAllowed(election.status)
    })

    return electionList
  }

  render() {
    const { data, headers } = this.props

    let tableTools = this.createTableTools()
    let tableDialogs = this.createTableDialogs()
    let tableData = this.createTableData(data)
      
    return (
      <TableContainer 
        headers={headers}
        data={tableData}

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