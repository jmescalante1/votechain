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
import AddPositionDialog from '../../customized/dialogs/add-position'

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

class PositionTable extends Component {
  constructor() {
    super()

    this.createTableData = this.createTableData.bind(this)
    this.getActionsAllowed = this.getActionsAllowed.bind(this)
    this.createTableTools = this.createTableTools.bind(this)
    this.createTableDialogs = this.createTableDialogs.bind(this)
  }

  getActionsAllowed(position) {
    const { handleOpenEditPositionDialog, handleOpenDeletePositionDialog } = this.props
    const { election } = this.props

    return (
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='center'   
      >
        <Grid item>  
          <EditButton 
            onClick={() => handleOpenEditPositionDialog(position)}
            placement='bottom-start'
            tooltipTitle='Edit position details'
            size='small'
            disabled={!election || election.status !== 'Pending'}
          />
        </Grid>

        <Grid item>
          <DeleteButton 
            onClick={() => handleOpenDeletePositionDialog(position)}
            placement='bottom-start'
            tooltipTitle='Remove this position'
            size='small'
            disabled={!election || election.status !== 'Pending'}
          />
        </Grid>
      </Grid>
    )
  }

  createTableData(positionList) {
    let positionListClone = []
    
    positionList.forEach((position) => {
      let positionClone = {}

      positionClone.id = position.id
      positionClone.name = position.name
      positionClone.maxNoOfCandidatesThatCanBeSelected = position.maxNoOfCandidatesThatCanBeSelected
      positionClone.hasAbstain = position.hasAbstain ? 'Yes' : 'No'
      positionClone.action = this.getActionsAllowed(position)
    
      positionListClone.push(positionClone)
    })

    return positionListClone
  }
  
  createTableTools(){
    const { classes, handleOpenAddPositionDialog, election } = this.props

    if(!election || election.status !== 'Pending'){
      return null
    }

    return (
      <Tooltip title='Add new position'>
        <Fab 
          size='large' 
          variant='extended' 
          className={classes.fab}
          onClick={handleOpenAddPositionDialog}
        >
          <AddCircle className={classes.actionIcon} />
          Add Position
        </Fab>
      </Tooltip>
    )
  }

  createTableDialogs(){
    const { openAddPositionDialog, handleCloseAddPositionDialog, election } = this.props

    if(!election){
      return null
    }
    
    return (
      <AddPositionDialog 
        openDialog={openAddPositionDialog}
        onClose={handleCloseAddPositionDialog}
        electionId={election.id}
      />
    )
  }
  

  render() {
    const { positionList, headers } = this.props

    const tableData = this.createTableData(positionList)
    const tableTools = this.createTableTools()
    const tableDialogs = this.createTableDialogs()

    return (
      <TableContainer 
        tableName='Position List'
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

PositionTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,

  positionList: PropTypes.arrayOf(PropTypes.object).isRequired,

  openAddPositionDialog: PropTypes.bool.isRequired,
  handleOpenAddPositionDialog: PropTypes.func.isRequired,
  handleCloseAddPositionDialog: PropTypes.func.isRequired,
  election: PropTypes.object,

  handleOpenEditPositionDialog: PropTypes.func.isRequired,
  handleOpenDeletePositionDialog: PropTypes.func.isRequired,
}

export default withStyles(styles)(PositionTable)