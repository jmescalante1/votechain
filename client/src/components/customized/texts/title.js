import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    backgroundColor: '#212121',
    height: theme.spacing.unit * 8,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
    fontWeight: 'bold',
    color: '#f5f5f5'
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