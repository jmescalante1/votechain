import React from 'react'

// import ElectionTableContainer from './election-table/election-table-container'

import CustomizedTableContainer from '../../customized/tables/table-container'

class Election extends React.Component {
  render() {
    const headers = [
      {id: 'id', label: 'ID'},
      {id: 'name', label: 'Name'},
      {id: 'status', label: 'Status'},
      {id: 'action', label: 'Action'},
    ]

    return(
      <div>
        <CustomizedTableContainer
          headers={headers}
        />
      </div>
    )
  }
}

export default Election