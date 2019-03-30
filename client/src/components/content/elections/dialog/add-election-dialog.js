import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import Done from '@material-ui/icons/Done'
import Cancel from '@material-ui/icons/Cancel'

const styles = theme => ({
  submitButton: {
    color: '#4caf50',
    backgroundColor: '#fafafa'
  },
  cancelButton: {
    color: '#f44336',
    backgroundColor: '#fafafa'
  },
  title: {
    color: '#006064',
    fontWeight: 'bold',
    fontSize: 20
  },
  textField: {
    marginTop: 20,
    width: 500,
  },
  notchedOutline: {
    borderWidth: 1, 
    borderColor: '#006064 !important',
  },
  textFieldLabel: {
    color: 'green'
  }
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
                    notchedOutline: classes.notchedOutline
                }
              }}
              InputLabelProps={{
                classes:{
                  focused: classes.textFieldLabel,
                }
              }}
            />
          </DialogContent>

          <DialogActions>
            <Fab
              size='large'
              variant='extended' 
              onClick={handleClickCloseDialog} 
              className={classes.cancelButton}
            >
              <Cancel className={classes.cancelIcon}/>
              Cancel
            </Fab>

            <Fab
              size='large'
              variant='extended' 
              onClick={handleClickCloseDialog} 
              className={classes.submitButton}
            >
              <Done className={classes.submitIcon}/>
              Submit
            </Fab>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddElectionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired
}

export default withStyles(styles)(AddElectionDialog)


