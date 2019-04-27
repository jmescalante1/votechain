import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import ElectionCard from './election-card'
import VoteTable from '../../votes/vote-table'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    margin: 'auto'
  },

})

class ElectionView extends Component {
  render() {
    const { classes, election, voteList } = this.props 

    return (
      <div className={classes.root}>
        <ElectionCard election={election}/>
        <VoteTable 
          election={election}
          voteList={voteList}
        />
      </div>
    )
  }
}

ElectionView.propTypes = {
  election: PropTypes.object.isRequired,

  voteList: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default withStyles(styles)(ElectionView)