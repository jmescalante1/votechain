import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from '../../../customized/texts/title'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import StatusSymbol from '../../../customized/symbols/status-symbol'
import ElectionDetails from './election-details'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    width: '90%',
    margin: 'auto'
  },

})

class ElectionView extends Component {
  render() {
    const { classes, election } = this.props 

    return (
      <div className={classes.root}>
        <ElectionDetails election={election}/>
      </div>
    )
  }
}

ElectionView.propTypes = {
  election: PropTypes.object.isRequired
}

export default withStyles(styles)(ElectionView)