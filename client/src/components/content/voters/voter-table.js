import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cloneDeep from 'lodash/cloneDeep'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AddCircle from '@material-ui/icons/AddCircle'
import FolderShared from '@material-ui/icons/FolderShared'

import TableContainer from '../../customized/tables/table-container'
import EditButton from '../../customized/buttons/edit'
import DeleteButton from '../../customized/buttons/delete'
import AddVoterDialog from '../../customized/dialogs/add-voter'
import UploadVoterDialog from '../../customized/dialogs/upload-voter'

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
    const { handleOpenEditVoterDialog, handleOpenDeleteVoterDialog, election } = this.props

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'   
      >
        {/* <Grid item>    
          <EditButton 
            onClick={() => handleOpenEditVoterDialog(voter)}
            placement='bottom-start'
            tooltipTitle='Edit voter details'
            size='small'
            disabled={!election || election.status !== 'Pending'}
          />
        </Grid> */}

        <Grid item>
          <DeleteButton 
            onClick={() => handleOpenDeleteVoterDialog(voter)}
            placement='bottom-start'
            tooltipTitle='Remove this voter'
            size='small'
            disabled={!election || election.status !== 'Pending'}
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(voterList) {
    let voterListClone = []

    voterList.forEach((voter) => {
      let voterClone = {
        id: voter.id,
        action: this.getActionsAllowed(voter)
      }

      voterListClone.push(voterClone)
    })

    return voterListClone
  }
  
  createTableTools(){
    const { classes, election, handleOpenAddVoterDialog, handleOpenUploadVoterDialog } = this.props

    if(!election || election.status !== 'Pending'){
      return null
    }

    return (
      <Fragment>
        <Tooltip title="Upload voter's list">
          <Fab 
            size='large' 
            variant='extended' 
            className={classes.fab}
            onClick={handleOpenUploadVoterDialog}
          >
            <FolderShared className={classes.actionIcon} />
            Bulk Upload 
          </Fab>
        </Tooltip>
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
      </Fragment>
    )
  }

  createTableDialogs(){
    const { openAddVoterDialog, handleCloseAddVoterDialog } = this.props
    const { openUploadVoterDialog, handleCloseUploadVoterDialog } = this.props
    const { election } = this.props

    if(!election){
      return null
    }

    return (
      <Fragment>
        <UploadVoterDialog 
          openDialog={openUploadVoterDialog}
          handleClickCloseDialog={handleCloseUploadVoterDialog}
          electionId={election.id}
        />
        <AddVoterDialog 
          openDialog={openAddVoterDialog}
          handleClickCloseDialog={handleCloseAddVoterDialog}
          electionId={election.id}
        />
      </Fragment>
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

  openUploadVoterDialog: PropTypes.bool.isRequired,
  handleOpenUploadVoterDialog: PropTypes.func.isRequired,
  handleCloseUploadVoterDialog: PropTypes.func.isRequired,
  
  election: PropTypes.object,

  handleOpenEditVoterDialog: PropTypes.func.isRequired,
  handleOpenDeleteVoterDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(VoterTable)