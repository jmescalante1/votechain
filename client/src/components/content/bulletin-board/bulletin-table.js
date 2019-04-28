import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableContainer from '../../customized/tables/table-container'
import ViewButton from '../../customized/buttons/view'


class BulletinTable extends Component {
  constructor(props) {
    super(props);
    
    this.createTableData = this.createTableData.bind(this)
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

    const headers = [
      {id: 'id', label: 'Alias'},
      {id: 'actions', label: 'Actions'}
    ]

    return (
      <TableContainer 
        tableName="Bulletin Board of Votes"
        headers={headers}
        data={tableData}

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
}

export default BulletinTable