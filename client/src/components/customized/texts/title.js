import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    backgroundColor: '#bdbdbd',
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

class Title extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Typography className={classes.title}>
          {this.props.children}
        </Typography>
      </div>
    )
  }
}

Title.propTypes = {

}

export default withStyles(styles)(Title)