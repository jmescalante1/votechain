import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import NextButton from '../../buttons/next'
import PreviousButton from '../../buttons/previous'

const styles = theme => ({
  pageNumber: {
    color: '#fafafa',
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: 2.5,
  },
  pageNumberContainer: {
    backgroundColor: '#1a237e',
    width: 36,
    height: 36,
  }
})

class ChangePage extends Component {
  render() {
    const { classes, page, onChangePage, rowsPerPage, count } = this.props

    return (
      <Grid
        container 
        direction='row'
        alignItems='center'
        justify='flex-start'
      >
        <PreviousButton 
          size='medium'
          onClick={() => onChangePage(page - 1)}
          disabled={page === 0 ? true: false}
        />
        
        <div className={classes.pageNumberContainer}>
          <Typography className={classes.pageNumber}>{page + 1}</Typography>
        </div>

        <NextButton
          size='medium'
          onClick={() => onChangePage(page + 1)}
          disabled={(page + 1) * rowsPerPage > count ? true: false}
        />
      </Grid>
    )
  }
}

ChangePage.propTypes = {
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.func.isRequired,
  count: PropTypes.func.isRequired
}

export default withStyles(styles)(ChangePage)