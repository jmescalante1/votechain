import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textField: {
    marginTop: 20,
    width: '50%',
  },

  cssFocused: {},
  notchedOutline: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#006064',
    },
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#006064',
    },
  },
})

class EditPageHeader extends React.Component {
  render() {
    const { classes, position } = this.props

    return(
      <Grid 
        className={classes.root}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <Typography className={classes.title}>
            Edit Position
          </Typography>
        </Grid>
        
        <Grid item>
          <Typography className={classes.position}>
            ID: {position.id}
          </Typography>
        </Grid>
      </Grid>
    )
  }
} 

EditPageHeader.propTypes = {
  classes: PropTypes.object.isRequired,

  position: PropTypes.object.isRequired
}

export default withStyles(styles)(EditPageHeader)