import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import CancelButton from '../buttons/cancel'
import SubmitButton from '../buttons/submit'
import CustomizedTextField from '../forms/textfield'

const styles = theme => ({
  textField: {
    marginTop: 20,
  },
  label: {
    color: theme.palette.highlight.main,
    fontWeight: 'bold',
    fontSize: 20
  },
  actions: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  formFields: {
    marginTop: theme.spacing.unit * 2,
  },
  statusName: {
    fontSize: 15
  },
})

class AddElectionDialog extends React.Component {
  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
    const { election } = this.props

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add New Voter</Typography>
        </DialogTitle>
        
        <DialogContent >
          <DialogContentText>
          Fill out the form below and click submit to add a new voter.
          </DialogContentText>

          <Typography className={classes.election}>Election: {election}</Typography>
          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='string'
            id='voter-name'
            label='Voter Name'
            variant='outlined'
          />
        </DialogContent>

        <DialogActions className={classes.actions}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <Grid item><CancelButton onClick={handleClickCloseDialog} /></Grid>

            <Grid item><SubmitButton onClick={handleClickCloseDialog} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

AddElectionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  
  election: PropTypes.string.isRequired,
}

export default withStyles(styles)(AddElectionDialog)