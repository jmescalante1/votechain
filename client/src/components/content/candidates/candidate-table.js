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
  }

  getActionsAllowed() {
    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'   
      >
        <Grid item>    
          <EditButton 
            placement='bottom-start'
            tooltipTitle='Edit election details'
            size='small'
          />
        </Grid>

        <Grid item>
          <DeleteButton 
            placement='bottom-start'
            tooltipTitle='Remove this election'
            size='small'
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(candidateList) {
    candidateList.forEach((candidate) => {
      candidate.action = this.getActionsAllowed()
    })

    return candidateList
  }
  
  createTableTools(){
    const { classes, handleOpenAddCandidateDialog } = this.props

    return (
      <Tooltip title='Add new candidate'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleOpenAddCandidateDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Election
        </Fab>
      </Tooltip>
    )
  }

  createTableDialogs(){
    const { openAddCandidateDialog, handleCloseAddCandidateDialog } = this.props

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

    return (
      <TableContainer 
        tableName='Candidate List'
        headers={headers}
        data={tableData}

        rowsPerPageOptions={[8, 15, 25]}
        defaultOrder='asc'
        defaultOrderBy='name'
        defaultRowsPerPage={8}
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

  openAddCandidateDialog: PropTypes.bool.isRequired,
  handleOpenAddCandidateDialog: PropTypes.func.isRequired,
  handleCloseAddCandidateDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(CandidateTable)