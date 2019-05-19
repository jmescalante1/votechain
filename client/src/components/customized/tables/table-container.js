import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Table from './table'

class TableContainer extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      order: props.defaultOrder,
      orderBy: props.defaultOrderBy,
      page: 0,
      rowsPerPage: props.defaultRowsPerPage,

      query: '',
      searchBy: 'All',
    }

    this.handleRequestSort = this.handleRequestSort.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.stableSort = this.stableSort.bind(this)
    this.desc = this.desc.bind(this)
    this.getSorting = this.getSorting.bind(this)

    this.getSearchResult = this.getSearchResult.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.getSearchableColumnList = this.getSearchableColumnList.bind(this)
    this.handleSearchByChange = this.handleSearchByChange.bind(this)
  }

  getSearchResult() {
    const { query, searchBy } = this.state
    const { data } = this.props

    if(query.trim().length === 0){
      return data
    }
   
    if(searchBy === 'All') {
      return data.filter(row => {
        let keys = Object.keys(row)
        
        for(let i = 0; i < keys.length; i++){
          if(row[keys[i]].toString().toLowerCase().includes(query)){
            return true
          }
        }
  
        return false
      })
    }

    
    return data.filter(row => row[searchBy].toString().toLowerCase().includes(query))
  }

  getSearchableColumnList() {
    const { headers } = this.props

    const searchableColumnList = []

    searchableColumnList.push({
      id: 'All',
      label: 'All'
    })

    headers.forEach(header => {
      if(header.searchable){
        searchableColumnList.push({
          id: header.id,
          label: header.label,
        })
      }
    })

    return searchableColumnList
  }

  handleSearchByChange(option) {
    this.setState({ searchBy: option.id })
  }

  handleQueryChange(event) {
    this.setState({ query: event.target.value.toLowerCase() })
  }

  handleRequestSort(event, property) {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }
    this.setState({ order, orderBy })
  }

  handleChangePage(page) {
    this.setState({ page })
  }

  handleChangeRowsPerPage(rowsPerPage) {
    this.setState({ rowsPerPage, page: 0 })
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
    return order === 'desc'
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
    const { order, orderBy, rowsPerPage, page } = this.state
    const { headers, rowsPerPageOptions, tableTools, tableDialogs, tableName, rowHeight } = this.props
   
    const searchableColumnList = this.getSearchableColumnList()

    return (
      <div>
        <Table
          tableName={tableName}
          data={this.getSearchResult()}
          headers={headers}
          order={order}
          orderBy={orderBy}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={rowsPerPageOptions}

          handleQueryChange={this.handleQueryChange}
          searchableColumnList={searchableColumnList}
          handleSearchByChange={this.handleSearchByChange}
          

          tableTools={tableTools}
          tableDialogs={tableDialogs}

          handleRequestSort={this.handleRequestSort}
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          stableSort={this.stableSort}
          getSorting={this.getSorting}

          rowHeight={rowHeight}
        />  
      </div>
    )
  }
}

TableContainer.propTypes = {
  tableName: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,

  defaultOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
  defaultOrderBy: PropTypes.string.isRequired,
  defaultRowsPerPage: PropTypes.number.isRequired,

  rowHeight: PropTypes.number
}

export default TableContainer