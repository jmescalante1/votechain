import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AddCircle from '@material-ui/icons/AddCircle'

import TableContainer from '../../customized/tables/table-container'
import EditButton from '../../customized/buttons/edit'
import DeleteButton from '../../customized/buttons/delete'
import AddVoterDialog from '../../customized/dialogs/add-voter'

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

class VoterTable extends Component {
  constructor() {
    super()

    this.createTableData = this.createTableData.bind(this)
    this.getActionsAllowed = this.getActionsAllowed.bind(this)
    this.createTableTools = this.createTableTools.bind(this)
    this.createTableDialogs = this.createTableDialogs.bind(this)
  }

  getActionsAllowed(voter) {
    const { handleOpenEditVoterDialog, handleOpenDeleteVoterDialog } = this.props

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'   
      >
        <Grid item>    
          <EditButton 
            onClick={() => handleOpenEditVoterDialog(voter)}
            placement='bottom-start'
            tooltipTitle='Edit voter details'
            size='small'
          />
        </Grid>

        <Grid item>
          <DeleteButton 
            onClick={() => handleOpenDeleteVoterDialog(voter)}
            placement='bottom-start'
            tooltipTitle='Remove this voter'
            size='small'
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(voterList) {
    let voterListClone = cloneDeep(voterList)

    voterListClone.forEach((voter) => {
      voter.action = this.getActionsAllowed(voter)
    })

    return voterListClone
  }
  
  createTableTools(){
    const { classes, handleOpenAddVoterDialog } = this.props

    return (
      <Tooltip title='Add new voter(s)'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleOpenAddVoterDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Voter
        </Fab>
      </Tooltip>
    )
  }

  createTableDialogs(){
    const { openAddVoterDialog, handleCloseAddVoterDialog } = this.props
    const { electionId } = this.props

    return (
      <AddVoterDialog 
        openDialog={openAddVoterDialog}
        handleClickCloseDialog={handleCloseAddVoterDialog}
        electionId={electionId}
      />
    )
  }
  

  render() {
    const { voterList, headers } = this.props

    const tableData = this.createTableData(voterList)
    const tableTools = this.createTableTools()
    const tableDialogs = this.createTableDialogs()

    return (
      <TableContainer 
        tableName='Voter List'
        headers={headers}
        data={tableData}

        tableTools={tableTools}
        tableDialogs={tableDialogs}

        rowsPerPageOptions={[8, 15, 25]}
        defaultOrder='asc'
        defaultOrderBy='name'
        defaultRowsPerPage={8}

        rowHeight={60}
      />
    )
  }
}

VoterTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  voterList: PropTypes.arrayOf(PropTypes.object).isRequired,

  openAddVoterDialog: PropTypes.bool.isRequired,
  handleOpenAddVoterDialog: PropTypes.func.isRequired,
  handleCloseAddVoterDialog: PropTypes.func.isRequired,
  
  electionId: PropTypes.number,

  handleOpenEditVoterDialog: PropTypes.func.isRequired,
  handleOpenDeleteVoterDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(VoterTable)