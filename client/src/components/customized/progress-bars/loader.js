import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  item: {
      position: 'absolute',
      width: '100px',
      height: '100px',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
  },
  outer: {
    height: '100%', 
    width: '100%',
    display: 'table',    
  },
  inner: {
    height: '100%',
    verticalAlign: 'middle',
    display: 'table-cell',
    textAlign: 'center',
  },
})

function CircularIndeterminate(props) {
  const { classes } = props

  return (
    <div className={classes.outer}>
      <div className={classes.inner}>
        <div className={classes.item}>
          <CircularProgress className={classes.progress} color="primary" />
        </div>
      </div>
    </div>
  )
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CircularIndeterminate)