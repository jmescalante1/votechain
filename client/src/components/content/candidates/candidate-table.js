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
            tooltipTitle='Edit candidate details'
            size='small'
          />
        </Grid>

        <Grid item>
          <DeleteButton 
            placement='bottom-start'
            tooltipTitle='Remove this candidate'
            size='small'
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(candidateList) {
    let candidateListClone = cloneDeep(candidateList);

    candidateListClone.forEach((candidate) => {
      candidate.action = this.getActionsAllowed()
    })

    return candidateListClone
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
          Add Candidate
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

  openAddCandidateDialog: PropTypes.bool.isRequired,
  handleOpenAddCandidateDialog: PropTypes.func.isRequired,
  handleCloseAddCandidateDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(CandidateTable)