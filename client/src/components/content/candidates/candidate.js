import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  // root: {
  //   margin
  // }
})

class Candidate extends Component {

  render() {
    return (
      <div>
        Candidates
      </div>
    );
  }
}

Candidate.propTypes = {
  
};

export default withStyles(styles)(Candidate)