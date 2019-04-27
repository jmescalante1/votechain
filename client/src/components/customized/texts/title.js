import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    backgroundColor: '#64b5f6',
    height: theme.spacing.unit * 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
  }
})

class Title extends Component {
  render() {
    const { classes, fontSize } = this.props

    return (
      <div className={classes.root}>
        <Typography  className={classes.title} style={{ fontSize: fontSize ? fontSize : 20}}>
          {this.props.children}
        </Typography>
      </div>
    )
  }
}

Title.propTypes = {
  fontSize: PropTypes.number
}

export default withStyles(styles)(Title)