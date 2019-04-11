import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: '#006064'
  },
  spacer: {
    flex: '1 1 100%'
  },
  title: {
    flex: '0 0 auto',
    color: theme.palette.text.main
  },
})

class TableToolbar extends React.Component {
  render() {
    const { classes, tableTools } = this.props

    return (
      <Fragment>
        <Toolbar className= {classes.root}>
          <div className={classes.title}>
            <Typography className={classes.title} variant='h6' id='tableTitle'>
              Election List
            </Typography>
          </div>

          <div className={classes.spacer} />

          {tableTools}
        </Toolbar>
      </Fragment>
    )
  }
}

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(toolbarStyles)(TableToolbar)