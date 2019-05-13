import React from 'react'
import PropTypes from 'prop-types'
import ReactFileReader from 'react-file-reader'

import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

import CloudUpload from '@material-ui/icons/CloudUpload'

const styles = theme => ({
  button: {
    color: '#fafafa',
    backgroundColor: '#1a237e',
    '&:hover': {
      backgroundColor: '#3f51b5'
    }
  },
  label: {
    marginLeft: theme.spacing.unit,
  },
})

class UploadButton extends React.Component {
  render(){
    const { onClick, classes, size, handleFiles, multipleFiles, fileTypes } = this.props

    return(
      <ReactFileReader
        handleFiles={handleFiles}
        multipleFiles={multipleFiles}
        fileTypes={fileTypes}
      > 
        <Fab
          size={size}
          variant='extended' 
          onClick={onClick} 
          className={classes.button}
        >
          <CloudUpload />
          <div className={classes.label}>Upload</div>
        </Fab>
      </ReactFileReader>
    )
  }
}

UploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFiles: PropTypes.func.isRequired,
  multipleFiles: PropTypes.bool,
  PropTypes: PropTypes.string || PropTypes.arrayOf(PropTypes.string)
}

export default withStyles(styles)(UploadButton)