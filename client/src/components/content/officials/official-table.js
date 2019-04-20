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
import AddOfficialDialog from '../../customized/dialogs/add-official'

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

class OfficialTable extends Component {
  constructor() {
    super()

    this.createTableData = this.createTableData.bind(this)
    this.getActionsAllowed = this.getActionsAllowed.bind(this)
    this.createTableTools = this.createTableTools.bind(this)
    this.createTableDialogs = this.createTableDialogs.bind(this)
  }

  getActionsAllowed(official) {
    const { handleOpenEditOfficialDialog, handleOpenDeleteOfficialDialog } = this.props

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'   
      >
        <Grid item>    
          <EditButton 
            onClick={() => handleOpenEditOfficialDialog(official)}
            placement='bottom-start'
            tooltipTitle='Edit official details'
            size='small'
          />
        </Grid>

        <Grid item>
          <DeleteButton 
            onClick={() => handleOpenDeleteOfficialDialog(official)}
            placement='bottom-start'
            tooltipTitle='Remove this official'
            size='small'
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(officialList) {
    let officialListClone = cloneDeep(officialList)

    officialListClone.forEach((official) => {
      official.action = this.getActionsAllowed(official)
    })

    return officialListClone
  }
  
  createTableTools(){
    const { classes, handleOpenAddOfficialDialog } = this.props

    return (
      <Tooltip title='Add new official(s)'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleOpenAddOfficialDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Official
        </Fab>
      </Tooltip>
    )
  }

  createTableDialogs(){
    const { openAddOfficialDialog, handleCloseAddOfficialDialog } = this.props

    return (
      <AddOfficialDialog 
        openDialog={openAddOfficialDialog}
        handleClickCloseDialog={handleCloseAddOfficialDialog}
      />
    )
  }
  

  render() {
    const { officialList, headers } = this.props

    const tableData = this.createTableData(officialList)
    const tableTools = this.createTableTools()
    const tableDialogs = this.createTableDialogs()

    return (
      <TableContainer 
        tableName='Official List'
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

OfficialTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  officialList: PropTypes.arrayOf(PropTypes.object).isRequired,

  openAddOfficialDialog: PropTypes.bool.isRequired,
  handleOpenAddOfficialDialog: PropTypes.func.isRequired,
  handleCloseAddOfficialDialog: PropTypes.func.isRequired,

  handleOpenEditOfficialDialog: PropTypes.func.isRequired,
  handleOpenDeleteOfficialDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(OfficialTable)