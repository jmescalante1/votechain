import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

import AddCircle from '@material-ui/icons/AddCircle'

import TableContainer from '../../customized/tables/table-container'
import AddElectionDialog from '../../customized/dialogs/add-election'

import EditButton from '../../customized/buttons/edit'
import DeleteButton from '../../customized/buttons/delete'
import StopButton from '../../customized/buttons/stop'
import PlayButton from '../../customized/buttons/play'
import ViewButton from '../../customized/buttons/view'

import StatusSymbol from '../../customized/symbols/status-symbol'
import electionViewRoute from './election-view/election-view-route'

const styles = theme => ({
  actionIcon:{
    marginRight: theme.spacing.unit,
    color: '#006064',
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffffff',
    color: '#006064',
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

  getActionsAllowed(election) {
    const { handleOpenEditElectionDialog, handleOpenDeleteElectionDialog } = this.props
    const { handleOpenStartElectionDialog, handleOpenStopElectionDialog } = this.props

    let view = 
      <Link 
        to={{
          pathname: electionViewRoute.path,
          params: {election}
        }}
      >
        <ViewButton 
          id={election.id}
          placement='bottom-start'
          tooltipTitle='View election details'
          size='small'
        />
      </Link>
  

    let play = 
      <PlayButton 
        id={election.id}  
        onClick={() => handleOpenStartElectionDialog(election)}
        placement='bottom-start'
        tooltipTitle='Start this election'
        size='small'
      />

    let edit = 
      <EditButton 
        onClick={() => handleOpenEditElectionDialog(election.id)}
        id={election.id}
        placement='bottom-start'
        tooltipTitle='Edit election details'
        size='small'
      />

    let remove = 
      <DeleteButton 
        onClick={() => handleOpenDeleteElectionDialog(election.id)}
        id={election.id}
        placement='bottom-start'
        tooltipTitle='Remove this election'
        size='small'
      />

    let stop = 
      <StopButton 
        onClick={() => handleOpenStopElectionDialog(election)}
        id={election.id}
        placement='bottom-start'
        tooltipTitle='Stop this election'
        size='small'
      />

    const actionButtons = {
      Pending: [view, play, edit, remove],
      Ongoing: [view, stop],
      Finished: [view]
    }

    let actionsAllowed = actionButtons[election.status].map((action, index) => {
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
    const { classes, handleOpenAddElectionDialog } = this.props

    return (
      <Tooltip title='Add new election'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleOpenAddElectionDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Election
        </Fab>
      </Tooltip>
    )
  }

  createTableDialogs() {
    const { openDialog, handleCloseAddElectionDialog } = this.props

    return (
      <AddElectionDialog 
        openDialog={openDialog}
        handleClickCloseDialog={handleCloseAddElectionDialog}
      />
    )
  }

  createTableData(electionList) {
    let electionListClone = cloneDeep(electionList)

    electionListClone.forEach((election) => {
      election.action = this.getActionsAllowed(election)
      election.status = <StatusSymbol variant={election.status}/>
    })

    return electionListClone
  }

  render() {
    const { electionList, headers } = this.props

    let tableTools = this.createTableTools()
    let tableDialogs = this.createTableDialogs()
    let tableData = this.createTableData(electionList)
      
    return (
      <TableContainer 
        tableName='Election List'
        headers={headers}
        data={tableData}

        tableTools={tableTools}
        tableDialogs={tableDialogs}

        rowsPerPageOptions={[8, 15, 25]}
        defaultOrder='desc'
        defaultOrderBy='id'
        defaultRowsPerPage={8}

        rowHeight={60}
      />
    )
  }
}

ElectionTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  electionList: PropTypes.arrayOf(PropTypes.object).isRequired,

  openDialog: PropTypes.bool.isRequired,

  handleOpenAddElectionDialog: PropTypes.func.isRequired,
  handleCloseAddElectionDialog: PropTypes.func.isRequired,
  handleOpenEditElectionDialog: PropTypes.func.isRequired,
  handleOpenDeleteElectionDialog: PropTypes.func.isRequired,
  handleOpenStartElectionDialog: PropTypes.func.isRequired,
  handleOpenStopElectionDialog: PropTypes.func.isRequired,
}


export default withStyles(styles)(ElectionTable)