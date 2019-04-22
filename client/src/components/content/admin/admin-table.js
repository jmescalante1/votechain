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
import AddAdminDialog from '../../customized/dialogs/add-admin'

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

class AdminTable extends Component {
  constructor() {
    super()

    this.createTableData = this.createTableData.bind(this)
    this.getActionsAllowed = this.getActionsAllowed.bind(this)
    this.createTableTools = this.createTableTools.bind(this)
    this.createTableDialogs = this.createTableDialogs.bind(this)
  }

  getActionsAllowed(admin) {
    const { handleOpenEditAdminDialog, handleOpenDeleteAdminDialog } = this.props

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'   
      >
        <Grid item>    
          <EditButton 
            onClick={() => handleOpenEditAdminDialog(admin)}
            placement='bottom-start'
            tooltipTitle='Edit admin details'
            size='small'
          />
        </Grid>

        <Grid item>
          <DeleteButton 
            onClick={() => handleOpenDeleteAdminDialog(admin)}
            placement='bottom-start'
            tooltipTitle='Remove this admin'
            size='small'
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(adminList) {
    let adminListClone = cloneDeep(adminList)

    adminListClone.forEach((admin) => {
      admin.action = this.getActionsAllowed(admin)
    })

    return adminListClone
  }
  
  createTableTools(){
    const { classes, handleOpenAddAdminDialog } = this.props

    return (
      <Tooltip title='Add new admin(s)'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleOpenAddAdminDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Admin
        </Fab>
      </Tooltip>
    )
  }

  createTableDialogs(){
    const { openAddAdminDialog, handleCloseAddAdminDialog } = this.props

    return (
      <AddAdminDialog 
        openDialog={openAddAdminDialog}
        handleClickCloseDialog={handleCloseAddAdminDialog}
      />
    )
  }
  

  render() {
    const { adminList, headers } = this.props

    const tableData = this.createTableData(adminList)
    const tableTools = this.createTableTools()
    const tableDialogs = this.createTableDialogs()

    return (
      <TableContainer 
        tableName='Admin List'
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

AdminTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  adminList: PropTypes.arrayOf(PropTypes.object).isRequired,

  openAddAdminDialog: PropTypes.bool.isRequired,
  handleOpenAddAdminDialog: PropTypes.func.isRequired,
  handleCloseAddAdminDialog: PropTypes.func.isRequired,

  handleOpenEditAdminDialog: PropTypes.func.isRequired,
  handleOpenDeleteAdminDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(AdminTable)