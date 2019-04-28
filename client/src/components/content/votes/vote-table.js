import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableContainer from '../../customized/tables/table-container'

class VoteTable extends Component {
  render() {
    const { voteList } = this.props
    
    const headers = [
      {id: 'id', label: 'Vote Key'},
      {id: 'voterId', label: 'Voter Address'},
      {id: 'candidateName', label: 'Candidate Name'},
      {id: 'positionName', label: 'Position Name'},
    ]

    return (
      <TableContainer 
        tableName="Casted Votes"
        headers={headers}
        data={voteList}

        rowsPerPageOptions={[10, 25, 50, 100]}
        defaultOrder='desc'
        defaultOrderBy='id'
        defaultRowsPerPage={10}

      />
    )
  }
}

VoteTable.propTypes = {

  voteList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default VoteTable