import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

import AddCircle from '@material-ui/icons/AddCircle'

import TableContainer from '../../customized/tables/table-container'
import EditButton from '../../customized/buttons/edit'
import DeleteButton from '../../customized/buttons/delete'
import AddCandidateDialog from '../../customized/dialogs/add-candidate'

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

class CandidateTable extends Component {
  constructor() {
    super()

    this.createTableData = this.createTableData.bind(this)
    this.getActionsAllowed = this.getActionsAllowed.bind(this)
    this.createTableTools = this.createTableTools.bind(this)
    this.createTableDialogs = this.createTableDialogs.bind(this)
  }

  getActionsAllowed(candidate) {
    const { handleOpenEditCandidateDialog, handleOpenDeleteCandidateDialog, election } = this.props

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'   
      >
        <Grid item>    
          <EditButton 
            onClick={() => handleOpenEditCandidateDialog(candidate)}
            placement='bottom-start'
            tooltipTitle='Edit candidate details'
            size='small'
            disabled={!election || election.status !== 'Pending'}
          />
        </Grid>

        <Grid item>
          <DeleteButton 
            onClick={() => handleOpenDeleteCandidateDialog(candidate)}
            placement='bottom-start'
            tooltipTitle='Remove this candidate'
            size='small'
            disabled={!election || election.status !== 'Pending'}
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(candidateList) {
    let candidateListClone = [];

    candidateList.forEach((candidate) => {
      let candidateClone = {}
      
      candidateClone.id = candidate.id
      candidateClone.name = candidate.name
      candidateClone.positionName = candidate.positionName
      candidateClone.partyName = candidate.partyName
      candidateClone.actions = this.getActionsAllowed(candidate)
      
      candidateListClone.push(candidateClone)
    })

    return candidateListClone
  }
  
  createTableTools(){
    const { classes, election, handleOpenAddCandidateDialog } = this.props

    if(!election || election.status !== 'Pending'){
      return null
    }

    return (
      <Tooltip title='Add new candidate'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleOpenAddCandidateDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Candidate
        </Fab>
      </Tooltip>
    )
  }

  createTableDialogs(){
    const { openAddCandidateDialog, handleCloseAddCandidateDialog, election } = this.props

    if(!election){
      return null
    }

    return (
      <AddCandidateDialog 
        openDialog={openAddCandidateDialog}
        handleClickCloseDialog={handleCloseAddCandidateDialog}
      />
    )
  }
  
  render() {
    const { candidateList, headers } = this.props

    const tableData = this.createTableData(candidateList)
    const tableTools = this.createTableTools()
    const tableDialogs = this.createTableDialogs()

    return (
      <TableContainer 
        tableName='Candidate List'
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

CandidateTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  candidateList: PropTypes.arrayOf(PropTypes.object).isRequired,
  election: PropTypes.object,

  openAddCandidateDialog: PropTypes.bool.isRequired,
  handleOpenAddCandidateDialog: PropTypes.func.isRequired,
  handleCloseAddCandidateDialog: PropTypes.func.isRequired,

  handleOpenEditCandidateDialog: PropTypes.func.isRequired,
  handleOpenDeleteCandidateDialog: PropTypes.func.isRequired,

 
}

export default withStyles(styles)(CandidateTable)