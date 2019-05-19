import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import Launch from '@material-ui/icons/Launch'

import TableContainer from '../../customized/tables/table-container'
import ViewButton from '../../customized/buttons/view'

import BulletinBoardPDF from './bulletin-board-pdf'
import Export from '../../export/export'

const styles = theme => ({
  actionIcon:{
    marginLeft: theme.spacing.unit,
    color: '#006064'
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffffff',
    color: '#006064'
  },  
})

class BulletinTable extends Component {
  constructor(props) {
    super(props);
    
    this.createTableData = this.createTableData.bind(this)
  }
  
  createTableTools() {
    const { classes, ballotList, electionList, electionId } = this.props

    let election = electionList.find((election) => election.id === electionId)

    if(!election) {
      return null
    }

    return (
      <Export
        fileName='Bulletin Board.pdf'
        document={
          <BulletinBoardPDF 
            ballotList={ballotList} 
            election={election}
          />
        }
      >
        <Tooltip title='Export bulletin board'>
          <Fab 
            size='large' 
            variant='extended' 
            className={classes.fab}
          >
            Export
            <Launch className={classes.actionIcon} />
          </Fab>
        </Tooltip>
      </Export>
    )
  }

  createTableData(ballotList) {
    const { handleOpenViewVotesDialog } = this.props
    let tableData = []
   
    Object.keys(ballotList).forEach((key) => {
      let row = {id: key}
      row.actions = 
        <ViewButton 
          tooltipTitle='View'
          placement='right'
          onClick={() => handleOpenViewVotesDialog(key)}
        />
      tableData.push(row)
    })

    return tableData
  }

  render() {
    const { ballotList } = this.props
    const tableData = this.createTableData(ballotList)
    const tableTools = this.createTableTools()

    const headers = [
      {id: 'id', label: 'Voter ID', searchable: true},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <TableContainer 
        tableName="Bulletin Board of Votes"
        headers={headers}
        data={tableData}
        tableTools={tableTools}

        rowsPerPageOptions={[10, 25, 50, 100]}
        defaultOrder='desc'
        defaultOrderBy='id'
        defaultRowsPerPage={10}
      />
    )
  }
}

BulletinTable.propTypes = {
  handleOpenViewVotesDialog: PropTypes.func.isRequired,
  ballotList: PropTypes.arrayOf(PropTypes.object).isRequired,
  electionId: PropTypes.number,
  electionList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withStyles(styles)(BulletinTable)