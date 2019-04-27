import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TableContainer from '../../customized/tables/table-container'

class VoteTable extends Component {
  render() {
    const headers = [
      {id: 'id', label: 'Vote Key'},
      {id: 'voter-address', label: 'Voter Address'},
      {id: 'candidate-name', label: 'Candidate Name'},
      {id: 'position-name', label: 'Position Name'},
    ]

    const { voteList } = this.props

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
  election: PropTypes.object.isRequired,

  voteList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default VoteTable