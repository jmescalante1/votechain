import React from 'react'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 4
  }
})

class EditPage extends React.Component {
  render() {
    const { classes } = this.props

    return(
      <div className={classes.root}>Edit page</div>
    )
  }
} 

export default withStyles(styles)(EditPage)