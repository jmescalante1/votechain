import React, { Component } from 'react'
import ReactFileReader from 'react-file-reader'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    backgroundColor: 'yellow',
    height: 200,
    width: '100%',
  },
  outer: {
    display: 'table',
    position: 'relative',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  
  middle: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  
  inner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },

  text: {
    position: 'relative',
    margin: 'auto'
  }
})

class UploadFile extends Component {
  constructor(props) {
    super(props);
    
    
  }
  

  render() {
    const { classes, handleFiles } = this.props

    return (
      <ReactFileReader
        handleFiles={handleFiles}
      >
        <div
          className={classes.root}
        >
          <div className={classes.outer}>
            <div className={classes.middle}>
              <div className={classes.inner}>
                <div className={classes.text} >
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactFileReader>
    )
  }
}

UploadFile.propTypes = {
  handleFiles: PropTypes.func.isRequired
}

export default withStyles(styles)(UploadFile)