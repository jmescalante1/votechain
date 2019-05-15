import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  headerLabel: {
    color: '#006064',
    fontSize: 18,
    fontWeight: 'bold'
  },
  tableSortIcon: {
    color: '#006064'
  }
})

class CustomizedTableHeader extends React.Component {
  constructor(){
    super()

    this.createSortHandler = this.createSortHandler.bind(this)
  }

  createSortHandler(property) {
    return (event) => {
      this.props.onRequestSort(event, property)
    }
  }

  render() {
    const { classes, headers, order, orderBy } = this.props

    return (
      <TableHead>
        <TableRow>
          {headers.map(
            header => (
              <TableCell
                key={header.id}
                sortDirection={orderBy === header.id ? order : false}
              >
                <Tooltip
                  title='Sort'
                  placement='bottom-start'
                  enterDelay={300}
                >
                  <TableSortLabel
                    classes={{icon: classes.tableSortIcon}}
                    active={orderBy === header.id}
                    direction={order}
                    onClick={this.createSortHandler(header.id)}
                  >
                    <Typography className={classes.headerLabel}>
                      {header.label}
                    </Typography>
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>  
      </TableHead>
    )
  }
}

CustomizedTableHeader.propTypes = {
  headers: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
}

export default withStyles(styles)(CustomizedTableHeader)