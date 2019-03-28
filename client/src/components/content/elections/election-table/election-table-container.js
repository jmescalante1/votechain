import React from "react"

import electionData from './election-data'
import ElectionTable from './election-table'

class ElectionTableContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      order: "asc",
      orderBy: "name",
      data: electionData,
      page: 0,
      rowsPerPage: 5
    }

    this.handleRequestSort = this.handleRequestSort.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.stableSort = this.stableSort.bind(this)
    this.desc = this.desc.bind(this)
    this.getSorting = this.getSorting.bind(this)
  }

  handleRequestSort(event, property) {
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }

    this.setState({ order, orderBy })
  }

  handleChangePage(event, page) {
    this.setState({ page })
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value })
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])

    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })

    return stabilizedThis.map(el => el[0])
  }

  getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy)
  }

  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  render() {
    const { data, order, orderBy, rowsPerPage, page } = this.state
    const headers = [
      {id: "id", label: "ID"},
      {id: "name", label: "Name"},
      {id: "status", label: "Status"},
      {id: "action", label: "Action"},
    ]

    return (
      <ElectionTable 
        data={data}
        headers={headers}
        order={order}
        orderBy={orderBy}
        rowsPerPage={rowsPerPage}
        page={page}

        handleRequestSort={this.handleRequestSort}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
        stableSort={this.stableSort}
        getSorting={this.getSorting}
      />
    )
  }
}



export default ElectionTableContainer;