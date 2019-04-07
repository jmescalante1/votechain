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
import CustomizedTextField from '../../../customized/forms/textfield'

const styles = theme => ({
  label: {
    color: '#006064',
    fontWeight: 'bold',
    fontSize: 20
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
            <Typography className={classes.label}>Add Election</Typography>
          </DialogTitle>
          
          <DialogContent>
            <DialogContentText>
              Add new election by specifying its name
            </DialogContentText>

            <CustomizedTextField 
              id='election-name'
              label='Election Name'
              variant='outlined'
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


