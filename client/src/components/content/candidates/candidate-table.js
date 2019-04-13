import React, { Component } from 'react'

import TableContainer from '../../customized/tables/table-container'

class CandidateTable extends Component {
  render() {
    const { data, headers } = this.props

    return (
      <TableContainer 
        headers={headers}
        data={data}

        rowPerPageOptions={[8, 15, 25]}
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

  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  openDialog: PropTypes.bool.isRequired,
  handleClickOpenDialog: PropTypes.func.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
}

export default CandidateTable