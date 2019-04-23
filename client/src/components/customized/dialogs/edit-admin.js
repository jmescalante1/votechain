import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

import { editAdminVotechain } from '../../../actions/admin'

const styles = theme => ({
  content: {
    width: 500
  },
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
  }
})

class EditAdminDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      adminName: '',
    }

    this.editAdmin = this.editAdmin.bind(this)
    this.onChangeAdminName = this.onChangeAdminName.bind(this)
  }
  
  editAdmin() {
    const { editAdminVotechain, account, votechain, handleClickCloseDialog, adminToBeEdited } = this.props
    const { adminName } = this.state

    let admin = {
      adminKey: adminToBeEdited.id,
      name: adminName,
    }

    editAdminVotechain(account, votechain, admin)
    handleClickCloseDialog()
  }

  onChangeAdminName(event) {
    this.setState({ adminName: event.target.value })
  }

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props
  
    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Edit Admin</Typography>
        </DialogTitle>
        
        <DialogContent 
          className={classes.content}
        >
          <DialogContentText>
            Modify the fields below and click submit to apply changes.
          </DialogContentText>

          <CustomizedTextField
            classes={{
              root: classes.textField
            }}
            required
            fullWidth={true}
            type='string'
            id='admin-name'
            label='Admin Name'
            variant='outlined'
            onChange={this.onChangeAdminName}
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

            <Grid item><SubmitButton onClick={this.editAdmin} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

EditAdminDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
  adminToBeEdited: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  account: state.account.account,
  votechain: state.contract.votechain
});

const mapDispatchToProps = {
  editAdminVotechain,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditAdminDialog))