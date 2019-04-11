import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import AddCircle from '@material-ui/icons/AddCircle'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import Pageview from '@material-ui/icons/Pageview'
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled'
import Stop from '@material-ui/icons/Stop'

import TableContainer from '../../customized/tables/table-container'
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
  },
})

class ElectionTable extends Component {
  constructor() {
    super()

    this.getActionsAllowed = this.getActionsAllowed.bind(this)
    this.createTableTools = this.createTableTools.bind(this)
    this.createTableDialogs = this.createTableDialogs.bind(this)
    this.createDataPresentation = this.createDataPresentation.bind(this)
  }

  getActionsAllowed(status) {
    const { classes } = this.props
  
    let view = {
      className: classes.viewButton,
      icon: <Pageview />,
      tooltipTitle: 'View election details'
    }

    let play = {
      className: classes.playButton,
      icon: <PlayCircleFilled />,
      tooltipTitle: 'Start this election'
    }

    let edit = {
      className: classes.editButton,
      icon: <Edit />,
      tooltipTitle: 'Edit election details'
    }

    let remove = {
      className: classes.deleteButton,
      icon: <Delete />,
      tooltipTitle: 'Delete this election'
    }

    let stop = {
      className: classes.stopButton,
      icon: <Stop />,
      tooltipTitle: 'Stop the election'
    }

    const actions = {
      Pending: [view, play, edit, remove],
      Ongoing: [view, stop],
      Finished: [view]
    }

    let actionsAllowed = actions[status].map((action, index) => {
      return(
        <Grid item key={index}>
          <Tooltip
            title={action.tooltipTitle}
            placement='bottom-start'
            enterDelay={300}
          >
            <IconButton className={action.className}>
              {action.icon}
            </IconButton>
          </Tooltip>
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

  createDataPresentation(electionList) {
    electionList.map((election) => {
      election.action = this.getActionsAllowed(election.status)
    })

    return electionList
  }

  render() {
    const { data, headers } = this.props

    let tableTools = this.createTableTools()
    let tableDialogs = this.createTableDialogs()
    let modified = this.createDataPresentation(data)
      
    return (
      <TableContainer 
        headers={headers}
        data={modified}

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