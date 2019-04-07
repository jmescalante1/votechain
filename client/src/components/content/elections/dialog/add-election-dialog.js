import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import CancelButton from '../../../customized/buttons/cancel'
import SubmitButton from '../../../customized/buttons/submit'

const styles = theme => ({
  title: {
    color: '#006064',
    fontWeight: 'bold',
    fontSize: 20
  },
  textField: {
    marginTop: 20,
    width: 500,
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

class AddElectionDialog extends React.Component {
  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props

    return (
      <Fragment>
        <Dialog
          open={openDialog}
          onClose={handleClickCloseDialog}
        >
          <DialogTitle disableTypography>
            <Typography className={classes.title}>Add Election</Typography>
          </DialogTitle>
          
          <DialogContent>
            <DialogContentText>
              Add new election by specifying its name
            </DialogContentText>
            <TextField
              className={classes.textField}
              autoFocus
              required
              id="name"
              label="Election Name"
              fullWidth
              variant='outlined'
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline
                }
              }}
              InputLabelProps={{
                classes:{
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }
              }}

            />
          </DialogContent>
          
          <DialogActions>
            <CancelButton handleOnClick={handleClickCloseDialog} />
            <SubmitButton handleOnClick={handleClickCloseDialog} />
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

AddElectionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired
}

export default withStyles(styles)(AddElectionDialog)


