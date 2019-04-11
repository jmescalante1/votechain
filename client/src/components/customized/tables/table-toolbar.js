import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import AddCircle from '@material-ui/icons/AddCircle'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit * 2,
    backgroundColor: '#006064'
  },
  spacer: {
    flex: '1 1 100%'
  },
  actionIcon:{
    marginRight: theme.spacing.unit,
    color: '#006064'
  },
  title: {
    flex: '0 0 auto',
    color: theme.palette.text.main
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: '#ffffff',
    color: '#006064'
  },
})

class TableToolbar extends React.Component {
  render() {
    const { classes, handleClickOpenDialog } = this.props

    return (
      <Toolbar className= {classes.root}>
        <div className={classes.title}>
          <Typography className={classes.title} variant='h6' id='tableTitle'>
            Election List
          </Typography>
        </div>

        <div className={classes.spacer} />

        <Tooltip title='Add new election'>
          <Fab 
            size='large' 
            variant='extended' 
            className={classes.fab}
            onClick={handleClickOpenDialog}
          >
            <AddCircle className={classes.actionIcon} />
            Add Election
          </Fab>
        </Tooltip>
      
      </Toolbar>
    )
  }
}

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClickOpenDialog: PropTypes.func
}

export default withStyles(toolbarStyles)(TableToolbar)