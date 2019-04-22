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

import { addAdminVotechain } from '../../../actions/admin'

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

class AddAdminDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      adminName: '',
      adminKey: '',
    }

    this.onChangeAdminName = this.onChangeAdminName.bind(this)
    this.onChangeAdminKey = this.onChangeAdminKey.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeAdminName(event) {
    this.setState({ adminName: event.target.value })
  }

  onChangeAdminKey(event) {
    this.setState({ adminKey: event.target.value })
  }

  onSubmit() {
    const { handleClickCloseDialog, addAdminVotechain, votechain, web3 } = this.props
    const { adminName, adminKey } = this.state

    let admin = {
      adminKey,
      name: adminName,
    }

    addAdminVotechain(web3, votechain, admin)
    handleClickCloseDialog()
  }
  

  render() {
    const { classes, openDialog, handleClickCloseDialog } = this.props

    return (
      <Dialog
        open={openDialog}
        onClose={handleClickCloseDialog}
      >
        <DialogTitle disableTypography>
          <Typography className={classes.label}>Add New Admin</Typography>
        </DialogTitle>
        
        <DialogContent >
          <DialogContentText>
          Fill out the form below and click submit to add a new admin.
          </DialogContentText>

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
            type='string'
            id='admin-key'
            label='Admin Key/Address'
            variant='outlined'
            onChange={this.onChangeAdminKey}
          />

          <CustomizedTextField
            classes={{
              root: classes.textField,
            }}
            required
            fullWidth
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

            <Grid item><SubmitButton onClick={this.onSubmit} /></Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }
}

AddAdminDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleClickCloseDialog: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  web3: state.web3.web3,
  votechain: state.contract.votechain,
})

const mapDispatchToProps = {
  addAdminVotechain
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddAdminDialog))