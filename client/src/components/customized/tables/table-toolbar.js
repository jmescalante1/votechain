import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'

import Filter from '../selectors/filter'
import SearchBox from '../forms/search-box'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: '#006064',
    display: 'flex'
  },
  title: {
    color: theme.palette.text.main
  },
})

class TableToolbar extends React.Component {
  render() {
    const { classes, tableTools, tableName, handleQueryChange, searchableColumnList, handleSearchByChange } = this.props

    return (
      <Fragment>
        <Toolbar className= {classes.root}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item>
              <Grid container
                direction='row'
                alignItems='center'
                justify='flex-start'
              >
                
                <Grid item>
                  <Typography className={classes.title} variant='h6' id='tableTitle'>
                    {tableName}
                  </Typography>
                </Grid>

                <Grid item>
                  <SearchBox onChange={handleQueryChange}/>
                </Grid>

                <Grid item >
                  <Filter
                    options={searchableColumnList}
                    defaultSelectedOption={searchableColumnList[0]}
                    label='Search by'
                    onSelectChange={handleSearchByChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.tableTools}>
              {tableTools}
            </Grid>
          </Grid>
        </Toolbar>
      </Fragment>
    )
  }
}

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  tableName: PropTypes.string,

  handleQueryChange: PropTypes.func.isRequired,
  searchableColumnList: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,

  handleSearchByChange: PropTypes.func.isRequired,
}

export default withStyles(toolbarStyles)(TableToolbar)