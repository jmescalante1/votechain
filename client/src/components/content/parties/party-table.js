import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import cloneDeep from 'lodash/cloneDeep'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AddCircle from '@material-ui/icons/AddCircle'

import TableContainer from '../../customized/tables/table-container'
import EditButton from '../../customized/buttons/edit'
import DeleteButton from '../../customized/buttons/delete'
import AddPartyDialog from '../../customized/dialogs/add-party'

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

class PartyTable extends Component {
  constructor() {
    super()

    this.createTableData = this.createTableData.bind(this)
    this.getActionsAllowed = this.getActionsAllowed.bind(this)
    this.createTableTools = this.createTableTools.bind(this)
    this.createTableDialogs = this.createTableDialogs.bind(this)
  }

  getActionsAllowed(party) {
    const { handleOpenEditPartyDialog, handleOpenDeletePartyDialog } = this.props

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'   
      >
        <Grid item>  
          <EditButton 
            onClick={() => handleOpenEditPartyDialog(party)}
            placement='bottom-start'
            tooltipTitle='Edit party details'
            size='small'
          />
        </Grid>

        <Grid item>
          <DeleteButton 
            onClick={() => handleOpenDeletePartyDialog(party)}
            placement='bottom-start'
            tooltipTitle='Remove this party'
            size='small'
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(partyList) {
    let partyListClone = []

    partyList.forEach((party) => {
      let partyClone = {}
      partyClone.id = party.id
      partyClone.name = party.name
      partyClone.action = this.getActionsAllowed(party)

      partyListClone.push(partyClone)
    })

    return partyListClone
  }
  
  createTableTools(){
    const { classes, handleOpenAddPartyDialog } = this.props

    return (
      <Tooltip title='Add new party'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleOpenAddPartyDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Party
        </Fab>
      </Tooltip>
    )
  }

  createTableDialogs(){
    const { openAddPartyDialog, handleCloseAddPartyDialog, electionId } = this.props

    return (
      <AddPartyDialog 
        openDialog={openAddPartyDialog}
        onClose={handleCloseAddPartyDialog}
        electionId={electionId}
      />
    )
  }
  

  render() {
    const { partyList, headers } = this.props

    const tableData = this.createTableData(partyList)
    const tableTools = this.createTableTools()
    const tableDialogs = this.createTableDialogs()

    return (
      <TableContainer 
        tableName='Party List'
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

PartyTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  partyList: PropTypes.arrayOf(PropTypes.object).isRequired,

  openAddPartyDialog: PropTypes.bool.isRequired,
  handleOpenAddPartyDialog: PropTypes.func.isRequired,
  handleCloseAddPartyDialog: PropTypes.func.isRequired,
  electionId: PropTypes.number,

  handleOpenEditPartyDialog: PropTypes.func.isRequired,
  handleOpenDeletePartyDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(PartyTable)